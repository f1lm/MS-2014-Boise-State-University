/**
 * Lithium Technologies
 * @author: Chris Fricke chris.fricke@lithium.com
 * @date: 10-13-09
 * 
 * Purpose of this file is to be a hub for all css specific
 * style extensions you want to make to the selector engine 
 * as an expression in jquery.  This gives you the ability to
 * say $(":overflow-auto") and that will return all elements
 * that have that specific style.  I think once this list grows
 * might want to rethink to be a very generic way of doing this
 * so we can simply just test for any specific style.  
 */
 
;(function($) {
 	$.extend($.expr[":"], {
 		"overflow-auto": function(a) {
 			return $(a).css("overflow") === "auto";
 		},
 		"overflow-hidden": function(a) {
 			return $(a).css("overflow") === "hidden";
 		},
 		"overflow-scroll": function(a) {
 			return $(a).css("overflow") === "scroll";
 		},
 		"overflow-visible": function(a) {
 			return $(a).css("overflow") === "visible";
 		} 		
 	});
})(jQuery);

