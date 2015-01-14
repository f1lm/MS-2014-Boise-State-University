;if(typeof JSON!=='object'){JSON={}}(function(){'use strict';function f(n){return n<10?'0'+n:n}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var cx,escapable,gap,indent,meta,rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key)}if(typeof rep==='function'){value=rep.call(holder,key,value)}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null'}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null'}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v)}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v}}if(typeof JSON.stringify!=='function'){escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' '}}else if(typeof space==='string'){indent=space}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value})}}if(typeof JSON.parse!=='function'){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j}throw new SyntaxError('JSON.parse');}}}());;(function(window,document){var version='3.6.2';var options=window.html5||{};var reSkip=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;var saveClones=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;var supportsHtml5Styles;var expando='_html5shiv';var expanID=0;var expandoData={};var supportsUnknownElements;(function(){try{var a=document.createElement('a');a.innerHTML='<xyz></xyz>';supportsHtml5Styles=('hidden'in a);supportsUnknownElements=a.childNodes.length==1||(function(){(document.createElement)('a');var frag=document.createDocumentFragment();return(typeof frag.cloneNode=='undefined'||typeof frag.createDocumentFragment=='undefined'||typeof frag.createElement=='undefined')}())}catch(e){supportsHtml5Styles=true;supportsUnknownElements=true}}());function addStyleSheet(ownerDocument,cssText){var p=ownerDocument.createElement('p'),parent=ownerDocument.getElementsByTagName('head')[0]||ownerDocument.documentElement;p.innerHTML='x<style>'+cssText+'</style>';return parent.insertBefore(p.lastChild,parent.firstChild)}function getElements(){var elements=html5.elements;return typeof elements=='string'?elements.split(' '):elements}function getExpandoData(ownerDocument){var data=expandoData[ownerDocument[expando]];if(!data){data={};expanID++;ownerDocument[expando]=expanID;expandoData[expanID]=data}return data}function createElement(nodeName,ownerDocument,data){if(!ownerDocument){ownerDocument=document}if(supportsUnknownElements){return ownerDocument.createElement(nodeName)}if(!data){data=getExpandoData(ownerDocument)}var node;if(data.cache[nodeName]){node=data.cache[nodeName].cloneNode()}else if(saveClones.test(nodeName)){node=(data.cache[nodeName]=data.createElem(nodeName)).cloneNode()}else{node=data.createElem(nodeName)}return node.canHaveChildren&&!reSkip.test(nodeName)?data.frag.appendChild(node):node}function createDocumentFragment(ownerDocument,data){if(!ownerDocument){ownerDocument=document}if(supportsUnknownElements){return ownerDocument.createDocumentFragment()}data=data||getExpandoData(ownerDocument);var clone=data.frag.cloneNode(),i=0,elems=getElements(),l=elems.length;for(;i<l;i++){clone.createElement(elems[i])}return clone}function shivMethods(ownerDocument,data){if(!data.cache){data.cache={};data.createElem=ownerDocument.createElement;data.createFrag=ownerDocument.createDocumentFragment;data.frag=data.createFrag()}ownerDocument.createElement=function(nodeName){if(!html5.shivMethods){return data.createElem(nodeName)}return createElement(nodeName,ownerDocument,data)};ownerDocument.createDocumentFragment=Function('h,f','return function(){'+'var n=f.cloneNode(),c=n.createElement;'+'h.shivMethods&&('+getElements().join().replace(/\w+/g,function(nodeName){data.createElem(nodeName);data.frag.createElement(nodeName);return'c("'+nodeName+'")'})+');return n}')(html5,data.frag)}function shivDocument(ownerDocument){if(!ownerDocument){ownerDocument=document}var data=getExpandoData(ownerDocument);if(html5.shivCSS&&!supportsHtml5Styles&&!data.hasCSS){data.hasCSS=!!addStyleSheet(ownerDocument,'article,aside,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}'+'mark{background:#FF0;color:#000}'+'template{display:none}')}if(!supportsUnknownElements){shivMethods(ownerDocument,data)}return ownerDocument}var html5={'elements':options.elements||'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup main mark meter nav output progress section summary template time video','version':version,'shivCSS':(options.shivCSS!==false),'supportsUnknownElements':supportsUnknownElements,'shivMethods':(options.shivMethods!==false),'type':'default','shivDocument':shivDocument,createElement:createElement,createDocumentFragment:createDocumentFragment};window.html5=html5;shivDocument(document)}(this,document));;(function(context){var Patches={String:{clean:function(){return this.replace(/[^a-zA-Z0-9-]/g,"-");}},Array:{indexOf:function(obj,start){for(var i=start||0;i<this.length;i++)
if(this[i]===obj)
return i;return-1;}}};for(var key in Patches)(function(){var patch=Patches[key];var target=context[key];if(patch&&target){for(var method in patch){if(!(method in target)){target.prototype[method]=patch[method];}}}})();})(this);;(function(){document.domain=document.domain;var LeadStore={hasStorageAbilities:function(){return!!window.localStorage;},hasEncodeAbilities:function(){return!!window.JSON;},namespaceKey:function(key){return['LeadStore'].concat(key.split('.')).join('.');},setRecord:function(key,value){if(this.hasStorageAbilities()){try{key=this.namespaceKey(key);window.localStorage.setItem(key,value);return true;}
catch(error){return false;}}
return false;},getRecord:function(key){var value;if(this.hasStorageAbilities()){try{key=this.namespaceKey(key);value=window.localStorage.getItem(key);}
catch(error){}}
return value;},removeRecord:function(key){if(this.hasStorageAbilities()){try{key=this.namespaceKey(key);window.localStorage.removeItem(key);return true;}
catch(error){}}
return false;},setValue:function(key,value){if(this.hasEncodeAbilities()){try{value=JSON.stringify(value);return this.setRecord(key,value);}
catch(error){return false;}}
return false;},getValue:function(key){var value;if(this.hasEncodeAbilities()){try{value=this.getRecord(key);if(typeof value==='string')value=JSON.parse(value);}
catch(error){}}
return value;},removeValue:function(key){return this.removeRecord(key);}};function LeadStoreProxy(id){this.id=String(id);this.keys=String('');this.map={};var keys=LeadStore.getValue(this.id)||'';var map=keys.split(',');var length=map.length;while(length--){this.map[map[length]]=null;}
if(keys)this.keys=String(keys);};LeadStoreProxy.prototype={id:'',keys:'',map:null,has:function(key){return key in this.map;},key:function(key){return[this.id,key].join('.');},add:function(key){if(!this.has(key)){this.map[key]=true;this.keys=this.keys.split(',').concat([key]).join(',');return LeadStore.setValue(this.id,this.keys);}
return false;},set:function(key,value){var set=LeadStore.setValue(this.key(key),value);if(set){this.add(key);this.map[key]=value;return true;}
return false;},get:function(key){return LeadStore.getValue(this.key(key));},remove:function(key){if(this.has(key)){LeadStore.removeValue(this.key(key));delete this.map[key];this.keys=this.keys+','+key;return LeadStore.setValue(this.id,this.keys);}
return false;},clear:function(){for(var key in this.map)this.remove(key);},destroy:function(){this.clear();LeadStore.removeValue(this.id);delete this.id;delete this.keys;delete this.map;},toJson:function(){var json={};for(var key in this.map)json[key]=this.get(key);return json;}};var escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;var meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};var placeholderSupported=document.createElement("input").placeholder!==undefined;var info;var minPadding=18;function stopPropagation(event){if(event.stopPropagation)
event.stopPropagation();else
event.cancelBubble=true;}
function preventDefault(event){if(event.preventDefault)
event.preventDefault();else
event.returnValue=false;}
function jsonQuote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
var clientTracking={};var getTrackingObject=function(id){var object=clientTracking[id];if(!object){object=clientTracking[id]=new LeadStoreProxy(id);}
object.set('id',id);return object;};window.onmessage=function(event){var data;try{if(typeof event.data==='string'){try{data=JSON.parse(event.data);}
catch(error){}}
else if(event.data){data=event.data;}}
catch(error){}
if(data){switch(data.handler){case'reset':var tracking=getTrackingObject(data.data.id);tracking.remove('visit-count',0);tracking.remove('visit-date',0);tracking.remove('display-count',0);tracking.remove('display-date',0);tracking.set('visit-count',0);tracking.set('visit-date',0);tracking.set('display-count',0);tracking.set('display-date',0);break;case'visit':var tracking=getTrackingObject(data.visit.id);var visitCount=tracking.get('visit-count')||0;var visitTime=tracking.get('visit-date')||0;tracking.set('visit-count',visitCount+1);tracking.set('visit-date',Number(new Date()));event.source.postMessage({handler:'visited',visit:tracking.toJson()},'*');break;case'display':var tracking=getTrackingObject(data.display.id);var displayTime=Number(new Date());var displayCount=tracking.get('display-count');tracking.set('display-count',displayCount+1);tracking.set('display-date',displayTime);event.source.postMessage({handler:'displayed',display:tracking.toJson()},'*');break;default:info=data;break;}}}
window.onresize=function(){var wrapper=document.getElementById("leadpages-form-wrapper");var height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;wrapper.style.paddingTop=wrapper.style.paddingBottom="0";if(wrapper.offsetHeight<height){if(info&&info.clientHeight){var viewportTop=Math.max(0,info.scrollTop-info.offsetTop+42);var viewportHeight=info.clientHeight+Math.min(-42,info.scrollTop-info.offsetTop);var paddingTop=viewportTop+Math.round((viewportHeight-wrapper.offsetHeight)/2);paddingTop=Math.max(paddingTop,minPadding);wrapper.style.paddingTop=paddingTop+"px";}
else{var paddingTop=Math.round((height-wrapper.offsetHeight)/2);paddingTop=Math.max(paddingTop,minPadding);wrapper.style.paddingTop=Math.round((height-wrapper.offsetHeight)/2)+"px";}}else
wrapper.style.paddingTop=wrapper.style.paddingBottom="";};window.onload=window.onresize;var UUID="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){var r=((new Date()).getTime()+Math.random()*16)%16|0;return(c=="x"?r:(r&0x7|0x8)).toString(16);});var queryParams={};(function(queryString){if(queryString[0]=="?")
queryString=queryString.substring(1);var pairs=queryString.split("&");for(var i=0;i<pairs.length;i++){var separator=pairs[i].indexOf("="),key="",value="";if(separator==-1)
key=pairs[i];else{key=pairs[i].substring(0,separator);value=pairs[i].substring(separator+1);}
if(!key)
continue;key=decodeURIComponent(key);value=decodeURIComponent(value);if(typeof queryParams[key]=="undefined")
queryParams[key]=[value];else
queryParams[key].push(value);}})(location.search);function getQueryParam(name){var result=queryParams[name];if(!result){if(name=="leadpages-email")
result=queryParams["leadpages-e"];else if(name=="leadpages-full_name")
result=queryParams["leadpages-fn"];}
if(result)
return result[0];return"";}
function getQueryParams(name){var result=queryParams[name];if(!result)
return[];return result;}
function getMetadata(){var metas=document.getElementsByTagName("meta");var trackingId;var servedBy;for(var i=0;i<metas.length;i++){var element=metas[i];switch(element.name){case"leadpages-meta-id":trackingId=element.content;break;case"leadpages-served-by":servedBy=element.content;break;}}
if(!servedBy)
servedBy='leadpages';return{"trackingId":trackingId,"servedBy":servedBy};}
function doRedirect(URL){var form=document.createElement("form");document.body.appendChild(form);form.action=URL;form.method="post";form.target="_top";form.submit();}
function loadPixel(URL,ps,cb){var image=document.createElement("img");URL+="?";for(var key in ps){if(typeof ps[key]=="object"){var json="";for(var key2 in ps[key]){if(json)
json+=",";json+=jsonQuote(""+key2)+":"+jsonQuote(""+ps[key][key2]);}
URL+=encodeURIComponent(key)+"="+encodeURIComponent("{"+json+"}")+"&";}
else if(ps[key]!==undefined)
URL+=encodeURIComponent(key)+"="+
encodeURIComponent(ps[key])+"&";}
image.src=URL;if(cb)
image.onload=cb;}
function loadFieldsFromStorage(fields){for(var k=0;k<fields.length;k++){var field=fields[k],element=document.getElementsByName(field.name);if(!element.length)
continue;var source=element[0].getAttribute("data-source"),role=element[0].getAttribute("data-role"),value=null,i;if(!role){var name=field.name.toLowerCase();if(field.type=="hidden")
role="hidden";else if(field.type=="email")
role="email";else if(field.type=="url")
role="website";else if(field.type=="tel"||(field.type.match(/^(number|text)$/)&&name.match(/(phone|fax|cell|mobile)/))){role="phone";if(name.match(/(cell|mobile)/))
role="cell_phone";else if(name.match(/(work|office|business)/))
role="work_phone";else if(name.match("fax"))
role="fax";}
else if(field.type.match(/^(number|text)$/)&&name.match(/(zip|postcode)/))
role="postcode";else if(field.type.match(/^(text|textarea)$/)){if(name.match(/(addr|street)/)){role="address1";if(name.match("2"))
role="address2";else if(name.match("3"))
role="address3";}
else if(name.match("company"))
role="company";else if(name.match(/(city|town)/))
role="city";else if(name.match("name")){role="full_name";if(name.match(/(fi|fname)/))
role="first_name";else if(name.match(/(la|lname|surname)/))
role="last_name";}}
if(role)
for(i=0;i<element.length;i++)
element[i].setAttribute("data-role",role);}
if(role=="hidden"){var parent=element[0].parentNode,sourceArray=parent.getAttribute("data-source-array");if(sourceArray&&sourceArray.length){parent.innerHTML="";value=getQueryParams(sourceArray);for(i=0;i<value.length;i++){var input=document.createElement("input");input.type="hidden";input.name=field.name;input.value=value[i];parent.appendChild(input);}}
else{value=getQueryParam(source);if(value)
element[0].value=value;}}
else{if(field.type=="checkbox"){var parent=element[0].parentNode.parentNode,source=parent.getAttribute("data-source-array");if(source)
value=getQueryParams(source);}
else{if(!source&&role){source="leadpages-"+role;}
value=getQueryParam(source);}
if(!value&&typeof(Storage)!="undefined"){if(role)
value=localStorage.getItem("leadpages-role-"+role);if(!value){value=localStorage.getItem(field.name+"-"+
field.type);}}
if(!value)
continue;if(field.type=="radio")
for(i=0;i<element.length;i++)
element[i].checked=element[i].value==value;else if(field.type=="checkbox"){if(typeof value=="string"){try{value=JSON.parse(value);}
catch(e){value=[];}}
for(i=0;i<element.length;i++)
element[i].checked=value.indexOf(element[i].value)!=-1;}
else if(field.type=="select")
for(i=0;i<element[0].options.length;i++)
element[0].options[i].selected=element[0].options[i].value==value;else if(field.type=="hidden"){if(source)
element[0].value=value;else if(element[0].parentNode){}}
else
element[0].value=value;}}}
function storeFields(fields){try{for(var k in fields){var field=fields[k],element=document.getElementsByName(field.name);if(!element.length)
continue;var role=element[0].getAttribute("data-role"),value=null,i;if(field.type=="radio"){for(i=0;i<element.length;i++)
if(element[i].checked){value=element[i].value;break;}}
else if(field.type=="checkbox"){value=[];for(i=0;i<element.length;i++)
if(element[i].checked)
value.push(element[i].value);}
else if(field.type=="select"){for(i=0;i<element[0].options.length;i++)
if(element[0].options[i].selected){value=element[0].options[i].value;break;}}
else
value=element[0].value;if(!value)
continue;if(typeof value!="string")
value=JSON.stringify(value);localStorage.setItem(field.name+"-"+field.type,value);if(role)
localStorage.setItem("leadpages-role-"+role,value);}}
catch(e){}}
function insertRegistration(facebook){var fieldset=document.getElementById('leadpages-fieldset'),wrapper=document.getElementById('leadpages-fieldset-wrapper'),width=500,xfbml;wrapper.innerHTML='<fb:registration target="_self" />';xfbml=document.getElementsByTagName('fb:registration')[0];xfbml.setAttribute('redirect_uri',facebook.redirect_uri);xfbml.setAttribute('width',500);xfbml.setAttribute('fields',JSON.stringify(facebook.fields));FB.XFBML.parse(wrapper,function(){var span=document.querySelector('.fb_iframe_widget span'),observer=new MutationObserver(function(mutations){window.onresize();});observer.observe(span,{attributes:true,childList:false,characterData:false});});}
function initializeFacebook(facebook){FB.Event.subscribe('auth.statusChange',function(response){switch(response.status){case'connected':case'not_authorized':insertRegistration(facebook);break;default:break;}});FB.init({appId:facebook.app_id,status:true,cookie:true,xfbml:false});};window.leadpagesForm=function(redirectURL,fields,facebook){var form=document.getElementById("leadpages-form"),close=document.getElementById("leadpages-close-button"),submit=document.getElementById("leadpages-submit-button"),tests={"date":/\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/,"email":/((([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?/,"url":/(https?|ftp):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?/,"tel":/([\+][0-9]{1,3}([ \.\-])?)?([\(]{1}[0-9]{3}[\)])?([0-9A-Z \.\-]{1,32})((x|ext|extension)?[0-9]{1,4}?)/,"number":/-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?/},submitted=false;if(!!facebook&&window.FB){var metadata=getMetadata();facebook.redirect_uri+=['?id='+metadata.trackingId,'uuid='+UUID,'type=optin','served_by='+metadata.servedBy].join('&');initializeFacebook(facebook);}
try{var html=document.getElementsByTagName("html")[0];if(getQueryParam("lp-in-iframe")=="1"){html.className+=" in-iframe";if(document.all&&!document.addEventListener)
html.style.background="#333";}
else
html.className+=" not-in-iframe";}
catch(e){}
close.onclick=function(){if(window.self==window.top){if(this.href)
return true;else
window.history.back();}
else{try{window.parent.formFrameClosed();if(window.parent)window.parent.postMessage("close","*");}
catch(e){if(window.parent)window.parent.postMessage("close","*");}
return false;}};form.onclick=function(e){stopPropagation(e||window.event);};document.onclick=function(e){try{close.click();}catch(err){close.onclick.apply(close);}};loadFieldsFromStorage(fields);for(var i=0;i<fields.length;i++){var field=fields[i];if(field.type.match(/^(select|checkbox|radio|hidden)$/))
continue;var container=document.getElementById("leadpages-container-"+
field.name.clean()),element=field.type=="textarea"?container.getElementsByTagName(field.type):container.getElementsByTagName("input");if(!placeholderSupported&&element.length==1){if(element[0].getAttribute("data-role")=="hidden")
continue;element=element[0];element.placeholderDiv=document.createElement("div");element.placeholderDiv.elementRef=element;element.placeholderDiv.className="placeholder";element.placeholderDiv.appendChild(document.createTextNode(element.getAttribute("placeholder")));element.onkeyup=element.onmouseup=element.onpaste=function(){if(this.value)
this.placeholderDiv.style.display="none";else
this.placeholderDiv.style.display="block";};element.placeholderDiv.onclick=function(){this.elementRef.focus();};element.parentNode.insertBefore(element.placeholderDiv,element);element.onkeyup.call(element);}}
form.setAttribute("novalidate",true);submit.onclick=function(e){preventDefault(e||window.event);var email=null,canceled=false,roles={};for(var i=0;i<fields.length;i++){var field=fields[i];if(field.type=="hidden"||field.type=="checkbox")
continue;var container=document.getElementById("leadpages-container-"+
field.name.clean()),error=document.getElementById("leadpages-error-"+
field.name.clean()),element=["select","textarea"].indexOf(field.type)!=-1?container.getElementsByTagName(field.type):container.getElementsByTagName("input");if(!element.length){continue;}
var role=element[0].getAttribute("data-role");if(role=="hidden")
continue;error.innerHTML="";container.className=container.className.replace(/(?:^|\s)error(?!\S)/g,"");var trimmed="";if(field.type=="radio"){for(var j=0;j<element.length;j++)
if(element[j].checked)
trimmed=element[j].value;element=element[0];}
else if(field.type=="select"){element=element[0];if(element.selectedIndex!=-1)
trimmed=element.options[element.selectedIndex].value;}
else{element=element[0];trimmed=element.value.replace(/^\s+|\s+$/g,"");}
if(trimmed.length){if(tests[field.type]&&!trimmed.match(tests[field.type])){container.className+=" error";error.innerHTML=field.invalid;canceled=true;}
else{if(["radio","select"].indexOf(field.type)==-1)
element.value=trimmed;if(role)
roles[role]=element.value;}}
else if(element.getAttribute("required")=="required"||element.getAttribute("data-required")=="required"){container.className+=" error";error.innerHTML=field.required;canceled=true;}}
if(canceled)
return;if(submitted)
return;submitted=true;submit.style.cursor="wait";storeFields(fields);try{try{window.parent.popup=false;window.parent.disableExitPopup();if(window.parent)window.parent.postMessage("disable-exit-popup","*");}
catch(e){if(window.parent)window.parent.postMessage("disable-exit-popup","*");}}
catch(e){}
metadata=getMetadata();loadPixel(form.attributes["data-action"].value,{id:metadata.trackingId,uuid:UUID,type:"optin",roles:roles,served_by:metadata.servedBy},function(){if(!redirectURL){form.target="_top";try{HTMLFormElement.prototype.submit.call(form);}
catch(e){form.submit();}
return;}
var iframe=document.createElement("iframe"),iframeName="leadpages-hidden-iframe";iframe.style.position="absolute";iframe.style.top="-1000px";iframe.style.left="-1000px";iframe.style.width="500px";iframe.style.height="500px";iframe.name=iframeName;iframe.id=iframeName;iframe.src="about:blank";iframe.sandbox="";document.body.appendChild(iframe);form.target=iframeName;var failsafe=setTimeout(function(){doRedirect(redirectURL);},5000);iframe.onerror=iframe.onload=function(){if(failsafe){clearTimeout(failsafe)
failsafe=null;}
doRedirect(redirectURL);};try{HTMLFormElement.prototype.submit.call(form);}
catch(e){form.submit();}});};};})();