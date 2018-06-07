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
import Router from 'koa-router';
import mongoose, { Schema } from 'mongoose';

import { state } from '../state';
import { EndPoint } from '../common/api.endpoint';
import { File } from './file';
import { FileSerializer } from './file.serializer';
import { FileModel, fileSchema } from './file.schema';
import { router as apiRouter } from './file.api.router';
import { protectedRouter, publicRouter } from './file.storage.router';

export class FilesApiEndPoint extends EndPoint {

	readonly name: string = 'Files API';

	private readonly _router: Router;
	private readonly _schema: Schema;

	constructor() {
		super();
		this._schema = fileSchema;
		this._router = apiRouter;
	}

	getRouter(): Router {
		return this._router;
	}

	async register(app: Application): Promise<void> {
		state.models.File = mongoose.model<File, FileModel>('File', this._schema);
		state.serializers.File = new FileSerializer();
	}
}

export class FilesProtectedStorageEndPoint extends EndPoint {

	readonly name: string = 'Storage Protected Files API';

	private readonly _router: Router;

	constructor() {
		super();
		this._router = protectedRouter;
	}

	getRouter(): Router {
		return this._router;
	}

	async register(app: Application): Promise<void> {
		// nothing to register
	}
}

export class FilesPublicStorageEndPoint extends EndPoint {

	readonly name: string = 'Storage Public Files API';

	private readonly _router: Router;

	constructor() {
		super();
		this._router = publicRouter;
	}

	getRouter(): Router {
		return this._router;
	}

	async register(app: Application): Promise<void> {
		// nothing to register
	}
}