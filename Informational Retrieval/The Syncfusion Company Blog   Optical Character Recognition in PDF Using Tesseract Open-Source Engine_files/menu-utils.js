 function selectCurrentMenuItem(itemText)
 {
 	var selector = "ul.sf-menu>li>a:contains('" + itemText + "')"
 	$(selector).addClass("currently-selected-menu-item");
 }