/*
 * VPDB - Visual Pinball Database
 * Copyright (C) 2014 freezy <freezy@xbmc.org>
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

"use strict";

var _ = require('underscore');

/*
 * Serve JSON to our AngularJS client
 */


var releases = {
	afm: {
		id: 1198,
		title: 'Real-Flag Edition',
		description: "Use these options to configure the table:\n\n    '******************************\n    ' SET alpha GI colors\n    '******************************\n    ' For NORMAL operation set\n    ' GION_alphaGIcolor = 1\n    ' GIOFF_alphaGIcolor = 0\n    \n    ' Or try some green martian lighting:\n    ' GIOn_alphaGIcolor = 2\n    ' GIOFF_alphaGIcolor = 3\n    \n    ' Or Mars red:\n    ' GIOn_alphaGIcolor = 3\n    ' GIOFF_alphaGIcolor = 0\n    \n    ' or disable feature by setting both values to 0\n    \n    GION_alphaGIcolor = 1 ' 0=OFF, 1=WHITE, 2=GREEN, 3 = RED\n    GIOFF_alphaGIcolor = 3 ' 0=OFF, 1=WHITE, 2=GREEN, 3 = RED\n    '********************************\n",
		acknowledgements: '* Thank you @jpsalas for giving me permission to mod this table of yours. All credit goes to JP. Modding this table made me appreciate this table so much more.\n* Thank you to @teppotee and @jimmyfingers. On the new 3-Way GI, the default settings are White `ON` and Red `OFF`. Play it first without changing anything, so you can see whats happening.',
		authors: [
			{
				author: {
					user: 'jpsalas',
					avatar: '/avatars/jpsalas.png'
				},
				roles: [ 'Original Release' ]
			}, {
				author: {
					user: 'Aaron James',
					avatar: '/avatars/aaronjames.jpg'
				},
				roles: [ 'Table Mod' ]
			}, {
				author: {
					user: 'teppotee',
					avatar: '/avatars/teppotee.png'
				},
				roles: [ 'GI' ]
			}
		],
		submitter: {
			user: 'Aaron James',
			avatar: '/avatars/aaronjames.jpg'
		},
		rating: 8.1,
		votes: 20,
		screenshots: [],
		mods: [],
		versions: [
			{
				timestamp: '2013-12-30T19:42:20Z',
				submitter: 'Aaron James',
				downloads: 3659,
				changes: '* Teppotee reworked the lighting to make it work with VP9.2 Big thanks!!! He really helped me on this because i couldn\'t figure some things out, and he saved me alot of time.\n* I then changed the layback/xy settings, and had to add one more wall to the left side to hide flasher artifacts. I did a minor physics tweak.',
				download: {
					id: 'sdaf2',
					version: '3.5',
					size: 22023498
				}
			},
			{
				version: '3.1',
				timestamp: '2013-04-22T05:04:20Z',
				size: 16903345,
				submitter: 'Aaron James',
				downloads: 2978,
				changes: '* I increased the size/shape of the strobe light. It\'s more dramatic and intensive.\n* I changed the red wire metal ramps to dark green/yellow. I was getting tired of the red myself...lol',
				download: {
					id: 'sdaf3',
					version: '3.1',
					size: 16903345
				}
			}
		],
		comments: [
			{
				id: 1234,
				author: {
					user: 'freezy',
					avatar: '/avatars/freezy.jpg'
				},
				timestamp: '2014-03-23T23:45:20Z',
				message: '# Markdown test\n\nA list:\n\n* first item\n* second item\n\nAnd here a quote:\n\n> Geee!\n\n## A Second Title\n\nWith a numerated list:\n\n1. Count\n2. To\n3. Three!\n\nYou can also use [links](http://pind.ch/) and references to people (hi @freezy).\n\nAlso code is possible:\n\n    for (var i; i < 10; i++) {\n        print "You\'re awesome!";\n    }\n\nYou can also refer external images:\n\n![](http://i.imgur.com/hReEn.png)\n\nOf course you can also type in **bold** or *italic*.\n'
			}
		],
		media: [
			{
				filename: 'afm35.jpg',
				src: '/cabinet/afm35.png',
				type: 'playfield-cabinet',
				version: '3.5',
				width: 1280,
				height: 1920,
				filesize: 3994043,
				format: 'image',
				tags: ['night']
			},
			{
				filename: 'Attack from Mars (Bally 1995).flv',
				type: 'playfield-cabinet',
				version: '3.5',
				width: 1280,
				height: 1920,
				filesize: 586292,
				duration: 120,
				format: 'video',
				tags: ['day']
			}
		],

		// easy acess fields:
		thumbs: {
			playfield: [ '/cabinet/afm35.png' ],
			square: '/asset/release/afm35/square-small.png'
		},
		lastversion: {
			timestamp: '2013-12-30T19:42:20Z',
			submitter: 'Aaron James',
			downloads: 3659,
			changes: '* Teppotee reworked the lighting to make it work with VP9.2 Big thanks!!! He really helped me on this because i couldn\'t figure some things out, and he saved me alot of time.\n* I then changed the layback/xy settings, and had to add one more wall to the left side to hide flasher artifacts. I did a minor physics tweak.',
			download: {
				id: 'sdaf2',
				version: '3.5',
				size: 22023498
			}
		}
	},

	centaur: {
		id: 1123,
		title: '3D Edition',
		description: "This is a complete rework of the old 1.2 version. A big thank you to @jimmyfingers who did the majority of changes to this table.",
		acknowledgements: '',
		authors: [
			{
				author: {
					user: 'fuzzel',
					avatar: '/avatars/fuzzel.jpg'
				},
				roles: [ 'Table Mod' ]
			},
			{
				author: {
					user: 'JimmyFingers',
					avatar: '/avatars/jf.jpg'
				},
				roles: [ 'Major Tweaks' ]
			},
			{
				author: {
					user: 'Lord Hiryu',
					avatar: '/avatars/lordhiryu.jpg'
				},
				roles: [ 'Original Release' ]
			}
		],
		submitter: {
			user: 'fuzzel ',
			avatar: '/avatars/fuzzel.jpg'
		},
		rating: 7.9,
		votes: 21,
		screenshots: [],
		mods: [],
		versions: [
			{
				timestamp: '2014-04-02T21:24:20Z',
				submitter: { user: 'fuzzel' },
				downloads: 1344,
				changes: '* Implemented and tuned new BMPR routine which uses an updated formula for a better / smoother momentum curve, higher table friction settings (for better ball weight appearance), and new corresponding BMPR parameters\n* Implemented additional custom physics routines for dampening, positional slingshot strength, flipper tap code, and a new / experimental one for “X” cushioning / ball jumping for the ORBS targets as well as the soft targets behind them\n* Adjusted size of the ball accordingly to compensate for wide build dimensions\n* Added a variety of sounds and sound processing (speed based) routines\n* Created new alpha full sized fading GI plastics with transparent edges / sections\n* Created new individual alpha ramp fading GI bulb Halos for incandescent and LED based lights (for PF lighting but at height to affect interaction / lighting on the ball) and choice can be selected via script options\n* Created Chamber section GI Halos for independent control / coding\n* Created new bumper fading GI images for 3D meshes\n* Added back metal and back wall GI interaction / images\n* Created basic PF GI for when all GI lights / independent sections off or on\n* Updated GI scripting for above components and corrected sections to be authentic (Chamber and slings isolated from rest of GI)\n* Created and coded new individual lamp halos for added lighting effects on most table lamps / light inserts (can be disabled in script)\n* Added Bonus rollover lights reflections in back metal\n* Re-scripted / architected captured ball in chamber so now it is totally natural and does not jerkily land back into kicker position (removed original / extra coding and is now simply a ball trapped in that area that can be collided with as would be on a real table)\n* Fixed Orbs Release target magnet area, modified operation to be better timed with that of a real machine, and incorporated animations for the sub-PF ball launch / metal door (some tricks to make ball appear hidden / look like it comes up from beneath the table)\n* Added code for allowing simultaneous / two target hits on ORBS and Sequence drop targets\n* Modified images / added metal textures to all posts and gate housings (some were previously just solid colours / no images mapped)\n* Adjusted some images for lighting aspects\n* Adjusted behaviour of Outlane pegs for ball save / nudging based on some previous feedback by Mukuste\n* A complete new set of 3D meshes',
				download: {
					id: 'jsfsvr',
					version: '2.1',
					size: 103765981
				}
			}
		],
		comments: [ ],
		media: [ ],

		// easy acess fields:
		thumbs: {
			playfield: [ '/cabinet/centaur.png' ],
			square: '/asset/release/centaur/square-small.png'
		},
		lastversion: {
			timestamp: '2014-04-02T21:24:20Z',
			submitter: { user: 'fuzzel' },
			downloads: 1344,
			download: {
				id: 'jsfsvr',
				version: '2.1',
				size: 103765981
			}
		}
	},

	cv: {
		id: 123,
		title: 'Platinum Edition',
		description: "Thank you to JP Salas and Rosve for giving myself, Teppotee, and Koadic the permission to update this table.\nThis is the \"Platinum Version\" of Cirqus Voltaire.\n\nThe night mod has been deleted because, in my opinion, this is much more than just a night mod.\n\nYou can now toggle between the original version, night mod, and day/night w/ BMPR Lite....with all the recent table updates! (4 tables in 1 all easily displayed in the ``F6`` Menu, among many more options)\n\nAll script issues should be fixed, with no more errors (``F6`` Menu)",
		acknowledgements: '* Special thanks to @Koadic, @Teppotee, and @Dozer316 (version 1.6) - You guys have made this table so much more than I could have ever imagined.\n* Thanks to @jimmyfingers for his bmpr script!',
		authors: [
			{
				author: {
					user: 'Aaron James',
					avatar: '/avatars/aaronjames.jpg'
				},
				roles: [ 'Table Mod' ]
			},
			{
				author: {
					user: 'Teppotee',
					avatar: '/avatars/teppotee.png'
				},
				roles: [ 'Table Mod' ]
			},
			{
				author: {
					user: 'Koadic',
					avatar: '/avatars/koadic.gif'
				},
				roles: [ 'Table Mod' ]
			},
			{
				author: {
					user: 'jpsalas',
					avatar: '/avatars/jpsalas.png'
				},
				roles: [ 'Original Release' ]
			},
			{
				author: {
					user: 'Rosve',
					avatar: '/avatars/rosve.jpg'
				},
				roles: [ 'Original Release' ]
			}
		],
		submitter: {
			user: 'Aaron James',
			avatar: '/avatars/aaronjames.jpg'
		},
		rating: 8.8,
		votes: 22,
		screenshots: [],
		mods: [],
		versions: [
			{
				timestamp: '2014-03-05T22:57:20Z',
				submitter: { user: 'Aaron James' },
				downloads: 3919,
				changes: '* @Dozer316 has made a FOM (flasher object mod) for this table! Awesome work!\n* This archive contains the flush and sunken versions as well as the associated ``b2s.exe`` files from the original Rosve mod. The ``.exe`` files have been named so that they match the filename of the associated table and will load appropriately if someone chooses to use the older B2S instead of directb2s from the ``F6`` menu.!\n* Both versions end with B2S for users that are using the files with Hyperpin. It may be worth noting the subtleties associated with what they need to select in the ``F6`` menu if they are going to use the old B2S with Hyperpin etc.!\n* The ``F6`` menu has also been modified to remove the GI options as it is now alpha 8 step GI but the rest of the options remain the same. When both tables are run for the first time options will need to be set as they don\'t query the options database for the Platinum Mod. Everything else is pretty much the same.',
				download: {
					id: 'lnfds',
					version: '1.6',
					size: 153183654
				}
			}
		],
		comments: [ ],
		media: [ ],

		// easy acess fields:
		thumbs: {
			playfield: [ '/cabinet/cv-platinum-1.png', '/cabinet/cv-platinum-2.png', '/cabinet/cv-platinum-3.png' ],
			square: '/asset/release/cv-platinum-1/square-small.png'
		},
		lastversion: {
			timestamp: '2014-04-02T21:24:20Z',
			submitter: { user: 'fuzzel' },
			downloads: 1344,
			download: {
				id: 'lnfds',
				version: '1.6',
				size: 153183654
			}
		}
	},

	mb: {
		id: 954,
		title: 'PC Killer Edition',
		description: '*This is the high poly full model edition.*\n\nChanges from prior version:\n\n* Complete rebuild of the table\n* Bumpers, targets, rubbers, pegs, brackets, wire ramps, bulbs, and all toys are now 3D mesh primitives\n* Full 8-step fading GI using alpha ramps\n* Ball momentum engine added with flipper tap code\n* Alpha flashers added\n',
		acknowledgements: '* Special thanks to @grizz for original playfield work\n* @jimmyfingers for his excellent physics code\n* @fuzzel and @toxie for their continued work on VP and additional feature additions',
		authors: [
			{
				author: {
					user: 'unclewilly',
					avatar: '/avatars/unclewilly.jpg'
				},
				roles: [ 'Playfield', 'Textures' ]
			}, {
				author: {
					user: 'randr',
					avatar: '/avatars/randr.jpg'
				},
				roles: [ '3D Models' ]
			}
		],
		submitter: {
			user: 'unclewilly',
			avatar: '/avatars/unclewilly.jpg'
		},
		rating: 9.1,
		votes: 25,
		screenshots: [],
		mods: [],
		versions: [
			{
				timestamp: '2014-02-03T19:47:20Z',
				downloads: 1087,
				changes: '* Reduced Texture sizes\n* Added DOF Option\n* Added Day Option which brightens the playfield\n* Fixed Rollover lights blocking inserts',
				download: {
					id: 'ohnca',
					version: '2.1',
					size: 175135975
				}
			},
			{
				timestamp: '2014-01-29T22:01:00Z',
				downloads: 568,
				changes: '*Initial version*',
				download: {
					id: 'ohnc2',
					version: '2.0',
					size: 169033450
				}
			}
		],
		comments: [
			{
				id: 1234,
				author: {
					user: 'fuzzel',
					avatar: '/avatars/fuzzel.jpg'
				},
				timestamp: '2014-02-28T22:46:20Z',
				message: 'Hey I\'m the first to say WELL DONE! :D'
			}
		],
		media: [
			{
				filename: 'mb_pckiller.png',
				src: '/cabinet/mb_pckiller.png',
				type: 'playfield-cabinet',
				version: '2.1',
				width: 1280,
				height: 1920,
				size: 3627246,
				format: 'image',
				tags: ['day', 'flasher']
			},
			{
				filename: '#',
				type: 'playfield-cabinet',
				src: '#',
				version: '2.1',
				width: 1280,
				height: 1920,
				size: 843398,
				duration: 120,
				format: 'video',
				tags: ['day', 'attract mode']
			}
		],

		// easy access fields:
		thumbs: {
			playfield: [ '/cabinet/mb_pckiller.png' ],
			square: '/asset/release/mb_pckiller/square-small.png'
		},
		lastversion: {
			timestamp: '2014-02-03T19:47:20Z',
			downloads: 1087,
			changes: '* Reduced Texture sizes\n* Added DOF Option\n* Added Day Option which brightens the playfield\n* Fixed Rollover lights blocking inserts',
			download: {
				id: 'ohnca',
				version: '2.1',
				size: 175135975
			}
		}
	},

	ij: {
		id: 1198,
		title: 'HD Edition',
		description: "This is an update to Lord Hiryu's version of Indiana Jones and released with author's permission.\n\nAlmost all aspects of the table have been reworked or updated.\n\n* New GI and lighting (+adjustable additional alpha GI)\n* New HD playfield\n* New flasherdomes / effects\n* Alpha ramp conversions\n* Drop targets changed to primitives with better animation\n* Idolhead reworked as a 3d primitive with better animation\n* Ball lock reworked with better animation and visuals\n* Center plane propeller reworked as primitive and smoother animation\n* Complete physics overhaul\n* New bumper flashers (can be turned off)\n* New slingshot flashers (can be turned off)\n* Missing sounds added\n\nThis has been a true community effort with a lot of people helping to make this the best version possible!",
		acknowledgements: '* @LordHiryu - the biggest thanks goes of course to LH for creating the first version and letting us release this MOD!\n* @Rob046 - Physics adjustments, alpha ramps and tweaking almost every aspect of the table!\n* @ClarkKent - New HD playfield redraw with amazing detail + acting as a "project manager" :)\n* @jpsalas - primitive idol coding, captive ball bug fix,propeller primitives and ball lock rework. Really glad JP found the time to help us!\n* @Fuzzel - converted FP 3D object and helped to implement it into the table\n* @JimmyFingers - flipper tap code and the enhanced ball rolling script\n* @unclewilly - primitive drop target code that I borrowed from BBB\n* @Aaron James - Testing\n* @teppotee - I did the lighting effects and visuals mainly and also primitive drop targets etc. Too much stuff to even remember!\n* @HighInder00 for the 3d object in the FP version',
		authors: [
			{
				author: {
					user: 'teppotee ',
					avatar: '/avatars/teppotee.png'
				},
				roles: [ 'Table Mod' ]
			}
		],
		submitter: {
			user: 'teppotee ',
			avatar: '/avatars/teppotee.png'
		},
		rating: 8.9,
		votes: 21,
		screenshots: [],
		mods: [],
		versions: [
			{
				timestamp: '2012-12-28T08:04:20Z',
				submitter: { user: 'teppotee' },
				downloads: 5594,
				changes: '* VP 9.2 compatible (alpha lighting issues fixed)\n* Small physics tweaks (lower slope)',
				download: {
					id: 'saoi2',
					version: '2.0',
					size: 273448315
				}
			},
			{
				timestamp: '2012-11-02T02:04:20Z',
				submitter: { user: 'teppotee' },
				downloads: 1232,
				changes: '* Added BMPR physics to the table. Thanks to @jimmyfingers for the original scripting and examples! Makes the table quite a bit more challenging so you have been warned :)\n* small visual feedback for the rollover switches (switch hidden when ball on switch)\n* Repositioned "additinal alpha GI" lights so that the ball moves under the lights now. This lets the lighting affect the ball as well + works better with the new ball reflection feature.',
				download: {
					id: 'saoi3',
					version: '1.3',
					size: 239448561
				}
			},
			{
				timestamp: '2012-10-01T12:04:20Z',
				submitter: { user: 'teppotee' },
				downloads: 2556,
				changes: '* One B2B collision bug fixed (thanks @JimmyFingers!)\n* Few graphich glitches fixed (such as ball visible under upper PF)\n* Added missing sounds for ball drops from ramps\n* new ball with decals\n* playfield images with ramp shadows\n* new fluid animated propellers (beginning slower, accelerating, slowing down)\n* second propeller added\n* new animated flippers decals\n* idol head mechanism repaired\n* idol head texture corrected a little bit',
				download: {
					id: 'saoi4',
					version: '1.1',
					size: 236898456
				}
			}
		],
		comments: [ ],
		media: [ ],

		// easy acess fields:
		thumbs: {
			playfield: [ '/cabinet/ij.png' ],
			square: '/asset/release/ij/square-small.png'
		},
		lastversion: {
			timestamp: '2012-12-28T08:04:20Z',
			submitter: { user: 'teppotee' },
			downloads: 5594,
			download: {
				id: 'saoi2',
				version: '2.0',
				size: 273448315
			}

		}
	},

	t2: {
		id: 123,
		title: 'Chrome Edition',
		description: "Based on Terminator 2: Judgment Day VP9 v1.1RC 4/3 by UncleReamus and Noah Fentz. EMreels / Angle-dependent table:\n\n### Works only in 1920 x 1080 x 32bit.\n### \"Antialias Ball\" has to be activated\n\nROM name (not included): ``t2_l8``",
		acknowledgements: '* @UncleReamus and @NoahFentz for giving me permission to use their version to build mine.\n* @Light66 for giving me permission to use some of his textures originally done for the FP version.\n* @BFG_Brutal and @Gear323 for their precious help, they tested the table during months and their comments, advises and feedback have been extremely helpful.',
		authors: [
			{
				author: {
					user: ' tipoto',
					avatar: '/avatars/tipoto.jpg'
				},
				roles: [ 'Table Mod' ]
			},
			{
				author: {
					user: ' Noah Fentz',
					avatar: '/avatars/noah.jpg'
				},
				roles: [ 'Original 4:3 Version' ]
			},
			{
				author: {
					user: ' UncleReamus',
					avatar: '/avatars/UncleReamus.png'
				},
				roles: [ 'Original 4:3 Version' ]
			}
		],
		submitter: {
			user: 'tipoto',
			avatar: '/avatars/tipoto.jpg'
		},
		rating: 9.8,
		votes: 212,
		screenshots: [],
		mods: [],
		versions: [
			{
				timestamp: '2014-01-10T10:29:20Z',
				submitter: { user: 'tipoto' },
				downloads: 1231,
				changes: '* Fake Anti-aliasing and FXAA disabled. These new features are unnecessary and don\'t work well with this table, they produce a blurry render.',
				download: {
					id: 'ksjfda',
					version: '1.0.7',
					size: 63460654
				}
			},
			{
				timestamp: '2014-01-02T02:04:20Z',
				size: 63460654,
				submitter: { user: 'tipoto' },
				downloads: 1232,
				changes: '* New Game Play / Physics. It\'s now easier to load the cannon, with both flippers. The table is fast, precise and fluid.\n* Added a new option in the script to hide the virtual DMD. It\'s for those having a real DMD on their Cab. The option is called "DMD_Hidden" and you will find it at the beginning of the script with the other options.\n* ROM name has been moved at the beginning of the script with all the options. It\'s now easy to access.',
				download: {
					id: 'ksjfdb',
					version: '1.0.6',
					size: 63460654
				}
			},
			{
				version: '1.0.5',
				timestamp: '2013-12-12T12:04:20Z',
				size: 63460654,
				submitter: { user: 'tipoto' },
				downloads: 2556,
				changes: '* 1 texture modified, there was a glitch when the flasher near by the left bumper was flashing\n* Plunger strength slightly increased\n* (Table works fine with vp914 and vp913)',
				download: {
					id: 'ksjfdc',
					version: '1.0.5',
					size: 63460654
				}
			}
		],
		comments: [ ],
		media: [ ],

		// easy acess fields:
		thumbs: {
			playfield: [ '/cabinet/t2chrome.png' ],
			square: '/asset/release/t2chrome/square-small.png'
		},
		lastversion: {
			timestamp: '2014-01-10T10:29:20Z',
			submitter: { user: 'tipoto' },
			downloads: 1231,
			download: {
				id: 'ksjfda',
				version: '1.0.7',
				size: 63460654
			}
		}
	}
};

