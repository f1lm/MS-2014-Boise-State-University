/*!
Note:  Microsoft Corporation is not the original author of this script file. Microsoft obtained the original file from http://timeago.yarp.com/ under the license that is referred to below.  That license and the other notices below are provided for informational purposes only and are not the license terms under which Microsoft distributes this file.  Microsoft grants you the right to use this file for the sole purpose of interacting through your browser with the Microsoft web site hosting this file, subject to that web site’s terms of use. Microsoft reserves all other rights and grants no additional rights, whether by implication, estoppel or otherwise.
 * timeago: a jQuery plugin, version: 0.9.3 (2011-01-21)
 * @requires jQuery v1.2.3 or later
 *
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2008-2011, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
 */
(function(n){function r(){var i=f(this);return isNaN(i.datetime)||n(this).text(t(i.datetime)),this}function f(t){if(t=n(t),!t.data("timeago")){t.data("timeago",{datetime:i.datetime(t)});var r=n.trim(t.text());r.length>0&&t.attr("title",r)}return t.data("timeago")}function t(n){return i.inWords(u(n))}function u(n){return+new Date-n.getTime()}n.timeago=function(i){return i instanceof Date?t(i):typeof i=="string"?t(n.timeago.parse(i)):t(n.timeago.datetime(i))};var i=n.timeago;n.extend(n.timeago,{settings:{refreshMillis:6e4,allowFuture:!1,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"ago",suffixFromNow:"from now",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years",numbers:[]}},inWords:function(t){function r(r,u){var e=n.isFunction(r)?r(u,t):r,f=i.numbers&&i.numbers[u]||u;return e.replace(/%d/i,f)}var i=this.settings.strings,s=i.prefixAgo,c=i.suffixAgo,h;this.settings.allowFuture&&(t<0&&(s=i.prefixFromNow,c=i.suffixFromNow),t=Math.abs(t));var o=t/1e3,e=o/60,f=e/60,u=f/24,l=u/365;return h=o<45&&r(i.seconds,Math.round(o))||o<90&&r(i.minute,1)||e<45&&r(i.minutes,Math.round(e))||e<90&&r(i.hour,1)||f<24&&r(i.hours,Math.round(f))||f<48&&r(i.day,1)||u<30&&r(i.days,Math.floor(u))||u<60&&r(i.month,1)||u<365&&r(i.months,Math.floor(u/30))||l<2&&r(i.year,1)||r(i.years,Math.floor(l)),n.trim([s,h,c].join(" "))},parse:function(t){var i=n.trim(t);return i=i.replace(/\.\d\d\d+/,""),i=i.replace(/-/,"/").replace(/-/,"/"),i=i.replace(/T/," ").replace(/Z/," UTC"),i=i.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"),new Date(i)},datetime:function(t){var u=n(t).get(0).tagName.toLowerCase()==="time",r=u?n(t).attr("datetime"):n(t).attr("title");return i.parse(r)}}),n.fn.timeago=function(){var t=this,n;return t.each(r),n=i.settings,n.refreshMillis>0&&setInterval(function(){t.each(r)},n.refreshMillis),t},document.createElement("abbr"),document.createElement("time")})(jQuery)