/**
 * @author Juan Bernardez
 */

/*global $, _ */

RegPage.SectionsLayoutView = Backbone.View.extend({
	
	
	mainSections: [
		RegPage.Cons.OVERVIEW_SECTION,
		RegPage.Cons.REGISTRATION_SECTION,
		RegPage.Cons.ATTEND_SECTION
	],
	secondarySections: [
		RegPage.Cons.SUMMARY_SECTION,
		RegPage.Cons.SPEAKERS_SECTION
	],
	
	sectionViews: [],
	
	initialize: function(options) {
		'use strict';
		
		this.template = options.template;
		this.setSectionsAlignment(options.align);

		this.render();
	},
	
	/*
	 * Sets the alignment that will be used to append the sections. Sections aligment
	 * is divided into main and secondary sections alignment
	 */
	setSectionsAlignment: function(align) {
		'use strict';
		
		if (!align) {
			this.mainSectionsAlign = this.secondarySectionsAlign = 'one';
		}
		else if (align === RegPage.Cons.LEFT_ALIGN) {
			this.mainSectionsAlign = 'left';
			this.secondarySectionsAlign = 'right'; 
		}else {
			this.mainSectionsAlign = 'right';
			this.secondarySectionsAlign = 'left'; 
		}
	},
	
	/*
	 * Takes a section view, and its name, and appends it with the correct alignment,
	 * depening on the sectionName.
	 * 
	 * @param sectionView: the view of the section to be appended
	 * @param sectionName: the name of the section to be appended (needs to be a
	 *						constant from RegPage.Cons)
	 */
	appendSection: function(sectionView, sectionName) {
		'use strict';
		if(sectionView){
			var alignment;
			//If it's a main section, align in main sections alignment
			if ($.inArray(sectionName, this.mainSections) !== -1) {
				alignment = this.mainSectionsAlign;
			}else { //else align in seconday sections aligment
				alignment = this.secondarySectionsAlign;
			}
			this.sectionViews.push(sectionView);
			//Append the section
			this.$el.find('#'+alignment+'-col').append(sectionView.$el);
			
			this.setColumnsSeparator();
		}
	},
	
	/*
	 * Renders the view.
	 */
	render: function(){
		'use strict';
		this.$el.html( this.template.html() );
		
		this.ui = {
			leftCol: this.$('#left-col'),
			rightCol: this.$('#right-col')
		};
	},
	
	/*
	 * We don't know which column is going to be the biggest one, so we check the
	 * height of the columns, and depending on the results we apply the border
	 * to the biggest/tallest column
	 * 
	 * TODO: Try to make both columns allways the same height by css, so we don't
	 * have to rely in javascript 
	 */
	setColumnsSeparator: function() {
		'use strict';
		
		if (this.mainSectionsAlign !== 'one') {
			if (this.ui.leftCol.height() > this.ui.rightCol.height()) {
				this.ui.leftCol.addClass('left-col-border');
				this.ui.rightCol.removeClass('right-col-border');
			}else {
				this.ui.leftCol.removeClass('left-col-border');
				this.ui.rightCol.addClass('right-col-border');
			}
		}
	}
	
});