var games = {

	afm: {
		id: 'afm',
		key: 'Attack from Mars (Bally 1995)',
		name: 'Attack from Mars',
		manufacturer: 'Midway',
		year: 1995,
		ipdb: {
			no: 3781,
			rating: 8.1,
			votes: 231,
			top300: 11
		},
		rating: 8.2,
		votes: 18,
		views: 768,
		comments: 5,
		gamedownloads: 4098,
		lastrelease: '2014-03-23T20:38:20Z',
		authors: [ 'jpsalas' ],
		releases: [ releases.afm ],
		roms: [],
		media: [],

		// easy access fields
		thumbs: {
			logo: '/logo/afm.png',
			backglass: '/backglass/thumb/Attack from Mars (Bally 1995).png'
		}
	},

	bop: {
		id: 'tm-bop',
		key: 'Bride Of Pinbot (Williams 1991)',
		name: 'The Machine: Bride of Pin·bot',
		manufacturer: 'Williams',
		year: 1991,
		rating: 8.1,
		votes: 2,
		views: 1232,
		comments: 1,
		gamedownloads: 1233,
		lastrelease: '2011-01-07T19:48:00Z',
		authors: [ 'unclewilly' ],

		// easy access fields
		thumbs: {
			logo: '/logo/tm-bop.png'
		}
	},

	centaur: {
		id: 'centaur',
		key: 'Centaur (Bally 1981)',
		name: 'Centaur',
		manufacturer: 'Bally',
		year: 1981,
		rating: 9.1,
		votes: 5,
		views: 2440,
		comments: 12,
		gamedownloads: 915,
		lastrelease: '2013-07-14T21:46:00Z',
		authors: [ 'Fuzzel', 'Lord Hiryu' ],
		releases: [ releases.centaur ]
	},

	cv: {
		id: 'cv',
		key: 'Cirqus Voltaire (Bally 1997)',
		name: 'Cirqus Voltaire',
		manufacturer: 'Bally',
		year: 1997,
		rating: 8.1,
		votes: 14,
		views: 	9473,
		comments: 31,
		gamedownloads: 3845,
		lastrelease: '2014-02-03T20:59:00Z',
		authors: [ 'JP Salas', 'Rosve', 'Aaron James', 'Teppotee', 'Koadic', 'Dozer316' ],
		releases: [ releases.cv ],

		// easy access fields
		thumbs: {
			logo: '/logo/cv.png',
			backglass: '/backglass/thumb/Cirqus Voltaire (Bally 1997).png'
		}
	},

	mb: {
		id: 'mb',
		key: 'Monster Bash (Williams 1998)',
		name: 'Monster Bash',
		manufacturer: 'Williams',
		year: 1998,
		ipdb: {
			no: 4441,
			rating: 8.4,
			votes: 221,
			top300: 3
		},
		units: 3361,
		gamedesign: [ 'George Gomez' ],
		artdesign: [ 'Kevin O\'Connor'],
		game_type: 'ss',
		rating: 8.8,
		votes: 21,
		views: 7615,
		comments: 10,
		gamedownloads: 5934,
		lastrelease: '2014-02-03T19:47:20Z',
		authors: [ 'unclewilly', 'randr' ],
		releases: [ releases.mb ],
		roms: [
			{ name: 'mm_05', language: 'english', notes: '', downloads: 171,
				download: { id: 'fdd234', size: 5982313, version: '0.50' }},
			{ name: 'mm_10', language: 'english', notes: '', downloads: 3972,
				download: { id: 'fdd235', size: 5983929, version: '1.00' }},
			{ name: 'mm_106', language: 'english', notes: '', downloads: 2681,
				download: { id: 'fdd236', size: 5986447, version: '1.06' }},
			{ name: 'mm_106b', language: 'english', notes: 'Inofficial version', downloads: 5172,
				download: { id: 'fdd237', size: 6034521, version: '1.06b' }}
		],
		backglasses: [
			{
				description: '**ENHANCED BACKGLASS**\n\n> It\'s Alive!\n\nThis is a fantasy backglass recreation using some advanced animations and does not represent the original machine backglass layout or globe sequence.\n\nThe majority of my backglasses will be like this to add some life to the original game.  Hope you enjoy it \n\n- Dozer316.',
				author: { user: 'Dozer316' },
				tags: [ 'Fantasy' ],
				downloads: 732,
				rating: 7.5,
				votes: 3,
				thumb: '/directb2s/thumbs/monster-bash-illuminated.png',
				download: {
					id: 'pipisonvd',
					size: 3845915,
					version: '1.0'
				}
			},
			{
				description: 'Redone Monster Bash directb2s backglass. I did not make the original. I just updated the image to a higher res version.',
				author: { user: 'bill55' },
				tags: [ 'Fantasy' ],
				downloads: 798,
				rating: 8.5,
				votes: 3,
				thumb: '/directb2s/thumbs/cc-monster-bash--williams-1998-.png',
				download: {
					id: 'pivpoobi',
					size: 11735983,
					version: '1.0'
				}
			}
		],
		media: [
			{
				filename: 'Monster Bash (Williams 1998).png',
				src: '/backglass/Monster Bash (Williams 1998).png',
				thumb: '/backglass/thumb/Monster Bash (Williams 1998).png',
				type: 'backglass',
				author: { user: 'bitupset' },
				width: 1280,
				height: 1024,
				format: 'image',
				downloads: 335,
				rating: 8.7,
				votes: 5,
				download: {
					id: 'uhmupmh',
					size: 3135204,
					version: '1.0.1'
				}
			},
			{
				filename: 'Monster Bash (Williams 1998).jpg',
				src: '#',
				thumb: '/flyer/thumb/Monster Bash (Williams 1998).jpg',
				type: 'flyer',
				author: { user: 'bitupset' },
				pages: [ 'Front', 'Back' ],
				format: 'image',
				downloads: 6651,
				rating: 8,
				votes: 8555,
				download: {
					id: 'uhmuudfvh',
					size: 7955231,
					version: '1.0'
				}
			},
			{
				filename: 'Monster Bash (Williams 1998).swf',
				src: '/instructioncard/Monster Bash (Williams 1998).swf',
				thumb: '/instructioncard/thumb/Monster Bash (Williams 1998).png',
				type: 'instructioncard',
				author: { user: 'bitupset' },
				format: 'swf',
				downloads: 112,
				rating: 8.8,
				votes: 65,
				download: {
					id: 'ukasdudfvh',
					size: 174729,
					version: '1.0'
				}
			},
			{
				filename: 'Monster Bash (Williams 1998).png',
				src: '#',
				thumb: '/backglass/thumb/Monster Bash (Williams 1998).png',
				type: 'backglass',
				author: { user: 'bitupset' },
				width: 1280,
				height: 1024,
				duration: 120,
				format: 'video',
				downloads: 210,
				rating: 8.5,
				votes: 2,
				download: {
					id: 'outcogcs',
					size: 92349945,
					version: '1.0'
				}
			}
		],

		// easy access fields
		thumbs: {
			logo: '/logo/mb.png',
			backglass: '/backglass/thumb/Monster Bash (Williams 1998).png'
		}
	},

	ij: {
		id: 'ij',
		key: 'Indiana Jones (Stern 2008)',
		name: 'Indiana Jones: The Pinball Adventure',
		manufacturer: 'Williams',
		year: 1993,
		rating: 8.3,
		votes: 3,
		views: 240,
		comments: 11,
		gamedownloads: 5547,
		lastrelease: '2013-07-14T21:46:00Z',
		authors: [ 'teppotee', 'Lord Hiryu' ],
		releases: [ releases.ij ],

		// easy access fields
		thumbs: {
			logo: '/logo/ij.png',
			backglass: '/backglass/thumb/Indiana Jones (Stern 2008).png'
		}
	},

	sttng: {
		id: 'sttng',
		key: 'STTNG (Williams 1993)',
		name: 'Star Trek: The Next Generation',
		manufacturer: 'Williams',
		year: 1993,
		rating: 8.3,
		votes: 22,
		views: 2232,
		comments: 0,
		gamedownloads: 44561,
		lastrelease: '2013-12-26T08:25:00Z',
		authors: [ 'teppotee ' ],

		// easy access fields
		thumbs: {
			logo: '/logo/sttng.png'
		}
	},

	t2: {
		id: 't2',
		key: 'Terminator 2 - Judgment Day (Williams 1991)',
		name: 'Terminator 2: Judgment Day',
		manufacturer: 'Williams',
		year: 1991,
		rating: 9.8,
		votes: 42,
		views: 34026,
		comments: 65,
		gamedownloads: 8265,
		lastrelease: '2014-01-10T08:29:00Z',
		authors: [ 'Tipoto' ],
		releases: [ releases.t2 ],

		// easy access fields
		thumbs: {
			logo: '/logo/t2chrome.png',
			backglass: '/backglass/thumb/Terminator 2 - Judgment Day (Williams 1991).png'
		}
	},

	totan: {
		id: 'totan',
		key: 'Tales of the Arabian Nights (Williams 1996)',
		name: 'Tales of the Arabian Nights',
		manufacturer: 'Williams',
		year: 1996,
		rating: 8.2,
		votes: 4,
		views: 	2231,
		comments: 1,
		gamedownloads: 234,
		lastrelease: '2012-10-25T19:39:00Z',
		authors: [ 'jpsalas' ],

		// easy access fields
		thumbs: {
			logo: '/logo/totan.png'
		}
	},

	ww: {
		id: 'ww',
		key: 'Whitewater (Williams 1993)',
		name: 'Whitewater',
		manufacturer: 'Williams',
		year: 1993,
		rating: 8.3,
		votes: 2,
		views: 	1332,
		comments: 0,
		gamedownloads: 1333,
		lastrelease: '2013-09-17T05:06:00Z',
		authors: [ 'aaronjames' ],

		// easy access fields
		thumbs: {
			logo: '/logo/ww.png'
		}
	}
};

