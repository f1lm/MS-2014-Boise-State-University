// $Id: demandbase.js 43210 2011-10-24 20:41:21Z bbuckman $
// 2011-09-22 tkroon added dogfish v2
// Demandbase data

// make sure global namespace exists
OPG = window.OPG || {};

// Demandbase namespace (lowercase b)
OPG.Demandbase = OPG.Demandbase || {};
OPG.Demandbase = function() {
  
  // PRIVATE
  /**
   * special logic for employee count variable
   * convert raw # to range
   * diverted to here from getDbaseVar() to support legacy/outside calls,
   * -- not meant to be called directly --
   * (empcnt passed in to avoid infinite loop)
   */
  _dbase_empcnt = function(empcnt) {
   try {
      if (! isNaN(empcnt)) {   // a number
        if (empcnt >= 1000) { return '1000plus'; }
        else if (empcnt < 1000 && empcnt >= 500) { return '500-999'; }
        else if (empcnt < 500 && empcnt >= 100) { return '100-499'; }
        else { return '1-99'; }
      }
   } catch(e) {
     return 'ERROR-2'; // will be noticed in stats
   }
   
  return '';   // invalid or other
  };
  

  // PUBLIC
  return {
    dbase_data: [],  // needed for ads and omniture  
  
    dbase_parse: function(data) {    // callback for demandbase api
      OPG.Demandbase.dbase_data = data;

      // make sure doubleclick namespace (from idg_ads.js) exists
      IDG = window.IDG || {};
      IDG.ads = IDG.ads || {};
      try {
        IDG.ads.setAdTargetValue("compsz", escape(OPG.Demandbase.getDbaseVar('company_size')));
        IDG.ads.setAdTargetValue("indust", escape(OPG.Demandbase.getDbaseVar('industry')));
        IDG.ads.setAdTargetValue("empcnt", escape(OPG.Demandbase.getDbaseVar('employee_count')));
        IDG.ads.setAdTargetValue("sic", escape(OPG.Demandbase.getDbaseVar('primary_sic')));
        IDG.ads.setAdTargetValue("compnm", escape(OPG.Demandbase.getDbaseVar('company_name')));
        IDG.ads.setAdTargetValue("rev", escape(OPG.Demandbase.getDbaseVar('annual_sales')));
        var watchlist = OPG.Demandbase.getDbaseVar('watch_list');
        var acctlist = "";
        for (var i in watchlist){
          if (i.slice(0,3) == "al_" && watchlist[i] == "TRUE") {
            IDG.ads.setAdTargetValue("acctlist", i);
          }
        }
        IDG.ads.setAdTargetValue("g2000", "YES");
      } catch(e) {}
    },


    /**
     * get a specific var from the data
     * variable args: pass in optional names, 1st successful returned
     */
    getDbaseVar: function() {
      var key;
      
      // make sure there's an object there!
      // (handle cases where Demandbase returns no data or 404)
      if (OPG.Demandbase.dbase_data == undefined || OPG.Demandbase.dbase_data == null || typeof(OPG.Demandbase.dbase_data) == undefined) {
        return '';
      }

      for(var i=0; i < arguments.length; i++) {   // loop thru candidate names
        try {
          key = arguments[i];
          if (key != "" && key !== null && key !== undefined) {
            if ( (OPG.Demandbase.dbase_data.hasOwnProperty && OPG.Demandbase.dbase_data.hasOwnProperty(key))
                || (typeof(OPG.Demandbase.dbase_data[key]) != undefined) ) {

              // special case for employee count -- divert to _dbase_empcnt()
              // (private function so don't need to specify namespace)
              // (doing here to support outside calls to .getDbaseVar('employee_count'))
              if ( (key === 'employee_count' || key === 'empcnt') && typeof(_dbase_empcnt)!=undefined) {
                return _dbase_empcnt(OPG.Demandbase.dbase_data[key]);
              }

              return OPG.Demandbase.dbase_data[key];
            }
          } //key

        } catch(e) {
          // console.log(e);
          return 'ERROR-3'; // will be noticed in stats
        }

      } //for

      return '';
    }

  };  // returned/public

}();


// legacy (remove after full transition)
window.getDbaseVar = OPG.Demandbase.getDbaseVar;
window.dbase_parse = OPG.Demandbase.dbase_parse;
