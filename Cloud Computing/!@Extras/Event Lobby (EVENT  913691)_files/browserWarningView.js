/**
 * @author Juan Bernardez
 */

/*global $, _ */

RegPage.BrowserWarningView = Backbone.View.extend({
	
	initialize: function(options) {
		'use strict';
		
		//this.template = RegPage.Templates.filter('#browser-warning-tpl');
		//Underscore templating for static properties or data that is not going to change
		this.template = options.template 
							? _.template(options.template.html()) 
							: _.template(RegPage.Templates.filter('#browser-warning-tpl').html());
		//this.modelBinder = new Backbone.ModelBinder();
		this.render();
	},
	
	bindings: {
		bannerURL: {selector: 'img', elAttribute: 'src'}
	},
	
	render: function(){
		'use strict';
		this.$el.html(this.template({prop:RegPage.Properties}));
		//this.modelBinder.bind(this.model, this.el, this.bindings);
	},
	
	events: {
		'click .js-close-btn': 'close',
		'touchend .js-close-btn': 'close'
	},
	
	close: function() {
		'use strict';
		//this.modelBinder.unbind();
		this.remove();
	}
	
});