var data = [
	games.afm,
	{
		id: 'bbb',
		key: 'Big Bang Bar (Capcom 1996)',
		name: 'Big Bang Bar',
		manufacturer: 'Capcom',
		year: 1996,
		rating: 8.2,
		votes: 12,
		views: 	6932,
		comments: 16,
		gamedownloads: 2797,
		lastrelease: '2013-06-16T11:52:00Z',
		authors: [ 'unclewilly', 'jimmyfingers', 'Grizz' ]
	},
	{
		id: 'br',
		key: 'Black Rose (Bally 1992)',
		name: 'Black Rose',
		manufacturer: 'Bally',
		year: 1992,
		rating: 7.8,
		votes: 1,
		views: 3584,
		comments: 16,
		gamedownloads: 1339,
		lastrelease: '2009-07-23T10:03:00Z',
		authors: [ 'destruk' ]
	},
	{
		id: 'cc',
		key: 'Cactus Canyon (Midway 1998)',
		name: 'Cactus Canyon',
		manufacturer: 'Midway',
		year: 1998,
		rating: 8.5,
		votes: 14,
		views: 8179,
		comments: 7,
		gamedownloads: 3238,
		lastrelease: '2014-02-03T20:59:00Z',
		authors: [ 'Lord Hiryu', 'MRCMRC', 'Aaron James', 'thewool', 'unclewilly', 'Koadic', 'Sheltemke' ]
	},
	games.cv,
	games.centaur,
	games.ij,
	games.mb,
	games.sttng,
	games.t2,
	games.totan,
	{
		id: 'taf',
		key: 'The Adams Family (Williams 1992)',
		name: 'The Addams Family',
		manufacturer: 'Williams',
		year: 1992,
		rating: 8.8,
		votes: 22,
		views: 23750,
		comments: 43,
		gamedownloads: 9428,
		lastrelease: '2011-11-06T05:25:00Z',
		authors: [ 'melon' ]
	},
	games.bop,
	{
		id: 'whodunnit',
		key: 'Who Dunnit (Bally 1995)',
		name: 'Who Dunnit',
		manufacturer: 'Bally',
		year: 1995,
		rating: 7.6,
		votes: 1,
		views: 	5013,
		comments: 9,
		gamedownloads: 1934,
		lastrelease: '2011-11-06T05:25:00Z',
		authors: [ 'destruk', 'The Trout' ]
	},
	games.ww
];

