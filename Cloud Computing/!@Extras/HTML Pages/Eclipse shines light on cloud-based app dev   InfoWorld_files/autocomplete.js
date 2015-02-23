
/**
 function __highlight(s, t) {
  var matcher = new RegExp("("+$.ui.autocomplete.escapeRegex(t)+")", "ig" );
  return s.replace(matcher, "<font style='color:blue;'>$1</font>");
}*/

//bold the searched-for term
$.ui.autocomplete.prototype._renderItem = function( ul, item) {
  var re = new RegExp("(^" + this.term +")", "i") ;
  var t = item.label.replace(re,"<strong>$1</strong>");
  return $( "<li></li>" )
      .data( "item.autocomplete", item )
      .append( "<a>" + t + "</a>" )
          .appendTo( ul );
};

$(document).ready(function() {
	function log( message ) {
		$( "<div>" ).text( message ).prependTo( "#log" );
		$( "#log" ).scrollTop( 0 );
	}
	
	$("#banner-search-term").autocomplete({
		source: function( request, response ) {
			$.ajax({
				url: "/autocompleter",
				dataType: "jsonp",
				data: {
					featureClass: "P",
					style: "full",
					maxRows: 12,
					query: request.term
				},
				success: function( data ) {
					if ((data.status===200)&&(data.readyState=4)) {
						values = JSON.parse(data.responseText);
						response( $.map( values.suggestions, function( item ) {
							return {
								label: item,
								value: item
							};
						}));
					}
				},
				error: function (error) {
					if ((error.status===200)&&(error.readyState=4)) {
						values = JSON.parse(error.responseText);
						response( $.map( values.suggestions, function( item ) {
							return {
								label: item,//__highlight(item, request.term),
			                    value: item
			                    };
						}));
					}
				}
			});
		},		
		minLength: 2,
		select: function(event, ui) { 
			$('#banner-search-term').val(ui.item.value);
			$('#search-form').submit(); 
			},
		
		open: function() {
			$( this ).removeClass( "ui-corner-all" );
			//$('.ui-menu').width(300);
			$('.search-suggest').show();
		},
		close: function() {
			$('.search-suggest').hide();
		},
		appendTo:$(".fixed-search-wrapper").length > 0 ? ".fixed-search-wrapper" : ".tools-expand"
	});
});