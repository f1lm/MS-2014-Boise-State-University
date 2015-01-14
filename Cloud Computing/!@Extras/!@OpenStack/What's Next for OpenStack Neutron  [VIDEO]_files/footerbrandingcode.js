var brandFooterArray = {"forums.databasejournal.com":{"footer":"itbeBrandForum-footer"},"forums.datamation.com":{"footer":"itbeBrandForum-footer"},"forums.serverwatch.com":{"footer":"itbeBrandForum-footer"},"discussions.virtualdr.com":{"footer":"itbeBrandForum-footer"},"forums.windrivers.com":{"footer":"itbeBrandForum-footer"},"forums.windrivers.com/vb/":{"footer":"itbeBrandForum-footer"},"www.sharkyforums.com":{"footer":"itbeBrandForum-footer"},"www.sysopt.com/forum/":{"footer":"itbeBrandForum-footer"},"forums.practicallynetworked.com":{"footer":"itbeBrandForum-footer"},"www.dbasupport.com/forums/":{"footer":"itbeBrandForum-footer"},"www.pdastreet.com/forums/":{"footer":"itbeBrandForum-footer"},"forums.smallbusinesscomputing.com":{"footer":"itbeBrandForum-footer"},"www.antionline.com":{"footer":"itbeBrandForum-footer"},"downloads.antionline.com":{"footer":"itbeBrandForum-footer"},"forums.codeguru.com":{"footer":"developerBrandForum-footer"},"www.phpbuilder.com/board/":{"footer":"developerBrandForum-footer"},"board.flashkit.com/board/":{"footer":"developerBrandForum-footer"},"forums.devx.com":{"footer":"developerBrandForum-footer"},"www.aspmessageboard.com":{"footer":"developerBrandForum-footer"},"www.vbforums.com":{"footer":"developerBrandForum-footer"},"www.databasejournal.com":{"footer":"itbeBrand-footer"},"www.datamation.com":{"footer":"itbeBrand-footer"},"www.serverwatch.com":{"footer":"itbeBrand-footer"},"www.infostor.com":{"footer":"itbeBrand-footer"},"www.sharkyextreme.com":{"footer":"itbeBrand-footer"},"www.sysopt.com":{"footer":"itbeBrandForum-footer"},"www.practicallynetworked.com":{"footer":"itbeBrand-footer"},"www.hardwarecentral.com":{"footer":"itbeBrandForum-footer"},"www.sqlcourse.com":{"footer":"itbeBrand-footer"},"www.sqlcourse2.com":{"footer":"itbeBrand-footer"},"www.linuxplanet.com":{"footer":"itbeBrand-footer"},"www.ecommerce-guide.com":{"footer":"itbeBrand-footer"},"www.enterprisemobiletoday.com":{"footer":"itbeBrand-footer"},"forums.enterprisemobiletoday.com":{"footer":"itbeBrandForum-footer"},"www.enterprisestorageforum.com":{"footer":"itbeBrand-footer"},"www.itsmwatch.com":{"footer":"itbeBrand-footer"},"www.itchannelplanet.com":{"footer":"itbeBrand-footer"},"www.xmlfiles.com":{"footer":"itbeBrand-footer"},"www.dbasupport.com":{"footer":"itbeBrand-footer"},"www.linux-mag.com":{"footer":"itbeBrand-footer"},"www.linuxtoday.com":{"footer":"itbeBrand-footer"},"www.internetnews.com":{"footer":"itbeBrand-footer"},"www.webopedia.com":{"footer":"itbeBrand-footer"},"new.webopedia.com":{"footer":"itbeBrand-footer"},"www.smallbusinesscomputing.com":{"footer":"itbeBrand-footer"},"www.enterprisenetworkingplanet.com":{"footer":"itbeBrand-footer"},"www.esecurityplanet.com":{"footer":"itbeBrand-footer"},"www.cioupdate.com":{"footer":"itbeBrand-footer"},"www.enterpriseappstoday.com":{"footer":"enterpriseappstoday-footer"},"www.wi-fiplanet.com":{"footer":"itbeBrand-footer"},"forums.wi-fiplanet.com":{"footer":"itbeBrandForum-footer"},"www.codeguru.com":{"footer":"developerBrand-footer"},"www.phpbuilder.com":{"footer":"developerBrand-footer"},"www.javascriptsource.com":{"footer":"developerBrand-footer"},"www.javascript.internet.com":{"footer":"developerBrand-footer"},"www.4guysfromrolla.com":{"footer":"developerBrand-footer"},"www.sharepointbriefing.com":{"footer":"developerBrand-footer"},"www.webreference.com":{"footer":"developerBrand-footer"},"www.htmlgoodies.com":{"footer":"developerBrand-footer"},"www.flashkit.com":{"footer":"developerBrand-footer"},"www.jguru.com":{"footer":"developerBrand-footer"},"www.freevbcode.com":{"footer":"developerBrand-footer"},"www.justtechjobs.com":{"footer":"developerBrand-footer"},"www.linuxtoday.justtechjobs.com":{"footer":"developerBrand-footer"},"www.devx.com":{"footer":"developerBrand-footer"},"www.webdeveloper.com":{"footer":"developerBrandForum-footer"},"www.webdeveloper.com/forum/":{"footer":"developerBrandForum-footer"},"www.developer.com":{"footer":"developerBrand-footer"},"forums.justlinux.com":{"footer":"itbeBrandForum-footer"},"e-newsletters.developer.com":{"footer":"developerBrand-footer"},"e-newsletters.itbusinessedge.com":{"footer":"itbeBrand-footer"},"board.phpbuilder.com":{"footer":"developerBrandForum-footer"},"www.itbusinessedge.com":{"footer":"itbusinessedge-footer"},"www.ziffdavisenterprise.com":{"footer":"zde-footer"},"www.baselinemag.com":{"footer":"baseline-footer"},"www.channelinsider.com":{"footer":"cinsider-footer"},"www.cioinsight.com":{"footer":"cioinsight-footer"},"www.eweek.com":{"footer":"eweek-footer"},"www.webbuyersguide.com":{"footer":"wbg-footer"},"e-newsletters.ziffdavisenterprise.com":{"footer":"zde-footer"},"blogs.baselinemag.com":{"footer":"baseline-footer"},"blogs.cioinsight.com":{"footer":"cioinsight-footer"},"www.eseminarslive.com":{"footer":"eseminar-footer"},"sponsored.eweek.com":{"footer":"eweek-footer"}};