var users = [
	{
		user: 'fuzzel',
		avatar: '/avatars/fuzzel.jpg',
		authored: 2,
		submitted: 3,
		acknowledged: 52,
		followers: 2231
	},
	{
		user: 'jpsalas',
		avatar: '/avatars/jpsalas.png',
		authored: 74,
		submitted: 12,
		acknowledged: 1165,
		followers: 4231
	},
	{
		user: 'unclewilly',
		avatar: '/avatars/unclewilly.jpg',
		authored: 54,
		submitted: 5,
		acknowledged: 554,
		followers: 5132
	},
	{
		user: 'Noah Fentz',
		avatar: '/avatars/noah.jpg',
		authored: 3,
		submitted: 6651,
		acknowledged: 565,
		followers: 2132
	},
	{
		user: 'jimmyfingers',
		avatar: '/avatars/jimmyfingers.jpg',
		authored: 4,
		submitted: 21,
		acknowledged: 1024,
		followers: 115
	},
	{
		user: 'toxie',
		avatar: '/avatars/toxie.png',
		authored: 2,
		submitted: 12,
		acknowledged: 456,
		followers: 554
	},
	{
		user: 'grizz',
		avatar: '/avatars/grizz.jpg',
		authored: 23,
		submitted: 128,
		acknowledged: 16,
		followers: 669
	}
];

