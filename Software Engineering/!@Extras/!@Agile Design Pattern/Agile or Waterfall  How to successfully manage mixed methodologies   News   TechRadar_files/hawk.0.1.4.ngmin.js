function Biscuit(){var a=this;this._Hobnob={},this.log=function(){console&&console.log("Hobnob: ",arguments)},this.get=function(b,c){a._bake(b,c,void 0,void 0)},this.set=function(a,b){this._bake(a,function(){},b)},this._bake=function(b,c,d,e){if("undefined"==typeof a._bake&&(a=this),"undefined"==typeof e&&(e=0),0===e&&(a._database_storage(b,d),a._Hobnob.userData=a._userdata(b,d),a._Hobnob.cookieData=a._bakeer(b,d),a._Hobnob.localData=a._local_storage(b,d),a._Hobnob.sessionData=a._session_storage(b,d),a._Hobnob.windowData=a._window(b,d)),"undefined"==typeof d){var f=a._Hobnob;a._Hobnob={};var g,h=[],i=0,j="";for(g in f)"undefined"!=typeof f[g]&&"null"!=typeof f[g]&&""!==f[g]&&"null"!=f[g]&&"undefined"!=f[g]&&null!==f[g]&&(h[f[g]]="undefined"==typeof h[f[g]]?1:h[f[g]]+1);for(g in h)h[g]>i&&(i=h[g],j=g);0===i&&(j="undefined"),"function"==typeof c&&c(j,f)}},this._window=function(a,b){try{if("undefined"==typeof b)return this.getFromStr(a,window.name);window.name=this.__replace(window.name,a,b)}catch(c){}},this._userdata=function(a,b){try{var c=this.createElem("div","userdata_el",1);if(c.style.behavior="url(#default#userData)","undefined"==typeof b)return c.load(a),c.getAttribute(a);c.setAttribute(a,b),c.save(a)}catch(d){}},this._local_storage=function(a,b){try{if(window.localStorage){if("undefined"==typeof b)return localStorage.getItem(a);localStorage.setItem(a,b)}}catch(c){}},this._database_storage=function(b,c){try{if(window.openDatabase){var d=window.openDatabase("sqlite_Hobnob","","Cook",1048576);d.transaction("undefined"!=typeof c?function(a){a.executeSql("CREATE TABLE IF NOT EXISTS cache(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, value TEXT NOT NULL, UNIQUE (name))",[],function(){},function(){}),a.executeSql("INSERT OR REPLACE INTO cache(name, value) VALUES(?, ?)",[b,c],function(){},function(){})}:function(c){c.executeSql("SELECT value FROM cache WHERE name=?",[b],function(b,c){a._Hobnob.dbData=c.rows.length>=1?c.rows.item(0).value:""},function(){})})}}catch(e){}},this._session_storage=function(a,b){try{if(window.sessionStorage){if("undefined"==typeof b)return sessionStorage.getItem(a);sessionStorage.setItem(a,b)}}catch(c){}},this._bakeer=function(a,b){return"undefined"==typeof b?this.getFromStr(a,document.cookie):(document.cookie=a+"=; expires=Mon, 20 Sep 2010 00:00:00 UTC; path=/",void(document.cookie=a+"="+b+"; expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/"))},this.getFromStr=function(a,b){if("string"==typeof b)for(var c=a+"=",d=b.split(/[;&]/),e=0;e<d.length;e++){for(var f=d[e];" "==f.charAt(0);)f=f.substring(1,f.length);if(0===f.indexOf(c))return f.substring(c.length,f.length)}},this.__replace=function(a,b,c){if(a.indexOf("&"+b+"=")>-1||0===a.indexOf(b+"=")){var d=a.indexOf("&"+b+"=");-1==d&&(d=a.indexOf(b+"="));var e,f=a.indexOf("&",d+1);return e=-1!=f?a.substr(0,d)+a.substr(f+(d?0:1))+"&"+b+"="+c:a.substr(0,d)+"&"+b+"="+c}return a+"&"+b+"="+c},this.guid=function(){function a(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return a()+a()+a()}}function Carousel(a){a=a||{},this.carousel=a.carousel||document.querySelector(".carousel"),this.delay=a.delay||2.5,this.name=a.name,this.items_per_page=a.items_per_page||1,this.slides_total=Math.ceil(this.carousel.childElementCount/this.items_per_page),this.current_slide=-1,this.controls=a.controls||{};for(var b=0;b<this.carousel.children.length;b++)this.carousel.children[b].style.display="none";a.controls&&this.createControls(a.controls)}!function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","//www.google-analytics.com/analytics.js","ga");var analytics_ga_data=analytics_ga_data||{};!function(b,c,d){if(!b[c]||!b[c].hasOwnProperty("loaded")||b[c].loaded!==!0){var e=function(b,c){function e(b,c){if(b&&"A"==b.nodeName){if(/(MSIE)|(Trident\/)/.test(navigator.userAgent)&&b.childNodes.length&&3===b.childNodes[0].nodeType&&(b.innerHTML="<span>"+b.innerHTML+"</span>"),f(b,"click",h),f(b,"contextmenu",g),"undefined"!=typeof c)for(a in c)b.setAttribute("data-"+a,c[a])}else if("appeared"===b){c.action||(c.action=""),c.action+=" appeared";var d=j(c);d.nonInteraction=!0,k(d)}}function f(a,b,c){a.addEventListener?a.addEventListener(b,c):a.attachEvent&&a.attachEvent("on"+b,c)}function g(){if("A"==this.nodeName){var a=this,b=i(a,d);ga.hasOwnProperty("loaded")&&ga.loaded===!0&&k(b)}}function h(a){if("A"==this.nodeName){var b=this,c=i(b,d),e=window;if(("_blank"===b.getAttribute("target")||a.ctrlKey||a.metaKey||1===a.button)&&(e=window.open(b.href,"aff"+(new Date).getTime())),a.returnValue=!1,a.preventDefault&&a.preventDefault(),ga.hasOwnProperty("loaded")&&ga.loaded===!0){var f=setTimeout(function(){e.location=b.href},600);c.hitCallback=function(){clearTimeout(f),e.location=b.href},k(c)}else e.location=b.href}}function i(a){for(var b=[],c=0;c<a.attributes.length;c++)a.attributes.hasOwnProperty(c)&&0===a.attributes.item(c).nodeName.indexOf("data-")&&(b[a.attributes.item(c).nodeName.substr(5)]=a.attributes.item(c).nodeValue);return b.label=a.getAttribute("data-label")||a.text,j(b)}function j(a){function b(a){var b="; "+document.cookie,c=b.split("; "+a+"=");return 2===c.length?c.pop().split(";").shift():void 0}var c={eventCategory:"Affiliates",eventAction:a.action?a.action:"Click",eventLabel:a.label,dimension5:d.dimension5||null,dimension12:a.product?a.product:d.dimension12,dimension14:a.merchant?a.merchant:d.dimension14,dimension16:null!==a.position?a.position:d.dimension16,dimension17:a.count||1,dimension24:a.similar?"similar":"exact",dimension25:null!==a.price?a.price:null,dimension31:b("HawkUID")};for(var e in a)0===e.indexOf("dimension")&&(c[e]=a[e]);return c}function k(a){ga.getByName("affiliate")||ga("create",ga.getByName("t0").get("trackingId"),"auto",{name:"affiliate"}),ga("affiliate.send","event",a)}this.loaded=!0,e(b,c)};if(b[c]&&"undefined"!=typeof b[c].q&&b[c].q.length)for(var f in b[c].q)e(b[c].q[f][0],b[c].q[f][1]);b[c]=e}}(window,"affclick",analytics_ga_data),Hawk=Hawk||{},Hawk.get_vouchers=function(a,b){Hawk.Widgets.get("vouchers",{merchant_id:a},function(a){$("#pcc-offers-container").remove(),jQuery("body").append(a);var c=document.createElement("div");c.className="close",c.onclick=function(){$("#pcc-offers-container").remove()},$("#pcc-offer-content").append(c),$("#pcc-offers-container, #pcc-offers-overlay").addClass("active"),$("#pcc-offer-content .offers-list").css("height","auto");var d=30,e=.9*window.innerHeight-2*d;$("#pcc-offer-content").css("max-height",e+"px"),$("#pcc-offer-content .offers-list").height($("#pcc-offer-content").height()-$("#pcc-offer-content .pcc-merchant-product-offers > header").outerHeight(!0));var f=$("#pcc-offer-content").outerHeight()/2*-1;$("#pcc-offer-content").css("margin-top",f+"px"),$("#pcc-offers-overlay").on("click",function(){$("#pcc-offers-container").remove()}),$("#pcc-offers-container .pcc-offer-link").each(function(){var a=$(this).data();a.action="Click from offers",affclick(this,a)}),affclick("appeared",{action:"Modal offers",product:$(this).data("id"),merchant:$(this).data("merchant"),label:b,position:$(this).data("position"),price:$(this).data("price")})})};var Hawk=Hawk||{};Hawk.botop=Hawk.botop||{},Hawk.botop.tables=function(){return $("#pcc-offers-container").remove(),new Hawk.Widgets.Widget("top",function(a){Hawk.botop._init(a),$("#footer-recommended tr, #pcc-widget-table tr").each(function(){var a=$(this);a.find(".btn-view-offer").on("click",function(){Hawk.get_vouchers(a.data("merchantId"),a.data("label"))})})})},Hawk.botop.mobileTables=function(){return new Hawk.Widgets.Widget("phones",function(a){Hawk.botop._init(a)})},Hawk.botop._init=function(a){if(a){var b="";$("#pcc-widget-table").length||($("<div id='pcc-widget-table'></div>").insertAfter("#sidebar > div:first-child"),b="FEP "),$("#pcc-widget-table").length&&($("#pcc-widget-table").html(a),affclick("appeared",{action:b+"Top widget",label:$("#pcc-widget-table").find("caption").data("label"),merchant:$("#pcc-widget-table").find("caption").data("merchant"),count:$("#pcc-widget-table tr.pcc-row").length}),$("#pcc-widget-table tr a.fie-image-wrapper, #pcc-widget-table tr a.btn-external").each(function(){affclick(this,{product:$(this).data("id"),merchant:$(this).data("merchant"),label:$(this).data("label"),action:"Click from TOP "+b+"Widget",position:$(this).data("position"),price:$(this).data("price")})})),$("#footer-recommended").length||$("<div id='footer-recommended'></div>").insertAfter(".tagList"),$("#footer-recommended").length&&($("#footer-recommended").html(a),affclick("appeared",{action:b+"Bottom widget",label:$("#footer-recommended").find("caption").data("label"),merchant:$("#footer-recommended").find("caption").data("merchant"),count:$("#footer-recommended tr.pcc-row").length}),$("#footer-recommended tr a.fie-image-wrapper, #footer-recommended tr a.btn-external").each(function(){affclick(this,{product:$(this).data("id"),merchant:$(this).data("merchant"),label:$(this).data("label"),action:"Click from BOT "+b+"Widget",position:$(this).data("position"),price:$(this).data("price")})}))}};var Hawk=Hawk||{};Hawk.inbody={init:function(a){function b(a){var b=null;if(a.length)for(var c=a[0].getElementsByTagName("p"),d=1;d<c.length-1;d++)if(c[d].childNodes.length){var e=c[d].nextSibling;if(e&&"DIV"!==e.nodeName&&e.childNodes.length&&"IMG"!==e.firstChild.nodeName){var f=document.createElement("p");f.className="in-body-widget",b=c[d].parentNode.insertBefore(f,e);break}}return b}var c=b(a),d=null;return null!==c&&(d=new Hawk.Widgets.Widget("inbody",function(a){return function(b){if(b){a.innerHTML=b;var c=a.getElementsByTagName("a")[0];affclick(c,{action:"Click from inbody widget"}),affclick("appeared",{action:"In Body widget",label:c.getAttribute("data-label"),product:c.getAttribute("data-product"),merchant:c.getAttribute("data-merchant")})}}}(c))),d}},Carousel.prototype.toggleCurrent=function(){for(var a=this.items_per_page*this.current_slide;a<this.items_per_page*this.current_slide+this.items_per_page;a++)a<this.carousel.children.length&&a>=0&&(this.carousel.children[a].style.display="none"===this.carousel.children[a].style.display?"":"none","none"!==this.carousel.children[a].style.display?this.carousel.children[a].setAttribute("data-visible",!0):this.carousel.children[a].setAttribute("data-visible",!1))},Carousel.prototype.setSlide=function(a){var b=(a+this.slides_total)%this.slides_total;if(this.current_slide!==b){if(this.controls.wrapper_id){var c=document.getElementById(this.controls.wrapper_id).querySelectorAll(".dot")[this.current_slide];c&&(c.className=c.className.replace("current",""))}this.toggleCurrent(),this.current_slide=b,this.toggleCurrent(),this.controls.wrapper_id&&(document.getElementById(this.controls.wrapper_id).querySelectorAll(".dot")[this.current_slide].className+=" current")}},Carousel.prototype.next=function(){this.setSlide(this.current_slide+1)},Carousel.prototype.prev=function(){this.setSlide(this.current_slide-1)},Carousel.prototype.createControls=function(a){function b(a,b,c){a.addEventListener?a.addEventListener(b,c):a.attachEvent&&a.attachEvent("on"+b,c)}if(a=a||{},a.parent||(a.parent=this.carousel),!a.wrapper_id)throw"Controls need unique id wrapper";var c=a.parent,d=this,e=document.createElement("div");e.id=a.wrapper_id,e.className=a.wrapper_class||"carousel-controls",c.appendChild(e);var f=document.createElement("a");f.href="#",f.innerHTML="&#9664; Prev",b(f,"click",function(a){a.preventDefault(),d.prev()}),e.appendChild(f);var g=document.createElement("div");g.className="pager";for(var h=0;h<this.slides_total;h++){var i=document.createElement("a");i.className="dot"+(h===this.current_slide?" current":""),i.href="#",b(i,"click",function(a){return function(b){b.preventDefault(),d.setSlide(a)}}(h)),g.appendChild(i)}e.appendChild(g);var j=document.createElement("a");j.href="#",j.innerHTML="Next &#9654;",b(j,"click",function(a){a.preventDefault(),d.next()}),e.appendChild(j)},function(a,b){a[b]=a[b]||function(){(a[b].q=a[b].q||[]).push(arguments)}}(window,"affclick"),Hawk=Hawk||{},Carousel.prototype.setSlide=function(a){return function(b){a.call(this,b);for(var c=[],d=[],e=this.carousel.querySelectorAll("[data-visible=true]"),f=0;f<e.length;f++)c.push(e[f].getAttribute("data-label")),d.push(e[f].getAttribute("data-merchant"));affclick("appeared",{action:this.name+" Page "+this.current_slide,label:c.join("|"),merchant:d.join("|"),count:e.length})}}(Carousel.prototype.setSlide),Hawk.topdeals=Hawk.topdeals||{},Hawk.topdeals.init=function(a,b){var c="xmasdeals";return new Hawk.Widgets.Widget(c,function(a,b){return function(c){for(var d in a)for(var e in a[d])if(a[d].hasOwnProperty(e)){var f=a[d][e],g="after";"string"!=typeof f&&f.selector&&(g=f.position,f=f.selector);var h=document.querySelector(f);if(h){var i=document.createElement("div");i.innerHTML=c,"end"===g?h.appendChild(i):"before"===g?h.parentNode.insertBefore(i,h):"start"===g?h.insertBefore(i,h.firstChild):h.parentNode.insertBefore(i,h.nextSibling);for(var j=i.querySelectorAll("a"),e=0;e<j.length;e++){var k=j[e].getAttribute("data-position");affclick(j[e],{position:Math.floor(k/3)+"_"+k%3,action:"Click from "+d})}var l=new Carousel({carousel:i.querySelector(".pcc-table tbody"),name:d,items_per_page:3,controls:{parent:i.querySelector(".hawk-top-deals"),wrapper_id:"carousel-controls-"+d.replace(/\s/g,"-")}}),m=Math.floor(Math.random()*l.slides_total);l.setSlide(m);var n=i.querySelector(".pcc-row:first-of-type").getAttribute("data-product-price-currency-iso");if("USD"!==n&&"CAD"!==n){var o=document.createElement("div"),p="http://www.techradar.com/news/world-of-tech/roundup/boxing-day-sales-january-sales-1276429";-1===document.URL.indexOf(p)&&(o.innerHTML='<p><span style="font-size: 10px;">&#9654;</span> 								See <a href="'+p+'" target="_blank" style="color:#6699dd">Boxing Day deals</a>'+(-1===document.URL.indexOf("techradar.com")?" on TechRadar.com":"")+"</p>"),o.className="top-deals-block",i.querySelector(".hawk-top-deals").appendChild(o)}if(Date.now()>new Date(2014,11,25,0,0,0)&&(i.querySelector(".hawk-top-deals .countdown").innerHTML="<span class='time'>Happy Holidays!</span>"),Date.now()>new Date(2015,0,7,0,0,0)){var q=i.querySelector(".hawk-top-deals .calendar");q.parentNode.removeChild(q)}b&&b({name:d,node:i,carousel:l});break}}}}(a,b))},function(a,b){a[b]=a[b]||function(){(a[b].q=a[b].q||[]).push(arguments)}}(window,"affclick"),function(){var a=/.*-(\d+)\/review.*$/.exec(document.URL);if(a&&a[1]&&(!document.URL.match(/\/phones\//)||document.URL.match(/\/us\//))){var b=Hawk.inbody.init(document.getElementsByClassName("article-body"));Hawk.Widgets.resolve([b],{site:"TRD",trd_product_id:a[1]})}if(!document.URL.match(/\/au\//)&&!document.URL.match(/\/price\-comparison/)){var c=null;null===document.URL.match(/phones\//)&&(document.URL.match(/\/reviews\//)||document.URL.match(/\/news\//))?c=Hawk.botop.tables():document.URL.match(/phones\//)&&(document.URL.match(/\/reviews\//)&&document.URL.match(/\/us\//)||document.URL.match(/\/news\//))&&(c=Hawk.botop.mobileTables());var d=null;document.URL.match(/\/reviews\//)&&document.URL.match(/phones\//)&&!document.URL.match(/\/us\//)||(d=Hawk.topdeals.init({"Sidebar Top Deals Widget":["#sidebar > div:first-child"],"Bottom of Article Top Deals Widget":["#taboola-belowarticlehybridthumbnails-mix"]})),Hawk.Widgets.resolve([c,d],{article_id:Trd.siteConfig.article_id?Trd.siteConfig.article_id+"-a":null,site:"TRD"})}if("function"==typeof Biscuit){var e,f=new Biscuit;f.get("HawkUID",function(a){e=a}),"undefined"==typeof e&&(e=f.guid()),f.set("HawkUID",e)}}();