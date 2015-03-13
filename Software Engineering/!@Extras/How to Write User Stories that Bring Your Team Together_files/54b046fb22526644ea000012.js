window._pa = window._pa || {};
_pa.segments = [{"name":"All visitors","id":2434095,"regex":".*"}];
_pa.conversions = [];
_pa.conversionEvents = [];
_pa.segmentEvents = [];
_pa.rtbId = '36458';
_pa.siteId = '54b046fb22526644ea000012';
_pa.crossDevice = true;
!function(){function e(e,a,t){if(null==t||isNaN(t))var n=_pa.pixelHost+"seg?t=2&add="+e;else var n=_pa.pixelHost+"seg?t=2&add="+e+":"+t;_pa.createImageTag("segments",e,n,a)}function a(e,a){var t=_pa.paRtbHost+"seg/?add="+e;_pa.productId&&(t+=":"+encodeURIComponent(_pa.productId)),_pa.crossDevice&&(t+="&cd=1"),_pa.obscureIP&&(t+="&obscure_ip=1"),d?_pa.createImageTag("paRtbSegments",e,t,a):_.push({id:e,name:a})}function t(){if(d=!0,0!==_.length){for(var e=[],a=[],t=0;t<_.length;t++){var n=_[t],r=n.id,o=n.name;_pa.productId&&(r+=":"+encodeURIComponent(_pa.productId)),e.push(r),a.push(o)}var r=e.join(","),o=a.join(","),p=_pa.paRtbHost+"seg/?add="+r;_pa.crossDevice&&(p+="&cd=1"),_pa.obscureIP&&(p+="&obscure_ip=1"),_pa.createImageTag("paRtbSegments",r,p,o)}}function n(e,a,t){a=a||_pa.orderId,t=t||_pa.revenue;var n=e.id,o=e.name,p=_pa.rtbId;if(r(n,o,a,t,p),e.cofires)for(var i=0;i<e.cofires.length;i++){var c=e.cofires[i];r(c.appnexus_id,c.name,a,t,c.rtb_id)}}function r(e,a,t,n,r){var o="";t&&""!==t&&(t=t.toString().replace(/@.*/,"@"),o+="&order_id="+encodeURIComponent(t)),n&&""!==n&&(o+="&value="+encodeURIComponent(n)),o+="&other="+function(){for(var e="",a="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",t=0;16>t;t++){var n=Math.floor(Math.random()*a.length);e+=a.charAt(n)}return e}();var p=_pa.pixelHost+"px?t=2&id="+e+o,i=_pa.paRtbHost+"px/?id="+e+o;r&&(i+="&a_id="+r),_pa.obscureIP&&(i+="&obscure_ip=1"),_pa.createImageTag("conversions",e,p,a),_pa.createImageTag("paRtbConversions",e,i,a)}function o(e){for(var a=e.shift(),t=a.split("."),n=_pa,r=0;r<t.length;r++)n=n[t[r]];var o=n.apply(_pa,e);return p(a,e),o}function p(e,a){var t=_pa.callbacks[e];if("undefined"!=typeof t)for(var n=0;n<t.length;n++)t[n].apply(_pa,a)}function i(){for(var e,a=Array.prototype.slice.call(arguments,0),t=a.shift(),n=t.split("."),r=_pa,o=0;o<n.length;o++)r=r[n[o]],e=n[o];r.apply(_pa,a),p(e,a)}function c(){var e=window.navigator.userAgent;(/MSIE 7/.test(e)||/(iPod|iPhone|iPad)/.test(e)&&/AppleWebKit/.test(e))&&(_pa.skip=!0)}function s(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=("https:"==document.location.protocol?"https:":"http:")+"//pixel-geo.prfct.co/tagjs",_pa.head.appendChild(e)}_pa.head=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0],s();var d=!1,_=[];_pa.ready={looper:!1,onload:!1};var f=["conversions","paRtbConversions"];_pa.fired={segments:[],conversions:[]},_pa.url=document.location.href,_pa.pixelHost=("https:"===document.location.protocol?"https://secure":"http://ib")+".adnxs.com/",_pa.paRtbHost=("https:"===document.location.protocol?"https://":"http://")+"pixel-geo.prfct.co/",_pa.callbacks={},c(),_pa.init=function(){_pa.detect(),_pa.initQ(),t()},_pa.addFired=function(e,a){"undefined"==typeof _pa.fired[e]&&(_pa.fired[e]=[]),_pa.fired[e].push(a)},_pa.detect=function(){for(var e=0;e<_pa.segments.length;e++){var a=_pa.segments[e];_pa.url.match(new RegExp(a.regex,"i"))&&i("fireSegment",a)}for(var e=0;e<_pa.conversions.length;e++){var t=_pa.conversions[e];_pa.url.match(new RegExp(t.regex,"i"))&&n(t)}},_pa.track=function(e,a){a="undefined"!=typeof a?a:{};var t=_pa.trackSegments(e,a),n=_pa.trackConversions(e,a);return t||n},_pa.trackSegments=function(e,a){for(var t=!1,n=0;n<_pa.segmentEvents.length;n++){var r=_pa.segmentEvents[n];r.name===e&&(t=!0,i("fireSegment",r,a.segment_value))}return t},_pa.trackConversions=function(e,a){for(var t=!1,r=0;r<_pa.conversionEvents.length;r++){var o=_pa.conversionEvents[r];o.name===e&&(t=!0,n(o,a.orderId,a.revenue))}return t},_pa.trackProduct=function(e){_pa.productId=e;for(var t=_pa.fired.segments,n={},r=0;r<t.length;r++){var o=t[r],p=o.id;n[p]=!0}for(var i in n)a(i,"product refire")},_pa.fireLoadEvents=function(){if("undefined"!=typeof _pa.onLoadEvent)if("function"==typeof _pa.onLoadEvent)_pa.onLoadEvent();else if("string"==typeof _pa.onLoadEvent)for(var e=_pa.onLoadEvent.split(","),a=0;a<e.length;a++){var t=e[a];_pa.track(t)}},_pa.createImageTag=function(e,a,t,n){if(!_pa.skip){for(var r=!1,o=0;o<f.length;o++)e===f[o]&&(r=!0);_pa.pixelPlacer.place(t,r),_pa.addFired(e,{id:a,name:n})}},_pa.looperReady=function(){_pa.ready.looper=!0,_pa.fireWhenReady()},_pa.fireWhenReady=function(){_pa.ready.looper&&_pa.ready.onload&&(_pa.fireLoadEvents(),_pa.pixelPlacer.activate())},_pa.fireSegment=function(t,n){e(t.id,t.name,n),a(t.id,t.name)},_pa.initQ=function(){if("undefined"!=typeof window._pq)for(var e=0;e<_pq.length;e++){var a=_pq[e];o(a)}window._pq={push:function(e){return o(e)}}},_pa.addListener=function(e,a){"undefined"==typeof _pa.callbacks[e]&&(_pa.callbacks[e]=[]),_pa.callbacks[e].push(a)},_pa.removeListener=function(e,a){for(var t=_pa.callbacks[e],n=t.length;n--;)t[n]===a&&t.splice(n,1)},_pa.pixelPlacer=function(){function e(){r=!0,t()}function a(e,a){r||a?n(e):o.push(e)}function t(){for(var e;e=o.pop();)n(e)}function n(e){var a=document.createElement("img");a.src=e,a.width=1,a.height=1,a.border=0,_pa.head.appendChild(a)}var r=!1,o=[];return{activate:e,place:a}}();var u={cd:function(){return _pa.crossDevice}};_pa.setPartners=function(e){var a,t;for(var n in e){if(a=e[n],t=!0,"object"==typeof a)for(var r;r<a.length;r++){var o=a[r];criteriaFunction=u[o],t=t&&criteriaFunction()}t&&_pa.pixelPlacer.place(_pa.paRtbHost+"cs/?partnerId="+n)}}}();(function(){
	_pa.init();
	if (_pa.initAfterLoad) {
		if (window.document && window.document.readyState === "complete") {
			_pa.ready.onload = true;
			_pa.fireWhenReady();
		} else {
			function hookLoad(handler) {
				if(window.addEventListener) {
					window.addEventListener("load", handler, false);
				} else if(window.attachEvent) {
					window.attachEvent("onload", handler);
				}
			}
			hookLoad(function() {
				_pa.ready.onload = true;
				_pa.fireWhenReady();
			});
		}
	} else {
		_pa.ready.onload = true;
		_pa.fireWhenReady();
	}
})();
