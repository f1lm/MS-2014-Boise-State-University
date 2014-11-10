(function( window, undefined ) {
	
	$ = window.jQuery;
	
	/*
	 * call this function on a scrollable node to add some more clones on the right side of the carousel
	 * as the jQuery Tools Scrollable plugin is build to just show one item on screen at once (not
	 * multiple small elements). This function fills up the empty space right to the carousel with dummy
	 * nodes
	 * @param int addItems [OPTIONAL] define the number of clone items to aditionally add to the wrapper
	 * @return void
	 * 
	 * JC Modified to set scrollsize to 2 afte scrollable is initialized
	 * allowing circular+scrollsize >1 
	 */
	$.fn.scrollableCustom = function(options) {
	  var scrollable;
	  
	  if (!(scrollable = $(this).data('scrollable')) || !scrollable.getConf().circular)
	    return;
	  
	  var conf = scrollable.getConf();
	  
	  if(options.clones){
	  	var nodes = scrollable.getItems();
	  	var length = nodes.length;
	  	var clonedClass = scrollable.getConf().clonedClass;
	  // get wrap object to append the clones to
	  	var wrap = scrollable.getItemWrap();
	  	var newNodesAppend = $('<span />');
	  	for (var i = 0; i <options.clones; i++){
	  		nodes.eq(i % length).clone().addClass(clonedClass).appendTo(newNodesAppend);
	  	}
	  	newNodesAppend.children().appendTo(wrap);
	  }
	  if(options.step){
		  conf.size=options.step;//JC - added
	  }
	  
	  if(conf.keyboard){
	  	$(document).off("keydown.scrollable");
	  	$(document).off("keydown.scrollable");
	  
	  	$(document).on("keydown.scrollable",function (eventObj) {
	  		var keyCode = eventObj.keyCode;
          if (!(!conf.keyboard || eventObj.altKey || eventObj.ctrlKey || eventObj.metaKey || $(eventObj.target).is(":input"))) {
              if (conf.vertical && (keyCode == 38 || keyCode == 40)) {
                  scrollable.move(keyCode == 38 ? -1 * conf.size : conf.size);
                  return eventObj.preventDefault();
              }
              if (!conf.vertical && (keyCode == 37 || keyCode == 39)) {
            	  scrollable.move(keyCode == 37 ?  -1 * conf.size : conf.size);
                  return eventObj.preventDefault();
              }
          }
      });
	  
	  }
	};
	
	
	//jqTools - Scrollable wrapper pre-plugin, wrap n-items to enable batch scrolling
	//
	$.fn.scrollableGroups = function(options) {
			var settings ={
					'item':".item",
					'wrap': "<div/>",
					size: 3};
			$.extend(settings,options);
			$(this.each(function(i,e){
			  var $e = $(e);
			  var $items = $e.find(settings.item);
			  var length = $items.length;
			  for(var i=0; i<length ; i+=settings.size){
				  var $slice = $items.slice(i,i+settings.size);
				  $slice.wrapAll(settings.wrap);
			  }
		  }));
		  return this;
	};

})( window );
