/**
 * Lithium Technologies
 * @author: Adam Ayres adam.ayres@lithium.com 
 * 
 * General purpose Cache
 */

;(function($LITH) {

LITHIUM.Cache = function() {
	var internal = function(keyParamIds) {
		var customEvents = {};
		var keyParamIds = keyParamIds;
		
		var createKey = function(keyParams) {
			var newKeyParams = [];
					
			$LITH.each(keyParamIds, function(index, keyParamId) {
				newKeyParams.push(keyParams[keyParamId]);
			});
			return newKeyParams.toString();
		} 
		
		return {
			set:function(items) {
				$LITH.each(items, function(index, item) {	
					var newCustomEvent = {};										
					newCustomEvent[createKey(item)] = item;
					$LITH.extend(customEvents, newCustomEvent);				
				});
			},
			get: function(keyParams) {
				return customEvents[createKey(keyParams)] || {};
			}
		}
	}
		
	return {
		create: function(groupId, keyParamIds) {
			if (!LITHIUM.Cache.hasOwnProperty(groupId)) {
				LITHIUM.Cache[groupId] = new internal(keyParamIds);
			}
		}
		
	}
}();

})(LITHIUM.jQuery);
