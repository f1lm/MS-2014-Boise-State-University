window.picoModal = function (a, b) {
    "use strict";
    var c = function () {
        var b = [];
        return {
            w: function (a) {
                b.push(a)
            },
            t: function () {
                for (var c = 0; c < b.length; c++) a.setTimeout(b[c], 1)
            }
        }
    }, d = function (a) {
            var c = b.createElement("div");
            (a || b.body).appendChild(c);
            var e = {
                e: c,
                c: function () {
                    return d(c)
                },
                s: function (a) {
                    a = a || {}, "undefined" != typeof a.opacity && (a.filter = "alpha(opacity=" + 100 * a.opacity + ")");
                    for (var b in a) a.hasOwnProperty(b) && (c.style[b] = a[b]);
                    return e
                },
                z: function (a) {
                    return c.className += a, e
                },
                h: function (a) {
                    return c.innerHTML = a, e
                },
                d: function () {
                    return c.clientWidth
                },
                o: function (a) {
                    return c.attachEvent ? c.attachEvent("onclick", a) : c.addEventListener("click", a), e
                },
                x: function () {
                    return b.body.removeChild(c), e
                }
            };
            return e
        }, e = function (a) {
            var b = c(),
                e = d().z("pico-overlay").s({
                    display: "block",
                    position: "fixed",
                    top: "0px",
                    left: "0px",
                    height: "100%",
                    width: "100%",
                    opacity: .5,
                    zIndex: 1e4,
                    background: "#000"
                }).s(a).o(b.t);
            return {
                e: e.e,
                x: e.x,
                o: b.w
            }
        };
    return function (a) {
        function b(b, c) {
            return "undefined" == typeof a[b] ? c : a[b]
        }
        "string" == typeof a && (a = {
            content: a
        });
        var f = e(a.overlayStyles),
            g = c(),
            h = d().z("pico-content").s({
                display: "block",
                position: "fixed",
                zIndex: 10001,
                left: "50%",
                top: "20%",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "5px"
            }).h(a.content),
            i = b("width", h.d());
        h.s({
            width: i -50 + "px",
            margin: "0 0 0 " + (-(i / 2) + "px")
        }).s(b("modalStyles"));
        var j = function () {
            g.t(), f.x(), h.x()
        };
        b("overlayClose", !0) && f.o(j);
        var k;
        return b("closeButton", !0) && (k = h.c().h("&#xD7;").z("pico-close").s({
            borderRadius: "2px",
            cursor: "pointer",
            height: "15px",
            width: "15px",
            position: "absolute",
            top: "5px",
            right: "5px",
            fontSize: "16px",
            textAlign: "center",
            lineHeight: "15px",
            background: "#CCC"
        }).s(b("closeStyles")).o(j)), {
            modalElem: h.e,
            closeElem: k ? k.e : null,
            overlayElem: f.e,
            close: j,
            onClose: g.w
        }
    }
}(window, document);