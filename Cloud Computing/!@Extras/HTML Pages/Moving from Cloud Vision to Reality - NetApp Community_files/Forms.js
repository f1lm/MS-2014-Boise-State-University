/**
 * Lithium Technologies
 * @author: Adam Ayres adam.ayres@lithium.com, Chris Fricke chris.fricke@lithium.com
 * @date: 03-21-09
 */

;(function($LITH) {
	LITHIUM.Form = (function() {
		var fieldForFocusFound = false;
		var firstValidInput = false;

		/*
		 * Determines if the current field is visible using multiple different checks.
		 */
		var fieldVisible = function(field) {
			//If the visibility of this field has already been calculated, use that value.
			var visible = $LITH(field).data("field-visible") || false;
			if (visible) {
				return true;
			} else {
				//We need to check both that the form input is not hidden (or any of its ancestors) and that
 	 			//the element does not contain the JS Hidden CSS class that will eventually hide this element.
				var fieldNotHidden = $LITH(field).closest(":hidden,." + LITHIUM.Css.BASE_JS_HIDDEN).length === 0;
				if (fieldNotHidden && !$LITH(field).is("input:hidden")) {
					var scrollableParentContainers = $LITH(field).parents(":overflow-auto,:overflow-scroll");
					/*
					 * This check will check first if there are any parent containers
					 * that are scrollable (if not, just move on) and if so, then it will
					 * use the extension inContainerViewport and test if that element is in view
					 */
					if (scrollableParentContainers.length > 0) {
						if ($LITH(scrollableParentContainers).is(":in-viewport")) {
							visible = $LITH.inContainerViewport(scrollableParentContainers, field);
						}
					} else {
						visible = $LITH(field).is(":in-viewport");
					}
				}

				$LITH(field).data("field-visible", visible);

				return visible;
			}
		};

		/*
		 * Responsible for enumerating the list of #id's that may require
		 * focus on the form.  These #id's are set upon submission when
		 * there is a problem with one of the fields.
		 * @param inputType - Will be one of 'error', 'required', 'optional'.
		 * @param inputSet - List of #id's that are of inputType.
		 */
		var focusFieldByRules = function(inputType, inputSet) {
			$LITH(inputSet).each(function(index, elementId) {
				$LITH("#" + elementId).filter(":input").each(function(index, formInput) {
					//We need to check both that the form input is not hidden (or any of its ancestors) and that
 	 				//the element does not contain the JS Hidden CSS class that will eventually hide this element.
					var formInputNotHidden = $LITH(formInput).closest(":hidden,." + LITHIUM.Css.BASE_JS_HIDDEN).length === 0;
					if (formInputNotHidden && !$LITH(formInput).is("input:hidden") && !$LITH(formInput).attr("disabled")) {
						if (firstValidInput === false) {
							firstValidInput = { input: formInput, type: inputType };
						}
						if (fieldForFocusFound === false && ((inputType === "error") || $LITH(formInput).val() === "")) {
							focusField(formInput, inputType, false);
						}
					}
				});
			});
		};

		/*
		 * Responsible for focusing the passed in field.  Unlike before,
		 * 'field' can be null, jQuery will just swallow it and this
		 * won't do anything.  If the type is not error, the field
		 * will only be focused if it's within the viewport and if it has
		 * any parent containers that could be a scrollable container, it
		 * will make sure it's within the scrollable containers view.  If
		 * none of it's parents are scrollable, then it just ignores that
		 * check and focuses the field.
		 */
		var focusField = function(field, type, onlyUseFocus) {
			fieldForFocusFound = true;
			if ((type === "error") || fieldVisible(field)) {
				LITHIUM.Form.FIELD_FOCUSED_BY_RULE = true;
				$LITH(field).focus();
				if (!onlyUseFocus) {
					$LITH(field).select();
				}
			}
		};

		/*
		 * Begin public interface
		 */
		return {
			/*
			 * Responsible for focusing on the first field that is returned by
			 * the server and in the order of error, required, and optional.
			 * @params inputs - hash of inputs in the following format:
			 * {"error":["login"],"optional":["rememberPassword"],"required":["password"]}
			 */
			focusFieldByRules: function(inputs) {
				var groups = {
					error: [],
					required: [],
					optional: []
				};
				$LITH.each(inputs, function(i, rule) {
					if (groups.hasOwnProperty(rule.priority)) {
						groups[rule.priority].push(rule.id);
					}
				});
				$LITH(["error", "required", "optional"]).each(function(index, inputType) {
					if (!fieldForFocusFound) {
						focusFieldByRules(inputType, groups[inputType]);
					}
				});
				if (fieldForFocusFound === false && firstValidInput !== false) {
					focusField(firstValidInput.input, firstValidInput.type , true);
				}
			},

			/*
			 * Responsible for focusing a particular field based on a type.  This
			 * simply delegates to the private method focusField.
			 * @param field - input field to focus.
		 	 * @param type - type of error the input field will need to represent.
		 	 * @param onlyUseFocus - boolean to specify whether or not to only focus
		 	 * the field vs highlighting the text as well.
	 		 */
			focusField: function(field, type, onlyUseFocus) {
				focusField(field, type, onlyUseFocus);
			}
		};
	})();
})(LITHIUM.jQuery);

//Global variable that can be used to determine if the field focus was set by the Form rules
LITHIUM.Form.FIELD_FOCUSED_BY_RULE = false;



