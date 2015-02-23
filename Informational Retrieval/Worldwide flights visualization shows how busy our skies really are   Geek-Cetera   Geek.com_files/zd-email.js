"use strict";

var zdbb = zdbb || {};

zdbb.md5 = {
  hex_chr: '0123456789abcdef'.split(''),
  init: function() {
    if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
      zdbb.md5.add32 = function(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
        msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
      }
    }
  }
};

zdbb.md5.md5cycle = function(x, k) {
  var a = x[0], b = x[1], c = x[2], d = x[3];

  a = zdbb.md5.ff(a, b, c, d, k[0], 7, -680876936);
  d = zdbb.md5.ff(d, a, b, c, k[1], 12, -389564586);
  c = zdbb.md5.ff(c, d, a, b, k[2], 17,  606105819);
  b = zdbb.md5.ff(b, c, d, a, k[3], 22, -1044525330);
  a = zdbb.md5.ff(a, b, c, d, k[4], 7, -176418897);
  d = zdbb.md5.ff(d, a, b, c, k[5], 12,  1200080426);
  c = zdbb.md5.ff(c, d, a, b, k[6], 17, -1473231341);
  b = zdbb.md5.ff(b, c, d, a, k[7], 22, -45705983);
  a = zdbb.md5.ff(a, b, c, d, k[8], 7,  1770035416);
  d = zdbb.md5.ff(d, a, b, c, k[9], 12, -1958414417);
  c = zdbb.md5.ff(c, d, a, b, k[10], 17, -42063);
  b = zdbb.md5.ff(b, c, d, a, k[11], 22, -1990404162);
  a = zdbb.md5.ff(a, b, c, d, k[12], 7,  1804603682);
  d = zdbb.md5.ff(d, a, b, c, k[13], 12, -40341101);
  c = zdbb.md5.ff(c, d, a, b, k[14], 17, -1502002290);
  b = zdbb.md5.ff(b, c, d, a, k[15], 22,  1236535329);

  a = zdbb.md5.gg(a, b, c, d, k[1], 5, -165796510);
  d = zdbb.md5.gg(d, a, b, c, k[6], 9, -1069501632);
  c = zdbb.md5.gg(c, d, a, b, k[11], 14,  643717713);
  b = zdbb.md5.gg(b, c, d, a, k[0], 20, -373897302);
  a = zdbb.md5.gg(a, b, c, d, k[5], 5, -701558691);
  d = zdbb.md5.gg(d, a, b, c, k[10], 9,  38016083);
  c = zdbb.md5.gg(c, d, a, b, k[15], 14, -660478335);
  b = zdbb.md5.gg(b, c, d, a, k[4], 20, -405537848);
  a = zdbb.md5.gg(a, b, c, d, k[9], 5,  568446438);
  d = zdbb.md5.gg(d, a, b, c, k[14], 9, -1019803690);
  c = zdbb.md5.gg(c, d, a, b, k[3], 14, -187363961);
  b = zdbb.md5.gg(b, c, d, a, k[8], 20,  1163531501);
  a = zdbb.md5.gg(a, b, c, d, k[13], 5, -1444681467);
  d = zdbb.md5.gg(d, a, b, c, k[2], 9, -51403784);
  c = zdbb.md5.gg(c, d, a, b, k[7], 14,  1735328473);
  b = zdbb.md5.gg(b, c, d, a, k[12], 20, -1926607734);

  a = zdbb.md5.hh(a, b, c, d, k[5], 4, -378558);
  d = zdbb.md5.hh(d, a, b, c, k[8], 11, -2022574463);
  c = zdbb.md5.hh(c, d, a, b, k[11], 16,  1839030562);
  b = zdbb.md5.hh(b, c, d, a, k[14], 23, -35309556);
  a = zdbb.md5.hh(a, b, c, d, k[1], 4, -1530992060);
  d = zdbb.md5.hh(d, a, b, c, k[4], 11,  1272893353);
  c = zdbb.md5.hh(c, d, a, b, k[7], 16, -155497632);
  b = zdbb.md5.hh(b, c, d, a, k[10], 23, -1094730640);
  a = zdbb.md5.hh(a, b, c, d, k[13], 4,  681279174);
  d = zdbb.md5.hh(d, a, b, c, k[0], 11, -358537222);
  c = zdbb.md5.hh(c, d, a, b, k[3], 16, -722521979);
  b = zdbb.md5.hh(b, c, d, a, k[6], 23,  76029189);
  a = zdbb.md5.hh(a, b, c, d, k[9], 4, -640364487);
  d = zdbb.md5.hh(d, a, b, c, k[12], 11, -421815835);
  c = zdbb.md5.hh(c, d, a, b, k[15], 16,  530742520);
  b = zdbb.md5.hh(b, c, d, a, k[2], 23, -995338651);

  a = zdbb.md5.ii(a, b, c, d, k[0], 6, -198630844);
  d = zdbb.md5.ii(d, a, b, c, k[7], 10,  1126891415);
  c = zdbb.md5.ii(c, d, a, b, k[14], 15, -1416354905);
  b = zdbb.md5.ii(b, c, d, a, k[5], 21, -57434055);
  a = zdbb.md5.ii(a, b, c, d, k[12], 6,  1700485571);
  d = zdbb.md5.ii(d, a, b, c, k[3], 10, -1894986606);
  c = zdbb.md5.ii(c, d, a, b, k[10], 15, -1051523);
  b = zdbb.md5.ii(b, c, d, a, k[1], 21, -2054922799);
  a = zdbb.md5.ii(a, b, c, d, k[8], 6,  1873313359);
  d = zdbb.md5.ii(d, a, b, c, k[15], 10, -30611744);
  c = zdbb.md5.ii(c, d, a, b, k[6], 15, -1560198380);
  b = zdbb.md5.ii(b, c, d, a, k[13], 21,  1309151649);
  a = zdbb.md5.ii(a, b, c, d, k[4], 6, -145523070);
  d = zdbb.md5.ii(d, a, b, c, k[11], 10, -1120210379);
  c = zdbb.md5.ii(c, d, a, b, k[2], 15,  718787259);
  b = zdbb.md5.ii(b, c, d, a, k[9], 21, -343485551);

  x[0] = zdbb.md5.add32(a, x[0]);
  x[1] = zdbb.md5.add32(b, x[1]);
  x[2] = zdbb.md5.add32(c, x[2]);
  x[3] = zdbb.md5.add32(d, x[3]);
};

