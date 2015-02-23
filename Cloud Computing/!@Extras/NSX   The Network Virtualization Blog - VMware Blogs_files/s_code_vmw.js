
var jQueryScriptOutputted = false;
function initJQuery() {    
    if (typeof jQuery == 'undefined') {
        if (! jQueryScriptOutputted) {
            //only output the script once..
            jQueryScriptOutputted = true;    
			var ns = document.createElement('script');
			ns.type = 'text/javascript';
     		ns.async = true;
     		ns.src = "//www.vmware.com/files/js/framework/jquery-1.8.3.min.js";			
			document.getElementsByTagName("head")[0].appendChild(ns);			
            /*causing problem when document finish loading
			document.write('<scr' + 'ipt type="text/javascript" src="//www.vmware.com/files/js/framework/jquery-1.8.3.min.js"></scr" + "ipt>');*/
        }
        setTimeout("initJQuery()", 50);
    } else {
		if (jQueryScriptOutputted) {
			jQuery = jQuery.noConflict();                
		}	
        if (typeof dbInfo == 'undefined') {
			jQuery.getScript('//api.demandbase.com/api/v2/ip.js?key=e1f90d4a92d08428627aa34a78d58cc3e866c84f&var=dbInfo',function(){
				jQuery.getScript('//www.vmware.com/files/templates/inc/scode_vmw.js');	
			});
		} else {jQuery.getScript('//www.vmware.com/files/templates/inc/scode_vmw.js');}	
    }
            
}
initJQuery();