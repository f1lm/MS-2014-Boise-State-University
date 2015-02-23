IDG = window.IDG || {};
IDG.Demandbase = IDG.Demandbase || {};
IDG.Demandbase = function() {

	// employee count, convert raw # to range
	_dbase_empcnt = function(empcnt) {
		try {
			if (!isNaN(empcnt)) {
				if (empcnt >= 1000) { return '1000plus'; }
				else if (empcnt < 1000 && empcnt >= 500) { return '500-999'; }
				else if (empcnt < 500 && empcnt >= 100) { return '100-499'; }
				else { return '1-99'; }
			}
		}
		catch(e) {
			return 'ERROR-2';
		}
		return '';
	};

	return {
		dbase_data: [],
		dbase_parse: function(data) {
			IDG.Demandbase.dbase_data = data;
			try {
				
				
				var industry = escape(IDG.Demandbase.getDbaseVar('industry')); 
				var employee_count = escape(IDG.Demandbase.getDbaseVar('employee_count')); 
				var watch_list = IDG.Demandbase.getDbaseVar('watch_list'); 
				var revenue_range = escape(IDG.Demandbase.getDbaseVar('revenue_range'));
				var registry_company_name = escape(IDG.Demandbase.getDbaseVar('registry_company_name')); 
				
				var acctlist = [];
				for (var i in watch_list) {
					if (i.slice(0,3) == "al_" && watch_list[i] == "TRUE") {
						acctlist.push(i);
					}
				}
				
				/*
				console.log("industry: " + industry);
				console.log("employee_count: " + employee_count);
				console.log("watch_list: " + watch_list);
				console.log("revenue_range: " + revenue_range);
				console.log("acctlist: " + acctlist);
				console.log("registry_company_name: " + registry_company_name);
				*/
				
				IDG.GPT.addTarget("indust", industry);
				IDG.GPT.addTarget("empcnt", employee_count);// diverts to _dbase_empcnt()
				IDG.GPT.addTarget("compnm", registry_company_name);
				IDG.GPT.addTarget("rev", revenue_range);

				if (acctlist != "") IDG.GPT.addTarget("acctlist", acctlist);

			} catch(e) {}
		},
		// get parameter value from data
		getDbaseVar: function() {
			var key;
			if (IDG.Demandbase.dbase_data == undefined || IDG.Demandbase.dbase_data == null || typeof(IDG.Demandbase.dbase_data) == undefined) {
				return '';
			}
			// loop through parameter names
			for (var i=0; i < arguments.length; i++) { // loop thru candidate names
				try {
					key = arguments[i];
					if (key != "" && key !== null && key !== undefined) {
						if ((IDG.Demandbase.dbase_data.hasOwnProperty && IDG.Demandbase.dbase_data.hasOwnProperty(key)) || (typeof(IDG.Demandbase.dbase_data[key]) != undefined) ) {
							// special case for employee count -- divert to _dbase_empcnt()
							if ( (key === 'employee_count' || key === 'empcnt') && typeof(_dbase_empcnt) != undefined) {
								return _dbase_empcnt(IDG.Demandbase.dbase_data[key]);
							}
							return IDG.Demandbase.dbase_data[key];
						}
					}
				}
				catch(e) {
					return 'ERROR-3';
				}
			}
			return '';
		}
	};
}();