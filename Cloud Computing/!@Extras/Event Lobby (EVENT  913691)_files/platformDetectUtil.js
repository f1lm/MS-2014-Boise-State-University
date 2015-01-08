/**
 * @author Juan Bernardez
 * 
 * Little utility to perform OS / Browser detection
 */

RegPage.Detection = {
	
	mobileOS: {
		Android: navigator.userAgent.match(/Android/i),
		BlackBerry: navigator.userAgent.match(/BlackBerry/i),
		iOS: navigator.userAgent.match(/iPhone|iPad|iPod/i),
		iOS7: navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i),
		Opera: navigator.userAgent.match(/Opera Mini/i),
		Windows: navigator.userAgent.match(/IEMobile/i)
	},
		
	/* Check if browser is Android "Native" Browser. This check is based on 
	 * Web Audio and getUserMedia/Stream API feature detection.
	 * We observed that Android Native Browser don't support those features. We
	 * include both here instead of just one, because some Samsung Phones "Native"
	 * browsers support either one or the other. Probably we'll have to keep an
	 * eye on this, because in the future this will likely change.
	 * Source: http://caniuse.com/#compare=android+4.4,and_chr+0,and_ff+0
	 * (3/25/2014)
	 */
	isAndroidNativeBrowser: function() {
		'use strict';
		if (this.mobileOS.Android && ((!window.AudioContext && !window.webkitAudioContext)
			|| (!navigator.getUserMedia && !navigator.webkitGetUserMedia)) ) {
			return true;
		}
		return false;	
	}
};