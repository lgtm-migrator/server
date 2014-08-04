"use strict"; /*global describe, before, after, it*/

var fs = require('fs');
var path = require('path');
var async = require('async');
var request = require('superagent');
var expect = require('expect.js');

var superagentTest = require('../modules/superagent-test');
var hlp = require('../modules/helper');

superagentTest(request);

describe('The VPDB `game` API', function() {

	var backglass = path.resolve(__dirname, '../../data/test/files/backglass_half_blank.png');

	before(function(done) {
		hlp.setupUsers(request, {
			contributor: { roles: [ 'contributor' ]}
		}, done);
	});

	after(function(done) {
		hlp.cleanup(request, done);
	});

	describe('when posting a new game', function() {

		it('should succeed if provided data is correct', function(done) {

			var data = fs.readFileSync(backglass);
			var fileType = 'backglass';
			var mimeType = 'image/png';
			var name = 'backglass.png';

			request
				.post('/api/files')
				.query({ type: fileType })
				.type(mimeType)
				.set('Content-Disposition', 'attachment; filename="' + name + '"')
				.set('Content-Length', data.length)
				.send(data)
				.as('contributor')
				.end(function(res) {
					expect(res.status).to.be(201);
					request
						.post('/api/games')
						.as('contributor')
						.send(hlp.game.getGame({ _media: { backglass: res.body.id }}))
						.end(function(err, res) {
							expect(err).to.eql(null);
							expect(res.status).to.be(201);
							hlp.doomGame('contributor', res.body.id);
							done();
						});
				});
		});

		it('should fail if a referenced file is not of the same owner');
		it('should fail if a referenced file is already referenced');

	});

	describe('when deleting a game', function() {

		it('should succeed as owner of the game');

	});
});