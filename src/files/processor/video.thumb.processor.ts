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

import Ffmpeg from 'fluent-ffmpeg';

import { ApiError } from '../../common/api.error';
import { logger } from '../../common/logger';
import { config } from '../../common/settings';
import { FileDocument } from '../file.document';
import { FileVariation, VideoFileVariation } from '../file.variations';
import { CreationProcessor } from './processor';

const ffmpeg = require('bluebird').promisifyAll(Ffmpeg);

export class VideoThumbProcessor implements CreationProcessor<VideoFileVariation> {

	public name: string = 'video.thumb';

	constructor() {
		if (config.ffmpeg && config.ffmpeg.path) {
			ffmpeg.setFfmpegPath(config.ffmpeg.path);
		}
	}

	public canProcess(file: FileDocument, srcVariation: FileVariation, destVariation: VideoFileVariation): boolean {
		return file.getMimeTypePrimary(srcVariation) === 'video' && file.getMimeTypePrimary(destVariation) === 'video';
	}

	public getOrder(variation?: FileVariation): number {
		return 100 + (variation && variation.priority ? variation.priority : 0);
	}

	public async process(file: FileDocument, src: string, dest: string, variation?: VideoFileVariation): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			logger.debug('[VideoScreenshotProcessor] Starting processing %s at %s.', file.toShortString(variation), dest);
			const started = Date.now();
			const proc = ffmpeg(src)
				.noAudio()
				.videoCodec('libx264')
				.on('start', (commandLine: string) => {
					logger.debug('[VideoThumbProcessor] > %s', commandLine);
				})
				.on('error', (err: Error, stdout: string, stderr: string) => {
					logger.error('[VideoThumbProcessor] %s', err);
					logger.error('[VideoThumbProcessor] [ffmpeg|stdout] %s', stdout);
					logger.error('[VideoThumbProcessor] [ffmpeg|stderr] %s', stderr);
					reject(new ApiError('Error processing video').log(err));
				})
				.on('progress', (progress: { percent: number, currentKbps: number }) => {
					logger.debug('[VideoThumbProcessor] Processing: %s% at %skbps', progress.percent, progress.currentKbps);
				})
				.on('end', () => {
					logger.debug('[VideoThumbProcessor] Transcoding succeeded after %dms, written to %s', new Date().getTime() - started, dest);
					resolve(dest);
				});

			if (variation && variation.height && variation.width) {
				proc.size(variation.height + 'x' + variation.width);
			}
			if (variation && variation.rotate) {
				proc.videoFilters('transpose=2');
			}
			proc.save(dest);
		});
	}
}
