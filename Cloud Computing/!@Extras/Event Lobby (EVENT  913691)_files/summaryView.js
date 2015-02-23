/**
 * @author Juan Bernardez
 */

/*global $, _, Backbone */

RegPage.SummaryView = RegPage.SectionView.extend({
	
	className: 'summary-section section',
	
	initialize: function(options) {
		'use strict';
		
		this.template = RegPage.Templates.filter('#summary-tpl');
		this.modelBinder = new Backbone.ModelBinder();
		this.render();
	},
	
	// bindings: {
	// },
	
	sectionRender: function(){
		'use strict';
		this.$el.html( this.template.html() );
		//TODO: I am testing without bindings, usign the element "name" attr, to see how it goes..
		this.modelBinder.bind(this.model, this.el);//, this.bindings);
		//Summary needs to be appended as HTML
		//TODO: Find a way to append summary as HTML using model binder. Model Binder is currently appending HTML as text
		this.$('[name="summary"]').html(this.model.get('summary'));
		
		this.limitImgSize();
	},
	
	/*
	 * User specified images in summary section cannot be greater than MAX_COL_IMG_WIDTH,
	 * because in that case the UI will be messed up. This method checks the img's width
	 * and apply a 'size-limited' css class when needed
	 */
	limitImgSize: function() {
		'use strict';
		var self = this,
			images, $img;
			
		images = this.$('img');
		_.each(images, function(img) {
			$img = $(img);
			if ($img.outerWidth() === 0 || $img.outerWidth() > RegPage.Cons.MAX_COL_IMG_WIDTH) {
				$img.addClass('size-limited');
				$img.css('margin', '0px');
			}
		});
	}
	
});
