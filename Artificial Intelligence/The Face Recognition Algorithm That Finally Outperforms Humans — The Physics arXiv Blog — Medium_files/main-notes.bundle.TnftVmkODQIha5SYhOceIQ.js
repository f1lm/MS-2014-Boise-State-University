(function(z){
var cU = function(a) {
  return a.Nb.querySelector(".notes-container-scroller");
};
var dU = function(a, b, c) {
  return a.Dd.put(z.BG.R({postId:a.Z, noteId:c, replyId:b}), {state:"HIDDEN"}, {na:!0});
};
var eU = function(a) {
  return "“" + (0,z.O)(a.content) + "” —@" + (0,z.O)(a.username) + " " + (0,z.O)(a.url);
};
var fU = function(a, b, c, d, e, f) {
  z.UP.call(this, a, b, c, d);
  this.Jm = f;
  this.Xq = a.get("twitter");
  this.Ca = a.get("dom-monitor");
  this.Ca.F("resize-end", this.Ck, this);
  this.Ca.F("inner-resize-end", this.Ck, this);
  b.get("isPublished");
  this.Sa = a.get("popover");
  this.lu = this.Hk = this.Mz = null;
  (0,z.Di)(this.Nb).D("hide-reply", this.cI, this).D("start-note", this.GI, this).D("show-note-permalink", this.FI, this);
  e.F("update", this.kA, this);
  e.F("highlight", this.Wz, this);
  e.F("twitter", this.Vz, this);
  this.eb = e;
  (0,z.rO)(this.anchors).forEach(function(a) {
    this.rb.push((0,z.R)(a, "click", this.CI, this));
  }, this);
  this.rb.push((0,z.R)(window.document.body, "click", this.EH, this, !0));
};
var gU = function(a, b) {
  for (var c = b ? 1 : -1, d = a.parentNode.childNodes, e = d.length, f = (0,z.bb)(d, a), h = (0,z.BI)((0,z.Dw)(a, 0)), f = f + c;0 <= f && f < e;f += c) {
    var k = d[f];
    if ("SECTION" === k.tagName) {
      var l = (0,z.BI)((0,z.Dw)(k, 0));
      if (h || l) {
        return k;
      }
    }
  }
  return null;
};
var hU = function(a) {
  var b = a.data.wa;
  if (b = b ? a.anchors.get(b) : null) {
    var c = (0,z.tw)(b, (0,z.qO)(a.anchors, b)), d = null, e = null, b = (0,z.qi)(a.gj).top - (0,z.qi)(a.gx).top, f = c && (0,z.BI)((0,z.Dw)(c, 0));
    c && (f ? (d = b + c.offsetTop - 40, e = c.offsetHeight + 80) : (d = b + -40 - 20, (f = gU(c, !1)) && (d = b + f.offsetTop + f.offsetHeight), f = b + c.offsetParent.offsetTop + c.offsetParent.offsetHeight + 40, (c = gU(c, !0)) && (f = b + c.offsetTop), e = f - d));
    a.Nb.style.top = d + "px";
    a.Nb.style.height = e + "px";
    (0,z.uw)(a.gj, function(a) {
      var b = (0,z.tO)(a, this.gx), c = b + a.offsetHeight;
      (0,z.Uc)(a, "grid-breaking-slide", b < d + e && c > d);
    }, a);
  }
};
var iU = function(a, b) {
  (0,z.iQ)(a, b.Nd);
  jU(a, {scroll:!0, jg:!0});
  (0,z.nQ)(a, b);
  a.bb && a.bb.focus();
};
var kU = function(a, b) {
  (0,z.q)((0,z.jQ)(a, b), function() {
    (0,z.gQ)(this) || ((0,z.nQ)(this, b), this.bb && this.bb.focus());
    lU(this, {scroll:!0, jg:!0});
    (0,z.ii)(this.eg, 0, (0,z.li)(this.Fc.md[b]) - 100);
  }, a);
};
var mU = function(a, b, c) {
  var d = a.anchors.get(a.data.wa);
  if (!a.isAuthenticated) {
    var e = a.data.wa;
    a.pe && (e += "--highlight-" + a.pe.startIndex + "-" + a.pe.endIndex);
    a.ub.querySelector(".notes-add").setAttribute("data-redirect", (0,z.Fy)() + "#" + e);
  }
  if (d) {
    e = d.querySelector(".notes-highlight");
    d = c.jg && e ? e : d;
    if (a.data.wa) {
      var f = (0,z.qi)(d).top, e = cU(a), h = (0,z.qi)(e).top, f = Math.round(f - h - 20);
      b && (f -= b.offsetTop - ((0,window.parseInt)(a.ub.style.marginTop, 10) || 0));
      40 > f ? (a.ub.style.top = "40px", a.$C.style.height = Math.round(Math.max(a.ub.offsetHeight, cU(a).offsetHeight) + 80 - f) + "px", (0,z.ii)(e, 0, Math.round(-f + 40))) : (a.ub.style.top = Math.round(f) + "px", a.$C.style.height = Math.round(f + a.ub.offsetHeight + 40) + "px", (0,z.ii)(e, 0, 0));
    }
    c.scroll && (500 >= window.innerWidth ? b.scrollIntoView(!0) : (0,z.sJ)(d));
  }
};
var jU = function(a, b) {
  var c = a.ub.querySelector(".notes-new-note, .notes-add-sign-in");
  c && mU(a, c, b);
};
var nU = function(a, b, c) {
  b = a.ub.querySelector('[data-note-id\x3d"' + b + '"]');
  mU(a, b, c);
};
var lU = function(a, b) {
  if (a.data.wa) {
    var c = (0,z.HP)(a.data, a.data.wa), d = c.count();
    (c = d ? (0,z.lk)((0,z.pk)(c, 0), "id") : null) ? (1 == d && (0,z.lQ)(a, c), b.jg = !1, nU(a, c, b)) : jU(a, b);
  }
};
var oU = function(a, b) {
  return b == a.data.wa ? (0,z.q)((0,z.jQ)(a, null), z.xB) : (0,z.q)((0,z.jQ)(a, b), (0,z.Tb)(!!b));
};
var pU = function(a, b, c) {
  var d = (0,z.Yd)(b.target, null, "notes-note");
  !d || b.relatedTarget && (0,z.Td)(d, b.relatedTarget) || !(b = a.data.Pb(d.getAttribute("data-note-id"), a.data.wa)) || (d = null, c ? d = (0,z.lk)(b, "highlightId") : a.Pe && (d = (0,z.lk)(a.data.Pb(a.Pe, a.data.wa), "highlightId")), (0,z.iQ)(a, d ? a.data.wp[d] || null : null, a.Kw));
};
var qU = function(a) {
  z.v.call(this);
  this.ca = a;
};
(0,z.p)(fU, z.UP);
z.g = fU.prototype;
z.g.ei = 3;
z.g.tg = !1;
z.g.eb = null;
z.g.Xw = function() {
  var a = (0,z.aj)();
  this.Jn = null;
  this.tg = !0;
  var b = (0,z.mQ)();
  this.Xj();
  this.isAuthenticated && (0,z.Uc)(this.ub, "notes-is-creator", this.data.yg.userId === this.currentUser.userId);
  (0,z.wL)(this.L(".notes-post-creator"), this.data.yg.name);
  this.lr(b);
  this.rb.push((0,z.R)(this.Nb, "mouseover", this.JH, this));
  this.rb.push((0,z.R)(this.Nb, "mouseout", this.IH, this));
  this.rb.push((0,z.R)(this.ub, "click", this.GH, this));
  this.rb.push((0,z.R)(this.gj, z.Ho, this.vu, this));
  (0,z.Lk)("notes.renderMarkers", (0,z.aj)() - a);
};
z.g.lr = function(a) {
  if (a.anchor && this.Fc.md[a.anchor]) {
    if (kU(this, a.anchor), a.Nd) {
      (0,z.lQ)(this, a.Nd.id, !0), nU(this, a.Nd.id, {scroll:!0, jg:!0}), "reply" == a.CB && (0,z.hQ)(this);
    } else {
      if ("highlight" == a.CB) {
        var b = this.anchors.get(a.anchor), c = a.Nd.startIndex, d = a.Nd.endIndex, e = (0,z.rN)(b, c, b, d);
        e && (a = new z.NP(e, b, new z.mO({anchor:a.anchor, startIndex:c, endIndex:d, content:e.rc()})), iU(this, a));
      }
    }
  }
};
z.g.no = function(a) {
  fU.w.no.call(this, a);
  this.bb.clear();
  (0,z.lQ)(this, a.id);
  (0,z.t)(this.ub, "notes-hide-editor");
};
z.g.bx = function() {
  var a = this.screen.N;
  (0,z.Fn)(function() {
    var b = a.querySelector(".js-upvoters-item-current-user");
    if (b) {
      var c = b.offsetParent, d = this.Sa.createElement("top", (0,z.K)(z.CP), "popover-notes-vote");
      c.appendChild(d);
      var e = a.querySelector(".notes-vote-editor"), f = (0,z.WP)(this, e);
      f.F("change", function() {
        var b = d.querySelector('button[data-action\x3d"cancel-notes-vote"]');
        if (b) {
          var c = this.Ze.Zh();
          this.Hk = this.Hk || a.querySelector(".recommend-button");
          this.Hk.setAttribute("data-action", c ? "unvote" : "save-notes-vote");
          b.innerHTML = c ? "No thanks" : "Cancel";
        }
      }, this);
      c = c.getBoundingClientRect();
      e = b.getBoundingClientRect();
      d.style.left = -(d.offsetWidth / 2) + b.offsetLeft + e.width / 2 + "px";
      d.style.bottom = c.height - b.offsetTop + "px";
      (0,z.ri)(d);
      (0,z.t)(d, "fade");
      this.Mz = d;
      this.lu = (0,z.R)(window.document.body, "click", function(a) {
        (0,z.Td)(d, a.target) || f.Zh() && this.Dj();
      }, this);
    }
  }, this);
};
z.g.Dj = function() {
  this.Hk && "save-notes-vote" == this.Hk.getAttribute("data-action") && this.Hk.setAttribute("data-action", "unvote");
  (0,z.Nd)(this.Mz);
  this.lu && (0,z.$h)(this.lu);
  this.Ze && this.Ze.Xb();
};
z.g.bC = function() {
  var a = {scroll:!0, jg:!0};
  if (this.bb) {
    jU(this, a), this.bb.focus();
  } else {
    var b;
    a: {
      b = this.Wb;
      for (var c in b) {
        b = b[c];
        break a;
      }
      b = void 0;
    }
    if (c = b && b.Ta()) {
      (0,z.lQ)(this, c), nU(this, c, a), b.focus();
    }
  }
};
z.g.yn = function() {
  hU(this);
  (0,z.uO)(this.anchors, this.Nb, this.anchors.get(this.data.wa));
  fU.w.yn.call(this);
  hU(this);
};
z.g.Mh = function() {
  hU(this);
};
z.g.ax = function(a) {
  (0,z.q)(oU(this, a.value), function(a) {
    a && ((0,z.gQ)(this) || ((a = this.getSelection()) && a.Nd.anchor == this.data.wa ? ((0,z.iQ)(this, a.Nd), (0,z.nQ)(this, a)) : (0,z.nQ)(this, this.data.wa), this.bb && this.bb.focus()), lU(this, {scroll:!0, jg:!0}));
  }, this);
};
z.g.$w = function(a) {
  (0,z.IP)(this.Fc, (0,z.lk)(a, "anchor"));
  (0,z.lk)(a, "id") == this.Pe && (0,z.iQ)(this, null);
};
z.g.Ax = function(a) {
  (0,z.u)((0,z.Yd)(a.target, null, "notes-replies"), "notes-replies-hidden");
  this.Mh();
};
z.g.CI = function(a) {
  if (!this.Jm && "A" != a.target.tagName && (z.EC || this.data.wa)) {
    var b = this.getSelection();
    if (!b || b.kr != this.data.wa) {
      if (this.data.wa && 1E3 >= window.innerWidth) {
        return(0,z.jQ)(this, null);
      }
      a = (0,z.sO)(this.anchors, a.target);
      (0,z.q)(oU(this, a), function(a) {
        a && ((0,z.gQ)(this) || ((0,z.nQ)(this, this.data.wa), this.bb && this.bb.focus()), lU(this, {scroll:!0, jg:!0}));
      }, this);
    }
  }
};
z.g.Ck = function() {
  this.Xj();
};
z.g.EH = function(a) {
  if (this.data.wa) {
    var b = a.target;
    (0,z.Zd)(b, z.ti) || (b = (0,z.hi)(b, function(a) {
      return a == this.ub || a == this.Fc.Li || a == this.eb.ba() || a.getAttribute("data-action") && "zoom" != a.getAttribute("data-action");
    }.bind(this)), window.document.body === b && (1400 >= window.innerWidth && (a.stopPropagation(), a.preventDefault()), (0,z.jQ)(this, null)));
  }
};
z.g.FI = function(a) {
  (0,z.Bs)(this.Wk, a.value);
};
z.g.JH = function(a) {
  pU(this, a, !0);
};
z.g.IH = function(a) {
  pU(this, a, !1);
};
z.g.kA = function() {
  if (!this.Jm) {
    var a = (0,z.tH)();
    if (!a || a.isCollapsed()) {
      (0,z.EH)(this.eb);
    } else {
      var b = (0,z.qO)(this.anchors, (0,z.VH)(a)), c;
      if (c = b) {
        c = (0,z.VH)(a), c = (0,z.hi)(c, z.OI, b);
      }
      c ? (0,z.DH)(this.eb, (0,z.tJ)(a)) : (0,z.EH)(this.eb);
    }
  }
};
z.g.Wz = function() {
  (0,z.EH)(this.eb);
  var a = this.getSelection();
  a && iU(this, a);
  return!1;
};
z.g.Vz = function() {
  (0,z.EH)(this.eb);
  var a = (0,z.tH)();
  if (!a || a.isCollapsed()) {
    return!1;
  }
  var b = this.Xq, c = a.rc(), a = this.postId, c = {content:c, username:this.data.yg.username, url:(0,z.Cy)().toString()}, c = (0,z.Nz)(eU, c);
  b.iq(c);
  (0,z.Dk)(z.YC, {postId:a, type:"highlight", dest:"twitter"});
  return!1;
};
z.g.cI = function(a) {
  a = a.value.split(",");
  var b = a[0], c = a[1];
  (0,z.r)((0,z.q)(dU(this.data, c, b), function() {
    for (var a = this.data.Pb(b, this.data.wa), e = a.get("replies"), f = 0;f < e.length;f++) {
      if (e[f].replyId == c) {
        a.removeItem("replies", f);
        break;
      }
    }
    (0,z.ZP)(this, z.nD, this.data.Pb(b, this.data.wa), {replyId:c});
    this.jj.H("The reply has been dismissed", "success");
  }, this), (0,z.mq)(this.al, "Sorry, we couldn’t hide the reply. Please try again later and make sure you are logged in."));
};
z.g.GH = function(a) {
  a = a.target;
  var b = (0,z.Yd)(a, null, "notes-note");
  if (b) {
    var c = b.getAttribute("data-note-id");
    c == this.Pe ? (0,z.hi)(a, function(a) {
      return!!a.getAttribute("data-action") || (0,z.Qc)(a, "editable");
    }, b, !0) == b && (0,z.lQ)(this, null) : ((0,z.lQ)(this, c), nU(this, c, {scroll:!0, jg:!0}));
  }
};
z.g.GI = function() {
  var a = this.getSelection();
  (0,z.lQ)(this, null);
  a && (0,z.iQ)(this, a.Nd);
  (0,z.nQ)(this, a || this.data.wa);
  this.bb && (a && jU(this, {scroll:!0, jg:!0}), this.bb.focus());
};
z.g.vu = function(a) {
  (a = a.target.getAttribute("name")) && (0,z.oO)(this.anchors, a) && (0,z.EP)(this.Fc, a, a == this.data.wa);
};
z.g.Xj = function() {
  if (this.tg) {
    if (this.mf) {
      return(0,z.ij)(Error("UpdatePositions called after dispose"));
    }
    fU.w.Xj.call(this);
    this.Mh();
    var a = {scroll:!1, jg:!0};
    this.Pe ? nU(this, this.Pe, a) : lU(this, a);
  }
};
z.g.lM = function() {
  if (this.data.wa) {
    var a = this.anchors.get(this.data.wa);
    if (!a) {
      (0,z.jQ)(this, null);
    } else {
      if (!this.Jm) {
        var b = (0,z.tH)();
        b && (b = (0,z.VH)(b), (0,z.Td)(a, b) || (0,z.jQ)(this, null));
      }
    }
  }
};
z.g.C = function() {
  this.Ca.Ba("resize-end", this.Ck, this);
  this.Ca.Ba("inner-resize-end", this.Ck, this);
  this.eb.Ba("update", this.kA, this);
  this.eb.Ba("highlight", this.Wz, this);
  this.eb.Ba("twitter", this.Vz, this);
  fU.w.C.call(this);
};
(0,z.p)(qU, z.v);
qU.prototype.Zk = function(a, b, c, d, e, f) {
  return new fU(a.Oa(), b, c, d, e, f);
};
var rU = z.Oq;
rU.Oa().scope("app").add("notes", qU);
(0,z.GH)(rU, "notes");
})(_mdm);
