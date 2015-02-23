/**
 * Lithium Technologies
 * @author: Adam Ayres
 * @portedby: Adam Ayres
 * @requires: jQuery
 * 
 * Creates drop down menus
 */

;(function($LITH) {

LITHIUM.DropDownMenu = function(params) {	
	if (LITHIUM.DropDownMenu.init !== true) {
		LITHIUM.DropDownMenu.init = true;
		var menus = [];
		var menuOpenedDataKey = "LITHIUM.DropDownMenu.opened";
		var menuItemsDataKey = "LITHIUM.DropDownMenu.menuItems";
			
		//Functions used in both modes:
	
		LITHIUM.DropDownMenu.createMenu = function(event) {
			var menu = $LITH(event.target).closest(params.menuElementSelector);
			var menuItems = menu.find(params.menuItemsSelector);
			menu.data(menuItemsDataKey, menuItems);
			menus.push(menu);
			return menu;
		}
		
		LITHIUM.DropDownMenu.openMenu = function(menu) {
			LITHIUM.DropDownMenu.closeAllMenus(); // Close other open menus
			menu.data(menuOpenedDataKey, true).addClass(params.menuOpenCssClass);
			menu.data(menuItemsDataKey).shim()
			menu.trigger(params.menuOpenedEvent);		
		}
			
		LITHIUM.DropDownMenu.closeAllMenus = function() { 
			$LITH.each(menus, function() {
				var menu = $LITH(this);
				if (menu.data(menuOpenedDataKey) === true) {
					menu.data(menuOpenedDataKey, false)
						.removeClass(params.menuOpenCssClass)
						.data(menuItemsDataKey)
						.shim(false);
					
					menu.trigger(params.menuClosedEvent);				
				}
			});
		}	
			
		//When activationEventType is CLICK: 	
			
		LITHIUM.DropDownMenu.clickCloseMenus = function(event) {
			if (event.currentTarget === document) {
				LITHIUM.DropDownMenu.closeAllMenus();				
			}		
		}
		
		$LITH(document).on("click", params.clickElementSelector, function(event) {
			var menu = LITHIUM.DropDownMenu.createMenu(event);
			if (menu.data(menuOpenedDataKey) !== true) {			
				LITHIUM.DropDownMenu.openMenu(menu);
				$LITH(document).bind(params.closeMenuEvent + " " + "click", LITHIUM.DropDownMenu.clickCloseMenus);			
			} else {
				LITHIUM.DropDownMenu.closeAllMenus();
				$LITH(document).unbind(params.closeMenuEvent + " " + "click", LITHIUM.DropDownMenu.clickCloseMenus);						
			}		
			return false;
		});
		
		$LITH(document).on(params.hoverLeaveEvent, params.clickElementSelector, LITHIUM.DropDownMenu.closeAllMenus);
		
		//When activationEventType is MOUSE_OVER:
		
		LITHIUM.DropDownMenu.mouseoverCloseMenus = function(event) {		
			if (event.currentTarget === document && $LITH(event.target).closest(params.menuItemsSelector).length == 0) {			
				var menu = $LITH(event.target).closest(params.menuElementSelector);
				if (menu.length == 0 || (menu.length > 0 && menu.not(event.data.menu).length != 0)) {
					LITHIUM.DropDownMenu.closeAllMenus();
					
					$LITH(document).unbind(
						params.closeMenuEvent + " " + "mouseover",
						LITHIUM.DropDownMenu.mouseoverCloseMenus);		
				}
			}
		}
		
		$LITH(document).on("click", params.mouseoverElementSelector, function(event) { return false; });
		
		$LITH(document).on("mouseover", params.mouseoverElementSelector, function(event) {
			var menu = LITHIUM.DropDownMenu.createMenu(event);
			if (menu.data(menuOpenedDataKey) !== true) {			
				LITHIUM.DropDownMenu.openMenu(menu);
				
				$LITH(document).bind(
					params.closeMenuEvent + " " + "mouseover",
					{ menu: menu },
					LITHIUM.DropDownMenu.mouseoverCloseMenus);			
			} 		
			return false;		
		});
	}
}

})(LITHIUM.jQuery);
