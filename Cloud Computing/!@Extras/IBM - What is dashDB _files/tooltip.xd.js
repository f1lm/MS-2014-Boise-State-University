/* $Id$ 
 * Copyright (c) 2011 IBM Corporation
 * Owner: Corporate Webmaster (NUS_N_NIWWW)
 */

dojo._xdResourceLoaded(function(_1,_2,_3){return {depends:[["provide","ibmweb.tooltip"],["require","dijit.Tooltip"]],defineResource:function(_4,_5,_6){if(!_4._hasResource["ibmweb.tooltip"]){_4._hasResource["ibmweb.tooltip"]=true;_4.provide("ibmweb.tooltip");_4.require("dijit.Tooltip");ibmweb.tooltip.position=["above","below"];ibmweb.tooltip.init=function(){var i=0;_4.query(".ibm-tooltip").forEach(function(_7){if(!_7.title){return;}if(!_7.id){_7.id="ibm-tooltip-"+i++;}var _8=_7.title;if(_8.indexOf("||")!=-1){_8="<h3>"+_8.substr(0,_8.indexOf("||"))+"</h3>"+_8.substr(_8.indexOf("||")+2);}var tt=new _5.Tooltip({label:_8,connectId:[_7.id],position:ibmweb.tooltip.position});_7.title="";});_4.query(".ibm-tooltip-html").forEach(function(_9){if(!_9.title){return;}if(!_9.id){_9.id="ibm-tooltip-"+i++;}var tt=new _5.Tooltip({label:_4.byId(_9.title).innerHTML,connectId:[_9.id],position:ibmweb.tooltip.position});_9.title="";});};}}};});