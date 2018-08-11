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

import { existsSync } from 'fs';
import Application from 'koa';
import koaBodyParser from 'koa-bodyparser';
import koaJson from 'koa-json';
import { uniq } from 'lodash';
import { resolve } from 'path';

import { apiCache } from './common/api.cache';
import { EndPoint } from './common/api.endpoint';
import { logger } from './common/logger';
import { koaAuth } from './common/middleware/authentication.middleware';
import { handleParseError, koaErrorHandler } from './common/middleware/error.handler.middleware';
import { koaLogger } from './common/middleware/logger.middleware';
import { koa404Handler } from './common/middleware/notfound.handler.middleware';
import { koaRestHandler } from './common/middleware/rest.middleware';
import { koaWebsiteHandler } from './common/middleware/website.middleware';
import { settings } from './common/settings';

const koaResponseTime = require('koa-response-time');
const koaCors = require('@koa/cors');

export class Server {

	private readonly app: Application;

	constructor() {
		this.app = new Application();
		this.app.use(koaLogger());
		this.app.use(koaResponseTime());
		this.app.use(koaBodyParser({ onerror: handleParseError }));
		this.app.use(koaErrorHandler());
		this.app.use(koaRestHandler());
		this.app.use(koaAuth());
		this.app.use(koaCors({ exposeHeaders, maxAge: 600, credentials: true }));
		this.app.use(koaJson({ pretty: false, param: 'pretty' }));
		this.app.use(apiCache.middleware.bind(apiCache));

		/* istanbul ignore next: host website at the same time, currently used for website CI */
		if (process.env.WEBAPP) {
			const webappPath = resolve(__dirname, process.env.WEBAPP);
			if (existsSync(webappPath)) {
				logger.warn(null, '[Server] Statically hosting website at %s', webappPath);
				this.app.use(koaWebsiteHandler(webappPath));
			} else {
				logger.warn(null, '[Server] Fix env WEBAPP, nothing found at %s (%s)', webappPath, process.env.WEBAPP);
			}
		}
	}

	public async register<T>(endPoint: EndPoint): Promise<void> {

		// routes
		const router = endPoint.getRouter();
		if (router) {
			this.app.use(router.getRouter().routes());
			this.app.use(router.getRouter().allowedMethods());

			// pretty print registered paths with methods
			const methods: Map<string, string[]> = new Map<string, string[]>();
			router.getRouter().stack.forEach(layer => methods.set(layer.path, [ ...methods.get(layer.path) || [], ...layer.methods ]));
			uniq(router.getRouter().stack.map(layer => layer.path)).sort().forEach(path => {
				logger.info(null, '  %s (%s)', path, methods.get(path).join(','));
			});
		}

		// register model and serializer
		endPoint
			.registerModel()
			.registerSerializer();

		// import data
		await endPoint.import();
	}

	public postRegister(endPoints: EndPoint[]) {
		for (const endPoint of endPoints.filter(e => !!e.getRouter() && !!e.getRouter().setupCache)) {
			endPoint.getRouter().setupCache();
		}
		this.app.use(koa404Handler());
	}

	public start() {
		/* istanbul ignore if  */
		if (!process.env.PORT) {
			throw new Error('Environment variable `PORT` not found, server cannot start on unknown port.');
		}
		this.app.listen(process.env.PORT);
		logger.info(null, '[Server.start] Public storage ready at %s', settings.storagePublicUri());
		logger.info(null, '[Server.start] Protected storage ready at %s', settings.storageProtectedUri());
		logger.info(null, '[Server.start] API ready at %s', settings.apiExternalUri());
	}
}

const exposeHeaders = [
	'Cache-Control',
	'Content-Disposition',
	'Link',
	'X-App-Sha',
	'X-Cache-Api',
	'X-List-Count',
	'X-List-Page',
	'X-List-Size',
	'X-RateLimit-Limit',
	'X-RateLimit-Remaining',
	'X-RateLimit-Reset',
	'X-Token-Refresh',
	'X-User-Dirty',
];

export const server = new Server();