zdbb.md5.cmn = function(q, a, b, x, s, t) {
  a = zdbb.md5.add32(zdbb.md5.add32(a, q), zdbb.md5.add32(x, t));
  return zdbb.md5.add32((a << s) | (a >>> (32 - s)), b);
};

zdbb.md5.ff = function(a, b, c, d, x, s, t) {
  return zdbb.md5.cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

zdbb.md5.gg = function(a, b, c, d, x, s, t) {
  return zdbb.md5.cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

zdbb.md5.hh = function(a, b, c, d, x, s, t) {
  return zdbb.md5.cmn(b ^ c ^ d, a, b, x, s, t);
}

zdbb.md5.ii = function(a, b, c, d, x, s, t) {
  return zdbb.md5.cmn(c ^ (b | (~d)), a, b, x, s, t);
}

zdbb.md5.md51 = function(s) {
  var txt = '';
  var n = s.length,
  state = [1732584193, -271733879, -1732584194, 271733878], i;
  for (i=64; i<=s.length; i+=64) {
    zdbb.md5.md5cycle(state, zdbb.md5.md5blk(s.substring(i-64, i)));
  }
  s = s.substring(i-64);
  var tail = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
  for (i=0; i<s.length; i++)
  tail[i>>2] |= s.charCodeAt(i) << ((i%4) << 3);
  tail[i>>2] |= 0x80 << ((i%4) << 3);
  if (i > 55) {
  zdbb.md5.md5cycle(state, tail);
  for (i=0; i<16; i++) tail[i] = 0;
  }
  tail[14] = n*8;
  zdbb.md5.md5cycle(state, tail);
  return state;
};

/* there needs to be support for Unicode here,
 * unless we pretend that we can redefine the MD-5
 * algorithm for multi-byte characters (perhaps
 * by adding every four 16-bit characters and
 * shortening the sum to 32 bits). Otherwise
 * I suggest performing MD-5 as if every character
 * was two bytes--e.g., 0040 0025 = @%--but then
 * how will an ordinary MD-5 sum be matched?
 * There is no way to standardize text to something
 * like UTF-8 before transformation; speed cost is
 * utterly prohibitive. The JavaScript standard
 * itself needs to look at this: it should start
 * providing access to strings as preformed UTF-8
 * 8-bit unsigned value arrays.
 */
zdbb.md5.md5blk = function(s) { /* I figured global was faster.   */
var md5blks = [], i; /* Andy King said do it this way. */
for (i=0; i<64; i+=4) {
md5blks[i>>2] = s.charCodeAt(i)
+ (s.charCodeAt(i+1) << 8)
+ (s.charCodeAt(i+2) << 16)
+ (s.charCodeAt(i+3) << 24);
}
return md5blks;
};



zdbb.md5.rhex = function(n) {
  var s='', j=0;
  for(; j<4; j++)
  s += zdbb.md5.hex_chr[(n >> (j * 8 + 4)) & 0x0F]
  + zdbb.md5.hex_chr[(n >> (j * 8)) & 0x0F];
  return s;
};

zdbb.md5.hex = function(x) {
  for (var i=0; i<x.length; i++)
    x[i] = zdbb.md5.rhex(x[i]);
  return x.join('');
};

zdbb.md5.md5 = function(s) {
  return zdbb.md5.hex(zdbb.md5.md51(s));
};

/* this function is much faster,
so if possible we use it. Some IEs
are the only ones I know of that
need the idiotic second function,
generated by an if clause.  */

zdbb.md5.add32 = function(a, b) {
  return (a + b) & 0xFFFFFFFF;
};

// zd-email

zdbb.email = {
  api_endpoint: "//emailapi.zdbb.net/zdlyris/v1/",
  client_id: "6",
  hash_key: "2d2c140ef5eb4c2fb5946f3d9f054851"
};

zdbb.email.xmlhttp = function() {
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

zdbb.email.send = function(url, callback, method, data, sync) {
  var x = zdbb.email.xmlhttp();

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

zdbb.email.get_parameter = function(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
  if (results == null) {
    regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(document.referrer);
  }
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

zdbb.email.access_endpoint = function(data, callback, api_endpoint, postData, imgUrl) {
  var fn = function(d) {
    try {
      data = JSON.parse(d);
    } catch (e) {
      data = eval(d);
    }
    if(data.success && typeof(imgUrl) !== 'undefined' && imgUrl !== null && data.data.memberid){
      var img = new Image().src = imgUrl.replace("%member_id%", data.data.memberid);
    }
    if(data.success && typeof(imgUrl) !== 'undefined' && imgUrl !== null && data.data.memberids){
      for(var ind = 0; ind < data.data.memberids.length; ind++){
        var memberId = data.data.memberids[ind];
        if(memberId.Value)
        {
          var i = new Image().src = imgUrl.replace("%member_id%", memberId.Value);
        }
      }
    }
    callback(d);
  };

  zdbb.email.send(api_endpoint, fn, "POST", postData, true);
};

zdbb.email.subscribe_user = function(data, callback, api_endpoint, client_id, hash_key) {
  if (api_endpoint === null || typeof(api_endpoint) === 'undefined') {
    api_endpoint = zdbb.email.api_endpoint;
  }
  if(client_id === null || typeof(client_id) === 'undefined'){
    client_id = zdbb.email.client_id;
  }
  if(hash_key === null || typeof(hash_key) === 'undefined'){
    hash_key = zdbb.email.hash_key;
  }

  var chksum = zdbb.md5.md5(hash_key + JSON.stringify(data));
  var postData = 'cid=' + encodeURIComponent(client_id) + '&data=' + encodeURIComponent(JSON.stringify(data)) + '&chk=' + encodeURIComponent(chksum).toUpperCase();

  var landing_page = encodeURIComponent(zdbb.email.get_parameter('landing_page'));
  var source = encodeURIComponent(zdbb.email.get_parameter('source'));
  var medium = encodeURIComponent(zdbb.email.get_parameter('medium'));
  var campaign = encodeURIComponent(zdbb.email.get_parameter('campaign'));

  var imageUrl = 'http://zdbb.net/l/Zlx5JiflEeS0LCIACh-JyA?member_id=%member_id%&landing_page=' +
    landing_page + '&source=' + source + '&medium=' + medium + '&campaign=' + campaign;

  zdbb.email.access_endpoint(data, callback, api_endpoint, postData, imageUrl);
};

zdbb.email.unsubscribe_user = function(data, callback, api_endpoint, client_id, hash_key) {
  if (api_endpoint === null || typeof(api_endpoint) === 'undefined') {
    api_endpoint = zdbb.email.api_endpoint;
  }
  if(client_id === null || typeof(client_id) === 'undefined'){
    client_id = zdbb.email.client_id;
  }
  if(hash_key === null || typeof(hash_key) === 'undefined'){
    hash_key = zdbb.email.hash_key;
  }

  var chksum = zdbb.md5.md5(hash_key + JSON.stringify(data));
  var postData = 'cid=' + encodeURIComponent(client_id) + '&data=' + encodeURIComponent(JSON.stringify(data)) + '&chk=' + encodeURIComponent(chksum).toUpperCase();

  var mailing = encodeURIComponent(zdbb.email.get_parameter('mailing'));
  var mailing_id = encodeURIComponent(zdbb.email.get_parameter('mailing_id'));

  var imageUrl = 'http://zdbb.net/l/Zlx5JiflEeS0LCIACh-JyA?member_id=%member_id%&mailing=' + mailing + '&mailing_id=' + mailing_id;

  zdbb.email.access_endpoint(data, callback, api_endpoint, postData, imageUrl);
};

zdbb.email.endpoint_without_pixels = function(data, callback, api_endpoint, client_id, hash_key) {
  if(api_endpoint === null || typeof(api_endpoint) === 'undefined'){
    api_endpoint = zdbb.email.api_endpoint;
  }
  if(client_id === null || typeof(client_id) === 'undefined'){
    client_id = zdbb.email.client_id;
  }
  if(hash_key === null || typeof(hash_key) === 'undefined'){
    hash_key = zdbb.email.hash_key;
  }

  var chksum = zdbb.md5.md5(hash_key + JSON.stringify(data));
  var postData = 'cid=' + encodeURIComponent(client_id) + '&data=' + encodeURIComponent(JSON.stringify(data)) + '&chk=' + encodeURIComponent(chksum).toUpperCase();

  zdbb.email.access_endpoint(data, callback, api_endpoint, postData, null);
};