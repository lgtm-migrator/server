"use strict";

var fs = require('fs');
var gm = require('gm');
var path = require('path');
var expect = require('expect.js');
var pleasejs = require('pleasejs');

var mp4 = path.resolve(__dirname, '../../data/test/files/afm.f4v');
var avi = path.resolve(__dirname, '../../data/test/files/afm.avi');
var vpt = path.resolve(__dirname, '../../data/test/files/empty.vpt');

exports.createBackglass = function(user, request, done) {

	var fileType = 'backglass';
	var mimeType = 'image/png';
	var name = 'backglass.png';
	gm(640, 512, pleasejs.make_color()).toBuffer('PNG', function(err, data) {
		if (err) {
			throw err;
		}
		request
			.post('/storage/v1')
			.query({ type: fileType })
			.type(mimeType)
			.set('Content-Disposition', 'attachment; filename="' + name + '"')
			.set('Content-Length', data.length)
			.send(data)
			.as(user)
			.end(function(res) {
				expect(res.status).to.be(201);
				done(res.body);
			});
	});
};

exports.createPlayfield = function(user, request, done) {

	var fileType = 'playfield';
	var mimeType = 'image/png';
	var name = 'playfield.png';
	gm(1920, 1080, pleasejs.make_color()).toBuffer('PNG', function(err, data) {
		if (err) {
			throw err;
		}
		request
			.post('/storage/v1')
			.query({ type: fileType })
			.type(mimeType)
			.set('Content-Disposition', 'attachment; filename="' + name + '"')
			.set('Content-Length', data.length)
			.send(data)
			.as(user)
			.end(function(res) {
				expect(res.status).to.be(201);
				done(res.body);
			});
	});
};

exports.createTextfile = function(user, request, done) {
	var fileType = 'readme';
	request
		.post('/storage/v1')
		.query({ type: fileType })
		.type('text/plain')
		.set('Content-Disposition', 'attachment; filename="README.txt"')
		.send('You are looking at a text file generated during a test.')
		.as(user)
		.end(function(res) {
			expect(res.status).to.be(201);
			done(res.body);
		});
};

exports.createMp4 = function(user, request, done) {

	var data = fs.readFileSync(mp4);
	request
		.post('/storage/v1')
		.query({ type: 'playfield-fs' })
		.type('video/mp4')
		.set('Content-Disposition', 'attachment; filename="playfield.mp4"')
		.set('Content-Length', data.length)
		.send(data)
		.as(user)
		.end(function(err, res) {
			expect(res.status).to.be(201);
			done(res.body);
		});
};

exports.createAvi = function(user, request, done) {

	var data = fs.readFileSync(avi);
	request
		.post('/storage/v1')
		.query({ type: 'playfield-fs' })
		.type('video/avi')
		.set('Content-Disposition', 'attachment; filename="playfield.avi"')
		.set('Content-Length', data.length)
		.send(data)
		.as(user)
		.end(function(err, res) {
			expect(res.status).to.be(201);
			done(res.body);
		});
};

exports.createVpt = function(user, request, done) {

	var data = fs.readFileSync(vpt);
	request
		.post('/storage/v1')
		.query({ type: 'release' })
		.type('application/x-visual-pinball-table')
		.set('Content-Disposition', 'attachment; filename="test-table.vpt"')
		.set('Content-Length', data.length)
		.send(data)
		.as(user)
		.end(function(err, res) {
			expect(res.status).to.be(201);
			done(res.body);
		});
};