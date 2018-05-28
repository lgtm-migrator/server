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

const readFileSync = require('fs').readFileSync;
const resolve = require('path').resolve;
const gm = require('gm');
const pleasejs = require('pleasejs');

require('bluebird').promisifyAll(gm.prototype);

const rar = resolve(__dirname, '../../data/test/files/dmd.rar');
const zip = resolve(__dirname, '../../data/test/files/dmd.zip');

class FileHelper {

	constructor(api) {
		this.api = api;
	}

	async createPlayfield(user, orientation, type) {
		const playfields = await this.createPlayfields(user, orientation, 1, type);
		return playfields[0];
	};

	async createPlayfields(user, orientation, times, type) {

		const fileType = type || 'playfield-' + orientation;
		const mimeType = 'image/png';

		const isFS = orientation === 'fs';
		const results = [];

		for (let i = 0; i < times; i++) {
			const name = 'playfield-' + i + '.png';

			const img = gm(isFS ? 1080 : 1920, isFS ? 1920 : 1080, pleasejs.make_color());
			const data = await img.toBufferAsync('PNG');
			const res = await this.api.onStorage()
				.as(user)
				.markTeardown()
				.withQuery({ type: fileType })
				.withContentType(mimeType)
				.withHeader('Content-Disposition', 'attachment; filename="' + name + '"')
				.withHeader('Content-Length', data.length)
				.post('/v1/files', data)
				.then(res => res.expectStatus(201));

			results.push(res.data);
		}
		return results;
	}

	async createBackglass(user) {
		const fileType = 'backglass';
		const mimeType = 'image/png';
		const name = 'backglass.png';
		const img = gm(640, 512, pleasejs.make_color());
		const data =  await img.toBufferAsync('PNG');
		const res = await this.api.onStorage()
			.as(user)
			.markTeardown()
			.withQuery({ type: fileType })
			.withContentType(mimeType)
			.withHeader('Content-Disposition', 'attachment; filename="' + name + '"')
			.withHeader('Content-Length', data.length)
			.post('/v1/files', data)
			.then(res => res.expectStatus(201));
		return res.data;
	}

	async createRar(user) {
		const data = readFileSync(rar);
		const res = await this.api.onStorage()
			.as(user)
			.markTeardown()
			.withQuery({ type: 'release' })
			.withContentType('application/rar')
			.withHeader('Content-Disposition', 'attachment; filename="dmd.rar"')
			.withHeader('Content-Length', String(data.length))
			.post('/v1/files', data)
			.then(res => res.expectStatus(201));
		return res.data;
	}

	async createZip(user) {
		const data = readFileSync(zip);
		const res = await this.api.onStorage()
			.as(user)
			.markTeardown()
			.withQuery({ type: 'release' })
			.withContentType('application/zip')
			.withHeader('Content-Disposition', 'attachment; filename="dmd.zip"')
			.withHeader('Content-Length', data.length)
			.post('/v1/files', data)
			.then(res => res.expectStatus(201));
		return res.data;
	};
}

module.exports = FileHelper;