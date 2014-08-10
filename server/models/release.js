/*
 * VPDB - Visual Pinball Database
 * Copyright (C) 2014 freezy <freezy@xbmc.org>
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

var _ = require('underscore');
var logger = require('winston');
var shortId = require('shortid');
var mongoose = require('mongoose');
var validator = require('validator');
var uniqueValidator = require('mongoose-unique-validator');
var fileRef = require('../models/plugins/fileRef');

var storage = require('../modules/storage');

var Schema = mongoose.Schema;

var maxAspectRatioDifference = 0.2;


//-----------------------------------------------------------------------------
// SCHEMA
//-----------------------------------------------------------------------------
var fields = {
	id:           { type: String, required: true, unique: true, 'default': shortId.generate },
	name:         { type: String, required: 'Name must be provided.' },
	description:  { type: String },
	versions: [
		{
			version:      { type: String, required: 'Version must be provided.' },
			release_info: { type: String },
			flavors: [
				{
					orientation: { type: String, required: true, enum: { values: [ 'ws', 'fs' ], message: 'Invalid orientation. Valid orientation are: ["ws", "fs"].' }},
					lightning:   { type: String, required: true, enum: { values: [ 'day', 'night' ], message: 'Invalid lightning. Valid options are: ["day", "night"].' }}
				}
			]
		}
	],
	authors: [
		{
			_user: { type: Schema.ObjectId, required: true, ref: 'User' },
			roles: [ String ]
		}
	],
	_tags: [ { type: Schema.ObjectId, required: true, ref: 'Tag' } ]

};
var ReleaseSchema = new Schema(fields);


//-----------------------------------------------------------------------------
// PLUGINS
//-----------------------------------------------------------------------------
ReleaseSchema.plugin(uniqueValidator, { message: 'The {PATH} "{VALUE}" is already taken.' });


//-----------------------------------------------------------------------------
// OPTIONS
//-----------------------------------------------------------------------------
ReleaseSchema.set('toObject', { virtuals: true });
if (!ReleaseSchema.options.toObject) {
	ReleaseSchema.options.toObject = {};
}
ReleaseSchema.options.toObject.transform = function(doc, release) {
	delete release.__v;
	delete release._id;
};

mongoose.model('Release', ReleaseSchema);
logger.info('[model] Model "release" registered.');
