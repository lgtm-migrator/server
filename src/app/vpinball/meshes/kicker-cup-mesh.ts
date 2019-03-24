/*
 * VPDB - Virtual Pinball Database
 * Copyright (C) 2019 freezy <freezy@vpdb.io>
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

import { Mesh } from '../mesh';

const vertices = [
	[0.160498, -0.969978, -0.437316, -0.132000, 0.991300, -0.000000, 0.473903, 0.120135],
	[0.000000, -0.991344, -1.023521, -0.132000, 0.991300, -0.000000, 0.500000, 0.403981],
	[-0.000000, -0.991344, -0.437316, -0.132000, 0.991300, -0.000000, 0.500000, 0.120135],
	[0.000000, -0.991344, -1.023521, -0.131900, 0.991300, -0.000000, 0.500000, 0.403981],
	[0.160498, -0.969978, -0.437316, -0.131900, 0.991300, -0.000000, 0.473903, 0.120135],
	[0.160630, -0.969978, -1.023521, -0.131900, 0.991300, -0.000000, 0.473881, 0.403981],
	[0.160763, -0.416832, -1.023521, 0.000000, 0.000000, 1.000000, 0.954827, 0.430602],
	[0.000000, -0.991344, -1.023521, 0.000000, 0.000000, 1.000000, 0.924540, 0.214126],
	[0.160630, -0.969978, -1.023521, 0.000000, 0.000000, 1.000000, 0.954802, 0.222176],
	[0.000000, 0.000032, -1.023521, 0.000000, 0.000000, 1.000000, 0.924540, 0.587676],
	[0.274260, -0.306396, -1.023521, 0.000000, 0.000000, 1.000000, 0.976209, 0.472214],
	[0.342751, -0.141048, -1.023521, 0.000000, 0.000000, 1.000000, 0.989113, 0.534518],
	[0.319390, 0.036393, -1.023521, 0.000000, 0.000000, 1.000000, 0.984712, 0.601377],
	[0.210436, 0.178380, -1.023521, 0.000000, 0.000000, 1.000000, 0.964185, 0.654877],
	[0.000000, 0.246870, -1.023521, 0.000000, 0.000000, 1.000000, 0.924540, 0.680684],
	[0.256553, -0.957565, -0.437316, 0.000000, 0.000000, 1.000000, 0.263089, 0.159273],
	[0.160763, -0.775554, -0.437316, 0.000000, 0.000000, 1.000000, 0.243522, 0.233634],
	[0.160498, -0.969978, -0.437316, 0.000000, 0.000000, 1.000000, 0.243468, 0.154202],
	[0.348693, -0.699936, -0.437316, 0.000000, 0.000000, 1.000000, 0.281910, 0.264528],
	[0.700974, -0.700987, -0.437316, 0.000000, 0.000000, 1.000000, 0.353870, 0.264098],
	[0.493146, -0.589097, -0.437316, 0.000000, 0.000000, 1.000000, 0.311417, 0.309811],
	[0.495653, -0.858530, -0.437316, 0.000000, 0.000000, 1.000000, 0.311929, 0.199734],
	[0.603989, -0.444648, -0.437316, 0.000000, 0.000000, 1.000000, 0.334059, 0.368825],
	[0.957560, -0.256580, -0.437316, 0.000000, 0.000000, 1.000000, 0.406283, 0.445660],
	[0.673668, -0.276434, -0.437316, 0.000000, 0.000000, 1.000000, 0.348292, 0.437549],
	[0.858522, -0.495673, -0.437316, 0.000000, 0.000000, 1.000000, 0.386052, 0.347979],
	[0.697434, -0.095919, -0.437316, 0.000000, 0.000000, 1.000000, 0.353147, 0.511299],
	[0.957560, 0.256577, -0.437316, 0.000000, 0.000000, 1.000000, 0.406283, 0.655311],
	[0.673668, 0.084597, -0.437316, 0.000000, 0.000000, 1.000000, 0.348292, 0.585049],
	[0.991341, -0.000002, -0.437316, 0.000000, 0.000000, 1.000000, 0.413183, 0.550486],
	[0.603989, 0.252811, -0.437316, 0.000000, 0.000000, 1.000000, 0.334059, 0.653773],
	[0.700974, 0.700984, -0.437316, 0.000000, 0.000000, 1.000000, 0.353870, 0.836874],
	[0.494818, 0.397260, -0.437316, 0.000000, 0.000000, 1.000000, 0.311759, 0.712788],
	[0.858522, 0.495670, -0.437316, 0.000000, 0.000000, 1.000000, 0.386052, 0.752993],
	[0.256553, 0.957562, -0.437316, 0.000000, 0.000000, 1.000000, 0.263089, 0.941699],
	[0.180474, 0.577775, -0.437316, 0.000000, 0.000000, 1.000000, 0.247548, 0.786538],
	[0.417163, 0.890804, -0.437316, 0.000000, 0.000000, 1.000000, 0.295897, 0.914425],
	[0.000000, 0.601541, -0.437316, 0.000000, 0.000000, 1.000000, 0.210683, 0.796247],
	[0.160763, -0.775554, -0.437316, -0.270800, 0.673000, 0.688300, 0.243522, 0.233634],
	[0.348693, -0.699936, -0.437316, -0.270800, 0.673000, 0.688300, 0.281910, 0.264528],
	[0.160763, -0.416832, -0.788016, -0.270800, 0.673000, 0.688300, 0.243522, 0.380190],
	[0.493146, -0.589097, -0.437316, -0.489900, 0.503500, 0.711700, 0.311417, 0.309811],
	[0.274260, -0.306396, -0.788016, -0.489900, 0.503500, 0.711700, 0.266706, 0.425308],
	[0.160763, -0.416832, -0.788016, -0.489900, 0.503500, 0.711700, 0.243522, 0.380190],
	[0.493146, -0.589097, -0.437316, -0.564900, 0.433500, 0.702100, 0.311417, 0.309811],
	[0.603989, -0.444648, -0.437316, -0.564900, 0.433500, 0.702100, 0.334059, 0.368825],
	[0.274260, -0.306396, -0.788016, -0.564900, 0.433500, 0.702100, 0.266706, 0.425308],
	[0.673668, -0.276434, -0.437316, -0.646900, 0.268000, 0.713900, 0.348292, 0.437549],
	[0.342751, -0.141048, -0.788016, -0.646900, 0.268000, 0.713900, 0.280696, 0.492861],
	[0.274260, -0.306396, -0.788016, -0.646900, 0.268000, 0.713900, 0.266706, 0.425308],
	[0.673668, -0.276434, -0.437316, -0.706000, 0.093000, 0.702100, 0.348292, 0.437549],
	[0.697434, -0.095919, -0.437316, -0.706000, 0.093000, 0.702100, 0.353147, 0.511299],
	[0.342751, -0.141048, -0.788016, -0.706000, 0.093000, 0.702100, 0.280696, 0.492861],
	[0.673668, 0.084597, -0.437316, -0.694300, -0.091400, 0.713900, 0.348292, 0.585049],
	[0.319390, 0.036393, -0.788016, -0.694300, -0.091400, 0.713900, 0.275924, 0.565355],
	[0.342751, -0.141048, -0.788016, -0.694300, -0.091400, 0.713900, 0.280696, 0.492861],
	[0.673668, 0.084597, -0.437316, -0.657900, -0.272500, 0.702100, 0.348292, 0.585049],
	[0.603989, 0.252811, -0.437316, -0.657900, -0.272500, 0.702100, 0.334059, 0.653773],
	[0.319390, 0.036393, -0.788016, -0.657900, -0.272500, 0.702100, 0.275924, 0.565355],
	[0.494818, 0.397260, -0.437316, -0.554500, -0.425500, 0.715200, 0.311759, 0.712788],
	[0.210436, 0.178380, -0.788016, -0.554500, -0.425500, 0.715200, 0.253669, 0.623364],
	[0.319390, 0.036393, -0.788016, -0.554500, -0.425500, 0.715200, 0.275924, 0.565355],
	[0.348693, 0.508099, -0.437316, -0.429900, -0.567100, 0.702600, 0.281910, 0.758071],
	[0.210436, 0.178380, -0.788016, -0.429900, -0.567100, 0.702600, 0.253669, 0.623364],
	[0.417163, 0.456195, -0.437316, -0.429900, -0.567100, 0.702600, 0.295897, 0.736866],
	[0.180474, 0.577775, -0.437316, -0.212700, -0.653700, 0.726300, 0.247548, 0.786538],
	[0.000000, 0.246870, -0.788016, -0.212700, -0.653700, 0.726300, 0.210683, 0.651346],
	[0.210436, 0.178380, -0.788016, -0.212700, -0.653700, 0.726300, 0.253669, 0.623364],
	[0.494818, 0.456195, -0.437316, 0.000000, 0.000000, 1.000000, 0.311759, 0.736866],
	[0.180474, 0.577775, -0.437316, -0.092200, -0.700100, 0.708000, 0.247548, 0.786538],
	[0.000000, 0.601541, -0.437316, -0.092200, -0.700100, 0.708000, 0.210683, 0.796247],
	[0.000000, 0.246870, -0.788016, -0.092200, -0.700100, 0.708000, 0.210683, 0.651346],
	[0.348693, 0.508099, -0.437316, 0.000000, 0.000000, 1.000000, 0.281910, 0.758071],
	[0.000000, 0.991341, -0.437316, 0.000000, 0.000000, 1.000000, 0.210683, 0.955500],
	[0.160763, -0.416832, -0.788016, -0.437700, 0.570400, 0.695000, 0.243522, 0.380190],
	[0.348693, -0.699936, -0.437316, -0.437700, 0.570400, 0.695000, 0.281910, 0.264528],
	[0.493146, -0.589097, -0.437316, -0.437700, 0.570400, 0.695000, 0.311417, 0.309811],
	[0.603989, -0.444648, -0.437316, -0.646900, 0.268000, 0.713900, 0.334059, 0.368825],
	[0.697434, -0.095919, -0.437316, -0.694300, -0.091400, 0.713900, 0.353147, 0.511299],
	[0.603989, 0.252811, -0.437316, -0.558600, -0.422200, 0.713900, 0.334059, 0.653773],
	[0.494818, 0.397260, -0.437316, -0.558600, -0.422200, 0.713900, 0.311759, 0.712788],
	[0.319390, 0.036393, -0.788016, -0.558600, -0.422200, 0.713900, 0.275924, 0.565355],
	[0.210436, 0.178380, -0.788016, -0.268000, -0.647000, 0.713900, 0.253669, 0.623364],
	[0.348693, 0.508099, -0.437316, -0.268000, -0.647000, 0.713900, 0.281910, 0.758071],
	[0.180474, 0.577775, -0.437316, -0.268000, -0.647000, 0.713900, 0.247548, 0.786538],
	[0.274260, -0.306396, -0.788016, -0.697400, 0.716700, -0.000000, 0.815571, 0.819183],
	[0.274260, -0.306396, -1.023521, -0.697400, 0.716700, -0.000000, 0.815571, 0.995599],
	[0.160763, -0.416832, -0.788016, -0.697400, 0.716700, -0.000000, 0.862135, 0.819183],
	[0.160763, -0.416832, -1.023521, -0.697400, 0.716700, -0.000000, 0.862135, 0.995599],
	[0.342751, -0.141048, -0.788016, -0.923900, 0.382700, -0.000000, 0.782761, 0.819183],
	[0.342751, -0.141048, -1.023521, -0.923900, 0.382700, -0.000000, 0.782761, 0.995599],
	[0.274260, -0.306396, -0.788016, -0.923900, 0.382700, -0.000000, 0.815571, 0.819183],
	[0.274260, -0.306396, -1.023521, -0.923900, 0.382700, -0.000000, 0.815571, 0.995599],
	[0.319390, 0.036393, -0.788016, -0.991400, -0.130500, -0.000000, 0.754384, 0.819183],
	[0.319390, 0.036393, -1.023521, -0.991400, -0.130500, -0.000000, 0.754384, 0.995599],
	[0.342751, -0.141048, -0.788016, -0.991400, -0.130500, -0.000000, 0.782761, 0.819183],
	[0.342751, -0.141048, -1.023521, -0.991400, -0.130500, -0.000000, 0.782761, 0.995599],
	[0.210436, 0.178380, -0.788016, -0.793300, -0.608800, -0.000000, 0.727599, 0.819183],
	[0.210436, 0.178380, -1.023521, -0.793300, -0.608800, -0.000000, 0.727599, 0.995599],
	[0.319390, 0.036393, -0.788016, -0.793300, -0.608800, -0.000000, 0.754384, 0.819183],
	[0.319390, 0.036393, -1.023521, -0.793300, -0.608800, -0.000000, 0.754384, 0.995599],
	[0.000000, 0.246870, -0.788016, -0.309500, -0.950900, -0.000000, 0.695648, 0.819183],
	[0.000000, 0.246870, -1.023521, -0.309500, -0.950900, -0.000000, 0.695648, 0.995599],
	[0.210436, 0.178380, -0.788016, -0.309500, -0.950900, -0.000000, 0.727599, 0.819183],
	[0.210436, 0.178380, -1.023521, -0.309500, -0.950900, -0.000000, 0.727599, 0.995599],
	[0.160498, -0.969978, -0.437316, -1.000000, 0.001400, -0.000200, 0.981580, 0.718350],
	[0.160763, -0.775554, -0.437316, -1.000000, 0.001400, -0.000200, 0.938550, 0.718350],
	[0.160630, -0.969978, -1.023521, -1.000000, 0.001400, -0.000200, 0.981562, 0.995599],
	[0.160630, -0.969978, -1.023521, -1.000000, 0.000200, 0.000200, 0.981562, 0.995599],
	[0.160763, -0.775554, -0.437316, -1.000000, 0.000200, 0.000200, 0.938550, 0.718350],
	[0.160763, -0.416832, -0.788016, -1.000000, 0.000200, 0.000200, 0.862135, 0.819183],
	[0.160630, -0.969978, -1.023521, -1.000000, 0.000200, -0.000000, 0.981562, 0.995599],
	[0.160763, -0.416832, -0.788016, -1.000000, 0.000200, -0.000000, 0.862135, 0.819183],
	[0.160763, -0.416832, -1.023521, -1.000000, 0.000200, -0.000000, 0.862135, 0.995599],
	[0.417163, 0.456195, -0.437316, 0.000000, 0.000000, 1.000000, 0.295897, 0.736866],
	[0.417163, 0.456195, -0.437316, -0.430200, -0.566800, 0.702600, 0.295897, 0.736866],
	[0.210436, 0.178380, -0.788016, -0.430200, -0.566800, 0.702600, 0.253669, 0.623364],
	[0.494818, 0.397260, -0.437316, -0.430200, -0.566800, 0.702600, 0.311759, 0.712788],
	[0.494818, 0.858526, -0.437316, 0.000000, 0.000000, 1.000000, 0.311759, 0.901238],
	[0.417163, 0.743958, -0.130454, -1.000000, 0.000000, -0.000000, 0.745928, 0.675285],
	[0.417163, 0.890804, -0.130454, -1.000000, 0.000000, -0.000000, 0.745928, 0.748594],
	[0.417163, 0.890804, -0.437316, -1.000000, 0.000000, -0.000000, 0.685709, 0.748594],
	[0.417163, 0.456195, -0.437316, -1.000000, 0.000000, -0.000000, 0.685709, 0.524035],
	[0.494818, 0.858526, -0.437316, 1.000000, 0.000000, -0.000000, 0.823684, 0.733369],
	[0.494818, 0.743958, -0.130454, 1.000000, 0.000000, -0.000000, 0.763465, 0.675285],
	[0.494818, 0.456195, -0.437316, 1.000000, 0.000000, -0.000000, 0.823684, 0.508263],
	[0.494818, 0.858526, -0.130454, 1.000000, 0.000000, -0.000000, 0.763465, 0.733369],
	[0.494818, 0.456195, -0.437316, 0.000000, -0.729400, 0.684000, 0.763465, 0.550524],
	[0.494818, 0.743958, -0.130454, 0.000000, -0.729400, 0.684000, 0.763465, 0.675285],
	[0.417163, 0.456195, -0.437316, 0.000000, -0.729400, 0.684000, 0.745928, 0.550524],
	[0.417163, 0.743958, -0.130454, 0.000000, -0.729400, 0.684000, 0.745928, 0.675285],
	[0.494818, 0.743958, -0.130454, 0.000000, 0.000000, 1.000000, 0.763465, 0.675285],
	[0.494818, 0.858526, -0.130454, 0.000000, 0.000000, 1.000000, 0.763465, 0.733369],
	[0.417163, 0.743958, -0.130454, 0.000000, 0.000000, 1.000000, 0.745928, 0.675285],
	[0.417163, 0.890804, -0.130454, 0.000000, 0.000000, 1.000000, 0.745928, 0.748594],
	[0.494818, 0.858526, 0.001058, -0.383800, -0.923400, -0.000000, 0.083212, 0.041577],
	[0.417163, 0.890804, -0.130454, -0.383800, -0.923400, -0.000000, 0.069703, 0.059558],
	[0.494818, 0.858526, -0.130454, -0.383800, -0.923400, -0.000000, 0.083212, 0.059558],
	[-0.957560, -0.256580, -0.437316, 0.991400, 0.130500, -0.000000, 0.708332, 0.120135],
	[-0.991341, -0.000002, -0.437316, 0.991400, 0.130500, -0.000000, 0.750000, 0.120135],
	[-0.991341, -0.000002, 0.001058, 0.991400, 0.130500, -0.000000, 0.750000, 0.041577],
	[0.000000, -0.991344, -1.023521, 0.132000, 0.991300, -0.000000, 0.500000, 0.403981],
	[-0.160498, -0.969978, -0.437316, 0.132000, 0.991300, -0.000000, 0.526097, 0.120135],
	[-0.000000, -0.991344, -0.437316, 0.132000, 0.991300, -0.000000, 0.500000, 0.120135],
	[-0.160498, -0.969978, -0.437316, 0.131900, 0.991300, -0.000000, 0.526097, 0.120135],
	[0.000000, -0.991344, -1.023521, 0.131900, 0.991300, -0.000000, 0.500000, 0.403981],
	[-0.160630, -0.969978, -1.023521, 0.131900, 0.991300, -0.000000, 0.526119, 0.403981],
	[-0.160763, -0.416832, -1.023521, 0.000000, 0.000000, 1.000000, 0.894254, 0.430602],
	[-0.160630, -0.969978, -1.023521, 0.000000, 0.000000, 1.000000, 0.894254, 0.222176],
	[-0.274260, -0.306396, -1.023521, 0.000000, 0.000000, 1.000000, 0.872871, 0.472214],
	[-0.342751, -0.141048, -1.023521, 0.000000, 0.000000, 1.000000, 0.859968, 0.534518],
	[-0.319390, 0.036393, -1.023521, 0.000000, 0.000000, 1.000000, 0.864369, 0.601377],
	[-0.210436, 0.178380, -1.023521, 0.000000, 0.000000, 1.000000, 0.884896, 0.654877],
	[-0.160763, -0.775554, -0.437316, 0.000000, 0.000000, 1.000000, 0.177844, 0.233634],
	[-0.256553, -0.957565, -0.437316, 0.000000, 0.000000, 1.000000, 0.158278, 0.159273],
	[-0.160498, -0.969978, -0.437316, 0.000000, 0.000000, 1.000000, 0.177898, 0.154202],
	[-0.348693, -0.699936, -0.437316, 0.000000, 0.000000, 1.000000, 0.139456, 0.264528],
	[-0.495653, -0.858530, -0.437316, 0.000000, 0.000000, 1.000000, 0.109437, 0.199734],
	[-0.700974, -0.700987, -0.437316, 0.000000, 0.000000, 1.000000, 0.067496, 0.264098],
	[-0.493146, -0.589097, -0.437316, 0.000000, 0.000000, 1.000000, 0.109949, 0.309811],
	[-0.603989, -0.444648, -0.437316, 0.000000, 0.000000, 1.000000, 0.087307, 0.368825],
	[-0.858522, -0.495673, -0.437316, 0.000000, 0.000000, 1.000000, 0.035314, 0.347979],
	[-0.957560, -0.256580, -0.437316, 0.000000, 0.000000, 1.000000, 0.015083, 0.445660],
	[-0.673668, -0.276434, -0.437316, 0.000000, 0.000000, 1.000000, 0.073074, 0.437549],
	[-0.697434, -0.095919, -0.437316, 0.000000, 0.000000, 1.000000, 0.068219, 0.511299],
	[-0.991341, -0.000002, -0.437316, 0.000000, 0.000000, 1.000000, 0.008183, 0.550486],
	[-0.957560, 0.256577, -0.437316, 0.000000, 0.000000, 1.000000, 0.015083, 0.655311],
	[-0.673668, 0.084597, -0.437316, 0.000000, 0.000000, 1.000000, 0.073074, 0.585049],
	[-0.603989, 0.252811, -0.437316, 0.000000, 0.000000, 1.000000, 0.087307, 0.653773],
	[-0.858522, 0.495670, -0.437316, 0.000000, 0.000000, 1.000000, 0.035314, 0.752993],
	[-0.700974, 0.700984, -0.437316, 0.000000, 0.000000, 1.000000, 0.067496, 0.836874],
	[-0.348693, 0.508099, -0.437316, 0.000000, 0.000000, 1.000000, 0.139456, 0.758071],
	[-0.256553, 0.957562, -0.437316, 0.000000, 0.000000, 1.000000, 0.158278, 0.941699],
	[-0.417163, 0.890804, -0.437316, 0.000000, 0.000000, 1.000000, 0.125470, 0.914425],
	[-0.180474, 0.577775, -0.437316, 0.000000, 0.000000, 1.000000, 0.173818, 0.786538],
	[-0.348693, -0.699936, -0.437316, 0.270800, 0.673000, 0.688300, 0.139456, 0.264528],
	[-0.160763, -0.775554, -0.437316, 0.270800, 0.673000, 0.688300, 0.177844, 0.233634],
	[-0.160763, -0.416832, -0.788016, 0.270800, 0.673000, 0.688300, 0.177844, 0.380190],
	[-0.274260, -0.306396, -0.788016, 0.489900, 0.503500, 0.711700, 0.154660, 0.425308],
	[-0.493146, -0.589097, -0.437316, 0.489900, 0.503500, 0.711700, 0.109949, 0.309811],
	[-0.160763, -0.416832, -0.788016, 0.489900, 0.503500, 0.711700, 0.177844, 0.380190],
	[-0.603989, -0.444648, -0.437316, 0.564900, 0.433500, 0.702100, 0.087307, 0.368825],
	[-0.493146, -0.589097, -0.437316, 0.564900, 0.433500, 0.702100, 0.109949, 0.309811],
	[-0.274260, -0.306396, -0.788016, 0.564900, 0.433500, 0.702100, 0.154660, 0.425308],
	[-0.342751, -0.141048, -0.788016, 0.646900, 0.268000, 0.713900, 0.140670, 0.492861],
	[-0.673668, -0.276434, -0.437316, 0.646900, 0.268000, 0.713900, 0.073074, 0.437549],
	[-0.274260, -0.306396, -0.788016, 0.646900, 0.268000, 0.713900, 0.154660, 0.425308],
	[-0.697434, -0.095919, -0.437316, 0.706000, 0.093000, 0.702100, 0.068219, 0.511299],
	[-0.673668, -0.276434, -0.437316, 0.706000, 0.093000, 0.702100, 0.073074, 0.437549],
	[-0.342751, -0.141048, -0.788016, 0.706000, 0.093000, 0.702100, 0.140670, 0.492861],
	[-0.319390, 0.036393, -0.788016, 0.694300, -0.091400, 0.713900, 0.145442, 0.565355],
	[-0.673668, 0.084597, -0.437316, 0.694300, -0.091400, 0.713900, 0.073074, 0.585049],
	[-0.342751, -0.141048, -0.788016, 0.694300, -0.091400, 0.713900, 0.140670, 0.492861],
	[-0.603989, 0.252811, -0.437316, 0.657900, -0.272500, 0.702100, 0.087307, 0.653773],
	[-0.673668, 0.084597, -0.437316, 0.657900, -0.272500, 0.702100, 0.073074, 0.585049],
	[-0.319390, 0.036393, -0.788016, 0.657900, -0.272500, 0.702100, 0.145442, 0.565355],
	[-0.210436, 0.178380, -0.788016, 0.554500, -0.425500, 0.715200, 0.167698, 0.623364],
	[-0.494818, 0.397260, -0.437316, 0.554500, -0.425500, 0.715200, 0.109607, 0.712788],
	[-0.319390, 0.036393, -0.788016, 0.554500, -0.425500, 0.715200, 0.145442, 0.565355],
	[-0.210436, 0.178380, -0.788016, 0.429900, -0.567100, 0.702600, 0.167698, 0.623364],
	[-0.348693, 0.508099, -0.437316, 0.429900, -0.567100, 0.702600, 0.139456, 0.758071],
	[-0.417163, 0.456195, -0.437316, 0.429900, -0.567100, 0.702600, 0.125470, 0.736866],
	[-0.494818, 0.397260, -0.437316, 0.000000, 0.000000, 1.000000, 0.109607, 0.712788],
	[0.000000, 0.246870, -0.788016, 0.212700, -0.653700, 0.726300, 0.210683, 0.651346],
	[-0.180474, 0.577775, -0.437316, 0.212700, -0.653700, 0.726300, 0.173818, 0.786538],
	[-0.210436, 0.178380, -0.788016, 0.212700, -0.653700, 0.726300, 0.167698, 0.623364],
	[-0.494818, 0.456195, -0.437316, 0.000000, 0.000000, 1.000000, 0.109607, 0.736866],
	[0.000000, 0.601541, -0.437316, 0.092200, -0.700100, 0.708000, 0.210683, 0.796247],
	[-0.180474, 0.577775, -0.437316, 0.092200, -0.700100, 0.708000, 0.173818, 0.786538],
	[0.000000, 0.246870, -0.788016, 0.092200, -0.700100, 0.708000, 0.210683, 0.651346],
	[-0.348693, -0.699936, -0.437316, 0.437700, 0.570400, 0.695000, 0.139456, 0.264528],
	[-0.160763, -0.416832, -0.788016, 0.437700, 0.570400, 0.695000, 0.177844, 0.380190],
	[-0.493146, -0.589097, -0.437316, 0.437700, 0.570400, 0.695000, 0.109949, 0.309811],
	[-0.603989, -0.444648, -0.437316, 0.646900, 0.268000, 0.713900, 0.087307, 0.368825],
	[-0.697434, -0.095919, -0.437316, 0.694300, -0.091400, 0.713900, 0.068219, 0.511299],
	[-0.494818, 0.397260, -0.437316, 0.558600, -0.422200, 0.713900, 0.109607, 0.712788],
	[-0.603989, 0.252811, -0.437316, 0.558600, -0.422200, 0.713900, 0.087307, 0.653773],
	[-0.319390, 0.036393, -0.788016, 0.558600, -0.422200, 0.713900, 0.145442, 0.565355],
	[-0.348693, 0.508099, -0.437316, 0.268000, -0.647000, 0.713900, 0.139456, 0.758071],
	[-0.210436, 0.178380, -0.788016, 0.268000, -0.647000, 0.713900, 0.167698, 0.623364],
	[-0.180474, 0.577775, -0.437316, 0.268000, -0.647000, 0.713900, 0.173818, 0.786538],
	[-0.160763, -0.416832, -1.023521, 0.697400, 0.716700, -0.000000, 0.528441, 0.995599],
	[-0.274260, -0.306396, -0.788016, 0.697400, 0.716700, -0.000000, 0.575005, 0.819183],
	[-0.160763, -0.416832, -0.788016, 0.697400, 0.716700, -0.000000, 0.528440, 0.819183],
	[-0.274260, -0.306396, -1.023521, 0.697400, 0.716700, -0.000000, 0.575005, 0.995599],
	[-0.274260, -0.306396, -1.023521, 0.923900, 0.382700, -0.000000, 0.575005, 0.995599],
	[-0.342751, -0.141048, -0.788016, 0.923900, 0.382700, -0.000000, 0.607815, 0.819183],
	[-0.274260, -0.306396, -0.788016, 0.923900, 0.382700, -0.000000, 0.575005, 0.819183],
	[-0.342751, -0.141048, -1.023521, 0.923900, 0.382700, -0.000000, 0.607815, 0.995599],
	[-0.342751, -0.141048, -1.023521, 0.991400, -0.130500, -0.000000, 0.607815, 0.995599],
	[-0.319390, 0.036393, -0.788016, 0.991400, -0.130500, -0.000000, 0.636193, 0.819183],
	[-0.342751, -0.141048, -0.788016, 0.991400, -0.130500, -0.000000, 0.607815, 0.819183],
	[-0.319390, 0.036393, -1.023521, 0.991400, -0.130500, -0.000000, 0.636193, 0.995599],
	[-0.319390, 0.036393, -1.023521, 0.793300, -0.608800, -0.000000, 0.636193, 0.995599],
	[-0.210436, 0.178380, -0.788016, 0.793300, -0.608800, -0.000000, 0.662978, 0.819183],
	[-0.319390, 0.036393, -0.788016, 0.793300, -0.608800, -0.000000, 0.636193, 0.819183],
	[-0.210436, 0.178380, -1.023521, 0.793300, -0.608800, -0.000000, 0.662978, 0.995599],
	[-0.210436, 0.178380, -1.023521, 0.309500, -0.950900, -0.000000, 0.662978, 0.995599],
	[0.000000, 0.246870, -0.788016, 0.309500, -0.950900, -0.000000, 0.695648, 0.819183],
	[-0.210436, 0.178380, -0.788016, 0.309500, -0.950900, -0.000000, 0.662978, 0.819183],
	[0.000000, 0.246870, -1.023521, 0.309500, -0.950900, -0.000000, 0.695648, 0.995599],
	[-0.160763, -0.775554, -0.437316, 1.000000, 0.001400, -0.000200, 0.452026, 0.718350],
	[-0.160498, -0.969978, -0.437316, 1.000000, 0.001400, -0.000200, 0.408997, 0.718350],
	[-0.160630, -0.969978, -1.023521, 1.000000, 0.001400, -0.000200, 0.409015, 0.995599],
	[-0.160763, -0.775554, -0.437316, 1.000000, 0.000200, 0.000200, 0.452026, 0.718350],
	[-0.160630, -0.969978, -1.023521, 1.000000, 0.000200, 0.000200, 0.409015, 0.995599],
	[-0.160763, -0.416832, -0.788016, 1.000000, 0.000200, 0.000200, 0.528440, 0.819183],
	[-0.160763, -0.416832, -0.788016, 1.000000, 0.000200, 0.000000, 0.528440, 0.819183],
	[-0.160630, -0.969978, -1.023521, 1.000000, 0.000200, 0.000000, 0.409015, 0.995599],
	[-0.160763, -0.416832, -1.023521, 1.000000, 0.000200, 0.000000, 0.528441, 0.995599],
	[-0.417163, 0.456195, -0.437316, 0.000000, 0.000000, 1.000000, 0.125470, 0.736866],
	[-0.210436, 0.178380, -0.788016, 0.430200, -0.566800, 0.702600, 0.167698, 0.623364],
	[-0.417163, 0.456195, -0.437316, 0.430200, -0.566800, 0.702600, 0.125470, 0.736866],
	[-0.494818, 0.397260, -0.437316, 0.430200, -0.566800, 0.702600, 0.109607, 0.712788],
	[-0.494818, 0.858526, -0.437316, 0.000000, 0.000000, 1.000000, 0.109607, 0.901238],
	[-0.417163, 0.743958, -0.130454, 1.000000, 0.000000, -0.000000, 0.763465, 0.370332],
	[-0.417163, 0.456195, -0.437316, 1.000000, 0.000000, -0.000000, 0.823684, 0.219082],
	[-0.417163, 0.890804, -0.437316, 1.000000, 0.000000, -0.000000, 0.823684, 0.443641],
	[-0.417163, 0.890804, -0.130454, 1.000000, 0.000000, -0.000000, 0.763465, 0.443641],
	[-0.494818, 0.743958, -0.130454, -1.000000, 0.000000, -0.000000, 0.745928, 0.370332],
	[-0.494818, 0.858526, -0.437316, -1.000000, 0.000000, -0.000000, 0.685709, 0.428416],
	[-0.494818, 0.456195, -0.437316, -1.000000, 0.000000, -0.000000, 0.685709, 0.203310],
	[-0.494818, 0.858526, -0.130454, -1.000000, 0.000000, -0.000000, 0.745928, 0.428416],
	[-0.417163, 0.743958, -0.130454, 0.000000, -0.729400, 0.684000, 0.763465, 0.370332],
	[-0.494818, 0.456195, -0.437316, 0.000000, -0.729400, 0.684000, 0.745928, 0.245571],
	[-0.417163, 0.456195, -0.437316, 0.000000, -0.729400, 0.684000, 0.763465, 0.245571],
	[-0.494818, 0.743958, -0.130454, 0.000000, -0.729400, 0.684000, 0.745928, 0.370332],
	[-0.417163, 0.890804, -0.130454, 0.000000, 0.000000, 1.000000, 0.763465, 0.443641],
	[-0.494818, 0.743958, -0.130454, 0.000000, 0.000000, 1.000000, 0.745928, 0.370332],
	[-0.417163, 0.743958, -0.130454, 0.000000, 0.000000, 1.000000, 0.763465, 0.370332],
	[-0.494818, 0.858526, -0.130454, 0.000000, 0.000000, 1.000000, 0.745928, 0.428416],
	[-0.063988, -0.927366, -0.128367, 0.000000, 0.904400, 0.426700, 0.589002, 0.471519],
	[0.064103, -0.927366, -0.128367, 0.000000, 0.904400, 0.426700, 0.603026, 0.471519],
	[-0.063988, -0.511771, -1.009291, 0.000000, 0.904400, 0.426700, 0.589002, 0.612187],
	[0.064103, -0.511771, -1.009291, 0.000000, 0.904400, 0.426700, 0.603120, 0.612355],
	[0.064103, -0.927366, -0.128367, -1.000000, 0.000000, -0.000000, 0.648623, 0.471660],
	[0.064103, -0.511771, -1.009291, -1.000000, 0.000000, -0.000000, 0.603120, 0.612355],
	[0.064102, -0.959339, -1.023592, -1.000000, 0.000000, -0.000000, 0.652123, 0.801072],
	[-0.063988, -0.927366, -0.128367, 0.000000, 0.999400, -0.035700, 0.589002, 0.471519],
	[0.064103, -0.927366, -0.128367, 0.000000, 0.999400, -0.035700, 0.603026, 0.471519],
	[0.064102, -0.959339, -1.023592, 0.000000, 0.999400, -0.035700, 0.603026, 0.142107],
	[-0.063988, -0.959339, -1.023592, 0.000000, 0.999400, -0.035700, 0.589002, 0.142107],
	[-0.063988, -0.927366, -0.128367, 1.000000, 0.000000, -0.000000, 0.543210, 0.471603],
	[-0.063988, -0.959339, -1.023592, 1.000000, 0.000000, -0.000000, 0.539709, 0.801015],
	[-0.063988, -0.511771, -1.009291, 1.000000, 0.000000, -0.000000, 0.589002, 0.612187],
	[-0.063989, -0.511770, -1.023592, 1.000000, 0.000000, -0.000000, 0.589002, 0.800903],
	[-0.063988, -0.511771, -1.009291, 0.000000, -1.000000, -0.000000, 0.589002, 0.612187],
	[0.064102, -0.511770, -1.023592, 0.000000, -1.000000, -0.000000, 0.603120, 0.801072],
	[0.064103, -0.511771, -1.009291, 0.000000, -1.000000, -0.000000, 0.603120, 0.612355],
	[-0.063989, -0.511770, -1.023592, 0.000000, -1.000000, -0.000000, 0.589002, 0.800903],
	[0.064102, -0.511770, -1.023592, -1.000000, 0.000000, -0.000000, 0.603120, 0.801072],
	[0.256553, -0.957565, 0.001058, -0.230800, 0.861300, 0.452600, 0.458339, 0.041577],
	[-0.000000, -0.991344, 0.001058, 0.000000, 0.891700, 0.452600, 0.500000, 0.041577],
	[-0.000000, -1.215000, 0.176408, -0.000000, 0.617000, 0.787000, 0.500000, 0.001500],
	[0.314436, -1.173600, 0.176408, -0.159700, 0.596000, 0.787000, 0.458338, 0.001500],
	[0.607480, -1.052221, 0.176408, -0.308500, 0.534300, 0.787000, 0.416671, 0.001500],
	[0.495653, -0.858530, 0.001058, -0.445800, 0.772200, 0.452600, 0.416672, 0.041577],
	[0.700974, -0.700987, 0.001058, -0.630500, 0.630500, 0.452600, 0.375004, 0.041577],
	[0.859123, -0.859135, 0.176408, -0.436300, 0.436300, 0.787000, 0.375004, 0.001500],
	[1.052216, -0.607500, 0.176408, -0.534300, 0.308500, 0.787000, 0.333336, 0.001500],
	[0.858522, -0.495673, 0.001058, -0.772200, 0.445800, 0.452600, 0.333336, 0.041577],
	[0.957560, -0.256580, 0.001058, -0.861300, 0.230800, 0.452600, 0.291668, 0.041577],
	[1.173599, -0.314465, 0.176408, -0.596000, 0.159700, 0.787000, 0.291668, 0.001500],
	[1.215000, -0.000000, 0.176408, -0.617000, -0.000000, 0.787000, 0.250000, 0.001500],
	[0.991341, -0.000002, 0.001058, -0.891700, 0.000000, 0.452600, 0.250000, 0.041577],
	[0.957560, 0.256577, 0.001058, -0.861300, -0.230800, 0.452600, 0.208332, 0.041577],
	[1.173599, 0.314465, 0.176408, -0.596000, -0.159700, 0.787000, 0.208332, 0.001500],
	[1.052216, 0.607500, 0.176408, -0.534300, -0.308500, 0.787000, 0.166664, 0.001500],
	[0.858522, 0.495670, 0.001058, -0.772200, -0.445800, 0.452600, 0.166664, 0.041577],
	[0.700974, 0.700984, 0.001058, -0.629800, -0.631100, 0.452700, 0.124996, 0.041577],
	[0.859123, 0.859135, 0.176408, -0.435900, -0.436300, 0.787200, 0.124996, 0.001500],
	[0.607480, 1.052221, 0.176408, -0.308400, -0.533700, 0.787400, 0.083329, 0.001500],
	[0.494818, 0.858526, 0.001058, -0.446200, -0.745500, 0.495000, 0.083212, 0.041577],
	[0.256553, 0.957562, 0.001058, -0.231200, -0.861100, 0.452700, 0.041661, 0.041577],
	[0.314436, 1.173600, 0.176408, -0.159700, -0.596000, 0.787000, 0.041662, 0.001500],
	[-0.000000, 0.991341, 0.001058, 0.000000, -0.891700, 0.452600, 0.000000, 0.041577],
	[0.000000, 1.215000, 0.176408, 0.000000, -0.617000, 0.787000, 0.000000, 0.001500],
	[0.160498, -0.969978, -0.437316, -0.129600, 0.991600, 0.000900, 0.473903, 0.120135],
	[-0.000000, -0.991344, -0.437316, -0.000200, 1.000000, 0.000300, 0.500000, 0.120135],
	[0.256553, -0.957565, -0.437316, -0.258100, 0.966100, 0.000500, 0.458339, 0.120135],
	[0.495653, -0.858530, -0.437316, -0.500000, 0.866000, -0.000000, 0.416672, 0.120135],
	[0.700974, -0.700987, -0.437316, -0.707100, 0.707100, -0.000000, 0.375004, 0.120135],
	[0.858522, -0.495673, -0.437316, -0.866000, 0.500000, -0.000000, 0.333336, 0.120135],
	[0.957560, -0.256580, -0.437316, -0.965900, 0.258800, -0.000000, 0.291668, 0.120135],
	[0.991341, -0.000002, -0.437316, -1.000000, 0.000000, -0.000000, 0.250000, 0.120135],
	[0.957560, 0.256577, -0.437316, -0.965900, -0.258800, -0.000000, 0.208332, 0.120135],
	[0.858522, 0.495670, -0.437316, -0.866000, -0.500000, -0.000000, 0.166664, 0.120135],
	[0.700974, 0.700984, -0.437316, -0.706400, -0.707800, -0.000000, 0.124996, 0.120135],
	[0.494818, 0.858526, -0.437316, -0.607200, -0.794600, -0.000000, 0.083212, 0.120135],
	[0.494818, 0.858526, -0.130454, -0.607200, -0.794600, -0.000000, 0.083212, 0.059558],
	[0.000000, 0.991341, -0.437316, 0.000000, -1.000000, -0.000000, 0.000000, 0.120135],
	[0.256553, 0.957562, -0.437316, -0.259400, -0.965800, -0.000000, 0.041661, 0.120135],
	[0.417163, 0.890804, -0.437316, -0.383800, -0.923400, -0.000000, 0.069703, 0.120135],
	[-0.256553, -0.957565, 0.001058, 0.230800, 0.861300, 0.452600, 0.541661, 0.041577],
	[-0.314436, -1.173600, 0.176408, 0.159700, 0.596000, 0.787000, 0.541662, 0.001500],
	[-0.607480, -1.052221, 0.176408, 0.308500, 0.534300, 0.787000, 0.583329, 0.001500],
	[-0.495653, -0.858530, 0.001058, 0.445800, 0.772200, 0.452600, 0.583328, 0.041577],
	[-0.700974, -0.700987, 0.001058, 0.630500, 0.630500, 0.452600, 0.624996, 0.041577],
	[-0.859123, -0.859135, 0.176408, 0.436300, 0.436300, 0.787000, 0.624996, 0.001500],
	[-1.052216, -0.607500, 0.176408, 0.534300, 0.308500, 0.787000, 0.666664, 0.001500],
	[-0.858522, -0.495673, 0.001058, 0.772200, 0.445800, 0.452600, 0.666664, 0.041577],
	[-0.957560, -0.256580, 0.001058, 0.861300, 0.230800, 0.452600, 0.708332, 0.041577],
	[-1.173599, -0.314465, 0.176408, 0.596000, 0.159700, 0.787000, 0.708332, 0.001500],
	[-1.215000, -0.000000, 0.176408, 0.617000, -0.000000, 0.787000, 0.750000, 0.001500],
	[-0.991341, -0.000002, 0.001058, 0.870400, -0.013000, 0.492100, 0.750000, 0.041577],
	[-0.957560, 0.256577, 0.001058, 0.861300, -0.230800, 0.452600, 0.791668, 0.041577],
	[-1.173599, 0.314465, 0.176408, 0.596000, -0.159700, 0.787000, 0.791668, 0.001500],
	[-1.052216, 0.607500, 0.176408, 0.534300, -0.308500, 0.787000, 0.833336, 0.001500],
	[-0.858522, 0.495670, 0.001058, 0.772200, -0.445800, 0.452600, 0.833336, 0.041577],
	[-0.700974, 0.700984, 0.001058, 0.629900, -0.630900, 0.452800, 0.875004, 0.041577],
	[-0.859123, 0.859135, 0.176408, 0.436300, -0.436300, 0.787000, 0.875004, 0.001500],
	[-0.607480, 1.052221, 0.176408, 0.308100, -0.534000, 0.787300, 0.916671, 0.001500],
	[-0.494818, 0.858526, 0.001058, 0.445300, -0.772500, 0.452700, 0.916788, 0.041577],
	[-0.256553, 0.957562, 0.001058, 0.231300, -0.861100, 0.452700, 0.958338, 0.041577],
	[-0.314436, 1.173600, 0.176408, 0.159800, -0.595800, 0.787100, 0.958338, 0.001500],
	[0.000000, 1.215000, 0.176408, 0.000000, -0.617000, 0.787000, 1.000000, 0.001500],
	[-0.000000, 0.991341, 0.001058, 0.000000, -0.891700, 0.452600, 1.000000, 0.041577],
	[-0.160498, -0.969978, -0.437316, 0.130300, 0.991500, 0.000500, 0.526097, 0.120135],
	[-0.256553, -0.957565, -0.437316, 0.257700, 0.966200, -0.000000, 0.541661, 0.120135],
	[-0.495653, -0.858530, -0.437316, 0.500000, 0.866000, -0.000000, 0.583328, 0.120135],
	[-0.700974, -0.700987, -0.437316, 0.707100, 0.707100, -0.000000, 0.624996, 0.120135],
	[-0.858522, -0.495673, -0.437316, 0.866000, 0.500000, -0.000000, 0.666664, 0.120135],
	[-0.957560, -0.256580, -0.437316, 0.947100, 0.320900, -0.000000, 0.708332, 0.120135],
	[-0.991341, -0.000002, -0.437316, 0.991400, -0.130500, -0.000000, 0.750000, 0.120135],
	[-0.957560, 0.256577, -0.437316, 0.965900, -0.258800, -0.000000, 0.791668, 0.120135],
	[-0.858522, 0.495670, -0.437316, 0.866000, -0.500000, -0.000000, 0.833336, 0.120135],
	[-0.700974, 0.700984, -0.437316, 0.706400, -0.707800, -0.000000, 0.875004, 0.120135],
	[-0.494818, 0.858526, -0.437316, 0.607200, -0.794600, -0.000000, 0.916788, 0.120135],
	[-0.494818, 0.858526, -0.130454, 0.536700, -0.843800, -0.000000, 0.916788, 0.059558],
	[-0.417163, 0.890804, -0.130454, 0.383800, -0.923400, -0.000000, 0.930297, 0.059558],
	[-0.256553, 0.957562, -0.437316, 0.259400, -0.965800, -0.000000, 0.958338, 0.120135],
	[0.000000, 0.991341, -0.437316, 0.000000, -1.000000, -0.000000, 1.000000, 0.120135],
	[-0.417163, 0.890804, -0.437316, 0.383800, -0.923400, -0.000000, 0.930297, 0.120135],
];

const indexes = [
	0, 1, 2,
	3, 4, 5,
	6, 7, 8,
	7, 147, 148,
	9, 7, 6,
	7, 9, 147,
	6, 10, 9,
	149, 147, 9,
	11, 9, 10,
	9, 150, 149,
	12, 9, 11,
	9, 151, 150,
	13, 9, 12,
	9, 152, 151,
	14, 9, 13,
	9, 14, 152,
	15, 16, 17,
	18, 16, 15,
	18, 15, 21,
	20, 18, 21,
	19, 20, 21,
	22, 20, 19,
	22, 19, 25,
	24, 22, 25,
	23, 24, 25,
	26, 24, 23,
	26, 23, 29,
	28, 26, 29,
	27, 28, 29,
	30, 28, 27,
	30, 27, 33,
	32, 30, 33,
	31, 32, 33,
	32, 31, 68,
	68, 31, 118,
	32, 68, 114,
	114, 36, 72,
	35, 72, 36,
	34, 35, 36,
	37, 35, 34,
	37, 34, 73,
	174, 37, 73,
	172, 174, 73,
	171, 174, 172,
	171, 172, 173,
	173, 250, 171,
	206, 202, 250,
	170, 202, 206,
	170, 206, 254,
	168, 202, 170,
	168, 170, 169,
	167, 168, 169,
	166, 167, 169,
	164, 167, 166,
	164, 166, 165,
	163, 164, 165,
	162, 163, 165,
	160, 163, 162,
	160, 162, 161,
	159, 160, 161,
	158, 159, 161,
	156, 159, 158,
	156, 158, 157,
	153, 156, 157,
	154, 153, 157,
	153, 154, 155,
	38, 39, 40,
	41, 42, 43,
	44, 45, 46,
	47, 48, 49,
	49, 77, 47,
	50, 51, 52,
	53, 54, 55,
	55, 78, 53,
	56, 57, 58,
	59, 60, 61,
	62, 63, 64,
	65, 66, 67,
	69, 70, 71,
	74, 75, 76,
	79, 80, 81,
	82, 83, 84,
	85, 86, 87,
	88, 87, 86,
	89, 90, 91,
	92, 91, 90,
	93, 94, 95,
	96, 95, 94,
	97, 98, 99,
	100, 99, 98,
	101, 102, 103,
	104, 103, 102,
	105, 106, 107,
	108, 109, 110,
	111, 112, 113,
	115, 116, 117,
	119, 120, 121,
	121, 122, 119,
	123, 124, 125,
	124, 123, 126,
	127, 128, 129,
	130, 129, 128,
	131, 132, 133,
	133, 132, 134,
	135, 136, 137,
	332, 136, 331,
	331, 136, 313,
	331, 313, 330,
	315, 330, 313,
	313, 136, 312,
	316, 315, 314,
	314, 315, 313,
	313, 311, 314,
	313, 312, 311,
	311, 312, 310,
	312, 309, 310,
	329, 309, 312,
	309, 329, 328,
	309, 307, 310,
	328, 327, 309,
	309, 308, 307,
	309, 327, 308,
	307, 308, 306,
	326, 308, 327,
	308, 305, 306,
	305, 308, 326,
	305, 303, 306,
	326, 325, 305,
	305, 304, 303,
	305, 325, 304,
	303, 304, 302,
	324, 304, 325,
	304, 301, 302,
	301, 304, 324,
	301, 299, 302,
	324, 323, 301,
	301, 300, 299,
	301, 323, 300,
	299, 300, 298,
	322, 300, 323,
	300, 297, 298,
	297, 300, 322,
	297, 295, 298,
	322, 321, 297,
	297, 296, 295,
	297, 321, 296,
	295, 296, 294,
	320, 296, 321,
	296, 291, 294,
	291, 296, 320,
	293, 294, 291,
	320, 319, 291,
	291, 292, 293,
	292, 291, 319,
	317, 292, 319,
	293, 292, 334,
	317, 318, 292,
	292, 333, 334,
	292, 318, 333,
	357, 333, 318,
	333, 335, 334,
	333, 357, 358,
	333, 336, 335,
	336, 333, 358,
	335, 336, 338,
	358, 359, 336,
	336, 337, 338,
	337, 336, 359,
	337, 339, 338,
	359, 360, 337,
	337, 340, 339,
	340, 337, 360,
	339, 340, 342,
	360, 361, 340,
	340, 341, 342,
	361, 341, 340,
	341, 361, 362,
	341, 343, 342,
	344, 341, 362,
	341, 344, 343,
	343, 344, 346,
	344, 345, 346,
	363, 345, 344,
	345, 347, 346,
	345, 363, 364,
	345, 348, 347,
	348, 345, 364,
	347, 348, 350,
	364, 365, 348,
	348, 349, 350,
	365, 349, 348,
	349, 351, 350,
	349, 365, 366,
	349, 352, 351,
	349, 366, 352,
	351, 352, 354,
	366, 367, 368,
	368, 352, 366,
	368, 369, 352,
	352, 353, 354,
	369, 353, 352,
	355, 354, 353,
	353, 369, 372,
	356, 355, 353,
	353, 372, 370,
	356, 353, 370,
	370, 371, 356,
	138, 139, 140,
	141, 142, 143,
	144, 145, 146,
	175, 176, 177,
	178, 179, 180,
	181, 182, 183,
	184, 185, 186,
	213, 186, 185,
	187, 188, 189,
	190, 191, 192,
	214, 192, 191,
	193, 194, 195,
	196, 197, 198,
	199, 200, 201,
	203, 204, 205,
	207, 208, 209,
	210, 211, 212,
	215, 216, 217,
	218, 219, 220,
	221, 222, 223,
	222, 221, 224,
	225, 226, 227,
	226, 225, 228,
	229, 230, 231,
	230, 229, 232,
	233, 234, 235,
	234, 233, 236,
	237, 238, 239,
	238, 237, 240,
	241, 242, 243,
	244, 245, 246,
	247, 248, 249,
	251, 252, 253,
	255, 256, 257,
	257, 258, 255,
	259, 260, 261,
	260, 259, 262,
	263, 264, 265,
	264, 263, 266,
	267, 268, 269,
	270, 268, 267,
	271, 272, 273,
	273, 272, 274,
	275, 276, 277,
	276, 290, 277,
	278, 279, 280,
	278, 280, 281,
	282, 283, 284,
	283, 285, 284,
	286, 287, 288,
	289, 287, 286,
];

export const kickerCupMesh = Mesh.fromArray(vertices, indexes);
