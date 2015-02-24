﻿
/*
 * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */ (function ($, p) {
    var i, m = Array.prototype.slice,
        r = decodeURIComponent,
        a = $.param,
        c, l, v, b = $.bbq = $.bbq || {}, q, u, j, e = $.event.special,
        d = "hashchange",
        A = "querystring",
        D = "fragment",
        y = "elemUrlAttr",
        g = "location",
        k = "href",
        t = "src",
        x = /^.*\?|#.*$/g,
        w = /^.*\#/,
        h, C = {};

    function E(F) {
        return typeof F === "string"
    }
    function B(G) {
        var F = m.call(arguments, 1);
        return function () {
            return G.apply(this, F.concat(m.call(arguments)))
        }
    }
    function n(F) {
        return F.replace(/^[^#]*#?(.*)$/, "$1")
    }
    function o(F) {
        return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1")
    }
    function f(H, M, F, I, G) {
        var O, L, K, N, J;
        if (I !== i) {
            K = F.match(H ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/);
            J = K[3] || "";
            if (G === 2 && E(I)) {
                L = I.replace(H ? w : x, "")
            } else {
                N = l(K[2]);
                I = E(I) ? l[H ? D : A](I) : I;
                L = G === 2 ? I : G === 1 ? $.extend({}, I, N) : $.extend({}, N, I);
                L = a(L);
                if (H) {
                    L = L.replace(h, r)
                }
            }
            O = K[1] + (H ? "#" : L || !K[1] ? "?" : "") + L + J
        } else {
            O = M(F !== i ? F : p[g][k])
        }
        return O
    }
    a[A] = B(f, 0, o);
    a[D] = c = B(f, 1, n);
    c.noEscape = function (G) {
        G = G || "";
        var F = $.map(G.split(""), encodeURIComponent);
        h = new RegExp(F.join("|"), "g")
    };
    c.noEscape(",/");
    $.deparam = l = function (I, F) {
        var H = {}, G = {
                "true": !0,
                "false": !1,
                "null": null
            };
        $.each(I.replace(/\+/g, " ").split("&"), function (L, Q) {
            var K = Q.split("="),
                P = r(K[0]),
                J, O = H,
                M = 0,
                R = P.split("]["),
                N = R.length - 1;
            if (/\[/.test(R[0]) && /\]$/.test(R[N])) {
                R[N] = R[N].replace(/\]$/, "");
                R = R.shift().split("[").concat(R);
                N = R.length - 1
            } else {
                N = 0
            }
            if (K.length === 2) {
                J = r(K[1]);
                if (F) {
                    J = J && !isNaN(J) ? +J : J === "undefined" ? i : G[J] !== i ? G[J] : J
                }
                if (N) {
                    for (; M <= N; M++) {
                        P = R[M] === "" ? O.length : R[M];
                        O = O[P] = M < N ? O[P] || (R[M + 1] && isNaN(R[M + 1]) ? {} : []) : J
                    }
                } else {
                    if ($.isArray(H[P])) {
                        H[P].push(J)
                    } else {
                        if (H[P] !== i) {
                            H[P] = [H[P], J]
                        } else {
                            H[P] = J
                        }
                    }
                }
            } else {
                if (P) {
                    H[P] = F ? i : ""
                }
            }
        });
        return H
    };

    function z(H, F, G) {
        if (F === i || typeof F === "boolean") {
            G = F;
            F = a[H ? D : A]()
        } else {
            F = E(F) ? F.replace(H ? w : x, "") : F
        }
        return l(F, G)
    }
    l[A] = B(z, 0);
    l[D] = v = B(z, 1);
    $[y] || ($[y] = function (F) {
        return $.extend(C, F)
    })({
        a: k,
        base: k,
        iframe: t,
        img: t,
        input: t,
        form: "action",
        link: k,
        script: t
    });
    j = $[y];

    function s(I, G, H, F) {
        if (!E(H) && typeof H !== "object") {
            F = H;
            H = G;
            G = i
        }
        return this.each(function () {
            var L = $(this),
                J = G || j()[(this.nodeName || "").toLowerCase()] || "",
                K = J && L.attr(J) || "";
            L.attr(J, a[I](K, H, F))
        })
    }
    $.fn[A] = B(s, A);
    $.fn[D] = B(s, D);
    b.pushState = q = function (I, F) {
        if (E(I) && /^#/.test(I) && F === i) {
            F = 2
        }
        var H = I !== i,
            G = c(p[g][k], H ? I : {}, H ? F : 2);
        p[g][k] = G + (/#/.test(G) ? "" : "#")
    };
    b.getState = u = function (F, G) {
        return F === i || typeof F === "boolean" ? v(F) : v(G)[F]
    };
    b.removeState = function (F) {
        var G = {};
        if (F !== i) {
            G = u();
            $.each($.isArray(F) ? F : arguments, function (I, H) {
                delete G[H]
            })
        }
        q(G, 2)
    };
    e[d] = $.extend(e[d], {
        add: function (F) {
            var H;

            function G(J) {
                var I = J[D] = c();
                J.getState = function (K, L) {
                    return K === i || typeof K === "boolean" ? l(I, K) : l(I, L)[K]
                };
                H.apply(this, arguments)
            }
            if ($.isFunction(F)) {
                H = F;
                return G
            } else {
                H = F.handler;
                F.handler = G
            }
        }
    })
})(jQuery, this);
/*
 * jQuery hashchange event - v1.2 - 2/11/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */ (function ($, i, b) {
    var j, k = $.event.special,
        c = "location",
        d = "hashchange",
        l = "href",
        f = $.browser,
        g = document.documentMode,
        h = f.msie && (g === b || g < 8),
        e = "on" + d in i && !h;

    function a(m) {
        m = m || i[c][l];
        return m.replace(/^[^#]*#?(.*)$/, "$1")
    }
    $[d + "Delay"] = 100;
    k[d] = $.extend(k[d], {
        setup: function () {
            if (e) {
                return false
            }
            $(j.start)
        },
        teardown: function () {
            if (e) {
                return false
            }
            $(j.stop)
        }
    });
    j = (function () {
        var m = {}, r, n, o, q;

        function p() {
            o = q = function (s) {
                return s
            };
            if (h) {
                n = $('<iframe src="javascript:0"/>').hide().insertAfter("body")[0].contentWindow;
                q = function () {
                    return a(n.document[c][l])
                };
                o = function (u, s) {
                    if (u !== s) {
                        var t = n.document;
                        t.open().close();
                        t[c].hash = "#" + u
                    }
                };
                o(a())
            }
        }
        m.start = function () {
            if (r) {
                return
            }
            var t = a();
            o || p();
            (function s() {
                var v = a(),
                    u = q(t);
                if (v !== t) {
                    o(t = v, u);
                    $(i).trigger(d)
                } else {
                    if (u !== t) {
                        i[c][l] = i[c][l].replace(/#.*/, "") + "#" + u
                    }
                }
                r = setTimeout(s, $[d + "Delay"])
            })()
        };
        m.stop = function () {
            if (!n) {
                r && clearTimeout(r);
                r = 0
            }
        };
        return m
    })()
})(jQuery, this);﻿
/*!
 * tn3 history plugin v1.3.0.52
 * http://tn3gallery.com/
 *
 * License
 * http://tn3gallery.com/license
 *
 * Date: 07 Sep, 2012 12:33:07 +0300
 */ (function (c) {
    function g(a, b) {
        for (var d = 0; d < b.length; d++) if (b[d].slug == a) return true;
        return false
    }
    var h = 0;
    c.fn.tn3.plugIn("history", function (a, b) {
        new c.fn.tn3.History(a, b)
    });
    c.fn.tn3.History = function (a, b) {
        this.$c = a;
        this.config = c.extend(true, {}, c.fn.tn3.History.config, b.history);
        this.init()
    };
    c.fn.tn3.History.config = {
        slugField: "title",
        key: "tn3",
        delimiter: "/",
        from: "\u00b7/_,:;",
        to: "------"
    };
    c.fn.tn3.History.prototype = {
        config: null,
        $c: null,
        tn3: null,
        instance: null,
        data: null,
        state: null,
        reslug: null,
        stateCache: null,
        init: function () {
            this.instance = h;
            h++;
            this.$c.bind("tn3_init_start", c.proxy(this.tn3InitStart, this));
            this.$c.bind("tn3_init", c.proxy(this.tn3Init, this));
            this.$c.bind("tn3_rebuild", c.proxy(this.tn3Rebuild, this));
            c(window).bind("hashchange", c.proxy(this.hashchange, this))
        },
        tn3InitStart: function (a) {
            this.tn3 = a.source;
            this.createAlbumSlugs(this.tn3.data, this.config.slugField);
            this.data = this.tn3.data;
            a = this.getPosition();
            if (c.isArray(a)) {
                this.tn3.config.iniAlbum = a[0];
                this.tn3.config.iniImage = a[1]
            }
        },
        tn3Init: function () {
            this.tn3.items.albums.bind("albums_click",
            c.proxy(this.tn3AlbumsClick, this));
            this.tn3.items.albums.bind("albums_close", c.proxy(this.tn3AlbumsClose, this));
            this.tn3.items.albums.bind("albums_init", c.proxy(this.tn3AlbumsInit, this));
            this.tn3.items.image.bind("img_load_end", c.proxy(this.tn3ImageLoadEnd, this));
            this.$c.bind("tn3_fullscreen", c.proxy(this.setState, this));
            this.state.length >= 2 && this.showImage(this.getPosition())
        },
        tn3AlbumsClick: function (a) {
            if (this.data[a.n].imgs == undefined) {
                this.state = [this.data[a.n].slug];
                this.reslug = a.n
            } else this.state = [this.data[a.n].slug, this.data[a.n].imgs[0].slug];
            this.setState()
        },
        tn3AlbumsInit: function () {
            this.state = ["albums"];
            this.setState()
        },
        tn3AlbumsClose: function () {
            this.state = [this.data[this.tn3.cAlbum].slug, this.data[this.tn3.cAlbum].imgs[this.tn3.n].slug];
            this.setState()
        },
        tn3ImageLoadEnd: function (a) {
            this.state[1] = this.data[this.tn3.cAlbum].imgs[a.n].slug;
            this.setState()
        },
        tn3Rebuild: function (a) {
            if (this.reslug === a.album) {
                this.createImageSlugs(this.tn3.data[a.album].imgs, this.config.slugField);
                if (this.stateCache !==
                    null) {
                    this.state = [this.data[this.reslug].slug, this.stateCache];
                    this.setState();
                    this.hashchange();
                    this.stateCache = null
                } else {
                    this.getPosition();
                    this.setState()
                }
                this.reslug = null
            }
        },
        setState: function () {
            var a = this.config.key ? this.config.key + "=" : "",
                b = this.state.join(this.config.delimiter);
            if (this.tn3.config.isFullScreen) b += this.config.delimiter;
            c.bbq.pushState(a + b)
        },
        hashchange: function () {
            var a = this.getPosition();
            if (a == "albums") this.tn3.albums.enabled || this.tn3.albums.show();
            else this.data[this.tn3.cAlbum].imgs !==
                    undefined && this.showImage(a)
            }, showImage: function (a) {
                if (a != "albums") if (this.tn3.cAlbum != a[0]) this.tn3.showAlbum(a[0], a[1]);
                    else this.tn3.imager.active != a[1] && this.tn3.imager.show(a[1]);
                c.bbq.getState(this.config.key).substr(-1) == this.config.delimiter && !this.tn3.config.isFullScreen && this.tn3.fullscreen()
            },
            getPosition: function () {
                var a = c.bbq.getState(this.config.key);
                if (a) {
                    this.state = a.split(this.config.delimiter);
                    if (a == "albums") return "albums";
                    this.state.splice(2, 2);
                    for (a = 0; a < this.data.length; a++) if (this.data[a].slug ==
                            this.state[0]) {
                            if (this.data[a].imgs == undefined) {
                                this.reslug = a;
                                this.stateCache = this.state[1];
                                return [a, 0]
                            }
                            for (var b = 0; b < this.data[a].imgs.length; b++) if (this.data[a].imgs[b].slug == this.state[1]) return [a, b];
                            return [a, 0]
                        }
                    return "albums"
                } else if (this.tn3.config.startWithAlbums) {
                    this.tn3AlbumsInit();
                    return "albums"
                }
                a = [this.tn3.config.iniAlbum, this.tn3.config.iniImage];
                if (this.data[a[0]].imgs == undefined) {
                    this.state = [this.data[a[0]].slug];
                    this.reslug = a[0]
                } else this.state = [this.data[a[0]].slug, this.data[a[0]].imgs[a[1]].slug];
                return a
            },
            createAlbumSlugs: function (a, b) {
                var d = this;
                c.each(a, function (e, f) {
                    f.slug = f[b] == undefined ? e.toString() : d.slugIt(f[b], a, e);
                    f.imgs && d.createImageSlugs(f.imgs, b)
                })
            },
            createImageSlugs: function (a, b) {
                var d = this;
                c.each(a, function (e, f) {
                    f.slug = f[b] == undefined ? e.toString() : d.slugIt(f[b], a, e)
                })
            },
            slugIt: function (a, b, d) {
                a = a.replace(/^\s+|\s+$/g, "");
                a = a.toLowerCase();
                for (var e = 0, f = this.config.from.length; e < f; e++) a = a.replace(RegExp(this.config.from.charAt(e), "g"), this.config.to.charAt(e));
                a = a.replace(/[^a-z0-9 -]/g,
                    "").replace(/\s+/g, "-").replace(/-+/g, "-");
                if (a == "") a = d.toString();
                else if (g(a, b)) {
                    d = a + "0";
                    for (e = 1; g(d, b);) {
                        d = a + e;
                        e++
                    }
                    a = d
                }
                return a
            }
        }
    })(jQuery);