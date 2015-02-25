/*
 * VPDB - Visual Pinball Database
 * Copyright (C) 2015 freezy <freezy@xbmc.org>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

"use strict";

var _ = require('lodash');
var util = require('util');
var async = require('async');
var logger = require('winston');

var Game = require('mongoose').model('Game');
var Release = require('mongoose').model('Release');
var Rating = require('mongoose').model('Rating');
var api = require('./api');

var error = require('../../modules/error')('api', 'rating');

exports.createForGame = function(req, res) {
	create(req, res, 'game', find(Game, 'game'));
};

exports.getForGame = function(req, res) {
	view(req, res, find(Game, 'game'), 'title');
};

exports.updateForGame = function(req, res) {
	update(req, res, 'game', find(Game, 'game'), 'title');
};

exports.createForRelease = function(req, res) {
	create(req, res, 'release', find(Release, 'release'));
};

exports.getForRelease = function(req, res) {
	view(req, res, find(Release, 'release'), 'name');
};

exports.updateForRelease = function(req, res) {
	update(req, res, 'release', find(Release, 'release'), 'name');
};

/**
 * Generic function for viewing a rating.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {function} find Function that returns entity and rating.
 * @param {string} titleAttr Attribute of the entity that contains a title
 */
function view(req, res, find, titleAttr) {

	var assert = api.assert(error, 'view', req.user.email, res);
	find(req, res, assert, function(entity, rating) {

		if (rating) {
			api.success(res, _.pick(rating, ['value', 'created_at', 'modified_at' ]));
		} else {
			api.fail(res, error('No rating of <%s> for "%s" found.', req.user.email, entity[titleAttr]), 404);
		}
	});
}

/**
 * Generic function for creating a rating.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {string} ref Reference name
 * @param {function} find Function that returns entity and rating.
 */
function create(req, res, ref, find) {

	var assert = api.assert(error, 'create', req.user.email, res);
	find(req, res, assert, function(entity, duplicateRating) {
		if (duplicateRating) {
			return api.fail(res, error('Cannot vote twice. Use PUT in order to update a vote.').warn('create'), 400);
		}
		var obj = {
			_from: req.user,
			_ref: {},
			value: req.body.value,
			created_at: new Date()
		};
		obj._ref[ref] = entity;
		var rating = new Rating(obj);

		rating.validate(function(err) {
			if (err) {
				return api.fail(res, error('Validations failed. See below for details.').errors(err.errors).warn('create'), 422);
			}
			rating.save(assert(function(rating) {

				updateRatedEntity(req, res, ref, assert, entity, rating, 201);
			}, 'Error saving rating.'));
		});
	});
}

/**
 * Generic function for updating a rating.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {string} ref Reference name
 * @param {function} find Function that returns entity and rating.
 * @param {string} titleAttr Attribute of the entity that contains a title
 */
function update(req, res, ref, find, titleAttr) {

	var assert = api.assert(error, 'update', req.user.email, res);
	find(req, res, assert, function(entity, rating) {
		if (!rating) {
			return api.fail(res, error('No rating of <%s> for "%s" found.', req.user.email, entity[titleAttr]), 404);
		}

		rating.value = req.body.value;
		rating.modified_at = new Date();

		rating.validate(function(err) {
			if (err) {
				return api.fail(res, error('Validations failed. See below for details.').errors(err.errors).warn('create'), 422);
			}

			rating.save(assert(function(rating) {

				updateRatedEntity(req, res, ref, assert, entity, rating, 200);
			}, 'Error saving rating.'));
		});
	});
}

/**
 * Updates an entity with new rating data.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {string} ref Reference name
 * @param {function} assert Assert object
 * @param {object} entity Found entity
 * @param {object} rating New rating
 * @param {int} status Success status, either 200 or 201.
 */
function updateRatedEntity(req, res, ref, assert, entity, rating, status) {

	var q = {};
	q['_ref.' + ref] = entity;
	Rating.find(q, assert(function(ratings) {

		logger.info('[api|rating] User <%s> rated %s "%s" %d.', req.user.email, ref, entity.id, rating.value);

		// calculate average rating
		var avg = _.reduce(_.pluck(ratings, 'value'), function (sum, value) {
				return sum + value;
			}, 0) / ratings.length;

		var summary = { average: Math.round(avg * 1000) / 1000, votes: ratings.length };
		entity.update({ rating: summary }, assert(function () {

			var result = { value: rating.value, created_at: rating.created_at };
			result[ref] = summary;

			// if not 201, add modified date
			if (status === 200) {
				result.modified_at = rating.modified_at;
			}
			return api.success(res, result, status);
		}));

	}, 'Error fetching existent ratings.'));
}

/**
 * Returns entity and rating for a given type.
 *
 * If entity is not found, a 404 is returned to the client and the callback isn't called.
 *
 * @param {Schema} Model model that can be rated
 * @param {string} ref Reference name
 * @returns {Function} function that takes req, res, assert and a callback which is launched with entity and rating as parameter
 */
function find(Model, ref) {
	return function(req, res, assert, callback) {
		Model.findOne({ id: req.params.id }, assert(function(entity) {
			if (!entity) {
				return api.fail(res, error('No such %s with ID "%s"', ref, req.params.id), 404);
			}
			var q = { _from: req.user };
			q['_ref.' + ref] = entity;
			Rating.findOne(q, assert(function (rating) {
				callback(entity, rating);
			}, 'Error searching for current rating.'));
		}, 'Error finding ' + ref + ' in order to get rating from <%s>.'));
	};
}
