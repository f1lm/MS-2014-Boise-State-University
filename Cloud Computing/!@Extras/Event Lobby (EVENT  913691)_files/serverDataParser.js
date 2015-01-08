/**
 * @author Juan Bernardez
 */

/*global $, _ */

RegPage.ServerDataParser = {
	
	/*
	 * Transform properly the RegPage data from the displayElements into JSON
	 * 
	 * @param displayelementArray: The array containing all displayElements
	 */
	parseServerRegPageData: function(serverRegPageData) {
		'use strict';
		var self = this,
			jsonRegPageData = $.xml2json(serverRegPageData);
			
		jsonRegPageData.displayelementArray = jsonRegPageData.displayelement;
		jsonRegPageData.displayelement = this.array2Object(jsonRegPageData.displayelement, 'displayElementValueCode');
		jsonRegPageData.customStylesData = this.setSectionsCustomStylingData(jsonRegPageData);
		
		return jsonRegPageData;
	},
	
	/*
	 * Transform the data from custom user stylings in a manageable format
	 */
	setSectionsCustomStylingData: function(jsonRegPageData) {
		'use strict';
		var regDisEls = jsonRegPageData.displayelement,
			csData = {};

			csData.submitBorderColor = regDisEls.template_reg_btn_border_color
								? regDisEls.template_reg_btn_border_color.displayElementValue
								: null;
			csData.submitBkgColor = regDisEls.template_reg_btn_color
								? regDisEls.template_reg_btn_color.displayElementValue
								: null;
			csData.submitTxtColor = regDisEls.template_reg_btn_text_color
								? regDisEls.template_reg_btn_text_color.displayElementValue
								: null;
			
		
		csData.headerVisibility = !regDisEls.template_reg_sec_headers || (regDisEls.template_reg_sec_headers && regDisEls.template_reg_sec_headers.displayElementValue === "Y" ) ? "visible" : "hidden";
		csData.headerFont = regDisEls.template_reg_sec_hdr_font? regDisEls.template_reg_sec_hdr_font.displayElementValue : "";
		csData.headerFontColor = regDisEls.template_reg_sec_hdr_txt_color ? regDisEls.template_reg_sec_hdr_txt_color.displayElementValue : "" ;
		csData.headerFontSize = regDisEls.template_reg_sec_hdr_txt_size ? regDisEls.template_reg_sec_hdr_txt_size.displayElementValue: "";

		
		return csData;
	},
	
	/*
	 * Transform the xml Event data into JSON
	 * 
	 * @param serverEventData: The event data retrived from the server
	 */
	parseServerEventData: function(serverEventData) {
		'use strict';
		var self = this,
			jsonEventData = $.xml2json(serverEventData),
			displayelementArray = jsonEventData.event.session.displayelementinfo.displayelement;
			
		_.each(displayelementArray, function(displayelement){
			try{
				if (displayelement.displayElementValue.indexOf('<config>') === 0){
		
				//This replacement is made because we are receiving some bad formed/encoded XML, 
				//and also $.parseXML brakes with '&' symbols. Messy stuff...
				displayelement.displayElementValue = displayelement.displayElementValue.replace(/&/g, '&amp;').replace(/<paramname=/g, '<param name=');//trying to fix weired XML issue with FF
				displayelement.displayElementValue = $.xml2json($.parseXML(displayelement.displayElementValue));
				displayelement.displayElementValue.config = {};
				displayelement.displayElementValue.config.params = self.paramsToJSON(displayelement.displayElementValue.params.param);
				}
			}catch(e){}
		});
		jsonEventData.event.session.mediaurlinfo.mediaurl = this.array2Object(jsonEventData.event.session.mediaurlinfo.mediaurl, 'id');
		jsonEventData.event.extendedeventinfo.eventinfo = this.array2Object(jsonEventData.event.extendedeventinfo.eventinfo, 'typecode');
		jsonEventData.event.session.displayelementinfo.displayelementArray = jsonEventData.event.session.displayelementinfo.displayelement;
		jsonEventData.event.session.displayelementinfo.displayelement = this.array2Object(displayelementArray, 'displayElementValueCode');
		
		return jsonEventData;
	},
	
	/*
	 * Function to provide proper JSON structure to displayElement params
	 * 
	 * @param displayElParams: array of displayElement parameters
	 * 
	 * @return: A JSON object properly formed with displayElement params
	 */
	paramsToJSON: function(displayElParams) {
		//'use strict';
		var retObj = {};
		_.each(displayElParams, function(attrs){
			//As we no longer have to parse XML, we return all '&amp;' encoded symbols to their '&' original state
			var prop;
			for (prop in attrs){
				if (attrs.hasOwnProperty(prop)){
					attrs[prop] = 
						attrs[prop].replace(/&amp;/g, '&')
						.replace(/&lt;/g, '<')
						.replace(/&gt;/g, '>')
						.replace(/&quot;/g, '"');
				}
			}
			retObj[attrs.name] = attrs;
		});
		return retObj;
	},
	
	/*
	 * Transforms the passed "array" into an object which properties names
	 * are the passed "propName" for each array element
	 * 
	 * @param array: the array we want to transform in a JSON-ish object
	 * @param propName: the property from each array element that will be used
	 *					to name each property of the resulting object.
	 *					IMPORTANT!: each element need to have a different value
	 *					in its "propName" property, or they will be overwritten 
	 * 
	 * @return: The object transformed from the passed array.
	 */
	array2Object: function(array, propName) {
		'use strict';
		var object = {};
		
		if (_.isArray(array)) {
			_.each(array, function(arrayEl){
				if(object[arrayEl[propName]] && _.isArray(object[arrayEl[propName]])){ // changed this logic for speaker bio  there can be multiple speaker bio widget
					object[arrayEl[propName]].push(arrayEl);
				}else if(object[arrayEl[propName]]) {
					var array = [];
					array.push(object[arrayEl[propName]]);
					array.push(arrayEl);
					object[arrayEl[propName]] = array;
				}else
					object[arrayEl[propName]] = arrayEl;
			});	
		}else {
			object = array;
		}
		
		return object;
	},
	
	/***
	 * to unescape special characters 
	 */
	htmlUnescape: function(text){
		return text.replace(/&amp;/g, '&')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"');
	},
	
	/***
	 * to remove script tags and make javascript safe
	 */
	escapeJavascript: function(text) {
		return text.replace(/<script>/g, "")
			.replace(/<\/script>/g, "");
	}
};



