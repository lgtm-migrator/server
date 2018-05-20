/*
 * VPDB - Virtual Pinball Database
 * Copyright (C) 2018 freezy <freezy@vpdb.io>
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

import { parse as parseUrl, format as formatUrl } from 'url';
import { difference, isObject, keys, pick, extend, values, map } from 'lodash';
import { Context } from './types/context';
import { logger } from './logger';
import { config, settings } from './settings';
import { ApiError, ApiValidationError } from './api.error';
import Router from 'koa-router';
import { User } from '../users/user';
import { scope, Scope } from './scope';
import { acl } from './acl';

export abstract class Api {

	/**
	 * Handles an API request with no authorization.
	 *
	 * @param handler The API controller launched
	 * @returns A middleware function for Koa
	 */
	public anon(handler: (ctx: Context) => boolean) {
		return async (ctx: Context) => await this.handleRequest(ctx, handler);
	}

	/**
	 * Protects a resource by verifying the permissions of an authenticated user
	 * and the token used for authentication. Also the plan can is verified if
	 * provided.
	 *
	 * The only cases where a logged user is not mandatory are resources with
	 * the SERVICE scope, which are only validated against a valid application
	 * token.
	 *
	 * This also takes care of the dirty user flag, which is sent in the header
	 * if any of the user data changed since the user last accessed the API.
	 *
	 * @param handler    The API controller  launched after authentication
	 * @param resource   Required resource
	 * @param permission Required permissions
	 * @param scopes     Required scopes of the authentication method
	 * @param planAttrs  Key/value pairs of plan options that must match, e.g. { enableAppTokens: false }
	 * @returns A middleware function for Koa
	 */
	public auth(handler: (ctx: Context) => boolean, resource: string, permission: string, scopes: Scope[], planAttrs?: { [key: string]: any }) {

		return async (ctx: Context) => {

			// if authentication failed, abort.
			if (ctx.state.authError) {
				throw ctx.state.authError;
			}

			// if this resource is a service resource, we don't need a user.
			if (scopes && scope.isValid([Scope.SERVICE], scopes) && !resource && !permission && ctx.state.tokenType === 'application') {
				return await this.handleRequest(ctx, handler);
			}

			// just to be sure (auth middleware loaded?)...
			if (!ctx.state.user) {
				throw new ApiError('Something went wrong, authenticated but no user.');
			}

			// now we're authenticated, let's authorize.
			await this.authorizeUser(ctx, ctx.state.user, resource, permission, scopes, planAttrs);

			// now we're authorized, set dirty header if necessary
			const result = await ctx.redis.getAsync('dirty_user_' + ctx.state.user.id);
			if (result) {
				logger.info('[ctrl|auth] User <%s> is dirty, telling him in header.', ctx.state.user.email);
				ctx.set('X-User-Dirty', result);
				await ctx.redis.delAsync('dirty_user_' + ctx.state.user.id);
			}
			ctx.set('X-User-Dirty', '0');


			// continue with request
			await this.handleRequest(ctx, handler);
		};
	}

	/**
	 * Authorizes an authenticated user with given permissions.
	 *
	 * @param ctx        Koa context
	 * @param user       User to authorize
	 * @param resource   Required resource
	 * @param permission Required permission
	 * @param scopes     Required scopes
	 * @param planAttrs  Key/value pairs of plan options that must match, e.g. { enableAppTokens: false }
	 * @throws {ApiError} If authorization failed.
	 */
	private async authorizeUser(ctx: Context, user: User, resource: string, permission: string, scopes: Scope[], planAttrs: { [key: string]: any }): Promise<void> {

		// check scopes
		if (!scope.isValid(scopes, ctx.state.tokenScopes)) {
			throw new ApiError('Your token has an invalid scope: [ "%s" ] (required: [ "%s" ])', (ctx.state.tokenScopes || []).join('", "'), (scopes || []).join('", "')).status(401).log();
		}

		// check plan config if provided
		if (isObject(planAttrs)) {
			for (let key of keys(planAttrs)) {
				let val = planAttrs[key];
				if (user.planConfig[key] !== val) {
					throw new ApiError('User <%s> with plan "%s" tried to access `%s` but was denied access due to missing plan configuration (%s is %s instead of %s).',
						user.email, user._plan, ctx.url, key, val, user.planConfig[key]).display('Access denied').status(403).log();
				}
			}
		}

		// check permissions
		if (resource && permission) {
			const granted = await acl.isAllowed(user.id, resource, permission);
			if (!granted) {
				throw new ApiError('User <%s> tried to access `%s` but was denied access due to missing permissions to %s/%s.', user.email, ctx.url, resource, permission).display('Access denied').status(403).log();
			}
		}
	}

	/**
	 * The API call was successful.
	 *
	 * @param ctx          Koa context
	 * @param body         Response body or null if no response body to send.
	 * @param [status=200] HTTP status code
	 * @param [opts]       Additional options such as pagination options and headers.
	 * @return {boolean}   Boolean indicating success.
	 */
	protected success(ctx: Context, body?: any, status: number = 200, opts: SuccessOpts = {}) {

		if (opts.pagination) {
			const pageLinks: { first?: string, prev?: string, next?: string, last?: string } = {};
			const currentUrl = parseUrl(settings.apiHost() + ctx.request.url, true);
			delete currentUrl.search;
			const paginatedUrl = (page: number, perPage: number): string => {
				currentUrl.query = extend(currentUrl.query, { page: page, per_page: perPage });
				return formatUrl(currentUrl);
			};

			const lastPage = Math.ceil(opts.pagination.count / opts.pagination.perPage);
			if (opts.pagination.page > 2) {
				pageLinks.first = paginatedUrl(1, opts.pagination.perPage);
			}
			if (opts.pagination.page > 1) {
				pageLinks.prev = paginatedUrl(opts.pagination.page - 1, opts.pagination.perPage);
			}
			if (opts.pagination.page < lastPage) {
				pageLinks.next = paginatedUrl(opts.pagination.page + 1, opts.pagination.perPage);
			}
			if (opts.pagination.page < lastPage - 1) {
				pageLinks.last = paginatedUrl(lastPage, opts.pagination.perPage);
			}

			if (values(pageLinks).length > 0) {
				ctx.set('Link', values(map(pageLinks, (link, rel) => '<' + link + '>; rel="' + rel + '"')).join(', '));
			}
			ctx.set('X-List-Page', String(opts.pagination.page));
			ctx.set('X-List-Size', String(opts.pagination.perPage));
			ctx.set('X-List-Count', String(opts.pagination.count));
		}

		if (opts.headers) {
			keys(opts.headers).forEach(name => ctx.set(name, opts.headers[name]));
		}

		ctx.status = status;
		if (body) {
			ctx.body = body;
		}
		return true;
	}

	/**
	 * Executes the API request provided by the router.
	 *
	 * @param {Context} ctx Koa context
	 * @param {(ctx: Context) => boolean} handler Handler function
	 * @returns {Promise<void>}
	 */
	private async handleRequest(ctx: Context, handler: (ctx: Context) => boolean): Promise<void> {
		const result = await handler(ctx);
		if (result !== true) {
			throw new ApiError('Must return success() in API controller.');
		}
	}

	/**
	 * Creates a MongoDb query out of a list of queries.
	 *
	 * @param query Search queries
	 * @returns {object}
	 */
	protected searchQuery(query: object[]) {
		if (query.length === 0) {
			return {};
		} else if (query.length === 1) {
			return query[0];
		} else {
			return { $and: query };
		}
	}

	/**
	 * Returns the pagination object.
	 *
	 * @param ctx Koa context
	 * @param [defaultPerPage=10] Default number of items returned if not indicated - default 10.
	 * @param [maxPerPage=50] Maximal number of items returned if not indicated - default 50.
	 * @return {{defaultPerPage: number, maxPerPage: number, page: Number, perPage: Number}}
	 */
	pagination(ctx: Context, defaultPerPage: number = 20, maxPerPage: number = 50): PaginationOpts {
		return {
			defaultPerPage: defaultPerPage,
			maxPerPage: maxPerPage,
			page: Math.max(ctx.query.page, 1) || 1,
			perPage: Math.max(0, Math.min(ctx.query.per_page, maxPerPage)) || defaultPerPage
		};
	}

	/**
	 * Adds item count to the pagination object.
	 * @param pagination Current pagination object
	 * @param count Total hits
	 * @returns Updated options
	 */
	paginationOpts(pagination: PaginationOpts, count: number): { pagination: PaginationOpts } {
		return { pagination: extend(pagination, { count: count }) };
	}


	/**
	 * Checks is an object has only changes of a given field.
	 *
	 * @param newObj        Object with changes
	 * @param oldObj        Original object
	 * @param allowedFields Allowed fields to change
	 * @returns False if everything is okay, a list of validation errors otherwise.
	 */
	protected checkReadOnlyFields(newObj: { [key: string]: any }, oldObj: { [key: string]: any }, allowedFields: string[]): ApiValidationError[] | boolean {
		const errors: ApiValidationError[] = [];
		difference(keys(newObj), allowedFields).forEach(field => {
			let newVal, oldVal;

			// for dates we want to compare the time stamp
			if (oldObj[field] instanceof Date) {
				newVal = newObj[field] ? new Date(newObj[field]).getTime() : undefined;
				oldVal = oldObj[field] ? new Date(oldObj[field]).getTime() : undefined;

				// for objects, serialize first.
			} else if (isObject(oldObj[field])) {
				newVal = newObj[field] ? JSON.stringify(newObj[field]) : undefined;
				oldVal = oldObj[field] ? JSON.stringify(pick(oldObj[field], keys(newObj[field] || {}))) : undefined;

				// otherwise, take raw values.
			} else {
				newVal = newObj[field];
				oldVal = oldObj[field];
			}
			if (newVal && newVal !== oldVal) {
				errors.push({
					message: 'This field is read-only and cannot be changed.',
					path: field,
					value: newObj[field]
				});
			}
		});

		return errors.length ? errors : false;
	}

	/**
	 * Instantiates a new router with the API prefix.
	 * @return API router
	 */
	public apiRouter() {
		if (config.vpdb.api.pathname) {
			return new Router({ prefix: config.vpdb.api.pathname });
		} else {
			return new Router();
		}
	}

	/**
	 * Instantiates a new router with the storage prefix.
	 * @return Storage router
	 */
	public storageRouter() {
		if (config.vpdb.storage.protected.api.pathname) {
			return new Router({ prefix: config.vpdb.storage.protected.api.pathname });
		} else {
			return new Router();
		}
	}
}

export interface SuccessOpts {
	/**
	 * If set, pagination headers and navigation links will be added.
	 */
	pagination?: PaginationOpts;

	/**
	 * Use this to add additional custom headers
	 */
	headers?: { [key: string]: string };
}

export interface PaginationOpts {
	defaultPerPage: number;
	maxPerPage: number;
	page: number;
	perPage: number;
	count?: number;
}