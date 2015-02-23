/**
 * @author Juan Bernardez
 */

/*global $, _ */

RegPage.SummaryModel = Backbone.Model.extend({
	
	parse: function(attrs, options) {
		'use strict';
		
		var evt = options.eventData.event;
		//Replacing tokens with actual value.
		 attrs.summary = attrs.summary.replace(/#EVENTTITLE#/g, evt.description)
							 .replace(/#EVENTTIME#/g, evt.formattedeventdate.substring(evt.formattedeventdate.indexOf('-')+1))
							 .replace(/#EVENTDATE#/g, evt.formattedeventdate.substring(0, evt.formattedeventdate.indexOf('-')-1))
							 .replace(/#EVENTTIMEZONELONG#/g, evt.displaytimezone)
							 .replace(/#EVENTTIMEZONESHORT#/g, evt.displaytimezoneshort)
		 					 .replace(/#EVENTDAY#/g, evt.formattedeventdate.substring(0,evt.formattedeventdate.indexOf(',')))
		 					 .replace(/#AUDIENCEURL#/g, evt.registrationurl);		 					 
		return attrs;
	}
});