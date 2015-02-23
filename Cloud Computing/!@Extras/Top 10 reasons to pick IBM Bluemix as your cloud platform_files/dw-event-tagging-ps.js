(function(){

	var dwOpp = {
		signIn: 'N',   // store the signIn value
		
		recordSignInStatus: function() {
			dwOpp.signIn = 'Y';
		},
		
		recordSignOutStatus: function() {
			dwOpp.signIn = 'N';
		},
		
		listenToSignInOut: function() {
			if (typeof (dwsi.dwsiEvtTgt) == 'undefined') {
				return;
			}
			clearInterval(dwOpp.timerHandler);
			dwsi.dwsiEvtTgt.addListener("dwsi_logged_in", dwOpp.recordSignInStatus);
			dwsi.dwsiEvtTgt.addListener("dwsi_logged_in_onpgload", dwOpp.recordSignInStatus);
			dwsi.dwsiEvtTgt.addListener("dwsi_logged_out", dwOpp.recordSignOutStatus);
		}, 
		// Bind special links to track in event report.
		bindEventLinks: function () {
			// sign in or not
			if (typeof (dwsi.dwsiEvtTgt) != 'undefined') { 
				dwOpp.listenToSignInOut();
			} else {
				dwOpp.timerHandler = setInterval(dwOpp.listenToSignInOut, 10);  // we do that b/c dwsi.dwsiEvtTgt may not have to initialized
			}
			
			if (window.location.href.indexOf('topics') == -1) {
			
				// PS Prototype 'A' - PSA - 012914 jpp
				
				// PSA on page load
				if (dojo.query("div.ibm-columns #dw-article-ps-date").length > 0){
					dwOpp.ev(window.location.hostname, "page load", "page load", window.location.href, "PSA", "Page");
				}		
				
				// PSA Navigation trail
				dojo.query("#ibm-navigation-trail a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "PSACN", "Navigation trail");					
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// PSA Share
				var shareListener = function() {
					dojo.query("#dw-social-tools-container #dw-ibm-social-tools a[class^='ibm-share']").onclick(function(evt){
						dojo.stopEvent(evt);
						dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "PSASA", "Share icons - Summary area");					
						setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
					});
				}
				window.setTimeout(shareListener, 5000);
				
				// PSA Author name | profile link
				dojo.query("p.dw-article-ps-author a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "PSALF", "Author profile");					
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// PSA Author contact link
				dojo.query("p.dw-article-ps-author-contact a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "PSALF", "Author contact");					
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
								
				// PSA Term definition | tooltip  
				dojo.query("a.ibm-tooltip").onmouseover(function(evt){ 
					dojo.stopEvent(evt);
					dwOpp.ev("hover", "hover", this.innerHTML, "tooltip", "PSACN", "Term definition");					
				});
				
				// PSA - Action button
				dojo.query("p.ibm-button-link-alternate a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "PSACN", "Action button");
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});	
				
				// PSA - Call-to-Action link | Watch, Read
				dojo.query("a.dw-article-ps-see").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "PSACN", "Call-to-action link - Watch, Read");
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// PSA - Related topic
				dojo.query("a.dw-article-ps-topic").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "PSACN", "Related topic");
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// PSA - Generic content link
				dojo.query(".ibm-col-6-4 a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "PSACN", "Generic content link");
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});	
				
				// PSA - Commenting user profile
				// dojo.query("div.cmtitem a").onclick(function(evt){ 
					// dojo.stopEvent(evt);
					// dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "PSART", "Commenting - user profile");
					// setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				// });				

				// PSA - Commenting | select comment block
				window.setTimeout(function() {
					dojo.query("div.dw-article-ps-hbox div.cmt_icon").onclick(function(evt){
						dojo.stopEvent(evt);
						dwOpp.ev("comment", "comment", this.innerHTML, "comment icon", "PSART", 
							dojo.query(this).siblings("h2")[0].innerHTML);
					});
				}, 3000);

				// DW EXPERIMENT (10/20/14 update)
				
				// PSA - Dynamic sidebar A on load
				if (dojo.query("#dwc-exp-ps-a").length > 0){
					dwOpp.ev(window.location.hostname, "dynamic sidebar A displayed", "Develop and deploy your next app on the IBM Bluemix cloud platform. - BUTTON", window.location.href, "PSACN", "Sidebar experiment");
				}

				// PSA - Dynamic sidebar A
				window.setTimeout(function() {
					dojo.query("#dwc-exp-ps-a a.ibm-forward-em-link").onclick(function(evt){
						dojo.stopEvent(evt);
						dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "PSACN", "Dynamic sidebar A - BUTTON selected");
						setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
					});
				}, 5000);	
				
				// PSA - Dynamic sidebar B on load
				if (dojo.query("#dwc-exp-ps-b").length > 0){
					dwOpp.ev(window.location.hostname, "dynamic sidebar B displayed", "Develop and deploy your next app on the IBM Bluemix cloud platform. - BUTTON", window.location.href, "PSACN", "Sidebar experiment");
				}	
				
				// PSA - Dynamic sidebar B
				window.setTimeout(function() {
					dojo.query("#dwc-exp-ps-b a.dw-button-large").onclick(function(evt){
						dojo.stopEvent(evt);
						dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "PSACN", "Dynamic sidebar B - BUTTON selected");
						setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
					});
				}, 5000);					

			} else {
			
				// PSB
				// dojo.query("#ibm-content-main div.ibm-col-6-4 ul.ibm-link-list li a").onclick(function(evt){
					// dojo.stopEvent(evt);
					// dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSF", 
						// dojo.query("#ibm-content div.ibm-col-6-4 h2:first-of-type")[0].innerHTML);
					// setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				// });
				
			}	

			// End event tagging.
		}
		
		// Event trigger to call on special links.
		, ev: function (hostname,action,linkName,pageURL,section,module) {
			var type = '';
			
			action = action || {};							
			action = action.replace(/^http[s]?:\/\//i,'');
			pageURL = pageURL || {};
			pageURL = pageURL.replace(/^http[s]?:\/\//i,'');
			
		    if (action.search(/\.(swf|mp3|mp4|pdf)/i) != -1) {
				type = 'dw download';
		    } else if (hostname.indexOf('www.ibm.com') != -1) {
				type = 'dw link';
			} else {
				type = 'dw external link';
			}
			
			ibmStats.event({
				"ibmEV": type // external links value is 'dw external link'; internal link value is 'dw link'; domain is www.ibm.com
				, "ibmEvAction": action  // clicked anchor itself
				, "ibmEvTarget": action  // clicked anchor itself; same as above
				, "ibmEvLinkTitle": linkName // link text
				, "ibmEvName": pageURL // Add attribute for URL of page where event occurred
				, "ibmEvSection": section // DWCSF, DWCSL, DWLSF, DWLSL-zone, DWPSF, trending: DWCSL
				, "ibmEvModule": module	// Module title; if no title, return descriptive text, such as leadspace, promotion; precede with dW
				, "ibmEvGroup": dwOpp.signIn // Y means logged in; N means non-logged in
			});
		}

	};

	// Register namespace.
	window.dwOpp = dwOpp;
	
	// Run ondocready.
	dojo.ready(function(){
		// Bind links for special onclick tracking.
		dwOpp.bindEventLinks();
	});
})();
