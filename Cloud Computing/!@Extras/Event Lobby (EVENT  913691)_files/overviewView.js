/**
 * @author Juan Bernardez
 */

/*global $, _ */

RegPage.OverviewView = RegPage.SectionView.extend({
	
	className: 'overview-section section',
	
	initialize: function(options) {
		'use strict';
		
		this.template = RegPage.Templates.filter('#overview-tpl');
		this.modelBinder = new Backbone.ModelBinder();
		this.render();
	},
	
	
	sectionRender: function(){
		'use strict';
		this.$el.html( this.template.html() );
		//TODO: I am testing without bindings, usign the element "name" attr, to see how it goes..
		this.modelBinder.bind(this.model, this.el);//, this.bindings);
		this.$el.find('[name="title"]').html(this.model.get('title')); // for special characters to show, like &hearts;
	}
	
});