exports.games = function(req, res) {

	res.json({
		result: data
	});
};

exports.game = function(req, res) {

	res.json({
		result: _.find(data, function(game) {
			return game.id === req.params.id;
		})
	});
};

exports.packs = function(req, res) {

	var gameAttrs = [ 'id', 'name' ];
	res.json({
		result: [
			{
				logo: 'williams',
				manufacturer: 'Williams',
				name: '1990s',
				number: 'Pack 1',
				banner: '/packs/williams-1990s.png',
				releases: [
					_.pick(games.ij, gameAttrs),
					_.pick(games.ww, gameAttrs),
					_.pick(games.mb, gameAttrs),
					_.pick(games.totan, gameAttrs),
					_.pick(games.bop, gameAttrs),
					_.pick(games.sttng, gameAttrs)
				],
				download: {
					id: 'ocrzcdiop',
					size: 846534213,
					version: '1.0.2'
				}
			},
			{
				logo: 'stern',
				manufacturer: 'Stern',
				name: 'Early 2000s',
				number: 'Pack 1',
				banner: '/packs/stern-2000s.png',
				releases: [
					{ name: 'Elvis®', id: 'mb' },
					{ name: 'The Lord of the Rings', id: 'mb' },
					{ name: 'The Simpsons Pinball Party', id: 'mb' },
					{ name: 'Monopoly™', id: 'mb' },
					{ name: 'Ripley\'s Believe It or Not!®', id: 'mb' },
					{ name: 'Playboy®', id: 'mb' }
				],
				download: {
					id: 'wvzqwcqpb',
					size: 988316844,
					version: '1.0.0'
				}

			}
		]
	});
};

