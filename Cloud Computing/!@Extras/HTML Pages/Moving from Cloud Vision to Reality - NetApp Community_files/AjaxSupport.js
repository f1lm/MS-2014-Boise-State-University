/**
 * Lithium Technologies
 * @author Adam Ayres
 * @portedby Adam Ayres
 * @requires jQuery
 *
 * Custom Ajax support for LIA.
 */

;(function($LITH) {

/**
 * Creates an ajax instance.
 */
LITHIUM.AjaxSupport = function(elementSelector, action, url, feedbackSelector, ajaxErrorEventName, ajaxOptionsParam, token, tokenId) {
	if (typeof elementSelector === "object") {
		var params = elementSelector;
		elementSelector = params.elementSelector;
		action = params.action;
		url = params.url;
		feedbackSelector = params.feedbackSelector;
		ajaxErrorEventName = params.ajaxErrorEventName;
		ajaxOptionsParam = params.ajaxOptionsParam;
		token = params.token;
		tokenId = params.tokenId;
	}

	var element = $LITH(elementSelector);
	var action = action;
	var feedbackElement;

	if (feedbackSelector != "false") {
		 feedbackElement = $LITH(feedbackSelector).first();
	} else {
		feedbackElement = $LITH(LITHIUM.AjaxSupport.defaultAjaxFeedbackHtml).insertBefore(element);
	}

	var activated = false;
	var defaultParameters = ajaxOptionsParam.parameters || {};
	var successCallbacks = [];
	var completeCallbacks = [];

	// setup options for AjaxSupport
	var options = {
		runOnce: false,
		bubbleEvent: false,
		event: "click",
		cacheRequest: false,
		runScripts: true,
		httpMethod: "POST",
		inlineConfirmation: false,
		useLoader: false,
		busKey: "",
		ignoreFormActions: [],
		unbindAfterRun: false, /* These are not currently exposed to builders */
		preemptivelyUnbind: false,
		statusCode : {}
	};

	$LITH.extend(options, ajaxOptionsParam);

	var isForm = (options.event == "submit");

	var isField = (options.event == "validate");
	
	function setFeedback (content) {
		feedbackElement.trigger("LITHIUM:updateAjaxFeedback");
		feedbackElement.html(content).show();
	}

	// apply internal options to ajax request options
	var ajaxRequestOptions = {
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		url: url,
		type: options.httpMethod,
		cache: options.cacheRequest,
		cacheRequest: options.cacheRequest,
		dataType: "json",
		processData: false,
		headers: {},
		beforeSend: function(transport, settings) {
			// trigger an event before the ajax request to allow end points to
			// adjust the data sent to the server
			$LITH(element).trigger("LITHIUM:ajaxBeforeSend:" + action, {
				transport: transport,
				settings: settings,
				action: action
			});

			var ajaxBeforeSendEventObj = $LITH.Event("LITHIUM:ajaxBeforeSend");
			var eventData = {
				transport: transport,
				settings: settings,
				action: action,
				ajaxEvent: options.event
			};
			
			/*
			 * Add the token to the data sent to the server
			 * if it exists on the element.
			 */
			if ($LITH.trim(token).length > 0) {
				settings.data.push({ name: "lia-action-token", value: token });
				
			}
			
			/*
			 * Add the action token id to the data sent to the server 
			 * if it exists on the element.
			 */
			if ($LITH.trim(tokenId).length > 0) {
				settings.data.push({ name: "lia-action-token-id", value: tokenId });
			}

			ajaxBeforeSendEventObj.hasOwnProperty("data")
				? $LITH.extend(ajaxBeforeSendEventObj.data, eventData)
				: ajaxBeforeSendEventObj.data = eventData;

			$LITH(element).trigger(ajaxBeforeSendEventObj);

			if (ajaxBeforeSendEventObj.isDefaultPrevented() || ajaxBeforeSendEventObj.isPropagationStopped()) {
				return false;
			}

			// finally serialize the data that will be sent to the server
			// we intentionally disable jQuery from doing this automatically
			// so that we can do it after all of the adjustments have been made
			settings.data.push({name: "renderedScripts", value: LITHIUM.RenderedScripts.toString()});
			settings.data = $LITH.param(settings.data, settings.traditional);


			// set headers to match what they were when Prototype.js was being used
			// this is important so that Tapestry's Request service recognizes the request as XHR
			transport.setRequestHeader("Lithium-Ajax-Request", true);

			if (options.useLoader == true) {
				element.addClass(LITHIUM.Css.BASE_AJAX_LOADER_CONTENT_OVERLAY);
				LITHIUM.AjaxSupport.Loader.show(action);
			}

			if (options.hasOwnProperty("blockUI")) {
				$LITH.blockUI({message : options.blockUI,
					css: {
						border : 'none',
						'font-size' : '12px',
						'font-family' : 'arial',
						'font-weight' : 'bold',
						padding: '20px',
						backgroundColor: '#EAE8E6',
						'-webkit-border-radius' : '5px',
						'-moz-border-radius' : '5px',
						'border-radius' : '5px',
						opacity : 1.0,
						color: '#212721'
				 },
				 baseZ: 1001
				});
			}
		},
		success: function(transport) {
			if (transport == null) {		// no idea how this happens, but it does, stray ajax responses?
				setFeedback(LITHIUM.AjaxSupport.defaultAjaxErrorHtml);
			} else {
				var response = transport.response;
				if (response.status !== undefined && response.status != null && response.status == "success") {
					// trigger an event once the ajax reponse is successful to allow end points
					// to register callbacks
					$LITH(element).trigger("LITHIUM:ajaxSuccess:" + action, {
						response: response,
						settings: options,
						action: action
					});

					$LITH(element).trigger("LITHIUM:ajaxSuccess", {
						response: response,
						settings: options,
						action: action
					});

					// call and callbacks registered when the ajax event was triggered
					$LITH.each(successCallbacks, function(i, successCallback) {
						successCallback(response, options, action);
					});

					if (options.trackableEvent) {
						$LITH(document).trigger("LITHIUM:ajaxTrackableEvent", {
							response: response,
							settings: options,
							action: action
						});
					}

					LITHIUM.AjaxSupport.processResults(response, options.runScripts, element, feedbackElement)

					//Apply hide() to elements with js hidden class
					$LITH("." + LITHIUM.Css.BASE_JS_HIDDEN).hide().removeClass(LITHIUM.Css.BASE_JS_HIDDEN);
				} else {
					setFeedback(LITHIUM.AjaxSupport.defaultAjaxErrorHtml);
				}
			}
		},
		error: function(request, textStatus, errorThrown) {
			if (!LITHIUM.AjaxSupport.UnloadHandler.isUnloading()) {
				setFeedback(LITHIUM.AjaxSupport.defaultAjaxErrorHtml);
				element.trigger(ajaxErrorEventName, {
					request: request,
					textStatus: textStatus,
					errorThrown: errorThrown,
					feedback: LITHIUM.AjaxSupport.defaultAjaxErrorHtml
				});
			}
		},
		statusCode : options.statusCode,
		complete: function() {
			if (!LITHIUM.AjaxSupport.UnloadHandler.isUnloading()) {
				var triggerElement;

				if (options.useLoader == true) {
					element.removeClass(LITHIUM.Css.BASE_AJAX_LOADER_CONTENT_OVERLAY);
					LITHIUM.AjaxSupport.Loader.hide();
				}

				if (options.hasOwnProperty("blockUI")) {
					$LITH.unblockUI();
				}

				/*
				 * LIA-28823 Changes in jQuery 1.7+ made it such that elements that have been disconnected
				 * from the DOM no longer bubble events to elements in the DOM. This caused
				 * issues for endpoints that had applied event listeners to the ajax complete event on elements in
				 * the DOM, if the event is triggered from the disconnected element then these event handlers
				 * were no longer being hit. To fix this we now determine if the element is in the DOM and fallback
				 * to the document before triggering the ajax complete event.
				 */
				triggerElement = $LITH.contains(document, element.get(0)) ? element : $LITH(document);

				// trigger an event once the ajax reponse is complete to allow end points
				// to register callbacks
				triggerElement.trigger("LITHIUM:ajaxComplete:" + action, {
					settings: options,
					action: action
				});

				triggerElement.trigger("LITHIUM:ajaxComplete", {
					settings: options,
					action: action
				});

				// call and callbacks registered when the ajax event was triggered
				$LITH.each(completeCallbacks, function(i, completeCallback) {
					completeCallback(options, action);
				});
			}
		}
	};

	/*
	 * Marker to designate element as ajax enabled
	 */
	element.data("lia-ajax", true);
	
	// support for non-standard actions that need to use the internal AjaxSupport
	// response handling (e.g. flash reponses)
	element.bind("LITHIUM:ajaxProcessResults:" + action, function(event) {
		LITHIUM.AjaxSupport.processResults(event.memo.response, options.runScripts, element, feedbackElement)
	});

	var getSumbitActionFromInput = function(input) {
		var formSubmitInputName = input.attr("name");
		return element.find("input[name='" + formSubmitInputName + "X" + "']").val();
	}

	if (isForm) {
		// capture the input that submits the form, used server side as the submit context action
		element.find("input[type='submit']").bind("click", function(event){
			element.data("submitContext", $LITH(this));
		});
		// jQuery does not run the submit event when a click is triggered via
		// JavaScript.  We compensate by listening for click events on
		// inputs and triggering the submit event.
		element.bind("click", function(event) {
			var clickedElement = $LITH(event.target);
			/*
			 * LIA-26760 We are only interested in submitting the form when the submit button is not disabled
			 */
			if (clickedElement.is("input[type='submit']:not(:disabled)")) {
				var actionName = getSumbitActionFromInput(clickedElement);
				if (!((typeof actionName != "undefined") &&
					($LITH.inArray(actionName, options.ignoreFormActions) > -1))) {
					event.stop();
					element.submit();
				}
			}
		});
	}

	var doAjax = function() {
		var ajax = function() {
			$LITH(document).trigger("LITHIUM:hideAjaxFeedback");
			activated = true;
			$LITH.ajax(ajaxRequestOptions);
		}

		if (LITHIUM.useCheckOnline === true) {
			$LITH(document).trigger("LITHIUM:checkOnline", {
				online: ajax
			});
		} else {
			ajax();
		}
	}

	if (options.inlineConfirmation == true) {
		var inlineConfirmation = LITHIUM.AjaxSupport.createInlineConfirmation(function() {
			// inline confirmation takes a callback which is the action to occur
			// upon confirmation - in this case the ajax call
			doAjax();
		});
		inlineConfirmation.appendTo(element.parent());
	}

	if (options.preemptivelyUnbind) {
		element.unbind(options.event);
	}

	element.bind(options.event, function(event) {
		// the data that will be sent to the server side.  The array expects an
		// object that contains fields for a 'name' and 'value'
		var data = [];

		// clear success callbacks
		successCallbacks = [];

		completeCallbacks = [];

		if (isForm) {
			// get the submit target from the form data, fallback onto original target
			// if it is an submit input, otherwise null
			var formSubmitInput = element.data("submitContext") ||
				($LITH(event.target).is("input[type='submit']")
					? $LITH(event.target)
					: null);

			if (formSubmitInput != null) {
				// locate the corresponding hidden input to determine if this
				// is an allowed ajax form submit action.  Registrants of ignore actions
				// are setup in the Ajaxify mixin and AjaxSupport.java
				var formSubmitInputName = formSubmitInput.attr("name");
				var formSubmitActionName = getSumbitActionFromInput(formSubmitInput);

				//ENDER-92 ie doesn't support indexOf!
				if ($LITH.inArray(formSubmitActionName, options.ignoreFormActions) > -1) {
					// continue traidtional submit request if this is an ignored ajax submit action
					return true;
				}

				// create an additional parameter sent to the server that represents
				// the action used to submit the form.  This logic maps to the what is used
				// by the SubmitContext component.
				var formSubmitActionParameter = {};
				formSubmitActionParameter[formSubmitInputName] = true;
				LITHIUM.AjaxSupport.updateData(data, formSubmitActionParameter);

				// clear the submit action from the form
				$LITH(element).data("submitContext", null);
			}

			data = data.concat(element.serializeArray());
		}

		// parameter overrides can be set on the event.memo object via
		// a "parameter" field on the memo
		var parameterOverrides = {};

		if (event.memo) {
			// clear the parameters once captured
			if (event.memo.parameters) {
				parameterOverrides = event.memo.parameters;
				delete event.memo.parameters;
			}

			// capture ajax success callback from memo
			if ($LITH.isFunction(event.memo.success)) {
				successCallbacks.push(event.memo.success);
				delete event.memo.success;
			}

			// capture ajax complete callback from memo
			if ($LITH.isFunction(event.memo.complete)) {
				completeCallbacks.push(event.memo.complete);
				delete event.memo.complete;
			}

			// we clear the "parameter" and "success" fields of the memo
			// so that we can apply any additional informal parameters to
			// the data object sent to the server side
			LITHIUM.AjaxSupport.updateData(data, event.memo);
		}

		// add event listeners to be processed server side
		var componentEvents = LITHIUM.AjaxSupport.ComponentEvents.get(action, element);

		// these two parameters -- 'eventListeners' & 'parameterOverrides' --  must always be sent in the ajax
		// request to the server; empty values are allowed. Furthermore, add the trigger event as well as the
		// id of the 'target' of the event, if available:
		var dataUpdate = {
			eventListeners: $LITH.toJSON(componentEvents),
			parameterOverrides: $LITH.toJSON(parameterOverrides),
			triggerEvent: event.type
		};
		var $target = $LITH(event.target);
		if ($target.attr("id") !== "") {
			dataUpdate.eventTargetId = $target.attr("id");
		}
		LITHIUM.AjaxSupport.updateData(data, dataUpdate);

		// add any default parameters that may have been registered
		// when the ajax was initially applied
		LITHIUM.AjaxSupport.updateData(data, defaultParameters);

		if(isField && options.data) {
			options.data.fieldValue = element.val();
			options.data.fieldName = element.attr("name");			
			LITHIUM.AjaxSupport.updateData(data, options.data);
		}
		// set the data onto the object to be sent server side
		ajaxRequestOptions.data = data;

		if(options.bubbleEvent == false) {
			event.stop();
		}

		// iOS caches 'POST' requests for some reason, so make sure they are explicitly not cacheable
		if (ajaxRequestOptions.type === "POST") {
			$LITH.extend(ajaxRequestOptions.headers, { "Cache-Control": "no-cache" });
		}

		if (options.runOnce == false || (options.runOnce == true && activated == false)) {
			if (options.inlineConfirmation == true) {
					/*
					 * Hide other inline confirmations
					 */
				$LITH(document.body).trigger("LITHIUM:closeInlineConfirmation");
				inlineConfirmation.show();
			} else {
				doAjax();
			}
		}
		parameterOverrides = null;
		componentEvents = null;
		formSubmitInputName = null;
		formSubmitActionName = null;
		formSubmitActionParameter = null;

		if (options.unbindAfterRun) {
			element.unbind(options.event, arguments.callee);
		}
	});
}

/**
 * Will update the "data" with the "obj" that is inteded
 * to be sent using jQuery's ajax call.  The "data" should
 * be the actual object that will ultimately be sent to the
 * server.  The "obj" should be an object literal which will
 * get epanded into an array of objects that have the format:
 * { name: fieldName, value: fieldValue }
 *
 * @param data an array of data that will be sent in the ajax request
 * @param obj the object literal that will be added to the data
 */
LITHIUM.AjaxSupport.updateData = function(data, obj) {
	if (obj != null && typeof obj !== "string") {
		var objArray = $LITH.isArray(obj) ? obj : $LITH.makeArray(obj);
		$LITH.each(objArray, function(i, elem) {
			for (param in elem) {
				data.push({
					name: param,
					value: elem[param]
				});
			}
		});
	}
}

/**
 * Creates an ajax instance from a link
 */
LITHIUM.AjaxSupport.fromLink = function(elementSelector, action, feedback, ajaxErrorEventName, ajaxOptionsParam, token, tokenId) {
	LITHIUM.AjaxSupport(elementSelector, action, $LITH(elementSelector).attr("href"), feedback, ajaxErrorEventName, ajaxOptionsParam, token, tokenId);
};

/**
 * Clear form errors
 */
LITHIUM.AjaxSupport.clearFormErrors = function(form) {
	form.find("." + LITHIUM.Css.BASE_FORM_FIELD_ERROR).removeClass(LITHIUM.Css.BASE_FORM_FIELD_ERROR);
	form.find("p." + LITHIUM.Css.BASE_FORM_ERROR_TEXT).remove();
}

/**
 * Creates an ajax instance from a form
 */
LITHIUM.AjaxSupport.fromForm = function(formSelector, formId, feedbackSelector, ajaxErrorEventName, ajaxOptionsParam, clearFormOnSuccess) {
    LITHIUM.AjaxSupport(formSelector, formId, $LITH(formSelector).attr("action"), feedbackSelector, ajaxErrorEventName, ajaxOptionsParam);

	$LITH(formSelector).bind("LITHIUM:ajaxSuccess:" + formId, function(event, response) {
		LITHIUM.AjaxSupport.processFormResultParameters($LITH(this), event, response, true, clearFormOnSuccess, true);
	});
};


/**
 * Creates an ajax instance from a form field client validation
 */
LITHIUM.AjaxSupport.fromFormField = function(params){
	fieldSelector = params.elementSelector;
	action = "validate";
	url = params.url;
	feedbackSelector = params.feedbackSelector;
	ajaxErrorEventName = params.ajaxErrorEventName;
	ajaxOptionsParam = params.ajaxOptionsParam;

	var element = $LITH(fieldSelector);

	LITHIUM.AjaxSupport(fieldSelector, action, url, feedbackSelector, ajaxErrorEventName, ajaxOptionsParam, params.token, params.tokenId);
	
	element.change(function() {		
		element.data("validatedValue", element.val());
		element.addClass(LITHIUM.Css.BASE_FORM_FIELD_VALIDATING);
		element.removeClass(LITHIUM.Css.BASE_FORM_FIELD_ERROR);
		element.removeClass(LITHIUM.Css.BASE_FORM_FIELD_SUCCESS);
		element.closest(".lia-form-row").find("." + LITHIUM.Css.BASE_FORM_FIELD_ERROR).removeClass(LITHIUM.Css.BASE_FORM_FIELD_ERROR);
		$LITH("." + LITHIUM.Css.BASE_FORM_ERROR_TEXT, element.parent()).remove();
		element.trigger("validate");		
	});

	element.bind("LITHIUM:ajaxSuccess:validate", function(event, response) {
		LITHIUM.AjaxSupport.processFormResultParameters($LITH(this).closest("form"), event, response, false, false, false);
	});
}


LITHIUM.AjaxSupport.processFormResultParameters = function(form, event, response, triggerFromEvents, clearFormOnSuccess, focusErrorField) {
	if(triggerFromEvents) {
		form.trigger("LITHIUM:enableForm");
	}

	// clear any errors, unless keepFormErrors == true
	var clearFormError = true;
	$LITH.each(event.memo.response.parameters, function(i, responseParameter) {
		if(responseParameter.hasOwnProperty("keepFormErrors") && responseParameter.keepFormErrors === true) {
			clearFormError = false;
		}
	});
	if(clearFormError === true) {
		LITHIUM.AjaxSupport.clearFormErrors(form);
	}

	var hasFormErrors = false;
	var fieldErrors = new Array();
	var fieldClearErrors = new Array();
	var errorFeedback = form.find("." + LITHIUM.Css.BASE_FEEDBACK_INLINE_ALERT);

	if (event.memo.response.parameters) {
		// go through the response and note if the form has errors and the field errors if any
		$LITH.each(event.memo.response.parameters, function(i, responseParameter) {
			if (responseParameter.formError == true) {
  				hasFormErrors = true;
  			} else if (responseParameter.fieldErrors) {
  				fieldErrors = fieldErrors.concat(responseParameter.fieldErrors);
  			} else if (responseParameter.fieldClearErrors) {
  				fieldClearErrors = fieldErrors.concat(responseParameter.fieldClearErrors);
  			}
		});
	}

	// if there were form errors, go through the field errors and add the error messages to each field
	if (hasFormErrors == true) {

		//notify listeners that form has errors.
		if(triggerFromEvents) {
			form.trigger("LITHIUM:formHasErrors", {
				"id" : form.attr("id"),
				fieldErrors: fieldErrors
			});
		}

		var firstFieldWithError = null;
		$LITH.each(fieldErrors, function(i, fieldError) {
			var field = form.find("[name='" + fieldError.field + "']");
			var validationValue = field.data("validatedValue");
			
			if (validationValue === undefined || validationValue === fieldError.fieldValue) {
				// update the field value if set
				if (fieldError.fieldValue !== undefined) {
					field.value = fieldError.fieldValue;
					firstFieldWithError = (firstFieldWithError == null) ? field : firstFieldWithError;
				}
				field.addClass(LITHIUM.Css.BASE_FORM_FIELD_ERROR);
				field.removeClass(LITHIUM.Css.BASE_FORM_FIELD_VALIDATING);
				field.removeClass(LITHIUM.Css.BASE_FORM_FIELD_SUCCESS);
				field.closest(".lia-form-row").find("." + LITHIUM.Css.BASE_FORM_FIELD_ERROR).removeClass(LITHIUM.Css.BASE_FORM_FIELD_ERROR);
				$LITH("." + LITHIUM.Css.BASE_FORM_ERROR_TEXT, field.parent()).remove();
				field.after($LITH("<p/>").addClass(LITHIUM.Css.BASE_FORM_ERROR_TEXT).append(fieldError.messageHtml));
				$LITH(".lia-form-validation-help-text", field.parent()).hide();
			}
		});

		/*
		 * When the form is in an error state we focus on the first field in error.
		 * In this case we want the field in error to act similary to a traditional
		 * form submission in error where the field is focused but has the error
		 * text instead of the help text.
		 */
		if (firstFieldWithError != null && focusErrorField) {
			/*
			 * Reset the change state of the input so we know to replace the
			 * error text if unchanged.
			 */
			firstFieldWithError
				.data("LITHIUM.Entry.changed", false)
				.data("LITHIUM.Entry.hasError", true);

				firstFieldWithError.blur();
			if (firstFieldWithError.hasClass(LITHIUM.Css.BASE_FORM_FIELD_ERROR_NO_FOCUS) == false) {
				firstFieldWithError.focus();
			}
		}
		errorFeedback.show();
	} else {
		if(triggerFromEvents) {
			form.trigger("LITHIUM:formNoErrors", event.memo);
		}

		if (clearFormOnSuccess) {
			form.get(0).reset();
		}
		if(clearFormError === true) {
			errorFeedback.hide();
		}
	}

	$LITH.each(fieldClearErrors, function(i, fieldClearError) {
		var field = form.find("[name='" + fieldClearError.field + "']");

		if(field.data("validatedValue") === fieldClearError.fieldValue) {
			// update the field value if set
			field.addClass(LITHIUM.Css.BASE_FORM_FIELD_SUCCESS);
			field.removeClass(LITHIUM.Css.BASE_FORM_FIELD_ERROR);
			field.removeClass(LITHIUM.Css.BASE_FORM_FIELD_VALIDATING);
			field.closest(".lia-form-row").find("." + LITHIUM.Css.BASE_FORM_FIELD_ERROR).removeClass(LITHIUM.Css.BASE_FORM_FIELD_ERROR);
			$LITH("." + LITHIUM.Css.BASE_FORM_ERROR_TEXT, field.parent()).remove();
			if($LITH("*:focus").is(field)) {
				$LITH(".lia-form-validation-help-text", field.parent()).show();
			}
			field.data("LITHIUM.Entry.changed", false).data("LITHIUM.Entry.hasError", false);
		}
	});

};

/**
 * Stores the ajax event listeners created when components
 * are initially rendered or rerendered.  Ajax event listeners
 * are applied to the DOM element they are associated.  When
 * an ajax action occurs, the event listeners that match
 * the action are sent to the server for processing.
 */
LITHIUM.AjaxSupport.ComponentEvents = function() {
	// list of element ids that have event listeners associated to them
	// we leverage the jQuery data cache element id.  If a component is repalced
	// as part of a rerender, the id is removed from the cache.
	var elementIdCache = [];

	return {
		/**
		 * Stores an eventListener on the assoicated DOM element
		 */
		set:function(eventListener) {
			var element = $LITH(eventListener.selector);
			element.data("eventListener", eventListener);
			element.each(function(index, element) {
				// use the jQUery expando (timestamp) to locate the elements internal
				// cache id.  Store this id for later reference.
				var id = element[$LITH.expando];
				elementIdCache.push(id);
			});

		},
		/**
		 * Retrieves and array of eventListeners for the triggered event
		 */
		get: function(triggeredEvent, element) {
			var validElementIdCache = [];
			var transport = [];

			// check all existing ids in the cache for eventListener data
			$LITH.each(elementIdCache, function(index, elementId) {
				var elementData = $LITH.cache[elementId];

				// if the item is in the jQuery cache then it still exists
				// in the DOM and should have an associated eventListener
				if (typeof elementData !== "undefined") {
					// only record which ids are still valid (in the DOM)
					validElementIdCache.push(elementId);
					if (elementData.data) {
						var eventListener = elementData.data.eventListener;
						if (eventListener) {
							// check if the associated eventListener is for the triggered action
							// and add it to the transport
							$LITH.each(eventListener.eventActions, function(index, eventAction) {
								if (eventAction.event == triggeredEvent) {
									if (eventListener.hasOwnProperty("initiatorBinding") && eventListener.initiatorBinding === true) {
										var eventListenerElement = $LITH(eventListener.selector);
										if (eventListenerElement.find(element).size() > 0 || eventListenerElement.is(element)) {
											transport.push(eventListener);
										}

									} else {
										transport.push(eventListener);
									}
								}
							});
						}
					}
				}
			});

			// update the existing cache with the list of ids we know to be valid
			elementIdCache = validElementIdCache;
			return transport;
		}
	}
}();

/**
 * Creates the inline confirmation HTML.
 *
 * @param successCallback function that will be called upon confirmation
 *
 * TODO: This should be moved to a component and rendered on the server
 */
LITHIUM.AjaxSupport.createInlineConfirmation = function(successCallback) {
	var approveLink = $LITH("<a>", {
		href: "#",
		text: LITHIUM.Text.get("confirm-approve"),
		"class": "lia-ajax-inline-approve"
	});

	var denyLink = $LITH("<a>", {
		href: "#",
		text: LITHIUM.Text.get("confirm-deny"),
		"class": "lia-ajax-inline-deny"
	});

	var inlineConfirmation = $LITH("<div>", {
		html: LITHIUM.Text.get("confirm", approveLink.outerHTML(), denyLink.outerHTML()),
		"class": "lia-inline-confirm"
	}).hide();

	inlineConfirmation.find(".lia-ajax-inline-approve").click(function(event) {
		inlineConfirmation.hide();
		activated = true;
		successCallback();
		return false;
	});

	inlineConfirmation.find(".lia-ajax-inline-deny").click(function(event) {
		inlineConfirmation.hide();
		return false
	});

	$LITH(document.body).bind("LITHIUM:closeInlineConfirmation", function() {
		inlineConfirmation.hide();
	});

	return inlineConfirmation;
};

/**
 * Creates the Loader HTML.
 *
 * TODO: This should be moved to a component and rendered on the server
 */
LITHIUM.AjaxSupport.Loader = function() {
	var loaderFeedbackWrapper = $LITH("<div>").addClass(LITHIUM.Css.BASE_AJAX_LOADER_FEEDBACK).hide();
	var loaderFeedbackContent = $LITH("<div>");

	loaderFeedbackContent.appendTo(loaderFeedbackWrapper);
	loaderFeedbackWrapper.appendTo($LITH(".lia-content"));

	$LITH(loaderFeedbackWrapper).delayToggle({
		openEvent: "LITHIUM:showAjaxLoader",
		closeEvent: "LITHIUM:hideAjaxLoader",
		openFunction: function() {
			loaderFeedbackWrapper.show();
		},
		openDelayMs: 100,
		closeDelayMs: 500,
		decayClose:true
	});

	return {
		show: function(actionId) {
			var content = LITHIUM.Text.get("ajax." + actionId + ".loader.feedback.title")
			loaderFeedbackContent.html(content);
			$LITH(loaderFeedbackWrapper).trigger("LITHIUM:showAjaxLoader");
		},
		hide: function() {
			$LITH(loaderFeedbackWrapper).trigger("LITHIUM:hideAjaxLoader");
		}
	};
}();

/**
 * Adapted from jQuery source - this object facilitates adding script elements "on demand"; that is, adding
 * a <script> element to the <head> of the document for the supplied url. The only reason for using this adapted
 * version rather than jQuery#load is that the latter removes the <script> tag from the body, thus preventing debugging
 */
LITHIUM.AjaxSupport.OnDemandJsLoader = (function() {
	return {
		load: function(params, callback) {
			var head = document.getElementsByTagName("head")[0] || document.documentElement;
			var script = document.createElement("script");
			script.src = params.url;
			if ( params.scriptCharset ) {
				script.charset = params.scriptCharset;
			}

			var done = false;

			// Attach handlers for all browsers
			script.onload = script.onreadystatechange = function() {
				if ( !done && (!this.readyState ||
						this.readyState === "loaded" || this.readyState === "complete") ) {
					done = true;
					// Handle memory leak in IE
					script.onload = script.onreadystatechange = null;
					//initiate callback:
					callback();

				}
			};

			// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
			head.insertBefore( script, head.firstChild );
		}
	};
})();

/**
 * This object is meant to be used by code which receives an encapsulated Ajax response via our
 * 'AjaxSupport' framework, and thus will pass to its methods an object of a "normalized" structure
 */
LITHIUM.AjaxSupport.ScriptsProcessor = (function() {
	var jobTable = {};
	var queue = [];


	var asyncQueueMgr = (function() {

		var dependencyWrangler = function(jobId, component, feedbackElement) {
				var dependencies = component.dependencies;
				var pageScopejQuery = jQuery;

				//manage the asynchronous loading of <scripts> into the page:
				var loadables = dependencies.loadables || [];
				var loadableFileNames = [];
				var normalizedLoadables = [];

				$LITH.each(loadables, function(i, v) {
					var file = v.slice(v.lastIndexOf("/") + 1);
					if ($LITH.inArray(file, LITHIUM.RenderedScripts) === -1) {
						normalizedLoadables.push(v);
						loadableFileNames.push(file);
					}

				});

				loadables = normalizedLoadables;


				var resumeAfterLoad = function resumeafterload() {
					if (dependencies.hasOwnProperty("renderedScripts")) {
						$LITH.merge(LITHIUM.RenderedScripts, loadableFileNames);

					}

					if (dependencies.hasOwnProperty("instantiations")) {
						try {
							eval(dependencies.instantiations);
						} catch(e) {
							if (feedbackElement) {
								feedbackElement.html(LITHIUM.AjaxSupport.defaultAjaxErrorHtml).show();
							}
						}
					}

					mgr.jobComplete(jobId);
				};

				var loaderProxy = function loaderproxy() {
					var toLoad = loadables.shift();
					if (toLoad !== undefined) {
						LITHIUM.AjaxSupport.OnDemandJsLoader.load({url: toLoad}, function() {
							loaderProxy();
						});
					} else {
						//restore jQuery (either is necessary or is harmless)
						jQuery = pageScopejQuery;
  						resumeAfterLoad();
					}

				};

				/*
				 * If the current instance of jQuery is different than Lithium's, then
				 * temporarily set it back to Lithium's. This is needed to ensure that
				 * any jQuery "plugin" code attaches to Lithium's jQuery's prototype
				 */
				if (pageScopejQuery !== LITHIUM.jQuery) {
					jQuery = LITHIUM.jQuery;
				}
				//initiate all operations:
				loaderProxy();
		};

		var mgr = {
			queueJob : function(component, feedbackElement) {
				var jobId =  new Date().getTime().toString() + Math.floor(Math.random()*10000000+1);

				jobTable[jobId] = {
					component: component,
					feedbackElement: feedbackElement
				};
				queue.unshift(jobId);
				/*
				 * length of 1 indicates there are no active jobs (the only one is what we've just added)
				 * Hence, manually kickoff
				 */
				if (queue.length == 1) {
					dependencyWrangler(jobId, component, feedbackElement);
				}
			},
			jobComplete: function(id) {
				queue.pop();
				delete jobTable[id];

				if (queue.length > 0) {
					var nextJobId = queue[queue.length - 1];
					var nextJobData = jobTable[nextJobId];
					dependencyWrangler(nextJobId, nextJobData.component, nextJobData.feedbackElement);
				}
			}
		};

		return mgr;
	})();



	return {
		handleScriptEvaluation : function(component, feedbackElement) {
			if (component.hasOwnProperty("dependencies")) {

				asyncQueueMgr.queueJob(component, feedbackElement);

			} else if (component.hasOwnProperty("scripts")) {
				try {
					eval(component.scripts);
				} catch(e) {
					if (feedbackElement) {
						feedbackElement.html(LITHIUM.AjaxSupport.defaultAjaxErrorHtml).show();
					}
				}
			}
		}
	};
})();

LITHIUM.AjaxSupport.UnloadHandler = function() {
	var pendingXhrs = {}, // track active XHRs in order to abort them on page unload
		nextPendingXhr = 0,
		isUnloading = false;
	$LITH(document.body).bind("ajaxSend", function(event, xhr, settings) {
		pendingXhrs[nextPendingXhr] = xhr;
		settings.xhrCacheIndex = nextPendingXhr;
		nextPendingXhr++;
	}).bind("ajaxComplete", function(event, xhr, settings) {
		if (settings) {
			delete pendingXhrs[settings.xhrCacheIndex];
		}
	});

	$LITH(window).bind("beforeunload", function(event) {
		$LITH.each(pendingXhrs, function(i, xhr) {
			isUnloading = true;
			xhr.abort();
		});
	});

	return {
		isUnloading: function() {
			return isUnloading;
		}
	};
}();

LITHIUM.AjaxSupport.processResults = function(response, runScripts, element, feedbackElement) {
	// we record if elements are replaced during a repsonse, so that subsequent
	// component events can use the updated element ID to take action on
	var replacedElementsMap = {};

	// process results from the server
	$LITH.each(response.components, function(i, component) {
		// special case handling allows access to the original element and the original feedback element
		var providedSelector = component.selector, 
			componentSelector;
		
		if (providedSelector === "ORIGINAL_ELEMENT") {
			componentSelector = element;
		} else if (providedSelector.indexOf("ORIGINAL_ELEMENT") === 0) {
			// This is to support finding selectors under the original element
			componentSelector = element.find(providedSelector.substring(providedSelector.indexOf(" ") + 1));
		} else if (providedSelector === "ORIGINAL_FEEDBACK_ELEMENT") {
			componentSelector = feedbackElement;
		} else {
			componentSelector = providedSelector;
		}

		// if the element has been replaced during this success response, then
		// we use the replaced elements selector
		if (replacedElementsMap.hasOwnProperty(componentSelector)) {
			componentSelector = replacedElementsMap[componentSelector];
		}

		var arrArgs = [];
		if (component.content) {
			arrArgs = $LITH.isArray(component.content) ? component.content : [component.content];
		}
		$LITH(componentSelector).each(function(i, componentElement) {
			var internalElement = $LITH(componentElement);
			internalElement[component.action].apply(internalElement, arrArgs);
			// capture the mapping between the replaced element and the new element
			// so we can use the new element for subsequent actions
			if (component.action == "replaceWith") {
				replacedElementsMap[componentSelector] = "#" + $LITH(arrArgs[0]).attr("id");
			}
		});

		// handle dynamic script content:
		if (runScripts) {
			LITHIUM.AjaxSupport.ScriptsProcessor.handleScriptEvaluation(component, feedbackElement);
		}

	});
	replacedElementsMap = null;
};


})(LITHIUM.jQuery);

