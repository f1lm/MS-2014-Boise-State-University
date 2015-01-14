/*
 *	jQuery dotdotdot 1.6.17
 *
 *	Copyright (c) Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	dotdotdot.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */
(function(d,x){function y(a,b,m,c,g){var l=!1;a.contents().detach().each(function(){var h=d(this);if("undefined"==typeof this||3==this.nodeType&&0==d.trim(this.data).length)return!0;if(h.is("script, .dotdotdot-keep"))a.append(h);else{if(l)return!0;a.append(h);if(g)a[a.is("table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style")?"after":"append"](g);if(w(m,c)){if(3==this.nodeType){var k=h[0];if(k){var p=z(k),f=
-1!==p.indexOf(" ")?" ":"\u3000",f="letter"==c.wrap?"":f,e=p.split(f),q=-1,n=-1,s=0,r=e.length-1;c.fallbackToLetter&&0==s&&0==r&&(f="",e=p.split(f),r=e.length-1);for(;s<=r&&(0!=s||0!=r);){p=Math.floor((s+r)/2);if(p==n)break;n=p;u(k,e.slice(0,n+1).join(f)+c.ellipsis);w(m,c)?(r=n,c.fallbackToLetter&&0==s&&0==r&&(f="",e=e[0].split(f),n=q=-1,s=0,r=e.length-1)):s=q=n}-1==q||1==e.length&&0==e[0].length?(p=h.parent(),h.detach(),f=g&&g.closest(p).length?g.length:0,p.contents().length>f?k=v(p.contents().eq(-1-
f),b):(k=v(p,b,!0),f||p.detach()),k&&(p=A(z(k),c),u(k,p),f&&g&&d(k).parent().append(g))):(p=A(e.slice(0,q+1).join(f),c),u(k,p));l=!0}else l=!1}else l=y(h,b,m,c,g);l||(h.detach(),l=!0)}l||g&&g.detach()}});return l}function w(a,b){return a.innerHeight()>b.maxHeight}function A(a,b){for(;-1<d.inArray(a.slice(-1),b.lastCharacter.remove);)a=a.slice(0,-1);0>d.inArray(a.slice(-1),b.lastCharacter.noEllipsis)&&(a+=b.ellipsis);return a}function B(a){return{width:a.innerWidth(),height:a.innerHeight()}}function u(a,
b){a.innerText?a.innerText=b:a.nodeValue?a.nodeValue=b:a.textContent&&(a.textContent=b)}function z(a){return a.innerText?a.innerText:a.nodeValue?a.nodeValue:a.textContent?a.textContent:""}function C(a){do a=a.previousSibling;while(a&&1!==a.nodeType&&3!==a.nodeType);return a}function v(a,b,m){var c=a&&a[0];if(c){if(!m){if(3===c.nodeType)return c;if(d.trim(a.text()))return v(a.contents().last(),b)}for(m=C(c);!m;){a=a.parent();if(a.is(b)||!a.length)return!1;m=C(a[0])}if(m)return v(d(m),b)}return!1}function D(a,
b){return a?"string"===typeof a?(a=d(a,b),a.length?a:!1):a.jquery?a:!1:!1}if(!d.fn.dotdotdot){d.fn.dotdotdot=function(a){if(0==this.length)return d.fn.dotdotdot.debug('No element found for "'+this.selector+'".'),this;if(1<this.length)return this.each(function(){d(this).dotdotdot(a)});var b=this;b.data("dotdotdot")&&b.trigger("destroy.dot");b.data("dotdotdot-style",b.attr("style")||"");b.css("word-wrap","break-word");"nowrap"===b.css("white-space")&&b.css("white-space","normal");b.bind_events=function(){b.bind("update.dot",
function(a,f){a.preventDefault();a.stopPropagation();var e=c,q;if("number"==typeof c.height)q=c.height;else{q=b.innerHeight();for(var n=["paddingTop","paddingBottom"],h=0,l=n.length;h<l;h++){var t=parseInt(b.css(n[h]),10);isNaN(t)&&(t=0);q-=t}}e.maxHeight=q;c.maxHeight+=c.tolerance;if("undefined"!=typeof f){if("string"==typeof f||f instanceof HTMLElement)f=d("<div />").append(f).contents();f instanceof d&&(m=f)}k=b.wrapInner('<div class="dotdotdot" />').children();k.contents().detach().end().append(m.clone(!0)).find("br").replaceWith("  <br />  ").end().css({height:"auto",
width:"auto",border:"none",padding:0,margin:0});e=n=!1;g.afterElement&&(n=g.afterElement.clone(!0),n.show(),g.afterElement.detach());if(w(k,c))if("children"==c.wrap){e=k;q=c;h=e.children();l=!1;e.empty();for(var t=0,v=h.length;t<v;t++){var u=h.eq(t);e.append(u);n&&e.append(n);if(w(e,q)){u.remove();l=!0;break}else n&&n.detach()}e=l}else e=y(k,b,k,c,n);k.replaceWith(k.contents());k=null;d.isFunction(c.callback)&&c.callback.call(b[0],e,m);return g.isTruncated=e}).bind("isTruncated.dot",function(a,c){a.preventDefault();
a.stopPropagation();"function"==typeof c&&c.call(b[0],g.isTruncated);return g.isTruncated}).bind("originalContent.dot",function(a,c){a.preventDefault();a.stopPropagation();"function"==typeof c&&c.call(b[0],m);return m}).bind("destroy.dot",function(a){a.preventDefault();a.stopPropagation();b.unwatch().unbind_events().contents().detach().end().append(m).attr("style",b.data("dotdotdot-style")||"").data("dotdotdot",!1)});return b};b.unbind_events=function(){b.unbind(".dot");return b};b.watch=function(){b.unwatch();
if("window"==c.watch){var a=d(window),f=a.width(),e=a.height();a.bind("resize.dot"+g.dotId,function(){f==a.width()&&e==a.height()&&c.windowResizeFix||(f=a.width(),e=a.height(),h&&clearInterval(h),h=setTimeout(function(){b.trigger("update.dot")},100))})}else l=B(b),h=setInterval(function(){if(b.is(":visible")){var a=B(b);if(l.width!=a.width||l.height!=a.height)b.trigger("update.dot"),l=a}},500);return b};b.unwatch=function(){d(window).unbind("resize.dot"+g.dotId);h&&clearInterval(h);return b};var m=
b.contents(),c=d.extend(!0,{},d.fn.dotdotdot.defaults,a),g={},l={},h=null,k=null;c.lastCharacter.remove instanceof Array||(c.lastCharacter.remove=d.fn.dotdotdot.defaultArrays.lastCharacter.remove);c.lastCharacter.noEllipsis instanceof Array||(c.lastCharacter.noEllipsis=d.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis);g.afterElement=D(c.after,b);g.isTruncated=!1;g.dotId=E++;b.data("dotdotdot",!0).bind_events().trigger("update.dot");c.watch&&b.watch();return b};d.fn.dotdotdot.defaults={ellipsis:"... ",
wrap:"word",fallbackToLetter:!0,lastCharacter:{},tolerance:0,callback:null,after:null,height:null,watch:!1,windowResizeFix:!0};d.fn.dotdotdot.defaultArrays={lastCharacter:{remove:" \u3000,;.!?".split(""),noEllipsis:[]}};d.fn.dotdotdot.debug=function(a){};var E=1,F=d.fn.html;d.fn.html=function(a){return a!=x&&!d.isFunction(a)&&this.data("dotdotdot")?this.trigger("update.dot",[a]):F.apply(this,arguments)};var G=d.fn.text;d.fn.text=function(a,b){return a!=x&&!d.isFunction(a)&&this.data("dotdotdot")&&
!0!==b?(a=d("<div />").text(a).html(),this.trigger("update.dot",[a])):G.apply(this,null!=b?[a]:arguments)}}})(jQuery);