exports.releases = function(req, res) {

	var gameAttrs = [ 'id', 'name', 'manufacturer', 'year', 'thumbs'];
	var ret = [];

	var afm = releases.afm;
	var centaur = releases.centaur;
	var cv = releases.cv;
	var ij = releases.ij;
	var mb = releases.mb;
	var t2 = releases.t2;

	afm.game = _.pick(games.afm, gameAttrs);
	centaur.game = _.pick(games.centaur, gameAttrs);
	cv.game = _.pick(games.cv, gameAttrs);
	ij.game = _.pick(games.ij, gameAttrs);
	mb.game = _.pick(games.mb, gameAttrs);
	t2.game = _.pick(games.t2, gameAttrs);

	//noinspection JSHint
	switch (req.query.show) {
		case 'new':
			ret = [ ij, afm, mb, centaur, t2, cv ];
			break;

		case 'updated':
			ret = [ t2, cv, mb, ij, afm, centaur ];
			break;
		default:
			ret = [ t2, cv, mb, ij, afm, centaur ];
			break;
	}

	res.json({
		result: ret
	});
};

exports.feed = function(req, res) {

	res.json({
		result: [
			{
				type: 'comment',
				timestamp: new Date(new Date().getTime() - 30000).toISOString(),
				user: {
					user: 'freezy',
					avatar: '/avatars/freezy.jpg'
				},
				data: {
					type: 'release',
					game: {
						id: 'afm',
						name: 'Attack from Mars',
						manufacturer: 'Williams',
						year: 1998
					},
					release: {
						id: 1198,
						title: 'Real-Flag Edition'
					},
					message: 'Welcome to the dashboard!'
				}
			},
			{
				type: 'release',
				timestamp: new Date(new Date().getTime() - 3600000).toISOString(),
				user: {
					user: 'teppotee',
					avatar: '/avatars/teppotee.png'
				},
				data: {
					game: {
						id: 'ij',
						name: 'Indiana Jones: The Pinball Adventure',
						manufacturer: 'Williams',
						year: 1993
					},
					release: {
						id: 123,
						title: 'HD Edition',
						lastversion: {
							version: '2.0'
						}
					}
				}
			},
			{
				type: 'release',
				timestamp: '2014-01-10T08:29:00Z',
				user: {
					user: 'tipoto',
					avatar: '/avatars/tipoto.jpg'
				},
				data: {
					game: {
						id: 't2',
						name: 'Terminator 2: Judgment Day',
						manufacturer: 'Williams',
						year: 1991
					},
					release: {
						id: 123,
						title: 'Chrome Edition',
						lastversion: {
							version: '1.0.7'
						}
					}
				}
			},
			{
				type: 'comment',
				timestamp: '2014-02-28T22:46:20Z',
				user: {
					user: 'fuzzel',
					avatar: '/avatars/fuzzel.jpg'
				},
				data: {
					type: 'release',
					game: {
						id: 'mb',
						name: 'Monster Bash',
						manufacturer: 'Williams',
						year: 1998
					},
					release: {
						id: 954,
						title: 'PC Killer Edition'
					},
					message: 'Hey I\'m the first to say WELL DONE! :D'
				}
			}
		]
	});
};

exports.users = function(req, res) {
	res.json({
		result: users.slice(0, 4)
	});
};

exports.user = function(req, res) {
	res.json({
		result: _.find(users, function(user) {
			return user.user === req.params.user;
		})
	});
};


