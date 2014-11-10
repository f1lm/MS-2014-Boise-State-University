OPG = window.OPG || {};
OPG.Tracking = OPG.Tracking || {};
OPG.Tracking = function() {
  return {
    init: function() {
      // comment form
      jQuery("#comment-form").submit(function() { OPG.Tracking.omniture_tl(); });
      // sidecar social tools
      jQuery("#floating_tools").find(".tool").click(function() { OPG.Tracking.omniture_tl(); });
      // forward this
      jQuery("#sharetop_print").click(function() { OPG.Tracking.omniture_tl(); });
    }, 
    omniture_tl: function () {
      if(typeof(OPG.Eloqua.report_social) != "undefined") OPG.Eloqua.report_social();
    }
  };
}();
jQuery(document).ready(function() { OPG.Tracking.init(); });