/**
 * @author Juan Bernardez
 */

/*global $, _ */

RegPage.OverviewModel = Backbone.Model.extend({
	
	parse: function(attrs, options) {
		'use strict';
		
		var totalMins = attrs.odDuration ? attrs.odDuration/(1000*60) : (attrs.endDate - attrs.goodAfter)/(1000*60),
			minutes = totalMins % 60, //Note: Not using a round of number here because then we have to round off hours as well
			hours = ((totalMins - minutes) / 60),
			hoursText = hours === 0 ? '' : hours > 1 ? hours + ' hours' : hours + ' hour';

		minutes = Math.round(minutes);

		var minText = minutes > 1 ? minutes + ' minutes' : minutes + ' minute',
			duration = minutes === 0 ? hoursText : hoursText === '' ? minText : hoursText + ', ' + minText;
			
		attrs.duration = duration;
		return attrs;
	}
	
});