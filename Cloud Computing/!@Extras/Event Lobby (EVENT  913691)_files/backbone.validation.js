/*global $, _ */

//Change a bit backbone validation logic, to fire "valid" event on valid models after validation
Backbone.Model.prototype._validate = function(attrs, options) {
	if (!options.validate || !this.validate) return true;
	attrs = _.extend({}, this.attributes, attrs);
	var error = this.validationError = this.validate(attrs, options) || null;
	if (!error) {
		this.trigger('valid', this);
		return true;
	} 
	this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
	return false;
};

//Enable simple validation in Backbone Collections
Backbone.Collection.prototype.isValid = function(options, viewModel) {
	return this._validate({}, _.extend(options || {}, { validate: true }), viewModel || this.viewModel);
};

Backbone.Collection.prototype._validate = function(attrs, options, viewModel) {
	if (!options.validate || !this.validate) return true;
	var error = this.validationError = this.validate(this.models, options, viewModel) || null;
	if (!error) {
		this.trigger('valid', this);
		return true;
	} 
	this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
	return false;
};

/*
 * Calls Backbone validation plus deferValidations, and return a promise, that
 * will resolve with a validation error, if any. Is a View method, useful if
 * you need to validate the view model, but you have only notion about the view
 * (you may not know if the view has a model or a collection attached, or both)
 */
Backbone.View.prototype.doValidation = function(options) {
	'use strict';
	var defer = $.Deferred(),
		promises = [];
	if (this.model) {
		promises.push(this._doModelValidation(options));
	}
	if (this.collection) {
		promises.push(this._doCollectionValidation(options));
	}

	$.when.apply($, promises).done(function(modelError, collectionError) {
		defer.resolve(modelError || collectionError);
	});

	return defer.promise();
};

/*
 * Validate a model, including deferred validation (useful for server/API-based validations)
 */
Backbone.View.prototype._doModelValidation = function(options) {
	'use strict';
	var defer = $.Deferred();
	//If not valid or not deferValidate method, return validationError (if model is valid, error
	//will be undefined)
	if(!this.model.isValid(options) || !this.model.deferValidate) {
		defer.resolve(this.model.validationError);
	}else{
		$.when(this.model.deferValidate(this.model.attributes, options)).done(
			function(validationError){
				defer.resolve(validationError);
			}
		);
	}
	return defer.promise();
};

/*
 * Validate a collection, including deferred validation (useful for server/API-based validations)
 * We pass the model for validations in case we have a view with both a model and a collection.
 * Having the model in the collection validation can be handy
 */
Backbone.View.prototype._doCollectionValidation = function(options) {
	'use strict';
	var defer = $.Deferred();
	//If not valid or not deferValidate method, return validationError (if collection is valid, error
	//will be undefined)
	if(!this.collection.isValid(options, this.model) || !this.collection.deferValidate) {
		defer.resolve(this.collection.validationError);
	}else{
		$.when(this.collection.deferValidate(this.collection.models, options, this.model)).done(
			function(validationError){
				defer.resolve(validationError);
			}
		);
	}
	return defer.promise();
};
