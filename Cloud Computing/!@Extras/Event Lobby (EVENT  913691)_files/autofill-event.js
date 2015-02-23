/**
 * Autofill event polyfill ##version:1.0.0##
 * (c) 2014 Google, Inc.
 * License: MIT
 * 
 * Customized to support IE8 and removed some functionality
 */
!function(a){function e(){var a,b;for(a=0;a<this.length;a++)b=this[a],f(b)||(g(b),l(b))}function f(a){"$$currentValue"in a||(a.$$currentValue=a.getAttribute("value"));var b=a.value,c=a.$$currentValue;return b||c?b===c:!0}function g(a){a.$$currentValue=a.value}function h(b){var c=a.jQuery||a.angular.element,d=c.prototype,e=d.val;d.val=function(a){var c=e.apply(this,arguments);return arguments.length>0&&k(this,function(c){b(c,a)}),c}}function i(a,b){function c(a){var c=a.target;b(c)}d.on(a,c,!0)}function j(a){for(;a;){if("FORM"===a.nodeName)return b(a);a=a.parentNode}return b()}function k(a,b){if(a.forEach)return a.forEach(b);var c;for(c=0;c<a.length;c++)b(a[c])}function l(a){b(a).trigger("input")}var b=a.jQuery||a.angular.element,c=a.document.documentElement,d=b(c);h(g),b.prototype.checkAndTriggerAutoFillEvent=e,i("blur",function(b){a.setTimeout(function(){j(b).find("input").checkAndTriggerAutoFillEvent()},20)}),b(a.document).on("DOMContentLoaded",function(){k(document.getElementsByTagName("input"),g),a.setTimeout(function(){d.find("input").checkAndTriggerAutoFillEvent()},200)},!1)}(window);
