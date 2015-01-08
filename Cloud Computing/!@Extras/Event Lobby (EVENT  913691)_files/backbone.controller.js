// Backbone.Controller (Borrowed from Marionette)
// ---------------------
//
// A multi-purpose object to use as a mediator for workflow
// and coordination of other objects, views, and more.
Backbone.Controller = function(options){
	'use strict';
	//this.triggerMethod = Marionette.triggerMethod;
	this.options = options || {};

	if (_.isFunction(this.initialize)){
		this.initialize(this.options);
	}
};

Backbone.Controller.extend = Backbone.Model.extend;

// Controller Methods
// --------------

// Ensure it can trigger events with Backbone.Events
_.extend(Backbone.Controller.prototype, Backbone.Events, {
	close: function(){
		'use strict';
		
		this.stopListening();
		var args = Array.prototype.slice.call(arguments);
		//this.triggerMethod.apply(this, ["close"].concat(args));
		this.unbind();
	}
});
