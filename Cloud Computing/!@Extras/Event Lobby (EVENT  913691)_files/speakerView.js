

RegPage.speakerView = Backbone.View.extend({
		
	className: 'section',
	
	initialize: function(options) {
		'use strict';
		
		this.template = RegPage.Templates.filter('#speaker-tpl');
		this.modelBinder = new Backbone.ModelBinder();
		this.render();
	},

	bindings: {
		name: '.sp-name',
		title: '.sp-title',
		company: '.sp-company',
		description: {selector: '.sp-description', elAttribute: 'html'}
	},
	
	render: function() {
		'use strict';
		this.$el.html( this.template.html() );
		this.modelBinder.bind(this.model, this.el, this.bindings);
		
		this.$('li').last().css('margin-bottom', "10px");
		
		var defaultPic = false;
		
		//Model Binder is not binding data, so doing it manually for now.
		if(this.model.get('photo').indexOf("headshot.jpg")>0){
			defaultPic = true;
		}
		
		this.$('.sp-image').attr("src", defaultPic? "https://wccqa.on24.com/view/ecsetup/com/on24/eventconsolesetup/view/assets/images/widgets/headshot.jpg":this.model.get('photo'));
		this.$('.sp-image-container').css("display", defaultPic? "none":"block");

	}
	
});
