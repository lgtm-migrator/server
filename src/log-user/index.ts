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

import Application = require('koa');
import mongoose, { Schema } from 'mongoose';
import Router from 'koa-router';

import { Models } from '../common/types/models';
import { EndPoint } from '../common/types/endpoint';
import { logUserSchema } from './log.user.schema';
import { LogUser } from './log.user';
import { LogUserSerializer } from './log.user.serializer';
import { Serializers } from '../common/types/serializers';

export class LogUserEndPoint implements EndPoint {

	readonly name: string = 'User Log API';

	private readonly _router: Router;
	private readonly _schema: Schema;

	constructor() {
		this._schema = logUserSchema;
	}

	getRouter(): Router {
		return this._router;
	}

	register(app: Application): void {
		(app.context.models as Models).LogUser = mongoose.model<LogUser>('LogUser', this._schema);
		(app.context.serializers as Serializers).LogUser = new LogUserSerializer();
	}
}