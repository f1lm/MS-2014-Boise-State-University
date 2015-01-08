/**
 * @author Juan Bernardez
 */

/*global $, _ */

RegPage.BannerView = Backbone.View.extend({
	
	initialize: function(options) {
		'use strict';
		
		this.template = RegPage.Templates.filter('#banner-tpl');
		this.modelBinder = new Backbone.ModelBinder();
		this.model.attributes.bannerURL = this.model.attributes.bannerURL
										? this.model.attributes.bannerURL.replace(/http/g, 'https')
										: undefined;
		this.render();
	},
	
	bindings: {
		bannerURL: {selector: 'img', elAttribute: 'src'}
	},
	
	render: function(){
		'use strict';
		// Compile the template using underscore
		//var template = _.template( $("#search_template").html(), {} );
		// Load the compiled HTML into the Backbone "el"
		this.$el.html( this.template.html() );
		this.modelBinder.bind(this.model, this.el, this.bindings);
	}
	
});
