/**
 * Lithium Technologies
 * @author: Tim Wong, Adam Ayres adam.ayres@lithium.com 
 * @date: 2009-10-12
 */

if(typeof LITHIUM.Components === 'undefined') { LITHIUM.Components = {}; }

/**
 * Returns the the component as a JSON object with two fields, "content" which contains the
 * rendered markup of the component, and "scripts", which contains the JavaScript for the component.
 */ 
LITHIUM.Components.render = function(componentId, data, optionsParam) {	
	var runner = function() {
		var requestUrl = LITHIUM.Components.renderUrl(componentId);
		
		var options = {			
			type: "GET",
			dataType: "json"		
		};
		LITHIUM.jQuery.extend(options, optionsParam || {});
		if (!options.hasOwnProperty("url")) {
			LITHIUM.jQuery.extend(options, { url: requestUrl });
		}
		
		options.data = data;
		LITHIUM.jQuery.ajax(options);
	};
	
	if (LITHIUM.Loader.isLoaded() === true) {
		runner();
	} else {
		LITHIUM.Loader.onLoad(runner);
	}
};

/**
 * Creates the URL used when rendering contributed components
 */
LITHIUM.Components.renderUrl = function(componentId, parameters) {
	var url = LITHIUM.Components.RENDER_URL;
	LITHIUM.jQuery.each({"component-id": componentId}, function(key, value) {
		url = url.replace(new RegExp("#{" + key + "}", "g"), value);
	});
	
	//var url = LITHIUM.Replace(LITHIUM.Components.RENDER_URL, {"component-id": componentId});
	
	if (typeof parameters !== "undefined") {
		url += "?" + LITHIUM.jQuery.param(parameters);
	}
	return url;
};
	
/**
 * Renders a component in the location the script is used.
 * Note that the final 2 parameters are provided by the 'LazyLoad' mixin
 */
LITHIUM.Components.renderInPlace = function(componentId, parametersParam, optionsParam, shellClientId, 
	scriptElementSelector, containerSelector) {
	
	var placeHolderId;
	var placeholderDiv;
			
	if (shellClientId) {
		placeHolderId = shellClientId;
	} else if (LITHIUM.Loader.isLoaded() === false)  {
		/*
		 * This mode is preserved for backwards-compatibility's sake -- we only allow a document.write for
		 * the page-being-rendered case.
		 */
		placeHolderId = new Date().getTime().toString() + Math.floor(Math.random()*10000000+1);
		placeholderDiv = "<div id='@id' class='@class'></div>".replace("@id", placeHolderId).replace("@class", 
			LITHIUM.Css.BASE_LAZY_LOAD);
		document.write(placeholderDiv);
	}
		
	var loadRunner = function() {
				var parameters = parametersParam || {};
				var options = optionsParam || {};
				
//				var params = {
//					"renderedScripts" : LITHIUM.RenderedScripts.toString(),
//					"component-id" : componentId
//				};
				
				LITHIUM.jQuery.extend(parameters, {
					"renderedScripts" : LITHIUM.RenderedScripts.toString(),
					"component-id" : componentId
				});
				LITHIUM.jQuery.extend(options, {
					"success" : function(data) {
						LITHIUM.jQuery("#" + placeHolderId).replaceWith(data.content);
						/*
						 * TODO: there is a problem with the asynchronous nature of the operations
						 * here, and the managing of state for the 'rendered scripts'. Extra, defensive
						 * logic will need to be added to AjaxSupport.js
						 */
						LITHIUM.AjaxSupport.ScriptsProcessor.handleScriptEvaluation(data);
						if (containerSelector) {
							LITHIUM.jQuery(containerSelector).trigger("LITHIUM:ajaxSuccess:renderInPlace", 
								{ "componentId" : componentId });
						}
						if (scriptElementSelector) {
							setTimeout(function() {
								LITHIUM.jQuery(scriptElementSelector).remove();
							}, 10);
						}
					},
					"error" : function(request, textStatus, errorThrown) {
						var placeholder = LITHIUM.jQuery("#" + placeHolderId);
						
						//Handles case where the server trip is not actually completed 
						if(request.readyState == 0 || request.status == 0){
							placeholder.html("");
						}
						else {
							placeholder.html("<span class=\"lia-ajax-error-text\">" + optionsParam.errorMessage + "</span>");
						}
						placeholder.removeClass(LITHIUM.Css.BASE_LAZY_LOAD);
						
					}
				});
				
//				options.success = function(data) {
//					LITHIUM.jQuery("#" + placeHolderId).replaceWith(data.content);
//					/*
//					 * TODO: there is a problem with the asynchronous nature of the operations
//					 * here, and the managing of state for the 'rendered scripts'. Extra, defensive
//					 * logic will need to be added to AjaxSupport.js
//					 */
//					LITHIUM.AjaxSupport.ScriptsProcessor.handleScriptEvaluation(data);
//					if (containerSelector) {
//						LITHIUM.jQuery(containerSelector).trigger("LITHIUM:ajaxSuccess:renderInPlace", 
//							{ "componentId" : componentId });
//					}
//					if (scriptElementSelector) {
//						setTimeout(function() {
//							LITHIUM.jQuery(scriptElementSelector).remove();
//						}, 10);
//					}
//				};
				
				LITHIUM.Components.render(componentId, parameters, options);
				
			};
				
	if (LITHIUM.Loader.isLoaded() === false) {
		LITHIUM.Loader.onLoad(loadRunner);
	} else {
		loadRunner();
	}
};

/**
 * Renders a template string using the custom template context.
 */
LITHIUM.Components.renderTemplateInPlace = function(template, options) {
	LITHIUM.Components.renderInPlace("common.widget.template-content", {value: template}, options);
};

/**
 * Renders a template string using the custom template context, expects a 
 * callback will be used in the options, this passes directly through to ajax#request(url, options).
 */
LITHIUM.Components.renderTemplate = function(template, options) {
	return LITHIUM.Components.render("common.widget.template-content", {value: template, asMarkup: true}, 
		LITHIUM.jQuery.extend(options, { dataType: "html" }));
};
