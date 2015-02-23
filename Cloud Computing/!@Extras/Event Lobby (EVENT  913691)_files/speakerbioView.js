/*global $, _, Backbone */

RegPage.SpeakerBioView = RegPage.SectionView.extend({
	
	className: 'section',
	speakersViews:[],
	
	initialize: function(options) {
		'use strict';
		
		this.template = RegPage.Templates.filter('#speaker-bio-tpl');
		this.initSpeakerViews(options.speakers);
		this.modelBinder = new Backbone.ModelBinder();
		
		this.render();
	},
	
	initSpeakerViews: function(speakers) {
		'use strict';
		var self = this,
			speakerView,
			description;
		
		_.each(speakers, function(speaker){
			description = "";
			if(speaker.description !== '[object Object]'){
				//Remove Flex Rich Text Editor Markup //TODO: Do this better/other way?
				description = speaker.description.replace(/<TEXTFORMAT.*?>/g, "")
								.replace(/<FONT.*?>/g, "")
								.replace(/<\/FONT.*?>/g, "")
								.replace(/<TEXTFORMAT.*?>/g, "")
								.replace(/<\/TEXTFORMAT.*?>/g, "")
								.replace(/<[sS][cC][rR][iI][pP][tT].*?>/g, "&lt;script&gt;")
								.replace(/<\/[sS][cC][rR][iI][pP][tT].*?>/g, "&lt;/script&gt;");
			}
			speakerView = new RegPage.speakerView({
				model:new Backbone.Model({
					name:speaker.name,
					title:speaker.title,
					company:speaker.company,
					description: description,
					photo:speaker.photo
				})
			});
			self.speakersViews.push(speakerView);
		});
	},
	
	bindings: {
		sectionLabel: '.data-section-label'
	},
	
	sectionRender: function(){
		'use strict';
		var self = this;
		this.$el.html( this.template.html() );
		
		_.each(this.speakersViews, function(speakersView){
			self.$('.speaker-fields-container').append(speakersView.$el);
		});

		this.modelBinder.bind(this.model, this.el, this.bindings);
		
	}
	
});
