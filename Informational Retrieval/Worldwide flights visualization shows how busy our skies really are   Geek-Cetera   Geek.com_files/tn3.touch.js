
/*!
 * tn3 touch plugin v1.4.0.93
 * http://tn3gallery.com/
 *
 * License
 * http://tn3gallery.com/license
 *
 * Date: 15 Feb, 2013 13:23:03 +0200
 */ (function (f) {
    function e() {
        f(window);
        var b = window.innerWidth,
            a = window.innerHeight;
        b -= this.config.initValues.wDif;
        a -= this.config.initValues.hDif;
        this.resize(b, a)
    }
    f.fn.tn3.plugIn("touch", function (b, a, c) {
        "ontouchstart" in window && new f.fn.tn3.Touch(b, a, c)
    });
    f.fn.tn3.Touch = function (b, a, c) {
        this.$c = b;
        this.config = f.extend(true, {}, f.fn.tn3.Touch.config, a.touch);
        if (this.config.skin != null) if (typeof this.config.skin == "object") {
                a.skinDir = a.skinDir.substr(0, a.skinDir.lastIndexOf("/") + 1) + this.config.skin[0];
                a.cssID =
                    c.config.cssID = this.config.skin[0];
                a.skin = this.config.skin[1];
                a.skin = this.config.skin
            } else {
                a.skinDir = a.skinDir.substr(0, a.skinDir.lastIndexOf("/") + 1) + this.config.skin;
                a.skin = this.config.skin;
                a.cssID = this.config.skin;
                c.config.cssID = this.config.skin
            }
        c.config.overFadeDuration = 0;
        f.fn.tn3.dontLoad = false;
        this.$c.bind("tn3_init_start", f.proxy(this.init_start, this));
        this.$c.bind("tn3_rebuild", f.proxy(this.rebuild, this));
        this.$c.bind("tn3_init", f.proxy(this.init, this));
        if (this.metaVP = document.querySelector("meta[name=viewport]")) this.iniVP =
                this.metaVP.getAttribute("content");
        c.config.imageClick = null;
        c.config.image.transitions = [{
            type: "translate"
        }];
        c.config.image.clickEvent = "click";
        c.config.thumbnailer.overMove = false;
        c.config.thumbnailer.shaderOpacity = this.config.shaderOpacity;
        if (!c.config.spinjs) c.config.spinjs = this.config.spinjs;
        this.ofscroll = hasOverflowScrolling();
        this.tn3 = c;
        c.onFullResize = e
    };
    f.fn.tn3.Touch.config = {
        skin: "tn3t",
        fsMode: "tn3_touch_fullscreen.html",
        swipeIndex: 5,
        image: true,
        thumbnails: true,
        albums: true,
        shaderOpacity: 0,
        spinjs: {
            color: "#fff",
            hwaccel: true,
            lines: 11,
            corners: 0,
            trail: 60,
            length: 10,
            width: 3,
            radius: 8,
            zIndex: 1
        }
    };
    f.fn.tn3.Touch.prototype = {
        config: null,
        $c: null,
        iham: null,
        tham: null,
        aham: null,
        metaVP: null,
        iniVP: "",
        ofscroll: false,
        tn3: null,
        init_start: function (b) {
            var a = this;
            if (!b.source.initialized) {
                b.source.$c.bind("tn3_control", function (c) {
                    switch (c.id) {
                        case "show-info":
                            b.source.thumbnailer.$c.hide();
                            b.source.items["show-thumbs"].removeClass(b.source.config.cssID + "-show-thumbs-active");
                            b.source.config.autohideOver = !c.active;
                            break;
                        case "show-thumbs":
                            b.source.items["image-info"].hide();
                            b.source.items["show-info"].removeClass(b.source.config.cssID + "-show-info-active");
                            b.source.config.autohideOver = !c.active;
                            b.source.thumbnailer.$oc.css(b.source.thumbnailer.edge, "-1px");
                            setTimeout(function () {
                                b.source.thumbnailer.centerActive(true, true);
                                b.source.thumbnailer.$oc.css(b.source.thumbnailer.edge, "0px")
                            }, 20);
                            break;
                        case "fullscreen":
                            if (a.config.fsMode !== null) {
                                if (a.config.fsMode == "close") window.close();
                                else {
                                    var d = window.open(a.config.fsMode);
                                    d.tn3Init = f.extend(true, {}, b.source.config, {
                                        iniAlbum: b.source.cAlbum,
                                        iniImage: b.source.n,
                                        skinDir: b.source.config.skinDir.substring(0, b.source.config.skinDir.lastIndexOf("/")),
                                        data: b.source.data,
                                        init: function (g) {
                                            g.source.fullscreen()
                                        },
                                        startWithAlbums: false,
                                        isFullScreen: false,
                                        touch: {
                                            fsMode: "close",
                                            skin: "tn3t"
                                        }
                                    });
                                    for (var h = 0; h < d.tn3Init.external.length; h++) d.tn3Init.external[h].noInit = true
                                    }
                                    c.execute = false
                                }
                            }
                    }); this.config.fsMode == "hide" && b.source.$c.find(".tn3t-fullscreen").parent().remove()
                }
            }, init: function () {},
            rebuild: function (b) {
                for (var a = ["-webkit-", "-moz-", "-ms-",
                    "-o-", ""], c = 0; c < a.length; c++) if (b.source.$c.css(a[c] + "transform") != undefined) {
                        b.source.imager.ts.vendorPrefix = a[c];
                        break
                    }
                this.reset(b.source);
                this.initTouch(b.source)
            },
            reset: function (b) {
                this.isLoading = true;
                if (this.config.albums) b.albums.isTouch = true;
                if (this.config.thumbnails) b.thumbnailer.isTouch = true;
                this.iham && this.iham.destroy();
                this.tham && this.tham.destroy();
                this.aham && this.aham.destroy();
                b.imager.$c.off("img_load_start", f.proxy(this.onLoadStart, this)).off("img_load_end", f.proxy(this.onLoadEnd,
                this));
                b.imager.ts.doTranslate(b.imager.$ins, 0, 0);
                b.imager.$active = false
            },
            initTouch: function (b) {
                if (this.config.image && b.items.image) {
                    b.items.image.unbind("img_enter img_leave");
                    this.initImageTouch(b)
                }
                if (this.config.thumbnails && b.items.thumbs) {
                    b.items.thumbs.unbind("tn_over tn_out");
                    b.items.thumbs.bind("tn_thumbLoad", function (a) {
                        b.thumbnailer.lis[a.n].li.unbind("mouseenter mouseleave").bind("dragstart", function (c) {
                            c.preventDefault()
                        })
                    });
                    this.initThumbTouch(b)
                }
                this.config.albums && b.items.albums && this.initAlbumsTouch(b)
            },
            oldActive: null,
            isLoading: true,
            isTouchMove: false,
            slideNext: null,
            initImageTouch: function (b) {
                var a = b.imager,
                    c = 0,
                    d = this,
                    h = null;
                this.iham = new f.fn.tn3.TouchClass(a.$c, false, function (g) {
                    if (g.originalEvent.target.className != "tn3-in-image") return false;
                    g.originalEvent.preventDefault();
                    if (d.isLoading || a.isInTransition || a.data.length < 2) return false
                    },
                    function (g) {
                        d.oldActive = a.active;
                        d.isTouchMove = true;
                        a.ts.drag_dir = g < 0 ? "left" : "right";
                        a.show(g < 0 ? "next" : "prev");
                        var i = a.ts.drag_dir == "left" ? a.$active.width() : -a.$active.width();
                        a.ts.doTranslate(a.$buffer, i, 0);
                        a.ts.doTranslate(a.$ins, g, 0)
                    },
                    function (g) {
                        c = g;
                        a.ts.doTranslate(a.$ins, c, 0)
                    },
                    function () {
                        d.slideNext = Math.abs(a.$ins.position().left) > a.$active.width() / d.config.swipeIndex;
                        if (d.isLoading) if (d.slideNext) a.ts.doTranslate(a.$ins, c > 0 ? a.$active.width() : -a.$active.width(), 0);
                            else {
                                b.items.preloader && b.displayPreloader(false);
                                a.ts.doTranslate(a.$ins, 0, 0)
                            } else {
                                if (d.slideNext) a.initTransition();
                                else {
                                    var g = a.$active;
                                    a.$active = a.$buffer;
                                    a.$buffer = g;
                                    a.side = a.side == "right" ? "left" :
                                        "right";
                                    a.initTransition();
                                    a.active = d.oldActive;
                                    b.n = d.oldActive;
                                    a.qid = null
                                }
                                d.slideNext = null
                            }
                        d.isTouchMove = false
                    },
                    function () {
                        if (d.config.fsMode == null) if (h != null) {
                                clearTimeout(h);
                                h = null;
                                b.fullscreen()
                            } else h = setTimeout(function () {
                                    clearTimeout(h);
                                    h = null;
                                    b.areHidden ? b.imageEnter() : b.imageLeave()
                                }, 210);
                            else b.areHidden ? b.imageEnter() : b.imageLeave()
                            },
                        function () {});
                    a.$c.on("img_load_start", f.proxy(this.onLoadStart, this)).on("img_load_end", f.proxy(this.onLoadEnd, this))
                }, onLoadStart: function () {
                    this.isLoading =
                        true
                }, onLoadEnd: function (b) {
                    var a = b.source;
                    a.ts.doTranslate(a.$buffer, 0, 0);
                    if (this.isTouchMove) {
                        var c = a.ts.drag_dir == "left" ? a.$active.width() : -a.$buffer.width();
                        a.ts.doTranslate(a.$buffer, c, 0);
                        b.doTransition[0] = false
                    } else if (this.slideNext != null) {
                        if (this.slideNext) {
                            a.ts.doTranslate(a.$ins, 0, 0);
                            a.onTransitionEnd()
                        } else {
                            c = a.$active;
                            a.$active = a.$buffer;
                            a.$buffer = c;
                            a.onTransitionEnd();
                            this.n = a.active = this.oldActive;
                            a.qid = null
                        }
                        b.doTransition[0] = false;
                        this.slideNext = null
                    }
                    a.$buffer.css("visibility", "visible");
                    this.isLoading = false
                }, initThumbTouch: function (b) {
                    var a = b.thumbnailer;
                    if (this.ofscroll) {
                        a.$oc.css("overflow-x", "scroll");
                        a.$ul.css("-webkit-transform", "translateZ(0px)");
                        a.$oc.css("-webkit-overflow-scrolling", "touch")
                    } else {
                        var c = 0;
                        this.tham = new f.fn.tn3.TouchClass(a.$ul, a.isVertical, function (d) {
                            c = d.coor;
                            d.originalEvent.preventDefault()
                        }, function () {
                            c = a.$ul.position()[a.edge]
                        }, function (d) {
                            d = c + d;
                            d < 0 && d > -(a.listSize - a.containerSize) && b.imager.ts.doTranslate(a.$ul, d, a.$ul.position().top)
                        }, function () {},

                        function (d) {
                            a.clickOn(d)
                        }, function () {})
                    }
                }, initAlbumsTouch: function (b) {
                    var a = b.albums.$in,
                        c = this;
                    if (this.ofscroll) {
                        a.css("overflow-y", "scroll");
                        a.css("overflow-x", "hidden");
                        a.find("*").css("-webkit-transform", "translateZ(0px)");
                        a.css("-webkit-overflow-scrolling", "touch");
                        b.albums.$c.on("albums_click", function () {})
                    } else {
                        var d = 0,
                            h;
                        this.aham = new f.fn.tn3.TouchClass(b.albums.$c, true, function () {}, function () {
                            d = a.position().top
                        }, function (g) {
                            g = d + g;
                            h = -b.albums.lastac.position().top - b.albums.lastac.height() +
                                a.height();
                            g < 0 && g > h && b.imager.ts.doTranslate(a, 0, g)
                        }, function () {}, function (g) {
                            c.reset(b);
                            b.albums.clickOn(g)
                        }, function () {})
                    }
                }, slowdown: function (b, a, c) {
                    b = b.imager.ts.vendorPrefix;
                    a.css(b + "transition", "all 150ms ease-in 0ms");
                    a.css(b + "transform", "translate3d(" + Math.round(c / 2) + "px, 0px, 0px)")
                }
                };
                f.fn.tn3.Transitions.define({
                    type: "translate",
                    config: {
                        duration: 250,
                        direction: "auto",
                        easing: "easeOutQuint"
                    },
                    vendorPrefix: null,
                    ao: {},
                    drag_dir: null,
                    f: function (b, a, c, d) {
                        var h = this.getSlidePositions(b, c.direction ==
                            "auto" ? d : c.direction),
                            g = b.parent(),
                            i = this;
                        if (g) {
                            ipos = g.position();
                            if (ipos == undefined) ipos = {
                                    left: 0,
                                    top: 0
                            };
                            if (Math.abs(ipos.left) >= b.width()) {
                                this.stop(b, a, c);
                                g.off("webkitTransitionEnd")
                            } else {
                                if (ipos.left != 0) {
                                    this.ao.p = ipos.left;
                                    if (this.drag_dir == "left" && h.pos < 0) h.pos = 0;
                                    else if (this.drag_dir == "right" && h.pos > 0) h.pos = 0
                                    } else {
                                        this.ao.p = 0;
                                        this.doTranslate(a, d == "left" ? b.width() : -a.width(), 0)
                                    }
                                    g.one("webkitTransitionEnd", function () {
                                        i.stop(b, a, c)
                                    });
                                    g.css(this.vendorPrefix + "transition", "all 250ms ease-out 0ms");
                                    g.css(this.vendorPrefix + "transform", "translate3d(" + Math.round(-h.pos) + "px, 0px, 0px)")
                                }
                            }
                        }, stop: function (b, a) {
                            this.doTranslate(a, 0, 0);
                            this.doTranslate(b.parent(), 0, 0);
                            this.end()
                        },
                        doTranslate: function (b, a, c) {
                            b.css(this.vendorPrefix + "transition", "all 0ms").css(this.vendorPrefix + "transform", "translate3d(" + Math.round(a) + "px, " + Math.round(c) + "px, 0px)")
                        }
                    })
                })(jQuery);

            function hasOverflowScrolling() {
                var f = ["webkit", "moz", "o", "ms"],
                    e = document.createElement("div"),
                    b = false;
                document.getElementsByTagName("body")[0].appendChild(e);
                for (var a = 0; a < f.length; a++) {
                    var c = f[a];
                    e.style[c + "OverflowScrolling"] = "touch"
                }
                e.style.overflowScrolling = "touch";
                var d = window.getComputedStyle(e);
                b = !! d.overflowScrolling;
                for (a = 0; a < f.length; a++) {
                    c = f[a];
                    if (d[c + "OverflowScrolling"]) {
                        b = true;
                        break
                    }
                }
                e.parentNode.removeChild(e);
                return b
            }
            (function (f) {
                f.fn.tn3.TouchClass = function (e, b, a, c, d, h, g, i) {
                    this.$c = e;
                    this.startCB = a;
                    this.moveOneCB = c;
                    this.moveCB = d;
                    this.endCB = h;
                    this.tapCB = g;
                    this.swipeCB = i;
                    if (b) this.getDistance = this.getVDistance;
                    this.vertical = b;
                    b = ["webkit", "moz", "ms", "o", ""];
                    a = {
                        userSelect: "none",
                        touchCallout: "none",
                        userDrag: "none",
                        tapHighlightColor: "rgba(0,0,0,0)"
                    };
                    c = "";
                    for (d = 0; d < b.length; d++) for (var j in a) {
                            c = j;
                            if (b[d]) c = b[d] + c.substring(0, 1).toUpperCase() + c.substring(1);
                            e[0].style[c] = a[j]
                    }
                    this.init()
                };
                f.fn.tn3.TouchClass.prototype = {
                    $c: null,
                    config: null,
                    start: null,
                    vertical: null,
                    startCB: null,
                    moveOneCB: null,
                    moveCB: null,
                    endCB: null,
                    swipeCB: null,
                    isTap: null,
                    finger: false,
                    init: function () {
                        var e = this;
                        this.$c.on("touchstart", function (b) {
                            if (!e.finger) {
                                e.finger = true;
                                e.start = e.getPosition(b.originalEvent.touches);
                                e.isTap = true;
                                e.$c.on("touchend touchcancel", function (a) {
                                    e.end.call(e, a)
                                });
                                e.startCB({
                                    coor: e.start[e.vertical ? "top" : "left"],
                                    originalEvent: b
                                }) !== false && e.$c.one("touchmove", function (a) {
                                    e.moveOne.call(e, a)
                                })
                            }
                        })
                    },
                    moveOne: function (e) {
                        this.moveOneCB(this.getDistance(this.start,
                        this.getPosition(e.originalEvent.touches)));
                        var b = this;
                        this.$c.on("touchmove", function (a) {
                            b.move.call(b, a)
                        });
                        this.isTap = false
                    },
                    move: function (e) {
                        this.moveCB(this.getDistance(this.start, this.getPosition(e.originalEvent.touches)))
                    },
                    end: function () {
                        this.$c.off("touchmove touchend touchcancel");
                        this.isTap ? this.tapCB(this.start) : this.endCB();
                        this.finger = false
                    },
                    getPosition: function (e) {
                        return {
                            left: e.item(0).pageX,
                            top: e.item(0).pageY
                        }
                    },
                    getDistance: function (e, b) {
                        return b.left - e.left
                    },
                    getVDistance: function (e,
                    b) {
                        return b.top - e.top
                    },
                    destroy: function () {
                        this.$c.off("touchstart touchmove touchend touchcancel")
                    }
                }
            })(jQuery);