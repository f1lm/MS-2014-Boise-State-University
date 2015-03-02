Portal.Search=$H({DropDowns:$H({}),Country:$H({1:"Netherlands",2:"Bulgaria",3:"Austria",4:"Belgium",5:"Cyprus",6:"Denmark",7:"Czech_Republic",8:"Estonia",9:"Finland",10:"France",11:"Germany",12:"Hungary",13:"Iceland",14:"Ireland",15:"Italy",16:"Latvia",17:"Lithuania",18:"Macedonia",19:"Norway",20:"Poland",21:"Portugal",22:"Russia",23:"Serbia",24:"Spain",25:"Greece",26:"Sweden",27:"Switzerland",28:"Turkey",29:"Ukraine",30:"United_Kingdom",31:"Slovenia",33:"Romania",34:"Luxembourg",35:"Malta",36:"Monaco",37:"Moldova",38:"Croatia",39:"Montenegro",40:"Bosnia",41:"Slovakia",42:"Albania",43:"Isle_of_Man",44:"Andorra",45:"Belarus",46:"Faroe_Islands",47:"Liechtenstein",48:"San_Marino"}),Region:$H({1:"Greater_Europe",2:"European_Union",3:"Southern_Europe",4:"Eastern_Europe",5:"Greater_Europe",6:"Northern_Western_Europe",7:"Northern_Europe",8:"Western_Europe"}),DisciplineIcons:$H({12:"Applied_Sciences",23:"Business_Economics",7:"Engineering_Technology",117:"Environmental_Sciences",9:"Humanities_Art",6:"Law",10:"Life_Sciences",11:"Natural_Sciences",13:"Social_Sciences"}),initSearch:function(){this.elTabs=$("SearchTabs");this.searchTabs=$("SearchTabs").getElements("li");this.BasicTab=$("BasicTab");this.AdvancedTab=$("AdvancedTab");this.CountryTab=$("CountryTab");this.DisciplineTab=$("DisciplineTab");this.elSearchContent=$("SearchContent");this.elSearchWrapper=$$(".SearchWrapper");this.BasicSearch=$("SearchBasic");this.AdvancedSearch=$("SearchAdvanced");this.CountrySearch=$("SearchCountry");this.DisciplineSearch=$("SearchDisciplines");if($("dd_min_duration").getSelected()[0].get("value")>0){this.setMinimalMaximum($("dd_min_duration").getSelected()[0].get("value"))}$("dd_min_duration").addEvent("change",function(f){Portal.Search.setMinimalMaximum(f.target.getSelected()[0].get("value"))});this.SearchTable=$$(".SearchTable");this.SubmitColumn=$("submitColumn");this.HideAdvanced=$$(".HideAdvanced");this.HideBasic=$$(".HideBasic");Portal.Search.PortalType=$("PortalType").get("text");if(!Portal.Search.PortalType){Portal.Search.PortalType="master"}this.IconContainer=$$("div.IconContainer");this.BasicTab.addEvent("click",this.setState.bind(this,"Basic"));this.AdvancedTab.addEvent("click",this.setState.bind(this,"Advanced"));this.CountryTab.addEvent("click",this.setState.bind(this,"Country"));this.DisciplineTab.addEvent("click",this.setState.bind(this,"Discipline"));this.moveFX=new Fx.Tween(this.elSearchContent,{property:"height",duration:1000,link:"cancel",transition:Fx.Transitions.Quart.easeInOut,onComplete:(function(){switch(this.state){case"Basic":this.elSearchWrapper.setStyle("display","none");this.BasicSearch.setStyle("display","block");this.BasicSearch.setStyle("visibility","visible");this.DropDowns.subdiscipline.setStyle("visibility","hidden");break;case"Advanced":this.elSearchWrapper.setStyle("display","none");this.BasicSearch.setStyle("display","block");this.BasicSearch.setStyle("visibility","visible");this.AdvancedSearch.setStyle("display","block");this.AdvancedSearch.setStyle("visibility","visible");this.DropDowns.subdiscipline.setStyle("visibility","visible");this.SubmitColumn.setStyle("display","none");break;case"Country":this.elSearchWrapper.setStyle("display","none");this.CountrySearch.setStyle("display","block");this.CountrySearch.setStyle("visibility","visible");this.DropDowns.subdiscipline.setStyle("visibility","visible");break;case"Discipline":this.elSearchWrapper.setStyle("display","none");this.DisciplineSearch.setStyle("display","block");this.DisciplineSearch.setStyle("visibility","visible");this.DropDowns.subdiscipline.setStyle("visibility","visible");this.IconContainer.addClass("DiscIconBackground");if($$("ul.BigBox")){$$("ul.BigBox").setStyle("visibility","visible")}break}}).bind(this)});this.BasicSearch.setStyle("visibility","visible");this.BasicSearch.addClass("BasicStyles");this.HideAdvanced.setStyle("display","none");this.SearchTable.addClass("BasicTable");this.DropDowns.discipline=new DropDown("dd_disciplines");this.DropDowns.subdiscipline=new DropDown("dd_subdisciplines");this.DropDowns.discipline.addEvent("change",this.ajaxRequest.bind(this,[this.DropDowns.discipline,this.DropDowns.subdiscipline]));this.DropDowns.regions=new DropDown("dd_regions");this.DropDowns.countries=new DropDown("dd_countries");this.DropDowns.degrees=new DropDown("dd_degrees");this.DropDowns.min_duration=new DropDown("dd_min_duration");this.DropDowns.max_duration=new DropDown("dd_max_duration");this.DropDowns.regions.addEvent("change",this.ajaxRequest.bind(this,[this.DropDowns.regions,this.DropDowns.countries]));this.DropDowns.languages=new DropDown("dd_languages");this.checkDropdown();if(Browser.Engine.webkit&&$("SearchAdvanced")){$("SearchAdvanced").getElement("table").setStyle("table-layout","auto")}$$("ul.CountryPicker a").each(function(f){Portal.truncate(f,18);f.addEvent("mouseenter",function(){var j=f.getProperty("id").replace("country_","");var g=Portal.Search.Country.get(j);var h=$("EuropeImg");var k=h.getProperty("src");var m=k.substring(k.lastIndexOf("."),k.length);var l=k.replace(m,"_"+g+m);l=l.replace("Europe_",Portal.Search.PortalType+"/Europe_");if(g!=null){h.setProperty("src",l)}});f.addEvent("mouseleave",function(){var g=$("EuropeImg");var h=Portal.Search.searchurl+"Images/Europe.png";var j=h.substring(h.lastIndexOf("."),h.length);g.setProperty("src",h)});Portal.Search.SetLink(f)});$$("area.Country").each(function(f){f.addEvent("mouseenter",function(){var l=f.getProperty("id").replace("Map_","");Portal.Search.Country.each(function(p,o){if(l==p){CountryId=o}});var j=$("EuropeImg");var k=j.getProperty("src");var n=k.substring(k.lastIndexOf("."),k.length);var h=$("country_"+CountryId);var g=Portal.Search.Country.get(CountryId);var n=k.substring(k.lastIndexOf("."),k.length);var m=k.replace(n,"_"+g+n);m=m.replace("Europe_",Portal.Search.PortalType+"/Europe_");j.setProperty("src",m);h.addClass("CountryHover")});f.addEvent("mouseleave",function(){var k=f.getProperty("id");var h=$("EuropeImg");var j=Portal.Search.searchurl+"Images/Europe.png";var l=j.substring(j.lastIndexOf("."),j.length);var g=$$("ul.CountryPicker a");h.setProperty("src",j);g.removeClass("CountryHover")})});$$("ul.RegionPicker a").each(function(f){f.addEvent("mouseenter",function(){var g=f.getProperty("id").replace("region_","");var j=Portal.Search.Region.get(g);var h=$("EuropeImg");var k=h.getProperty("src");var m=k.substring(k.lastIndexOf("."),k.length);var l=k.replace(m,"_"+j+m);l=l.replace("Europe_",Portal.Search.PortalType+"/Europe_");h.setProperty("src",l)});f.addEvent("mouseleave",function(){var g=$("EuropeImg");var h=Portal.Search.searchurl+"Images/Europe.png";var j=h.substring(h.lastIndexOf("."),h.length);g.setProperty("src",h)})});Portal.Search.randomImage();Portal.Search.randomImage.periodical(500000);var c=$$("ul.DisciplineBox");c.each(function(j){var f=j.getElement("span").getProperty("title").toInt();var h=j.getElement("div.IconContainer");var g=Portal.Search.DisciplineIcons.get(f);h.addClass(g);j.getElements("ul li a").each(function(k){Portal.truncate(k,30)})});var b=$$("div.MoreDisc");var e=$$("div.OverviewDisc");b.each(function(f){f.addEvent("click",Portal.Search.DisciplineExpand.pass(f))});e.each(function(f){f.addEvent("click",Portal.Search.DisciplineOverview.pass(f))});var a=new URI(window.location);var d=a.get("fragment");if(d!=""){var d=d.toLowerCase().capitalize();Portal.Search.setState(d)}},SetLink:function(d){var c=d.getProperty("id").replace("country_","");var b=Portal.Search.Country.get(c);var a=d.getProperty("href");$$("area.Country").each(function(e){var f=e.getProperty("id").replace("Map_","");var f=f.replace(" ","_");if(f==b){e.setProperty("href",a)}})},DisciplineExpand:function(a){var c=$$("ul.DisciplineBox");var b=a.getParent("ul.DisciplineBox");c.each(function(d){d.set("tween",{property:"opacity",duration:800,onComplete:function(){d.setStyle("display","none");b.removeClass("DisciplineBox");b.setStyle("display","block");b.addClass("BigBox");b.set("tween",{property:"opacity",duration:800,onComplete:function(){$$("ul.BigBox li ul li a").each(function(e){var f=e.getProperty("title");e.set("text",f)})}});b.tween([0,1])}});d.tween([1,0])})},DisciplineOverview:function(a){var c=$$("ul.DisciplineBox");var b=a.getParent("ul.BigBox");b.set("tween",{property:"opacity",duration:800,onComplete:function(){b.getElements("ul li a").each(function(d){Portal.truncate(d,30)});b.removeClass("BigBox");b.addClass("DisciplineBox");c.each(function(d){d.setStyle("display","block");b.setStyle("opacity","1.0");d.set("tween",{property:"opacity",duration:800});d.tween([0,1])})}});b.tween([1,0])},setState:function(c){if(c==""){return}var b=new URI(window.location);b.set("fragment",c.toLowerCase());b.go();$("search_type").setProperty("value",c);var a=c+"Tab";if($(a).hasClass("CurrentTab")){return false}switch(c){case"Basic":this.state=c;Portal.setCurrentTab(this.BasicTab);this.BasicSearch.addClass("BasicStyles");this.SearchTable.addClass("BasicTable");this.BasicSearch.setStyle("display","block");this.SubmitColumn.setStyle("display","");this.elSearchWrapper.setStyle("visibility","hidden");if($$("ul.BigBox")){$$("ul.BigBox").setStyle("visibility","hidden")}this.DropDowns.subdiscipline.setStyle("visibility","hidden");this.HideBasic.setStyle("display","");this.HideAdvanced.setStyle("display","none");moveToHeight=(this.BasicSearch.getScrollSize().y+110);if(Browser.Engine.trident4){this.moveFX.start(210)}else{this.moveFX.start(moveToHeight)}break;case"Advanced":this.state=c;Portal.setCurrentTab(this.AdvancedTab);this.BasicSearch.removeClass("BasicStyles");this.SearchTable.removeClass("BasicTable");this.AdvancedSearch.setStyle("display","block");this.elSearchWrapper.setStyle("visibility","hidden");if($$("ul.BigBox")){$$("ul.BigBox").setStyle("visibility","hidden")}this.DropDowns.subdiscipline.setStyle("visibility","hidden");this.HideBasic.setStyle("display","none");this.HideAdvanced.setStyle("display","block");if($("dd_subdisciplinesContainer").getStyle("display")=="none"){moveToHeight=(this.AdvancedSearch.getScrollSize().y+110);this.moveFX.start(moveToHeight)}else{moveToHeight=(this.AdvancedSearch.getScrollSize().y+140);this.moveFX.start(moveToHeight)}break;case"Country":this.state=c;Portal.setCurrentTab(this.CountryTab);this.CountrySearch.setStyle("display","block");this.elSearchWrapper.setStyle("visibility","hidden");if($$("ul.BigBox")){$$("ul.BigBox").setStyle("visibility","hidden")}this.DropDowns.subdiscipline.setStyle("visibility","hidden");moveToHeight=(this.CountrySearch.getScrollSize().y+63);this.moveFX.start(moveToHeight);Portal.Search.preloadCountryImages(Portal.Search.searchurl,Portal.Search.portalsType);break;case"Discipline":this.state=c;Portal.setCurrentTab(this.DisciplineTab);this.DisciplineSearch.setStyle("display","block");this.elSearchWrapper.setStyle("visibility","hidden");this.DropDowns.subdiscipline.setStyle("visibility","hidden");moveToHeight=(468);this.moveFX.start(moveToHeight);break}},checkDropdown:function(){if(this.DropDowns.discipline.get("value")==""){$("dd_subdisciplinesContainer").setStyle("display","none");if(this.AdvancedTab.hasClass("CurrentTab")){moveToHeight=(this.AdvancedSearch.getScrollSize().y+110);this.moveFX.start(moveToHeight)}}else{$("dd_subdisciplinesContainer").setStyle("display","table-row");this.DropDowns.subdiscipline.setStyle("visibility","visible");if(this.AdvancedTab.hasClass("CurrentTab")){moveToHeight=(this.AdvancedSearch.getScrollSize().y+140);this.moveFX.start(moveToHeight)}}},setCount:function(a){if(a<1000){$("Numbers_container").getElements("div.Numbers:first-child").hide();$("Numbers_container").getElements("div.Numbers:nth-child(2)").hide();$("Numbers_container").getElements("div.Komma").hide();$("CounterTableMid").addClass("SmallContainer")}else{if(a<10000){$("Numbers_container").getElements("div.Numbers:first-child").hide();$("CounterTableMid").addClass("MediumContainer")}}$("CounterTable").setStyle("visibility","visible");a=a+"";CountArray=new Array();for(i=0;i<a.length;i++){CountArray[i]=a.charAt(i).toInt()}while(CountArray.length<5){CountArray.unshift(0)}copiedArray=$A(CountArray);for(i=0;i<CountArray.length;i++){Numberbox=$("N"+i);counterFx=new Fx.Tween(Numberbox,{property:"background-position",duration:5000,transition:Fx.Transitions.Quart.easeInOut});getNumber=copiedArray.pop()*-32;setNumber="0px "+getNumber+"px";oldNumber=Numberbox.getStyle("background-position");if(oldNumber==null){oldNumber="0px 0px"}counterFx.start(oldNumber,setNumber)}},randomImage:function(){var a=$("SearchImage").getElements("img").dispose();a.set("tween",{property:"opacity",duration:1000,onComplete:function(){a.dispose()}});a.tween([1,0]);if(Portal.Search.portalsType=="phd"){var c=$random(1,5)}if(Portal.Search.portalsType=="bachelor"){var c=$random(1,3)}if(Portal.Search.portalsType=="master"){var c=$random(1,4)}var b=new Element("img",{src:Portal.Search.searchurl+"Images/"+Portal.Search.portalsType+"/Photo_"+c+".jpg"});b.setStyle("opacity","0.0");$("SearchImage").grab(b,"bottom");b.set("tween",{property:"opacity",duration:1000});b.tween([0,1])},preloadCountryImages:function(b,a){Portal.Search.Country.each(function(d){var c=new Asset.image(b+"Images/"+a+"/Europe_"+d+".png")});Portal.Search.Region.each(function(d){var c=new Asset.image(b+"Images/"+a+"/Europe_"+d+".png")})},setMinimalMaximum:function(a){select=$("dd_max_duration");options=select.getChildren();shift_selected=(select.getSelected()[0].get("value")<a&&select.getSelected()[0].get("value")>0);options.each(function(b){if(b.get("value")<a&&b.get("value")>0){b.setStyle("display","none")}else{b.setStyle("display","block")}if(shift_selected&&b.get("value")==a){b.set("selected","selected")}})},ajaxRequest:function(b,a){this.elSearchForm=$("SearchBasic_Form");var c=this.elSearchForm.getElement("input[name=instance_id]").get("value").toInt();new Request({url:"Ajax.php",method:"get",data:b.get("name")+"="+b.get("value")+"&instance_id="+c,onRequest:(function(){this.set("disabled",true);this.addClass("Loading");this.clearSelection()}).bind(a),onSuccess:(function(e,d){this.populateFromJSON(e);this.set("disabled",false);this.removeClass("Loading")}).bind(a)}).send();this.checkDropdown()}});