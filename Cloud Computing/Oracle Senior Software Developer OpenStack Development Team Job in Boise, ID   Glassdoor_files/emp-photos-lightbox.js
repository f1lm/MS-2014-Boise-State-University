/*
 * Copyright (c) 2007-2014, Glassdoor. All rights reserved.
 *
 * This software is an unpublished work subject to a confidentiality agreement
 * and protected by copyright and trade secret law. Unauthorized copying,
 * redistribution or other use of this work is prohibited. All copies must
 * retain this copyright notice. Any use or exploitation of this work without
 * authorization could subject the perpetrator to criminal and civil liability.
 *
 * The information in this software is subject to change without notice
 * and should not be construed as a commitment by glassdoor.com.
 *
 * The above copyright notice does not indicate actual or intended publication
 * of this source code.
 *
 * $Rev:: 92299											$: (current file revision)
 * $Date:: 2013-12-12 16:43:33 -0800 (Thu, 12 Dec 2013) $: (date of last file modification)
 * $Author:: vikram										$: (person who last modified this file)
 */
/*---------------------------------------------------------------------------------------------------------
 * This file contains code used by the Glassdoor application for the reviews feed module,
 * including adding, editing, and deleting employer responses as well as blurring content for non-
 * contributers.
 *---------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------
 * Employer Photos Module
 *---------------------------------------------------------------------------------------------------------*/

GD.photos = GD.photos || {};

GD.photos.initLightbox = function(employerId, frame, photoNum, locationFilter) {
	function initPhotoSlider() {
		var options = {
			employerId:     employerId,
			frame:          frame,
			slideNum:       photoNum,
			locationFilter:	locationFilter
		};

		GD.photos.photoSlider(options);
	}

	photoNum = photoNum || 1;

	if (GD.photos && GD.photos.photoSlider) {
		initPhotoSlider();
	}
	else {
		var dependencies = [
			"/static/css/gd-emp-photos-lightbox.css",
			"/static/js/handlebars/handlebars.min-v1.3.0.js",
			"/static/js/jquery/plugins/royalslider-9.5.4/royalslider/jquery.royalslider.min.js",
			"/static/js/modules/photo-slide-manager.js",
			"/static/js/modules/photo-slider.js",
			"/static/js/modules/photo-details.js",
			"/static/js/modules/gd-slider.js"
		];

		if (!(GD.helpful && GD.helpful.init)) {
			dependencies.push("/static/js/components/helpful.js");
		}

		if (!(GD.flag && GD.flag.init)) {
			dependencies.push("/static/js/components/flag-content.js");
		}

		GD.script.load(dependencies, initPhotoSlider);
	}
};
