
"use strict";

var zdbb = zdbb || {};
zdbb.gurgle = zdbb.gurgle || {};

zdbb.gurgle.xmlhttp = function() {
  if (typeof XMLHttpRequest !== 'undefined') {
    return new XMLHttpRequest();
  }
  var versions = [
    "MSXML2.XmlHttp.5.0",
    "MSXML2.XmlHttp.4.0",
    "MSXML2.XmlHttp.3.0",
    "MSXML2.XmlHttp.2.0",
    "Microsoft.XmlHttp"
  ];

  var xhr;
  for(var i = 0; i < versions.length; i++) {
    try {
      xhr = new ActiveXObject(versions[i]);
      break;
    } catch (e) {
    }
  }
  return xhr;
};

zdbb.gurgle.send = function(url, callback, method, data, sync) {
  var x = zdbb.gurgle.xmlhttp();

  x.open(method, url, sync);

  x.onreadystatechange = function() {
    if (x.readyState == 4) {
      callback(x.responseText);
    }
  };

  if (method == 'POST') {
    x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  }
  x.send(data);
};

zdbb.gurgle.get_segments = function(url, callback) {
  var fn = function(d) {
    var data = d.split(',');
    callback(data);
  };
  zdbb.gurgle.send("http://gurgle.zdbb.net/page-segments?url=" + url, fn, "GET", null, true);
};
    