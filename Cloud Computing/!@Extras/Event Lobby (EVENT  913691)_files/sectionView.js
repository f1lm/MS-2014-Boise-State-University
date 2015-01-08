/**
 * @author Juan Bernardez
 */

/*global $, _ */

RegPage.SectionView = Backbone.View.extend({
	
	headerStylesBindings: {
		headerVisibility:  {selector: '.js-header', elAttribute: 'css', cssAttribute: 'visibility'},
		headerFont: {selector: '.js-header', elAttribute: 'css', cssAttribute: 'font-family'},
		headerFontColor: {selector: '.js-header', elAttribute: 'css', cssAttribute: 'color'},
		headerFontSize: {selector: '.js-header', elAttribute: 'css', cssAttribute: 'font-size'},
		paddingRight: {selector: '.js-header', elAttribute: 'css', cssAttribute: 'padding-right'}
	},

	render: function(){
		'use strict';
		
		if (this.sectionRender) {
			this.sectionRender();
		}
		
		if (this.model.get('customStyles')) {
			this.stylesBinder = new Backbone.ModelBinder();
			this.stylesBindings = _.extend(this.stylesBindings || {}, this.headerStylesBindings);
			this.stylesBinder.bind(this.model.get('customStyles'), this.el, this.stylesBindings);
		}
	}
	
});
