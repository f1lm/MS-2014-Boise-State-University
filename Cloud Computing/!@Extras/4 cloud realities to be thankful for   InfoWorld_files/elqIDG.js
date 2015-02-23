IDG = window.IDG || {};
IDG.Eloqua = IDG.Eloqua || {};
IDG.Eloqua = function () {
	return {
		invoke_flash: function(type) {
			var eloqua_type = IDG.PageInfo.eloqua_type;
			var eloqua_topic = IDG.PageInfo.eloqua_topic;
			// get page's eloqua type if null or empty
			if (type == null || type == "") {
				type = eloqua_type;
			}
			// both eloqua type and topic must present
			if (typeof(type) == 'undefined' || type == "" || typeof(eloqua_topic) == 'undefined' || eloqua_topic == "") { 
				return;
			}
			// apend eloqua type and topic in the url
			var url_string = window.document.location.href;
			var query_length = window.location.search.substring(0).length;
			if (query_length > 0) {
				url_string = url_string + "&";
			}
			else {
				url_string = url_string + "?";
			}
			url_string = url_string + type + '=' + eloqua_topic + '&' + eloqua_topic + '=' + IDG.Eloqua.eloqua_date();
			elqFCS(url_string);
		},
		eloqua_date: function() {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth() + 1;
			var yyyy = today.getFullYear();
			if (dd < 10) {
				dd = '0' + dd;
			}
			if (mm < 10) {
				mm = '0' + mm;
			}
			return mm + '-' + dd + '-' + yyyy; 
		}
	};
}();