var siteURL = window.location;
siteURL = siteURL.toString();
var siteName = window.location.hostname;
siteName = siteName.toLowerCase();
var showBrandFooter = "";
var siteNameArray = "";
var today4Footer = new Date();
for (key in brandFooterArray){
var jsonObj1 = brandFooterArray[key]
    showBrandFooter = jsonObj1.footer;
	if(showBrandFooter!="NoToolbar"){
		if(showBrandFooter=="developerBrandForum-footer" || showBrandFooter=="itbeBrandForum-footer"){
				if(siteName.indexOf(".lampdev.dms.quinstreet.net") >= 0){
					 siteNameArray = siteName.split('.lampdev.dms.quinstreet.net'); 
					 if(siteNameArray[0].indexOf("www.") != 0)
					 siteName  = "www."+siteNameArray[0];
					//console.log("Lampdev site name"+siteName);

				}
			
				// Clean up dev urls
				if ( siteName.indexOf("dev-") >= 0 ) {
					siteNameArray = siteName.split('dev-'); 
					siteName = siteNameArray[1];
				}
				
				// Clean up local urls
				if ( siteName.indexOf("local.") >= 0 ) {
					siteNameArray = siteName.split('local.'); 
					siteName = siteNameArray[1];
				}
				
				if(siteName.indexOf("videos.") < 0 && siteName.indexOf("downloads.") < 0 && siteName.indexOf("forums.") < 0 && siteName.indexOf("discussions.") < 0 && siteName.indexOf("premium.") < 0 && siteName.indexOf("www.") < 0) {
					siteName  = "www."+siteName;
				}
				
				// check siteURL for url forum sites
				if ( siteURL.indexOf("http://") >= 0 ) {
					siteURLArray = siteURL.split('http://'); 
					siteURL  = siteURLArray[1];
				}

				// Clean up dev urls
				if ( siteURL.indexOf("dev-") >= 0 ) {
					siteURLArray = siteURL.split('dev-'); 
					siteURL = siteURLArray[1];
				}

				if(siteURL.indexOf("videos.") < 0 && siteURL.indexOf("downloads.") < 0 && siteURL.indexOf("forums.") < 0 && siteURL.indexOf("discussions.") < 0 && siteURL.indexOf("premium.") < 0  && siteURL.indexOf("www.") < 0) {
					siteURL  = "www."+siteURL;
				}

				domainSearch=new RegExp(key);
				if (domainSearch.test(siteName) == true || domainSearch.test(siteURL) == true){
					document.getElementById(showBrandFooter).style.display="";
					if(showBrandFooter=='itbeBrandForum-footer'){
						document.getElementById(showBrandFooter).innerHTML = '<div id="acceptableusepolicy" style="margin-bottom:5px;"><a rel="nofollow" href="/aup.html" style="color: #000000;">Acceptable Use Policy</a></div><div id="itbeforumlogo"><img src="/icom_includes/footers/img/itbe.gif" border="0" /></div>'+
						'<div id="footercopyright"> Property of Quinstreet Enterprise. </div><div id="footerlinks"><a rel="nofollow" href="/terms">Terms of Service</a> | <a rel="nofollow" href="/licensing">Licensing & Reprints</a> | <a rel="nofollow" href="/privacy">Privacy Policy</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us#contactus" target="_blank">Advertise</a><br>Copyright '+today4Footer.getFullYear()+' QuinStreet Inc. All Rights Reserved.<noscript>Copyright 2014 Quinstreet Inc. All right reserved.<noscript></div>';
					}
					else if(showBrandFooter=='developerBrandForum-footer'){	
						document.getElementById(showBrandFooter).innerHTML = '<div id="acceptableusepolicy" style="margin-bottom:5px;"><a rel="nofollow" href="/aup.html" target="_blank" style="color: #000000;">Acceptable Use Policy</a></div><div id="developerforumlogo"><img src="/icom_includes/footers/img/developer_logo.jpg" border="0" /></div>'+
						'<div id="footercopyright"> Property of Quinstreet Enterprise. </div><div id="footerlinks"><a rel="nofollow" href="/terms">Terms of Service</a> | <a rel="nofollow" href="/licensing">Licensing & Reprints</a> | <a rel="nofollow" href="/privacy">Privacy Policy</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us#contactus" target="_blank">Advertise</a><br>Copyright '+today4Footer.getFullYear()+' QuinStreet Inc. All Rights Reserved.<noscript>Copyright 2014 Quinstreet Inc. All right reserved.<noscript></div>';
					}						
					break;
				}
		}
		else if(showBrandFooter!="developerBrandForum-footer" && showBrandFooter!="itbeBrandForum-footer"){
			domainSearch=new RegExp(key);

			if(siteName.indexOf("downloads.") < 0 && siteName.indexOf("board.") < 0 && siteName.indexOf("forums.") < 0 && siteName.indexOf("blogs.") < 0 && siteName.indexOf("discussions.") < 0 && siteURL.indexOf("/board/") < 0 && siteURL.indexOf("/forum/") < 0 && siteURL.indexOf("/forums/") < 0 && siteName.indexOf(".lampdev.dms.quinstreet.net") >= 0){
				 siteNameArray = siteName.split('.lampdev.dms.quinstreet.net'); 
				 if(siteNameArray[0].indexOf("www.") != 0)
				 siteName  = "www."+siteNameArray[0];
			 }
		
			if(siteName.indexOf("downloads.") < 0 && siteName.indexOf("board.") < 0 && siteName.indexOf("forums.") < 0 && siteName.indexOf("blogs.") < 0 && siteName.indexOf("discussions.") < 0 && siteURL.indexOf("/board/") < 0 && siteURL.indexOf("/forum/") < 0 && siteURL.indexOf("/forums/") < 0 && (siteName.indexOf("dev-") == 0 || siteName.indexOf("js.") == 0 || siteName.indexOf("videos.") == 0)){
			
			if(siteName.indexOf("js.") == 0)
				siteNameArray = siteName.split('js.'); 
			else if(siteName.indexOf("videos.") == 0)
				siteNameArray = siteName.split('videos.'); 
			else
				siteNameArray = siteName.split('dev-'); 
				
				if(siteNameArray[1].indexOf("www.") !=  0){
				 siteName  = "www."+siteNameArray[1];
			   }
			}
			
			if(siteName.indexOf("downloads.") < 0 && siteName.indexOf("board.") < 0 && siteName.indexOf("forums.") < 0 && siteName.indexOf("blogs.") < 0 && siteName.indexOf("discussions.") < 0 && siteURL.indexOf("/board/") < 0 && siteURL.indexOf("/forum/") < 0 && siteURL.indexOf("/forums/") < 0 && siteName.indexOf("dev.") == 0){
				siteNameArray = siteName.split('dev.'); 
				if(siteNameArray[1].indexOf("www.") != 0){
				 siteName  = "www."+siteNameArray[1];
			   }
			}

			if(siteName.indexOf("downloads.") < 0 && siteName.indexOf("board.") < 0 && siteName.indexOf("forums.") < 0 && siteName.indexOf("blogs.") < 0 && siteName.indexOf("discussions.") < 0 && siteURL.indexOf("/board/") < 0 && siteURL.indexOf("/forum/") < 0 && siteURL.indexOf("/forums/") < 0 && siteName.indexOf("local.") == 0){
				siteNameArray = siteName.split('local.'); 
				if(siteNameArray[1].indexOf("www.") != 0){
				 siteName  = "www."+siteNameArray[1];
			   }
			}
			
			if(siteName.indexOf("downloads.") < 0 && siteName.indexOf("board.") < 0 && siteName.indexOf("forums.") < 0 && siteName.indexOf("blogs.") < 0 && siteName.indexOf("discussions.") < 0 && siteURL.indexOf("/board/") < 0 && siteURL.indexOf("/forum/") < 0 && siteURL.indexOf("/forums/") < 0 && siteName.indexOf("cms.") == 0){
				siteNameArray = siteName.split('cms.'); 
				if(siteNameArray[1].indexOf("www.") != 0){
				 siteName  = "www."+siteNameArray[1];
			   }
			}
			
			if(siteName.indexOf("downloads.") < 0 && siteName.indexOf("board.") < 0 && siteName.indexOf("forums.") < 0 && siteName.indexOf("blogs.") < 0 && siteName.indexOf("discussions.") < 0 && siteURL.indexOf("/board/") < 0 && siteURL.indexOf("/forum/") < 0 && siteURL.indexOf("/forums/") < 0){
			   if(siteName.indexOf("www.") != 0){
				 siteName  = "www."+siteName ;
			   }
			}
			
			if (domainSearch.test(siteName) == true){
				if(showBrandFooter!="" || showBrandFooter !="undefined"){
					document.getElementById(showBrandFooter).style.display="";
					if(showBrandFooter=='baseline-footer'){
						document.getElementById(showBrandFooter).innerHTML = '<div><img src="/icom_includes/footers/img/baselinemag.png" border="0" /> </div><div id="footercopyright"> Property of Quinstreet Enterprise. </div><div id="footerlinks"><a rel="nofollow" href="/terms">Terms of Service</a> | <a rel="nofollow" href="/licensing">Licensing & Reprints</a> | <a rel="nofollow" href="/privacy">Privacy Policy</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us#contactus" target="_blank">Advertise</a><br>Copyright '+today4Footer.getFullYear()+' QuinStreet Inc. All Rights Reserved.<noscript>Copyright 2014 Quinstreet Inc. All right reserved.<noscript></div>';	
					}
					else if(showBrandFooter=='wbg-footer'){
						document.getElementById(showBrandFooter).innerHTML = '<div><img src="/icom_includes/footers/img/wbg.png" border="0" /></div><div id="footercopyright"> Property of Quinstreet Enterprise. </div><div id="footerlinks"><a rel="nofollow" href="/terms">Terms of Service</a> | <a rel="nofollow" href="/licensing">Licensing & Reprints</a> | <a rel="nofollow" href="/privacy">Privacy Policy</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us#contactus" target="_blank">Advertise</a><br>Copyright '+today4Footer.getFullYear()+' QuinStreet Inc. All Rights Reserved.<noscript>Copyright 2014 Quinstreet Inc. All right reserved.<noscript></div>';	
					}
					else if(showBrandFooter=='eweek-footer'){		
						document.getElementById(showBrandFooter).innerHTML = '<div><img src="/icom_includes/footers/img/eweek.png" border="0" /></div><div id="footercopyright"> Property of Quinstreet Enterprise. </div><div id="footerlinks"><a rel="nofollow" href="/terms">Terms of Service</a> | <a rel="nofollow" href="/licensing">Licensing & Reprints</a> | <a rel="nofollow" href="/privacy">Privacy Policy</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us#contactus" target="_blank">Advertise</a><br>Copyright '+today4Footer.getFullYear()+' QuinStreet Inc. All Rights Reserved.<noscript>Copyright 2014 Quinstreet Inc. All right reserved.<noscript></div>';	
					}
					else if(showBrandFooter=='cioinsight-footer'){		
						document.getElementById(showBrandFooter).innerHTML = '<div><img src="/icom_includes/footers/img/cioinsight.png" border="0" /></div><div id="footercopyright"> Property of Quinstreet Enterprise. </div><div id="footerlinks"><a rel="nofollow" href="/terms">Terms of Service</a> | <a rel="nofollow" href="/licensing">Licensing & Reprints</a> | <a rel="nofollow" href="/privacy">Privacy Policy</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us#contactus" target="_blank">Advertise</a><br>Copyright '+today4Footer.getFullYear()+' QuinStreet Inc. All Rights Reserved.<noscript>Copyright 2014 Quinstreet Inc. All right reserved.<noscript></div>';	
					}
					else if(showBrandFooter=='cinsider-footer'){		
						document.getElementById(showBrandFooter).innerHTML = '<div><img src="/icom_includes/footers/img/cioinsider.png" border="0" /></div><div id="footercopyright"> Property of Quinstreet Enterprise. </div><div id="footerlinks"><a rel="nofollow" href="/terms">Terms of Service</a> | <a rel="nofollow" href="/licensing">Licensing & Reprints</a> | <a rel="nofollow" href="/privacy">Privacy Policy</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us#contactus" target="_blank">Advertise</a><br>Copyright '+today4Footer.getFullYear()+' QuinStreet Inc. All Rights Reserved.<noscript>Copyright 2014 Quinstreet Inc. All right reserved.<noscript></div>';	
					}	
					else if(showBrandFooter=='zde-footer'){		
						document.getElementById(showBrandFooter).innerHTML = '<div><img src="/icom_includes/footers/img/zde.png" border="0" /></div><div id="footercopyright"> Property of Quinstreet Enterprise. </div><div id="footerlinks"><a rel="nofollow" href="/terms">Terms of Service</a> | <a rel="nofollow" href="/licensing">Licensing & Reprints</a> |'+
					' <a rel="nofollow" href="http://quinstreetenterprise.com/about_us" target="_blank">About Us</a> |  <a rel="nofollow" href="/privacy">Privacy Policy</a>  | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us#contactus" target="_blank">Advertise</a><br>Copyright '+today4Footer.getFullYear()+' QuinStreet Inc. All Rights Reserved.<noscript>Copyright 2014 Quinstreet Inc. All right reserved.<noscript></div>';	
					}
					else if(showBrandFooter=='enterpriseappstoday-footer'){		
						document.getElementById(showBrandFooter).innerHTML = '<div id="itbelogo"><img src="/icom_includes/footers/img/itbe.gif" border="0" /></div><div id="footercopyright"> Property of Quinstreet Enterprise. </div><div id="footerlinks"><a rel="nofollow" href="/terms">Terms of Service</a> | <a rel="nofollow" href="/licensing">Licensing & Reprints</a> | <a rel="nofollow" href="/about-us">About Us</a> |  <a rel="nofollow" href="/privacy">Privacy Policy</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us#contactus" target="_blank">Advertise</a><br>Copyright '+today4Footer.getFullYear()+' QuinStreet Inc. All Rights Reserved.<noscript>Copyright 2014 Quinstreet Inc. All right reserved.<noscript></div>';	
					}	
					else if(showBrandFooter=='eseminar-footer'){		
						document.getElementById(showBrandFooter).innerHTML = '<div><a rel="nofollow" href="http://www.eseminarslive.com" target="_blank"><img src="/icom_includes/footers/img/eseminarslive.png" border="0" /></a></div><div id="footercopyright"> Property of Quinstreet Enterprise. </div><div id="footerlinks"><a rel="nofollow" href="/terms">Terms of Service</a> | <a rel="nofollow" href="/licensing">Licensing & Reprints</a> | <a rel="nofollow" href="/privacy">Privacy Policy</a>  | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us#contactus" target="_blank">Advertise</a><br>Copyright '+today4Footer.getFullYear()+' QuinStreet Inc. All Rights Reserved.<noscript>Copyright 2014 Quinstreet Inc. All right reserved.<noscript></div>';	
					}					
					else if(showBrandFooter=='developerBrand-footer'){	
						document.getElementById(showBrandFooter).innerHTML = '<div id="developerlogo"><img src="/icom_includes/footers/img/developer_logo.jpg" border="0" /></div><div id="footercopyright"> Property of Quinstreet Enterprise. </div><div id="footerlinks"><a rel="nofollow" href="/terms">Terms of Service</a> | <a rel="nofollow" href="/licensing">Licensing & Reprints</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us" target="_blank">About Us</a> | <a rel="nofollow" href="/privacy">Privacy Policy</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us#contactus" target="_blank">Advertise</a><br>Copyright '+today4Footer.getFullYear()+' QuinStreet Inc. All Rights Reserved.<noscript>Copyright 2014 Quinstreet Inc. All right reserved.<noscript></div>';	
					}
					else if(showBrandFooter=='itbeBrandForum-footer'){	
						document.getElementById(showBrandFooter).innerHTML = '<div id="acceptableusepolicy" style="margin-bottom:5px;color: #000000;"><a rel="nofollow" href="/aup.html" style="color: #000000;">Acceptable Use Policy</a></div><div id="itbeforumlogo"><img src="/icom_includes/footers/img/itbe.gif" border="0" /></div>'+
						'<div id="footercopyright"> Property of Quinstreet Enterprise. </div><div id="footerlinks"><a rel="nofollow" href="/terms">Terms of Service</a> | <a rel="nofollow" href="/licensing">Licensing & Reprints</a> | <a rel="nofollow" href="/privacy">Privacy Policy</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us#contactus" target="_blank">Advertise</a><br>Copyright '+today4Footer.getFullYear()+' QuinStreet Inc. All Rights Reserved.<noscript>Copyright 2014 Quinstreet Inc. All right reserved.<noscript></div>';
					}
					else if(showBrandFooter=='developerBrandForum-footer'){	
						document.getElementById(showBrandFooter).innerHTML = '<div id="acceptableusepolicy" style="margin-bottom:5px;"><a rel="nofollow" href="/aup.html" target="_blank" style="color: #000000;">Acceptable Use Policy</a></div><div id="developerforumlogo"><img src="/icom_includes/footers/img/developer_logo.jpg" border="0" /></div>'+
						'<div id="footercopyright"> Property of Quinstreet Enterprise. </div><div id="footerlinks"><a rel="nofollow" href="/terms">Terms of Service</a> | <a rel="nofollow" href="/licensing">Licensing & Reprints</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us" target="_blank">About Us</a> | <a rel="nofollow" href="/privacy">Privacy Policy</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us#contactus" target="_blank">Advertise</a><br>Copyright '+today4Footer.getFullYear()+' QuinStreet Inc. All Rights Reserved.<noscript>Copyright 2014 Quinstreet Inc. All right reserved.<noscript></div>';
					}	
					else if(showBrandFooter=='itbusinessedge-footer'){		
						document.getElementById(showBrandFooter).innerHTML = '<div id="itbelogo"><img src="/icom_includes/footers/img/itbe.gif" border="0" /></div><div id="footercopyright"> Property of Quinstreet Enterprise. </div><div id="footerlinks"><a rel="nofollow" href="http://www.itbusinessedge.com/sitemap/">Sitemap</a> | <a rel="nofollow" href="/terms">Terms of Service</a> | <a rel="nofollow" href="/licensing">Licensing & Reprints</a> |'+
					' <a rel="nofollow" href="http://quinstreetenterprise.com/about_us" target="_blank">About Us</a> |  <a rel="nofollow" href="/privacy">Privacy Policy</a>  | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us#contactus" target="_blank">Advertise</a><br>Copyright '+today4Footer.getFullYear()+' QuinStreet Inc. All Rights Reserved.<noscript>Copyright 2014 Quinstreet Inc. All right reserved.<noscript></div>';	
					}
					else{
						document.getElementById("itbeBrand-footer").innerHTML = '<div id="itbelogo"><img src="/icom_includes/footers/img/itbe.gif" border="0" /></div><div id="footercopyright"> Property of Quinstreet Enterprise. </div><div id="footerlinks"><a rel="nofollow" href="/terms">Terms of Service</a> | <a rel="nofollow" href="/licensing">Licensing & Reprints</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us" target="_blank">About Us</a> |  <a rel="nofollow" href="/privacy">Privacy Policy</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us#contactus" target="_blank">Advertise</a><br>Copyright '+today4Footer.getFullYear()+' QuinStreet Inc. All Rights Reserved.<noscript>Copyright 2014 Quinstreet Inc. All right reserved.<noscript></div>';	
					}
				}else{
				    document.getElementById("itbeBrand-footer").style.display="";
				   	document.getElementById("itbeBrand-footer").innerHTML = '<div id="itbelogo"><img src="/icom_includes/footers/img/itbe.gif" border="0" /></div><div id="footercopyright"> Property of Quinstreet Enterprise. </div><div id="footerlinks"><a rel="nofollow" href="/terms">Terms of Service</a> | <a rel="nofollow" href="/licensing">Licensing & Reprints</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us" target="_blank">About Us</a> | <a rel="nofollow" href="/privacy">Privacy Policy</a> | <a rel="nofollow" href="http://quinstreetenterprise.com/about_us#contactus" target="_blank">Advertise</a><br>Copyright '+today4Footer.getFullYear()+' QuinStreet Inc. All Rights Reserved.<noscript>Copyright 2014 Quinstreet Inc. All right reserved.<noscript></div>';		
				}
				break;
			}
		}
	}
	
}
