/*!CK:3888500096!*//*1423460204,*/

if (self.CavalryLogger) { CavalryLogger.start_js(["1OFhI"]); }

__d("BanzaiScuba",["Banzai","copyProperties"],function(a,b,c,d,e,f,g,h){var i="scuba_sample";function j(m,n,o){this.fields={};this.post=function(p){if(!m)return;var q={};h(q,this.fields);q._ds=m;if(n)q._lid=n;q._options=o;g.post(i,q,p);this.post=function(){};this.posted=true;};this.lid=n;return this;}function k(m,n,o){if(!this.fields[m])this.fields[m]={};this.fields[m][n]=o;return this;}function l(m){return function(n,o){if(this.posted)return this;return k.call(this,m,n,o);};}h(j.prototype,{post:function(){},addNormal:l('normal'),addInteger:l('int'),addDenorm:l('denorm'),addTagset:l('tags'),addNormVector:l('normvector')});e.exports=j;},null);
__d("BasicVector",[],function(a,b,c,d,e,f){function g(h,i){"use strict";this.x=h;this.y=i;}g.prototype.derive=function(h,i){"use strict";return new g(h,i);};g.prototype.toString=function(){"use strict";return '('+this.x+', '+this.y+')';};g.prototype.add=function(h,i){"use strict";if(h instanceof g){i=h.y;h=h.x;}var j=parseFloat(h),k=parseFloat(i);return this.derive(this.x+j,this.y+k);};g.prototype.mul=function(h,i){"use strict";if(i===(void 0))i=h;return this.derive(this.x*h,this.y*i);};g.prototype.div=function(h,i){"use strict";if(i===(void 0))i=h;return this.derive(this.x*1/h,this.y*1/i);};g.prototype.sub=function(h,i){"use strict";if(arguments.length===1){return this.add(h.mul(-1));}else return this.add(-h,-i);};g.prototype.distanceTo=function(h){"use strict";return this.sub(h).magnitude();};g.prototype.magnitude=function(){"use strict";return Math.sqrt((this.x*this.x)+(this.y*this.y));};g.prototype.rotate=function(h){"use strict";return this.derive(this.x*Math.cos(h)-this.y*Math.sin(h),this.x*Math.sin(h)+this.y*Math.cos(h));};e.exports=g;},null);
__d("classWithMixins",["copyProperties"],function(a,b,c,d,e,f,g){function h(i,j){var k=function(){i.apply(this,arguments);};k.prototype=g(Object.create(i.prototype),j.prototype);return k;}e.exports=h;},null);
__d("debounceCore",[],function(a,b,c,d,e,f){function g(h,i,j,k,l){k=k||setTimeout;l=l||clearTimeout;var m;function n(){for(var o=[],p=0,q=arguments.length;p<q;p++)o.push(arguments[p]);n.reset();m=k(function(){h.apply(j,o);},i);}n.reset=function(){l(m);};return n;}e.exports=g;},null);
__d("transferTextStyles",["Style"],function(a,b,c,d,e,f,g){var h={fontFamily:null,fontSize:null,fontStyle:null,fontWeight:null,lineHeight:null,wordWrap:null};function i(j,k){for(var l in h)if(h.hasOwnProperty(l))h[l]=g.get(j,l);g.apply(k,h);}e.exports=i;},null);
__d("TextMetrics",["DOM","Style","UserAgent_DEPRECATED","transferTextStyles"],function(a,b,c,d,e,f,g,h,i,j){function k(m){var n=m.clientWidth,o=(h.get(m,'-moz-box-sizing')=='border-box');if(o&&i.firefox()<29)return n;var p=h.getFloat(m,'paddingLeft')+h.getFloat(m,'paddingRight');return n-p;}function l(m,n){this._node=m;this._flexible=!!n;var o='textarea',p='textMetrics';if(this._flexible){o='div';p+=' textMetricsInline';}this._shadow=g.create(o,{className:p});j(m,this._shadow);document.body.appendChild(this._shadow);}l.prototype.measure=function(m){var n=this._node,o=this._shadow;m=(m||n.value)+'...';if(!this._flexible){var p=k(n);h.set(o,'width',Math.max(p,0)+'px');}if(n.nodeName==='TEXTAREA'){o.value=m;}else g.setContent(o,m);return {width:o.scrollWidth,height:o.scrollHeight};};l.prototype.destroy=function(){g.remove(this._shadow);};e.exports=l;},null);
__d("getUnboundedScrollPosition",[],function(a,b,c,d,e,f){"use strict";function g(h){if(h===window)return {x:window.pageXOffset||document.documentElement.scrollLeft,y:window.pageYOffset||document.documentElement.scrollTop};return {x:h.scrollLeft,y:h.scrollTop};}e.exports=g;},null);
__d("DOMVector",["BasicVector","getDocumentScrollElement","getElementPosition","getUnboundedScrollPosition","getViewportDimensions"],function(a,b,c,d,e,f,g,h,i,j,k){for(var l in g)if(g.hasOwnProperty(l))n[l]=g[l];var m=g===null?null:g.prototype;n.prototype=Object.create(m);n.prototype.constructor=n;n.__superConstructor__=g;function n(o,p,q){"use strict";g.call(this,o,p);this.domain=q||'pure';}n.prototype.derive=function(o,p,q){"use strict";return new n(o,p,q||this.domain);};n.prototype.add=function(o,p){"use strict";if(o instanceof n&&o.getDomain()!=='pure')o=o.convertTo(this.domain);return m.add.call(this,o,p);};n.prototype.convertTo=function(o){"use strict";if(o!='pure'&&o!='viewport'&&o!='document')return this.derive(0,0);if(o==this.domain)return this.derive(this.x,this.y,this.domain);if(o=='pure')return this.derive(this.x,this.y);if(this.domain=='pure')return this.derive(0,0);var p=n.getScrollPosition('document'),q=this.x,r=this.y;if(this.domain=='document'){q-=p.x;r-=p.y;}else{q+=p.x;r+=p.y;}return this.derive(q,r,o);};n.prototype.getDomain=function(){"use strict";return this.domain;};n.from=function(o,p,q){"use strict";return new n(o,p,q);};n.getScrollPosition=function(o){"use strict";o=o||'document';var p=j(window);return this.from(p.x,p.y,'document').convertTo(o);};n.getElementPosition=function(o,p){"use strict";p=p||'document';var q=i(o);return this.from(q.x,q.y,'viewport').convertTo(p);};n.getElementDimensions=function(o){"use strict";return this.from(o.offsetWidth||0,o.offsetHeight||0);};n.getViewportDimensions=function(){"use strict";var o=k();return this.from(o.width,o.height,'viewport');};n.getViewportWithoutScrollbarDimensions=function(){"use strict";var o=k.withoutScrollbars();return this.from(o.width,o.height,'viewport');};n.getDocumentDimensions=function(o){"use strict";var p=h(o);return this.from(p.scrollWidth,p.scrollHeight,'document');};e.exports=n;},null);
__d("SyntheticMouseEvent",["SyntheticUIEvent","ViewportMetrics","getEventModifierState"],function(a,b,c,d,e,f,g,h,i){'use strict';var j={screenX:null,screenY:null,clientX:null,clientY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:i,button:function(event){var l=event.button;if('which' in event)return l;return l===2?2:l===4?1:0;},buttons:null,relatedTarget:function(event){return event.relatedTarget||(event.fromElement===event.srcElement?event.toElement:event.fromElement);},pageX:function(event){return 'pageX' in event?event.pageX:event.clientX+h.currentScrollLeft;},pageY:function(event){return 'pageY' in event?event.pageY:event.clientY+h.currentScrollTop;}};function k(l,m,n){g.call(this,l,m,n);}g.augmentClass(k,j);e.exports=k;},null);
__d("throttle",["copyProperties"],function(a,b,c,d,e,f,g){function h(j,k,l){return i(j,k,l,false,false);}g(h,{acrossTransitions:function(j,k,l){return i(j,k,l,true,false);},withBlocking:function(j,k,l){return i(j,k,l,false,true);},acrossTransitionsWithBlocking:function(j,k,l){return i(j,k,l,true,true);}});function i(j,k,l,m,n){if(k==null)k=100;var o,p,q=null,r=function(){p=Date.now();if(o){j.apply(l,o);o=null;q=setTimeout(r,k,!m);}else q=null;};return function s(){o=arguments;if(q===null||(Date.now()-p>k))if(n){r();}else q=setTimeout(r,0,!m);};}e.exports=h;},null);
__d("FlipDirection",["DOM","Input","Style"],function(a,b,c,d,e,f,g,h,i){var j={setDirection:function(k){var l=g.isNodeOfType(k,'input')&&(k.type=='text'),m=g.isNodeOfType(k,'textarea');if(!(l||m)||k.getAttribute('data-prevent-auto-flip'))return;var n=h.getValue(k),o=(k.style&&k.style.direction);if(!o){var p=0,q=true;for(var r=0;r<n.length;r++){var s=n.charCodeAt(r);if(s>=48){if(q){q=false;p++;}if(s>=1470&&s<=1920){i.set(k,'direction','rtl');k.setAttribute('dir','rtl');return;}if(p==5){i.set(k,'direction','ltr');k.setAttribute('dir','ltr');return;}}else q=true;}}else if(n.length===0){i.set(k,'direction','');k.removeAttribute('dir');}}};e.exports=j;},null);
__d("FlipDirectionOnKeypress",["Event","FlipDirection"],function(a,b,c,d,e,f,g,h){var i=function(event){var j=event.getTarget();h.setDirection(j);};g.listen(document.documentElement,{keyup:i,input:i});},null);
__d("EagleEye",["Arbiter","CurrentUser","EagleEyeConfig","Env","ISB","OnloadEvent","TrackingConfig","WebStorage","isInIframe"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var p='_e_',q=(window.name||'').toString();if(q.length==7&&q.substr(0,3)==p){q=q.substr(3);}else{q=i.seed;if(!o())window.name=p+q;}var r=(window.location.protocol=='https:'&&document.cookie.match(/\bcsm=1/))?'; secure':'',s=p+q+'_',t=new Date(Date.now()+604800000).toGMTString(),u=window.location.hostname.replace(/^.*(facebook\..*)$/i,'$1'),v='; expires='+t+';path=/; domain='+u+r,w=0,x,y=i.sessionStorage&&n.getSessionStorage(),z=document.cookie.length,aa=false,ba=Date.now();function ca(ga){return s+(w++)+'='+encodeURIComponent(ga)+v;}function da(){var ga=[],ha=false,ia=0,ja=0;this.isEmpty=function(){return !ga.length;};this.enqueue=function(ka,la){if(la){ga.unshift(ka);}else ga.push(ka);};this.dequeue=function(){ga.shift();};this.peek=function(){return ga[0];};this.clear=function(ka){z=Math.min(z,document.cookie.length);if(!aa&&(new Date()-ba>60000))aa=true;var la=!ka&&(document.cookie.search(p)>=0),ma=!!i.cookieHeaderLimit,na=i.cookieCountLimit||19,oa=i.cookieHeaderLimit||3950,pa=na-5,qa=oa-1000;while(!this.isEmpty()){var ra=ca(this.peek());if(ma&&(ra.length>oa||(aa&&ra.length+z>oa))){this.dequeue();continue;}if((la||ma)&&((document.cookie.length+ra.length>oa)||(document.cookie.split(';').length>na)))break;document.cookie=ra;la=true;this.dequeue();}var sa=Date.now();if(ka||!ha&&la&&((ja>0)&&(Math.min(10*Math.pow(2,ja-1),60000)+ia<sa))&&g.query(l.ONLOAD)&&(!this.isEmpty()||(document.cookie.length>qa)||(document.cookie.split(';').length>pa))){var ta=new Image(),ua=this,va=m.domain||'';ha=true;ta.onload=function ya(){ha=false;ja=0;ua.clear();};ta.onerror=ta.onabort=function ya(){ha=false;ia=Date.now();ja++;};var wa=k.token?'&fb_isb='+k.token:'',xa='&__user='+h.getID();ta.src=va+'/ajax/nectar.php?asyncSignal='+(Math.floor(Math.random()*10000)+1)+wa+xa+'&'+(!ka?'':'s=')+sa;}};}x=new da();if(y){var ea=function(){var ga=0,ha=ga;function ia(){var la=sessionStorage.getItem('_e_ids');if(la){var ma=(la+'').split(';');if(ma.length==2){ga=parseInt(ma[0],10);ha=parseInt(ma[1],10);}}}function ja(){var la=ga+';'+ha;sessionStorage.setItem('_e_ids',la);}function ka(la){return '_e_'+((la!==(void 0))?la:ga++);}this.isEmpty=function(){return ha===ga;};this.enqueue=function(la,ma){var na=ma?ka(--ha):ka();sessionStorage.setItem(na,la);ja();};this.dequeue=function(){this.isEmpty();sessionStorage.removeItem(ka(ha));ha++;ja();};this.peek=function(){var la=sessionStorage.getItem(ka(ha));return la?(la+''):la;};this.clear=x.clear;ia();};x=new ea();}var fa={log:function(ga,ha,ia){if(j.no_cookies)return;var ja=[q,Date.now(),ga].concat(ha);ja.push(ja.length);function ka(){var la=JSON.stringify(ja);try{x.enqueue(la,!!ia);x.clear(!!ia);}catch(ma){if(y&&(ma.code===1000)){x=new da();y=false;ka();}}}ka();},getSessionID:function(){return q;}};e.exports=fa;a.EagleEye=fa;},3);
__d("OnloadHooks",["Arbiter","ErrorUtils","InitialJSLoader","OnloadEvent"],function(a,b,c,d,e,f,g,h,i,j){function k(){var r=a.CavalryLogger;if(!window.loaded&&r)r.getInstance().setTimeStamp('t_prehooks');n('onloadhooks');if(!window.loaded&&r)r.getInstance().setTimeStamp('t_hooks');window.loaded=true;g.inform('uipage_onload',true,g.BEHAVIOR_STATE);}function l(){n('onafterloadhooks');window.afterloaded=true;}function m(r,s){return h.applyWithGuard(r,null,null,function(t){t.event_type=s;t.category='runhook';});}function n(r){var s=(r=='onbeforeleavehooks')||(r=='onbeforeunloadhooks');do{var t=window[r];if(!t)break;if(!s)window[r]=null;for(var u=0;u<t.length;u++){var v=m(t[u],r);if(s&&v)return v;}}while(!s&&window[r]);}function o(){if(!window.loaded){window.loaded=true;n('onloadhooks');}if(!window.afterloaded){window.afterloaded=true;n('onafterloadhooks');}}function p(){g.registerCallback(k,[j.ONLOAD_DOMCONTENT_CALLBACK,i.INITIAL_JS_READY]);g.registerCallback(l,[j.ONLOAD_DOMCONTENT_CALLBACK,j.ONLOAD_CALLBACK,i.INITIAL_JS_READY]);g.subscribe(j.ONBEFOREUNLOAD,function(r,s){s.warn=n('onbeforeleavehooks')||n('onbeforeunloadhooks');if(!s.warn){window.loaded=false;window.afterloaded=false;}},g.SUBSCRIBE_NEW);g.subscribe(j.ONUNLOAD,function(r,s){n('onunloadhooks');n('onafterunloadhooks');},g.SUBSCRIBE_NEW);}var q={_onloadHook:k,_onafterloadHook:l,runHook:m,runHooks:n,keepWindowSetAsLoaded:o};p();a.OnloadHooks=e.exports=q;},null);
__d("debounce",["debounceCore"],function(a,b,c,d,e,f,g){function h(i,j,k,l){if(j==null)j=100;var m=function(n,o,p){return setTimeout(n,o,p,!l);};return g(i,j,k,m);}e.exports=h;},null);
__d("TextInputControl",["DOMControl","Event","Input","debounce"],function(a,b,c,d,e,f,g,h,i,j){for(var k in g)if(g.hasOwnProperty(k))m[k]=g[k];var l=g===null?null:g.prototype;m.prototype=Object.create(l);m.prototype.constructor=m;m.__superConstructor__=g;function m(n){"use strict";g.call(this,n);var o=this.getRoot(),p=j(this.update.bind(this),0);h.listen(o,{input:p,keydown:p,paste:p});}m.prototype.setMaxLength=function(n){"use strict";i.setMaxLength(this.getRoot(),n);return this;};m.prototype.getValue=function(){"use strict";return i.getValue(this.getRoot());};m.prototype.isEmpty=function(){"use strict";return i.isEmpty(this.getRoot());};m.prototype.setValue=function(n){"use strict";i.setValue(this.getRoot(),n);this.update();return this;};m.prototype.clear=function(){"use strict";return this.setValue('');};m.prototype.setPlaceholderText=function(n){"use strict";i.setPlaceholder(this.getRoot(),n);return this;};e.exports=m;},null);
__d("TextAreaControl",["Arbiter","ArbiterMixin","CSS","DOMControl","Event","Style","TextInputControl","TextMetrics","classWithMixins","mixin"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){function q(v,w){return l.getFloat(v,w)||0;}var r=o(m,p(h));for(var s in r)if(r.hasOwnProperty(s))u[s]=r[s];var t=r===null?null:r.prototype;u.prototype=Object.create(t);u.prototype.constructor=u;u.__superConstructor__=r;function u(v){"use strict";this.autogrow=i.hasClass(v,'uiTextareaAutogrow');r.call(this,v);this.width=null;k.listen(v,'focus',this._handleFocus.bind(this));}u.prototype.setAutogrow=function(v){"use strict";this.autogrow=v;return this;};u.prototype.onupdate=function(){"use strict";t.onupdate.call(this);this.updateHeight();};u.prototype.updateHeight=function(){"use strict";if(this.autogrow){var v=this.getRoot();if(!this.metrics)this.metrics=new n(v);if(typeof this.initialHeight==='undefined'){this.isBorderBox=l.get(v,'box-sizing')==='border-box'||l.get(v,'-moz-box-sizing')==='border-box'||l.get(v,'-webkit-box-sizing')==='border-box';this.borderBoxOffset=q(v,'padding-top')+q(v,'padding-bottom')+q(v,'border-top-width')+q(v,'border-bottom-width');this.initialHeight=v.offsetHeight-this.borderBoxOffset;}var w=this.metrics.measure(),x=Math.max(this.initialHeight,w.height);if(this.isBorderBox)x+=this.borderBoxOffset;if(x!==this.height){this.height=x;l.set(v,'height',x+'px');g.inform('reflow');this.inform('resize');}}else if(this.metrics){this.metrics.destroy();this.metrics=null;}};u.prototype.resetHeight=function(){"use strict";this.height=-1;this.update();};u.prototype._handleFocus=function(){"use strict";this.width=null;};u.getInstance=function(v){"use strict";return j.getInstance(v)||new u(v);};e.exports=u;},null);
__d("Vector",["DOMVector","Event"],function(a,b,c,d,e,f,g,h){for(var i in g)if(g.hasOwnProperty(i))k[i]=g[i];var j=g===null?null:g.prototype;k.prototype=Object.create(j);k.prototype.constructor=k;k.__superConstructor__=g;function k(l,m,n){"use strict";g.call(this,parseFloat(l),parseFloat(m),n);}k.prototype.derive=function(l,m,n){"use strict";return new k(l,m,n||this.domain);};k.prototype.setElementPosition=function(l){"use strict";var m=this.convertTo('document');l.style.left=parseInt(m.x,10)+'px';l.style.top=parseInt(m.y,10)+'px';return this;};k.prototype.setElementDimensions=function(l){"use strict";return this.setElementWidth(l).setElementHeight(l);};k.prototype.setElementWidth=function(l){"use strict";l.style.width=parseInt(this.x,10)+'px';return this;};k.prototype.setElementHeight=function(l){"use strict";l.style.height=parseInt(this.y,10)+'px';return this;};k.prototype.scrollElementBy=function(l){"use strict";if(l==document.body){window.scrollBy(this.x,this.y);}else{l.scrollLeft+=this.x;l.scrollTop+=this.y;}return this;};k.from=function(l,m,n){"use strict";return new k(l,m,n);};k.getEventPosition=function(l,m){"use strict";m=m||'document';var n=h.getPosition(l),o=this.from(n.x,n.y,'document');return o.convertTo(m);};k.deserialize=function(l){"use strict";var m=l.split(',');return this.from(m[0],m[1]);};e.exports=k;},null);
__d("Button",["CSS","DataStore","DOM","Event","Parent","cx","emptyFunction"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){var n='uiButtonDisabled',o='uiButtonDepressed',p="_42fr",q="_42fs",r='button:blocker',s='href',t='ajaxify';function u(aa,ba){var ca=h.get(aa,r);if(ba){if(ca){ca.remove();h.remove(aa,r);}}else if(!ca)h.set(aa,r,j.listen(aa,'click',m.thatReturnsFalse,j.Priority.URGENT));}function v(aa){var ba=k.byClass(aa,'uiButton')||k.byClass(aa,"_42ft");if(!ba)throw new Error('invalid use case');return ba;}function w(aa){return i.isNodeOfType(aa,'a');}function x(aa){return i.isNodeOfType(aa,'button');}function y(aa){return g.hasClass(aa,"_42ft");}var z={getInputElement:function(aa){aa=v(aa);if(w(aa))throw new Error('invalid use case');return x(aa)?aa:i.find(aa,'input');},isEnabled:function(aa){return !(g.hasClass(v(aa),n)||g.hasClass(v(aa),p));},setEnabled:function(aa,ba){aa=v(aa);var ca=y(aa)?p:n;g.conditionClass(aa,ca,!ba);if(w(aa)){var da=aa.getAttribute('href'),ea=aa.getAttribute('ajaxify'),fa=h.get(aa,s,'#'),ga=h.get(aa,t);if(ba){if(!da)aa.setAttribute('href',fa);if(!ea&&ga)aa.setAttribute('ajaxify',ga);aa.removeAttribute('tabIndex');}else{if(da&&da!==fa)h.set(aa,s,da);if(ea&&ea!==ga)h.set(aa,t,ea);aa.removeAttribute('href');aa.removeAttribute('ajaxify');aa.setAttribute('tabIndex','-1');}u(aa,ba);}else{var ha=z.getInputElement(aa);ha.disabled=!ba;u(ha,ba);}},setDepressed:function(aa,ba){aa=v(aa);var ca=y(aa)?q:o;g.conditionClass(aa,ca,ba);},isDepressed:function(aa){aa=v(aa);var ba=y(aa)?q:o;return g.hasClass(aa,ba);},setLabel:function(aa,ba){aa=v(aa);if(y(aa)){var ca=[];if(ba)ca.push(ba);var da=i.scry(aa,'.img')[0];if(da)if(aa.firstChild==da){ca.unshift(da);}else ca.push(da);i.setContent(aa,ca);}else if(w(aa)){var ea=i.find(aa,'span.uiButtonText');i.setContent(ea,ba);}else z.getInputElement(aa).value=ba;var fa=y(aa)?"_42fv":'uiButtonNoText';g.conditionClass(aa,fa,!ba);},setIcon:function(aa,ba){if(ba&&!i.isNode(ba))return;aa=v(aa);var ca=i.scry(aa,'.img')[0];if(!ba){ca&&i.remove(ca);return;}g.addClass(ba,'customimg');if(ca!=ba)if(ca){i.replace(ca,ba);}else i.prependContent(aa,ba);}};e.exports=z;},null);
__d("PluginFlyout",["Arbiter","Button","CSS","DOM","DOMEvent","DOMEventListener","Form","Plugin","TextAreaControl","copyProperties","csx"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var r=g.SUBSCRIBE_NEW,s=g.subscribe,t=g.inform,u=function(w,x){return l.add(w,'click',x);};function v(w,x,y){var z=this,aa=s(n.CONNECT,function(event,ba){g.unsubscribe(aa);z.init(w,x,y);z.connect(event,ba);},r);s(n.DIALOG,function(){z.init(w,x,y);z.toggle();},r);}p(v.prototype,{init:function(w,x,y){if(this.initialized)return;this.initialized=true;j.appendContent(w,JSON.parse(y));var z=j.find(w,'form'),aa=j.find(z,"._56zw"),ba=j.find(z,"._56zx"),ca=j.find(z,"._42x4"),da=o.getInstance(ca);l.add(ca,'keyup',function(ha){h.setEnabled(aa,!!da.getValue());});l.add(z,'submit',function(ha){new k(ha).kill();m.bootstrap(z);});var ea=(x==='tiny')?j.find(document.body,'.pluginPostFlyoutPrompt'):null;this.flyout=w;this.form=z;this.post_button=aa;this.prompt=ea;var fa=this.hide.bind(this),ga=this.show.bind(this);u(ba,function(ha){new k(ha).kill();fa();});if(ea)u(ea,function(ha){new k(ha).kill();ga();});s(n.CONNECT,this.connect.bind(this),r);s(n.DISCONNECT,function(){fa();},r);s(v.SUCCESS,function(){fa();if(ea)i.hide(ea);},r);s(n.ERROR,function(event,ha){if(ha.action!=='comment')return;j.setContent(j.find(z,"._56zy"),ha.content);i.hide(aa);},r);},connect:function(event,w){if(w.crossFrame)return;if(this.prompt)return i.show(this.prompt);if(!w.story_fbid)this.show();},show:function(){this.shown=true;i.show(this.flyout);i.show(this.post_button);this.form.comment.focus();t(v.SHOW);},hide:function(){this.shown=false;i.hide(this.flyout);t(v.HIDE);},toggle:function(){if(this.shown){this.hide();}else this.show();}});p(v,{SUCCESS:'platform/plugins/flyout/success',SHOW:'platform/plugins/flyout/show',HIDE:'platform/plugins/flyout/hide',success:function(){t(v.SUCCESS);}});e.exports=v;},null);