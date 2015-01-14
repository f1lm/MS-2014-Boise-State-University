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
			
				// Home - Leadspace - primary feature
				// dojo.query(".dw-home-page #ibm-leadspace-head h1 a").onclick(function(evt){
				//	dojo.stopEvent(evt);
				//	dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWLSF", "dW leadspace");
				//	setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				// });	
				
				// Home - Leadspace - secondary features
				// dojo.query(".dw-home-page #ibm-leadspace-head h2 a").onclick(function(evt){
				//	dojo.stopEvent(evt);
				//	dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWLSF", "dW leadspace");
				//	setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				// });
				
				// Home - Leadspace - feature zones
				// dojo.query(".ibm-landing-page.dw-home-page #ibm-leadspace-head p a").onclick(function(evt){
				// 	dojo.stopEvent(evt);
				//	dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWLSL", "dW leadspace");
				//	setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				// });
				
				// Home - Main topic links
				dojo.query("div.dw-home-page #ibm-content div.ibm-col-6-1 h3 a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWMTL", "dW main topics");
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// Home - Main topic images
				dojo.query("div.dw-home-page #ibm-content div.ibm-col-6-1 a.dw-n-home-topics-img").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, dojo.query("img", this).attr('src'), window.location.href, "DWMTL", "dW main topic images");
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// Home - Featured resource links
				dojo.query("div.dw-home-page #ibm-content div.dw-n-featured li h3 a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWFRL", "Featured resources");
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// Home - Featured resource zones
				dojo.query("div.dw-home-page #ibm-content div.dw-n-featured li p a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWFRZ", "Featured resources");
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});	
				
				// Home - Follow links
				dojo.query("div.dw-home-page #ibm-content #dw-follow li a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWFDL", "Follow IBM developerWorks");
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// Home - Innovation links
				dojo.query("div.dw-home-page #ibm-content div.dw-n-innovations h3 a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWIIL", "Interesting innovations");
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				var ribbonListener = function() {
					dojo.query("div.dw-home-page #ibm-content #dw-n-promotions .ibm-ribbon-pane a").onclick(function(evt){
						dojo.stopEvent(evt);
						dwOpp.ev(window.location.hostname, this.href, dojo.query("img", this).attr('alt'), window.location.href, "DWPRL", "dW promotions");
						setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
					});
				}
				window.setTimeout(ribbonListener, 3000);

				// Home - Popular topics 
				// dojo.query("div.dw-home-page #ibm-content div.dw-popular-topics ul.dw-topic-bars li a").onclick(function(evt){
				//	dojo.stopEvent(evt);
				//	dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL", 
				//		dojo.query("#ibm-content div.dw-popular-topics").siblings("h2")[0].innerHTML);
				//	setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				// });
				
				// Home - Popular downloads feature
				// dojo.query("div.dw-home-page #ibm-content-main div.ibm-col-6-2:nth-child(2) ul.ibm-portrait-module-list h3 a").onclick(function(evt){
				//	dojo.stopEvent(evt);
				//	dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSF",
				//		dojo.query("#ibm-content ul.ibm-portrait-module-list").siblings("h2")[0].innerHTML);
				//	setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				// });
				
				// Home - Popular downloads links
				// dojo.query("#ibm-content-main div.ibm-col-6-2:nth-child(2) div.dw-icon-list ul li a").onclick(function(evt){
				//	dojo.stopEvent(evt); 
				//	dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL",
				//		dojo.query("#ibm-content div.dw-icon-list").siblings("h2")[0].innerHTML);
				//	setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				// });
				
				// Home - Popular downloads forward link
				// dojo.query("#ibm-content-main div.ibm-col-6-2:nth-child(2) a.ibm-forward-em-link").onclick(function(evt){
				// 	dojo.stopEvent(evt);  
				// 	dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL",
				// 		dojo.query("#ibm-content p.ibm-ind-link").siblings("h2")[0].innerHTML);
				// 	setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				// });			
				
				// Home - Community activity feature
				// dojo.query("div.dw-home-page #ibm-content-main div.ibm-col-6-2:nth-child(3) ul.ibm-portrait-module-list h3 a").onclick(function(evt){
				//	dojo.stopEvent(evt);
				//	dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSF",
				//		dojo.query("#ibm-content div.ibm-col-6-2:nth-child(3) ul.ibm-portrait-module-list").siblings("h2")[0].innerHTML);
				//	setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				// });
				
				// Home - Community activity links
				// dojo.query("#ibm-content-main div.ibm-col-6-2:nth-child(3) div.dw-icon-list ul li a").onclick(function(evt){
				//	dojo.stopEvent(evt);  
				//	dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL",
				//		dojo.query("#ibm-content div.ibm-col-6-2:nth-child(3) h2")[0].innerHTML);
				//	setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				// });
				
				// Home - Community activity forward link
				// dojo.query("#ibm-content-main div.ibm-col-6-2:nth-child(3) p.ibm-ind-link a").onclick(function(evt){
				//	dojo.stopEvent(evt);
				//	dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL",
				//		dojo.query("#ibm-content div.ibm-col-6-2:nth-child(3) h2")[0].innerHTML);
				//	setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				// });
				
				// Home - Promotion links
				// dojo.query("#ibm-content-main div.ibm-col-6-2 ul.ibm-portrait-module-list li h4 a").onclick(function(evt){
				//	dojo.stopEvent(evt);
				//	dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWPSF", "dW promotion");
				//	setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				// });
				
				// DWC - EXP
				
				// A on page load
				if (dojo.query("div.ibm-col-1-1 #dwc-exp-a").length > 0){
					dwOpp.ev(window.location.hostname, "display tile", "Develop and deploy your next app on the IBM Bluemix cloud platform.  Start building. - BUTTON", window.location.href, "DWART", "Tile experiment");
				}		
				
				// A link
				dojo.query("div.ibm-col-1-1 #dwc-exp-a a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, "Develop and deploy your next app on the IBM Bluemix cloud platform.  Start building. - BUTTON", window.location.href, "DWART", "Tile experiment");
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// B on page load
				if (dojo.query("div.ibm-col-1-1 #dwc-exp-b").length > 0){
					dwOpp.ev(window.location.hostname, "display tile", "Cloud server hosting trial. Try SoftLayer. Free cloud server hosting for one month.", window.location.href, "DWART", "Tile experiment");
				}		
				
				// B link
				dojo.query("div.ibm-col-1-1 #dwc-exp-b a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, "Cloud server hosting trial. Try SoftLayer.", window.location.href, "DWART", "Tile experiment");
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// C on page load
				if (dojo.query("div.ibm-col-1-1 #dwc-exp-c").length > 0){
					dwOpp.ev(window.location.hostname, "display tile", "Develop and deploy your next app on the IBM Bluemix cloud platform.  Start building. - BUTTON", window.location.href, "DWART", "Tile experiment");
				}		
				
				// C link
				dojo.query("div.ibm-col-1-1 #dwc-exp-c a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, "Develop and deploy your next app on the IBM Bluemix cloud platform.  Start building. - BUTTON", window.location.href, "DWART", "Tile experiment");
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// D on page load
				if (dojo.query("div.ibm-col-1-1 #dwc-exp-d").length > 0){
					dwOpp.ev(window.location.hostname, "display tile", "Develop and deploy your next app on the IBM Bluemix cloud platform.  Start building. - BUTTON", window.location.href, "DWART", "Tile experiment");
				}		
				
				// D link
				dojo.query("div.ibm-col-1-1 #dwc-exp-d a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, "Develop and deploy your next app on the IBM Bluemix cloud platform.  Start building. - BUTTON", window.location.href, "DWART", "Tile experiment");
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// DW Share
				var shareListener = function() {
					dojo.query("#dw-social-tools-container #dw-ibm-social-tools a[class^='ibm-share']").onclick(function(evt){
						dojo.stopEvent(evt);
						dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWART", "Share icons - Summary area");					
						setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
					});
				}
				window.setTimeout(shareListener, 5000);
				
			} else {
			
				// Topic page - Feature
				dojo.query("#ibm-content-main div.ibm-col-6-4 ul.ibm-link-list li a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSF", 
						dojo.query("#ibm-content div.ibm-col-6-4 h2:first-of-type")[0].innerHTML);
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// Topic page - Search results
				dojo.query("#ibm-content-main div.ibm-col-6-4 h2.result-font a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL", 
						dojo.query("#ibm-content .ibm-col-6-4 h2:nth-of-type(2)")[0].innerHTML);
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
			
				// Topic page - Right module - Demos
				dojo.query("div.ibm-video-container a.ibm-media span").onclick(function(evt){
					var n = dojo.query(this.parentNode.parentNode).siblings("h3")[0];
					dwOpp.ev(window.location.hostname, this.parentNode.href, n.innerHTML, window.location.href, "DWCSL", "Related demos");
				});	
				
				dojo.query("div.ibm-video-container div.dw-ibm-media span").onclick(function(evt){
					var title = dojo.query('div', this.parentNode).attr('title')[0];
					var url = title.substring(title.indexOf('url=')+4);
					var n = dojo.query(this.parentNode.parentNode).siblings("h3")[0];
					dwOpp.ev(window.location.hostname, url, n.innerHTML, window.location.href, "DWCSL", "Related demos");
				});	
				
				// Topic page - Right module - Demos - Download link
				dojo.query("div.dw-video-links a.ibm-download-link").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL", "Related demos"); 
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});	
				
				
				// Topic page - Right module - Demos - Transcript link
				dojo.query("div.dw-video-links a.ibm-forward-link").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL", "Related demos"); 
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});	
				
				// Topic page - Right module - Evaluation software
				dojo.query("#ibm-content-main div.ibm-col-6-2 ul.ibm-link-list a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL", "Related evaluation software"); 
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});	
				
				// Topic page - Right module - Evaluation software - More link
				dojo.query("#ibm-content-main div.ibm-col-6-2 p.ibm-ind-link a[href*='Trial+Downloads']").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL", "Related evaluation software"); 
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// Topic page - Right module - Blogs
				dojo.query("#ibm-content-main div.ibm-col-6-2 ul.ibm-bullet-list a[href*='\/mydeveloperworks\/blogs\/']").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL", "Related blog entries"); 
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});	
				
				// Topic page - Right module - Blogs - More link
				dojo.query("#ibm-content-main div.ibm-col-6-2 p.ibm-ind-link a[href*='\/mydeveloperworks\/blogs\/']").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL", "Related blog entries"); 
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// Topic page - Right module - IBM Champions
				dojo.query("#ibm-content-main div.ibm-col-6-2 ul.ibm-portrait-module-list h3 a[href*='\/mydeveloperworks\/profiles\/html\/']").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL", "Related IBM Champions"); 
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// Topic page - Right module - Forums
				dojo.query("#ibm-content-main div.ibm-col-6-2 ul.ibm-bullet-list a[href*='\/developerworks\/forums\/']").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL", "Related forum threads"); 
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// Topic page - Right module - Forums - More link
				dojo.query("#ibm-content-main div.ibm-col-6-2 p.ibm-ind-link a[href*='\/developerworks\/forums\/']").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL", "Related forum threads"); 
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// Topic page - Right module - Groups
				dojo.query("#ibm-content-main div.ibm-col-6-2 ul.ibm-bullet-list a[href*='\/mydeveloperworks\/groups\/']").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL", "Related groups");  
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// Topic page - Right module - Groups - More link
				dojo.query("#ibm-content-main div.ibm-col-6-2 p.ibm-ind-link a[href*='\/mydeveloperworks\/groups\/']").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL", "Related groups");  
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// Topic page - Right module - Related search bars
				dojo.query("h2.dw-module-top-margin + div.dw-popular-topics ul.dw-topic-bars li a").onclick(function(evt){
					dojo.stopEvent(evt);
					dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL", "Related searches");
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});
				
				// Topic page - Right modules - Profile links in Blogs or Forums
				dojo.query("#ibm-content-main div.ibm-col-6-2 ul.ibm-bullet-list a.dw-sm-a-font").onclick(function(evt){
					dojo.stopEvent(evt);
						var n = dojo.query(this).siblings("a")[0].href.search(/\/developerworks\/forums/); 
						dwOpp.ev(window.location.hostname, this.href, this.innerHTML, window.location.href, "DWCSL", ((n != -1) ? "dW Forums profile" : "dW Blogs profile")); 	
					setTimeout(dojo.hitch(this, function(){window.location = this.href;}), 800);
				});	
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
