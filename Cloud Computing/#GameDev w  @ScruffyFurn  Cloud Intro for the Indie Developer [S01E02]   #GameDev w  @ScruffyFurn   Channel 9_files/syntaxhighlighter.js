var XRegExp;if(XRegExp)throw Error("can't load XRegExp twice in the same frame");(function(){function t(n,t){if(!XRegExp.isRegExp(n))throw TypeError("type RegExp expected");var i=n._xregexp;return n=XRegExp(n.source,h(n)+(t||"")),i&&(n._xregexp={source:i.source,captureNames:i.captureNames?i.captureNames.slice(0):null}),n}function h(n){return(n.global?"g":"")+(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.extended?"x":"")+(n.sticky?"y":"")}function y(n,t,u,f){var s=r.length,h,o,e;i=!0;try{while(s--)if(e=r[s],u&e.scope&&(!e.trigger||e.trigger.call(f))&&(e.pattern.lastIndex=t,o=e.pattern.exec(n),o&&o.index===t)){h={output:e.handler.call(f,o,u),match:o};break}}catch(c){throw c;}finally{i=!1}return h}function f(n,t,i){if(Array.prototype.indexOf)return n.indexOf(t,i);for(var r=i||0;r<n.length;r++)if(n[r]===t)return r;return-1}XRegExp=function(r,f){var o=[],s=XRegExp.OUTSIDE_CLASS,e=0,h,c,v,a,p;if(XRegExp.isRegExp(r)){if(f!==undefined)throw TypeError("can't supply flags when constructing one RegExp from another");return t(r)}if(i)throw Error("can't call the XRegExp constructor within token definition functions");for(f=f||"",h={hasNamedCapture:!1,captureNames:[],hasFlag:function(n){return f.indexOf(n)>-1},setFlag:function(n){f+=n}};e<r.length;)c=y(r,e,s,h),c?(o.push(c.output),e+=c.match[0].length||1):(v=n.exec.call(u[s],r.slice(e)))?(o.push(v[0]),e+=v[0].length):(a=r.charAt(e),a==="["?s=XRegExp.INSIDE_CLASS:a==="]"&&(s=XRegExp.OUTSIDE_CLASS),o.push(a),e++);return p=RegExp(o.join(""),n.replace.call(f,l,"")),p._xregexp={source:r,captureNames:h.hasNamedCapture?h.captureNames:null},p};XRegExp.version="1.5.0";XRegExp.INSIDE_CLASS=1;XRegExp.OUTSIDE_CLASS=2;var c=/\$(?:(\d\d?|[$&`'])|{([$\w]+)})/g,l=/[^gimy]+|([\s\S])(?=[\s\S]*\1)/g,e=/^(?:[?*+]|{\d+(?:,\d*)?})\??/,i=!1,r=[],n={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},a=n.exec.call(/()??/,"")[1]===undefined,o=function(){var t=/^/g;return n.test.call(t,""),!t.lastIndex}(),v=function(){var t=/x/g;return n.replace.call("x",t,""),!t.lastIndex}(),s=RegExp.prototype.sticky!==undefined,u={};u[XRegExp.INSIDE_CLASS]=/^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/;u[XRegExp.OUTSIDE_CLASS]=/^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/;XRegExp.addToken=function(n,i,u,f){r.push({pattern:t(n,"g"+(s?"y":"")),handler:i,scope:u||XRegExp.OUTSIDE_CLASS,trigger:f||null})};XRegExp.cache=function(n,t){var i=n+"/"+(t||"");return XRegExp.cache[i]||(XRegExp.cache[i]=XRegExp(n,t))};XRegExp.copyAsGlobal=function(n){return t(n,"g")};XRegExp.escape=function(n){return n.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")};XRegExp.execAt=function(n,i,r,u){i=t(i,"g"+(u&&s?"y":""));i.lastIndex=r=r||0;var f=i.exec(n);return u?f&&f.index===r?f:null:f};XRegExp.freezeTokens=function(){XRegExp.addToken=function(){throw Error("can't run addToken after freezeTokens");}};XRegExp.isRegExp=function(n){return Object.prototype.toString.call(n)==="[object RegExp]"};XRegExp.iterate=function(n,i,r,u){for(var f=t(i,"g"),o=-1,e;e=f.exec(n);)r.call(u,e,++o,n,f),f.lastIndex===e.index&&f.lastIndex++;i.global&&(i.lastIndex=0)};XRegExp.matchChain=function(n,i){return function r(n,u){for(var o=i[u].regex?i[u]:{regex:i[u]},s=t(o.regex,"g"),f=[],e=0;e<n.length;e++)XRegExp.iterate(n[e],s,function(n){f.push(o.backref?n[o.backref]||"":n[0])});return u===i.length-1||!f.length?f:r(f,u+1)}([n],0)};RegExp.prototype.apply=function(n,t){return this.exec(t[0])};RegExp.prototype.call=function(n,t){return this.exec(t)};RegExp.prototype.exec=function(){var t=n.exec.apply(this,arguments),r,u,i;if(t){if(!a&&t.length>1&&f(t,"")>-1&&(u=RegExp(this.source,n.replace.call(h(this),"g","")),n.replace.call(t[0],u,function(){for(var n=1;n<arguments.length-2;n++)arguments[n]===undefined&&(t[n]=undefined)})),this._xregexp&&this._xregexp.captureNames)for(i=1;i<t.length;i++)r=this._xregexp.captureNames[i-1],r&&(t[r]=t[i]);!o&&this.global&&!t[0].length&&this.lastIndex>t.index&&this.lastIndex--}return t};o||(RegExp.prototype.test=function(t){var i=n.exec.call(this,t);return i&&this.global&&!i[0].length&&this.lastIndex>i.index&&this.lastIndex--,!!i});String.prototype.match=function(t){if(XRegExp.isRegExp(t)||(t=RegExp(t)),t.global){var i=n.match.apply(this,arguments);return t.lastIndex=0,i}return t.exec(this)};String.prototype.replace=function(t,i){var u=XRegExp.isRegExp(t),r,e,o;return u&&typeof i.valueOf()=="string"&&i.indexOf("${")===-1&&v?n.replace.apply(this,arguments):(u?t._xregexp&&(r=t._xregexp.captureNames):t=t+"",typeof i=="function"?e=n.replace.call(this,t,function(){if(r){arguments[0]=new String(arguments[0]);for(var n=0;n<r.length;n++)r[n]&&(arguments[0][r[n]]=arguments[n+1])}return u&&t.global&&(t.lastIndex=arguments[arguments.length-2]+arguments[0].length),i.apply(null,arguments)}):(o=this+"",e=n.replace.call(o,t,function(){var t=arguments;return n.replace.call(i,c,function(n,i,u){var o,e;if(i)switch(i){case"$":return"$";case"&":return t[0];case"`":return t[t.length-1].slice(0,t[t.length-2]);case"'":return t[t.length-1].slice(t[t.length-2]+t[0].length);default:if(o="",i=+i,!i)return n;while(i>t.length-3)o=String.prototype.slice.call(i,-1)+o,i=Math.floor(i/10);return(i?t[i]||"":"$")+o}else return(e=+u,e<=t.length-3)?t[e]:(e=r?f(r,u):-1,e>-1?t[e+1]:n)})})),u&&t.global&&(t.lastIndex=0),e)};String.prototype.split=function(t,i){if(!XRegExp.isRegExp(t))return n.split.apply(this,arguments);var f=this+"",r=[],e=0,u,o;if(i===undefined||+i<0)i=Infinity;else if(i=Math.floor(+i),!i)return[];for(t=XRegExp.copyAsGlobal(t);u=t.exec(f);){if(t.lastIndex>e&&(r.push(f.slice(e,u.index)),u.length>1&&u.index<f.length&&Array.prototype.push.apply(r,u.slice(1)),o=u[0].length,e=t.lastIndex,r.length>=i))break;t.lastIndex===u.index&&t.lastIndex++}return e===f.length?(!n.test.call(t,"")||o)&&r.push(""):r.push(f.slice(e)),r.length>i?r.slice(0,i):r};XRegExp.addToken(/\(\?#[^)]*\)/,function(t){return n.test.call(e,t.input.slice(t.index+t[0].length))?"":"(?:)"});XRegExp.addToken(/\((?!\?)/,function(){return this.captureNames.push(null),"("});XRegExp.addToken(/\(\?<([$\w]+)>/,function(n){return this.captureNames.push(n[1]),this.hasNamedCapture=!0,"("});XRegExp.addToken(/\\k<([\w$]+)>/,function(n){var t=f(this.captureNames,n[1]);return t>-1?"\\"+(t+1)+(isNaN(n.input.charAt(n.index+n[0].length))?"":"(?:)"):n[0]});XRegExp.addToken(/\[\^?]/,function(n){return n[0]==="[]"?"\\b\\B":"[\\s\\S]"});XRegExp.addToken(/^\(\?([imsx]+)\)/,function(n){return this.setFlag(n[1]),""});XRegExp.addToken(/(?:\s+|#.*)+/,function(t){return n.test.call(e,t.input.slice(t.index+t[0].length))?"":"(?:)"},XRegExp.OUTSIDE_CLASS,function(){return this.hasFlag("x")});XRegExp.addToken(/\./,function(){return"[\\s\\S]"},XRegExp.OUTSIDE_CLASS,function(){return this.hasFlag("s")})})();
/**
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! THIS FILE HAS BEEN MODIFIED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
* attaching events was leaking memory in IE
* AttachEvent was modified
* on instance of preventDefault was modified
* GK August 10, 2010
* 
* Added 'syntaxhighlighterHolder' class to holder
* GK Sept 20, 2010
*
* SyntaxHighlighter
* http://alexgorbatchev.com/SyntaxHighlighter
*
* SyntaxHighlighter is donationware. If you are using it, please donate.
* http://alexgorbatchev.com/SyntaxHighlighter/donate.html
*
* @version
* 3.0.83 (July 02 2010)
* 
* @copyright
* Copyright (C) 2004-2010 Alex Gorbatchev.
*
* @license
* Dual licensed under the MIT and GPL licenses.
*/
var SyntaxHighlighter=function(){function p(n,t){return n.className.indexOf(t)!=-1}function w(n,t){p(n,t)||(n.className+=" "+t)}function c(n,t){n.className=n.className.replace(t,"")}function b(n){for(var i=[],t=0;t<n.length;t++)i.push(n[t]);return i}function t(n){return n.split("\n")}function r(n){var t="highlighter_";return n.indexOf(t)==0?n:t+n}function l(t){return n.vars.highlighters[r(t)]}function k(n){return document.getElementById(r(n))}function d(t){n.vars.highlighters[r(t.id)]=t}function i(n,t,r){var u,e,s,o,f;if(n==null)return null;if(u=r!=!0?n.childNodes:[n.parentNode],e={"#":"id",".":"className"}[t.substr(0,1)]||"nodeName",s=e!="nodeName"?t.substr(1):t.toUpperCase(),(n[e]||"").indexOf(s)!=-1)return n;for(f=0;u&&f<u.length&&o==null;f++)o=i(u[f],t,r);return o}function o(n,t){return i(n,t,!0)}function g(n,t,i){i=Math.max(i||0,0);for(var r=i;r<n.length;r++)if(n[r]==t)return r;return-1}function nt(n){return(n||"")+Math.round(Math.random()*1e6).toString()}function a(n,t){var r={};for(var i in n)r[i]=n[i];for(i in t)r[i]=t[i];return r}function tt(n){var t={"true":!0,"false":!1}[n];return t==null?n:t}function it(n,t,i,r,u){var e=(screen.width-i)/2,o=(screen.height-r)/2,f;return u+=", left="+e+", top="+o+", width="+i+", height="+r,u=u.replace(/^,/,""),f=window.open(n,t,u),f.focus(),f}function u(n,t,i,r){function u(n){n=n||window.event;n.target||(n.target=n.srcElement);i.call(r||window,n)}n.attachEvent?n.attachEvent("on"+t,u):n.addEventListener(t,u,!1)}function v(t){window.alert(n.config.strings.alert+t)}function y(t,i){var r=n.vars.discoveredBrushes,o=null,u,s,f,e;if(r==null){r={};for(u in n.brushes)if(s=n.brushes[u],f=s.aliases,f!=null)for(s.brushName=u.toLowerCase(),e=0;e<f.length;e++)r[f[e]]=u;n.vars.discoveredBrushes=r}return o=n.brushes[r[t]],o==null&&i!=!1&&v(n.config.strings.noBrush+t),o}function s(n,i){for(var u=t(n),r=0;r<u.length;r++)u[r]=i(u[r],r);return u.join("\n")}function rt(n){return n.replace(/^[ ]*[\n]+|[\n]*[ ]*$/g,"")}function ut(n){for(var i,u={},f=new XRegExp("^\\[(?<values>(.*?))\\]$"),e=new XRegExp("(?<name>[\\w-]+)\\s*:\\s*(?<value>[\\w-%#]+|\\[.*?\\]|\".*?\"|'.*?')\\s*;?","g"),t,r;(i=e.exec(n))!=null;)t=i.value.replace(/^['"]|['"]$/g,""),t!=null&&f.test(t)&&(r=f.exec(t),t=r.values.length>0?r.values.split(/\s*,\s*/):[]),u[i.name]=t;return u}function h(t,i){return t==null||t.length==0||t=="\n"?t:(t=t.replace(/</g,"&lt;"),t=t.replace(/ {2,}/g,function(t){for(var i="",r=0;r<t.length-1;r++)i+=n.config.space;return i+" "}),i!=null&&(t=s(t,function(n){if(n.length==0)return"";var t="";return(n=n.replace(/^(&nbsp;| )+/,function(n){return t=n,""}),n.length==0)?t:t+'<code class="'+i+'">'+n+"<\/code>"})),t)}function ft(n,t){for(var i=n.toString();i.length<t;)i="0"+i;return i}function et(n,t){for(var i="",r=0;r<t;r++)i+=" ";return n.replace(/\t/g,i)}function ot(n,i){function e(n,t,i){return n.substr(0,t)+u.substr(0,i)+n.substr(t+1,n.length)}for(var o=t(n),r="\t",u="",f=0;f<50;f++)u+="                    ";return s(n,function(n){var t,u;if(n.indexOf(r)==-1)return n;for(t=0;(t=n.indexOf(r))!=-1;)u=i-t%i,n=e(n,t,u);return n})}function st(t){var i=/<br\s*\/?>|&lt;br\s*\/?&gt;/gi;return n.config.bloggerMode==!0&&(t=t.replace(i,"\n")),n.config.stripBrs==!0&&(t=t.replace(i,"")),t}function f(n){return n.replace(/^\s+|\s+$/g,"")}function ht(n){for(var e,o,r=t(st(n)),u=1e3,i=0;i<r.length&&u>0;i++)if(e=r[i],f(e).length!=0){if(o=/^\s*/.exec(e),o==null)return n;u=Math.min(o[0].length,u)}if(u>0)for(i=0;i<r.length;i++)r[i]=r[i].substr(u);return r.join("\n")}function ct(n,t){return n.index<t.index?-1:n.index>t.index?1:n.length<t.length?-1:n.length>t.length?1:0}function e(t,i){function e(n){return n[0]}for(var u=null,f=[],o=i.func?i.func:e,r;(u=i.regex.exec(t))!=null;)r=o(u,i),typeof r=="string"&&(r=[new n.Match(r,u.index,i.css)]),f=f.concat(r);return f}function lt(t){var i=/(.*)((&gt;|&lt;).*)/;return t.replace(n.regexLib.url,function(n){var r="",t=null;return(t=i.exec(n))&&(n=t[1],r=t[2]),'<a href="'+n+'">'+n+"<\/a>"+r})}function at(){for(var t=document.getElementsByTagName("script"),i=[],n=0;n<t.length;n++)t[n].type=="syntaxhighlighter"&&i.push(t[n]);return i}function vt(n){var u="<![CDATA[",e="]\]>",t=f(n),i=!1,s=u.length,o=e.length,r;return t.indexOf(u)==0&&(t=t.substring(s),i=!0),r=t.length,t.indexOf(e)==r-o&&(t=t.substring(0,r-o),i=!0),i?t:n}function yt(n){var a=n.target,e=o(a,".syntaxhighlighter"),s=o(a,".container"),t=document.createElement("textarea"),v,h,r,f;if(s&&e&&!i(s,"textarea")){for(v=l(e.id),w(e,"source"),h=s.childNodes,r=[],f=0;f<h.length;f++)r.push(h[f].innerText||h[f].textContent);r=r.join("\r");t.appendChild(document.createTextNode(r));s.appendChild(t);t.focus();t.select();u(t,"blur",function(){t.parentNode.removeChild(t);c(e,"source")})}}typeof require!="undefined"&&typeof XRegExp=="undefined"&&(XRegExp=require("XRegExp").XRegExp);var n={defaults:{"class-name":"","first-line":1,"pad-line-numbers":!1,highlight:null,title:null,"smart-tabs":!0,"tab-size":4,gutter:!0,toolbar:!0,"quick-code":!0,collapse:!1,"auto-links":!0,light:!1,"html-script":!1},config:{space:"&nbsp;",useScriptTags:!0,bloggerMode:!1,stripBrs:!1,tagName:"pre",strings:{expandSource:"expand source",help:"?",alert:"SyntaxHighlighter\n\n",noBrush:"Can't find brush for: ",brushNotHtmlScript:"Brush wasn't configured for html-script option: ",aboutDialog:'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title>About SyntaxHighlighter<\/title><\/head><body style="font-family:Geneva,Arial,Helvetica,sans-serif;background-color:#fff;color:#000;font-size:1em;text-align:center;"><div style="text-align:center;margin-top:1.5em;"><div style="font-size:xx-large;">SyntaxHighlighter<\/div><div style="font-size:.75em;margin-bottom:3em;"><div>version 3.0.83 (July 02 2010)<\/div><div><a href="http://alexgorbatchev.com/SyntaxHighlighter" target="_blank" style="color:#005896">http://alexgorbatchev.com/SyntaxHighlighter<\/a><\/div><div>JavaScript code syntax highlighter.<\/div><div>Copyright 2004-2010 Alex Gorbatchev.<\/div><\/div><div>If you like this script, please <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=2930402" style="color:#005896">donate<\/a> to <br/>keep development active!<\/div><\/div><\/body><\/html>'}},vars:{discoveredBrushes:null,highlighters:{}},brushes:{},regexLib:{multiLineCComments:/\/\*[\s\S]*?\*\//gm,singleLineCComments:/\/\/.*$/gm,singleLinePerlComments:/#.*$/gm,doubleQuotedString:/"([^\\"\n]|\\.)*"/g,singleQuotedString:/'([^\\'\n]|\\.)*'/g,multiLineDoubleQuotedString:new XRegExp('"([^\\\\"]|\\\\.)*"',"gs"),multiLineSingleQuotedString:new XRegExp("'([^\\\\']|\\\\.)*'","gs"),xmlComments:/(&lt;|<)!--[\s\S]*?--(&gt;|>)/gm,url:/\w+:\/\/[\w-.\/?%&=:@;]*/g,phpScriptTags:{left:/(&lt;|<)\?=?/g,right:/\?(&gt;|>)/g},aspScriptTags:{left:/(&lt;|<)%=?/g,right:/%(&gt;|>)/g},scriptScriptTags:{left:/(&lt;|<)\s*script.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*script\s*(&gt;|>)/gi}},toolbar:{getHtml:function(t){function e(t,i){return n.toolbar.getButtonHtml(t,i,n.config.strings[i])}for(var u='<div class="toolbar">',f=n.toolbar.items,r=f.list,i=0;i<r.length;i++)u+=(f[r[i]].getHtml||e)(t,r[i]);return u+"<\/div>"},getButtonHtml:function(n,t,i){return'<span><a href="#" class="toolbar_item command_'+t+" "+t+'">'+i+"<\/a><\/span>"},handler:function(t){function e(n){var i=new RegExp(n+"_(\\w+)"),t=i.exec(f);return t?t[1]:null}var i=t.target,f=i.className||"",r=l(o(i,".syntaxhighlighter").id),u=e("command");r&&u&&n.toolbar.items[u].execute(r);t.preventDefault?t.preventDefault():t.returnValue=!1},items:{list:["expandSource","help"],expandSource:{getHtml:function(t){if(t.getParam("collapse")!=!0)return"";var i=t.getParam("title");return n.toolbar.getButtonHtml(t,"expandSource",i?i:n.config.strings.expandSource)},execute:function(n){var t=k(n.id);c(t,"collapsed")}},help:{execute:function(){var t=it("","_blank",500,250,"scrollbars=0"),i=t.document;i.write(n.config.strings.aboutDialog);i.close();t.focus()}}}},findElements:function(t,i){var r=i?[i]:b(document.getElementsByTagName(n.config.tagName)),o=n.config,f=[],u,e;if(o.useScriptTags&&(r=r.concat(at())),r.length===0)return f;for(u=0;u<r.length;u++)(e={target:r[u],params:a(t,ut(r[u].className))},e.params.brush!=null)&&f.push(e);return f},highlight:function(t,i){var h=this.findElements(t,i),e=null,l=n.config,o,c;if(h.length!==0)for(o=0;o<h.length;o++){var i=h[o],r=i.target,u=i.params,f=u.brush,s;if(f!=null){if(u["html-script"]=="true"||n.defaults["html-script"]==!0)e=new n.HtmlScript(f),f="htmlscript";else if(c=y(f),c)e=new c;else continue;s=r["innerHTML"];l.useScriptTags&&(s=vt(s));(r.title||"")!=""&&(u.title=r.title);u.brush=f;e.init(u);i=e.getDiv(s);(r.id||"")!=""&&(i.id=r.id);r.parentNode.replaceChild(i,r)}}},all:function(t){u(window,"load",function(){n.highlight(t)})}};return n.all=n.all,n.highlight=n.highlight,n.Match=function(n,t,i){this.value=n;this.index=t;this.length=n.length;this.css=i;this.brushName=null},n.Match.prototype.toString=function(){return this.value},n.HtmlScript=function(t){function o(n,t){for(var i=0;i<n.length;i++)n[i].index+=t}function c(n){for(var s,l=n.code,t=[],c=i.regexList,a=n.index+n.left.length,f=i.htmlScript,r,h=0;h<c.length;h++)r=e(l,c[h]),o(r,a),t=t.concat(r);for(f.left!=null&&n.left!=null&&(r=e(n.left,f.left),o(r,n.index),t=t.concat(r)),f.right!=null&&n.right!=null&&(r=e(n.right,f.right),o(r,n.index+n[0].lastIndexOf(n.right)),t=t.concat(r)),s=0;s<t.length;s++)t[s].brushName=u.brushName;return t}var u=y(t),i,f=new n.brushes.Xml,h=this,s="getDiv getHtml init".split(" "),r;if(u!=null){for(i=new u,r=0;r<s.length;r++)(function(){var n=s[r];h[n]=function(){return f[n].apply(f,arguments)}})();if(i.htmlScript==null){v(n.config.strings.brushNotHtmlScript+t);return}f.regexList.push({regex:i.htmlScript.code,func:c})}},n.Highlighter=function(){},n.Highlighter.prototype={getParam:function(n,t){var i=this.params[n];return tt(i==null?t:i)},create:function(n){return document.createElement(n)},findMatches:function(n,t){var r=[],i;if(n!=null)for(i=0;i<n.length;i++)typeof n[i]=="object"&&(r=r.concat(e(t,n[i])));return this.removeNestedMatches(r.sort(ct))},removeNestedMatches:function(n){for(var r,f,u,i,t=0;t<n.length;t++)if(n[t]!==null)for(r=n[t],f=r.index+r.length,u=t+1;u<n.length&&n[t]!==null;u++)if(i=n[u],i===null)continue;else if(i.index>f)break;else i.index==r.index&&i.length>r.length?n[t]=null:i.index>=r.index&&i.index<f&&(n[u]=null);return n},figureOutLineNumbers:function(n){var t=[],i=parseInt(this.getParam("first-line"));return s(n,function(n,r){t.push(r+i)}),t},isLineHighlighted:function(n){var t=this.getParam("highlight",[]);return typeof t!="object"&&t.push==null&&(t=[t]),g(t,n.toString())!=-1},getLineHtml:function(n,t,i){var r=["line","number"+t,"index"+n,"alt"+(t%2==0?1:2).toString()];return this.isLineHighlighted(t)&&r.push("highlighted"),t==0&&r.push("break"),'<div class="'+r.join(" ")+'">'+i+"<\/div>"},getLineNumbersHtml:function(i,r){var o="",s=t(i).length,h=parseInt(this.getParam("first-line")),f=this.getParam("pad-line-numbers"),u,e,i;for(f==!0?f=(h+s-1).toString().length:isNaN(f)==!0&&(f=0),u=0;u<s;u++)e=r?r[u]:h+u,i=e==0?n.config.space:ft(e,f),o+=this.getLineHtml(u,e,i);return o},getCodeLinesHtml:function(i,r){var e;i=f(i);var s=t(i),v=this.getParam("pad-line-numbers"),c=parseInt(this.getParam("first-line")),i="",l=this.getParam("brush");for(e=0;e<s.length;e++){var u=s[e],h=/^(&nbsp;|\s)+/.exec(u),o=null,a=r?r[e]:c+e;h!=null&&(o=h[0].toString(),u=u.substr(o.length),o=o.replace(" ",n.config.space));u=f(u);u.length==0&&(u=n.config.space);i+=this.getLineHtml(e,a,(o!=null?'<code class="'+l+' spaces">'+o+"<\/code>":"")+u)}return i},getTitleHtml:function(n){return n?"<caption>"+n+"<\/caption>":""},getMatchesHtml:function(n,t){function s(n){var t=n?n.brushName||o:o;return t?t+" ":""}for(var i,f,r=0,e="",o=this.getParam("brush",""),u=0;u<t.length;u++)(i=t[u],i!==null&&i.length!==0)&&(f=s(i),e+=h(n.substr(r,i.index-r),f+"plain")+h(i.value,f+i.css),r=i.index+i.length+(i.offset||0));return e+h(n.substr(r),s()+"plain")},getHtml:function(t){var i="",u=["syntaxhighlighter"],f,e,o;return this.getParam("light")==!0&&(this.params.toolbar=this.params.gutter=!1),className="syntaxhighlighter",this.getParam("collapse")==!0&&u.push("collapsed"),(gutter=this.getParam("gutter"))==!1&&u.push("nogutter"),u.push(this.getParam("class-name")),u.push(this.getParam("brush")),t=rt(t).replace(/\r/g," "),f=this.getParam("tab-size"),t=this.getParam("smart-tabs")==!0?ot(t,f):et(t,f),t=ht(t),gutter&&(o=this.figureOutLineNumbers(t)),e=this.findMatches(this.regexList,t),i=this.getMatchesHtml(t,e),i=this.getCodeLinesHtml(i,o),this.getParam("auto-links")&&(i=lt(i)),typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.match(/MSIE/)&&u.push("ie"),'<div id="'+r(this.id)+'" class="'+u.join(" ")+'">'+(this.getParam("toolbar")?n.toolbar.getHtml(this):"")+'<table border="0" cellpadding="0" cellspacing="0">'+this.getTitleHtml(this.getParam("title"))+"<tbody><tr>"+(gutter?'<td class="gutter">'+this.getLineNumbersHtml(t)+"<\/td>":"")+'<td class="code"><div class="container">'+i+"<\/div><\/td><\/tr><\/tbody><\/table><\/div>"},getDiv:function(t){t===null&&(t="");this.code=t;var r=this.create("div");r.innerHTML=this.getHtml(t);this.getParam("toolbar")&&u(i(r,".toolbar"),"click",n.toolbar.handler);this.getParam("quick-code")&&u(i(r,".code"),"dblclick",yt);
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! adding 'syntaxhighlighterHolder' class here, GK !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
return $(r).addClass("syntaxhighlighterHolder").get(0)},init:function(t){this.id=nt();d(this);this.params=a(n.defaults,t||{});this.getParam("light")==!0&&(this.params.toolbar=this.params.gutter=!1)},getKeywords:function(n){return n=n.replace(/^\s+|\s+$/g,"").replace(/\s+/g,"|"),"\\b(?:"+n+")\\b"},forHtmlScript:function(n){this.htmlScript={left:{regex:n.left,css:"script"},right:{regex:n.right,css:"script"},code:new XRegExp("(?<left>"+n.left.source+")(?<code>.*?)(?<right>"+n.right.source+")","sgi")}}},n}();typeof exports!="undefined"?exports.SyntaxHighlighter=SyntaxHighlighter:null;
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
eval(function(n,t,i,r,u,f){if(u=function(n){return(n<t?"":u(parseInt(n/t)))+((n=n%t)>35?String.fromCharCode(n+29):n.toString(36))},!"".replace(/^/,String)){while(i--)f[u(i)]=r[i]||u(i);r=[function(n){return f[n]}];u=function(){return"\\w+"};i=1}while(i--)r[i]&&(n=n.replace(new RegExp("\\b"+u(i)+"\\b","g"),r[i]));return n}('(2(){1 h=5;h.I=2(){2 n(c,a){4(1 d=0;d<c.9;d++)i[c[d]]=a}2 o(c){1 a=r.H("J"),d=3;a.K=c;a.M="L/t";a.G="t";a.u=a.v=2(){6(!d&&(!8.7||8.7=="F"||8.7=="z")){d=q;e[c]=q;a:{4(1 p y e)6(e[p]==3)B a;j&&5.C(k)}a.u=a.v=x;a.D.O(a)}};r.N.R(a)}1 f=Q,l=h.P(),i={},e={},j=3,k=x,b;5.T=2(c){k=c;j=q};4(b=0;b<f.9;b++){1 m=f[b].w?f[b]:f[b].S(/\\s+/),g=m.w();n(m,g)}4(b=0;b<l.9;b++)6(g=i[l[b].E.A]){e[g]=3;o(g)}}})();',56,56,"|var|function|false|for|SyntaxHighlighter|if|readyState|this|length|||||||||||||||||true|document||javascript|onload|onreadystatechange|pop|null|in|complete|brush|break|highlight|parentNode|params|loaded|language|createElement|autoloader|script|src|text|type|body|removeChild|findElements|arguments|appendChild|split|all".split("|"),0,{}));
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
(function(){function n(){this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^ *#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords("ATOM BOOL BOOLEAN BYTE CHAR COLORREF DWORD DWORDLONG DWORD_PTR DWORD32 DWORD64 FLOAT HACCEL HALF_PTR HANDLE HBITMAP HBRUSH HCOLORSPACE HCONV HCONVLIST HCURSOR HDC HDDEDATA HDESK HDROP HDWP HENHMETAFILE HFILE HFONT HGDIOBJ HGLOBAL HHOOK HICON HINSTANCE HKEY HKL HLOCAL HMENU HMETAFILE HMODULE HMONITOR HPALETTE HPEN HRESULT HRGN HRSRC HSZ HWINSTA HWND INT INT_PTR INT32 INT64 LANGID LCID LCTYPE LGRPID LONG LONGLONG LONG_PTR LONG32 LONG64 LPARAM LPBOOL LPBYTE LPCOLORREF LPCSTR LPCTSTR LPCVOID LPCWSTR LPDWORD LPHANDLE LPINT LPLONG LPSTR LPTSTR LPVOID LPWORD LPWSTR LRESULT PBOOL PBOOLEAN PBYTE PCHAR PCSTR PCTSTR PCWSTR PDWORDLONG PDWORD_PTR PDWORD32 PDWORD64 PFLOAT PHALF_PTR PHANDLE PHKEY PINT PINT_PTR PINT32 PINT64 PLCID PLONG PLONGLONG PLONG_PTR PLONG32 PLONG64 POINTER_32 POINTER_64 PSHORT PSIZE_T PSSIZE_T PSTR PTBYTE PTCHAR PTSTR PUCHAR PUHALF_PTR PUINT PUINT_PTR PUINT32 PUINT64 PULONG PULONGLONG PULONG_PTR PULONG32 PULONG64 PUSHORT PVOID PWCHAR PWORD PWSTR SC_HANDLE SC_LOCK SERVICE_STATUS_HANDLE SHORT SIZE_T SSIZE_T TBYTE TCHAR UCHAR UHALF_PTR UINT UINT_PTR UINT32 UINT64 ULONG ULONGLONG ULONG_PTR ULONG32 ULONG64 USHORT USN VOID WCHAR WORD WPARAM WPARAM WPARAM char bool short int __int32 __int64 __int8 __int16 long float double __wchar_t clock_t _complex _dev_t _diskfree_t div_t ldiv_t _exception _EXCEPTION_POINTERS FILE _finddata_t _finddatai64_t _wfinddata_t _wfinddatai64_t __finddata64_t __wfinddata64_t _FPIEEE_RECORD fpos_t _HEAPINFO _HFILE lconv intptr_t jmp_buf mbstate_t _off_t _onexit_t _PNH ptrdiff_t _purecall_handler sig_atomic_t size_t _stat __stat64 _stati64 terminate_function time_t __time64_t _timeb __timeb64 tm uintptr_t _utimbuf va_list wchar_t wctrans_t wctype_t wint_t signed"),"gm"),css:"color1 bold"},{regex:new RegExp(this.getKeywords("assert isalnum isalpha iscntrl isdigit isgraph islower isprintispunct isspace isupper isxdigit tolower toupper errno localeconv setlocale acos asin atan atan2 ceil cos cosh exp fabs floor fmod frexp ldexp log log10 modf pow sin sinh sqrt tan tanh jmp_buf longjmp setjmp raise signal sig_atomic_t va_arg va_end va_start clearerr fclose feof ferror fflush fgetc fgetpos fgets fopen fprintf fputc fputs fread freopen fscanf fseek fsetpos ftell fwrite getc getchar gets perror printf putc putchar puts remove rename rewind scanf setbuf setvbuf sprintf sscanf tmpfile tmpnam ungetc vfprintf vprintf vsprintf abort abs atexit atof atoi atol bsearch calloc div exit free getenv labs ldiv malloc mblen mbstowcs mbtowc qsort rand realloc srand strtod strtol strtoul system wcstombs wctomb memchr memcmp memcpy memmove memset strcat strchr strcmp strcoll strcpy strcspn strerror strlen strncat strncmp strncpy strpbrk strrchr strspn strstr strtok strxfrm asctime clock ctime difftime gmtime localtime mktime strftime time"),"gm"),css:"functions bold"},{regex:new RegExp(this.getKeywords("auto break case catch class const __finally __exception __try const_cast continue private public protected __declspec default delete deprecated dllexport dllimport do dynamic_cast else enum explicit extern if for friend goto inline mutable naked namespace new noinline noreturn nothrow ref register reinterpret_cast return selectany sizeof static static_cast struct switch template this thread throw true false try typedef typeid typename union using uuid virtual void volatile whcar_t while"),"gm"),css:"keyword bold"}]}typeof require!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;n.prototype=new SyntaxHighlighter.Highlighter;n.aliases=["cpp","c"];SyntaxHighlighter.brushes.Cpp=n;typeof exports!="undefined"?exports.Brush=n:null})();
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
(function(){function n(){function n(n){var t=n[0].indexOf("///")==0?"color1":"comments";return[new SyntaxHighlighter.Match(n[0],n.index,t)]}this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,func:n},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:/@"(?:[^"]|"")*"/g,css:"string"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/^\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords("abstract as ascending async await base bool break by byte case catch char checked class const continue decimal default delegate descending do double dynamic else enum equals event explicit extern false finally fixed float for foreach from get goto group if implicit in int interface internal into is join lock long namespace new null object on operator orderby out override params private protected public readonly ref return sbyte sealed select set short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using var virtual void where while"),"gm"),css:"keyword"},{regex:/\bpartial(?=\s+(?:class|interface|struct)\b)/g,css:"keyword"},{regex:/\byield(?=\s+(?:return|break)\b)/g,css:"keyword"}];this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags)}typeof require!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;n.prototype=new SyntaxHighlighter.Highlighter;n.aliases=["c#","c-sharp","csharp"];SyntaxHighlighter.brushes.CSharp=n;typeof exports!="undefined"?exports.Brush=n:null})();
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
(function(){function n(){function n(n){return"\\b([a-z_]|)"+n.replace(/ /g,"(?=:)\\b|\\b([a-z_\\*]|\\*|)")+"(?=:)\\b"}function t(n){return"\\b"+n.replace(/ /g,"(?!-)(?!:)\\b|\\b()")+":\\b"}this.regexList=[{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\#[a-fA-F0-9]{3,6}/g,css:"value"},{regex:/(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g,css:"value"},{regex:/!important/g,css:"color3"},{regex:new RegExp(n("ascent azimuth background-attachment background-color background-image background-position background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index"),"gm"),css:"keyword"},{regex:new RegExp(t("above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow"),"g"),css:"value"},{regex:new RegExp(this.getKeywords("[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif"),"g"),css:"color1"}];this.forHtmlScript({left:/(&lt;|<)\s*style.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*style\s*(&gt;|>)/gi})}typeof require!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;n.prototype=new SyntaxHighlighter.Highlighter;n.aliases=["css"];SyntaxHighlighter.brushes.CSS=n;typeof exports!="undefined"?exports.Brush=n:null})();
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
(function(){function n(){this.regexList=[{regex:/\(\*[\s\S]*?\*\)/gm,css:"comments"},{regex:/{(?!\$)[\s\S]*?}/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\{\$[a-zA-Z]+ .+\}/g,css:"color1"},{regex:/\b[\d\.]+\b/g,css:"value"},{regex:/\$[a-zA-Z0-9]+\b/g,css:"value"},{regex:new RegExp(this.getKeywords("abs addr and ansichar ansistring array as asm begin boolean byte cardinal case char class comp const constructor currency destructor div do double downto else end except exports extended false file finalization finally for function goto if implementation in inherited int64 initialization integer interface is label library longint longword mod nil not object of on or packed pansichar pansistring pchar pcurrency pdatetime pextended pint64 pointer private procedure program property pshortstring pstring pvariant pwidechar pwidestring protected public published raise real real48 record repeat set shl shortint shortstring shr single smallint string then threadvar to true try type unit until uses val var varirnt while widechar widestring with word write writeln xor"),"gmi"),css:"keyword"}]}typeof require!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;n.prototype=new SyntaxHighlighter.Highlighter;n.aliases=["delphi","pascal","pas"];SyntaxHighlighter.brushes.Delphi=n;typeof exports!="undefined"?exports.Brush=n:null})();
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
(function(){function n(){this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:/\/\*([^\*][\s\S]*)?\*\//gm,css:"comments"},{regex:/\/\*(?!\*\/)\*[\s\S]*?\*\//gm,css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,css:"value"},{regex:/(?!\@interface\b)\@[\$\w]+\b/g,css:"color1"},{regex:/\@interface\b/g,css:"color2"},{regex:new RegExp(this.getKeywords("abstract assert boolean break byte case catch char class const continue default do double else enum extends false final finally float for goto if implements import instanceof int interface long native new null package private protected public return short static strictfp super switch synchronized this throw throws true transient try void volatile while"),"gm"),css:"keyword"}];this.forHtmlScript({left:/(&lt;|<)%[@!=]?/g,right:/%(&gt;|>)/g})}typeof require!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;n.prototype=new SyntaxHighlighter.Highlighter;n.aliases=["java"];SyntaxHighlighter.brushes.Java=n;typeof exports!="undefined"?exports.Brush=n:null})();
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
(function(){function n(){var n=SyntaxHighlighter.regexLib;this.regexList=[{regex:n.multiLineDoubleQuotedString,css:"string"},{regex:n.multiLineSingleQuotedString,css:"string"},{regex:n.singleLineCComments,css:"comments"},{regex:n.multiLineCComments,css:"comments"},{regex:/\s*#.*/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords("break case catch continue default delete do else false  for function if in instanceof new null return super switch this throw true try typeof var while with"),"gm"),css:"keyword"}];this.forHtmlScript(n.scriptScriptTags)}typeof require!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;n.prototype=new SyntaxHighlighter.Highlighter;n.aliases=["js","jscript","javascript"];SyntaxHighlighter.brushes.JScript=n;typeof exports!="undefined"?exports.Brush=n:null})();
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
(function(){function n(){this.regexList=[{regex:new RegExp("#[^!].*$","gm"),css:"comments"},{regex:new RegExp("^\\s*#!.*$","gm"),css:"preprocessor"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp("(\\$|@|%)\\w+","g"),css:"variable"},{regex:new RegExp(this.getKeywords("abs accept alarm atan2 bind binmode chdir chmod chomp chop chown chr chroot close closedir connect cos crypt defined delete each endgrent endhostent endnetent endprotoent endpwent endservent eof exec exists exp fcntl fileno flock fork format formline getc getgrent getgrgid getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr getnetbyname getnetent getpeername getpgrp getppid getpriority getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid getservbyname getservbyport getservent getsockname getsockopt glob gmtime grep hex index int ioctl join keys kill lc lcfirst length link listen localtime lock log lstat map mkdir msgctl msgget msgrcv msgsnd oct open opendir ord pack pipe pop pos print printf prototype push quotemeta rand read readdir readline readlink readpipe recv rename reset reverse rewinddir rindex rmdir scalar seek seekdir select semctl semget semop send setgrent sethostent setnetent setpgrp setpriority setprotoent setpwent setservent setsockopt shift shmctl shmget shmread shmwrite shutdown sin sleep socket socketpair sort splice split sprintf sqrt srand stat study substr symlink syscall sysopen sysread sysseek system syswrite tell telldir time times tr truncate uc ucfirst umask undef unlink unpack unshift utime values vec wait waitpid warn write"),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords("bless caller continue dbmclose dbmopen die do dump else elsif eval exit for foreach goto if import last local my next no our package redo ref require return sub tie tied unless untie until use wantarray while"),"gm"),css:"keyword"}];this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags)}typeof require!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;n.prototype=new SyntaxHighlighter.Highlighter;n.aliases=["perl","Perl","pl"];SyntaxHighlighter.brushes.Perl=n;typeof exports!="undefined"?exports.Brush=n:null})();
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
(function(){function n(){this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineCComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\$\w+/g,css:"variable"},{regex:new RegExp(this.getKeywords("abs acos acosh addcslashes addslashes array_change_key_case array_chunk array_combine array_count_values array_diff array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill array_filter array_flip array_intersect array_intersect_assoc array_intersect_key array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map array_merge array_merge_recursive array_multisort array_pad array_pop array_product array_push array_rand array_reduce array_reverse array_search array_shift array_slice array_splice array_sum array_udiff array_udiff_assoc array_udiff_uassoc array_uintersect array_uintersect_assoc array_uintersect_uassoc array_unique array_unshift array_values array_walk array_walk_recursive atan atan2 atanh base64_decode base64_encode base_convert basename bcadd bccomp bcdiv bcmod bcmul bindec bindtextdomain bzclose bzcompress bzdecompress bzerrno bzerror bzerrstr bzflush bzopen bzread bzwrite ceil chdir checkdate checkdnsrr chgrp chmod chop chown chr chroot chunk_split class_exists closedir closelog copy cos cosh count count_chars date decbin dechex decoct deg2rad delete ebcdic2ascii echo empty end ereg ereg_replace eregi eregi_replace error_log error_reporting escapeshellarg escapeshellcmd eval exec exit exp explode extension_loaded feof fflush fgetc fgetcsv fgets fgetss file_exists file_get_contents file_put_contents fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype floatval flock floor flush fmod fnmatch fopen fpassthru fprintf fputcsv fputs fread fscanf fseek fsockopen fstat ftell ftok getallheaders getcwd getdate getenv gethostbyaddr gethostbyname gethostbynamel getimagesize getlastmod getmxrr getmygid getmyinode getmypid getmyuid getopt getprotobyname getprotobynumber getrandmax getrusage getservbyname getservbyport gettext gettimeofday gettype glob gmdate gmmktime ini_alter ini_get ini_get_all ini_restore ini_set interface_exists intval ip2long is_a is_array is_bool is_callable is_dir is_double is_executable is_file is_finite is_float is_infinite is_int is_integer is_link is_long is_nan is_null is_numeric is_object is_readable is_real is_resource is_scalar is_soap_fault is_string is_subclass_of is_uploaded_file is_writable is_writeable mkdir mktime nl2br parse_ini_file parse_str parse_url passthru pathinfo print readlink realpath rewind rewinddir rmdir round str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split str_word_count strcasecmp strchr strcmp strcoll strcspn strftime strip_tags stripcslashes stripos stripslashes stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk strpos strptime strrchr strrev strripos strrpos strspn strstr strtok strtolower strtotime strtoupper strtr strval substr substr_compare"),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords("__FILE__ __LINE__ __METHOD__ __FUNCTION__ __CLASS__"),"gmi"),css:"constants"},{regex:new RegExp(this.getKeywords("abstract and array as break case catch cfunction class clone const continue declare default die do else elseif enddeclare endfor endforeach endif endswitch endwhile extends final for foreach function include include_once global goto if implements interface instanceof namespace new old_function or private protected public return require require_once static switch throw try use var while xor "),"gm"),css:"keyword"}];this.forHtmlScript(SyntaxHighlighter.regexLib.phpScriptTags)}typeof require!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;n.prototype=new SyntaxHighlighter.Highlighter;n.aliases=["php"];SyntaxHighlighter.brushes.Php=n;typeof exports!="undefined"?exports.Brush=n:null})();
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
(function(){function n(){}typeof require!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;n.prototype=new SyntaxHighlighter.Highlighter;n.aliases=["text","plain"];SyntaxHighlighter.brushes.Plain=n;typeof exports!="undefined"?exports.Brush=n:null})();
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
(function(){function n(){this.regexList=[{regex:/#.*$/gm,css:"comments"},{regex:/\$[a-zA-Z0-9]+\b/g,css:"value"},{regex:/\-[a-zA-Z]+\b/g,css:"keyword"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords("Add-Content Add-History Add-Member Add-PSSnapin Clear(-Content)? Clear-Item Clear-ItemProperty Clear-Variable Compare-Object ConvertFrom-SecureString Convert-Path ConvertTo-Html ConvertTo-SecureString Copy(-Item)? Copy-ItemProperty Export-Alias Export-Clixml Export-Console Export-Csv ForEach(-Object)? Format-Custom Format-List Format-Table Format-Wide Get-Acl Get-Alias Get-AuthenticodeSignature Get-ChildItem Get-Command Get-Content Get-Credential Get-Culture Get-Date Get-EventLog Get-ExecutionPolicy Get-Help Get-History Get-Host Get-Item Get-ItemProperty Get-Location Get-Member Get-PfxCertificate Get-Process Get-PSDrive Get-PSProvider Get-PSSnapin Get-Service Get-TraceSource Get-UICulture Get-Unique Get-Variable Get-WmiObject Group-Object Import-Alias Import-Clixml Import-Csv Invoke-Expression Invoke-History Invoke-Item Join-Path Measure-Command Measure-Object Move(-Item)? Move-ItemProperty New-Alias New-Item New-ItemProperty New-Object New-PSDrive New-Service New-TimeSpan New-Variable Out-Default Out-File Out-Host Out-Null Out-Printer Out-String Pop-Location Push-Location Read-Host Remove-Item Remove-ItemProperty Remove-PSDrive Remove-PSSnapin Remove-Variable Rename-Item Rename-ItemProperty Resolve-Path Restart-Service Resume-Service Select-Object Select-String Set-Acl Set-Alias Set-AuthenticodeSignature Set-Content Set-Date Set-ExecutionPolicy Set-Item Set-ItemProperty Set-Location Set-PSDebug Set-Service Set-TraceSource Set(-Variable)? Sort-Object Split-Path Start-Service Start-Sleep Start-Transcript Stop-Process Stop-Service Stop-Transcript Suspend-Service Tee-Object Test-Path Trace-Command Update-FormatData Update-TypeData Where(-Object)? Write-Debug Write-Error Write(-Host)? Write-Output Write-Progress Write-Verbose Write-Warning"),"gmi"),css:"keyword"},{regex:new RegExp(this.getKeywords("ac asnp clc cli clp clv cpi cpp cvpa diff epal epcsv fc fl ft fw gal gc gci gcm gdr ghy gi gl gm gp gps group gsv gsnp gu gv gwmi iex ihy ii ipal ipcsv mi mp nal ndr ni nv oh rdr ri rni rnp rp rsnp rv rvpa sal sasv sc select si sl sleep sort sp spps spsv sv tee cat cd cp h history kill lp ls mount mv popd ps pushd pwd r rm rmdir echo cls chdir del dir erase rd ren type % \\?"),"gmi"),css:"keyword"}]}typeof require!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;n.prototype=new SyntaxHighlighter.Highlighter;n.aliases=["powershell","ps"];SyntaxHighlighter.brushes.PowerShell=n;typeof exports!="undefined"?exports.Brush=n:null})();
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
(function(){function n(){this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:/^\s*@\w+/gm,css:"decorator"},{regex:/(['\"]{3})([^\1])*?\1/gm,css:"comments"},{regex:/"(?!")(?:\.|\\\"|[^\""\n])*"/gm,css:"string"},{regex:/'(?!')(?:\.|(\\\')|[^\''\n])*'/gm,css:"string"},{regex:/\+|\-|\*|\/|\%|=|==/gm,css:"keyword"},{regex:/\b\d+\.?\w*/g,css:"value"},{regex:new RegExp(this.getKeywords("__import__ abs all any apply basestring bin bool buffer callable chr classmethod cmp coerce compile complex delattr dict dir divmod enumerate eval execfile file filter float format frozenset getattr globals hasattr hash help hex id input int intern isinstance issubclass iter len list locals long map max min next object oct open ord pow print property range raw_input reduce reload repr reversed round set setattr slice sorted staticmethod str sum super tuple type type unichr unicode vars xrange zip"),"gmi"),css:"functions"},{regex:new RegExp(this.getKeywords("and assert break class continue def del elif else except exec finally for from global if import in is lambda not or pass print raise return try yield while"),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords("None True False self cls class_"),"gm"),css:"color1"}];this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags)}typeof require!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;n.prototype=new SyntaxHighlighter.Highlighter;n.aliases=["py","python"];SyntaxHighlighter.brushes.Python=n;typeof exports!="undefined"?exports.Brush=n:null})();
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
(function(){function n(){this.regexList=[{regex:SyntaxHighlighter.regexLib.singleLinePerlComments,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.singleQuotedString,css:"string"},{regex:/\b[A-Z0-9_]+\b/g,css:"constants"},{regex:/:[a-z][A-Za-z0-9_]*/g,css:"color2"},{regex:/(\$|@@|@)\w+/g,css:"variable bold"},{regex:new RegExp(this.getKeywords("alias and BEGIN begin break case class def define_method defined do each else elsif END end ensure false for if in module new next nil not or raise redo rescue retry return self super then throw true undef unless until when while yield"),"gm"),css:"keyword"},{regex:new RegExp(this.getKeywords("Array Bignum Binding Class Continuation Dir Exception FalseClass File::Stat File Fixnum Fload Hash Integer IO MatchData Method Module NilClass Numeric Object Proc Range Regexp String Struct::TMS Symbol ThreadGroup Thread Time TrueClass"),"gm"),css:"color1"}];this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags)}typeof require!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;n.prototype=new SyntaxHighlighter.Highlighter;n.aliases=["ruby","rails","ror","rb"];SyntaxHighlighter.brushes.Ruby=n;typeof exports!="undefined"?exports.Brush=n:null})();
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
(function(){function n(){this.regexList=[{regex:/--(.*)$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.multiLineDoubleQuotedString,css:"string"},{regex:SyntaxHighlighter.regexLib.multiLineSingleQuotedString,css:"string"},{regex:new RegExp(this.getKeywords("abs avg case cast coalesce convert count current_timestamp current_user day isnull left lower month nullif replace right session_user space substring sum system_user upper user year"),"gmi"),css:"color2"},{regex:new RegExp(this.getKeywords("all and any between cross in join like not null or outer some"),"gmi"),css:"color1"},{regex:new RegExp(this.getKeywords("absolute action add after alter as asc at authorization begin bigint binary bit by cascade char character check checkpoint close collate column commit committed connect connection constraint contains continue create cube current current_date current_time cursor database date deallocate dec decimal declare default delete desc distinct double drop dynamic else end end-exec escape except exec execute false fetch first float for force foreign forward free from full function global goto grant group grouping having hour ignore index inner insensitive insert instead int integer intersect into is isolation key last level load local max min minute modify move name national nchar next no numeric of off on only open option order out output partial password precision prepare primary prior privileges procedure public read real references relative repeatable restrict return returns revoke rollback rollup rows rule schema scroll second section select sequence serializable set size smallint static statistics table temp temporary then time timestamp to top transaction translation trigger true truncate uncommitted union unique update values varchar varying view when where with work"),"gmi"),css:"keyword"}]}typeof require!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;n.prototype=new SyntaxHighlighter.Highlighter;n.aliases=["sql"];SyntaxHighlighter.brushes.Sql=n;typeof exports!="undefined"?exports.Brush=n:null})();
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
(function(){function n(){this.regexList=[{regex:/'.*$/gm,css:"comments"},{regex:SyntaxHighlighter.regexLib.doubleQuotedString,css:"string"},{regex:/^\s*#.*$/gm,css:"preprocessor"},{regex:new RegExp(this.getKeywords("AddHandler AddressOf AndAlso Alias And Ansi As Ascending Assembly Async Auto Await Boolean ByRef Byte ByVal By Call Case Catch CBool CByte CChar CDate CDec CDbl Char CInt Class CLng CObj Const CShort CSng CStr CType Date Descending Decimal Declare Default Delegate Dim DirectCast Do Double Each Else ElseIf End Enum Equals Erase Error Event Exit False Finally For From Friend Function Get GetType GoSub GoTo Group Handles If Implements Imports In Inherits Integer Interface Into Is Join Let Lib Like Long Loop Me Mod Module MustInherit MustOverride MyBase MyClass Namespace New Next Not Nothing NotInheritable NotOverridable Object On Option Optional Or Order OrElse Overloads Overridable Overrides ParamArray Preserve Private Property Protected Public RaiseEvent ReadOnly ReDim REM RemoveHandler Resume Return Select Set Shadows Shared Short Single Static Step Stop String Structure Sub SyncLock Then Throw To True Try TypeOf Unicode Until Variant When While With WithEvents Where WriteOnly Xor"),"gm"),css:"keyword"}];this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags)}typeof require!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;n.prototype=new SyntaxHighlighter.Highlighter;n.aliases=["vb","vbnet"];SyntaxHighlighter.brushes.Vb=n;typeof exports!="undefined"?exports.Brush=n:null})();
/**
 * SyntaxHighlighter
 * http://alexgorbatchev.com/SyntaxHighlighter
 *
 * SyntaxHighlighter is donationware. If you are using it, please donate.
 * http://alexgorbatchev.com/SyntaxHighlighter/donate.html
 *
 * @version
 * 3.0.83 (July 02 2010)
 * 
 * @copyright
 * Copyright (C) 2004-2010 Alex Gorbatchev.
 *
 * @license
 * Dual licensed under the MIT and GPL licenses.
 */
(function(){function n(){function n(n){var u=SyntaxHighlighter.Match,f=n[0],i=new XRegExp("(&lt;|<)[\\s\\/\\?]*(?<name>[:\\w-\\.]+)","xg").exec(f),r=[],t,e;if(n.attributes!=null)for(e=new XRegExp("(?<name> [\\w:\\-\\.]+)\\s*=\\s*(?<value> \".*?\"|'.*?'|\\w+)","xg");(t=e.exec(f))!=null;)r.push(new u(t.name,n.index+t.index,"color1")),r.push(new u(t.value,n.index+t.index+t[0].indexOf(t.value),"string"));return i!=null&&r.push(new u(i.name,n.index+i[0].indexOf(i.name),"keyword")),r}this.regexList=[{regex:new XRegExp("(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)","gm"),css:"color2"},{regex:SyntaxHighlighter.regexLib.xmlComments,css:"comments"},{regex:new XRegExp("(&lt;|<)[\\s\\/\\?]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)","sg"),func:n}]}typeof require!="undefined"?SyntaxHighlighter=require("shCore").SyntaxHighlighter:null;n.prototype=new SyntaxHighlighter.Highlighter;n.aliases=["xml","xhtml","xslt","html"];SyntaxHighlighter.brushes.Xml=n;typeof exports!="undefined"?exports.Brush=n:null})();
$(function(){typeof SyntaxHighlighter=="object"&&(SyntaxHighlighter.defaults.toolbar=!1,SyntaxHighlighter.all())});