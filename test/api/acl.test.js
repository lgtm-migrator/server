"use strict"; /*global describe, before, after, it*/

var request = require('superagent');
var expect = require('expect.js');

var superagentTest = require('../modules/superagent-test');
var hlp = require('../modules/helper');

superagentTest(request);

describe('The ACLs of the VPDB API', function() {

	before(function(done) {
		hlp.setupUsers(request, {
			root: { roles: [ 'root' ]},
			admin: { roles: [ 'admin' ]},
			admin2: { roles: [ 'admin' ]},
			contributor: { roles: [ 'contributor' ]},
			member: { roles: [ 'member' ]}
		}, done);
	});

	after(function(done) {
		hlp.teardownUsers(request, done);
	});

	describe('for anonymous clients', function() {

		it('should deny access to user list', function(done) {
			request.get('/api/users').saveResponse({ path: 'users/list' }).end(hlp.status(401, done));
		});

		it('should deny access to user search', function(done) {
			request.get('/api/users?q=123').end(hlp.status(401, done));
		});

		it('should deny access to user details', function(done) {
			request.get('/api/users/' + hlp.getUser('member').id).saveResponse({ path: 'users/view' }).send({}).end(hlp.status(401, done));
		});

		it('should deny access to user update', function(done) {
			request.put('/api/users/' + hlp.getUser('member').id).saveResponse({ path: 'users/update' }).send({}).end(hlp.status(401, done));
		});

		it('should deny access to user delete', function(done) {
			request.del('/api/users/1234567890abcdef').saveResponse({ path: 'users/del' }).end(hlp.status(401, done));
		});

		it('should deny access to user profile', function(done) {
			request.get('/api/user').end(hlp.status(401, done));
		});

		it('should deny updates of user profile', function(done) {
			request.put('/api/user').send({}).end(hlp.status(401, done));
		});

		it('should deny access to roles list', function(done) {
			request.get('/api/roles').end(hlp.status(401, done));
		});

		it('should deny access to ipdb query', function(done) {
			request.get('/api/ipdb/4441').end(hlp.status(401, done));
		});

		it('should deny access to file upload', function(done) {
			request.post('/storage').end(hlp.status(401, done));
		});

		it('should deny access to file deletion', function(done) {
			request.del('/api/files/123456789').end(hlp.status(401, done));
		});

		it('should allow access to file details', function(done) {
			request.get('/api/files/123456789').end(hlp.status(404, 'No such file', done));
		});

		it('should allow check for existing games', function(done) {
			request.head('/api/games/mb').end(hlp.status(404, done));
		});

		it('should deny access to game creation', function(done) {
			request.post('/api/games').send({}).end(hlp.status(401, done));
		});

		it('should deny access to game deletion', function(done) {
			request.del('/api/games/mb').send({}).end(hlp.status(401, done));
		});

		it('should allow access to ping', function(done) {
			request.get('/api/ping').end(hlp.status(200, done));
		});

		it('should allow to list tags', function(done) {
			request.get('/api/tags').end(hlp.status(200, done));
		});

		it('should deny access to create tags', function(done) {
			request.post('/api/tags').send({}).end(hlp.status(401, done));
		});

		it('should allow to list vpbuilds', function(done) {
			request.get('/api/vpbuilds').end(hlp.status(200, done));
		});

		it('should deny access to create vpbuilds', function(done) {
			request.post('/api/vpbuilds').send({}).end(hlp.status(401, done));
		});

	});

	describe('for logged clients (role member)', function() {

		it('should deny access to user list', function(done) {
			request.get('/api/users').as('member').saveResponse({ path: 'users/list' }).end(hlp.status(403, done));
		});

		it('should deny access to user search for less than 3 chars', function(done) {
			request.get('/api/users?q=12').as('member').end(hlp.status(403, done));
		});

		it('should allow access to user search for more than 2 chars', function(done) {
			request.get('/api/users?q=123').as('member').end(hlp.status(200, done));
		});

		it('should only return minmal user info when searching other users', function(done) {
			request
				.get('/api/users?q=' + hlp.getUser('member').name.substr(0, 3))
				.as('member')
				.end(function(err, res) {
					hlp.expectStatus(err, res, 200);
					expect(res.body.length).to.be.above(0);
					expect(res.body[0]).to.not.have.property('email');
					expect(res.body[0]).to.have.property('name');
					done();
				});
		});

		it('should deny access to user details', function(done) {
			request.get('/api/users/' + hlp.getUser('member').id).saveResponse({ path: 'users/view' }).as('member').send({}).end(hlp.status(403, done));
		});

		it('should deny access to user update', function(done) {
			request.put('/api/users/' + hlp.getUser('member').id).as('member').send({}).end(hlp.status(403, done));
		});

		it('should deny access to user delete', function(done) {
			request.del('/api/users/1234567890abcdef').saveResponse({ path: 'users/del' }).as('member').end(hlp.status(403, done));
		});

		it('should allow access to user profile', function(done) {
			request.get('/api/user').as('member').end(hlp.status(200, done));
		});

		it('should deny access to roles list', function(done) {
			request.get('/api/roles').as('member').end(hlp.status(403, done));
		});

		it('should deny access to ipdb query', function(done) {
			request.get('/api/ipdb/4441').as('member').end(hlp.status(403, done));
		});

		it('should allow access to file upload', function(done) {
			request.post('/storage').as('member').end(hlp.status(422, done));
		});

		it('should allow access to file deletion', function(done) {
			request.del('/api/files/123456789').as('member').end(hlp.status(404, done));
		});

		it('should allow access to file details', function(done) {
			request.get('/api/files/123456789').as('member').end(hlp.status(404, done));
		});

		it('should allow check for existing games', function(done) {
			request.head('/api/games/mb').as('member').end(hlp.status(404, done));
		});

		it('should deny access to game creation', function(done) {
			request.post('/api/games').send({}).as('member').end(hlp.status(403, done));
		});

		it('should deny access to game deletion', function(done) {
			request.del('/api/games/mb').as('member').end(hlp.status(403, done));
		});

		it('should allow access to ping', function(done) {
			request.get('/api/ping').as('member').end(hlp.status(200, done));
		});

		it('should allow to list tags', function(done) {
			request.get('/api/tags').as('member').end(hlp.status(200, done));
		});

		it('should allow to create tags', function(done) {
			request.post('/api/tags').send({}).as('member').end(hlp.status(422, done));
		});

		it('should allow to list vpbuilds', function(done) {
			request.get('/api/vpbuilds').as('member').end(hlp.status(200, done));
		});

		it('should allow to create vpbuilds', function(done) {
			request.post('/api/vpbuilds').as('member').send({}).end(hlp.status(422, done));
		});

	});

	describe('for members with the `contributor` role', function() {

		it('should deny access to user list', function(done) {
			request.get('/api/users').as('contributor').end(hlp.status(403, done));
		});

		it('should deny access to user search for less than 3 chars', function(done) {
			request.get('/api/users?q=12').as('contributor').end(hlp.status(403, done));
		});

		it('should allow access to user search for more than 2 chars', function(done) {
			request.get('/api/users?q=123').as('contributor').end(hlp.status(200, done));
		});

		it('should only return minmal user info when searching other users', function(done) {
			request
				.get('/api/users?q=' + hlp.getUser('member').name.substr(0, 3))
				.as('contributor')
				.end(function(err, res) {
					hlp.expectStatus(err, res, 200);
					expect(res.body.length).to.be.above(0);
					expect(res.body[0]).to.not.have.property('email');
					expect(res.body[0]).to.have.property('name');
					done();
				});
		});

		it('should deny access to user details', function(done) {
			request.get('/api/users/' + hlp.getUser('member').id).as('contributor').send({}).end(hlp.status(403, done));
		});

		it('should deny access to user update', function(done) {
			request.put('/api/users/' + hlp.getUser('member').id).as('contributor').send({}).end(hlp.status(403, done));
		});

		it('should deny access to user delete', function(done) {
			request.del('/api/users/' + hlp.getUser('member').id).as('contributor').end(hlp.status(403, done));
		});

		it('should allow access to user profile', function(done) {
			request.get('/api/user').as('contributor').end(hlp.status(200, done));
		});

		it('should deny access to roles list', function(done) {
			request.get('/api/roles').as('contributor').end(hlp.status(403, done));
		});

		it('should allow access to ipdb query', function(done) {
			request.get('/api/ipdb/4441?dryrun=1').as('contributor').end(hlp.status(200, done));
		});

		it('should allow access to file upload', function(done) {
			request.post('/storage').as('contributor').send({}).end(hlp.status(422, done));
		});

		it('should allow check for existing games', function(done) {
			request.head('/api/games/mb').as('contributor').end(hlp.status(404, done));
		});

		it('should allow to create games', function(done) {
			request.post('/api/games').send({}).as('contributor').end(hlp.status(422, done));
		});

		it('should allow to delete a game', function(done) {
			request.del('/api/games/mb').as('contributor').end(hlp.status(404, done));
		});

		it('should allow access to ping', function(done) {
			request.get('/api/ping').as('contributor').end(hlp.status(200, done));
		});

		it('should allow to list tags', function(done) {
			request.get('/api/tags').as('contributor').end(hlp.status(200, done));
		});

		it('should allow to create tags', function(done) {
			request.post('/api/tags').send({}).as('contributor').end(hlp.status(422, done));
		});

		it('should allow to list vpbuilds', function(done) {
			request.get('/api/vpbuilds').as('contributor').end(hlp.status(200, done));
		});

		it('should allow to create vpbuilds', function(done) {
			request.post('/api/vpbuilds').as('contributor').send({}).end(hlp.status(422, done));
		});

	});

	describe('for administrators', function() {

		it('should allow to list users', function(done) {
			request.get('/api/users').as('admin').end(hlp.status(200, done));
		});

		it('should allow access to user search for less than 3 chars', function(done) {
			request.get('/api/users?q=12').as('admin').end(hlp.status(200, done));
		});

		it('should allow access to user search for more than 2 chars', function(done) {
			request.get('/api/users?q=123').as('admin').end(hlp.status(200, done));
		});

		it('should return detailed user info when listing other users', function(done) {
			request
				.get('/api/users?q=' + hlp.getUser('member').name.substr(0, 3))
				.as('admin')
				.end(function(err, res) {
					hlp.expectStatus(err, res, 200);
					expect(res.body.length).to.be.above(0);
					expect(res.body[0]).to.have.property('email');
					expect(res.body[0]).to.have.property('name');
					done();
				});
		});

		it('should grant access to user details', function(done) {
			request.get('/api/users/' + hlp.getUser('member').id).as('admin').send({}).end(hlp.status(200, done));
		});

		it('should allow user update of non-admin', function(done) {
			request.put('/api/users/' + hlp.getUser('member').id).as('admin').send({}).end(hlp.status(422, done));
		});

		it('should deny user update of admin', function(done) {
			request.put('/api/users/' + hlp.getUser('admin2').id).as('admin').send({}).end(hlp.status(403, done));
		});

		it('should deny user update himself', function(done) {
			request.put('/api/users/' + hlp.getUser('admin').id).as('admin').send({}).end(hlp.status(403, done));
		});

		it('should deny access to user delete', function(done) {
			request.del('/api/users/1234567890abcdef').as('admin').end(hlp.status(403, done));
		});

		it('should allow access to user profile', function(done) {
			request.get('/api/user').as('admin').end(hlp.status(200, done));
		});

		it('should allow access to roles list', function(done) {
			request.get('/api/roles').as('admin').end(hlp.status(200, done));
		});

		it('should deny access to ipdb query', function(done) {
			request.get('/api/ipdb/4441?dryrun=1').as('admin').end(hlp.status(403, done));
		});

		it('should allow access to file upload', function(done) {
			request.post('/storage').as('admin').send({}).end(hlp.status(422, done));
		});

		it('should allow check for existing games', function(done) {
			request.head('/api/games/mb').as('admin').end(hlp.status(404, done));
		});

		it('should deny to create games', function(done) {
			request.post('/api/games').send({}).as('admin').end(hlp.status(403, done));
		});

		it('should deny access to game deletion', function(done) {
			request.del('/api/games/mb').as('admin').end(hlp.status(403, done));
		});

		it('should allow access to ping', function(done) {
			request.get('/api/ping').as('admin').end(hlp.status(200, done));
		});

		it('should allow to list tags', function(done) {
			request.get('/api/tags').as('admin').end(hlp.status(200, done));
		});

		it('should allow to create tags', function(done) {
			request.post('/api/tags').send({}).as('admin').end(hlp.status(422, done));
		});

		it('should allow to list vpbuilds', function(done) {
			request.get('/api/vpbuilds').as('admin').end(hlp.status(200, done));
		});

		it('should allow to create vpbuilds', function(done) {
			request.post('/api/vpbuilds').as('admin').send({}).end(hlp.status(422, done));
		});

	});

	describe('for the root user', function() {

		it('should allow to list users', function(done) {
			request.get('/api/users').as('root').end(hlp.status(200, done));
		});
		it('should allow access to user search for less than 3 chars', function(done) {
			request.get('/api/users?q=12').as('root').end(hlp.status(200, done));
		});
		it('should allow access to user search for more than 2 chars', function(done) {
			request.get('/api/users?q=123').as('root').end(hlp.status(200, done));
		});
		it('should return detailed user info when listing other users', function(done) {
			request
				.get('/api/users?q=' + hlp.getUser('member').name.substr(0, 3))
				.as('root')
				.end(function(err, res) {
					hlp.expectStatus(err, res, 200);
					expect(res.body.length).to.be.above(0);
					expect(res.body[0]).to.have.property('email');
					expect(res.body[0]).to.have.property('name');
					done();
				});
		});

		it('should grant access to user details', function(done) {
			request.get('/api/users/' + hlp.getUser('member').id).as('root').send({}).end(hlp.status(200, done));
		});

		it('should allow user update of non-admin', function(done) {
			request.put('/api/users/' + hlp.getUser('member').id).as('root').send({}).end(hlp.status(422, done));
		});

		it('should allow user update of admin', function(done) {
			request.put('/api/users/' + hlp.getUser('admin').id).as('root').send({}).end(hlp.status(422, done));
		});

		it('should allow update himself', function(done) {
			request.put('/api/users/' + hlp.getUser('root').id).as('root').send({}).end(hlp.status(422, done));
		});

		it('should deny access to user delete', function(done) {
			request.del('/api/users/1234567890abcdef').as('root').end(hlp.status(403, done));
		});

		it('should allow access to user profile', function(done) {
			request.get('/api/user').as('root').end(hlp.status(200, done));
		});

		it('should allow access to roles list', function(done) {
			request.get('/api/roles').as('root').end(hlp.status(200, done));
		});

		it('should allow access to ipdb query', function(done) {
			request.get('/api/ipdb/4441?dryrun=1').as('root').end(hlp.status(200, done));
		});

		it('should allow access to file upload', function(done) {
			request.post('/storage').as('root').send({}).end(hlp.status(422, done));
		});

		it('should allow check for existing games', function(done) {
			request.head('/api/games/mb').as('root').end(hlp.status(404, done));
		});

		it('should allow to create games', function(done) {
			request.post('/api/games').send({}).as('root').end(hlp.status(422, done));
		});

		it('should allow to delete a game', function(done) {
			request.del('/api/games/mb').as('root').end(hlp.status(404, done));
		});

		it('should allow access to ping', function(done) {
			request.get('/api/ping').as('root').end(hlp.status(200, done));
		});

		it('should allow to list tags', function(done) {
			request.get('/api/tags').as('root').end(hlp.status(200, done));
		});

		it('should allow to create tags', function(done) {
			request.post('/api/tags').send({}).as('root').end(hlp.status(422, done));
		});

		it('should allow to list vpbuilds', function(done) {
			request.get('/api/vpbuilds').as('root').end(hlp.status(200, done));
		});

		it('should allow to create vpbuilds', function(done) {
			request.post('/api/vpbuilds').as('root').send({}).end(hlp.status(422, done));
		});

	});

});