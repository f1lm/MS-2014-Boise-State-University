OPG = window.OPG || {};
OPG.Eloqua = OPG.Eloqua || {};
OPG.Eloqua = function () {
	return {
		eloqua_date: function() {
			var today=new Date();
			var dd=today.getDate();
			var mm=today.getMonth()+1;var yyyy=today.getFullYear();
			if (dd<10) {
				dd='0'+dd;
				if (mm<10) mm = '0' + mm;
			}
      return mm + '-' + dd + '-' + yyyy; 
  	},

    invoke_flash: function(type) {
  		if(type == "" || type == null) type = OPG.PageInfo.eloqua_type;
		  if(type == "" || OPG.PageInfo.eloqua_topic == "" || typeof(type) == 'undefined' || typeof(OPG.PageInfo.eloqua_topic) == 'undefined') { return; }
		  var strURL = window.document.location.href;
      var currQueryLen = window.location.search.substring(0).length;
      if(currQueryLen>0) {
         var strURL = strURL + "&";
      }
      else {
         var strURL = strURL + "?";
      }
		  var strURL = strURL + type + '=' + OPG.PageInfo.eloqua_topic + '&' + OPG.PageInfo.eloqua_topic + '=' + OPG.Eloqua.eloqua_date();
      elqFCS(strURL);     
		},
		
    report_social: function() {
  		OPG.Eloqua.refresh_iframe('social');
	  },
		  
	  refresh_iframe: function(type) {
			OPG.Eloqua.invoke_flash(type);
			OPG.Eloqua.record_social_event();
    },
    
    record_social_event: function() {
    	var s=window.s_gi(window.s_account);
    	s.eVar61='Social Click';
    	s.prop54=window.s.pageName;
    	s.events='event22';
    	s.linkTrackVars='eVar61,events,prop54';
    	s.linkTrackEvents='event22';
    	s.tl(this,'o', 'Social Click Complete');
    }
    
  };
}();
OPG.Eloqua.invoke_flash();