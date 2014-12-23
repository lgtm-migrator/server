"use strict"; /*global describe, before, after, it*/

var _ = require('lodash');
var request = require('superagent');
var expect = require('expect.js');

var superagentTest = require('../modules/superagent-test');
var hlp = require('../modules/helper');

superagentTest(request);

describe('The VPDB `user` API', function() {

	before(function(done) {
		hlp.setupUsers(request, {
			root: { roles: [ 'root' ]},
			admin: { roles: [ 'admin' ]},
			member: { roles: [ 'member' ]},
			chpass1: { roles: [ 'member' ]},
			chpass2: { roles: [ 'member' ]}
		}, done);
	});

	after(function(done) {
		hlp.cleanup(request, done);
	});

	describe('when listing all users', function() {

		it('the number of current users should be returned', function(done) {
			request
				.get('/api/v1/users')
				.as('admin')
				.save({ path: 'users/list' })
				.end(function(err, res) {
					hlp.expectStatus(err, res, 200);
					expect(res.body).to.be.an('array');
					expect(res.body).to.have.length(_.keys(hlp.users).length);
					done();
				});
		});
	});

	describe('when searching for a user', function() {

		describe('at least one user should be returned', function() {

			it('with full details as admin', function(done) {
				request
					.get('/api/v1/users?q=' + hlp.getUser('member').name.substr(0, 3))
					.saveResponse({ path: 'users/search-as-admin' })
					.as('admin')
					.end(function(err, res) {
						hlp.expectStatus(err, res, 200);
						expect(res.body).to.be.an('array');
						expect(res.body.length).to.be.greaterThan(0);
						expect(res.body[0]).to.have.property('email');
						done();
					});
			});

			it('with minimal infos as member', function(done) {
				request
					.get('/api/v1/users?q=' + hlp.getUser('member').name.substr(0, 3))
					.save({ path: 'users/search-as-member' })
					.as('member')
					.end(function(err, res) {
						hlp.expectStatus(err, res, 200);
						expect(res.body).to.be.an('array');
						expect(res.body.length).to.be.greaterThan(0);
						expect(res.body[0]).not.to.have.property('email');
						done();
					});
			});
		});
	});

	describe('when fetching a user', function() {

		it('should return full details', function(done) {
			request
				.get('/api/v1/users/' + hlp.getUser('member').id)
				.save({ path: 'users/view' })
				.as('admin')
				.end(function(err, res) {
					hlp.expectStatus(err, res, 200);
					expect(res.body).to.be.an('object');
					done();
				});
		});
	});

	describe('when a user registrates', function() {

		it('should be able to retrieve an authentication token', function(done) {
			var user = hlp.genUser();
			request
				.post('/api/v1/users')
				.save({ path: 'users/post' })
				.send(user)
				.end(function(err, res) {
					hlp.expectStatus(err, res, 201);
					hlp.doomUser(res.body.id);
					// try to obtain a token
					request.post('/api/v1/authenticate').send(_.pick(user, 'username', 'password')).end(hlp.status(200, done));
				});
		});

		it('should fail when invalid parameters', function(done) {
			request
				.post('/api/v1/users')
				.saveResponse({ path: 'users/post' })
				.send({
					username: 'x',
					password: 'xxx',
					email: 'xxx'
				}).end(function(err, res) {
					hlp.expectStatus(err, res, 422);
					expect(res.body.errors).to.be.an('array');
					expect(res.body.errors).to.have.length(3);
					done();
				});
		});
	});

	describe('when providing a valid authentication token', function() {

		it('should display the user profile', function(done) {
			request
				.get('/api/v1/user')
				.as('root')
				.end(function(err, res) {
					hlp.expectStatus(err, res, 200);
					expect(res.body.email).to.eql(hlp.getUser('root').email);
					expect(res.body.name).to.eql(hlp.getUser('root').name);
					done();
				});
		});

		it('should return a token refresh header in any API response', function(done) {
			request
				.get('/api/v1/ping')
				.as('admin')
				.end(function(err, res) {
					expect(res.headers['x-token-refresh']).not.to.be.empty();
					done();
				});
		});
	});

	describe('when a user updates its profile', function() {

		it('should succeed when sending an empty object', function (done) {
			request.patch('/api/v1/user').as('member').send({}).end(hlp.status(200, done));
		});

	});

	describe('when a user updates its location', function() {

		it('should succeed when providing a valid location', function (done) {
			var location = 'New York City';
			request
				.patch('/api/v1/user')
				.as('member')
				.send({location: location})
				.end(function (err, res) {
					hlp.expectStatus(err, res, 200);

					// check updated value
					request.get('/api/v1/user').as('member').end(function (err, res) {
						hlp.expectStatus(err, res, 200);
						expect(res.body.location).to.be(location);
						done();
					});
				});
		});
	});

	describe('when a user updates its email', function() {

		it('should succeed when providing a valid email', function(done) {
			var email = 'info@vpdb.ch';
			request
				.patch('/api/v1/user')
				.as('member')
				.send({ email: email })
				.end(function(err, res) {
					hlp.expectStatus(err, res, 200);

					// check updated value
					request.get('/api/v1/user').as('member').end(function(err, res) {
						hlp.expectStatus(err, res, 200);
						expect(res.body.email).to.be(email);
						done();
					});
				});
		});

		it('should succeed when providing the same email', function(done) {
			request
				.patch('/api/v1/user')
				.as('member')
				.send({ email: hlp.getUser('member').email })
				.end(hlp.status(200, done));
		});

		it('should fail when providing an invalid email', function(done) {
			request
				.patch('/api/v1/user')
				.as('member')
				.send({ email: 'no-email' })
				.end(function(err, res) {
					hlp.expectValidationError(err, res, 'email', 'must be in the correct format');
					done();
				});
		});

		it('should fail when providing an email that already exists', function(done) {
			request
				.patch('/api/v1/user')
				.as('member')
				.send({ email: hlp.getUser('root').email })
				.end(function(err, res) {
					hlp.expectValidationError(err, res, 'email', 'is already taken');
					done();
				});
		});

	});

	describe('when a local user changes its password', function() {

		it('should fail if the current password is not provided', function(done) {
			request
				.patch('/api/v1/user')
				.as('member')
				.send({ password: 'yyy' })
				.end(function(err, res) {
					hlp.expectValidationError(err, res, 'currentPassword', 'must provide your current password');
					done();
				});
		});

		it('should fail if the current password is invalid when providing new password', function(done) {
			request
				.patch('/api/v1/user')
				.as('member')
				.send({ currentPassword: 'xxx', password: 'yyy' })
				.end(function(err, res) {
					hlp.expectValidationError(err, res, 'currentPassword', 'invalid password');
					done();
				});
		});

		it('should fail if the new password is invalid', function(done) {
			request
				.patch('/api/v1/user')
				.as('member')
				.send({
					currentPassword: hlp.getUser('member').password,
					password: 'xxx'
				})
				.end(function(err, res) {
					hlp.expectValidationError(err, res, 'password', 'at least 6 characters');
					done();
				});
		});

		it('should grant authentication with the new password', function(done) {
			var user = hlp.getUser('chpass1');
			var newPass = '12345678';
			request
				.patch('/api/v1/user')
				.as('chpass1')
				.send({ currentPassword: user.password, password: newPass })
				.end(hlp.status(200, function() {
					request
						.post('/api/v1/authenticate')
						.send({ username: user.name, password: newPass })
						.end(hlp.status(200, done));
				}));
		});

		it('should deny authentication with old password', function(done) {
			var user = hlp.getUser('chpass2');
			var newPass = '12345678';
			request
				.patch('/api/v1/user')
				.as('chpass2')
				.send({ currentPassword: user.password, password: newPass })
				.end(hlp.status(200, function() {
					request
						.post('/api/v1/authenticate')
						.send({ username: user.name, password: user.password })
						.end(hlp.status(401, 'Wrong username or password', done));
				}));
		});
	});

	describe('when a non-local user sets its password', function() {

		it('should succeed without providing a current password');
		it('should fail the second time without providng a current password');
	});

	describe('when an admin updates a user', function() {

		it('should work providing the minimal field set', function(done) {
			var changedUser = hlp.genUser();
			request
				.put('/api/v1/users/' + hlp.getUser('member').id)
				.save({ path: 'users/update' })
				.as('admin')
				.send({
					email: changedUser.email,
					username: changedUser.username,
					name: changedUser.username,
					is_active: true,
					roles: [ 'member' ]
				})
				.end(function(err, res) {
					hlp.expectStatus(err, res, 200);
					request.get('/api/v1/users/' + hlp.getUser('member').id).as('admin').end(function(err, res) {
						hlp.expectStatus(err, res, 200);
						expect(res.body).to.be.an('object');
						expect(res.body.email).to.be(changedUser.email);
						expect(res.body.username).to.be(changedUser.username);
						done();
					});
				});
		});

		it('should fail if mandatory fields are missing', function(done) {
			request
				.put('/api/v1/users/' + hlp.getUser('member').id)
				.saveResponse({ path: 'users/update' })
				.as('admin')
				.send({})
				.end(function(err, res) {
					hlp.expectStatus(err, res, 422);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('errors');
					expect(res.body.errors).to.have.length(5);
					done();
				});
		});

		it('should fail if read-only fields are provided', function(done) {
			var changedUser = hlp.genUser();
			request
				.put('/api/v1/users/' + hlp.getUser('member').id)
				.as('admin')
				.send({
					email: changedUser.email,
					username: changedUser.username,
					name: changedUser.username,
					is_active: true,
					roles: [ 'member' ],
					id: '123456789',
					provider: 'github',
					created_at: new Date(),
					gravatar_id: 'cca50395f5c76fe4aab0fa6657ec84a3'
				})
				.end(function(err, res) {
					hlp.expectStatus(err, res, 422);
					expect(res.body).to.be.an('object');
					expect(res.body).to.have.property('errors');
					expect(res.body.errors).to.have.length(4);
					done();
				});
		});
	});

});