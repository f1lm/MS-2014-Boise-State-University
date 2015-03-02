DropDown=new Class({Implements:[Events,Options],options:{scrollbarWidth:18},disabled:false,pulledOut:false,mouseOver:false,elWrapper:null,elField:null,elActuator:null,elInput:null,elOptionListContainer:null,elOptionList:null,elSelectedItem:null,initialize:function(a,b){a=$(a);if(!a.match("select")){return}this.setOptions(b);this.elWrapper=this.buildWrapper(a);this.elField=this.buildField(a);this.elActuator=this.buildActuator(a);this.elInput=this.buildInput(a);this.elField.injectInside(this.elWrapper);this.elActuator.injectInside(this.elWrapper);this.elInput.injectInside(this.elWrapper);a.parentNode.replaceChild(this.elWrapper,a);this.elOptionListContainer=this.buildOptionList(a.getChildren());this.elOptionList=this.elOptionListContainer.getElement("ul");this.elOptionListContainer.injectInside(document.body);this.elWrapper.setStyle("width",this.elField.getStyle("width").toInt());this.elWrapper.setStyle("height",this.elField.getSize().y);this.elField.setStyle("width",this.elField.getStyle("width").toInt()-this.elActuator.getSize().x);this.set("disabled",a.get("disabled"));a.destroy()},buildWrapper:function(a){var b=new Element("div",{"class":"jsDD_Wrapper",styles:{display:"inline-block",position:"relative"}});if(Browser.Engine.trident){b.addEvent("mouseenter",(function(){this.mouseOver=true}).bind(this));b.addEvent("mouseleave",(function(){this.mouseOver=false}).bind(this))}if(a.getProperty("class")){b.setProperty("class",b.getProperty("class")+" "+a.getProperty("class"))}return b},buildField:function(a){var b=new Element("span",{"class":"Field",styles:{position:"absolute",top:0,left:0,width:a.getSize().x,margin:0,overflow:"hidden",whiteSpace:"nowrap"},events:{click:(function(){this.elActuator.focus();this.toggleOptionList()}).bind(this),mousedown:function(){return false}}});if(Browser.Engine.trident){b.addEvent("selectstart",function(){return false})}return b},buildActuator:function(a){var b=new Element("input",{type:"button","class":"Actuator",styles:{position:"absolute",top:0,right:0,cursor:"pointer"},events:{click:this.toggleOptionList.bind(this),blur:this.blurActuator.bindWithEvent(this)}});if(a.get("id")){b.set("id",a.get("id"))}if(!Browser.Engine.trident){b.addEvent("keypress",this.keyPress.bindWithEvent(this))}else{b.addEvent("keydown",this.keyPress.bindWithEvent(this))}return b},buildInput:function(a){var b=new Element("input",{type:"hidden",name:a.get("name"),value:a.get("value")});b.cloneEvents(a);return b},buildOptionList:function(a){var c=new Element("div",{styles:{position:"absolute",display:"none",margin:0,opacity:0,overflowX:"hidden",overflowY:"scroll",zIndex:100},events:{mousedown:function(){return false}}});if(this.elWrapper.getProperty("class")){c.setProperty("class",this.elWrapper.getProperty("class"))}c.removeClass("jsDD_Wrapper");c.addClass("jsDD_Options");var b=new Element("ul",{styles:{listStyleType:"none"}});b.injectInside(c);if(Browser.Engine.trident){c.addEvent("mouseenter",(function(){this.mouseOver=true}).bind(this));c.addEvent("mouseleave",(function(){this.mouseOver=false}).bind(this))}if(Browser.Engine.trident){c.addEvent("mousedown",function(){return false})}c.store("tweening",false);c.set("tween",{link:"ignore",duration:350,transition:Fx.Transitions.Quart.easeInOut,onStart:(function(){this.store("tweening",true)}).bind(c),onComplete:(function(){this.store("tweening",false);if(this.getStyle("opacity").toInt()!=1){this.setStyle("display","none")}}).bind(c)});a.each(function(e){var d=this.buildOptionListItem(e.get("text"),e.get("value"),e.get("selected"));if(e.get("class")){d.set("class",e.get("class"))}b.grab(d,"bottom")},this);return c},buildOptionListItem:function(d,c,b){var a=new Element("li",{text:$defined(d)?d.toString():"",styles:{display:"list-item",whiteSpace:"nowrap",cursor:"default"},events:{mouseover:this.itemMouseOver.bindWithEvent(this),click:(function(e){this.itemActivate($(e.target))}).bindWithEvent(this)}});if(Browser.Engine.trident&&Browser.Engine.version==5){a.setStyles({height:"auto",marginRight:this.options.scrollbarWidth})}a.store("optionTitle",$defined(d)?d.toString():"");a.store("optionValue",$defined(c)?c.toString():"");if(b){if(this.elSelectedItem){this.elSelectedItem.removeClass("Selected")}this.elField.set({text:a.retrieve("optionTitle"),value:a.retrieve("optionValue")});if(a.retrieve("optionTitle")!=""){this.elSelectedItem=a;a.addClass("Selected")}}return a},get:function(a){switch(a){case"id":return this.elActuator.get("id");case"name":return Browser.Engine.trident?this.elInput.name:this.elInput.get("name");case"value":return Browser.Engine.trident?this.elInput.value:this.elInput.get("value");case"disabled":return this.disabled}},set:function(a,b){switch(a){case"disabled":this.disabled=b?true:false;if(this.disabled){this.elInput.set("disabled",true);this.elWrapper.addClass("Disabled")}else{this.elInput.set("disabled",false);this.elWrapper.removeClass("Disabled")}break}},hasClass:function(a){return this.elWrapper.hasClass(a)},addClass:function(a){return this.elWrapper.addClass(a)},removeClass:function(a){return this.elWrapper.removeClass(a)},setStyle:function(b,a){if(b=="display"&&(a=="block"||a=="inline")){a="inline-block"}return this.elWrapper.setStyle(b,a)},addOption:function(d,c,b){var a=this.buildOptionListItem(d,c,b);this.elOptionList.grab(a,"bottom");return a},emptyOptionList:function(){this.clearSelection();this.elOptionListContainer.scrollTo(0,0);this.elOptionList.empty()},clearSelection:function(){this.elInput.set("value","");this.elField.set("text","");this.elSelectedItem=null},positionOptionList:function(){var i=this.elField.getCoordinates();var f=this.elField.getStyle("border-bottom").toInt();this.elOptionListContainer.setStyles({top:i.top+i.height-(!isNaN(f)?f:0),left:i.left});var c=this.elOptionListContainer.getStyle("border-left").toInt();var g=this.elOptionListContainer.getStyle("border-right").toInt();var b=this.elWrapper.getSize().x;var e=(!isNaN(c)?c:0)+(!isNaN(g)?g:0);if(Browser.Engine.gecko){e+=this.options.scrollbarWidth}if(Browser.Engine.trident&&Browser.Engine.version<=4){this.elOptionList.setStyle("width",b-e);var k=this.elOptionListContainer.getStyle("min-height").toInt();var j=this.elOptionListContainer.getStyle("height").toInt();if(!isNaN(k)&&!isNaN(j)){var d=k;var a=this.elOptionList.getElements("li").length;var h=this.elOptionList.getElement("li").getSize().y*a;if(h>j){d=j}else{if(a>0){d=h}}this.elOptionListContainer.setStyle("height",d)}}else{this.elOptionList.setStyle("min-width",b-e)}},showOptionList:function(){this.elOptionListContainer.setStyles("visibility","hidden");this.elOptionListContainer.setStyle("display","block");this.positionOptionList();this.elOptionList.getElements("li").each(function(a){a.removeClass("Selected")});if(this.elSelectedItem){this.elSelectedItem.addClass("Selected");this.scrollIntoView(this.elSelectedItem)}this.elOptionListContainer.setStyle("visibility","visible");this.elOptionListContainer.tween("opacity",1);this.pulledOut=true},hideOptionList:function(a){if(a){this.elOptionListContainer.setStyles({opacity:0,display:"none"})}else{this.elOptionListContainer.tween("opacity",0)}this.pulledOut=false},toggleOptionList:function(){if(this.elOptionListContainer.retrieve("tweening",false)||(this.disabled&&!this.pulledOut)){return}else{if(this.pulledOut){this.hideOptionList()}else{this.showOptionList()}}},keyPress:function(c){var d;switch(c.key){case"down":if(!this.pulledOut){this.showOptionList()}else{d=this.elOptionList.getElement("li.Selected");if(!d){this.elOptionList.getFirst().addClass("Selected")}else{var a=d.getNext();if(a){d.removeClass("Selected");a.addClass("Selected");this.scrollIntoView(a,"down")}}}return false;case"up":d=this.elOptionList.getElement("li.Selected");if(d){var b=d.getPrevious();if(b){d.removeClass("Selected");b.addClass("Selected");this.scrollIntoView(b,"up")}}return false;case"esc":this.hideOptionList();return false;case"enter":d=this.elOptionList.getElement("li.Selected");if(this.pulledOut&&d){this.itemActivate(d);this.hideOptionList(true)}else{this.elActuator.getParent("form").submit()}return false}return true},blurActuator:function(a){if(Browser.Engine.trident&&this.mouseOver){(function(){this.focus()}).delay(1,this.elActuator)}else{if(this.pulledOut){if(this.elOptionListContainer.retrieve("tweening",false)){this.elOptionListContainer.get("tween").cancel()}this.hideOptionList()}}},scrollIntoView:function(i,e){var a=this.elOptionListContainer.getStyle("border-top").toInt();var c=this.elOptionListContainer.getStyle("border-bottom").toInt();var f=i.getPosition(this.elOptionListContainer).y-(!isNaN(a)?a:0);var g=f+i.getSize().y+(!isNaN(a)?a:0)+(!isNaN(c)?c:0);if(Browser.Engine.trident){f=f+this.elOptionListContainer.getScroll().y;g=g+this.elOptionListContainer.getScroll().y}var d=this.elOptionListContainer.getSize().y;var b=this.elOptionListContainer.getScroll().y;var h=this.elOptionListContainer.getSize().y+this.elOptionListContainer.getScroll().y;if(f<b||g>h){switch(e){case"up":this.elOptionListContainer.scrollTo(0,f);break;default:case"down":this.elOptionListContainer.scrollTo(0,g-d);break}}},itemMouseOver:function(a){this.elOptionList.getElements("li.Selected").each(function(b){b.removeClass("Selected")});$(a.target).addClass("Selected")},itemActivate:function(b){(function(){if(b.retrieve("optionTitle")==""){this.elSelectedItem=null;b.removeClass("Selected")}else{this.elSelectedItem=b;b.addClass("Selected")}this.elInput.set("value",b.retrieve("optionValue"));this.elField.set("text",b.retrieve("optionTitle"));this.fireEvent("change")}).bind(this).delay(300);var a=new Element("div",{text:b.get("text")});a.set("tween",{duration:1200,transition:Fx.Transitions.Quart.easeOut,onComplete:(function(){this.dispose()}).bind(a)});if(b.getProperty("class")){a.setProperty("class",b.getProperty("class"))}a.addClass("jsDD_FadeHint");var d=b.getCoordinates();var c=b.getStyle("padding").toInt();a.setStyles(b.getStyles("color","background-color","margin","padding","font-family","font-size"));a.setStyles({position:"absolute",top:d.top,left:d.left,width:(d.width-(!isNaN(c)?(c*2):0)),height:(d.height-(!isNaN(c)?(c*2):0)),overflow:"hidden",cursor:"default",zIndex:100});if(Browser.Engine.trident){a.setStyle("top",d.top+this.elOptionListContainer.getScroll().y)}a.injectInside($(document.body));a.tween("opacity",1,0);this.hideOptionList(true)},populateFromJSON:function(a){this.emptyOptionList();this.addOption();$each(JSON.decode(a),function(c,b){this.addOption(c,b)},this)}});