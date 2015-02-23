(function(z){
var XI;
var PI;
var hH = function(a) {
  a.Jf && (0,z.Nd)(a.Jf);
  a.Jf = null;
  a.Ic && a.Ic.close();
  a.Ic = null;
};
var iH = function() {
  var a = window.document.createElement("input");
  a.type = "file";
  a.name = "uploadedFile";
  a.value = "";
  a.style.position = "absolute";
  a.style.left = "-9999px";
  a.style.top = "-9999px";
  return a;
};
z.jH = function(a) {
  return a.innerText || a.textContent;
};
var kH = function(a) {
  var b, c = !1;
  if (a.createRange) {
    try {
      b = a.createRange();
    } catch (d) {
      return null;
    }
  } else {
    if (a.rangeCount) {
      if (1 < a.rangeCount) {
        c = new z.jf;
        b = 0;
        for (var e = a.rangeCount;b < e;b++) {
          c.Qf.push(a.getRangeAt(b));
        }
        return c;
      }
      b = a.getRangeAt(0);
      c = (0,z.Ze)(a.anchorNode, a.anchorOffset, a.focusNode, a.focusOffset);
    } else {
      return null;
    }
  }
  return(a = b) && a.addElement ? (0,z.cf)(a) : (0,z.Te)(a, c);
};
var lH = function(a) {
  z.v.call(this);
  this.ca = a;
  this.W = a.get("dialog");
  this.ma = (0,z.Cc)(new z.wc, function() {
    this.ma = null;
  }, this);
  this.Im = !1;
  this.lk = "";
};
var mH = function(a, b, c) {
  z.eB.call(this, a);
  this.lk = b;
  this.Ic = c;
  this.ma = new z.wc;
};
var nH = function(a) {
  z.v.call(this);
  this.ca = a;
  this.ma = (0,z.Cc)(new z.wc, function() {
    (0,z.bd)(this);
  }, this);
  this.Da = iH();
  this.Im = !1;
};
z.oH = function(a, b) {
  return a.Mi[a.Pm[b]];
};
z.pH = function(a, b) {
  return b in a.Pm && a.Pm[b] in a.Mi;
};
var qH = function(a) {
  return 5 == a || 4 == a || 11 == a;
};
var rH = function(a) {
  return'\x3cdiv class\x3d"ie9-dialog"\x3e\x3cform action\x3d"/_/iframe-upload" method\x3d"post" accept-charset\x3d"utf-8" enctype\x3d"multipart/form-data" target\x3d"' + (0,z.P)(a.rL) + '"\x3e\x3cp\x3e\x3cinput type\x3d"file" name\x3d"uploadedFile"\x3e\x3c/p\x3e\x3c/form\x3e\x3cdiv class\x3d"spinner-overlay"\x3e\x3c/div\x3e\x3c/div\x3e';
};
var sH = function(a, b, c) {
  var d = (0,z.ta)(c);
  if (!b[d]) {
    b[d] = !0;
    for (var e in c.De) {
      var d = c.De[e], f = a.De[e];
      f || (f = a.De[e] = new z.ah(a), f.di = !1, f.ye = !1);
      f.di = f.di || d.di;
      f.ye = f.ye || d.ye;
      for (var h in d.attributes) {
        var k = d.attributes[h];
        if (!0 === k || !0 === f.attributes[h]) {
          f.attributes[h] = !0;
        } else {
          if ((0,z.na)(k)) {
            var l = f.attributes[h];
            (0,z.na)(l) || (l = f.attributes[h] = []);
            (0,z.gb)(l, k);
          }
        }
      }
      sH(a, b, d.td);
    }
  }
};
z.tH = function(a) {
  return(a = (0,z.se)(a || window)) && kH(a);
};
var uH = function(a, b, c) {
  var d;
  d = d || (0,z.td)(a.parentElement());
  var e;
  1 != b.nodeType && (e = !0, b = d.zc("DIV", null, b));
  a.collapse(c);
  c = d || (0,z.td)(a.parentElement());
  var f, h = f = b.id;
  f || (f = b.id = "goog_" + z.uB++);
  a.pasteHTML(b.outerHTML);
  (b = c.ba(f)) && (h || b.removeAttribute("id"));
  e && (a = b.firstChild, d.nL(b), b = a);
  return b;
};
z.vH = function(a, b, c) {
  if ((0,z.oa)(a)) {
    try {
      (0,z.rb)(a, b, c);
    } catch (d) {
      if (d !== z.fe) {
        throw d;
      }
    }
  } else {
    a = (0,z.ee)(a);
    try {
      for (;;) {
        b.call(c, a.next(), void 0, a);
      }
    } catch (e) {
      if (e !== z.fe) {
        throw e;
      }
    }
  }
};
z.wH = function(a, b) {
  b.parentNode && b.parentNode.insertBefore(a, b);
};
var xH = function(a) {
  return a.replace(/&([^;]+);/g, function(a, c) {
    switch(c) {
      case "amp":
        return "\x26";
      case "lt":
        return "\x3c";
      case "gt":
        return "\x3e";
      case "quot":
        return'"';
      default:
        if ("#" == c.charAt(0)) {
          var d = Number("0" + c.substr(1));
          if (!(0,window.isNaN)(d)) {
            return String.fromCharCode(d);
          }
        }
        return a;
    }
  });
};
var yH = function(a) {
  var b = {"\x26amp;":"\x26", "\x26lt;":"\x3c", "\x26gt;":"\x3e", "\x26quot;":'"'}, c;
  c = window.document.createElement("div");
  return a.replace(zH, function(a, e) {
    var f = b[a];
    if (f) {
      return f;
    }
    if ("#" == e.charAt(0)) {
      var h = Number("0" + e.substr(1));
      (0,window.isNaN)(h) || (f = String.fromCharCode(h));
    }
    f || (c.innerHTML = a + " ", f = c.firstChild.nodeValue.slice(0, -1));
    return b[a] = f;
  });
};
z.$ = function(a, b) {
  return z.ba[a] = b;
};
z.AH = function(a) {
  (0,z.gB)(a);
  return a.Ag.zb();
};
z.BH = function(a, b) {
  if ((0,z.pH)(a, b)) {
    return(0,z.Jc)((0,z.oH)(a, b));
  }
  if (!a.Wp[b]) {
    var c = z.hG.R({"*":[(0,window.encodeURIComponent)(b)]}, a.aG ? {frame:"true"} : void 0);
    a.Wp[b] = (0,z.q)((0,z.Cc)(a.ea.get(c, {na:!0}), function() {
      delete this.Wp[b];
    }, a), function(a) {
      a = (0,z.al)(a.value, a.references);
      a = (0,z.Bz)(this, a);
      this.Pm[b] = (0,z.lk)(a, "mediaResourceId");
      return a;
    }, a);
  }
  return a.Wp[b].zb();
};
var CH = function(a, b) {
  var c = window.document.getElementById(a.yp + (0,z.ta)(b));
  a.X("before-clear", b, c);
  c.innerHTML = (0,z.Hq)(a, b);
  a.X("after-draw", b, c);
};
z.DH = function(a, b) {
  a.xs.cancel();
  var c = a.U;
  (0,z.t)(c, "highlight-menu-measure");
  var d = c.offsetWidth, e = b.left + b.width / 2 - d / 2, f = b.top + -6 - c.offsetHeight;
  e + d > window.document.body.clientWidth ? (e -= d / 2, (0,z.Wc)(c, "far-left", "far-right")) : 0 >= e ? (e += d / 2, (0,z.Wc)(c, "far-right", "far-left")) : (0,z.Tc)(c, ["far-left", "far-right"]);
  var d = 0, h = (0,z.mi)(c);
  h && (d = (0,z.ni)(h).top);
  c.style.left = Math.round(e) + "px";
  c.style.top = Math.round(f + d) + "px";
  (0,z.ri)(c);
  (0,z.Wc)(c, "highlight-menu-measure", "highlight-menu-active");
  a.ar = !0;
  a.X("show");
};
z.EH = function(a) {
  a.ar && ((0,z.Tc)(a.U, ["highlight-menu-active", "highlight-menu-linkmode"]), a.ar = !1, a.X("hide"));
};
z.FH = function(a, b, c) {
  return a.ir(b, function() {
    return c;
  });
};
z.GH = function(a, b) {
  var c = a.Ua[b];
  if (!c) {
    throw Error('Called finishLoading on "' + b + '", which looks like it was not in the process of loading.');
  }
  (0,z.q)(a.rt[b] || (0,z.Jc)(!0), function() {
    delete this.Ua[b];
    delete this.rt[b];
    this.Fp[b] = !0;
    c.Ea(!0);
  }, a);
};
z.HH = function(a, b, c) {
  c = Math.min(c, a.text.length);
  a.text = a.text.substring(0, c) + b + a.text.substring(c);
  a = a.yb;
  for (var d = 0;d < a.length;d++) {
    var e = a[d];
    (3 != e.g() ? (0,z.Lg)(e) >= c : (0,z.Lg)(e) > c) && e.setEnd((0,z.Lg)(e) + b.length);
    0 !== (0,z.Kg)(e) && (0,z.Kg)(e) >= c && e.setStart((0,z.Kg)(e) + b.length);
  }
};
z.IH = function(a, b) {
  for (var c = a.yb, d = 0;d < c.length;d++) {
    var e = c[d];
    if (e.g() == b.g() && ((0,z.vm)(b, (0,z.Kg)(e), !1) && e.setStart((0,z.Lg)(b)), (0,z.vm)(b, (0,z.Lg)(e), !0) && e.setEnd((0,z.Kg)(b)), (0,z.vm)(e, (0,z.Kg)(b), !1) && (0,z.vm)(e, (0,z.Lg)(b), !0))) {
      c = z.Hl.Cb(z.Jg, z.Hl.$c(e));
      c.setStart((0,z.Lg)(b));
      e.setEnd((0,z.Kg)(b));
      (0,z.sm)(a, c);
      break;
    }
  }
  (0,z.Bm)(a);
};
var JH = function(a, b, c, d) {
  a = a.yb;
  for (var e = 0;e < a.length;e++) {
    var f = a[e];
    if (f.g() == b && (0,z.Kg)(f) < d && (0,z.Lg)(f) > c) {
      return!0;
    }
  }
  return!1;
};
z.KH = function(a) {
  return qH(a.type);
};
z.LH = function(a) {
  var b = a.metadata && a.metadata.$a();
  return 4 == a.type && !b;
};
var MH = function(a, b) {
  return 5 != a && 4 != a && 11 != a && (0,z.Fa)(b);
};
var NH = function(a, b) {
  a.Ai = b;
};
var OH = function(a, b) {
  var c = (0,z.cl)(a, b);
  return a.Vf(c);
};
var PH = function(a, b) {
  return new z.sg((0,z.cl)(a, b), (0,z.dl)(a, b));
};
z.QH = function(a) {
  a.it || (a.it = new z.kk((0,z.J)("currentUser")));
  return a.it;
};
var RH = function(a, b, c) {
  a = a.attributes[b];
  if (!0 === a) {
    return c;
  }
  if ((0,z.na)(a)) {
    return "class" == b ? (c.match(/\S+/g) || []).filter((0,z.Ba)(z.ab, a)).join(" ") : (0,z.ab)(a, c) ? c : null;
  }
  if (a instanceof RegExp) {
    for (var d = "";b = a.exec(c);) {
      d += b[0];
    }
    return d || null;
  }
  return null;
};
var SH = function() {
  var a = z.TH, b = new z.Zg;
  (0,z.bh)(b);
  sH(b, {}, a);
  return b;
};
var UH = function(a, b, c, d) {
  return(0,z.Ye)(a, b, c, d);
};
z.VH = function(a) {
  a = a.te();
  return 1 == a.nodeType ? a : a.parentNode;
};
var WH = function(a) {
  return-1 != a.indexOf("\x26") ? "document" in z.da ? yH(a) : xH(a) : a;
};
var XH = function(a) {
  return 1 == a.nodeType && !(0,z.Jd)(a);
};
var YH = function(a, b) {
  this.S = a;
  this.offset = b;
};
var ZH = function(a) {
  var b = a.S.parentNode;
  return new YH(b, (0,z.bb)(b.childNodes, a.S));
};
var $H = function(a) {
  return a.length || a.childNodes.length;
};
var aI = function(a, b, c, d) {
  for (;1 == a.nodeType;) {
    var e = a.childNodes[b];
    if (e || a.lastChild) {
      if (e) {
        var f = e.previousSibling;
        if (c && f) {
          if (d && XH(f)) {
            break;
          }
          a = f;
          b = $H(a);
        } else {
          if (d && XH(e)) {
            break;
          }
          a = e;
          b = 0;
        }
      } else {
        if (d && XH(a.lastChild)) {
          break;
        }
        a = a.lastChild;
        b = $H(a);
      }
    } else {
      break;
    }
  }
  return new YH(a, b);
};
var bI = function(a, b) {
  for (var c = null, d;a != b && (d = a.parentNode);) {
    for (var e = a, f = d.cloneNode(!1);e.nextSibling;) {
      f.appendChild(e.nextSibling);
    }
    c && f.insertBefore(c, f.firstChild);
    c = f;
    a = d;
  }
  return c;
};
var cI = function(a) {
  for (;a.firstChild;) {
    (0,z.wH)(a.firstChild, a);
  }
  (0,z.Nd)(a);
};
var dI = function(a, b) {
  function c(a) {
    return 3 == a.nodeType ? b ? (0,z.Fa)(a.nodeValue) : 0 === a.nodeValue.length : (0,z.fi)(a) ? !0 : "HR" == a.tagName || "IMG" == a.tagName || "IFRAME" == a.tagName || "PHANTOM-IFRAME" == a.tagName ? !1 : (0,z.wB)(a.childNodes, c);
  }
  return c(a);
};
var eI = function(a) {
  var b;
  if (3 == a.S.nodeType) {
    for (b = a.S.previousSibling;b && 3 == b.nodeType;b = b.previousSibling) {
      a.offset += $H(b);
    }
  } else {
    b = a.S.previousSibling;
  }
  var c = a.S.parentNode;
  a.S = b ? b.nextSibling : c.firstChild;
  return a;
};
var fI = function(a, b) {
  return b ? aI(a.Ma(), a.Qb()) : aI(a.pb(), a.Ec());
};
var gI = function(a) {
  for (var b = null, c = a.firstChild;c;) {
    var d = c.nextSibling;
    3 == c.nodeType ? "" == c.nodeValue ? a.removeChild(c) : b ? (b.nodeValue += c.nodeValue, a.removeChild(c)) : b = c : (gI(c), b = null);
    c = d;
  }
};
var hI = function(a) {
  var b = a && a.nodeName.toLowerCase();
  return!(!a || "block" != (1 != a.nodeType ? null : z.w ? a.currentStyle ? a.currentStyle.display : null : (0,z.yf)(a, "display")) && "td" != b && "table" != b && "li" != b);
};
var iI = function(a, b, c) {
  this.XC = a;
  this.PM = !!c;
  a && !b && this.next();
};
var jI = function(a, b, c, d) {
  if (null != a) {
    for (a = a.firstChild;a;) {
      if (b(a) && (c.push(a), d) || jI(a, b, c, d)) {
        return!0;
      }
      a = a.nextSibling;
    }
  }
  return!1;
};
var kI = function(a, b) {
  var c = bI(b, a);
  (0,z.Ld)(c, a);
  for (var c = null, d = b;d != a && !c;d = d.parentNode) {
    c = d.previousSibling;
  }
  c = c ? bI(c, a) : a;
  d = c == a && (0,z.lw)(a) && !b.nextSibling && b.parentNode == a;
  cI(b);
  if (!d || "P" == a.tagName && "P" != b.tagName) {
    (0,z.Ld)(b, a), b.appendChild(c);
  }
};
var lI = function(a) {
  for (a = a.firstChild;a;a = a.nextSibling) {
    if ("FIGCAPTION" != a.tagName && (3 == a.nodeType && 0 !== a.nodeValue.length || 1 == a.nodeType && !lI(a))) {
      return!1;
    }
  }
  return!0;
};
var mI = function(a) {
  var b = a.xe(), c = eI(fI(a, !b)), d = ZH(c), e = c.S.previousSibling;
  3 == c.S.nodeType && (c.S = null);
  var f = eI(fI(a, b)), h = ZH(f), k = f.S.previousSibling;
  3 == f.S.nodeType && (f.S = null);
  return function() {
    !c.S && e && (c.S = e.nextSibling, c.S || (c = new YH(e, $H(e))));
    !f.S && k && (f.S = k.nextSibling, f.S || (f = new YH(k, $H(k))));
    return(0,z.Ye)(c.S || d.S.firstChild || d.S, c.offset, f.S || h.S.firstChild || h.S, f.offset);
  };
};
var nI = function(a) {
  return 1 == a.nodeType || 3 == a.nodeType && !!/[^\t\n\r ]/.test(a.nodeValue);
};
var oI = function(a) {
  try {
    return a.next();
  } catch (b) {
    return null;
  }
};
var pI = function(a, b, c) {
  (0,z.ha)(c) || (c = b && a.childNodes.length ? a.childNodes.length - 1 : 0);
  iI.call(this, a.childNodes[c], !0, b);
};
var qI = function(a) {
  var b = (0,z.ee)(a);
  a = new z.de;
  a.next = function() {
    for (;;) {
      var a = b.next();
      if (nI.call(void 0, a)) {
        return a;
      }
    }
  };
  return a;
};
var rI = function(a, b) {
  var c = b.parentNode;
  c && c.replaceChild(a, b);
};
var sI = function(a, b) {
  if (b) {
    var c = mI(b), d;
    d = (0,z.VH)(b);
    d = (0,z.Zd)(d, hI);
  }
  d ? (d = (0,z.Xd)(d, a), z.w ? gI(d) : d.normalize()) : a && (z.w ? gI(a) : a.normalize());
  return c ? c() : null;
};
var tI = function(a) {
  return(0,z.Qd)(a) && ("IMG" == a.tagName || 0 !== a.getElementsByTagName("IMG").length);
};
var uI = function(a) {
  this.cv = a;
  (0,z.Sc)(this.cv.getElementsByTagName("*"), z.lw);
};
var vI = function(a) {
  dI(a, !1) && 0 === a.getElementsByTagName("BR").length && a.appendChild(window.document.createElement("br"));
};
var wI = function(a) {
  z.v.call(this);
  this.KD = "goog_" + z.uB++;
  this.WB = "goog_" + z.uB++;
  this.Yg = a.xe();
  this.Rf = (0,z.td)(a.Jg());
  a.dh(this.Rf.zc("SPAN", {id:this.KD}), this.Rf.zc("SPAN", {id:this.WB}));
};
var xI = function(a, b) {
  return a.Rf.ba(b ? a.KD : a.WB);
};
var yI = function(a) {
  var b = !1, c = 1E4;
  do {
    for (var b = !1, d = a.firstChild;d;d = d.nextSibling) {
      var e;
      e = d;
      var f;
      f = [];
      if (f = jI(e, z.lw, f, !0) ? f[0] : void 0) {
        dI(f, !1) ? (0,z.Nd)(f) : kI(e, f), e = !0;
      } else {
        if (f = 1 == e.nodeType && e.querySelectorAll("img"), !f || !f.length || 1 === f.length && lI(e)) {
          e = !1;
        } else {
          f = f[0];
          var h = window.document.createElement("FIGURE");
          rI(h, f);
          h.appendChild(f);
          kI(e, h);
          e = !0;
        }
      }
      if (e) {
        b = !0;
        c--;
        break;
      }
    }
    if (0 > c) {
      throw Error("infinite loop");
    }
  } while (b);
  b = [];
  f = !1;
  c = (0,z.fb)(a.childNodes);
  for (d = 0;d < c.length;d++) {
    e = c[d], (0,z.lw)(e) ? (b.push(new uI(e)), f = !1) : f && !tI(e) || b.length && "SPAN" == e.tagName && !e.childNodes.length && e.id && (0,z.Da)(e.id, "goog_") ? (h = (0,z.Ya)(b), h.cv.appendChild(e), (0,z.Sc)(h.cv.getElementsByTagName("*"), z.lw)) : (f = window.document.createElement("p"), f.appendChild(e), b.push(new uI(f)), c[d + 1] ? a.insertBefore(f, c[d + 1]) : a.appendChild(f), f = !tI(e));
  }
};
var zI = function(a) {
  a = (0,z.fb)(a.childNodes);
  (0,z.rb)(a, function(a) {
    (0,z.lw)(a) && "FIGURE" != a.tagName || !dI(a, !0) || (0,z.Nd)(a);
  });
};
var AI = function(a) {
  for (a = a.lastChild;a;a = a.previousSibling) {
    var b = a.nextSibling, c = a.tagName;
    !b || c != b.tagName || "UL" != c && "OL" != c || ((0,z.Kd)(a, b.childNodes), (0,z.Nd)(b));
  }
};
z.BI = function(a) {
  return 2 === (0,z.Rg)(a) || 3 === (0,z.Rg)(a) || 4 === (0,z.Rg)(a);
};
var CI = function(a) {
  wI.call(this, a);
};
z.DI = function(a) {
  for (var b;b = a && 1 == a.nodeType ? oI(qI(new pI(a, !1))) : null;) {
    a = b;
  }
  return a;
};
var EI = function(a) {
  for (var b;b = a && 1 == a.nodeType ? oI(qI(new pI(a, !0))) : null;) {
    a = b;
  }
  return a;
};
var FI = function() {
  var a = z.EA, b = z.FA ? function(c) {
    return a.call(b.src, b.Hj, c);
  } : function(c) {
    c = a.call(b.src, b.Hj, c);
    if (!c) {
      return c;
    }
  };
  return b;
};
var GI = function(a) {
  a = (0,z.Pm)(a) + "\x3c/div\x3e";
  return(0,z.Id)(a);
};
var HI = function(a, b) {
  for (var c, d = [], e = a.text;c = b.exec(e);) {
    var f = c.index;
    d.push([f, f + c[0].length]);
  }
  for (c = d.length - 1;0 <= c;c--) {
    (0,z.Am)(a, d[c][0], d[c][1]);
  }
  b.lastIndex = 0;
};
var II = function(a, b) {
  var c = a.Ma(), d = a.pb();
  if (c && d) {
    var e = function(a) {
      return a == b;
    }, c = (0,z.Zd)(c, e), d = (0,z.Zd)(d, e);
    if (c && d) {
      return a.ja();
    }
    if (c) {
      return d = EI(b), UH(a.Ma(), a.Qb(), d, $H(d));
    }
    if (d) {
      return UH((0,z.DI)(b), 0, a.pb(), a.Ec());
    }
  }
  return null;
};
var JI = function(a, b) {
  var c = a.currentStyle ? a.currentStyle[b] : null, d;
  if (c) {
    if (/^\d+px?$/.test(c)) {
      d = (0,window.parseInt)(c, 10);
    } else {
      d = a.style.left;
      var e = a.runtimeStyle.left;
      a.runtimeStyle.left = a.currentStyle.left;
      a.style.left = c;
      c = a.style.pixelLeft;
      a.style.left = d;
      a.runtimeStyle.left = e;
      d = c;
    }
  } else {
    d = 0;
  }
  return d;
};
var KI = function(a, b, c, d) {
  z.he.call(this, a, b, c, null, d);
};
var LI = function(a, b, c) {
  return(0,z.Dd)(window.document, arguments);
};
var MI = function(a) {
  return(0,z.ra)(a) ? a : a[z.gH] || (a[z.gH] = function(b) {
    return a.handleEvent(b);
  });
};
z.NI = function(a, b) {
  var c, d = (c = (c = (0,z.tH)(window)) && II(c, a)) && new CI(c), e = (0,z.fb)(a.childNodes), f = b.sections;
  if (!f) {
    for (c = 0;c < e.length;c++) {
      if ("SECTION" === e[c].tagName) {
        f = !0;
        break;
      }
    }
  }
  if (f) {
    var h = f = null;
    for (c = 0;c < e.length;c++) {
      h = e[c], "SECTION" === h.tagName ? f = null : (f || (f = LI("section"), (0,z.Ld)(f, h)), f.appendChild(h));
    }
    e = (0,z.fb)(a.childNodes);
    for (c = 0;c < e.length;c++) {
      for (var h = e[c], k = (0,z.fb)(h.childNodes), l = null, f = 0;f < k.length;f++) {
        var m = k[f];
        (0,z.nw)(m) || (0,z.ow)(m) || (0,z.fi)(m) ? l = null : (l || (l = GI("layout-single-column"), (0,z.Ld)(l, m)), l.appendChild(m));
      }
      h = (0,z.yw)(h);
      for (f = 0;f < h.length;f++) {
        k = h[f], yI(k), zI(k), (0,z.uw)(k, vI), AI(k);
      }
    }
  } else {
    yI(a), zI(a), (0,z.uw)(a, vI), AI(a);
  }
  d && d.restore();
};
z.OI = function(a) {
  var b = (0,z.xn)(a.className);
  return!!PI[a.tagName] && !!a.getAttribute("name") && 5 != b && 6 != b && 7 != b;
};
var QI = function(a) {
  for (var b = {}, c = 0, c = 0;c < a.length;c++) {
    var d = a[c].getName();
    d in b ? a[c].Xa("") : b[d] = !0;
  }
  for (c = 0;c < a.length;c++) {
    (0,z.nm)(a[c], b);
  }
};
var RI = function(a, b) {
  a.S.firstChild && (a = aI(a.S, a.offset));
  for (var c = new KI(b), d, e = 0;d = (0,z.ge)(c);) {
    if (a.S == d) {
      return e + a.offset;
    }
    3 == d.nodeType ? e += d.nodeValue.length : "BR" == d.tagName && (e += 1);
  }
  return-1;
};
z.SI = function(a, b) {
  return a.querySelector('[name\x3d"' + b + '"]');
};
z.TI = function(a, b) {
  var c = (0,z.tf)((0,z.qi)(a)), d = (0,z.Ad)(window), d = new z.rf(Math.max(0, c.top), Math.min(d.width, c.right), Math.min(d.height, c.bottom), Math.max(0, c.left));
  if (!(b.top <= d.top && b.bottom >= d.bottom || b.top >= d.top && b.bottom <= d.bottom)) {
    var c = Math.round(b.top - d.top), d = Math.round(b.bottom - d.bottom), e = (0,z.ni)(a);
    (0,z.ii)(a, e.left, e.top + (1 === (0 == c ? 0 : 0 > c ? -1 : 1) ? Math.min(c, d) : Math.max(c, d)));
  }
};
var UI = function(a) {
  a = a.replace(/&nbsp;/g, " ");
  return a = a.replace(/ +/g, " ");
};
var VI = function(a) {
  a = a.replace(/<div>\s*(<br>)*\s*<\/div>/ig, "\x3cp\x3e");
  a = a.replace(/\s*(<br>)+\s*<\/p>/ig, "\x3c/p\x3e");
  return a = a.replace(/<(\/?)p>\s*<\1p>/ig, "\x3c$1p\x3e");
};
var WI = function(a, b) {
  if (-1 == a.indexOf("@") && -1 == a.indexOf("://") && -1 == a.indexOf("www.")) {
    return(0,z.Ha)(a);
  }
  var c = b || {};
  "rel" in c || (c.rel = "nofollow");
  "target" in c || (c.target = "_blank");
  var d = [], e;
  for (e in c) {
    c.hasOwnProperty(e) && c[e] && d.push((0,z.Ha)(e), '\x3d"', (0,z.Ha)(c[e]), '" ');
  }
  var f = d.join("");
  return a.replace(z.yC, function(a, b, c, d, e) {
    a = [(0,z.Ha)(b)];
    if (!c) {
      return a[0];
    }
    a.push("\x3ca ", f, 'href\x3d"');
    d ? (a.push("mailto:"), c = d, d = "") : (e || a.push("http://"), (d = c.match(XI)) ? (c = d[1], d = d[2]) : d = "");
    c = (0,z.Ha)(c);
    d = (0,z.Ha)(d);
    a.push(c, '"\x3e', c, "\x3c/a\x3e", d);
    return a.join("");
  });
};
var YI = function(a, b) {
  if (z.w) {
    var c = JI(a, b + "Left"), d = JI(a, b + "Right"), e = JI(a, b + "Top"), f = JI(a, b + "Bottom");
    return new z.rf(e, d, f, c);
  }
  c = (0,z.yf)(a, b + "Left");
  d = (0,z.yf)(a, b + "Right");
  e = (0,z.yf)(a, b + "Top");
  f = (0,z.yf)(a, b + "Bottom");
  return new z.rf((0,window.parseFloat)(e), (0,window.parseFloat)(d), (0,window.parseFloat)(f), (0,window.parseFloat)(c));
};
var ZI = function(a) {
  if (1 == a.nodeType) {
    var b;
    if (a.getBoundingClientRect) {
      b = (0,z.Af)(a), b = new z.rd(b.left, b.top);
    } else {
      b = (0,z.be)((0,z.td)(a));
      var c = (0,z.Cf)(a);
      b = new z.rd(c.x - b.x, c.y - b.y);
    }
    if (z.Qe && !(0,z.id)(12)) {
      b: {
        c = (0,z.Va)("transform");
        if (void 0 === a.style[c] && (c = (0,z.pf)() + (0,z.Xa)("transform"), void 0 !== a.style[c])) {
          c = (0,z.qf)() + "-transform";
          break b;
        }
        c = "transform";
      }
      a = (a = (0,z.zf)(a, c) || (0,z.zf)(a, "transform")) ? (a = a.match($I)) ? new z.rd((0,window.parseFloat)(a[1]), (0,window.parseFloat)(a[2])) : new z.rd(0, 0) : new z.rd(0, 0);
      a = new z.rd(b.x + a.x, b.y + a.y);
    } else {
      a = b;
    }
    return a;
  }
  b = (0,z.ra)(a.pw);
  c = a;
  a.targetTouches ? c = a.targetTouches[0] : b && a.qf.targetTouches && (c = a.qf.targetTouches[0]);
  return new z.rd(c.clientX, c.clientY);
};
var aJ = function(a, b) {
  return(0,z.Ye)(a, b, a, b);
};
var bJ = function(a, b, c) {
  if (!(a.nodeName in cJ)) {
    if (3 == a.nodeType) {
      c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
    } else {
      if (a.nodeName in dJ) {
        b.push(dJ[a.nodeName]);
      } else {
        for (a = a.firstChild;a;) {
          bJ(a, b, c), a = a.nextSibling;
        }
      }
    }
  }
};
z.eJ = function(a) {
  for (var b;b = a.firstChild;) {
    a.removeChild(b);
  }
};
z.fJ = function() {
  return "The file you tried to upload is a type we don’t understand. Supported formats are JPEG, PNG, and GIF.";
};
z.gJ = function() {
  var a = (0,z.J)("variants.max_upload_size_mb");
  return "The image you are trying to upload is too big. Please resize it so that it is under " + (0,z.O)(a) + "MB.";
};
z.hJ = function(a, b, c, d, e) {
  if ((0,z.na)(b)) {
    for (var f = 0;f < b.length;f++) {
      (0,z.hJ)(a, b[f], c, d, e);
    }
  } else {
    c = MI(c), (0,z.oA)(a) ? a.Ee(b, c, d, e) : a && (a = (0,z.zA)(a)) && (b = a.ml(b, c, !!d, e)) && (0,z.wA)(b);
  }
};
z.iJ = function(a, b, c, d, e) {
  if ((0,z.na)(b)) {
    for (var f = 0;f < b.length;f++) {
      (0,z.iJ)(a, b[f], c, d, e);
    }
    return null;
  }
  c = MI(c);
  if ((0,z.oA)(a)) {
    a = a.qa(b, c, d, e);
  } else {
    if (!b) {
      throw Error("Invalid event type");
    }
    var f = !!d, h = (0,z.zA)(a);
    h || (a[z.AA] = h = new z.tA(a));
    c = h.add(b, c, !1, d, e);
    c.es || (d = FI(), c.es = d, d.src = a, d.Hj = c, a.addEventListener ? a.addEventListener(b.toString(), d, f) : a.attachEvent((0,z.xA)(b.toString()), d), z.yA++);
    a = c;
  }
  return a;
};
var jJ = function(a) {
  var b = z.vg;
  return(0,z.Hd)((0,z.Om)(a, b) + (0,z.Tm)(a, b));
};
var kJ = function(a, b) {
  a = a.cloneNode(!0);
  (0,z.NI)(a, {rf:!1, isPublished:!1, media:null, sections:b, hi:!1, Ih:!0});
  var c = (0,z.ww)(a).map(function(a) {
    return(0,z.Iw)(a);
  }), d = (0,z.xw)(a), d = b ? (0,z.Cw)(d) : [], c = c.map(function(a) {
    return a.Cb();
  }), c = (0,z.Cg)(new z.Bg, c);
  b && (0,z.Dg)(c, d);
  return c;
};
var lJ = function(a) {
  return LI("span", {className:"default-value"}, a);
};
var mJ = function(a, b) {
  var c = (0,z.SI)(a, "title");
  c && b.call(void 0, c);
  (c = (0,z.SI)(a, "subtitle")) && b.call(void 0, c);
  a.querySelector(".body") && (0,z.vw)(a.querySelector(".body"), z.OI, (0,z.Ub)(b, (0,z.Tb)(!0)), void 0);
};
z.nJ = function(a, b, c) {
  b = '\x3cdiv class\x3d"popover-inner"\x3e\x3cul\x3e';
  a = a.items;
  for (var d = a.length, e = 0;e < d;e++) {
    var f = a[e];
    b += '\x3cli class\x3d"typeahead-item" data-action-value\x3d"@' + (0,z.P)(f.username) + '" data-action\x3d"typeahead-populate"\x3e' + (0,z.Ro)({user:f, Pc:"avatar-micro", Cr:!0}, c) + '\x3cstrong class\x3d"typeahead-name"\x3e' + (0,z.O)(f.name) + '\x3c/strong\x3e \x3cem class\x3d"typeahead-username"\x3e@' + (0,z.O)(f.username) + "\x3c/em\x3e\x3c/li\x3e";
  }
  return b + '\x3c/ul\x3e\x3c/div\x3e\x3cdiv class\x3d"popover-arrow"\x3e\x3c/div\x3e';
};
var oJ = function(a) {
  var b = void 0 != a.previousElementSibling ? a.previousElementSibling : (0,z.Pd)(a.previousSibling, !1), c = void 0 != a.nextElementSibling ? a.nextElementSibling : (0,z.Pd)(a.nextSibling, !0);
  if (b && b.tagName === a.tagName) {
    for (;a.firstChild;) {
      b.appendChild(a.firstChild);
    }
    (0,z.Nd)(a);
    a = b;
  }
  if (c && c.tagName === a.tagName) {
    for (;c.firstChild;) {
      a.appendChild(c.firstChild);
    }
    (0,z.Nd)(c);
  }
};
var pJ = function(a, b) {
  var c = window.document.createElement(a.tagName);
  c.className = "post-list";
  for ((0,z.Ld)(c, a);a.lastChild != b;) {
    (0,z.Md)(c, a.lastChild, 0);
  }
  return c;
};
var qJ = function(a, b) {
  if (0 > a) {
    return null;
  }
  for (var c = new KI(b), d;d = (0,z.ge)(c);) {
    var e = 0;
    3 == d.nodeType ? e = d.nodeValue.length : "BR" == d.tagName && (e = 1);
    a -= e;
    if (0 > a) {
      return new YH(d, e + a);
    }
  }
  return 0 === a ? (c = aI(b, b.childNodes.length, !0)) && "IMG" == c.S.tagName && (d = c.S, d.parentNode && (0,z.gi)(d.parentNode) && (d = d.parentNode), d.previousSibling && !(0,z.gi)(d.previousSibling)) ? (c = d.previousSibling, aI(c, c.childNodes.length, !0)) : c : null;
};
z.rJ = function(a, b, c) {
  return RI(fI(a, c), b);
};
z.sJ = function(a) {
  var b = a instanceof z.re, c = b ? a.pb() : a, c = (0,z.mi)(3 == c.nodeType || "BR" == c.tagName ? c.parentNode : c);
  b ? (a = a.ja(), a.collapse(!1), (a = (a = a.uj()) && a.getClientRects && a.getClientRects()[0]) ? (a = (0,z.pi)(a), "mobile safari" == (0,z.J)("useragent.browser") && (b = (0,z.oi)(), a.top -= b.top, a.left -= b.left)) : a = null) : a = (0,z.qi)(a);
  a && (0,z.TI)(c, (0,z.tf)(a));
};
z.tJ = function(a) {
  a = a.uj().getBoundingClientRect();
  a = (0,z.pi)(a);
  if ("mobile safari" == (0,z.J)("useragent.browser")) {
    var b = (0,z.oi)();
    a.top -= b.top;
    a.left -= b.left;
  }
  return a;
};
var uJ = function(a) {
  var b = a.nodeType;
  3 == b ? uJ(a.parentNode) : 1 == b && a.focus();
};
var vJ = function(a, b) {
  for (var c = null, d = a.firstChild;d;d = c) {
    c = d.nextSibling, vJ(d, b);
  }
  b(a) && cI(a);
};
z.hL = function(a) {
  return function(b) {
    b.stopPropagation();
    b.preventDefault();
    return a ? a.call(this, b) : !1;
  };
};
var iL = function(a) {
  var b = jL;
  if (!b) {
    b = jL = SH();
    (0,z.ch)(b, "SPAN");
    for (var c in b.De) {
      var d = b.De[c];
      d.di || kL.push(new RegExp("\x3c" + c + "[^\x3e]*\x3e[\\s\\S]*?\x3c\\/" + c + "\x3e", "gi"));
      d.attributes.style = /(font-weight|font-style) *: *[\w]*;/g;
    }
  }
  a = a.replace(/\x3c!--[\s\S]*?--\x3e/g, "");
  kL.forEach(function(b) {
    a = a.replace(b, "");
  });
  a = a.replace(lL, function(a, c, d) {
    a = b.De[d.toUpperCase()] || b.dw;
    if (!a.ye) {
      return "";
    }
    (0,z.pa)(a.ye) && (d = a.ye);
    if (mL.test(c)) {
      c = "\x3c/" + d.toLowerCase() + "\x3e";
    } else {
      d = "\x3c" + d.toLowerCase();
      for (var k in a.attributes) {
        var l = c.match(new RegExp(k + "\\s*\x3d\\s*(['\"])(.+?)\\1"));
        if (l = l && l[2] && RH(a, k, l[2])) {
          "href" == k && (l = (0,z.Ha)((0,z.Wh)(WH(l), !0))), d += " " + k + '\x3d"' + l + '"';
        }
      }
      c = d + "\x3e";
    }
    return c;
  });
  a = VI(a);
  return a = UI(a);
};
z.nL = function(a) {
  a = a.replace(/<\/h\d\b[^>]*>/gi, " ").replace(/<\/p\b[^>]*>/gi, "\n\n").replace(/<\/pre\b[^>]*>/gi, "\n\n").replace(/<\/div\b[^>]*>/gi, "\n\n").replace(/<\/li\b[^>]*>/gi, "\n").replace(/<\/ul\b[^>]*>/gi, "\n").replace(/<\/ol\b[^>]*>/gi, "\n").replace(/<br\b[^>]*>/gi, "\n").replace(/<\/blockquote\b[^>]*>/gi, "\n\n").replace(/<[^>]*>/gim, "");
  return WH(a.replace(/&nbsp;/g, " ").replace(/&ldquo;/g, "“").replace(/&rdquo;/g, "”").replace(/&quot;/g, '"').replace(/&lsquo;/g, "‘").replace(/&rsquo;/g, "’").replace(/&apos;/g, "'")).trim();
};
var oL = function(a) {
  return a.replace(z.sC, '$1\x3ca href\x3d"/@$2" title\x3d"Medium profile for @$2"\x3e@$2\x3c/a\x3e');
};
z.pL = function(a, b) {
  a || (a = "");
  a = a.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  b && !1 === b.kM ? a = (0,z.Ha)(a) : (a = WI(a), a = a.replace(/((?:^|[^a-zA-Z0-9_!#$%&*@＠/]|RT:?))([@＠])([a-zA-Z0-9_]{1,20})(\/[a-zA-Z][a-zA-Z0-9_-]{0,24})?/g, '$1\x3ca href\x3d"http://twitter.com/$3$4" target\x3d"_blank" title\x3d"Twitter profile for @$3$4"\x3e@$3$4\x3c/a\x3e'));
  b && !1 === b.pQ || (a = a.replace(/\n/g, "\x3cbr\x3e"));
  b && !1 === b.UK || (a = "\x3cp\x3e" + a.replace(/<br><br>/g, "\x3c/p\x3e\x3cp\x3e").replace(/\n\n/g, "\x3c/p\x3e\x3cp\x3e") + "\x3c/p\x3e");
  return a;
};
var qL = function(a) {
  a = a.match("(?:(https?|ftp)://|www\\.)\\w[\\w~#-@!\\[\\]]*");
  return null != a ? a[0] : "";
};
var rL = function(a, b) {
  var c = a.parentNode, d = (0,z.bb)(c.childNodes, a) + (b ? 0 : 1), c = aI(c, d, b, !0);
  aJ(c.S, c.offset).select();
};
z.sL = function(a, b) {
  var c = ZI(a), d = ZI(b);
  return new z.rd(c.x - d.x, c.y - d.y);
};
z.tL = function(a) {
  if (a = (0,z.se)(a || window)) {
    if (a.empty) {
      try {
        a.empty();
      } catch (b) {
      }
    } else {
      try {
        a.removeAllRanges();
      } catch (c) {
      }
    }
  }
};
z.uL = function(a) {
  var b = [];
  bJ(a, b, !1);
  return b.join("");
};
z.vL = function(a) {
  if (z.LB && "innerText" in a) {
    a = a.innerText.replace(/(\r\n|\r|\n)/g, "\n");
  } else {
    var b = [];
    bJ(a, b, !0);
    a = b.join("");
  }
  a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  a = a.replace(/\u200B/g, "");
  z.LB || (a = a.replace(/ +/g, " "));
  " " != a && (a = a.replace(/^\s*/, ""));
  return a;
};
z.wL = function(a, b) {
  if ("textContent" in a) {
    a.textContent = b;
  } else {
    if (3 == a.nodeType) {
      a.data = b;
    } else {
      if (a.firstChild && 3 == a.firstChild.nodeType) {
        for (;a.lastChild != a.firstChild;) {
          a.removeChild(a.lastChild);
        }
        a.firstChild.data = b;
      } else {
        (0,z.eJ)(a), a.appendChild((0,z.wd)(a).createTextNode(String(b)));
      }
    }
  }
};
var xL = function(a) {
  if (a.altKey && !a.ctrlKey || a.metaKey || 112 <= a.keyCode && 123 >= a.keyCode) {
    return!1;
  }
  switch(a.keyCode) {
    case 18:
    ;
    case 20:
    ;
    case 93:
    ;
    case 17:
    ;
    case 40:
    ;
    case 35:
    ;
    case 27:
    ;
    case 36:
    ;
    case 45:
    ;
    case 37:
    ;
    case 224:
    ;
    case 91:
    ;
    case 144:
    ;
    case 12:
    ;
    case 34:
    ;
    case 33:
    ;
    case 19:
    ;
    case 255:
    ;
    case 44:
    ;
    case 39:
    ;
    case 145:
    ;
    case 16:
    ;
    case 38:
    ;
    case 224:
    ;
    case 92:
      return!1;
    case 0:
      return!z.Qe;
    default:
      return 166 > a.keyCode || 183 < a.keyCode;
  }
};
var yL = function(a) {
  var b;
  b = b || 0;
  return function() {
    return a.apply(this, Array.prototype.slice.call(arguments, 0, b));
  };
};
var zL = function(a, b) {
  this.U = a;
  this.Mf = b;
};
var AL = function(a) {
  for (var b = (0,z.yw)(a.U), c = (0,z.ww)(a.U), d = null, e = 0;e < b.length;e++) {
    var f = b[e], h = (0,z.ww)(f);
    if (h.length) {
      var h = h[0], k = c.indexOf(h);
      if ((0,z.Gm)(a.Mf, k)) {
        d = f;
      } else {
        for (;f.firstChild;) {
          d.appendChild(f.firstChild);
        }
        (0,z.Nd)(f);
        "LI" == h.tagName && oJ(h.parentNode);
      }
    } else {
      (0,z.Nd)(f);
    }
  }
};
var BL = function(a, b) {
  return(0,z.xw)(a.U)[b];
};
var CL = function(a, b) {
  var c = a.fc(b);
  return c ? (0,z.hi)(c, z.nw, a.U) : null;
};
var DL = function(a, b) {
  if (-1 != b) {
    var c = a.fc(b), d = CL(a, b), e = (0,z.ww)(d);
    if (c != e[e.length - 1]) {
      c = "LI" == c.tagName ? c.parentNode : c;
      e = GI(a.Mf.Vf(b));
      (0,z.Ld)(e, d);
      if (-1 != b) {
        var f = a.fc(b);
        if ("LI" == f.tagName) {
          var h = f.parentNode, k = null;
          f.nextSibling && (k = pJ(h, f), (0,z.Ld)(k, h));
        }
      }
      for (;d.lastChild != c;) {
        (0,z.Md)(e, d.lastChild, 0);
      }
    }
  }
};
var EL = function(a, b) {
  DL(a, b - 1);
  var c = GI(a.Mf.Vf(b)), d = a.Mf, e;
  for (e = b;e && !(0,z.Gm)(d, e);) {
    e--;
  }
  (0,z.Xg)(d.mk(), e).ta() === e ? (d = (d = a.fc(b)) ? (0,z.tw)(d, a.U) : BL(a, 0), e = (0,z.yw)(d), d.insertBefore(c, e[0])) : (0,z.Ld)(c, CL(a, b - 1));
  return c;
};
z.FL = function(a, b, c) {
  this.start = a;
  this.end = b;
  this.Eq = c;
  this.jz = !1;
};
var GL = function() {
  var a = (0,z.HL)(0, 0);
  a.jz = !0;
  return a;
};
z.HL = function(a, b) {
  return new z.FL(IL(a, b), IL(a, b), !1);
};
z.JL = function(a) {
  return a.Eq ? a.start : a.end;
};
var KL = function(a) {
  return a.start.nc === LL && a.end.nc === LL;
};
z.ML = function(a) {
  return a.isCollapsed() && a.start.nc === NL;
};
var OL = function(a, b, c) {
  this.nc = a;
  this.V = b;
  this.offset = c;
};
var IL = function(a, b) {
  return new OL(LL, a, b);
};
var PL = function(a) {
  return new OL(NL, a, 0);
};
z.QL = function(a, b, c) {
  this.Zq = c.zs;
  this.hB = c.ys;
  this.U = a;
  this.Bd = (0,z.ww)(this.U);
  this.Mb = this.ib() ? (0,z.xw)(a) : null;
  this.Lb = RL(this);
  this.cf = [];
  this.cf.length = this.Bd.length;
  this.jh = null;
  this.yu = !1;
  this.pd = SL(this, b);
  a = this.Bd;
  this.Mb && (a = a.concat(this.Mb));
  b = {};
  for (c = 0;c < a.length;c++) {
    var d = a[c].getAttribute("name");
    d && (b[d] = !0);
  }
  this.je = b;
  this.mv = !1;
  this.zh = this.ib() ? new zL(this.U, new z.Fm((0,z.Pl)(this.Lb))) : null;
  this.nk = new z.bl((0,z.Pl)(this.Lb));
};
var RL = function(a) {
  var b = new z.Bg;
  (0,z.Cg)(b, a.Bd.map(function(a) {
    return(0,z.Iw)(a).Cb();
  }));
  a.ib() && (0,z.Dg)(b, (0,z.Cw)(a.Mb));
  b = new z.Ol((new z.Ug).Tl(b));
  NH(b, a.lG.bind(a));
  return b;
};
var TL = function(a, b) {
  (0,z.UL)(a);
  a.ej();
  var c = b ? a.Lb.dm() : a.Lb.gs();
  c && (0,z.VL)(a, c);
};
z.UL = function(a) {
  if (!a.yu) {
    var b = a.Bd.map(function(a) {
      return(0,z.Iw)(a).Cb();
    });
    if ((0,z.Pl)(a.Lb).qc().length != b.length) {
      throw new WL("paragraph count mismatch");
    }
    for (var c = 0;c < b.length;c++) {
      XL(a, b[c], c, !0);
    }
    a.yu = !0;
  }
};
var XL = function(a, b, c, d) {
  var e = (0,z.Pl)(a.Lb).qc()[c];
  if (d && b.getName() != e.getName()) {
    throw new WL("unexpected name change");
  }
  if (!b.Ob(e)) {
    try {
      a.mv = d, (0,z.Ql)(a.Lb, (0,z.yl)(3).nb(c).gg(b));
    } finally {
      a.mv = !1;
    }
    return!0;
  }
  return!1;
};
var YL = function(a, b) {
  (0,z.NI)(a, {rf:!1, isPublished:!1, media:null, sections:b.zs, hi:!1, Ih:!0});
  var c = b.ys && !(0,z.Td)(window.document.body, a), d = a.style.visibility;
  c && (a.style.visibility = "hidden", window.document.body.appendChild(a));
  var e = new z.QL(a, null, b);
  ZL(e);
  c && (window.document.body.removeChild(a), a.style.visibility = d);
  return e;
};
var ZL = function(a) {
  $L(a);
  for (var b = [], c = 0, d = (0,z.aM)(a), c = 0;c < d;c++) {
    b.push((0,z.bM)(a, c).Cb());
  }
  c = b;
  a.ib() && (c = c.concat((0,z.cM)(a)));
  QI(c);
  for (c = 0;c < d;c++) {
    (0,z.bM)(a, c).name = b[c].getName(), (0,z.dM)(a, c);
  }
  if (a.ib()) {
    b = (0,z.cM)(a);
    for (c = 0;c < a.Mb.length;c++) {
      (0,z.eM)(a, b[c].ta());
    }
    AL(a.zh);
  }
  b = a.Lb;
  a = a.getSelection();
  b.iu = b.mc.length;
  b.ej(a);
};
var $L = function(a) {
  var b = (0,z.aM)(a), c = a.fc(0), b = a.fc(b - 1);
  c && !qH((0,z.zw)(c)) || (0,z.fM)(a, 0, new z.lm("", 1, ""));
  b && qH((0,z.zw)(b)) && (0,z.fM)(a, (0,z.aM)(a), new z.lm("", 1, ""));
};
z.gM = function(a) {
  var b = (0,z.Pl)(a.Lb).qc(), c = (0,z.ww)(a.U), d = (0,z.aM)(a);
  if (d != c.length || d != b.length) {
    throw new WL("paragraph count");
  }
  var e;
  for (e = 0;e < d;e++) {
    var f = c[e], h = a.fc(e);
    if (f != h) {
      throw new WL("paragraph element");
    }
    f = (0,z.Iw)(f).Cb();
    if (!b[e].Ob(f)) {
      throw new WL("paragraph model");
    }
  }
  if (a.ib()) {
    e = a.Mb.length;
    b = (0,z.xw)(a.U);
    c = (0,z.Cw)(b);
    d = (0,z.Pl)(a.Lb).gc();
    if (e != c.length || e != d.length) {
      throw new WL("section count");
    }
    for (e = 0;e < c.length;e++) {
      if (b[e] != a.Mb[e]) {
        throw new WL("section element");
      }
      if (!d[e].Ob(c[e])) {
        throw new WL("section model");
      }
    }
  }
};
z.VL = function(a, b) {
  a.pd = b;
  (0,z.hM)(a);
};
var iM = function(a, b, c, d, e, f) {
  (0,z.VL)(a, new z.FL(IL(b, c), IL(d, e), f));
};
z.jM = function(a, b) {
  a.pd = new z.FL(new OL(kM, b, 0), new OL(kM, b, 0), !1);
  (0,z.hM)(a);
};
z.lM = function(a, b) {
  var c = (0,z.mM)(a, b).ta();
  a.pd = new z.FL(PL(c), PL(c), !1);
  (0,z.hM)(a);
};
z.nM = function(a, b) {
  var c = a.pd.start, d = a.pd.end;
  if (!a.pd.isCollapsed()) {
    var e = (0,z.bM)(a, c.V), f = (0,z.bM)(a, d.V);
    oM(a, function(a, b, c) {
      b < c && (0,z.Am)(a, b, c);
    }, a, !1);
    if (e != f) {
      b && e.append(f);
      var h = d.V - c.V - 1;
      b && h++;
      for (var k = 0;k < h;k++) {
        (0,z.pM)(a, c.V + 1);
      }
    }
    (0,z.dM)(a, c.V);
    e == f || b || (0,z.dM)(a, c.V + 1);
    d.V = c.V;
    d.offset = c.offset;
  }
};
var oM = function(a, b, c, d) {
  var e = a.pd.ja(), f = e.end, h = e.start;
  0 === f.offset && f.V > h.V && (f.V--, f.offset = (0,z.bM)(a, f.V).text.length);
  for (var f = e.start.V, h = e.end.V, k = f;k <= h;k++) {
    var l = (0,z.bM)(a, k);
    b.call(c, l, k == f ? e.start.offset : 0, k == h ? e.end.offset : l.text.length);
    d && (0,z.dM)(a, k);
  }
};
z.qM = function(a, b) {
  return(0,z.bb)(a.Bd, b);
};
z.bM = function(a, b) {
  var c = a.cf[b];
  if (!c) {
    var d = a.fc(b);
    d && (c = a.cf[b] = (0,z.Iw)(d, a.hB), XL(a, c.Cb(), b, !0));
  }
  return c;
};
z.aM = function(a) {
  return a.Bd.length;
};
z.rM = function(a, b) {
  var c = (0,z.sw)(b, a.U);
  return c ? (0,z.qM)(a, c) : -1;
};
var SL = function(a, b) {
  if (!b) {
    return GL();
  }
  var c = sM(a, fI(b, !0)), d = sM(a, fI(b, !1));
  return c && d ? new z.FL(c, d, b.xe()) : GL();
};
var sM = function(a, b) {
  var c = (0,z.rM)(a, b.S);
  if (-1 == c) {
    return c = null, a.ib() && ((0,z.ow)(b.S) ? c = b.S : (0,z.pw)(b.S) && (c = b.S.parentNode), c) ? (c = (0,z.mM)(a, (0,z.bb)(a.Mb, c.parentNode)), PL(c.ta())) : null;
  }
  var d = b.S.tagName;
  return "IMG" === d || "IFRAME" === d ? new OL(kM, c, 0) : IL(c, RI(b, a.Bd[c]));
};
z.tM = function(a, b) {
  var c = uM(a, b.Dc()), d = uM(a, (0,z.JL)(b));
  return c && d ? (0,z.Ye)(c.S, c.offset, d.S, d.offset) : null;
};
var uM = function(a, b) {
  var c = a.fc(b.V);
  if (!c) {
    return null;
  }
  if (b.g() === NL) {
    var d = (0,z.vM)(a, b.V);
    if (d && 2 == (0,z.Rg)(d) && (d = (0,z.wM)(a, d), d = a.Mb[d] && (0,z.Za)(a.Mb[d].childNodes, z.ow))) {
      return new YH(d, 0);
    }
  }
  return b.g() === kM && (d = c.querySelector("phantom-iframe, iframe, img")) ? new YH(d, 0) : qJ(b.offset, c);
};
z.dM = function(a, b, c) {
  c = c || (0,z.bM)(a, b);
  (0,z.mm)(c, a.je);
  XL(a, c.Cb(), b, !1) || a.$y((0,z.yl)(3).nb(b).gg(c.Cb()));
};
z.hM = function(a) {
  var b = (0,z.tM)(a, a.pd);
  b && (KL(a.pd) && uJ(b.pb()), b.select(), (0,z.sJ)(b));
};
z.pM = function(a, b) {
  (0,z.UL)(a);
  var c = null;
  6 == OH(a.nk, b) && (c = PH(a.nk, b));
  (0,z.Ql)(a.Lb, (0,z.yl)(2).nb(b));
  null != c && (0,z.jm)(a.Lb, c);
};
z.fM = function(a, b, c, d) {
  (0,z.UL)(a);
  var e = null;
  6 == OH(a.nk, b) && (e = PH(a.nk, b), e.end++);
  (0,z.mm)(c, a.je);
  (0,z.Ql)(a.Lb, (0,z.yl)(1).nb(b).gg(c.Cb()));
  d && a.ib() && 0 < b && (c = (0,z.vM)(a, b + 1), c.ta() === b + 1 && ((0,z.xM)(a, b + 1), (0,z.yM)(a, b, c)));
  null != e && (0,z.jm)(a.Lb, e);
};
var zM = function(a, b) {
  if (6 == OH(a.nk, b)) {
    var c = {};
    (0,z.fl)(a.nk, b, c);
    for (var d in c) {
      var e = a.fc(Number(d)), f = c[d];
      "FIGURE" == e.tagName && ((0,z.Uc)(e, "is-partialWidth", null != f), e.style.width = null == f ? "" : f + "%");
    }
  }
};
var AM = function(a, b, c, d) {
  var e = !1;
  if (1 === b.type && a.ib()) {
    d = (0,z.vM)(a, d), (0,z.BI)(d) && (0,z.BM)(a, d) === d.ta() + 1 && (d = "Continue writing", c.setAttribute("data-default-value", d), b.text || ((0,z.Md)(c, lJ(d), 0), e = !0));
  } else {
    if ((0,z.KH)(b)) {
      c.contentEditable = !1;
      var f = c.querySelector("figcaption");
      if (!f) {
        return;
      }
      d = 4 == b.type ? (0,z.Hm)() : 11 == b.type ? (0,z.Im)() : "";
      if (!d) {
        return;
      }
      f.contentEditable = !0;
      f.setAttribute("data-default-value", d);
      b.text || ((0,z.Md)(f, lJ(d), 0), e = !0);
    }
  }
  d = a.U.getAttribute("data-default-value");
  1 != (0,z.aM)(a) || !d || b.text || 1 != b.type || e || (0,z.Md)(c, lJ(d), 0);
};
z.BM = function(a, b) {
  var c = (0,z.cM)(a), d = c.indexOf(b);
  return b.ta() + (0,z.Yg)(c, d, (0,z.aM)(a));
};
z.yM = function(a, b, c) {
  (0,z.nm)(c, a.je);
  var d = (0,z.vM)(a, b);
  if (d && d.ta() === b) {
    throw Error("Tried to overwrite a section");
  }
  c.Sd(b);
  b = (0,z.cM)(a);
  d = d ? (0,z.bb)(b, d) : -1;
  (0,z.Ql)(a.Lb, (0,z.yl)(8).nb(d + 1).hg(c));
};
z.xM = function(a, b) {
  var c = (0,z.cM)(a), d = (0,z.vM)(a, b);
  if (1 === c.length) {
    throw Error("Cannot remove last section");
  }
  if (d.ta() !== b) {
    throw Error("Section not found at " + b);
  }
  c = (0,z.bb)(c, d);
  (0,z.Ql)(a.Lb, (0,z.yl)(9).nb(c));
};
z.eM = function(a, b, c) {
  var d = (0,z.cM)(a), e = (0,z.vM)(a, b), d = d.indexOf(e);
  if (e.ta() !== b) {
    throw Error("Section not found at " + b);
  }
  c && (c.Sd(e.ta()), e = c);
  (0,z.nm)(e, a.je);
  b = (0,z.Pl)(a.Lb).gc()[d];
  !c && b && b.Ob(e) ? a.az((0,z.yl)(10).nb(d).hg(e)) : (0,z.Ql)(a.Lb, (0,z.yl)(10).nb(d).hg(e));
};
z.vM = function(a, b) {
  return(0,z.Xg)((0,z.cM)(a), b);
};
z.mM = function(a, b) {
  return(0,z.cM)(a)[b];
};
z.wM = function(a, b) {
  var c = (0,z.cM)(a);
  return(0,z.bb)(c, b);
};
z.cM = function(a) {
  a.jh || (a.jh = (0,z.Cw)(a.Mb));
  return a.jh;
};
var WL = function(a) {
  z.Ca.call(this, "Inconsistent model: " + a);
};
z.CM = function() {
};
z.DM = function(a, b) {
  var c = window.iosDispatchEvent;
  c && (0,z.J)("variants.can_use_mobile_editors") ? c("mutate", function() {
    EM(this, b);
    c("mutated");
  }.bind(a)) : EM(a, b);
};
var EM = function(a, b) {
  b.Mn();
  var c = (0,z.FM)(b), d = a.lH.bind(a, b, c);
  GM(b, !0);
  try {
    d.call(void 0);
  } finally {
    b.Ye() && b.bl();
  }
  c.ej();
  (0,z.HM)(b);
  b.dispatchEvent("measure");
};
z.IM = function(a, b) {
  this.og = a;
  this.nc = b;
};
var JM = function(a) {
  var b = a.getSelection();
  if (KL(b) && b.isCollapsed()) {
    var b = b.start.V, c = (0,z.bM)(a, b);
    c && c.ai() && (0,z.jM)(a, b);
  }
};
var LM = function(a, b, c) {
  var d = a.og ? 1 : -1, e = a.og ? b.length : -1;
  c = a.og ? c : c - 1;
  if (1 == a.nc) {
    return d;
  }
  var f = -1;
  if (3 == a.nc) {
    f = a.og ? b.indexOf("\n", c) : b.lastIndexOf("\n", c);
  } else {
    a = !1;
    for (var h = c;0 <= h && h < b.length && -1 == f;h += d) {
      var k = b.charAt(h);
      " " == k || "\n" == k ? a && (f = h) : a = !0;
    }
  }
  return-1 == f ? e - c : f == c ? d : f - c;
};
var MM = function(a, b, c) {
  var d = a.og ? 1 : -1, e = c + d, f = (0,z.bM)(b, c), h = (0,z.bM)(b, e);
  if (h) {
    var k = b.ib(), l = k ? (0,z.vM)(b, c) : null, k = k ? (0,z.vM)(b, e) : null, m = l == k;
    if (!m) {
      var s = (0,z.BI)(l);
      if (!s && !(0,z.BI)(k)) {
        (0,z.xM)(b, (a.og ? k : l).ta());
        return;
      }
      if (s && (0,z.BM)(b, l) == c + 1) {
        a.og || (0,z.lM)(b, (0,z.wM)(b, l));
        return;
      }
    }
    m && (5 == h.type || MH(h.type, h.text)) ? (0,z.pM)(b, e) : MH(f.type, f.text) ? (b.$g(e, a.og ? 0 : h.text.length), (0,z.pM)(b, c)) : m && !(0,z.KH)(f) && (a = b.getSelection(), 0 < d ? (a.start.offset = a.end.offset = f.text.length, f.append(h), (0,z.pM)(b, e), (0,z.dM)(b, c)) : (a.start.offset = a.end.offset = h.text.length, h.append(f), (0,z.pM)(b, c), (0,z.dM)(b, e)));
  }
};
var NM = function(a) {
  this.TG = a;
};
var OM = function(a, b) {
  if (a in b) {
    return "";
  }
  b[a] = !0;
  return a;
};
z.PM = function() {
  z.v.call(this);
  this.qj = new z.tA(this);
  this.HK = this;
};
var QM = function(a, b, c, d) {
  b = a.qj.rb[String(b)];
  if (!b) {
    return!0;
  }
  b = (0,z.fb)(b);
  for (var e = !0, f = 0;f < b.length;++f) {
    var h = b[f];
    if (h && !h.Ql && h.Xk == c) {
      var k = h.Hj, l = h.ul || h.src;
      h.qr && a.hE(h);
      e = !1 !== k.call(l, d) && e;
    }
  }
  return e && !1 != d.AD;
};
var RM = function() {
  z.PM.call(this);
  this.hw = this.gr();
};
z.SM = function() {
  RM.call(this);
  this.sc == z.xB && delete this.nC;
  this.Qr == z.xB && delete this.oC;
  this.Un == z.xB && delete this.rC;
};
var TM = function() {
};
z.UM = function(a, b) {
  var c = new z.CM;
  c.gd = function(c) {
    var e = (0,z.qM)(c, a);
    -1 != e && (b((0,z.bM)(c, e)), (0,z.dM)(c, e), (0,z.hM)(c));
  };
  return c;
};
var VM = function(a) {
  var b = new TM;
  (0,z.ra)(a) ? b.CC = a : b.CC = function(b, d) {
    for (var e = 0, f = 0;f < a.length;f++) {
      e += a[f](b, d), d += e;
    }
    return e;
  };
  return b;
};
var WM = function(a, b) {
  if (".." == a.text.substring(Math.max(0, b - 2), b)) {
    return(0,z.HH)(a, "…", b), (0,z.Am)(a, b - 2, b), -1;
  }
  (0,z.HH)(a, ".", b);
  return 1;
};
var XM = function(a, b) {
  return YM("-", a, b);
};
var ZM = function(a, b) {
  return YM("–", a, b);
};
var YM = function(a, b, c) {
  var d = b.text.charAt(c - 1), e = b.text, e = e.substring(e.lastIndexOf(" ", c) + 1, c);
  (d = d != a) || (d = qL(e) === e);
  if (d) {
    return(0,z.HH)(b, a, c), 1;
  }
  d = b.text.charAt(c - 2);
  if ("\x3c" == d) {
    return(0,z.HH)(b, "←", c), (0,z.Am)(b, c - 2, c), -1;
  }
  (0,z.HH)(b, "—", c);
  (0,z.Am)(b, c - 1, c);
  return 0;
};
var $M = function(a, b) {
  if ("—" == a.text.charAt(b - 1)) {
    return(0,z.HH)(a, "→", b), (0,z.Am)(a, b - 1, b), 0;
  }
  (0,z.HH)(a, "\x3e", b);
  return 1;
};
var aN = function(a, b) {
  if (":" == a.text.charAt(b - 1)) {
    return(0,z.HH)(a, "☺", b), (0,z.Am)(a, b - 1, b), 0;
  }
  (0,z.HH)(a, ")", b);
  return 1;
};
var bN = function(a, b) {
  if (":" == a.text.charAt(b - 1)) {
    return(0,z.HH)(a, "☹", b), (0,z.Am)(a, b - 1, b), 0;
  }
  (0,z.HH)(a, "(", b);
  return 1;
};
var cN = function(a, b) {
  if ("\x3c" == a.text.charAt(b - 1)) {
    return(0,z.HH)(a, "❤", b), (0,z.Am)(a, b - 1, b), 0;
  }
  (0,z.HH)(a, "3", b);
  return 1;
};
z.dN = function(a, b) {
  var c = a.text, d = c.lastIndexOf(" ", b - 1);
  (c = c.substring(d + 1, b)) && qL(c) == c && !JH(a, 3, d + 1, b) && (eN.test(c) || (c = "http://" + c), (0,z.sm)(a, (0,z.wm)(d + 1, b, c, "", "")));
  return 0;
};
var fN = function(a, b) {
  for (var c = a.text, d = b;" " == c[d];) {
    d--;
  }
  var d = c.lastIndexOf(" ", d) + 1, e = c.indexOf(" ", d);
  -1 == e && (e = c.length);
  return{start:d, end:e, text:c.substring(d, e)};
};
var hN = function(a, b) {
  var c = fN(a, b);
  (0,z.um)(a, function(b) {
    (0,z.Kg)(b) <= c.start && (0,z.Lg)(b) >= c.end && "token" == (0,z.A)(b, "rel") && (0,z.IH)(a, (0,z.ym)(3, c.start, c.end));
  });
  c.text && iN.test(c.text) && (0,z.sm)(a, (0,z.wm)(c.start, c.end, "/" + c.text, "", "token"));
  return 0;
};
var jN = function(a) {
  return function(b, c) {
    var d = fN(b, c);
    return d.text && iN.test(d.text) ? ((0,z.Am)(b, d.start, d.end), (0,z.HH)(b, a, d.start), d.start + a.length - c) : 0;
  };
};
var kN = function(a, b) {
  var c = a.text, d = c.charAt(b - 1);
  if (" " == d || " " == d) {
    if ((0,z.J)("useragent.isMobile") && !/[\.!?]/.test(c.charAt(b - 2))) {
      return(0,z.HH)(a, ". ", b), (0,z.Am)(a, b - 1, b), 1;
    }
    if (8 != a.type) {
      return 0;
    }
  }
  if ("-" == d || "–" == d) {
    if (c = c.charAt(b - 2), " " == c || " " == c) {
      (0,z.HH)(a, "—", b), (0,z.Am)(a, b - 1, b);
    }
  }
  (0,z.HH)(a, " ", b);
  return 1;
};
var lN = function(a, b) {
  return mN(!1, a, b);
};
var nN = function(a, b) {
  return mN(!0, a, b);
};
var mN = function(a, b, c) {
  var d = b.text.charAt(c - 1);
  (0,z.HH)(b, oN[d] ? a ? "“" : "‘" : (0,window.isNaN)(d) ? a ? "”" : "’" : a ? '"' : "'", c);
  return 1;
};
var pN = function() {
};
var qN = function(a) {
  this.jo = a;
  this.WC = -1;
};
z.rN = function(a, b, c, d) {
  a = qJ(b, a);
  c = qJ(d, c);
  return a && c && (0,z.Ye)(a.S, a.offset, c.S, c.offset);
};
z.sN = function(a) {
  z.SM.call(this);
  this.Js = a;
  this.zv = !1;
  this.Jc = window.document.createElement("div");
  this.Jc.setAttribute("contenteditable", "true");
  this.Jc.style.position = "absolute";
  this.Jc.style.top = "0px";
  this.Jc.style.left = "-9999px";
  this.Jc.style.width = "100px";
  this.Jc.style.height = "100px";
  this.Jc.tabIndex = -1;
  this.Jc.style.overflow = "hidden";
  window.document.body.appendChild(this.Jc);
  this.ya = [];
};
var tN = function(a, b) {
  a.Js && (b = iL(b));
  (0,z.DM)(new NM(b), a.O);
  (0,z.DM)(new pN, a.O);
  var c = (0,z.tH)();
  c && (c.collapse(!1), c.select());
};
var uN = function(a, b) {
  var c = b.clipboardData;
  if (!c || !c.types || !(0,z.oa)(c.types)) {
    return null;
  }
  if (a.Js && !a.zv) {
    if (-1 !== (0,z.bb)(c.types, "text/html")) {
      return c.getData("text/html");
    }
    if (!(0,z.wB)(c.types, function(a) {
      return-1 !== a.indexOf("plain");
    })) {
      return null;
    }
  }
  return-1 !== (0,z.bb)(c.types, "text/plain") ? (c = b.clipboardData.getData("text/plain"), a.O.Cl() && (c = c.replace(/\n/g, " ")), (0,z.pL)(c)) : null;
};
var vN = function(a, b) {
  this.aJ = a;
  this.mF = b;
};
var wN = function(a) {
  var b = (0,z.tH)();
  return!b.isCollapsed() && !!(0,z.sw)(b.te(), a.ba());
};
z.xN = function(a) {
  z.SM.call(this);
  this.fF = a;
};
var yN = function(a, b) {
  var c = 34 == b, d = 39 == b, e = 45 == b, f = 8211 == b, h = 46 == b, k = 62 == b, l = 40 == b, m = 41 == b, s = 51 == b, x = a.O, L = (0,z.FM)(x), G = L.getSelection().start.V;
  if (8 == (0,z.bM)(L, G).type) {
    if (wN(x)) {
      if (d) {
        return(0,z.DM)(new vN("'", "'"), x), !0;
      }
      if (c) {
        return(0,z.DM)(new vN('"', '"'), x), !0;
      }
      if (l) {
        return(0,z.DM)(new vN("(", ")"), x), !0;
      }
    }
    return!1;
  }
  return c ? (wN(x) ? (0,z.DM)(new vN("“", "”"), x) : (0,z.DM)(VM(nN), x), !0) : d ? (wN(x) ? (0,z.DM)(new vN("‘", "’"), x) : (0,z.DM)(VM(lN), x), !0) : e ? ((0,z.DM)(VM(XM), x), !0) : f ? ((0,z.DM)(VM(ZM), x), !0) : k ? ((0,z.DM)(VM($M), x), !0) : h ? ((0,z.DM)(VM(WM), x), !0) : l && wN(x) ? ((0,z.DM)(new vN("(", ")"), x), !0) : l ? ((0,z.DM)(VM(bN), x), !0) : m ? ((0,z.DM)(VM(aN), x), !0) : s ? ((0,z.DM)(VM(cN), x), !0) : !1;
};
z.zN = function(a, b) {
  if (!(0,z.ra)(a)) {
    if (a && "function" == typeof a.handleEvent) {
      a = (0,z.za)(a.handleEvent, a);
    } else {
      throw Error("Invalid listener argument");
    }
  }
  return 2147483647 < b ? -1 : z.da.setTimeout(a, b || 0);
};
var AN = function(a, b, c) {
  z.v.call(this);
  this.io = a;
  this.Iw = b || 0;
  this.xf = c;
  this.Ov = (0,z.za)(this.cl, this);
};
var BN = function(a) {
  a.Pd() && a.Zc();
};
var CN = function(a, b, c) {
  this.ZB = a;
  this.Ex = b;
  this.aC = this.Jv = !1;
  this.mw = c || {};
};
var DN = function(a) {
  this.JB = a;
};
z.EN = function(a) {
  z.v.call(this);
  this.xf = a;
  this.xb = {};
};
var FN = function(a, b, c, d, e, f) {
  (0,z.na)(c) || (c && (GN[0] = c.toString()), c = GN);
  for (var h = 0;h < c.length;h++) {
    var k = (0,z.iJ)(b, c[h], d || a.handleEvent, e || !1, f || a.xf || a);
    if (!k) {
      break;
    }
    a.xb[k.key] = k;
  }
  return a;
};
var HN = function(a, b) {
  z.PM.call(this);
  this.id = a;
  this.Id = null;
  this.ji = {};
  this.Ej = {};
  for (var c in IN) {
    this.Ej[c] = [];
  }
  this.Xv = "";
  this.bh = {};
  this.bh[JN] = 1;
  this.bh[z.KN] = 1;
  this.Lw = this.Bl = !1;
  this.Ln = new AN(this.SB, LN, this);
  this.cw = {};
  for (var d in MN) {
    this.cw[MN[d]] = 0;
  }
  z.Qe && (this.Yd = new AN(this.zw, NN, this));
  this.pf = new z.EN(this);
  this.pN = [];
  this.Ij = ON;
  this.Nl = (0,z.td)(b || window.document);
  this.kc = this.Nl.ba(this.id);
  this.Iv = this.Nl.Md();
};
var PN = function(a) {
  var b = !(a.ctrlKey || a.metaKey) && a.keyCode in QN;
  return(a.ctrlKey || a.metaKey) && a.keyCode in RN || b;
};
var SN = function(a, b) {
  a.Ij = 2;
  a.oa = b;
  a.Id = (0,z.td)(b);
  a.Bl = !1;
  a.Lw = !1;
  b.setAttribute("g_editable", "true");
  b.setAttribute("role", "textbox");
};
var TN = function(a) {
  a.Ij = ON;
  for (var b in a.ji) {
    var c = a.ji[b];
    c.gr() || c.disable(a);
  }
  a.oa = null;
  a.Id = null;
};
var UN = function(a) {
  a.pf && a.pf.Nj();
  if ((z.WB || z.XB) && a.Fe() && a.HD()) {
    try {
      var b = a.Id.Md();
      b.removeEventListener("keydown", a.Cn, !1);
      b.removeEventListener("touchend", a.Cn, !1);
    } catch (c) {
    }
    delete a.Cn;
  }
  if (z.Re && a.Fe()) {
    try {
      b = a.Id.Md(), b.removeEventListener("focus", a.Mv, !1), b.removeEventListener("blur", a.Lv, !1);
    } catch (d) {
    }
    delete a.Mv;
    delete a.Lv;
  }
  a.Yd && a.Yd.stop();
  a.Ln.stop();
};
var VN = function(a, b) {
  if (9 == b.keyCode && !a.dispatchEvent({type:"beforetab", shiftKey:b.shiftKey, altKey:b.altKey, ctrlKey:b.ctrlKey}) || z.Qe && b.metaKey && (37 == b.keyCode || 39 == b.keyCode)) {
    return b.preventDefault(), !1;
  }
  var c;
  (c = b.charCode) || (c = PN(b) ? !0 : !(!z.Qe || b.ctrlKey || b.metaKey || z.Qe && !b.charCode));
  a.xw = c;
  a.xw && a.Mn();
  return!0;
};
var WN = function(a, b, c) {
  var d = {};
  a = a.ox(8, b || "", d);
  (0,z.uf)(c, d);
  z.w && (0,z.eJ)(c);
  c.innerHTML = a;
};
var XN = function(a, b) {
  if (!b.altKey) {
    var c = z.Li ? b.metaKey : b.ctrlKey;
    if (c || YN[b.keyCode]) {
      var d = b.charCode || b.keyCode;
      17 != d && a.Zn(5, b, String.fromCharCode(d).toLowerCase(), c) && b.preventDefault();
    }
  }
};
var ZN = function(a, b, c) {
  for (var d = a.Ej[7], e = 0;e < d.length;++e) {
    var f = d[e];
    if (f.isEnabled(a) && f.Ng(b) && (c || f.gr())) {
      return f.queryCommandValue(b);
    }
  }
  return c ? null : !1;
};
z.$N = function(a) {
  return(a = a.Id && a.Id.Md()) && (0,z.tH)(a);
};
z.HM = function(a, b, c) {
  if (!aO(a, "selectionchange")) {
    var d = (0,z.$N)(a), d = d && (0,z.VH)(d);
    a.Ow = !!d && (0,z.Td)(a.ba(), d);
    a.dispatchEvent("cvc");
    a.dispatchEvent({type:"selectionchange", $S:b && b.type});
    a.Zn(4, b, c);
  }
};
var GM = function(a, b) {
  b && (a.Yd && BN(a.Yd), a.bh[JN] = 1);
  a.Yd && BN(a.Yd);
  BN(a.Ln);
  a.bh[z.KN] = 1;
};
var bO = function(a, b, c) {
  !b && a.Yd && BN(a.Yd);
  a.bh[JN] = 0;
  a.bh[z.KN] = 0;
  b && a.zw();
  c && a.SB();
};
var aO = function(a, b) {
  return!!a.bh[b] || a.cw[b] && 500 >= (0,z.aj)() - a.cw[b];
};
var cO = function(a) {
  (0,z.Yd)(a.target, "A") && a.preventDefault();
};
z.dO = function(a) {
  if (a.queryCommandValue("usinglorem")) {
    return " ";
  }
  if (!a.Ye()) {
    return a.kc.innerHTML;
  }
  var b = a.ba(), c = b.cloneNode(!1), b = b.innerHTML;
  z.w && b.match(/^\s*<script/i) && (b = " " + b);
  c.innerHTML = b;
  a.VL(11, c);
  return a.ox(10, c.innerHTML);
};
var eO = function(a) {
  z.w && (0,z.tL)(a.Id.Md());
  fO != a.id && a.execCommand("updatelorem");
  if ((z.WB || z.XB) && a.Fe() && a.HD()) {
    var b = a.Id.Md();
    a.Cn = (0,z.za)(b.focus, b);
    b.addEventListener("keydown", a.Cn, !1);
    b.addEventListener("touchend", a.Cn, !1);
  }
  z.Re && a.Fe() ? (a.Mv = (0,z.za)(a.gw, a), a.Lv = (0,z.za)(a.RB, a), b = a.Id.Md(), b.addEventListener("focus", a.Mv, !1), b.addEventListener("blur", a.Lv, !1)) : (z.hC ? (a.addListener("focus", a.TB), a.addListener(z.kC, a.QB)) : a.addListener("focus", a.gw), a.addListener("blur", a.RB, z.Qe));
  z.Qe ? z.cC || !a.Fe() ? a.pf.qa(a.ba(), "DOMSubtreeModified", a.Cw) : (b = a.Id.Jg(), a.pf.qa(b, gO, a.Cw, !0), a.pf.qa(b, "DOMAttrModified", (0,z.za)(a.yL, a, a.Cw), !0)) : (a.addListener(["beforecut", "beforepaste", "drop", "dragend"], a.Mn), a.addListener(["cut", "paste"], yL(a.bl)), a.addListener("drop", a.mC));
  a.addListener(z.ce ? "dragend" : "dragdrop", a.mC);
  a.addListener("keydown", a.Pr);
  a.addListener("keypress", a.pC);
  a.addListener("keyup", a.qC);
  a.vx = new AN(a.CL, 250, a);
  z.gC && a.addListener("click", cO);
  a.addListener("mousedown", a.BL);
  a.Lx ? (a.pf.qa(a.Id.Jg(), "mouseup", a.sC), a.addListener("dragstart", a.zL)) : a.addListener("mouseup", a.sC);
  a.EC();
  bO(a);
  a.dispatchEvent("load");
  for (var c in a.ji) {
    a.ji[c].enable(a);
  }
};
var hO = function(a) {
  if (!(0,z.ha)(a.Mw) && (a.Mw = !1, z.w && a.Fe())) {
    for (var b = a.Nl.Md();b != b.parent;) {
      try {
        b = b.parent;
      } catch (c) {
        break;
      }
    }
    b = b.location;
    a.Mw = "https:" == b.protocol && -1 == b.search.indexOf("nocheckhttps");
  }
  return a.Mw;
};
var iO = function(a) {
  a.nw && ((0,z.wA)(a.nw), a.nw = null);
};
var jO = function(a) {
  a = "padding:0;" + a.kc.style.cssText;
  (0,z.Ea)(a, ";") || (a += ";");
  a += "background-color:white;";
  z.w && (a += "overflow:visible;");
  return{frameBorder:0, style:a};
};
z.kO = function(a) {
  z.SM.call(this);
  this.Ke = a;
};
var lO = function(a) {
  var b = a.O.ba(), c = a.Ke - (0,z.jH)(b).length;
  b.setAttribute("data-chars-remaining", String(c));
  (0,z.Uc)(b, "display-char-count", c <= 0.25 * a.Ke);
};
z.mO = function(a) {
  this.id = a.id;
  this.anchor = a.anchor;
  this.startIndex = Number(a.startIndex);
  this.endIndex = Number(a.endIndex);
  this.content = a.content;
};
var nO = function(a, b) {
  this.Xm = a;
  this.rg = b;
};
z.oO = function(a, b) {
  return b ? a.rg && (0,z.SI)(a.rg, b) || (0,z.SI)(a.Xm, b) : null;
};
var pO = function(a, b, c) {
  function d(a) {
    var d = a.getAttribute("name");
    d && b.call(c, a, d);
  }
  a.rg && mJ(a.rg, d);
  mJ(a.Xm, d);
};
z.qO = function(a, b) {
  return a.rg && (0,z.Td)(a.rg, b) ? a.rg : (0,z.Td)(a.Xm, b) ? a.Xm : null;
};
z.rO = function(a) {
  var b = [];
  a.rg && b.push(a.rg);
  b.push(a.Xm);
  return b;
};
z.sO = function(a, b) {
  var c;
  c = (0,z.qO)(a, b);
  return(c = (0,z.hi)(b, z.OI, c)) && c.getAttribute("name") || null;
};
z.tO = function(a, b) {
  return(0,z.sL)(a, b).y + YI(a, "padding").top;
};
z.uO = function(a, b, c) {
  if (c = (0,z.tw)(c, (0,z.qO)(a, c))) {
    var d = null;
    a = {};
    var e = (0,z.Pc)(b), f;
    for (f = 0;f < e.length;f++) {
      d = e[f], (0,z.Da)(d, "section-") && (a[d] = !1);
    }
    e = (0,z.Pc)(c);
    for (f = 0;f < e.length;f++) {
      d = e[f], (0,z.Da)(d, "section-") && (a[d + "-notes"] = !0);
    }
    (c = c.getAttribute("data-background-color")) && !(0,z.Ea)(c, "Light") && (a["section-image-full-notes"] = !0);
    for (var h in a) {
      (0,z.Uc)(b, h, a[h]);
    }
  }
};
z.vO = function(a, b) {
  z.SM.call(this);
  this.Ke = a;
  this.dy = b;
};
var wO = function(a) {
  a = (0,z.FM)(a.O);
  for (var b = 0, c = 0;c < (0,z.aM)(a);c++) {
    b += (0,z.bM)(a, c).text.length;
  }
  return b;
};
z.xO = function() {
  z.SM.call(this);
};
z.yO = function(a) {
  z.SM.call(this);
  this.vF = a;
};
var zO = function(a, b) {
  return(0,z.hi)(b, function(a) {
    return a.getAttribute && a.getAttribute("data-default-value");
  }, a.O.ba(), !0);
};
var AO = function(a, b) {
  var c = BO(a, b);
  c && rL(c, !0);
  return!!c;
};
var BO = function(a, b) {
  var c = b.getElementsByClassName("default-value")[0];
  return c && zO(a, c) == b ? c : null;
};
var CO = function() {
  z.SM.call(this);
};
var DO = function(a, b) {
  HN.call(this, a, b);
};
var EO = function(a) {
  HN.call(this, a, void 0);
  this.dp = this.mA = this.Zq = !1;
  this.Rm = null;
};
z.FM = function(a) {
  if (a.Rm) {
    var b = a.Rm, c = (0,z.$N)(a);
    b.cf = [];
    b.cf.length = b.Bd.length;
    b.jh = null;
    b.pd = SL(b, c);
    b.yu = !1;
  } else {
    for (var b = a.ba(), c = (0,z.ww)(b), d = 0;d < c.length;d++) {
      (0,z.Sc)(c[d].getElementsByTagName("*"), z.qw);
    }
    a.Rm = new z.QL(b, (0,z.$N)(a), {zs:a.ib(), ys:!1});
  }
  a = a.Rm;
  a.fc(0) || ((0,z.fM)(a, 0, new z.lm("", 1, "")), a.$g(0, 0));
  return a;
};
var FO = function(a) {
  this.Hv = a;
  this.YB = [];
};
z.GO = function(a) {
  if (!a.Yv) {
    var b = a.Dc(), b = (0,z.DI)(b);
    a.Yv = b.tagName && "IMG" == b.tagName ? b.getAttribute("alt") : (0,z.uL)(a.Dc());
  }
  return a.Yv;
};
z.HO = function(a) {
  a = a.Dc();
  if (z.jC) {
    var b;
    b = a.nextSibling;
    b && 3 == b.nodeType && ((0,z.Da)(b.data, " ") || (0,z.Da)(b.data, " ")) || (b = (0,z.td)(a).createTextNode(" "), (0,z.Ld)(b, a));
    aJ(b, 1).select();
  } else {
    rL(a, !1);
  }
};
var IO = function(a) {
  a = new FO(a);
  a.Dc().href = "/";
  return a;
};
var JO = function(a) {
  if (/\s/.test(a) || KO.test(a)) {
    return!1;
  }
  var b = !1;
  /^[^:\/?#.]+:/.test(a) || (a = "http://" + a, b = !0);
  a = (0,z.If)(a);
  if (-1 != (0,z.bb)(["mailto", "aim"], a[1])) {
    return!0;
  }
  var c = a[3];
  if (!c || b && -1 == c.indexOf(".") || /[^\w\d\-\u0100-\uffff.%]/.test(c)) {
    return!1;
  }
  b = a[5];
  return!b || 0 == b.indexOf("/");
};
var LO = function(a) {
  this.RG = a;
};
var MO = function(a, b) {
  this.nc = a;
  this.Uq = b;
};
var NO = function(a, b) {
  this.nc = a;
  this.Uq = b;
};
z.OO = function() {
  z.SM.call(this);
  this.qh = {};
  this.vz = null;
  this.Ru = !1;
};
var PO = function(a) {
  for (var b in a.qh) {
    delete a.qh[b];
  }
};
var QO = function(a) {
  if (!a.Ru) {
    return!0;
  }
  var b = a.vz, c = (0,z.$N)(a.O);
  if (!c || !c.isCollapsed()) {
    return!0;
  }
  c = RO(a, c);
  if (!b || !c) {
    return!0;
  }
  var d;
  d = b.S;
  var e = c.S;
  if ((d = d == e || d.getAttribute("name") && d.getAttribute("name") == e.getAttribute("name")) && c.offset === b.offset) {
    return!1;
  }
  if (!(d && c.offset > b.offset)) {
    return!0;
  }
  b = (0,z.rN)(c.S, b.offset, c.S, c.offset);
  if (!b) {
    return!0;
  }
  b.select();
  for (var f in a.qh) {
    a.qh[f] && a.execCommand(f);
  }
  a = (0,z.tH)();
  if (!a) {
    return!0;
  }
  a.collapse(!1);
  a.select();
  return!0;
};
var RO = function(a, b) {
  var c = a.O.ba(), d = fI(b, !1);
  return(c = (0,z.sw)(d.S, c)) ? new YH(c, RI(d, c)) : null;
};
var SO = function(a) {
  var b = a.O;
  if (a.queryCommandValue("M_3")) {
    (0,z.DM)(new NO(3, !1), b);
  } else {
    var c = String((0,z.ta)({}));
    a = new z.CM;
    var d = !1;
    a.ko = function(a, b, h) {
      h === b || d || ((0,z.sm)(a, (0,z.wm)(b, h, "/", c, "")), d = !0);
    };
    (0,z.DM)(a, b);
    a = b.ba().querySelector('a[title\x3d"' + c + '"]');
    a.removeAttribute("title");
    a = IO(a);
    b.execCommand("link", a);
  }
};
var TO = function() {
  z.SM.call(this);
};
var UO = function(a) {
  z.PM.call(this);
  this.VB = a;
  this.Rw = new z.EN(this);
  this.xf = new z.EN(this);
  VO && this.xf.qa(a, "compositionstart", this.xL).qa(a, "compositionend", this.wL).qa(a, "compositionupdate", this.tC);
  this.xf.qa(a, "textInput", this.DL).qa(a, "text", this.tC).qa(a, "keydown", this.Pr);
};
var WO = function(a, b) {
  z.mA.call(this, a);
  this.reason = b;
};
var XO = function(a, b) {
  a.Vh || (z.ce && !VO && a.Rw.qa(a.VB, "keyup", a.AL), a.Vh = !0, a.dispatchEvent(new WO("startIme", b)));
};
var YO = function(a, b) {
  a.Vh = !1;
  a.Rw.Nj();
  a.dispatchEvent(new WO("endIme", b));
};
var ZO = function(a) {
  switch(a.keyCode) {
    case 16:
    ;
    case 17:
      return!1;
    default:
      return!0;
  }
};
var $O = function() {
  z.SM.call(this);
  this.Cp = null;
};
var aP = function() {
  z.SM.call(this);
  this.jv = {};
  this.vp = {};
};
var bP = function() {
  z.SM.call(this);
  this.ya = [];
};
var cP = function(a) {
  return 3 == a.nodeType ? !1 : (0,z.Qc)(a, "drop-cap");
};
var dP = function(a) {
  var b = a.target;
  return z.ce && "LI" == b.tagName && a.clientX < (0,z.qi)(b).left;
};
var eP = function(a, b, c, d) {
  var e = (0,z.$N)(a.O);
  if (d && !e.Rh() && "LI" === e.Ma().tagName) {
    return!0;
  }
  var f = fI(e, d), e = f.S, h = b.getSelection();
  d = d ? h.start : h.end;
  return null == sM(b, f) ? (f = fP(a, e, c), f || (c = !c, f = fP(a, e, c)), f && (a = (0,z.qM)(b, f), -1 != a && (d.V = a, d.offset = c ? 0 : (0,z.bM)(b, a).text.length)), !0) : (b = (0,z.sw)(e, a.O.ba())) && 1 === d.offset && (0,z.Bw)(b) && (0,z.hi)(e, cP, b) ? (d.offset = c ? 2 : 0, !0) : !1;
};
var fP = function(a, b, c) {
  var d = a.O.ba(), e = null;
  (0,z.vH)(new z.he(b, !c, !0), function(a) {
    if (a === d) {
      throw z.fe;
    }
    if ((0,z.qw)(a)) {
      throw e = a, z.fe;
    }
  }, a);
  return e;
};
var gP = function() {
  z.SM.call(this);
};
var hP = function() {
  z.SM.call(this);
};
z.iP = function(a) {
  z.Kj.call(this);
  var b = a.id;
  b || (b = a.id = "editor_" + (0,z.ta)(a));
  this.fz = b;
  this.dn = [];
  this.LA = new aP;
  this.sa(new TO);
  this.sa(new CO);
  this.sa(new $O);
  this.sa(new bP);
  this.bz = new z.EN(this);
  a = (0,z.Ba)(z.bd, this.bz);
  this.oo || (this.oo = []);
  this.oo.push((0,z.za)(a, void 0));
  this.dp = this.Qi = !1;
};
var jP = function(a) {
  return{rf:!0, isPublished:!0, media:null, sections:a.ib(), hi:!1, Ih:!1};
};
z.kP = function() {
  z.SM.call(this);
};
var lP = function(a, b) {
  for (var c = null, d = a.firstChild;d;d = c) {
    if (c = d.nextSibling, 3 != d.nodeType) {
      if (1 != d.nodeType) {
        (0,z.Nd)(d);
      } else {
        var e = b.De[d.tagName] || b.dw;
        if (!e) {
          throw Error("Missing default tag policy");
        }
        if (e.di) {
          if (e.ye) {
            for (var f = (0,z.pa)(e.ye) ? e.ye : "", f = f && f != d.tagName ? window.document.createElement(f) : null, h = d.attributes.length - 1;0 <= h;h--) {
              var k = d.attributes[h].nodeName, l = d.getAttribute(k);
              (l = RH(e, k, l)) ? (f || d).setAttribute(k, l) : f || d.removeAttribute(k);
            }
            f && ((0,z.Kd)(f, d.childNodes), (0,z.Ld)(f, d), (0,z.Nd)(d), d = f);
            lP(d, e.td);
          } else {
            for (;d.lastChild;) {
              (0,z.Ld)(d.lastChild, d);
            }
            c = d.nextSibling;
            (0,z.Nd)(d);
          }
        } else {
          (0,z.Nd)(d);
        }
      }
    }
  }
};
z.mP = function(a) {
  z.SM.call(this);
  this.Fu = a;
};
z.nP = function(a, b) {
  z.SM.call(this);
  this.UA = this.jf = this.eu = this.zt = !1;
  this.ya = [];
  this.Bz = [];
  this.L = "";
  this.Wr = hN;
  this.Kx = jN;
  this.view = z.nJ;
  this.ea = b;
  this.Lj = null;
  this.ux = a;
  this.Pa = new z.Ij;
  this.F = this.Pa.F.bind(this.Pa);
  this.Ba = this.Pa.Ba.bind(this.Pa);
  this.$u = this.ac = null;
};
var oP = function(a) {
  var b = a.ac.querySelector(".active");
  b && (a.$u && a.$u.cancel(), b = b.getAttribute("data-action-value"), (0,z.DM)(VM([a.Kx(b), a.Wr]), a.O), a.Pa.X("select"));
  pP(a);
};
var qP = function(a, b) {
  if (a.jf) {
    switch(b.keyCode) {
      case 13:
      ;
      case 9:
      ;
      case 27:
        b.preventDefault();
        break;
      case 38:
        b.preventDefault();
        var c = a.ac.querySelector(".active");
        c && (0,z.u)(c, "active");
        (c = c && c.previousSibling) || (c = a.ac.querySelector(".typeahead-item:last-child"));
        (0,z.t)(c, "active");
        break;
      case 40:
        b.preventDefault(), rP(a);
    }
    b.stopPropagation();
  }
};
var rP = function(a) {
  var b = a.ac.querySelector(".active");
  b && (0,z.u)(b, "active");
  (b = b && b.nextSibling) || (b = a.ac.querySelector(".typeahead-item"));
  (0,z.t)(b, "active");
};
var pP = function(a) {
  a.jf && (0,z.Nd)(a.ac);
  a.jf = !1;
};
var sP = function(a, b, c, d, e) {
  z.iP.call(this, b);
  this.ca = a;
  this.sa(new z.yO(c));
  this.sa(new z.sN(!1));
  this.sa(new z.mP(z.AC));
  1E3 <= window.innerWidth && (this.un = new z.nP((0,z.Ln)((0,z.zs)(a.get("app"))), a.get("request")), this.sa(this.un));
  this.sa(new z.kP);
  this.sa(new z.xN(!1));
  this.sa(new z.vO(d, !0));
  this.Qi = !0;
  this.Ke = d;
  this.Dd = a.get("request");
  this.W = a.get("dialog");
  this.pH = e;
  this.H();
};
var tP = function(a) {
  a.Gb(a.Ei);
  a.X("cancel");
};
var uP = function(a, b, c, d) {
  sP.call(this, a, b, "Leave a note", 400, d || null);
  this.Z = c;
};
var vP = function(a, b, c) {
  a.Ls = b;
  a.ey = c;
};
z.wP = function(a, b, c, d) {
  a.Lt = b;
  a.Kt = c;
  a.dz = d;
};
var xP = function(a) {
  return'\x3cdiv class\x3d"notes-marker no-user-select" data-action\x3d"select-anchor" data-action-value\x3d"' + (0,z.P)(a.kr) + '"\x3e' + yP(a) + "\x3c/div\x3e";
};
var yP = function(a) {
  return'\x3cspan class\x3d"notes-marker-icon icons icons-notes"\x3e\x3c/span\x3e' + ("remove" == a.count ? '\x3cspan class\x3d"icons icons-remove"\x3e\x3c/span\x3e' : 0 == a.count ? '\x3cspan class\x3d"notes-marker-nocount"\x3e+\x3c/span\x3e' : '\x3cspan class\x3d"notes-marker-count"\x3e' + (0,z.O)(a.count) + "\x3c/span\x3e");
};
var zP = function(a, b, c) {
  return'\x3cdiv class\x3d"notes-list-fade"\x3e\x3c/div\x3e\x3cdiv class\x3d"notes-list-fade-bottom"\x3e\x3c/div\x3e\x3cdiv class\x3d"notes-container-scroller"\x3e\x3cbutton class\x3d"btn btn-chromeless notes-dismiss" data-action\x3d"dismiss-note"\x3e' + yP({count:"remove"}) + '\x3c/button\x3e\x3cdiv class\x3d"notes-list"\x3e\x3cdiv class\x3d"notes-items"\x3e\x3c/div\x3e\x3cdiv class\x3d"notes-new-note" tabIndex\x3d"-1"\x3e\x3cbutton class\x3d"btn btn-chromeless notes-add"' + (c.isAuthenticated ? 
  'data-action\x3d"start-note"' : (0,z.Jo)({prompt:"Sign in to leave a note"})) + 'title\x3d"Leave a note"\x3e\x3cspan class\x3d"notes-add-icon icons icons-add-circled"\x3e\x3c/span\x3e\x3cspan class\x3d"notes-add-text"\x3eLeave a note for \x3cspan class\x3d"notes-post-creator"\x3e\x3c/span\x3e\x3c/span\x3e\x3cspan class\x3d"notes-add-creator-text"\x3eLeave a note\x3c/span\x3e\x3c/button\x3e' + (c.isAuthenticated ? '\x3cdiv class\x3d"notes-edit notes-edit-mode"\x3e' + (0,z.Ro)({Cr:!0, Pc:"notes-avatar notes-author-icon", 
  user:c.currentUser}, c) + '\x3cdiv class\x3d"notes-author"\x3e' + (0,z.O)(c.currentUser.name) + '\x3c/div\x3e\x3cdiv class\x3d"notes-note-editor notes-editor"\x3e\x3c/div\x3e\x3cdiv class\x3d"notes-foot no-user-select"\x3e\x3cbutton class\x3d"btn btn-chromeless btn-primary notes-no-separator notes-edit-action" data-action\x3d"save-note"\x3eSave\x3c/button\x3e\x3cbutton class\x3d"btn btn-chromeless notes-edit-action" data-action\x3d"cancel-note"\x3eCancel\x3c/button\x3e\x3c/div\x3e\x3cdiv class\x3d"notes-disclaimer"\x3eThis note is only visible to you and the author, unless the author chooses to make it public.\x3c/div\x3e\x3c/div\x3e' : 
  "") + '\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"notes-spacer"\x3e\x26nbsp;\x3c/div\x3e\x3c/div\x3e';
};
var AP = function(a, b, c) {
  var d = a.note.author ? a.note.author.userId : null;
  b = '\x3cdiv class\x3d"notes-note-inner"\x3e\x3cdiv class\x3d"notes-note-main"\x3e' + ('\x3cspan class\x3d"notes-state-border"\x3e\x3c/span\x3e\x3cdiv class\x3d"notes-controls"\x3e' + (a.canAdminister ? '\x3cul class\x3d"notes-state notes-state-dropdown" data-action\x3d"toggle-note-dropdown"\x3e' + ("NEW" == a.note.state ? '\x3cli\x3e\x3cspan class\x3d"icons icons-invisible"\x3e\x3c/span\x3ePrivate\x3cspan class\x3d"icons notes-state-down-icon"\x3e\x3c/span\x3e\x3c/li\x3e\x3cli data-action\x3d"approve-note" data-action-value\x3d"' + 
  (0,z.P)(a.note.noteId) + '"\x3e\x3cspan class\x3d"icons icons-group"\x3e\x3c/span\x3ePublic\x3c/li\x3e' : "PUBLIC" == a.note.state ? '\x3cli\x3e\x3cspan class\x3d"icons icons-group"\x3e\x3c/span\x3ePublic\x3cspan class\x3d"icons notes-state-down-icon"\x3e\x3c/span\x3e\x3c/li\x3e\x3cli data-action\x3d"unapprove-note" data-action-value\x3d"' + (0,z.P)(a.note.noteId) + '"\x3e\x3cspan class\x3d"icons icons-invisible"\x3e\x3c/span\x3ePrivate\x3c/li\x3e' : "") + (a.hx.userId != d ? '\x3cli data-action\x3d"hide-note" data-action-value\x3d"' + 
  (0,z.P)(a.note.noteId) + '"\x3e\x3cspan class\x3d"icons icons-remove"\x3e\x3c/span\x3eDismiss\x3c/li\x3e' : "") + "\x3c/ul\x3e" : "PUBLIC" != a.note.state ? '\x3cul class\x3d"notes-state"\x3e\x3cli data-tooltip\x3d"This note is only visible to you and the author, unless the author chooses to make it public."\x3e\x3cspan class\x3d"icons icons-invisible"\x3e\x3c/span\x3ePrivate\x3c/li\x3e\x3c/ul\x3e' : "") + ("PUBLIC" == a.note.state ? '\x3cbutton data-action\x3d"show-note-permalink" data-action-value\x3d"' + 
  (0,z.P)(a.note.anchor) + "-" + (0,z.P)(a.note.noteId) + '" class\x3d"notes-link icons icons-link" data-tooltip\x3d"Click to update the address bar with this note’s shareable URL"\x3e' : "") + "\x3c/div\x3e" + (0,z.Ro)({hc:"notes-avatar", Pc:"notes-author-icon", user:a.note.author}, c) + '\x3cdiv class\x3d"notes-author"\x3e' + (d ? '\x3ca href\x3d"/@' + (0,z.P)(a.note.author.username) + '" title\x3d"Go to the profile of ' + (0,z.P)(a.note.author.name) + '"\x3e' + (0,z.O)(a.note.author.name) + "\x3c/a\x3e" : 
  "\x3ci\x3eA Deleted User\x3c/i\x3e") + '\x3c/div\x3e\x3cdiv class\x3d"notes-content"\x3e' + (0,z.Jh)(String(a.note.rj).replace(/(\r\n|\r|\n)/g, "\x3cbr\x3e")) + "\x3c/div\x3e" + (c.isAuthenticated ? '\x3cdiv class\x3d"notes-foot no-user-select"\x3e' + (d == c.currentUser.userId ? '\x3cbutton class\x3d"btn btn-chromeless notes-text-action" data-action\x3d"edit-note" data-action-value\x3d"' + (0,z.P)(a.note.noteId) + '"\x3eEdit\x3c/button\x3e\x3cbutton class\x3d"btn btn-chromeless btn-primary notes-no-separator notes-edit-action" data-action\x3d"save-note" data-action-value\x3d"' + 
  (0,z.P)(a.note.noteId) + '"\x3eSave\x3c/button\x3e\x3cbutton class\x3d"btn btn-chromeless notes-edit-action" data-action\x3d"cancel-note" data-action-value\x3d"' + (0,z.P)(a.note.noteId) + '"\x3eCancel\x3c/button\x3e\x3cbutton class\x3d"btn btn-chromeless notes-edit-action" data-action\x3d"delete-note" data-action-value\x3d"' + (0,z.P)(a.note.noteId) + '"\x3eDelete\x3c/button\x3e' : "") + "\x3c/div\x3e" : "") + "\x3c/div\x3e");
  var e = a.note.replies.length, f = Math.max(a.note.replies.length - a.ei, 0);
  if (e) {
    b += '\x3cdiv class\x3d"notes-replies ' + (0 < f ? "notes-replies-hidden" : "") + '"\x3e\x3cdiv class\x3d"notes-replies-inner"\x3e';
    if (0 < f) {
      b += '\x3cbutton data-action\x3d"show-hidden-note-replies" class\x3d"btn btn-chromeless notes-replies-hidden-btn"\x3eView ' + (0,z.O)(f) + " " + (a.ei ? "more" : "") + " " + (1 < f ? "replies" : "reply") + '\x3c/button\x3e\x3cdiv class\x3d"notes-replies-hidden-container"\x3e';
      for (var h = a.note.replies, k = h.length, l = 0;l < k;l++) {
        var m = h[l];
        b += l < f ? BP((0,z.M)(a, {Qd:m}), c) : "";
      }
      b += "\x3c/div\x3e";
    }
    h = a.note.replies;
    k = h.length;
    for (l = 0;l < k;l++) {
      m = h[l], b += l >= f ? BP((0,z.M)(a, {Qd:m}), c) : "";
    }
    b += "\x3c/div\x3e\x3c/div\x3e";
  }
  return b += '\x3cdiv class\x3d"notes-replies-footer"\x3e' + (c.isAuthenticated ? '\x3cdiv class\x3d"notes-reply notes-reply-edit notes-edit-mode"\x3e' + (0,z.Ro)({hc:"notes-avatar", Pc:"notes-author-icon", user:c.currentUser}, c) + '\x3cdiv class\x3d"notes-author"\x3e\x3ca href\x3d"/@' + (0,z.P)(c.currentUser.username) + '" title\x3d"Go to the profile of ' + (0,z.P)(c.currentUser.name) + '"\x3e' + (0,z.O)(c.currentUser.name) + '\x3c/a\x3e\x3c/div\x3e\x3cdiv class\x3d"notes-reply-editor notes-editor"\x3e\x3c/div\x3e\x3cdiv class\x3d"notes-foot no-user-select"\x3e\x3cbutton class\x3d"btn btn-chromeless btn-primary notes-no-separator notes-edit-action" data-action\x3d"save-reply" data-action-value\x3d"' + 
  (0,z.P)(a.note.noteId) + '"\x3eSave\x3c/button\x3e\x3cbutton class\x3d"btn btn-chromeless notes-edit-action" data-action\x3d"cancel-reply" data-action-value\x3d"' + (0,z.P)(a.note.noteId) + '"\x3eCancel\x3c/button\x3e\x3c/div\x3e\x3c/div\x3e' : "") + '\x3cbutton class\x3d"btn btn-chromeless btn-primary notes-link-reply"' + (c.isAuthenticated ? 'data-action\x3d"start-reply" data-action-value\x3d"' + (0,z.P)(a.note.noteId) + '"' : (0,z.Jo)({prompt:"Sign in reply"})) + 'title\x3d"Leave a reply"\x3e' + 
  (e || !a.note.author ? "Reply to conversation" : d == c.currentUser.userId ? "Leave a reply" : "Reply to " + (0,z.O)(a.note.author.name)) + "\x3c/button\x3e\x3c/div\x3e\x3c/div\x3e";
};
var BP = function(a, b) {
  return'\x3cdiv class\x3d"notes-reply"\x3e' + (a.canAdminister && a.Qd.author.userId != b.currentUser.userId ? '\x3cdiv class\x3d"notes-hide-reply" data-action\x3d"hide-reply" data-action-value\x3d"' + (0,z.P)(a.note.noteId) + "," + (0,z.P)(a.Qd.replyId) + '" data-tooltip\x3d"Dismiss this reply"\x3e\x3cspan class\x3d"icons icons-remove"\x3e\x3c/span\x3e\x3c/div\x3e' : "") + (0,z.Ro)({hc:"notes-avatar", Pc:"notes-author-icon", user:a.Qd.author}, b) + '\x3cdiv class\x3d"notes-author"\x3e' + (a.Qd.author ? 
  '\x3ca href\x3d"/@' + (0,z.P)(a.Qd.author.username) + '" title\x3d"Go to the profile of ' + (0,z.P)(a.Qd.author.name) + '"\x3e' + (0,z.O)(a.Qd.author.name) + "\x3c/a\x3e" : "\x3ci\x3eA Deleted User\x3c/i\x3e") + '\x3c/div\x3e\x3cdiv class\x3d"notes-content"\x3e' + (0,z.Jh)(String(a.Qd.rj).replace(/(\r\n|\r|\n)/g, "\x3cbr\x3e")) + "\x3c/div\x3e" + (b.isAuthenticated ? a.Qd.author && a.Qd.author.userId == b.currentUser.userId ? '\x3cdiv class\x3d"notes-foot no-user-select"\x3e\x3cbutton class\x3d"btn btn-chromeless notes-text-action" data-action\x3d"edit-reply" data-action-value\x3d"' + 
  (0,z.P)(a.note.noteId) + "," + (0,z.P)(a.Qd.replyId) + '"\x3eEdit\x3c/button\x3e\x3cbutton class\x3d"btn btn-chromeless btn-primary notes-no-separator notes-edit-action" data-action\x3d"save-reply" data-action-value\x3d"' + (0,z.P)(a.Qd.replyId) + '"\x3eSave\x3c/button\x3e\x3cbutton class\x3d"btn btn-chromeless notes-edit-action" data-action\x3d"cancel-reply" data-action-value\x3d"' + (0,z.P)(a.Qd.replyId) + '"\x3eCancel\x3c/button\x3e\x3cbutton class\x3d"btn btn-chromeless notes-edit-action" data-action\x3d"delete-reply" data-action-value\x3d"' + 
  (0,z.P)(a.Qd.replyId) + '"\x3eDelete\x3c/button\x3e\x3c/div\x3e' : "" : "") + "\x3c/div\x3e";
};
z.CP = function() {
  return'\x3cdiv class\x3d"notes-vote-editor notes-editor"\x3e\x3c/div\x3e\x3cdiv class\x3d"notes-foot no-user-select"\x3e\x3cbutton class\x3d"btn btn-chromeless btn-primary notes-no-separator" data-action\x3d"save-notes-vote"\x3eShare\x3c/button\x3e\x3cbutton class\x3d"btn btn-chromeless" data-action\x3d"cancel-notes-vote"\x3eNo thanks\x3c/button\x3e\x3c/div\x3e';
};
var DP = function(a, b, c) {
  z.Kj.call(this);
  this.ZJ = a;
  this.ia = b;
  this.je = c;
  a = window.document.createElement("div");
  a.className = "notes-markers";
  (0,z.Ld)(a, this.ZJ);
  this.Li = a;
  this.md = {};
  this.bf = this.qk = null;
};
z.EP = function(a, b, c) {
  var d = a.je.get(b);
  if (d) {
    (0,z.Uc)(d, "notes-source-active", c);
    var e = a.md[b];
    e && ((0,z.Uc)(e, "notes-active", c), c = (0,z.yf)(d, "float"), e.style.left = "left" == c ? "0" : -1 * YI(d, "margin").right + "px", a = (0,z.oO)(a.je, b)) && (a = (0,z.xn)(a.className), (0,z.Uc)(e, "notes-source-floated", 2 == a || 4 == a));
  }
};
var FP = function(a) {
  var b = {};
  pO(a.je, function(a, d) {
    d in b || (b[d] = (0,z.tO)(a, this.Li));
  }, a);
  return b;
};
var GP = function(a) {
  var b = FP(a), c = {};
  pO(a.je, function(a, d) {
    if (!c[d]) {
      var h;
      if (this.md[d]) {
        h = this.md[d];
      } else {
        h = (h = (0,z.HP)(this.ia, d)) ? h.count() : 0;
        var k = (0,z.Hd)((0,z.K)(xP, {count:h, kr:d}));
        this.Li.appendChild(k);
        0 < h && ((0,z.t)(a, "notes-source-hasnotes"), (0,z.t)(k, "notes-hasnotes"));
        h = this.md[d] = k;
      }
      h.style.top = b[d] + "px";
      (0,z.EP)(this, d, d == this.ia.wa);
      c[d] = !0;
      (0,z.uO)(this.je, h, a);
    }
  }, a);
  for (var d in a.md) {
    c[d] || ((0,z.Nd)(a.md[d]), delete a.md[d]);
  }
};
z.IP = function(a, b) {
  if (a.ia.Ye()) {
    var c = b || a.ia.wa, d = a.md[c];
    d && (c = (0,z.HP)(a.ia, c).Kb(), d.innerHTML = (0,z.K)(yP, {count:c}), (0,z.Uc)(d, "notes-hasnotes", 0 < c));
  }
};
var JP = function(a, b, c) {
  z.Ij.call(this);
  this.Nz = {};
  this.wp = {};
  this.pA = {};
  this.yg = null;
  this.ca = a;
  this.Dd = a.get("request");
  this.Z = b;
  this.Jm = c;
  this.ym = !1;
  this.me = null;
  this.wa = "";
  this.YC = null;
};
z.HP = function(a, b) {
  var c = a.Nz[b];
  c || (c = a.Nz[b] = new z.ok, a.X("new_note_list", c, a));
  return c;
};
var KP = function(a) {
  var b = (0,z.J)("currentUser.userId");
  return a.iC().find(function(a) {
    a = a.get("author");
    return a == b || (0,z.sa)(a) && a.userId == b ? !0 : !1;
  });
};
var LP = function(a, b) {
  if (!b) {
    return!1;
  }
  var c = b.text;
  if (a.content == c.substring(a.startIndex, a.endIndex)) {
    return!0;
  }
  var d = new RegExp((0,z.Ra)(a.content), "gi"), e = d.exec(c), c = e && d.exec(c);
  return e && !c ? (c = a.endIndex - a.startIndex, a.startIndex = e.index, a.endIndex = e.index + c, a.content = e[0], !0) : !1;
};
var MP = function(a, b, c) {
  var d = (0,z.lk)(b, "id"), e = (0,z.HP)(a, (0,z.lk)(b, "anchor")), f = e ? e.indexOf(b) : -1;
  b.set("state", c);
  "HIDDEN" == c && (0,z.nk)(b);
  var h = e ? e.indexOf(b) : -1;
  return{Ac:a.Dd.put(z.yG.R({postId:a.Z, noteId:d}), {state:c}, {na:!0}), BD:function() {
    -1 == h && (-1 == f ? e.add(b) : e.Fh(b, f));
  }};
};
z.NP = function(a, b, c) {
  this.range = a;
  this.anchor = b;
  this.kr = b.getAttribute("name");
  this.Nd = c;
};
var OP = function(a, b, c, d, e) {
  sP.call(this, a, b, "Leave a reply", 200, d);
  this.Z = c;
  this.Bq = e || null;
};
var PP = function(a) {
  z.v.call(this);
  var b = (0,z.tH)();
  this.pn = b && new QP(fI(b, !0), a);
  this.xt = b && new QP(fI(b, !1), a);
};
var QP = function(a, b) {
  this.Ad = a;
  this.TF = b;
  var c = (0,z.sw)(a.S, b);
  this.gy = (this.Ks = c) && c.getAttribute("name");
  this.Pz = c ? RI(a, c) : -1;
};
var RP = function(a) {
  var b = window.document.body;
  return(0,z.Td)(b, a.Ad.S) ? a.Ad : a.Ks && (0,z.Td)(b, a.Ks) ? qJ(a.Pz, a.Ks) : a.gy && (b = (0,z.SI)(a.TF, a.gy)) ? qJ(a.Pz, b) : null;
};
var SP = function() {
  return "Are you sure you want to delete this note?";
};
var TP = function() {
  return "Your note is too long, do you want to abandon your changes?";
};
z.UP = function(a, b, c, d) {
  z.v.call(this);
  this.Bo = a;
  this.screen = a.get("screen");
  this.Wk = a.get("app");
  this.ds = b;
  this.ds.F("change", this.Yy, this);
  this.Wb = {};
  this.rb = [];
  this.jj = a.get("butter-bar");
  this.al = a.get("dialog");
  this.Gf = c;
  this.Ze = null;
  var e = c.querySelector(".notes-source");
  this.anchors = new nO(e, null);
  var f = LI("div", "layout-single-column notes-position-container");
  (0,z.Md)(this.Gf, f, 0);
  this.gx = f;
  this.Nb = this.wm();
  this.gj = c.querySelector(".body");
  this.ub = this.Nb.querySelector(".notes-list");
  this.$C = this.Nb.querySelector(".notes-spacer");
  this.eg = (0,z.mi)(e);
  this.isAuthenticated = !!(0,z.J)("isAuthenticated");
  this.currentUser = (0,z.J)("currentUser");
  this.postId = (0,z.lk)(b, "id");
  this.canAdminister = d;
  this.Kw = "true" == this.gj.contentEditable;
  this.data = new JP(a, this.postId, this.Kw);
  this.data.F("new_note_list", this.nI, this);
  if (a = a.get("vote-widget")) {
    b = this.data, a.ku = b, a.Pd() && (b = b.load(), (0,z.q)((0,z.Dc)((0,z.iw)(a), b), a.yv, a));
  }
  this.Fc = new DP(this.Nb, this.data, this.anchors);
  this.Fc.H();
  this.Jn = (0,z.q)(this.data.load(), this.Xw, this);
  (0,z.Di)(this.Fc.Li).D("select-anchor", this.ax, this);
  (0,z.Di)(this.Nb).D("show-hidden-note-replies", this.hD, this).D("start-reply", this.HI, this).D("save-reply", this.BI, this).D("edit-reply", this.WH, this).D("cancel-reply", this.DH, this).D("delete-reply", this.PH, this).D("approve-note", this.yH, this).D("unapprove-note", this.QI, this).D("edit-note", this.VH, this).D("save-note", this.AI, this).D("cancel-note", this.CH, this).D("delete-note", this.OH, this).D("hide-note", this.bI, this);
  (0,z.yi)("cancel-notes-vote", this.dA, this).D("save-notes-vote", this.sI, this);
  this.Wk.F("historyUpdate", this.eI, this);
};
var VP = function(a) {
  a.Dj();
  a.jj.H("Recommendation saved.", {type:z.pq});
};
z.WP = function(a, b) {
  var c = KP(a.data), d = c ? (0,z.lk)(c, "noteId") : void 0, e = c && (0,z.lk)(c, "content") || a.data.YC || "";
  (0,z.wL)(b, e);
  a.Ze = new XP(a.Bo, b, a.postId, d);
  a.Ze.F("save", c ? a.rI : a.qI, a);
  a.Ze.F("cancel", a.dA, a);
  return a.Ze;
};
var YP = function(a, b) {
  var c = (0,z.HP)(a.data, b.anchor);
  b.newHighlight && (a.data.wp[b.highlightId] = new z.mO(new z.mO(b.newHighlight)), delete b.newHighlight);
  c.add(b);
  (0,z.ZP)(a, z.gD, (0,z.qk)(c, "id", b.id));
};
var $P = function(a, b) {
  var c = a.data.Pb(b.noteId, b.anchor);
  b.replies = c.get("replies");
  c.ni(b);
  (0,z.ZP)(a, z.hD, c);
};
var aQ = function(a) {
  if (a.bb && a.bb.Dw()) {
    return!0;
  }
  for (var b in a.Wb) {
    if (a.Wb[b].Dw()) {
      return!0;
    }
  }
  return!1;
};
var bQ = function(a) {
  var b = new z.wc, c = a.al.open({title:"Uh oh!", bodyHtml:"You have unsaved notes. Are you sure you want to abandon them?", type:z.YE});
  c ? (c.F(z.ZE, b.Ea.bind(b, !0)), c.F(z.$E, function() {
    this.bC();
    b.cancel();
  }, a)) : b.cancel();
  return b;
};
var cQ = function(a) {
  (0,z.bd)(a.bb);
  a.bb = null;
  for (var b in a.Wb) {
    (0,z.bd)(a.Wb[b]), delete a.Wb[b];
  }
};
var dQ = function(a, b, c) {
  var d = b.get("state"), e = "PUBLIC" == c ? "Note was made public" : "HIDDEN" == c ? "Note was dismissed" : "NEW" == c ? "Note was made private" : "", f = MP(a.data, b, c);
  (0,z.r)((0,z.q)(f.Ac, function() {
    (0,z.q)(this.jj.H(e, {type:z.pq, dm:!0}), function() {
      f.BD();
      dQ(this, b, d);
    }, this);
    (0,z.ZP)(this, z.jD, b, {noteState:c, previousNoteState:d});
  }, a), function() {
    this.jj.H("Could not change note state", "error");
    f.BD();
    dQ(this, b, d);
  }, a);
  return f.Ac;
};
var eQ = function(a, b) {
  var c = b.value;
  return c ? a.Wb[c] : a.bb;
};
var fQ = function(a, b) {
  var c = a.data.Lg(a.anchors.get(b));
  return c ? c.text : "";
};
z.gQ = function(a) {
  return a.data.wa ? !!(0,z.HP)(a.data, a.data.wa).count() : !1;
};
z.hQ = function(a, b) {
  var c = b || a.Pe, d = a.data.Pb(c, a.data.wa), e = a.ub.querySelector('[data-note-id\x3d"' + c + '"]');
  (0,z.t)(e, "notes-show-reply-editor");
  var f = a.Wb["reply_" + c];
  f || (e = e.querySelector(".notes-reply-editor"), f = new OP(a.Bo, e, a.postId, c), f.F("change", a.Mh, a), f.F("cancel", function() {
    f.clear();
  }, a), f.F("save", function(a) {
    f.clear();
    d.add("replies", a);
    (0,z.ZP)(this, z.kD, d, {replyId:a.id});
  }, a), a.Wb["reply_" + c] = f);
  f.focus();
};
z.ZP = function(a, b, c, d) {
  d = d || {};
  d.postId = a.postId;
  d.noteId = (0,z.lk)(c, "id");
  d.noteType = c.get("highlightId") ? "highlight" : "paragraph";
  (0,z.Dk)(b, d);
};
z.iQ = function(a, b, c) {
  var d = (0,z.tH)(), d = d && (0,z.qO)(a.anchors, (0,z.VH)(d)), e = c && d && new PP(d);
  (0,z.q)((0,z.jQ)(a, b && b.anchor || a.data.wa), function() {
    if (b != this.pe) {
      var a = this.pe;
      a && (0,z.kQ)(this, a, !1);
      b && (0,z.kQ)(this, b, !0);
      this.pe = b;
    }
    (a = e && e.restore()) && a.select();
  }, a);
};
z.kQ = function(a, b, c) {
  var d = b.anchor, e = (0,z.oO)(a.anchors, d);
  if (e = a.data.Lg(e)) {
    (0,z.tm)(e, 4);
    if (c) {
      if (!LP(b, e)) {
        return;
      }
      (0,z.sm)(e, (0,z.xm)(b.startIndex, b.endIndex, b.id));
    }
    a.anchors.get(d).innerHTML = (0,z.Ym)(e, z.vg, {rf:!a.Kw, isPublished:!a.ds.get("latestPublishedVersion"), media:null, sections:!0, hi:!1, Ih:!1});
  }
};
z.lQ = function(a, b, c) {
  if (b != a.Pe) {
    c || (0,z.Bs)(a.Wk, "");
    (c = a.ub.querySelector(".notes-active-note")) && (0,z.u)(c, "notes-active-note");
    c = a.Pe = null;
    if (b && a.data.wa) {
      var d = a.data.Pb(b, a.data.wa);
      d && (c = a.ub.querySelector('[data-note-id\x3d"' + b + '"]')) && ((0,z.t)(c, "notes-active-note"), a.Pe = b, b = (0,z.lk)(d, "highlightId"), (0,z.iQ)(a, (b ? a.data.wp[b] || null : null) || null));
    }
    (0,z.Uc)(a.ub, "notes-note-selected", !!c);
  }
};
z.jQ = function(a, b) {
  var c = b != a.data.wa;
  if (c && aQ(a)) {
    return(0,z.q)(bQ(a), function() {
      cQ(this);
      return(0,z.jQ)(this, b);
    }, a);
  }
  a.pe && ((0,z.kQ)(a, a.pe, !1), a.pe = null);
  if (!c) {
    return(0,z.Jc)();
  }
  (0,z.lQ)(a, null);
  a.data.wa && (0,z.EP)(a.Fc, a.data.wa, !1);
  cQ(a);
  (0,z.bd)(a.$f);
  a.$f = null;
  (0,z.t)(a.ub, "notes-hide-editor");
  a.data.wa = b && a.Fc.md[b] ? b : "";
  a.data.wa ? a.yn() : a.bw();
  a.Mh();
  return(0,z.Jc)();
};
z.mQ = function() {
  var a = (window.document.location.hash ? window.document.location.hash.substr(1) : "").split("-"), b = a[1] || null;
  return{CB:a[2] || null, anchor:a[0], Nd:b && {startIndex:Number(a[3]), endIndex:Number(a[4]), id:b}};
};
z.nQ = function(a, b) {
  if (a.isAuthenticated) {
    (0,z.bd)(a.bb);
    var c = a.L(".notes-note-editor"), d = null, e = null;
    if ("string" == typeof b) {
      d = b;
    } else {
      if (b instanceof z.NP) {
        e = b.Nd, d = e.anchor;
      } else {
        throw Error("Missing assoc for note editor");
      }
    }
    c.innerHTML = "";
    a.bb = new uP(a.Bo, c, a.postId);
    vP(a.bb, d, fQ(a, d));
    e && (0,z.wP)(a.bb, e.startIndex, e.endIndex, e.content);
    a.bb.F("change", a.Mh, a);
    a.bb.F("save", a.no, a);
    a.bb.F("cancel", function() {
      (0,z.HP)(this.data, d).count() ? (0,z.t)(this.ub, "notes-hide-editor") : (0,z.jQ)(this, null);
      (0,z.lQ)(this, null);
    }, a);
    (0,z.u)(a.ub, "notes-hide-editor");
  }
};
var XP = function(a, b, c, d) {
  sP.call(this, a, b, "Tell others why you’re recommending this story", 100, d || null);
  this.Z = c;
};
z.oQ = function(a, b) {
  z.iP.call(this, a);
  this.sa(new z.kP);
  this.sa(new z.yO(b));
  this.sa(new z.sN(!1));
  this.sa(new z.mP(z.zC));
  this.sa(new z.xN(!1));
  this.Qi = !0;
};
z.pQ = function(a, b) {
  this.ht = b;
  this.yf = a;
  this.dJ = z.Hl.ja(this.yf);
  this.strategy = "resample";
};
var qQ = function(a, b) {
  var c = {imageId:b.$a()}, d = b.Jd(), e = b.ll();
  if ("object" == typeof a.strategy) {
    d = a.strategy["*"] || a.strategy[d];
    c.strategy = d.type;
    for (var f in d) {
      c[f] = d[f];
    }
  } else {
    c.strategy = a.strategy;
  }
  e && (c.filter = e);
  return c;
};
var rQ = function(a, b, c) {
  a.yf.$l(b).Zl(c);
};
z.sQ = function(a, b, c, d, e) {
  this.Ud = a.get("element-tracker");
  this.ff = a.get("image");
  this.bH = a.get("loading-indicator");
  this.Pa = b;
  this.element = c;
  this.ia = d;
  this.kb = e;
  this.jp = this.element.querySelector("[data-scroll]");
};
var tQ = function(a) {
  for (var b = "full" == a.ia.Jd() ? ["full"] : ["contain", "cover"], c = 0;c < b.length;c++) {
    var d = a.ia.Mr(a.ia.ua().oi(b[c]));
    a.ff.load(d);
  }
};
var uQ = function(a) {
  var b = a.ia.dJ;
  b.$a() ? (a.fe(b.$a()), vQ(a, b.Jd()), rQ(a.ia, b.Ph(), b.nl()), wQ(a, a.ia.Aj())) : a.fe("");
};
var vQ = function(a, b) {
  if (a.ia.$a()) {
    var c = a.ia.Jd();
    a.ia.oi(b);
    var d = a.ia.Aj();
    (0,z.Cc)(a.ff.load(d), function() {
      this.ia.Jd() == b && ((0,z.Uc)(this.element, "layout-single-column", "contain" == b), (0,z.u)(this.element, "background-size-" + c), (0,z.t)(this.element, "background-size-" + b), wQ(this, d));
    }, a);
  }
};
var xQ = function(a) {
  if (a.ia.$a()) {
    var b = a.ia.Aj();
    a.bH.Aa((0,z.Cc)(a.ff.load(b), function() {
      wQ(this, b);
    }, a));
  }
};
var wQ = function(a, b) {
  if (b != a.ia.ht) {
    var c = a.kC();
    a.ia.ht = b || "";
    b ? (a.Bx(c, b), (c = c.parentNode) && "blur-cover" == c.getAttribute("data-scroll") && (c.setAttribute("data-image-url", b), c.setAttribute("data-image-blur-url", a.ia.Aj(!0)))) : (a.Fw(c), rQ(a.ia, 0, 0));
    a.Ud.Pg();
    a.Pa.X(z.yQ);
  }
};
var zQ = function(a, b) {
  z.Kj.call(this);
  this.pa = a;
  this.Mc = b;
};
var AQ = function(a, b) {
  z.v.call(this);
  this.gk = a;
  this.Vq = b;
  this.rv = a;
  this.sq = "";
  this.wv = this.Dg = null;
};
var BQ = function(a, b) {
  a.rv = b;
  return a;
};
var CQ = function(a) {
  a.sq = "pre-transition-picker-image";
  return a;
};
var DQ = function(a, b) {
  z.Ij.call(this);
  this.pa = b;
  this.ia = a;
  this.kb = EQ;
  this.Vs = (0,z.Jc)();
};
var FQ = function(a, b, c, d, e) {
  z.Kj.call(this);
  this.Pa = a;
  this.pa = b;
  this.ia = c;
  this.kb = d;
  this.Hc = e;
};
var GQ = function(a, b) {
  var c = a.pa.querySelector(".picker-content").offsetHeight, d = new AQ(a.pa, "transition-picker-layout");
  a.pa.style.height = a.pa.offsetHeight;
  (0,z.ri)(a.pa);
  d = d.start();
  a.pa.style.height = c + "px";
  (0,z.Wc)(a.pa, "picker-layout-fill", "picker-layout-inline");
  (0,z.Cc)(d, function() {
    this.pa.style.height = "";
  }, a);
  (0,z.Dc)(b, d);
};
var HQ = function(a, b) {
  var c = a.pa.querySelector(".picker-content").offsetHeight, d = new AQ(a.pa, "transition-picker-layout");
  (0,z.Wc)(a.pa, "picker-layout-inline", "picker-layout-fill");
  var e = (0,z.yf)(a.pa, "height");
  (0,z.Wc)(a.pa, "picker-layout-fill", "picker-layout-inline");
  a.pa.style.height = c + "px";
  (0,z.ri)(a.pa);
  c = d.start();
  (0,z.Wc)(a.pa, "picker-layout-inline", "picker-layout-fill");
  a.pa.style.height = e;
  (0,z.Cc)(c, function() {
    this.pa.style.height = "";
  }, a);
  (0,z.Dc)(b, c);
};
var IQ = function(a) {
  this.pa = a;
};
var JQ = function(a, b, c) {
  z.Ij.call(this);
  this.vn = a.get("upload");
  this.Yq = b;
  this.hK = !!c;
  this.Qk = [];
};
var KQ = function(a, b, c, d, e, f) {
  this.ff = a.get("image");
  this.W = a.get("dialog");
  this.Pa = b;
  this.Gk = c.querySelector(".progress-bar");
  this.fn = new IQ(c.querySelector(".upload-feedback-preview"));
  this.ia = d;
  this.Hc = f;
  this.kb = e;
  this.Mc = new JQ(a, function(a) {
    return this.ia.Mr(z.Hl.ja(this.ia.yf).lc(a));
  }.bind(this));
  this.Mc.F("start", this.XI, this);
  this.Mc.F("progress", this.WI, this);
  this.Mc.F("success", this.TI, this);
  this.Mc.F("error", this.UI, this);
  this.Mc.F("abort", this.SI, this);
  this.Mc.F("preview", this.VI, this);
};
var LQ = function(a, b, c, d) {
  z.Kj.call(this);
  this.ca = a;
  this.ia = c;
  this.Hc = d;
  this.pa = b;
};
z.MQ = function(a, b) {
  z.Xn.call(this);
  this.pa = b;
  var c = (0,z.Hw)(b);
  this.ia = this.HB(c || new z.Hg, b.getAttribute("data-url"));
  this.kb = new DQ(this.ia, b);
  this.Hc = this.IB(a, this, b, this.ia, this.kb);
  this.Mc = new KQ(a, this, b, this.ia, this.kb, this.Hc);
  this.Aa(new zQ(b, this.Mc));
  this.Aa(new LQ(a, b, this.ia, this.Hc));
  ((0,z.Qc)(b, "picker-layout-fill") || (0,z.Qc)(b, "picker-layout-inline")) && this.Aa(new FQ(this, b, this.ia, this.kb, this.Hc));
  this.kb.reset();
};
z.NQ = function(a, b, c) {
  this.sv = !!c;
  z.MQ.call(this, a, b);
};
var OQ = function(a, b, c) {
  z.pQ.call(this, a, b);
  this.sv = c;
};
var PQ = function(a, b, c, d, e) {
  z.sQ.call(this, a, b, c, d, e);
};
var zH = /&([^;\s<&]+);?/g;
(0,z.p)(lH, z.v);
lH.prototype.Ic = null;
lH.prototype.C = function() {
  this.Ic && this.Ic.close();
  this.Ic = null;
  this.ma && this.ma.cancel();
  this.ma = null;
  lH.w.C.call(this);
};
lH.prototype.Sg = (0,z.n)(214);
lH.prototype.bq = (0,z.n)(217);
(0,z.p)(mH, z.eB);
z.g = mH.prototype;
z.g.Jf = null;
z.g.C = function() {
  this.ma.Nc || this.ma.cancel();
  hH(this);
  this.ma = null;
  mH.w.C.call(this);
};
z.g.LD = function() {
  this.Ic.F("close", this.HH, this);
  this.Jf = window.document.createElement("iframe");
  this.Jf.setAttribute("style", "position:absolute;top:-9999px;left:-9999px;");
  this.Jf.setAttribute("id", this.lk);
  this.Jf.setAttribute("name", this.lk);
  window.document.body.appendChild(this.Jf);
  (0,z.R)(this.Jf, "load", this.Zm, this);
  this.Ic && (this.Ic.L("form").submit(), (0,z.t)(this.Ic.L(".overlay-dialog"), "uploading-image"));
  return this.ma.zb();
};
z.g.HH = function() {
  this.ma.Nc || this.ma.cancel();
  hH(this);
};
z.g.Zm = function() {
  var a = (0,z.jH)(this.Jf.contentWindow.document.body);
  a && (this.ma.Ea(a), hH(this));
};
(0,z.p)(nH, z.v);
nH.prototype.C = function() {
  this.ma && this.ma.cancel();
  this.ma = null;
  this.Da && (window.document.body.removeChild(this.Da), this.Da = null);
  nH.w.C.call(this);
};
nH.prototype.Sg = (0,z.n)(215);
nH.prototype.Yz = (0,z.n)(216);
z.TH = z.CC;
z.iB.prototype.ro = (0,z.$)(218, function() {
  return(0,z.q)(this.Sg(!0), function(a) {
    return a[0];
  });
});
lH.prototype.bq = (0,z.$)(217, function(a) {
  a.preventDefault();
  a = [new mH(this.ca, this.lk, this.Ic)];
  this.ma.Ea(a);
});
nH.prototype.Yz = (0,z.$)(216, function() {
  if (this.Da && this.Da.files && this.Da.files.length) {
    var a = ((0,z.J)("variants.upload_multiple_files") ? (0,z.fb)(this.Da.files) : [this.Da.files[0]]).map(function(a) {
      return new z.hB(this.ca, a);
    }, this);
    this.ma.Ea(a);
  } else {
    this.ma.cancel();
  }
});
nH.prototype.Sg = (0,z.$)(215, function(a) {
  if (this.Im) {
    throw Error("A picker cannot be used more than once.");
  }
  this.Im = !0;
  (0,z.J)("variants.upload_multiple_files") && !a && (this.Da.multiple = !0);
  window.document.body.appendChild(this.Da);
  (0,z.R)(this.Da, "change", this.Yz, this);
  this.Da.click();
  return this.ma;
});
lH.prototype.Sg = (0,z.$)(214, function() {
  if (this.Im) {
    throw Error("A picker cannot be used more than once.");
  }
  this.Im = !0;
  this.lk = "ie9_upload_frame_" + Math.floor(1E3 * Math.random());
  if (this.Ic = this.W.open({title:"Please choose an image", bodyHtml:rH({rL:this.lk})})) {
    var a = this.Ic.L('input[type\x3d"file"]');
    (0,z.R)(a, "change", this.bq, this);
  } else {
    this.ma.cancel();
  }
  return(0,z.r)(this.ma, function() {
    this.Ic && this.Ic.close();
    this.Ic = null;
  });
});
z.iB.prototype.Sg = (0,z.$)(213, function(a) {
  return(z.GC ? new nH(this.ca) : new lH(this.ca)).Sg(a || !(0,z.J)("variants.upload_multiple_files"));
});
z.tA.prototype.ml = (0,z.$)(212, function(a, b, c, d) {
  a = this.rb[a.toString()];
  var e = -1;
  a && (e = (0,z.vA)(a, b, c, d));
  return-1 < e ? a[e] : null;
});
z.tA.prototype.Nj = (0,z.$)(211, function(a) {
  a = a && a.toString();
  var b = 0, c;
  for (c in this.rb) {
    if (!a || c == a) {
      for (var d = this.rb[c], e = 0;e < d.length;e++) {
        ++b, (0,z.sA)(d[e]);
      }
      delete this.rb[c];
      this.Mo--;
    }
  }
  return b;
});
z.nA.prototype.pw = (0,z.$)(210, function() {
  return this.qf;
});
z.fA.prototype.disable = (0,z.$)(209, function() {
  this.oj && (this.tt && (0,z.$h)(this.tt), this.st && (0,z.$h)(this.st), this.Ef && (0,z.$h)(this.Ef), this.remove(), window.document.body.removeChild(this.N), this.et = "", this.oj = !1);
});
z.kA.prototype.disable = (0,z.$)(208, function() {
  this.oj && (this.remove(), this.Fa.removeChild(this.N), this.Fa = this.N = null, (0,z.$h)(this.Ef));
});
z.Xu.prototype.Aj = (0,z.$)(206, function() {
  return(0,z.A)(this, "url");
});
z.zu.prototype.Pb = (0,z.$)(205, function() {
  return(0,z.A)(this, "note");
});
z.Au.prototype.Pb = (0,z.$)(204, function() {
  return(0,z.A)(this, "note");
});
z.Du.prototype.Pb = (0,z.$)(203, function() {
  return(0,z.A)(this, "note");
});
z.tv.prototype.Pb = (0,z.$)(202, function() {
  return(0,z.A)(this, "note");
});
z.Mt.prototype.Dc = (0,z.$)(190, function() {
  return(0,z.A)(this, "anchor");
});
z.fv.prototype.Dc = (0,z.$)(189, function() {
  return(0,z.A)(this, "anchor");
});
z.gv.prototype.Dc = (0,z.$)(188, function() {
  return(0,z.A)(this, "anchor");
});
z.hv.prototype.Dc = (0,z.$)(187, function() {
  return(0,z.A)(this, "anchor");
});
z.ot.prototype.Ta = (0,z.$)(182, function() {
  return(0,z.A)(this, "noteId");
});
z.pt.prototype.Ta = (0,z.$)(181, function() {
  return(0,z.A)(this, "noteId");
});
z.Mt.prototype.Ta = (0,z.$)(180, function() {
  return(0,z.A)(this, "noteId");
});
z.Nt.prototype.Ta = (0,z.$)(179, function() {
  return(0,z.A)(this, "noteId");
});
z.Ot.prototype.Ta = (0,z.$)(178, function() {
  return(0,z.A)(this, "noteId");
});
z.zu.prototype.Ta = (0,z.$)(177, function() {
  return(0,z.A)(this, "noteId");
});
z.Au.prototype.Ta = (0,z.$)(176, function() {
  return(0,z.A)(this, "noteId");
});
z.Du.prototype.Ta = (0,z.$)(175, function() {
  return(0,z.A)(this, "noteId");
});
z.fv.prototype.Ta = (0,z.$)(174, function() {
  return(0,z.A)(this, "noteId");
});
z.hv.prototype.Ta = (0,z.$)(173, function() {
  return(0,z.A)(this, "noteId");
});
z.iv.prototype.Ta = (0,z.$)(172, function() {
  return(0,z.A)(this, "noteId");
});
z.tv.prototype.Ta = (0,z.$)(171, function() {
  return(0,z.A)(this, "noteId");
});
z.Tp.prototype.getData = (0,z.$)(170, function() {
  return this.ia;
});
z.lz.prototype.getData = (0,z.$)(169, function() {
  return z.lz.w.getData.call(this);
});
z.Dq.prototype.$g = (0,z.$)(168, function(a) {
  this.kt = a;
  (0,z.Eq)(this);
  return this;
});
z.lm.prototype.ai = (0,z.$)(166, function() {
  return 4 == this.type || 11 == this.type;
});
z.Ol.prototype.gs = (0,z.$)(165, function() {
  var a = this.Tu.pop();
  if (!a) {
    return null;
  }
  for (var b = null;a.length;) {
    var c = a.pop(), d = (0,z.zl)(c.delta);
    (0,z.Dl)(d, this.vk);
    d.fj = c.fj;
    d.selection = c.selection;
    d.selection && (b = d.selection);
    this.mc.push(d);
    this.Ai && this.Ai.call(null, z.Hl.ja(d.delta));
  }
  return b;
});
z.Ol.prototype.ej = (0,z.$)(162, function(a) {
  var b = (0,z.Ya)(this.mc);
  b && (b.selection = a.ja());
});
z.Nl.prototype.fe = (0,z.$)(155, function(a) {
  return(0,z.E)(this, "imageId", a);
});
z.gu.prototype.fe = (0,z.$)(154, function(a) {
  return(0,z.E)(this, "imageId", a);
});
z.Xu.prototype.fe = (0,z.$)(153, function(a) {
  return(0,z.E)(this, "imageId", a);
});
z.Yu.prototype.fe = (0,z.$)(152, function(a) {
  return(0,z.E)(this, "imageId", a);
});
z.Jv.prototype.fe = (0,z.$)(151, function(a) {
  return(0,z.E)(this, "imageId", a);
});
z.Jl.prototype.fg = (0,z.$)(145, function(a) {
  return(0,z.E)(this, "coverless", a);
});
z.Pt.prototype.fg = (0,z.$)(144, function(a) {
  return(0,z.E)(this, "coverless", a);
});
z.jv.prototype.fg = (0,z.$)(143, function(a) {
  return(0,z.E)(this, "coverless", a);
});
z.Jl.prototype.Gb = (0,z.$)(133, function(a) {
  return(0,z.E)(this, "content", a);
});
z.Mt.prototype.Gb = (0,z.$)(132, function(a) {
  return(0,z.E)(this, "content", a);
});
z.Nt.prototype.Gb = (0,z.$)(131, function(a) {
  return(0,z.E)(this, "content", a);
});
z.Pt.prototype.Gb = (0,z.$)(130, function(a) {
  return(0,z.E)(this, "content", a);
});
z.St.prototype.Gb = (0,z.$)(129, function(a) {
  return(0,z.E)(this, "content", a);
});
z.fv.prototype.Gb = (0,z.$)(128, function(a) {
  return(0,z.E)(this, "content", a);
});
z.gv.prototype.Gb = (0,z.$)(127, function(a) {
  return(0,z.E)(this, "content", a);
});
z.hv.prototype.Gb = (0,z.$)(126, function(a) {
  return(0,z.E)(this, "content", a);
});
z.iv.prototype.Gb = (0,z.$)(125, function(a) {
  return(0,z.E)(this, "content", a);
});
z.jv.prototype.Gb = (0,z.$)(124, function(a) {
  return(0,z.E)(this, "content", a);
});
z.Jl.prototype.ua = (0,z.$)(123, function() {
  return(0,z.A)(this, "content");
});
z.Mt.prototype.ua = (0,z.$)(122, function() {
  return(0,z.A)(this, "content");
});
z.Nt.prototype.ua = (0,z.$)(121, function() {
  return(0,z.A)(this, "content");
});
z.Pt.prototype.ua = (0,z.$)(120, function() {
  return(0,z.A)(this, "content");
});
z.St.prototype.ua = (0,z.$)(119, function() {
  return(0,z.A)(this, "content");
});
z.fv.prototype.ua = (0,z.$)(118, function() {
  return(0,z.A)(this, "content");
});
z.gv.prototype.ua = (0,z.$)(117, function() {
  return(0,z.A)(this, "content");
});
z.hv.prototype.ua = (0,z.$)(116, function() {
  return(0,z.A)(this, "content");
});
z.iv.prototype.ua = (0,z.$)(115, function() {
  return(0,z.A)(this, "content");
});
z.jv.prototype.ua = (0,z.$)(114, function() {
  return(0,z.A)(this, "content");
});
z.Be.prototype.Pn = (0,z.$)(19, function() {
  var a = this.ra.getClientRects();
  return a.length ? (a = (0,z.Ya)(a), new z.rd(a.right, a.bottom)) : null;
});
z.Se.prototype.Pn = (0,z.$)(18, function() {
  return this.xe() ? (0,z.$e)(this).Rh() : (0,z.$e)(this).Pn();
});
z.Be.prototype.Rh = (0,z.$)(17, function() {
  var a = this.ra.getClientRects();
  return a.length ? new z.rd(a[0].left, a[0].top) : null;
});
z.Se.prototype.Rh = (0,z.$)(16, function() {
  return this.xe() ? (0,z.$e)(this).Pn() : (0,z.$e)(this).Rh();
});
z.ze.prototype.dh = (0,z.$)(9, function(a, b) {
  this.insertNode(a, !0);
  this.insertNode(b, !1);
});
z.Ce.prototype.dh = (0,z.$)(8, function(a, b) {
  var c = (0,z.Cd)((0,z.wd)(this.Ma()));
  if (c = (0,z.tH)(c)) {
    var d = c.Ma(), e = c.pb(), f = c.Qb(), h = c.Ec()
  }
  var k = this.ra.cloneRange(), l = this.ra.cloneRange();
  k.collapse(!1);
  l.collapse(!0);
  k.insertNode(b);
  l.insertNode(a);
  k.detach();
  l.detach();
  if (c) {
    if (3 == d.nodeType) {
      for (;f > d.length;) {
        f -= d.length;
        do {
          d = d.nextSibling;
        } while (d == a || d == b);
      }
    }
    if (3 == e.nodeType) {
      for (;h > e.length;) {
        h -= e.length;
        do {
          e = e.nextSibling;
        } while (e == a || e == b);
      }
    }
    (0,z.Ye)(d, f, e, h).select();
  }
});
z.He.prototype.dh = (0,z.$)(7, function(a, b) {
  var c = this.ra.duplicate(), d = this.ra.duplicate();
  uH(c, a, !0);
  uH(d, b, !1);
  this.Hg();
});
z.Se.prototype.dh = (0,z.$)(6, function(a, b) {
  (0,z.$e)(this).dh(a, b);
  this.Hg();
});
z.ze.prototype.insertNode = (0,z.$)(5, function(a, b) {
  b ? (0,z.wH)(a, this.Ma()) : (0,z.Ld)(a, this.pb());
  return a;
});
z.Ce.prototype.insertNode = (0,z.$)(4, function(a, b) {
  var c = this.ra.cloneRange();
  c.collapse(b);
  c.insertNode(a);
  c.detach();
  return a;
});
z.He.prototype.insertNode = (0,z.$)(3, function(a, b) {
  var c = uH(this.ra.duplicate(), a, b);
  this.Hg();
  return c;
});
z.Se.prototype.insertNode = (0,z.$)(2, function(a, b) {
  var c = (0,z.$e)(this).insertNode(a, b);
  this.Hg();
  return c;
});
z.Xc.prototype.isEnabled = (0,z.$)(0, function() {
  return window.navigator.cookieEnabled;
});
(0,z.p)(iI, z.de);
iI.prototype.next = function() {
  var a = this.XC;
  if (!a) {
    throw z.fe;
  }
  this.XC = this.PM ? a.previousSibling : a.nextSibling;
  return a;
};
(0,z.p)(pI, iI);
var $I = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
(0,z.p)(wI, z.qe);
wI.prototype.vo = function(a) {
  (0,z.Nd)(xI(this, !0));
  (0,z.Nd)(xI(this, !1));
  return a;
};
wI.prototype.xo = function() {
  var a = null, b = xI(this, !this.Yg), c = xI(this, this.Yg);
  if (b && c) {
    var a = b.parentNode, b = (0,z.bb)(a.childNodes, b), d = c.parentNode, c = (0,z.bb)(d.childNodes, c);
    d == a && (this.Yg ? b-- : c--);
    a = (0,z.Ye)(a, b, d, c);
    a = this.vo(a);
    a.select();
  } else {
    this.vo();
  }
  return a;
};
wI.prototype.C = function() {
  this.vo();
  this.Rf = null;
};
(0,z.p)(CI, wI);
CI.prototype.vo = function(a) {
  var b = xI(this, !0), c = xI(this, !1), b = b && c ? (0,z.Xd)(b, c) : b || c;
  CI.w.vo.call(this);
  if (a) {
    return sI(b, a);
  }
  b && (a = (0,z.tH)((0,z.Cd)((0,z.wd)(b))), (a = sI(b, a)) && a.select());
};
PI = {BLOCKQUOTE:!0, PRE:!0, P:!0, H1:!0, H2:!0, H3:!0, FIGURE:!0, LI:!0};
z.QQ = /\s+(?=\s)/g;
z.RQ = /^\s|\s$/g;
XI = /^(.*?)([:;,\.?>\]\)!]+)$/;
(0,z.p)(KI, z.he);
KI.prototype.next = function() {
  do {
    KI.w.next.call(this);
  } while (-1 == this.Sc);
  return this.S;
};
var dJ = {IMG:" ", BR:"\n"}, cJ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1}, SQ = {bP:"layout-single-column", Es:"layout-fill-width", KO:"sectionLayout--outsetGrid"}, kL = [], jL = null, mL = /^<\//, lL = /(<\/?(\w*)([^>]*)>)/gi, TQ = {rf:!1, isPublished:!1, media:null, sections:!0, hi:!1, Ih:!1}, iN = /^[@＠][a-z0-9_]{1,15}$/i;
(0,z.GH)(z.Oq, "common-async");
zL.prototype.fc = function(a) {
  return(0,z.ww)(this.U)[a];
};
z.g = z.FL.prototype;
z.g.Dc = function() {
  return this.Eq ? this.end : this.start;
};
z.g.xe = function() {
  return this.Eq;
};
z.g.collapse = function(a) {
  var b = a ? this.start : this.end;
  a = a ? this.end : this.start;
  a.V = b.V;
  a.offset = b.offset;
};
z.g.isCollapsed = function() {
  return this.start.V == this.end.V && this.start.offset == this.end.offset;
};
z.g.ai = function() {
  return this.isCollapsed() && this.start.nc === kM;
};
z.g.ja = function() {
  return new z.FL(this.start.ja(), this.end.ja(), this.Eq);
};
var LL = 1, kM = 2, NL = 3;
OL.prototype.g = function() {
  return this.nc;
};
OL.prototype.ja = function() {
  return new OL(this.nc, this.V, this.offset);
};
z.g = z.QL.prototype;
z.g.ej = function() {
  this.Lb.ej(this.getSelection());
};
z.g.fl = (0,z.n)(163);
z.g.vl = (0,z.n)(160);
z.g.Hr = function(a) {
  return this.Lb.Hr(a);
};
z.g.dm = function() {
  TL(this, !0);
};
z.g.gs = function() {
  TL(this, !1);
};
z.g.ba = function() {
  return this.U;
};
z.g.getSelection = function() {
  return this.pd;
};
z.g.$g = function(a, b) {
  iM(this, a, b, a, b, !1);
};
z.g.fc = function(a) {
  return this.Bd[a];
};
z.g.$y = function(a) {
  var b = a.Fb(), c = (0,z.pm)(a.Lg()), d = this.cf[b];
  d && d.Ob(c) ? c = d : this.cf[b] = c;
  var d = this.fc(b), e;
  e = (0,z.Hd)((0,z.Sm)(c, z.vg, TQ, void 0));
  (0,z.qw)(e) || (e = void 0 != e.firstElementChild ? e.firstElementChild : (0,z.Pd)(e.firstChild, !0));
  AM(this, c, e, b);
  var f;
  a: {
    f = c;
    if ((4 == f.type || 11 == f.type) && (0,z.zw)(d) == f.type && d.outerHTML.replace(UQ, "") === e.outerHTML.replace(UQ, "")) {
      f = d.querySelector("figcaption");
      var h = e.querySelector("figcaption");
      if (f && h) {
        rI(h, f);
        f = !0;
        break a;
      }
    }
    f = !1;
  }
  if (!f) {
    if (4 == c.type && 4 == (0,z.Iw)(d, this.hB).type) {
      f = d.getElementsByTagName("img")[0].src;
      var h = e.getElementsByTagName("img")[0], k = h.src;
      f && k != f && (k && h.setAttribute("data-delayed-src", k), h.src = f);
    }
    e.tagName == d.tagName || "LI" != e.tagName && "LI" != d.tagName ? rI(e, d) : "LI" == e.tagName ? (c = window.document.createElement(10 == c.type ? "OL" : "UL"), c.appendChild(e), rI(c, d), oJ(c)) : (c = d.parentNode, f = pJ(c, d), (0,z.Ld)(e, c), (0,z.Nd)(d), c.childNodes.length || (0,z.Nd)(c), f.childNodes.length || (0,z.Nd)(f));
    "LI" === e.tagName && (e.parentNode.className = "post-list");
    this.Bd[b] = e;
    if (this.ib()) {
      d = this.zh;
      a = a.Fb();
      c = CL(d, a);
      e = (0,z.ww)(c);
      var l;
      a: {
        for (l in SQ) {
          if (f = SQ[l], (0,z.Qc)(c, f)) {
            l = f;
            break a;
          }
        }
        l = null;
      }
      e = e[0] == d.fc(a);
      if (d.Mf.Vf(a) != l || (0,z.Gm)(d.Mf, a) != e) {
        l = CL(d, a), e = CL(d, a + 1), c = d.fc(a), c = "LI" === c.tagName ? c.parentNode : c, (0,z.Gm)(d.Mf, a) ? e && !(0,z.Gm)(d.Mf, a + 1) ? (0,z.Md)(e, c, 0) : (0,z.Md)(EL(d, a), c, 0) : CL(d, a - 1).appendChild(c), (0,z.ww)(l).length || AL(d);
      }
    }
    zM(this, b);
  }
};
z.g.lG = function(a) {
  var b = VQ[a.g()];
  this.mv || b.call(this, a);
};
z.g.JG = function(a) {
  var b = a.Fb(), c = this.Bd[b];
  if (this.ib()) {
    var d = (0,z.tw)(c, this.U);
    d && 1 === (0,z.ww)(d).length && 1 < this.Mb.length ? ((0,z.Nd)(d), a = this.Mb.indexOf(d), this.Mb.splice(a, 1)) : (d = this.zh, a = a.Fb(), (a = CL(d, a)) && 1 === (0,z.ww)(a).length && (0,z.Nd)(a));
    this.jh = null;
  }
  "LI" == c.tagName && c.parentNode && 1 == (0,z.ww)(c.parentNode).length ? (0,z.Nd)(c.parentNode) : (0,z.Nd)(c);
  this.Bd.splice(b, 1);
  this.cf.splice(b, 1);
  (c = this.Bd[b]) && "LI" === c.tagName && oJ(c.parentNode);
  this.ib() && AL(this.zh);
  c = this.pd.start;
  c.V >= b && (c.V = Math.max(c.V - 1, 0));
  c = this.pd.end;
  c.V >= b && (c.V = Math.max(c.V - 1, 0));
  zM(this, b);
};
z.g.qG = function(a) {
  var b = a.Fb(), c = (0,z.pm)(a.Lg());
  this.cf.splice(b, 0, c);
  var d = 0 === b ? null : this.Bd[b - 1];
  d && "LI" == d.tagName && (null != (void 0 != d.nextElementSibling ? d.nextElementSibling : (0,z.Pd)(d.nextSibling, !0)) && pJ(d.parentNode, d), d = d.parentNode);
  var e = (0,z.Hd)((0,z.Sm)(c, z.vg, TQ, void 0)), f = null;
  if (this.ib()) {
    0 === (0,z.cM)(this).length && (0,z.yM)(this, 0, new z.Ng);
    f = this.zh;
    a = a.Fb();
    if ((0,z.Gm)(f.Mf, a)) {
      var h = CL(f, a), f = !h || (0,z.Gm)(f.Mf, a + 1) ? EL(f, a) : h
    } else {
      f = null;
    }
    f && (d = null);
  }
  if (d) {
    (0,z.Ld)(e, d);
  } else {
    if (this.ib()) {
      if (!f) {
        throw Error("Cannot insert paragraph into a malformed section.");
      }
      (0,z.Md)(f, e, 0);
    } else {
      (0,z.Md)(this.U, e, 0);
    }
  }
  d = e;
  (0,z.si)(e) && (d = e.firstChild, oJ(e));
  this.Bd.splice(b, 0, d);
  AM(this, c, e, b);
  c = this.pd.start;
  c.V >= b && c.V++;
  c = this.pd.end;
  c.V >= b && c.V++;
  this.jh = null;
  zM(this, b);
};
var UQ = /<figcaption.*?<\/figcaption>/;
z.QL.prototype.ib = function() {
  return this.Zq;
};
z.QL.prototype.rG = function(a) {
  var b = a.Fb(), c = a.Wf();
  this.jh = null;
  c = jJ(c);
  this.Mb.splice(b, 0, c);
  b = this.Mb[b - 1];
  this.U.insertBefore(c, b && b.nextSibling);
  var b = this.zh, d = a.Fb(), e = a.Wf().ta(), c = BL(b, d - 1);
  a = BL(b, d);
  c && (DL(b, e - 1), b = CL(b, e), c = (0,z.yw)(c), b = c.slice(c.indexOf(b)), (0,z.Kd)(a, b));
};
z.QL.prototype.KG = function(a) {
  var b = a.Fb(), c = this.zh;
  a = a.Fb();
  var d = BL(c, a), e = 0 === a ? BL(c, 1) : BL(c, a - 1), d = (0,z.yw)(d), f = (0,z.yw)(e);
  if (0 === a && f.length) {
    for (;d.length;) {
      (0,z.wH)(d.shift(), f[0]);
    }
  } else {
    (0,z.Kd)(e, d);
  }
  AL(c);
  this.jh = null;
  c = this.Mb[b];
  this.Mb.splice(b, 1);
  (0,z.Nd)(c);
};
z.QL.prototype.az = function(a) {
  var b = a.Fb(), c = a.Wf(), d = (0,z.cM)(this), e = d[b];
  e && e.Ob(c) ? c = e : d[b] = c;
  c = jJ(c);
  d = this.Mb[b];
  e = this.zh;
  a = a.Fb();
  a = BL(e, a);
  a = (0,z.yw)(a);
  (0,z.Kd)(c, a);
  rI(c, d);
  this.Mb[b] = c;
};
var VQ = {1:z.QL.prototype.qG, 2:z.QL.prototype.JG, 3:z.QL.prototype.$y, 8:z.QL.prototype.rG, 9:z.QL.prototype.KG, 10:z.QL.prototype.az};
(0,z.p)(WL, z.Ca);
z.CM.prototype.lH = function(a, b) {
  this.gd(b);
  $L(b);
};
z.CM.prototype.ko = z.fa;
z.CM.prototype.gd = function(a) {
  oM(a, function(a, c, d) {
    this.ko(a, c, d);
  }, this, !0);
  (0,z.hM)(a);
};
(0,z.p)(z.IM, z.CM);
z.IM.prototype.gd = function(a) {
  var b = a.getSelection();
  if ((0,z.ML)(b)) {
    var c = (0,z.vM)(a, b.start.V);
    (0,z.eM)(a, b.start.V, (new z.Ng).Xa(c.getName()));
  } else {
    if (b.ai()) {
      (0,z.pM)(a, b.start.V);
    } else {
      if (b.isCollapsed()) {
        var d = b.start, c = d.offset, d = d.V, e = (0,z.bM)(a, d);
        if (this.og) {
          c < e.text.length ? ((0,z.Am)(e, c, c + LM(this, e.text, c)), (0,z.dM)(a, d)) : (MM(this, a, d), JM(a));
        } else {
          if (0 < c) {
            var f = LM(this, e.text, c);
            (0,z.Am)(e, c + f, c);
            b.start.offset = b.end.offset = c + f;
            (0,z.dM)(a, d);
          } else {
            10 == e.type || 9 == e.type ? (e.type = 1, (0,z.dM)(a, d)) : (MM(this, a, d), JM(a));
          }
        }
      } else {
        (0,z.nM)(a, !0);
      }
    }
  }
  c = a.getSelection();
  KL(c) && c.isCollapsed() && (b = c.start.V, c = c.start.offset, d = (0,z.bM)(a, b)) && (e = d.text.charAt(c - 1), e == d.text.charAt(c) && " " == e && ((0,z.Am)(d, c, c + 1), (0,z.dM)(a, b)));
  (0,z.hM)(a);
};
(0,z.p)(NM, z.CM);
NM.prototype.WL = function(a) {
  return a.id ? (0,z.Da)(a.id, "internal-source-marker_") || (0,z.Da)(a.id, "docs-internal-guid") : !1;
};
NM.prototype.gd = function(a) {
  var b = a.ib(), c = window.document.createElement("div");
  c.innerHTML = this.TG;
  vJ(c, this.WL.bind(this));
  var d = YL(c, {zs:b, ys:!0});
  if ((0,z.aM)(d)) {
    c = (0,z.bM)(a, a.getSelection().end.V).name;
    (0,z.nM)(a, !0);
    for (var e = a.getSelection().start, f = (0,z.bM)(a, e.V), h = f.split(e.offset), k = d.ib(), l = 0, m = null, s = !1;m = (0,z.bM)(d, l);) {
      var x = 5 == m.type;
      (0,z.LH)(m) && (m.type = 1, (0,z.dM)(d, l));
      MH(m.type, m.text) || k && x ? ((0,z.pM)(d, l), s = s || x) : (k && s && (m = (0,z.vM)(d, l), l != m.ta() && (0,z.yM)(d, l, new z.Ng)), s = !1, l++);
    }
    k = a.ib();
    l = {};
    m = 0;
    s = (0,z.aM)(a);
    for (m = 0;m < s;m++) {
      l[(0,z.bM)(a, m).name] = !0, k && (l[(0,z.vM)(a, m).getName()] = !0);
    }
    s = (0,z.aM)(d);
    for (m = 0;m < s;m++) {
      x = (0,z.bM)(d, m), x.name = OM(x.name, l), k && (x = (0,z.vM)(d, m), x.ta() == m && x.Xa(OM(x.getName(), l)));
    }
    for (m = 0;m < s;m++) {
      (0,z.mm)((0,z.bM)(d, m), l), (0,z.dM)(d, m), k && (x = (0,z.vM)(d, m), x.ta() == m && ((0,z.nm)(x, l), (0,z.eM)(d, m)));
    }
    l = (0,z.KH)((0,z.bM)(d, 0)) ? null : (0,z.bM)(d, 0);
    k = b && (0,z.vM)(d, 0).getName();
    l && (f.append(l.ja()), (0,z.pM)(d, 0));
    (0,z.dM)(a, e.V);
    l = (0,z.aM)(d);
    for (m = 0;m < l;m++) {
      s = e.V + m + 1, (0,z.fM)(a, s, (0,z.bM)(d, m).ja()), b && (x = (0,z.vM)(d, m), m == x.ta() && s != (0,z.vM)(a, s).ta() && x.getName() != k && (0,z.yM)(a, s, z.Hl.ja(x)));
    }
    b = e.V + l;
    d = (0,z.bM)(a, e.V + l);
    d.append(h);
    f != d && c != f.name && (d.name = c);
    (0,z.dM)(a, b);
    iM(a, e.V, e.offset, b, d.text.length - h.text.length, !1);
  }
};
(0,z.p)(z.PM, z.v);
z.PM.prototype[z.pA] = !0;
z.g = z.PM.prototype;
z.g.as = null;
z.g.rs = (0,z.n)(219);
z.g.addEventListener = function(a, b, c, d) {
  (0,z.iJ)(this, a, b, c, d);
};
z.g.removeEventListener = function(a, b, c, d) {
  (0,z.hJ)(this, a, b, c, d);
};
z.g.dispatchEvent = function(a) {
  var b, c = this.as;
  if (c) {
    for (b = [];c;c = c.as) {
      b.push(c);
    }
  }
  var c = this.HK, d = a.type || a;
  if ((0,z.pa)(a)) {
    a = new z.mA(a, c);
  } else {
    if (a instanceof z.mA) {
      a.target = a.target || c;
    } else {
      var e = a;
      a = new z.mA(d, c);
      (0,z.Cb)(a, e);
    }
  }
  var e = !0, f;
  if (b) {
    for (var h = b.length - 1;!a.Kj && 0 <= h;h--) {
      f = a.currentTarget = b[h], e = QM(f, d, !0, a) && e;
    }
  }
  a.Kj || (f = a.currentTarget = c, e = QM(f, d, !0, a) && e, a.Kj || (e = QM(f, d, !1, a) && e));
  if (b) {
    for (h = 0;!a.Kj && h < b.length;h++) {
      f = a.currentTarget = b[h], e = QM(f, d, !1, a) && e;
    }
  }
  return e;
};
z.g.C = function() {
  z.PM.w.C.call(this);
  this.qj && this.qj.Nj(void 0);
  this.as = null;
};
z.g.qa = function(a, b, c, d) {
  return this.qj.add(String(a), b, !1, c, d);
};
z.g.Ee = function(a, b, c, d) {
  return this.qj.remove(String(a), b, c, d);
};
z.g.hE = function(a) {
  return(0,z.uA)(this.qj, a);
};
z.g.ml = function(a, b, c, d) {
  return this.qj.ml(String(a), b, c, d);
};
(0,z.p)(RM, z.PM);
z.g = RM.prototype;
z.g.O = null;
z.g.LK = !0;
z.g.enable = function(a) {
  this.O == a && (this.hw = !0);
};
z.g.disable = function(a) {
  this.O == a && (this.hw = !1);
};
z.g.isEnabled = function(a) {
  return this.O == a ? this.hw : !1;
};
z.g.gr = z.xB;
z.g.ZL = z.xB;
z.g.C = function() {
  this.O && this.O && (this.disable(this.O), this.O = null);
  RM.w.C.call(this);
};
var IN = (0,z.Bb)({nC:1, oC:2, Bw:3, tl:4, rC:5, execCommand:6, queryCommandValue:7, sD:8, mQ:10, Uv:11}), WQ = (0,z.Gb)(8, 10, 11);
RM.prototype.execCommand = function(a, b) {
  var c = this.ZL(a);
  c || (z.Qe && GM(this.O, !0), this.O.Mn());
  try {
    var d = this.gL.apply(this, arguments);
  } finally {
    c || (this.O.bl(), (0,z.HM)(this.O));
  }
  return d;
};
RM.prototype.Ng = function() {
  return!1;
};
(0,z.p)(z.SM, RM);
z.g = z.SM.prototype;
z.g.nC = function(a) {
  try {
    return this.sc(a);
  } catch (b) {
    throw a.preventDefault(), b.message = (b.message || "") + " keyCode " + a.keyCode, b;
  }
};
z.g.sc = z.xB;
z.g.oC = function(a) {
  try {
    return this.Qr(a);
  } catch (b) {
    throw a.preventDefault(), b.message = (b.message || "") + " keyCode " + a.keyCode, b;
  }
};
z.g.Qr = z.xB;
z.g.rC = function(a, b, c) {
  try {
    return this.Un(a, b, c);
  } catch (d) {
    throw a.preventDefault(), d.message = (d.message || "") + " key " + b, d;
  }
};
z.g.Un = z.xB;
(0,z.p)(TM, z.CM);
TM.prototype.gd = function(a) {
  (0,z.nM)(a, !0);
  var b = a.getSelection(), c = this.CC((0,z.bM)(a, b.start.V), b.start.offset);
  b.start.offset += c;
  b.end.offset += c;
  (0,z.dM)(a, b.start.V);
  (0,z.hM)(a);
};
var eN = /^(https?|ftp):\/\//, oN = (0,z.Gb)("", "(", "[", "{", " ", " ", "\n");
(0,z.p)(pN, z.CM);
pN.prototype.gd = function(a) {
  var b = a.getSelection(), c = b.start.V, d = b.end.V;
  if (8 != (0,z.bM)(a, c).type) {
    var e = b.start.offset, f = (0,z.aM)(a) - b.end.V, b = (0,z.bM)(a, d).text.length - b.end.offset;
    oM(a, this.sM, this, !0);
    d = (0,z.aM)(a) - f;
    iM(a, c, e, d, (0,z.bM)(a, d).text.length - b, !1);
    for (var d = a.getSelection(), h = d.start.V, k = d.end.V, l = d.end.offset, m = (0,z.aM)(a) - k, s = (0,z.bM)(a, k).text.length - l, x = h;x <= k;x++) {
      for (var L = (0,z.bM)(a, x), G = x == k ? l : L.text.length, Aa = x == h ? d.start.offset : 0;Aa < G;Aa++) {
        "\n" == L.text.charAt(Aa) && "\n" == L.text.charAt(Aa + 1) && ((0,z.Am)(L, Aa, Aa + 2), (0,z.dM)(a, x), (new z.XQ(!1)).DC(a, (0,z.HL)(x, Aa)), L = (0,z.bM)(a, x), k = (0,z.aM)(a) - m, l = (0,z.bM)(a, k).text.length - s, G = x == k ? l : L.text.length, Aa--);
      }
    }
    d = (0,z.aM)(a) - f;
    iM(a, c, e, d, (0,z.bM)(a, d).text.length - b, !1);
  }
};
qN.prototype.search = function(a, b) {
  var c = this.jo.text.substring(a, b), d = qL(c);
  this.WC = d ? a + c.indexOf(d) : -1;
};
pN.prototype.sM = function(a, b, c) {
  var d = new qN(a);
  d.search(b, c);
  for (var e = b;e < c;e++) {
    var f = a.text.charAt(e), h = 0;
    if (e == d.WC) {
      for (;e < c && " " != a.text.charAt(e) && "\n" != a.text.charAt(e);) {
        e++;
      }
      (0,z.dN)(a, e);
      d.search(e, c);
    } else {
      " " == f ? ((0,z.Am)(a, e, e + 1), h = kN(a, e) - 1) : "-" == f && 1 <= e - b ? ((0,z.Am)(a, e, e + 1), h = XM(a, e) - 1) : "–" == f && 1 <= e - b ? ((0,z.Am)(a, e, e + 1), h = ZM(a, e) - 1) : "\x3e" == f && 1 <= e - b ? ((0,z.Am)(a, e, e + 1), h = $M(a, e) - 1) : "." == f && 2 <= e - b ? ((0,z.Am)(a, e, e + 1), h = WM(a, e) - 1) : "'" == f ? ((0,z.Am)(a, e, e + 1), h = lN(a, e) - 1) : '"' == f ? ((0,z.Am)(a, e, e + 1), h = nN(a, e) - 1) : "(" == f && 1 <= e - b ? ((0,z.Am)(a, e, e + 1), h = 
      bN(a, e) - 1) : ")" == f && 1 <= e - b ? ((0,z.Am)(a, e, e + 1), h = aN(a, e) - 1) : "3" == f && 1 <= e - b && ((0,z.Am)(a, e, e + 1), h = cN(a, e) - 1), e += h, c += h;
    }
  }
  (0,z.dN)(a, c);
};
(0,z.p)(z.sN, z.SM);
z.g = z.sN.prototype;
z.g.hb = (0,z.Tb)("PastePlugin");
z.g.enable = function(a) {
  z.sN.w.enable.call(this, a);
  a = a.ba();
  this.ya.push((0,z.R)(a, "paste", this.CG, this), (0,z.R)(a, "copy", this.Wy, this), (0,z.R)(a, "cut", this.Wy, this));
};
z.g.disable = function(a) {
  z.sN.w.disable.call(this, a);
  (0,z.$h)(this.ya);
  this.ya.length = 0;
};
z.g.C = function() {
  window.document.body.removeChild(this.Jc);
  this.Jc = null;
  z.sN.w.C.call(this);
};
z.g.sc = function(a) {
  if (86 == a.keyCode && a.shiftKey && (a.metaKey || a.ctrlKey)) {
    this.zv = !0;
    var b = this;
    (0,window.setTimeout)(function() {
      b.zv = !1;
    }, 0);
  }
  return!1;
};
z.g.Wy = function(a) {
  var b = this.O;
  if ((0,z.$N)(b) && a.clipboardData && a.clipboardData.setData) {
    var c;
    a: {
      c = (0,z.FM)(b);
      var d = c.pd, e = null;
      if ((0,z.ML)(d)) {
        c = "";
      } else {
        if (d.ai()) {
          e = [(0,z.bM)(c, d.start.V).Cb()], e = (0,z.Dg)((0,z.Cg)(new z.Bg, e), []);
        } else {
          if (d.isCollapsed()) {
            c = "";
            break a;
          }
          for (var e = (0,z.Dg)((0,z.Cg)(new z.Bg, []), []), f = d.start.V;f <= d.end.V;f++) {
            var h = (0,z.bM)(c, f).ja();
            f === d.end.V && d.end.offset < h.text.length && h.split(d.end.offset);
            f === d.start.V && 0 < d.start.offset && (h = h.split(d.start.offset));
            (0,z.KH)(h) && (h.type = 1);
            e.qc().push(h.Cb());
            c.ib() && (h = (0,z.vM)(c, f), h.ta() === f && f !== d.start.V && (h = (new z.Ng).Xa(h.getName()), e.gc().push((new z.Ng).Xa(h.getName()).Sd(e.qc().length - 1))));
          }
        }
        d = !1;
        c.ib() && 0 < e.gc().length && (d = !0);
        c = (0,z.Mm)(e, z.vg, {rf:!0, isPublished:!0, media:{}, sections:d, hi:!1, Ih:!0});
      }
    }
    c && (a.clipboardData.setData("text/html", c), (c = (0,z.nL)(c)) && a.clipboardData.setData("text/plain", c), "cut" === a.type && (0,z.DM)(new z.IM(!0, 1), b), a.preventDefault());
  }
};
z.g.CG = function(a) {
  var b = uN(this, a);
  if (null !== b) {
    a.preventDefault(), tN(this, b);
  } else {
    var c = (0,z.FM)(this.O), d = c.getSelection();
    this.Jc.style.top = (0,z.oi)().top + 50 + "px";
    this.Jc.style.display = "block";
    this.Jc.innerHTML = "";
    this.Jc.focus();
    (0,window.setTimeout)(function() {
      var a = this.Js ? this.Jc.innerHTML : (0,z.Ha)(this.Jc.textContent);
      this.Jc.style.display = "none";
      this.O.ba().focus();
      (0,z.VL)(c, d);
      tN(this, a);
    }.bind(this), 0);
  }
};
(0,z.p)(vN, z.CM);
vN.prototype.gd = function(a) {
  var b = a.getSelection(), c = b.start.offset, d = b.end.offset, e = (0,z.bM)(a, b.start.V);
  (0,z.HH)(e, this.mF, d);
  (0,z.HH)(e, this.aJ, c);
  b.start.offset++;
  b.end.offset++;
  (0,z.dM)(a, b.start.V);
  (0,z.hM)(a);
};
(0,z.p)(z.xN, z.SM);
z.xN.prototype.hb = (0,z.Tb)("SmartTextPlugin");
z.xN.prototype.sc = function(a) {
  return 32 == a.keyCode ? ((0,z.DM)(VM(this.fF ? [z.dN, kN] : kN), this.O), a.preventDefault(), !0) : !1;
};
z.xN.prototype.Qr = function(a) {
  return yN(this, a.qf.charCode) ? (a.preventDefault(), !0) : !1;
};
(0,z.p)(AN, z.v);
z.g = AN.prototype;
z.g.Od = 0;
z.g.C = function() {
  AN.w.C.call(this);
  this.stop();
  delete this.io;
  delete this.xf;
};
z.g.start = function(a) {
  this.stop();
  this.Od = (0,z.zN)(this.Ov, (0,z.ha)(a) ? a : this.Iw);
};
z.g.stop = function() {
  this.Pd() && z.da.clearTimeout(this.Od);
  this.Od = 0;
};
z.g.Zc = function() {
  this.stop();
  this.cl();
};
z.g.Pd = function() {
  return 0 != this.Od;
};
z.g.cl = function() {
  this.Od = 0;
  this.io && this.io.call(this.xf);
};
(0,z.p)(z.EN, z.v);
var GN = [];
z.g = z.EN.prototype;
z.g.qa = function(a, b, c, d) {
  return FN(this, a, b, c, d);
};
z.g.Ee = function(a, b, c, d, e) {
  if ((0,z.na)(b)) {
    for (var f = 0;f < b.length;f++) {
      this.Ee(a, b[f], c, d, e);
    }
  } else {
    c = c || this.handleEvent, e = e || this.xf || this, c = MI(c), d = !!d, b = (0,z.oA)(a) ? a.ml(b, c, d, e) : a ? (a = (0,z.zA)(a)) ? a.ml(b, c, d, e) : null : null, b && ((0,z.wA)(b), delete this.xb[b.key]);
  }
  return this;
};
z.g.Nj = function() {
  (0,z.sb)(this.xb, z.wA);
  this.xb = {};
};
z.g.C = function() {
  z.EN.w.C.call(this);
  this.Nj();
};
z.g.handleEvent = function() {
  throw Error("EventHandler.handleEvent not implemented");
};
var fO;
var ON;
var MN;
var JN;
(0,z.p)(HN, z.PM);
HN.prototype.oa = null;
HN.prototype.kc = null;
JN = "change";
z.KN = "delayedchange";
MN = {KN:"cvc", wO:"load", qP:"unload", wN:"beforechange", GN:JN, QN:z.KN, xN:"beforefocus", VN:"focus", AN:"blur", yN:"beforetab", kO:"ifrsz", aP:"selectionchange"};
ON = 0;
fO = null;
z.g = HN.prototype;
z.g.Lx = !1;
z.g.Cs = !1;
z.g.ba = function() {
  return this.oa;
};
z.g.addListener = function(a, b, c, d) {
  var e = this.ba();
  z.eC && e && this.Fe() && (e = e.ownerDocument);
  d ? FN(this.pf, e, a, b, c, d) : this.pf.qa(e, a, b, c);
};
z.g.sa = function(a) {
  var b = a.hb();
  this.ji[b] = a;
  for (var c in IN) {
    a[IN[c]] && this.Ej[c].push(a);
  }
  a.O = this;
  this.Ye() && a.enable(this);
};
var NN = 15, LN = 250;
HN.prototype.Fe = z.yB;
HN.prototype.HD = z.xB;
var QN = {46:!0, 8:!0};
z.w || (QN[9] = !0);
var RN = {86:!0, 88:!0};
z.DB && !z.Qe && (QN[229] = !0);
HN.prototype.C = function() {
  this.bo() || this.Ye();
  this.kc && this.execCommand("clearlorem");
  TN(this);
  UN(this);
  iO(this);
  this.Nl = null;
  this.pf && (this.pf.Xb(), this.pf = null);
  for (var a;a = this.pN.pop();) {
    a.Xb();
  }
  fO == this.id && (fO = null);
  for (var b in this.ji) {
    a = this.ji[b], a.LK && a.Xb();
  }
  delete this.ji;
  HN.w.C.call(this);
};
var gO = ["DOMNodeInserted", "DOMNodeRemoved", "DOMNodeRemovedFromDocument", "DOMNodeInsertedIntoDocument", "DOMCharacterDataModified"], YQ = {8:1, 9:1, 13:1, 33:1, 34:1, 35:1, 36:1, 37:1, 38:1, 39:1, 40:1, 46:1}, ZQ = {65:!0, 86:!0, 88:!0}, YN = {8:1, 9:1, 13:1, 27:1, 33:1, 34:1, 37:1, 38:1, 39:1, 40:1};
z.g = HN.prototype;
z.g.Zn = function(a, b) {
  for (var c = this.Ej[a], d = (0,z.lb)(arguments, 1), e = 0;e < c.length;++e) {
    var f = c[e];
    if ((f.isEnabled(this) || WQ[a]) && f[IN[a]].apply(f, d)) {
      return!0;
    }
  }
  return!1;
};
z.g.VL = function(a, b) {
  for (var c = this.Ej[a], d = (0,z.lb)(arguments, 1), e = 0;e < c.length;++e) {
    var f = c[e];
    (f.isEnabled(this) || WQ[a]) && f[IN[a]].apply(f, d);
  }
};
z.g.ox = function(a, b, c) {
  for (var d = this.Ej[a], e = (0,z.lb)(arguments, 1), f = 0;f < d.length;++f) {
    var h = d[f];
    if (h.isEnabled(this) || WQ[a]) {
      e[0] = h[IN[a]].apply(h, e);
    }
  }
  return e[0];
};
z.g.Pr = function(a) {
  (z.Qe || VN(this, a)) && !this.Zn(1, a) && z.iC && XN(this, a);
};
z.g.pC = function(a) {
  if (z.Qe) {
    if (!VN(this, a)) {
      return;
    }
  } else {
    this.xw = !0, this.Mn();
  }
  this.Zn(2, a) || z.iC || XN(this, a);
};
z.g.qC = function(a) {
  z.Qe || !this.xw && !PN(a) || this.zw();
  this.Zn(3, a);
  aO(this, "selectionchange") || (YQ[a.keyCode] || (a.ctrlKey || a.metaKey) && ZQ[a.keyCode]) && this.vx.start();
};
z.g.execCommand = function(a, b) {
  for (var c = arguments, d, e = this.Ej[6], f = 0;f < e.length;++f) {
    var h = e[f];
    if (h.isEnabled(this) && h.Ng(a)) {
      d = h.execCommand.apply(h, c);
      break;
    }
  }
  return d;
};
z.g.queryCommandValue = function(a) {
  var b = this.Ye() && this.Ow;
  if ((0,z.pa)(a)) {
    return ZN(this, a, b);
  }
  for (var c = {}, d = 0;d < a.length;d++) {
    c[a[d]] = ZN(this, a[d], b);
  }
  return c;
};
z.g.yL = function(a, b) {
  if (!aO(this, JN)) {
    var c = b.qf;
    try {
      if (c.originalTarget.prefix || "scrollbar" == c.originalTarget.nodeName) {
        return;
      }
    } catch (d) {
      return;
    }
    c.prevValue != c.newValue && a.call(this, c);
  }
};
z.g.Cw = function(a) {
  aO(this, JN) || (a = a.pw ? a.qf : a, a.target.firebugIgnore || (this.Lw = this.Bl = !0, this.Yd.start()));
};
z.g.mC = function() {
  z.w && this.execCommand("clearlorem", !0);
  z.Qe && this.gw();
  this.bl();
};
z.g.CL = function() {
  var a = this.ED;
  this.ED = null;
  (0,z.HM)(this, void 0, a);
};
z.g.Mn = function() {
  aO(this, "beforechange") || this.dispatchEvent("beforechange");
};
z.g.bl = function(a) {
  bO(this, !0, a);
};
z.g.zw = function() {
  aO(this, JN) || (this.Yd && this.Yd.stop(), this.Lw = this.Bl = !0, aO(this, z.KN) || this.Ln.start());
};
z.g.SB = function() {
  aO(this, z.KN) || (this.Ln.stop(), this.Bl = !1, this.dispatchEvent(z.KN));
};
z.g.gw = function() {
  this.QB();
  this.TB();
};
z.g.QB = function() {
  aO(this, "beforefocus") || (this.execCommand("clearlorem", !0), this.dispatchEvent("beforefocus"));
};
z.g.TB = function() {
  if (!aO(this, "focus")) {
    fO = this.id;
    this.Ow = !0;
    this.dispatchEvent("focus");
    if (z.Qe) {
      var a = this.ba(), b = (0,z.$N)(this);
      if (b) {
        var c = (0,z.we)(b);
        0 != (0,z.xe)(b) || c && c != a && "BODY" != c.tagName || aJ((0,z.DI)(a), 0).select();
      }
    }
    !z.dC && this.Fe() && this.Id.Md().parent.getSelection().removeAllRanges();
  }
};
z.g.RB = function() {
  aO(this, "blur") || (fO == this.id && (fO = null), this.Ow = !1, this.dispatchEvent("blur"));
};
z.g.BL = function(a) {
  fO = this.id;
  if (z.w) {
    var b = a.target;
    b && "A" == b.tagName && a.ctrlKey && this.Nl.Md().open(b.href);
  }
  this.Cs = !0;
};
z.g.zL = function() {
  this.Cs = !1;
};
z.g.sC = function(a) {
  if (!this.Lx || this.Cs) {
    this.Cs = !1, (0,z.HM)(this, a), z.w && (this.ED = a.target, this.vx.start());
  }
};
z.g.xx = function(a, b, c, d) {
  if (!this.bo()) {
    d && this.execCommand("clearlorem");
    b && a && (b = "\x3cp\x3e" + b + "\x3c/p\x3e");
    c && GM(this, !1);
    a = b;
    if (b = this.ba()) {
      if (this.Fe() && z.ce) {
        for (var e = b.ownerDocument.getElementsByTagName("HEAD"), f = e.length - 1;1 <= f;--f) {
          e[f].parentNode.removeChild(e[f]);
        }
      }
    } else {
      b = this.kc;
    }
    b && WN(this, a, b);
    d && this.execCommand("updatelorem");
    this.Ye() && (c ? (z.Qe && BN(this.Yd), bO(this)) : this.bl());
  }
};
z.g.dE = function() {
  var a = this.Id.Jg();
  a.designMode = "on";
  z.fC && a.execCommand("styleWithCSS", !1, !1);
};
z.g.EC = function() {
  this.Xv && hO(this) && (0,z.Ef)(this.Xv, this.ba());
};
z.g.Ye = function() {
  return 2 == this.Ij;
};
z.g.bo = function() {
  return 1 == this.Ij;
};
z.g.focus = function() {
  if (!z.bC && this.Fe()) {
    this.Id.Md().focus();
  } else {
    if (z.Re) {
      var a = this.Iv.pageXOffset, b = this.Iv.pageYOffset
    }
    this.ba().focus();
    z.Re && this.Iv.scrollTo(a, b);
  }
};
z.g.RC = function(a) {
  var b = this.kc;
  if (b) {
    var b = b.innerHTML, c = {}, b = this.ox(8, b, c), d = this.Nl.zc("IFRAME", jO(this));
    if (hO(this)) {
      var e = (0,z.za)(this.yC, this, d, b, c);
      this.nw = (0,z.iJ)(d, "load", e, !0);
      a && (d.src = a);
    }
    a = this.kc;
    d.className = a.className;
    d.id = a.id;
    rI(d, a);
    hO(this) || this.yC(d, b, c);
  }
};
z.g.zD = function() {
  var a = this.kc;
  if (a) {
    var b;
    b = this.Fe() && (b = this.Id) ? (b = b.Md()) && b.frameElement : null;
    b && rI(a, b);
  }
};
z.g.yC = function(a, b, c) {
  iO(this);
  a.allowTransparency = "true";
  var d = (0,z.td)(this.kc);
  c = new CN(this.id, (0,z.Bd)(d.Yc), c);
  if (hO(this)) {
    var e = (a.contentDocument || a.contentWindow.document).body;
    z.bC && (e.contentEditable = !0);
    e.className = "editable";
    e.setAttribute("g_editable", !0);
    e.hideFocus = !0;
    e.id = c.ZB;
    (0,z.uf)(e, c.mw);
    e.innerHTML = b;
  } else {
    var d = new DN(this.Xv), f = [];
    c.Jv && c.Ex && f.push("\x3c!DOCTYPE HTML\x3e");
    f.push('\x3chtml style\x3d"background:none transparent;min-width:0;');
    c.Jv && f.push("height:", c.aC ? "100%" : "auto");
    f.push('"\x3e');
    f.push("\x3chead\x3e\x3cstyle\x3e");
    d && d.JB && f.push(d.JB);
    z.Qe && c.Ex && f.push(" img {-moz-force-broken-image-icon: 1;}");
    f.push("\x3c/style\x3e\x3c/head\x3e");
    f.push('\x3cbody g_editable\x3d"true" hidefocus\x3d"true" ');
    z.bC && f.push("contentEditable ");
    f.push('class\x3d"editable ');
    f.push('" id\x3d"', c.ZB, '" style\x3d"min-width:0;');
    z.Qe && c.Jv && (f.push(";width:100%;border:0;margin:0;background:none transparent;", ";height:", c.Ex ? "100%" : "auto"), c.aC ? f.push(";overflow:auto") : f.push(";overflow-y:hidden;overflow-x:auto"));
    z.Re && f.push(";outline:hidden");
    for (e in c.mw) {
      f.push(";" + e + ":" + c.mw[e]);
    }
    f.push('"\x3e', b, "\x3c/body\x3e\x3c/html\x3e");
    b = f.join("");
    e = a.contentDocument || a.contentWindow.document;
    e.open();
    e.write(b);
    e.close();
  }
  SN(this, (a.contentDocument || a.contentWindow.document).body);
  !z.bC && this.Fe() && this.dE();
  eO(this);
};
(0,z.p)(z.kO, z.SM);
z.g = z.kO.prototype;
z.g.hb = (0,z.Tb)("CharCounterPlugin");
z.g.enable = function(a) {
  z.kO.w.enable.call(this, a);
  a.qa(z.KN, this.qg, !1, this);
};
z.g.disable = function(a) {
  z.kO.w.disable.call(this, a);
  a.Ee(z.KN, this.qg, !1, this);
};
z.g.sc = function(a) {
  xL(a) && window.getSelection().isCollapsed && lO(this);
  return!1;
};
z.g.qg = function() {
  lO(this);
};
nO.prototype.get = function(a) {
  return(0,z.oO)(this, a);
};
(0,z.p)(z.vO, z.SM);
z.g = z.vO.prototype;
z.g.hb = (0,z.Tb)("MaxLengthPlugin");
z.g.enable = function(a) {
  z.vO.w.enable.call(this, a);
  a.qa(z.KN, this.qg, !1, this);
  a = a.kc;
  a.setAttribute("data-length", wO(this));
  a.setAttribute("data-max-length", this.Ke);
};
z.g.disable = function(a) {
  a.Ee(z.KN, this.qg, !1, this);
  (0,z.Tc)(a.kc, ["max-length", "close-to-max-length"]);
  z.vO.w.disable.call(this, a);
};
z.g.sc = function(a) {
  return!this.dy && xL(a) && 8 != a.keyCode && this.O.ba().textContent.length >= this.Ke && window.getSelection().isCollapsed ? (a.preventDefault(), !0) : !1;
};
z.g.Bw = function() {
  this.O.ba().setAttribute("data-length", wO(this));
  return!1;
};
z.g.qg = function() {
  var a = this.O, b = a.ba(), c = wO(this);
  b.setAttribute("data-length", c);
  (0,z.Uc)(b, "max-length", c > this.Ke);
  (0,z.Uc)(b, "close-to-max-length", c > 0.66 * this.Ke);
  !this.dy && c > this.Ke && (b = (0,z.FM)(a), (0,z.DM)((0,z.UM)(b.fc(0), function(a) {
    (0,z.Am)(a, this.Ke, a.text.length);
  }.bind(this)), a));
};
(0,z.p)(z.xO, z.SM);
z.g = z.xO.prototype;
z.g.hb = (0,z.Tb)("FocusHandlingPlugin");
z.g.enable = function(a) {
  z.xO.w.enable.call(this, a);
  a.qa("focus", this.Aw, !1, this);
  a.qa("blur", this.Or, !1, this);
};
z.g.disable = function(a) {
  z.xO.w.disable.call(this, a);
  a.Ee("focus", this.Aw, !1, this);
  a.Ee("blur", this.Or, !1, this);
};
z.g.Aw = function() {
};
z.g.Or = function() {
};
(0,z.p)(z.yO, z.SM);
z.g = z.yO.prototype;
z.g.hb = (0,z.Tb)("DefaultTextPlugin");
z.g.enable = function(a) {
  z.yO.w.enable.call(this, a);
  a.kc.removeAttribute("data-default-value");
  a.ba().setAttribute("data-default-value", this.vF);
  (0,z.iJ)(a.ba(), "mousedown", this.pk, !1, this);
  (0,z.iJ)(a, "beforechange", this.ok, !1, this);
};
z.g.disable = function(a) {
  (0,z.hJ)(a, "beforechange", this.ok, !1, this);
  (0,z.hJ)(a.kc, "mousedown", this.pk, !1, this);
  z.yO.w.disable.call(this, a);
};
z.g.Uv = function(a) {
  a = (0,z.fb)(a.getElementsByClassName("default-value"));
  for (var b = a.length, c = 0;c < b;c++) {
    (0,z.Nd)(a[c]);
  }
};
z.g.sc = function(a) {
  if (9 == a.keyCode) {
    return!1;
  }
  var b = (0,z.$N)(this.O);
  if ((b = b && zO(this, b.Ma())) && AO(this, b)) {
    if (xL(a) || 86 == a.keyCode) {
      this.ok();
    } else {
      return a.preventDefault(), !0;
    }
  }
  return!1;
};
z.g.pk = function(a) {
  var b = zO(this, a.target);
  b && AO(this, b) && (b.focus(), a.preventDefault());
};
z.g.ok = function() {
  var a = this.O, b = (0,z.$N)(a);
  (a = (a = b && zO(this, b.Ma()) || a.ba()) && BO(this, a)) && (0,z.Nd)(a);
};
(0,z.p)(CO, z.SM);
CO.prototype.hb = (0,z.Tb)("DeletePlugin");
CO.prototype.sc = function(a) {
  var b = 46 === a.keyCode || 68 === a.keyCode && a.ctrlKey, c = 8 === a.keyCode;
  return b || c ? (c = 1, a.altKey && !a.metaKey ? c = 2 : a.metaKey && !a.altKey && (c = 3), (0,z.DM)(new z.IM(b, c), this.O), a.preventDefault(), !0) : !1;
};
(0,z.p)(DO, HN);
z.g = DO.prototype;
z.g.Fe = function() {
  return!1;
};
z.g.dE = z.fa;
z.g.EC = function() {
};
z.g.RC = function() {
  var a = this.kc;
  a && (SN(this, a), a.contentEditable = !0, WN(this, a.innerHTML, a), eO(this));
};
z.g.zD = z.fa;
(0,z.p)(EO, DO);
EO.prototype.ib = function() {
  return this.Zq;
};
EO.prototype.fg = function(a) {
  this.dp = a;
};
EO.prototype.Cl = function() {
  return this.mA;
};
EO.prototype.xx = function(a, b) {
  this.bh.selectionchange = 1;
  this.execCommand("clearlorem");
  this.Rm = null;
  EO.w.xx.call(this, !1, b, !1, !1);
  ZL((0,z.FM)(this));
  (0,z.hM)((0,z.FM)(this));
  this.execCommand("updatelorem");
  this.bh.selectionchange = 0;
};
FO.prototype.Dc = function() {
  return this.Hv;
};
var KO = /^[\w-]+(\.[\w-]+)*\@([\w-]+\.)+(\d+|\w\w+)$/i;
(0,z.p)(LO, z.CM);
LO.prototype.ko = function(a) {
  (0,z.KH)(a) || (a.hasDropCap = this.RG);
};
(0,z.p)(MO, z.CM);
MO.prototype.ko = function(a) {
  (0,z.KH)(a) || (this.Uq && a.type != this.nc && (a.type = this.nc), this.Uq || a.type != this.nc || (a.type = 1));
};
(0,z.p)(NO, z.CM);
NO.prototype.ko = function(a, b, c) {
  a.text && (b = (0,z.ym)(this.nc, b, c), this.Uq ? (0,z.sm)(a, b) : (0,z.IH)(a, b));
};
(0,z.p)(z.OO, z.SM);
z.OO.prototype.hb = (0,z.Tb)("FormattingPlugin");
var $Q = (0,z.Bb)({CE:"P_1", wE:"P_2", xE:"P_3", pE:"P_6", FE:"P_7", GE:"P_8", NE:"M_1", sE:"M_2", uN:"M_3", FN:"SET_HAS_DROP_CAP", PO:"CYCLE_BLOCKQUOTE"});
z.g = z.OO.prototype;
z.g.Ng = function(a) {
  return a in $Q;
};
z.g.sc = function(a) {
  xL(a) ? (this.Ru = !0, (0,window.setTimeout)(function() {
    (0,z.yb)(this.qh, !0) && QO(this) && PO(this);
    this.Ru = !1;
  }.bind(this), 0)) : 40 != a.keyCode && 38 != a.keyCode && 37 != a.keyCode && 39 != a.keyCode || PO(this);
  return!1;
};
z.g.tl = function() {
  (0,window.setTimeout)(function() {
    (0,z.yb)(this.qh, !0) && QO(this) && PO(this);
  }.bind(this), 0);
  return!1;
};
z.g.execCommand = function(a) {
  var b = this.O;
  if ("M_3" == a) {
    SO(this);
  } else {
    if ("SET_HAS_DROP_CAP" == a) {
      (0,z.DM)(new LO(!this.queryCommandValue(a)), b);
    } else {
      if ("CYCLE_BLOCKQUOTE" == a) {
        a = this.O, b = a.queryCommandValue("CYCLE_BLOCKQUOTE"), 6 == b ? a.execCommand("P_7") : 7 == b ? a.execCommand("P_7") : a.execCommand("P_6");
      } else {
        if (0 === a.indexOf("P_")) {
          (0,z.DM)(new MO(Number(a.substring(2)), !this.queryCommandValue(a)), b);
        } else {
          if (0 === a.indexOf("M_")) {
            var c = Number(a.substring(2)), d = (0,z.$N)(b);
            if (d && d.isCollapsed()) {
              if (this.qh[a] = !this.qh[a], a = RO(this, d)) {
                this.vz = a;
              }
            } else {
              (0,z.DM)(new NO(c, !this.queryCommandValue(a)), b);
            }
          }
        }
      }
    }
  }
};
z.g.queryCommandValue = function(a) {
  var b = this.O, c = this.O.ba(), d = (0,z.$N)(this.O), e;
  if ("SET_HAS_DROP_CAP" == a) {
    return(a = d && (0,z.sw)(d.Ma(), c)) && (0,z.Bw)(a);
  }
  if ("CYCLE_BLOCKQUOTE" == a) {
    return a = b.queryCommandValue(["P_6", "P_7"]), a.P_6 ? 6 : a.P_7 ? 7 : null;
  }
  if (0 === a.indexOf("P_")) {
    var f = Number(a.substring(2)), b = (0,z.FM)(b);
    e = !0;
    oM(b, function(a) {
      e && a.type != f && (e = !1);
    }, this, !1);
    return e;
  }
  if (0 === a.indexOf("M_")) {
    var h = Number(a.substring(2)), b = (0,z.FM)(b);
    if ("M_3" === a) {
      var k = !1;
      oM(b, function(a, b, c) {
        k = k || JH(a, h, b, c);
      }, this, !1);
      return k;
    }
    e = !0;
    oM(b, function(a, b, c) {
      e && (0,z.sm)(a.ja(), (0,z.ym)(h, b, c)) && (e = !1);
    }, this, !1);
    return e;
  }
  throw Error("No handler for command " + a);
};
(0,z.p)(TO, z.SM);
TO.prototype.hb = (0,z.Tb)("FormattingShortcutsPlugin");
var aR = {u:"DO NOTHING", k:"M_3", b:"M_1", i:"M_2", 0:"P_1", 1:"P_2", 2:"P_3", 5:"CYCLE_BLOCKQUOTE", 6:"P_8", 7:"P_7"};
TO.prototype.sc = function(a) {
  return 73 == a.keyCode && a.ctrlKey && z.Li ? (a.preventDefault(), !0) : !1;
};
TO.prototype.Un = function(a, b, c) {
  if (!c) {
    return!1;
  }
  if ("k" == b && !a.shiftKey) {
    if (a = this.O.execCommand("M_3")) {
      b = this.O, c = (0,z.GO)(a), (c = JO(c) ? 0 > c.search(/:/) ? "http://" + c.replace(/^[\s\xa0]+/, "") : c : KO.test(c) ? "mailto:" + c : null) ? (a.Dc().href = c, (0,z.HO)(a), b.execCommand("updateLinkBubble")) : b.execCommand("link", a);
    }
    return!0;
  }
  return(b = aR[b]) ? (this.O.execCommand(b), z.Qe && a.stopPropagation(), !0) : !1;
};
(0,z.p)(UO, z.PM);
(0,z.p)(WO, z.mA);
var VO = z.Qe || z.ce && (0,z.id)(532);
z.g = UO.prototype;
z.g.Vh = !1;
z.g.LC = 0;
z.g.xL = function(a) {
  XO(this, a);
};
z.g.wL = function(a) {
  YO(this, a);
};
z.g.tC = function(a) {
  this.Vh && this.dispatchEvent(new WO("updateIme", a));
};
z.g.Pr = function(a) {
  if (!VO) {
    var b = this.Vh;
    b || 229 != a.keyCode ? b && 229 != a.keyCode ? ZO(a) && YO(this, a) : b && this.dispatchEvent(new WO("updateIme", a)) : XO(this, a);
  }
  ZO(a) && (this.LC = a.keyCode);
};
z.g.DL = function(a) {
  !VO && z.ce && 229 == this.LC && this.Vh && YO(this, a);
};
z.g.AL = function(a) {
  if (this.Vh) {
    switch(a.keyCode) {
      case 13:
      ;
      case 9:
      ;
      case 27:
        YO(this, a);
    }
  }
};
z.g.C = function() {
  this.xf.Xb();
  this.Rw.Xb();
  this.VB = null;
  UO.w.C.call(this);
};
(0,z.p)($O, z.SM);
z.g = $O.prototype;
z.g.hb = (0,z.Tb)("ImePlugin");
z.g.Ng = function(a) {
  return "active-ime" === a;
};
z.g.enable = function(a) {
  $O.w.enable.call(this, a);
  this.Cp = new UO(a.ba());
  this.Cp.qa("endIme", this.pG, !1, this);
};
z.g.disable = function(a) {
  (0,z.bd)(this.Cp);
  $O.w.disable.call(this, a);
};
z.g.queryCommandValue = function() {
  return this.Cp.Vh;
};
z.g.pG = function() {
  this.O.bl();
};
(0,z.p)(aP, z.SM);
aP.prototype.hb = (0,z.Tb)("KeyboardShortcutPlugin");
aP.prototype.Un = function(a, b, c) {
  return c && b in this.jv ? (this.jv[b].hl.call(this.jv[b].Br), !0) : !1;
};
aP.prototype.Vk = function(a, b, c) {
  this.vp[a] = {hl:b, Br:c};
};
aP.prototype.sc = function(a) {
  return a.keyCode in this.vp ? !!this.vp[a.keyCode].hl.call(this.vp[a.keyCode].Br, a) : !1;
};
(0,z.p)(bP, z.SM);
z.g = bP.prototype;
z.g.hb = (0,z.Tb)("SelectionNormalizingPlugin");
z.g.enable = function(a) {
  bP.w.enable.call(this, a);
  var b = a.ba();
  this.ya.push((0,z.R)(b, "mouseup", this.zG, this));
  this.ya.push((0,z.R)(b, "mousedown", this.pk, this));
  (0,z.J)("variants.can_see_drop_caps") && a.qa("beforechange", this.ok, !1, this);
};
z.g.disable = function(a) {
  bP.w.disable.call(this, a);
  (0,z.$h)(this.ya);
  this.ya.length = 0;
  a.Ee("beforechange", this.ok, !1, this);
};
z.g.zG = function(a) {
  if (dP(a)) {
    var b = qJ(0, a.target), c = (0,z.tH)(window);
    c && (UH((0,z.ue)(c), (0,z.ve)(c), b.S, b.offset).select(), a.preventDefault());
  } else {
    (0,z.Wb)(this.Lz.bind(this, 40));
  }
};
z.g.pk = function(a) {
  if (dP(a)) {
    var b = qJ(0, a.target);
    (0,z.Fn)(function() {
      aJ(b.S, b.offset).select();
    });
  }
};
z.g.sc = function(a) {
  var b;
  switch(a.keyCode) {
    case 39:
    ;
    case 37:
    ;
    case 40:
    ;
    case 38:
      (0,z.Wb)(this.Lz.bind(this, a.keyCode));
      break;
    case 65:
      if (z.Li ? a.metaKey : a.ctrlKey) {
        a.preventDefault();
        var c = this.O;
        a = (0,z.FM)(c);
        b = a.getSelection();
        if (b.start.V == b.end.V && KL(b)) {
          b = b.start.V;
          var d = (0,z.bM)(a, b);
          if ((0,z.KH)(d)) {
            return iM(a, b, 0, b, d.text.length, !1), (0,z.HM)(c), !0;
          }
        }
        b = (0,z.aM)(a) - 1;
        iM(a, 0, 0, b, (0,z.bM)(a, b).text.length, !1);
        (0,z.HM)(c);
        return!0;
      }
    ;
  }
  xL(a) && (a = (0,z.FM)(this.O), b = a.getSelection(), KL(b) || iM(a, b.start.V, b.start.offset, b.end.V, b.end.offset, b.xe()));
  return!1;
};
z.g.Lz = function(a) {
  var b = this.O;
  if ((0,z.$N)(b)) {
    var b = (0,z.FM)(b), c = 39 === a || 40 === a;
    a = eP(this, b, c, !0);
    c = eP(this, b, c, !1);
    (a || c) && (0,z.hM)(b);
  }
};
z.g.ok = function() {
  var a = this.O, b = (0,z.$N)(a);
  if (b) {
    var c = (0,z.sw)(b.te(), a.ba()), d;
    if (d = c) {
      d = b.Ma(), d = (0,z.Bw)(c) ? (0,z.hi)(d, cP, c) : null;
    }
    d && b.isCollapsed() && (a = (0,z.qM)((0,z.FM)(a), c), -1 != a && (0,z.Wb)(this.xK.bind(this, a)));
  }
};
z.g.xK = function(a) {
  var b = (0,z.FM)(this.O), c = b.fc(a), c = (c = c && c.querySelector(".drop-cap-editable")) ? (0,z.jH)(c) : "";
  if (!(0,z.Fa)(c)) {
    var d = (0,z.bM)(b, a);
    d.text = c + d.text;
    (0,z.dM)(b, a);
    (0,z.hM)(b);
  }
};
(0,z.p)(gP, z.SM);
gP.prototype.hb = (0,z.Tb)("TypeOverPlugin");
gP.prototype.sc = function(a) {
  var b = this.O, c = (0,z.$N)(b);
  xL(a) && !a.ctrlKey && c && !c.isCollapsed() && (a = (0,z.FM)(b).getSelection(), KL(a) && a.start.V === a.end.V || (0,z.DM)(new z.IM(!0, 1), b));
  return!1;
};
(0,z.p)(hP, z.SM);
hP.prototype.hb = (0,z.Tb)("UndoRedoPlugin");
hP.prototype.Ng = function(a) {
  return "+undo" == a || "+redo" == a;
};
hP.prototype.execCommand = function(a) {
  "+undo" == a ? (0,z.FM)(this.O).dm() : "+redo" == a && (0,z.FM)(this.O).gs();
  return!0;
};
hP.prototype.Un = function(a, b, c) {
  if (!c) {
    return!1;
  }
  c = this.O;
  var d = null;
  "y" == b || "z" == b && a.shiftKey ? d = "+redo" : "z" == b && (d = "+undo");
  return d ? (c.execCommand(d), a.preventDefault(), !0) : !1;
};
(0,z.p)(z.iP, z.Kj);
z.g = z.iP.prototype;
z.g.oa = null;
z.g.pm = null;
z.g.qm = null;
z.g.oz = !0;
z.g.Hi = !0;
z.g.fg = function(a) {
  this.dp = a;
};
z.g.isEnabled = function() {
  return this.Hi;
};
z.g.FD = function(a) {
  a != this.Hi && this.oa && (this.oa.kc.contentEditable = a);
  this.Hi = a;
};
z.g.Vk = function(a, b, c) {
  this.LA.Vk(a, b, c);
};
z.g.sa = function(a, b) {
  if (this.oa) {
    if (b) {
      throw Error("Can only prepend plugins before editor is activated");
    }
    this.oa.sa(a);
  } else {
    b ? this.dn.unshift(a) : this.dn.push(a);
  }
};
z.g.select = function() {
  (0,z.Ue)((0,z.Le)(this.oa.ba()), void 0).select();
};
z.g.execCommand = function(a, b) {
  this.oa.execCommand.apply(this.oa, arguments);
};
z.g.queryCommandValue = function(a, b) {
  return this.oa.queryCommandValue.apply(this.oa, arguments);
};
z.g.ua = function() {
  if (!this.pm || this.oa.Bl) {
    var a;
    if (!this.qm || this.oa.Bl) {
      var b = this.oa.ba();
      a = (0,z.FM)(this.oa);
      (0,z.UL)(a);
      (0,z.gM)(a);
      a = z.Hl.ja((0,z.Pl)(a.Lb));
      b = kJ(b, jP(this).sections);
      if (!a.Ob(b)) {
        throw new WL("richText model");
      }
      for (var b = a.qc(), c = 0;c < b.length;c++) {
        var d = (0,z.pm)(b[c]), e = d;
        8 != e.type && (HI(e, z.QQ), HI(e, z.RQ));
        e = d;
        (0,z.tm)(e, 4);
        (0,z.tm)(e, 5);
        b[c] = d.Cb();
      }
      QI(b.concat(a.gc() || []));
      b = a.qc() || [];
      c = (0,z.em)(a);
      for (d = 0;d < b.length;d++) {
        var f = b[d], e = f.g(), f = f.getMetadata() && f.getMetadata().$a();
        if (!(e = 4 == e && !f)) {
          var f = d, h = a, e = h.qc(), k = h.qc()[f];
          e = MH(k.g(), k.rc()) ? (h = h.gc()) ? (f = (0,z.Xg)(h, f)) && (0,z.BI)(f) ? 1 < (0,z.Yg)(h, h.indexOf(f), e.length) : !0 : !0 : !1;
        }
        e && (e = c, f = (0,z.yl)(2).nb(d), (0,z.Dl)((0,z.zl)(f), e), d--);
      }
      for (;b.length && 5 == (0,z.Ya)(b).g();) {
        d = c, e = (0,z.yl)(2).nb(b.length - 1), (0,z.Dl)((0,z.zl)(e), d);
      }
      this.qm = a;
    }
    a = this.qm;
    if (this.Qi) {
      a = (0,z.dO)(this.oa).replace(/<br>/g, "\n");
      if (-1 != a.indexOf("\x3c")) {
        throw Error("Sanitization plugin failure");
      }
      a = WH(a);
    } else {
      a = (0,z.Mm)(a, z.vg, jP(this));
    }
    this.pm = a;
  }
  return this.pm;
};
z.g.C = function() {
  if (this.oa) {
    if (this.oa.Ij != ON) {
      var a = this.oa;
      if (a.Ij == ON) {
        throw Error("makeUneditable: Field is already uneditable");
      }
      a.Yd && BN(a.Yd);
      BN(a.Ln);
      BN(a.vx);
      a.execCommand("clearlorem");
      iO(a);
      var b = a.kc;
      fO == b.id && (fO = null);
      UN(a);
      if ((0,z.pa)(null)) {
        z.w && (0,z.eJ)(b);
        b.innerHTML = null;
        var c = a.kc;
        c.removeAttribute("contentEditable");
        c.removeAttribute("g_editable");
        c.removeAttribute("role");
        a.id ? c.id = a.id : c.removeAttribute("id");
        c.className = a.TM || "";
        var d = a.cssText;
        d ? (0,z.yd)(c, {style:d}) : c.removeAttribute("style");
        (0,z.pa)(a.lD) && ((0,z.uf)(c, "lineHeight", a.lD), a.lD = null);
      }
      a.zD();
      TN(a);
      z.ce && b.blur();
      a.execCommand("updatelorem");
      a.dispatchEvent("unload");
      this.oa.kc.contentEditable = !1;
    }
    this.oa.Xb();
    this.oa = null;
  }
  z.iP.w.C.call(this);
};
z.g.be = function() {
  return!1;
};
z.g.focus = function(a) {
  if (a) {
    try {
      rL(this.oa.ba().lastChild, !1);
    } catch (b) {
      this.oa.focus();
    }
  } else {
    this.oa.focus();
  }
};
z.g.Do = function(a) {
  this.oa && this.oa.ba() && (this.oa.ba().style.visibility = a ? "" : "hidden");
  this.oz = a;
};
z.g.ib = z.xB;
z.g.Cl = z.xB;
z.g.H = function() {
  z.iP.w.H.call(this);
  if (!this.oa) {
    if (!window.document.getElementById(this.fz)) {
      throw Error("Element must be in DOM before editor is activated");
    }
    this.oa = new EO(this.fz);
    this.oa.fg(this.dp);
    var a = this.ib();
    this.oa.Zq = a;
    a = this.Cl();
    this.oa.mA = a;
    this.oa.Lx = !0;
    this.oa.sa(new hP);
    this.oa.sa(this.LA);
    for (a = 0;a < this.dn.length;a++) {
      this.oa.sa(this.dn[a]);
    }
    this.oa.sa(new gP);
    this.oa.qa(z.KN, this.bq, !1, this);
    if (this.Hi) {
      a = this.oa;
      a.Ij = 1;
      var b = a.kc;
      a.nodeName = b.nodeName;
      a.TM = b.className;
      a.cssText = b.style.cssText;
      b.className += " editable";
      a.RC(void 0);
      ZL((0,z.FM)(this.oa));
    }
    this.dn.length = 0;
    a = (0,z.mi)(this.oa.ba());
    a != window.document.body && z.ce && this.bz.qa(a, ["keydown", "keypress", "keyup"], this.GJ);
  }
  this.Do(this.oz);
};
z.g.GJ = function(a) {
  if (a.target === a.currentTarget) {
    var b = (0,z.$N)(this.oa);
    (b = b && (0,z.VH)(b)) && (0,z.Td)(this.oa.ba(), b) && ("keydown" === a.type ? this.oa.Pr(a) : "keypress" === a.type ? this.oa.pC(a) : "keyup" === a.type && this.oa.qC(a));
  }
};
z.g.Gb = function(a) {
  this.Qi && (a = (0,z.Ha)(a).replace(/\n/g, "\x3cbr\x3e"));
  this.oa.xx(!1, a, !1, !1);
  this.qm = this.pm = null;
};
z.g.bq = function() {
  this.qm = this.pm = null;
  this.X("change");
};
z.g.Ev = z.yB;
z.g.Xr = (0,z.n)(220);
(0,z.p)(z.kP, z.SM);
z.kP.prototype.hb = (0,z.Tb)("CancelEnterPlugin");
z.kP.prototype.sc = function(a) {
  return 13 === a.keyCode || 77 === a.keyCode && a.ctrlKey ? (a.preventDefault(), !0) : !1;
};
(0,z.p)(z.mP, z.SM);
z.mP.prototype.hb = (0,z.Tb)("SanitizationPlugin");
z.mP.prototype.sD = function(a) {
  if (this.Fu == z.zC) {
    var b = window.document.createElement("div");
    b.innerHTML = a;
    lP(b, this.Fu);
    a = b.innerHTML;
  }
  var b = {zs:this.O.ib(), ys:!1}, c = window.document.createElement("div");
  c.innerHTML = a;
  return YL(c, b).ba().innerHTML;
};
z.mP.prototype.Uv = function(a) {
  lP(a, this.Fu);
};
(0,z.p)(z.nP, z.xO);
z.g = z.nP.prototype;
z.g.hb = (0,z.Tb)("TypeaheadPlugin");
z.g.enable = function(a) {
  z.nP.w.enable.call(this, a);
  this.ya = [(0,z.R)(a.ba(), "click", this.up, this)];
  this.ac = window.document.createElement("div");
  this.ac.className = "typeahead popover popover-bottom";
  this.Bz = [(0,z.R)(this.ac, "click", this.vG, this), (0,z.R)(this.ac, "mouseover", this.xG, this), (0,z.R)(this.ac, "mouseout", this.wG, this)];
};
z.g.disable = function(a) {
  (0,z.Nd)(this.ac);
  (0,z.$h)(this.ya);
  (0,z.$h)(this.Bz);
  this.ac = null;
  this.L = "";
  this.Lj = null;
  z.nP.w.disable.call(this, a);
};
z.g.sc = function(a) {
  if (this.O.queryCommandValue("active-ime")) {
    return!1;
  }
  this.UA = !!~[40, 38, 9, 13, 27].indexOf(a.keyCode);
  qP(this, a);
  return!1;
};
z.g.Qr = function(a) {
  if (this.UA || this.O.queryCommandValue("active-ime")) {
    return!1;
  }
  qP(this, a);
  return!1;
};
z.g.Bw = function(a) {
  if (this.O.queryCommandValue("active-ime")) {
    return!1;
  }
  switch(a.keyCode) {
    case 40:
    ;
    case 38:
    ;
    case 16:
    ;
    case 17:
    ;
    case 18:
      break;
    case 9:
    ;
    case 13:
      if (!this.jf) {
        break;
      }
      oP(this);
      break;
    case 27:
      if (!this.jf) {
        break;
      }
      pP(this);
      break;
    default:
      a = this.O, (0,z.$N)(a).isCollapsed() && (0,z.DM)(VM(this.Wr), a), a = (0,z.VH)((0,z.$N)(a)), "token" != a.getAttribute("rel") ? pP(this) : this.Lj != a && (this.Lj = a, this.L = (0,z.vL)(a), !this.L || 2 > this.L.length ? pP(this) : this.$u = (0,z.q)(this.qx(), this.mJ, this));
  }
  return!1;
};
z.g.Aw = function() {
  this.zt = !0;
};
z.g.Or = function() {
  this.zt = !1;
  !this.eu && this.jf && pP(this);
};
z.g.fx = "left";
z.g.qx = function() {
  return this.ea.get(z.$G.R({}, {q:this.L.substring(1)}), {na:!0});
};
z.g.up = function(a) {
  "A" == a.target.tagName && (a.preventDefault(), a.stopPropagation());
};
z.g.vG = function(a) {
  a.stopPropagation();
  a.preventDefault();
  oP(this);
  return!1;
};
z.g.xG = function(a) {
  this.eu = !0;
  var b = this.ac.querySelector(".active");
  b && (0,z.u)(b, "active");
  a.target != this.ac && (a = (0,z.Yd)(a.target, null, "typeahead-item")) && (0,z.t)(a, "active");
};
z.g.wG = function(a) {
  (0,z.Td)(this.ac, a.relatedTarget) || (this.eu = !1, !this.zt && this.jf && pP(this));
};
z.g.mJ = function(a) {
  a = a.value;
  if (!a.length) {
    return pP(this);
  }
  this.xc(a.slice(0, 8));
};
z.g.xc = function(a) {
  this.ac.innerHTML = (0,z.K)(this.view, {items:a});
  this.Lq();
};
z.g.Lq = function() {
  if (this.Lj && (0,z.Td)(this.O.ba(), this.Lj)) {
    this.ac.parentNode || this.ux.appendChild(this.ac);
    var a = (0,z.qi)(this.Lj), b = "left" == this.fx ? 6 : this.Lj.offsetWidth / 2;
    this.ac.style.top = a.top + (0,z.ni)(this.ux).top + a.height - 5 + "px";
    this.ac.style.left = a.left - this.ac.offsetWidth / 2 + b - (0,z.qi)(this.ux).left + "px";
    rP(this);
    this.jf = !0;
  } else {
    pP(this);
  }
};
(0,z.p)(sP, z.iP);
z.g = sP.prototype;
z.g.dv = !1;
z.g.Ei = "";
z.g.ln = 0;
z.g.Cl = z.yB;
z.g.Dw = function() {
  return this.Ei.trim() != this.ua().trim();
};
z.g.Ta = function() {
  return this.pH;
};
z.g.clear = function() {
  this.Gb("");
};
z.g.save = function() {
  this.ua().length <= this.Ke && this.Lf();
};
z.g.fw = function() {
  this.Sv() && (0,window.confirm)(this.rw()) ? ((0,z.r)(this.Dd.Hd(this.Lr()), (0,z.mq)(this.W, "Sorry, your attempt to delete failed. Please try again.")), this.X("delete")) : tP(this);
};
z.g.C = function() {
  (0,window.clearTimeout)(this.ln);
  sP.w.C.call(this);
};
z.g.H = function() {
  function a(a) {
    a.stopPropagation();
  }
  sP.w.H.call(this);
  this.Ei = this.ua();
  this.Gb(this.Ei);
  this.Vk(13, this.nu, this);
  this.Vk(27, this.ou, this);
  this.oa.qa("blur", this.mu, !1, this);
  var b = this.oa.ba();
  (0,z.R)(b, "keydown", a);
  (0,z.R)(b, "keyup", a);
  (0,z.R)(b, "keypress", a);
};
z.g.Ug = function(a) {
  return a;
};
z.g.Lf = function() {
  if (this.isEnabled()) {
    var a = this.ua().trim();
    if (a) {
      this.FD(!1);
      var b = this.Lr(), c = this.uw();
      (0,z.Cc)((0,z.r)((0,z.q)(this.Dd.send(c, b, this.vw(a), {na:!0}), this.pI, this), (0,z.mq)(this.W, "Saving failed. You may be having connectivity issues or notes might be disabled on this post. Please try again.")), this.FD.bind(this, !0));
    } else {
      (0,z.Fn)(this.fw, this);
    }
  }
};
z.g.pI = function(a) {
  a = (0,z.al)(a.value, a.references);
  this.X("save", this.Ug(a));
};
z.g.nu = function(a) {
  if (this.un && this.un.jf) {
    return!1;
  }
  a.shiftKey || (a.preventDefault(), this.save());
  return!0;
};
z.g.ou = function(a) {
  if (this.un && this.un.jf) {
    return!1;
  }
  a.preventDefault();
  tP(this);
  return!1;
};
z.g.mu = function() {
  this.dv && (this.ua().length >= this.Ke ? (0,window.confirm)(this.ww()) ? tP(this) : this.focus() : this.ln = (0,window.setTimeout)(this.Lf.bind(this), 100));
};
(0,z.p)(uP, sP);
z.g = uP.prototype;
z.g.Ls = null;
z.g.ey = null;
z.g.Lt = null;
z.g.Kt = null;
z.g.dz = null;
z.g.rw = function() {
  return SP();
};
z.g.ww = function() {
  return TP();
};
z.g.Sv = function() {
  return!!this.Ta();
};
z.g.Ug = function(a) {
  return{id:a.noteId, author:(0,z.J)("currentUser"), postId:a.postId, anchor:a.anchor, noteId:a.noteId, content:a.content, state:a.state, createdAt:a.createdAt, replies:[], tB:"just now", newHighlight:a.newHighlight || null, highlightId:a.highlightId || null};
};
z.g.uw = function() {
  return this.Ta() ? "put" : "post";
};
z.g.Lr = function() {
  return this.Ta() ? z.xG.R({postId:this.Z, noteId:this.Ta()}) : z.vG.R({postId:this.Z});
};
z.g.vw = function(a) {
  a = {content:a};
  this.Ls && (a.anchor = this.Ls, a.anchorContent = this.ey);
  null != this.Lt && null != this.Kt && (a.highlightStart = this.Lt, a.highlightEnd = this.Kt, a.highlightContent = this.dz);
  return a;
};
(0,z.p)(DP, z.Kj);
DP.prototype.wH = function(a) {
  if (a = (0,z.sO)(this.je, a.target)) {
    var b = (0,z.oO)(this.je, a), c = this.md[a];
    c && c !== this.qk && b && !dI(b, !1) && (this.qk && (0,z.u)(this.qk, "notes-marker-highlighted"), (0,z.t)(c, "notes-marker-highlighted"), this.qk = c, (0,z.bd)(this.bf), this.bf = new z.cA("mouseover", [b, c]), this.bf.H(), (0,z.Cc)(this.bf.ma.zb(), function() {
      (0,z.u)(c, "notes-marker-highlighted");
      this.qk === c && (this.qk = null);
    }, this));
  }
};
DP.prototype.H = function() {
  DP.w.H.call(this);
  z.EC || (0,z.rO)(this.je).forEach(function(a) {
    this.qa(a, "mouseover", this.wH);
  }, this);
};
DP.prototype.C = function() {
  (0,z.bd)(this.bf);
  (0,z.Nd)(this.Li);
  this.md = this.Li = null;
  DP.w.C.call(this);
};
(0,z.p)(JP, z.Ij);
z.g = JP.prototype;
z.g.load = function() {
  this.me || (this.me = (0,z.r)((0,z.q)(this.Dd.get(z.wG.R({postId:this.Z}), {na:!0, background:!0}), this.nJ, this), z.Cj));
  return this.me.zb();
};
z.g.Ye = function() {
  return this.ym;
};
z.g.Lg = function(a) {
  var b = a && a.getAttribute("name");
  if (!b || !a) {
    return null;
  }
  var c = this.pA[b];
  return c && !this.Jm ? c : this.pA[b] = (0,z.Iw)(a);
};
z.g.Pb = function(a, b) {
  var c = (0,z.HP)(this, b);
  return(0,z.qk)(c, "id", a);
};
z.g.iC = function() {
  return(0,z.HP)(this, "vote");
};
z.g.nJ = function(a) {
  var b = a.references.User;
  this.yg = b[a.post.creatorId];
  var c = a.value;
  if (c) {
    for (var d = 0;d < c.length;d++) {
      var e = c[d];
      if ("HIDDEN" != e.state) {
        var f = e.replies, h = b;
        if (f) {
          for (var k = 0;k < f.length;k++) {
            var l = f[k];
            l.author = h[l.author];
          }
        }
        f = e;
        h = b;
        (0,z.HP)(this, e.anchor).add({id:f.noteId, author:h[f.author], postId:this.Z, highlightId:f.highlightId, anchor:f.anchor, noteId:f.noteId, content:f.content, state:f.state, createdAt:f.createdAt, replies:f.replies || []});
      }
    }
  }
  if (a = a.highlights) {
    for (b = 0;b < a.length;b++) {
      this.wp[a[b].id] = new z.mO(new z.mO(a[b]));
    }
  }
  this.ym = !0;
};
z.g.C = function() {
  this.me.cancel();
  JP.w.C.call(this);
};
(0,z.p)(OP, sP);
z.g = OP.prototype;
z.g.rw = function() {
  return "Are you sure you want to delete this reply?";
};
z.g.ww = function() {
  return "Your reply is too long, do you want to abandon your changes?";
};
z.g.Sv = function() {
  return!!this.Bq;
};
z.g.Ug = function(a) {
  return{id:a.replyId, author:(0,z.J)("currentUser"), postId:a.postId, noteId:a.noteId, replyId:a.replyId, content:a.content, createdAt:a.createdAt, tB:"just now"};
};
z.g.uw = function() {
  return this.Bq ? "put" : "post";
};
z.g.Lr = function() {
  return this.Bq ? z.AG.R({postId:this.Z, noteId:this.Ta(), replyId:this.Bq}) : z.zG.R({postId:this.Z, noteId:this.Ta()});
};
z.g.vw = function(a) {
  return{content:a};
};
(0,z.p)(PP, z.qe);
PP.prototype.xo = function() {
  if (!this.pn) {
    return null;
  }
  var a = RP(this.pn);
  if (!a) {
    return null;
  }
  var b = RP(this.xt);
  return b ? (0,z.Ye)(a.S, a.offset, b.S, b.offset) : null;
};
(0,z.p)(z.UP, z.v);
z.g = z.UP.prototype;
z.g.bb = null;
z.g.Pe = null;
z.g.pe = null;
z.g.$f = null;
z.g.ei = 0;
z.g.C = function() {
  cQ(this);
  (0,z.jQ)(this, null);
  this.ds.Ba("change", this.Yy, this);
  this.Jz && (0,z.$h)(this.Jz);
  (0,z.$h)(this.rb);
  this.rb.length = 0;
  (0,z.Gi)(this.Fc.Li);
  (0,z.Gi)(this.Nb);
  (0,z.Bi)("cancel-notes-vote");
  (0,z.Bi)("save-notes-vote");
  (0,z.Nd)(this.Nb);
  this.data.Xb();
  this.Jn && this.Jn.cancel();
  (0,z.bd)(this.Fc);
  this.Jz = this.Jn = this.data = this.Nb = this.anchors = this.Fc = null;
  (0,z.t)(window.document.documentElement, "mobile-notes-variant");
  z.UP.w.C.call(this);
};
z.g.Yy = function(a) {
  if ("vote" == a && (0,z.J)("variants.enable_recommend_notes")) {
    if (this.ds.get("vote")) {
      this.bx();
    } else {
      if (a = KP(this.data)) {
        (0,z.ZP)(this, z.iD, a), (0,z.nk)(a);
      }
      this.Dj();
    }
  }
};
z.g.qI = function(a) {
  this.data.YC = a.content;
  YP(this, a);
  VP(this);
};
z.g.rI = function(a) {
  $P(this, a);
  VP(this);
};
z.g.dA = function() {
  if (this.Ze.Zh()) {
    return this.Dj();
  }
  this.al.confirm("Are you sure you want to abandon this note?").F(z.ZE, this.Dj, this);
};
z.g.sI = function() {
  this.Ze && this.Ze.save();
};
z.g.Dj = function() {
};
z.g.bx = function() {
};
z.g.Xw = function() {
};
z.g.$w = function() {
};
z.g.no = function(a) {
  YP(this, a);
};
z.g.ax = function() {
};
z.g.fD = function() {
};
z.g.Mh = function() {
};
z.g.bC = function() {
};
z.g.$F = function(a) {
  a = a.cb();
  a.rj = WI(a.content, {rel:"nofollow", target:""});
  a.rj = oL(a.rj);
  for (var b = 0;b < a.replies.length;++b) {
    a.replies[b].rj = WI(a.replies[b].content, {rel:"nofollow", target:""}), a.replies[b].rj = oL(a.replies[b].rj);
  }
  return a;
};
z.g.HI = function(a) {
  (0,z.hQ)(this, a.value);
};
z.g.BI = function(a) {
  (a = this.Wb["reply_" + a.value]) && a.save();
};
z.g.DH = function(a) {
  var b = this.Wb["reply_" + a.value];
  b && tP(b);
  (a = (0,z.Yd)(a.target, null, "notes-note")) && (0,z.u)(a, "notes-show-reply-editor");
};
z.g.WH = function(a) {
  function b() {
    (0,z.u)(h, "notes-edit-mode");
    (0,z.u)(f, "notes-reply-edit-mode");
    (0,z.bd)(k);
    delete this.Wb["reply_" + e];
  }
  var c = a.value.split(","), d = c[0], e = c[1], f = (0,z.Yd)(a.target, null, "notes-note"), h = (0,z.Yd)(a.target, null, "notes-reply");
  (0,z.t)(h, "notes-edit-mode");
  (0,z.u)(f, "notes-show-reply-editor");
  (0,z.t)(f, "notes-reply-edit-mode");
  a = h.querySelector(".notes-content");
  var k = new OP(this.Bo, a, this.postId, d, e);
  k.F("save", function(a) {
    for (var c = this.data.Pb(d, this.data.wa), f = c.get("replies"), h = 0;h < f.length;h++) {
      if (f[h].replyId == e) {
        c.add("replies", a, h);
        break;
      }
    }
    (0,z.ZP)(this, z.lD, c, {replyId:e});
    b.call(this);
  }, this);
  k.F("delete", function() {
    for (var a = this.data.Pb(d, this.data.wa), c = a.get("replies"), f = 0;f < c.length;f++) {
      if (c[f].replyId == e) {
        a.removeItem("replies", f);
        break;
      }
    }
    (0,z.ZP)(this, z.mD, a, {replyId:e});
    b.call(this);
  }, this);
  k.F("cancel", function() {
    var a = this.data.Pb(d, this.data.wa);
    CH(this.$f, a);
    b.call(this);
  }, this);
  k.F("change", this.Mh, this);
  k.focus(!0);
  this.Wb["reply_" + e] = k;
};
z.g.PH = function(a) {
  (a = this.Wb["reply_" + a.value]) && a.fw();
};
z.g.zH = function(a) {
  a = a.get("id");
  this.Wb[a] && ((0,z.bd)(this.Wb[a]), delete this.Wb[a]);
  this.Wb["reply_" + a] && ((0,z.bd)(this.Wb["reply_" + a]), delete this.Wb["reply_" + a]);
};
z.g.vH = function(a, b) {
  (0,z.u)(b, "notes-show-reply-editor");
  b.setAttribute("data-note-id", (0,z.lk)(a, "id"));
};
z.g.yH = function(a) {
  (0,z.r)(dQ(this, this.data.Pb(a.value, this.data.wa), "PUBLIC"), (0,z.mq)(this.al, "Sorry, we couldn’t approve the note. Please try again later and make sure you are logged in."));
};
z.g.QI = function(a) {
  (0,z.r)(dQ(this, this.data.Pb(a.value, this.data.wa), "NEW"), (0,z.mq)(this.al, "Sorry, we couldn’t unapprove the note. Please try again later and make sure you are logged in."));
};
z.g.VH = function(a) {
  function b() {
    (0,z.u)(d, "notes-edit-mode");
    (0,z.bd)(f);
    delete this.Wb[c];
  }
  var c = a.value, d = (0,z.Yd)(a.target, null, "notes-note");
  (0,z.t)(d, "notes-edit-mode");
  (0,z.u)(d, "notes-show-reply-editor");
  var e = d.querySelector(".notes-content"), f = new uP(this.Bo, e, this.postId, a.value);
  f.F("save", function(a) {
    $P(this, a);
    b.call(this);
  }, this);
  f.F("delete", function() {
    var a = this.data.Pb(c, this.data.wa);
    (0,z.ZP)(this, z.iD, a);
    (0,z.nk)(a);
    b.call(this);
  }, this);
  f.F("cancel", function() {
    var a = this.data.Pb(c, this.data.wa);
    CH(this.$f, a);
    b.call(this);
  }, this);
  f.F("change", this.Mh, this);
  f.focus(!0);
  this.Wb[c] = f;
};
z.g.AI = function(a) {
  (a = eQ(this, a)) && a.save();
};
z.g.CH = function(a) {
  (a = eQ(this, a)) && tP(a);
};
z.g.OH = function(a) {
  (a = eQ(this, a)) && a.fw();
};
z.g.oI = function(a) {
  for (var b = 0;b < a.length;b++) {
    (0,z.IP)(this.Fc, (0,z.lk)(a[b], "anchor"));
  }
};
z.g.bI = function(a) {
  a = a.value;
  this.Pe == a && (this.Pe = null);
  (0,z.r)(dQ(this, this.data.Pb(a, this.data.wa), "HIDDEN"), (0,z.mq)(this.al, "Sorry, we couldn’t hide the note. Please try again later and make sure you are logged in."));
};
z.g.nI = function(a) {
  a.F("add", this.oI, this);
  a.F("change", this.fD, this);
  a.F("remove", this.$w, this);
};
z.g.wm = function() {
  var a = window.document.createElement("div");
  a.className = "notes-container";
  a.innerHTML = (0,z.K)(zP);
  this.gx.appendChild(a);
  return a;
};
z.g.L = function(a) {
  return this.Nb.querySelector(a);
};
z.g.Xj = function() {
  GP(this.Fc);
  this.Fc.md[this.data.wa] || (0,z.jQ)(this, null);
};
z.g.hD = function(a) {
  this.Ax(a);
};
z.g.Ax = function(a) {
  (a = (0,z.Yd)(a.target, null, "notes-replies")) && (0,z.u)(a, "notes-replies-hidden");
};
z.g.yn = function() {
  var a = this.data.wa, b = this.L(".notes-items"), a = (0,z.HP)(this.data, a), b = new z.lz(b, a, AP);
  b.Ut = "notes-note";
  this.$f = (0,z.Sp)(b.Yl(this.$F), {canAdminister:this.canAdminister, hx:this.data.yg, ei:this.ei}, "note");
  this.$f.F("before-clear", this.zH, this);
  this.$f.F("after-draw", this.vH, this);
  this.$f.H();
  (0,z.EP)(this.Fc, this.data.wa, !0);
  (0,z.t)(this.screen.N, "notes-list-visible");
  (0,z.Kk)(z.fD);
};
z.g.bw = function() {
  (0,z.Bs)(this.Wk, "");
  (0,z.u)(this.screen.N, "notes-list-visible");
  (0,z.uw)(this.gj, function(a) {
    (0,z.u)(a, "grid-breaking-slide");
  });
};
z.g.getSelection = function() {
  var a = (0,z.tH)();
  if (!a || a.isCollapsed()) {
    return null;
  }
  var b = (0,z.VH)(a), c = (0,z.qO)(this.anchors, b);
  if (!c) {
    return null;
  }
  c = (b = (0,z.hi)(b, z.OI, c)) && this.data.Lg(b);
  if (!b) {
    return null;
  }
  var d = (0,z.rJ)(a, b, !0), e = (0,z.rJ)(a, b, !1);
  return-1 == d || -1 == e ? null : new z.NP(a, b, new z.mO({anchor:b.getAttribute("name"), startIndex:d, endIndex:e, content:c.text.substring(d, e)}));
};
z.g.eI = function() {
  this.lr((0,z.mQ)());
};
(0,z.p)(XP, sP);
z.g = XP.prototype;
z.g.rw = function() {
  return SP();
};
z.g.ww = function() {
  return TP();
};
z.g.Sv = function() {
  return!!this.Ta();
};
z.g.Ug = function(a) {
  return{id:a.noteId, author:(0,z.J)("currentUser"), postId:a.postId, anchor:a.anchor, noteId:a.noteId, content:a.content, state:a.state, createdAt:a.createdAt, tB:"just now"};
};
z.g.uw = function() {
  return this.Ta() ? "put" : "post";
};
z.g.Lr = function() {
  return this.Ta() ? z.xG.R({postId:this.Z, noteId:this.Ta()}) : z.vG.R({postId:this.Z});
};
z.g.vw = function(a) {
  return{content:a, anchor:"vote"};
};
z.g.Zh = function() {
  return!this.ua().trim();
};
(0,z.p)(z.oQ, z.iP);
z.oQ.prototype.Cl = z.yB;
z.g = z.pQ.prototype;
z.g.ua = function() {
  return this.$a() ? z.Hl.ja(this.yf) : null;
};
z.g.$a = function() {
  return this.yf.$a();
};
z.g.Jd = function() {
  return this.yf.Jd();
};
z.g.Mr = function(a) {
  return(0,z.K)(z.Qj, qQ(this, a));
};
z.g.Aj = function(a) {
  return this.Mr(this.yf, a);
};
z.g.lc = function(a) {
  this.yf.lc(a);
};
z.g.oi = function(a) {
  this.yf.oi(a);
};
z.g.Cf = function(a) {
  this.yf.Cf(a);
};
z.g.qi = (0,z.n)(156);
z.g = z.sQ.prototype;
z.g.fe = function(a) {
  a = a || "";
  this.ia.lc(a);
  a ? (tQ(this), this.element.setAttribute("data-image-id", a), this.jp && this.jp.removeAttribute("data-scroll-disabled")) : (this.element.removeAttribute("data-image-id"), this.jp && this.jp.setAttribute("data-scroll-disabled", !0));
  var b = this.ia.Aj();
  return(0,z.q)(this.kb.reset(), function() {
    wQ(this, b);
  }, this);
};
z.g.Do = function(a) {
  this.element.style.display = a ? "" : "none";
};
z.g.kN = function() {
  vQ(this, "cover" == this.ia.Jd() ? "contain" : "cover");
};
z.g.kC = function() {
  var a = "." + this.ia.Jd() + "-edit .picker-target";
  return this.element.querySelector(a);
};
z.g.Bx = function(a, b) {
  a.src = b;
  a.style.display = "";
};
z.g.Fw = function(a) {
  a.style.display = "none";
};
(0,z.p)(zQ, z.Kj);
z.g = zQ.prototype;
z.g.H = function() {
  zQ.w.H.call(this);
  this.qa(this.pa, "dragstart", (0,z.hL)(this.TH));
  this.qa(this.pa, "dragenter", (0,z.hL)(this.RH));
  this.qa(this.pa, "dragleave", (0,z.hL)(this.SH));
  this.qa(this.pa, "dragexit", (0,z.hL)(z.fa));
  this.qa(this.pa, "dragover", (0,z.hL)(z.fa));
  this.qa(this.pa, "drop", (0,z.hL)(this.UH));
};
z.g.TH = function(a) {
  a.FP = "copy";
};
z.g.RH = function(a) {
  (0,z.t)(a.currentTarget, "image-picker-dragover");
};
z.g.SH = function(a) {
  var b = (0,z.tf)((0,z.qi)(a.currentTarget));
  (a.x < b.left || a.clientX > b.right || a.y > b.bottom || a.clientY < b.top) && (0,z.u)(a.currentTarget, "image-picker-dragover");
};
z.g.UH = function(a) {
  (0,z.u)(a.currentTarget, "image-picker-dragover");
  a.dataTransfer && a.dataTransfer.files && a.dataTransfer.files[0] && this.Mc.start(a.dataTransfer.files[0]);
};
var bR = function(a) {
  var b = !1, c;
  return function() {
    b || (c = a(), b = !0);
    return c;
  };
}(function() {
  if (z.w) {
    return(0,z.id)("10.0");
  }
  var a = window.document.createElement("div"), b = (0,z.qf)();
  a.innerHTML = '\x3cdiv style\x3d"' + (b ? b + "-transition:opacity 1s linear;" : "") + 'transition:opacity 1s linear;"\x3e';
  return "" != (0,z.xf)(a.firstChild, "transition");
});
(0,z.p)(AQ, z.v);
AQ.prototype.C = function() {
  this.Dg && (this.Dg.cancel(), (0,z.u)(this.gk, this.Vq));
  this.Dg = null;
};
AQ.prototype.DF = function() {
  (0,z.$h)(this.wv);
  this.Dg = this.wv = null;
};
AQ.prototype.start = function() {
  this.Dg = (0,z.Cc)(new z.wc, this.DF, this);
  if (!bR()) {
    return this.Dg.Ea(), this.Dg;
  }
  this.wv = (0,z.R)(this.rv, z.Ho, this.vu, this);
  this.sq ? ((0,z.t)(this.gk, this.sq), (0,z.ri)(this.gk), (0,z.Wc)(this.gk, this.sq, this.Vq)) : (0,z.t)(this.gk, this.Vq);
  return this.Dg;
};
AQ.prototype.vu = function(a) {
  a.target == this.rv && ((0,z.u)(this.gk, this.Vq), this.Dg.Ea());
};
(0,z.p)(DQ, z.Ij);
var EQ = "pending-image";
DQ.prototype.reset = function() {
  return this.ia.$a() ? this.set("has-image") : this.set("no-image", !0);
};
DQ.prototype.set = function(a, b) {
  (0,z.Cc)(this.Vs, function() {
    if (this.kb != a) {
      var b = (0,z.Jc)();
      this.X("change", a, this.kb, b);
      return b;
    }
  }, this);
  b ? ((0,z.Wc)(this.pa, this.kb, a), this.kb = a) : (0,z.q)(this.Vs, function() {
    (0,z.Wc)(this.pa, this.kb, a);
    this.kb = a;
  }, this);
  return this.Vs.zb();
};
DQ.prototype.get = function() {
  return this.kb;
};
DQ.prototype.be = function() {
  return this.kb === EQ || "uploading-image" === this.kb;
};
(0,z.p)(FQ, z.Kj);
FQ.prototype.H = function() {
  FQ.w.H.call(this);
  this.kb.F("change", this.TA, this);
  this.Pa.F(z.cR, this.vy, this);
};
FQ.prototype.ka = function() {
  FQ.w.ka.call(this);
  this.kb.Ba("change", this.TA, this);
  this.Pa.Ba(z.cR, this.vy, this);
};
FQ.prototype.TA = function(a, b, c) {
  var d = z.Hl.ja(this.ia.yf);
  d && "full" == d.Jd() && ("no-image" == a ? GQ(this, c) : "no-image" == b ? HQ(this, c) : "has-image" == b && "uploading-image" == a && (a = this.pa.querySelector(".picker-target-clone")) && this.Hc.Bx(a, this.ia.ht));
};
FQ.prototype.vy = function() {
  (0,z.Cc)(BQ(CQ(new AQ(this.pa, "transition-picker-image")), this.pa.querySelector(".picker-target")).start(), function() {
    var a = this.pa.querySelector(".picker-target-clone");
    a && this.Hc.Fw(a);
  }, this);
};
IQ.prototype.reset = function() {
  this.pa && (this.pa.style.backgroundImage = "");
};
IQ.prototype.show = function(a) {
  this.pa && (this.pa.style.backgroundImage = 'url("' + a + '")', this.pa.style.display = "block");
};
(0,z.p)(JQ, z.Ij);
z.g = JQ.prototype;
z.g.ma = null;
z.g.ro = function() {
  this.abort();
  this.ma = this.vn.Sg(!this.hK);
  (0,z.r)((0,z.q)(this.ma, this.lA, this), this.Le, this);
};
z.g.start = function(a) {
  this.abort();
  a = this.vn.upload(a);
  this.ma = (0,z.Jc)(a);
  (0,z.r)((0,z.q)(this.ma, this.lA, this), this.Le, this);
};
z.g.abort = function() {
  for (var a = 0;a < this.Qk.length;a++) {
    (0,z.bd)(this.Qk[a]);
  }
  this.Qk.length = 0;
  this.ma && this.ma.cancel();
  this.ma = null;
};
z.g.C = function() {
  this.abort();
  JQ.w.C.call(this);
};
z.g.next = function() {
  this.Um();
};
z.g.Um = function() {
  if (!this.Qk.length) {
    return null;
  }
  var a = this.Qk.shift();
  a.Yq = this.Yq;
  a.F("progress", this.fq, this);
  var b = a.start();
  this.X("start");
  a.getFile() && (0,z.q)((0,z.AH)(a), function(a) {
    this.X("preview", a);
  }, this);
  (0,z.Cc)((0,z.r)((0,z.q)(b, function(a) {
    this.X("success", a);
  }, this), this.Le, this), function() {
    a.Ba("progress", this.fq, this);
  }, this);
  return b;
};
z.g.lA = function(a) {
  this.Qk = a;
  return this.Um();
};
z.g.fq = function(a) {
  this.X("progress", a);
};
z.g.Le = function(a) {
  a && a instanceof z.Nc ? this.X("abort", "This operation was canceled by the user.") : this.X("error", a || Error("Unknown upload error"));
};
z.g = KQ.prototype;
z.g.ro = function() {
  this.Mc.ro();
};
z.g.start = function(a) {
  this.Mc.start(a);
};
z.g.abort = function() {
  this.Mc.abort();
};
z.g.XI = function() {
  this.kb.set("uploading-image");
  this.Gk && (this.Gk.style.width = "0");
  this.fn.reset();
  this.Pa.X(z.dR);
};
z.g.WI = function(a) {
  this.Gk && (this.Gk.style.width = Math.floor(100 * a) + "%");
};
z.g.TI = function(a) {
  this.ia.Cf("");
  rQ(this.ia, a.Ph(), a.nl());
  var b = a.$a();
  this.Gk && (this.Gk.style.width = "100%");
  (0,z.q)(this.Hc.fe(b), function() {
    this.Pa.X(z.cR, b);
  }, this);
};
z.g.UI = function(a) {
  var b = a.Hw;
  this.W.error(413 == b ? (0,z.gJ)() : 415 == b ? (0,z.fJ)() : "An error occured while uploading an image. Please try again, if the problem persists, try converting to a different image format (for example JPEG).");
  this.fn.reset();
  uQ(this.Hc);
  this.Pa.X(z.eR, a);
};
z.g.SI = function(a) {
  this.fn.reset();
  uQ(this.Hc);
  this.Pa.X(z.fR, a);
};
z.g.VI = function(a) {
  this.fn.show(a);
};
(0,z.p)(LQ, z.Kj);
LQ.prototype.H = function() {
  LQ.w.H.call(this);
  (0,z.Di)(this.pa).D("wash", this.QG, this);
};
LQ.prototype.ka = function() {
  LQ.w.ka.call(this);
  (0,z.Di)(this.pa).clear("wash");
};
LQ.prototype.QG = function(a) {
  this.Ds(a.value);
};
LQ.prototype.Ds = function(a) {
  this.ia.Cf(a);
  xQ(this.Hc);
};
z.dR = "start";
z.cR = "complete";
z.eR = "error";
z.fR = "abort";
z.yQ = "change";
(0,z.p)(z.MQ, z.Xn);
z.g = z.MQ.prototype;
z.g.focus = function() {
};
z.g.Do = function(a) {
  this.Hc.Do(a);
};
z.g.ua = function() {
  return this.ia.ua();
};
z.g.be = function() {
  return this.kb.be();
};
z.g.H = function() {
  z.MQ.w.H.call(this);
  (0,z.Di)(this.pa).D("pick-image", this.Mc.ro, this.Mc).D("cancel-upload", this.abort, this).D("remove-image", function() {
    this.Hc.fe("");
  }, this).D("toggle-background-size", this.Hc.kN, this.Hc);
  this.ia.$a() && tQ(this.Hc);
};
z.g.ka = function() {
  (0,z.Gi)(this.pa);
  this.abort();
  z.MQ.w.ka.call(this);
};
z.g.reset = function() {
  return(0,z.q)(this.abort(), function() {
    uQ(this.Hc);
    this.Mc.fn.reset();
  }, this);
};
z.g.abort = function() {
  this.Mc && this.Mc.abort();
  return this.kb.reset();
};
z.g.HB = function(a, b) {
  return new z.pQ(a, b);
};
z.g.Ev = z.yB;
z.g.Xr = z.fa;
(0,z.p)(z.NQ, z.MQ);
z.NQ.prototype.IB = function(a, b, c, d, e) {
  return new PQ(a, b, c, d, e);
};
z.NQ.prototype.HB = function(a, b) {
  return new OQ(a, b, this.sv);
};
(0,z.p)(OQ, z.pQ);
OQ.prototype.Mr = function(a, b) {
  return(0,z.K)(this.sv ? z.Sj : z.Tj, {image:qQ(this, a), Th:b});
};
(0,z.p)(PQ, z.sQ);
PQ.prototype.kC = function() {
  return this.element.querySelector(".picker-target") || this.element;
};
PQ.prototype.Bx = function(a, b) {
  a.style.backgroundImage = "url(" + b + ")";
};
PQ.prototype.Fw = function(a) {
  a.style.backgroundImage = "";
};
})(_mdm);
