
var rmc = {
    b: {
        IE: false,
        V9: false,
        O:  false
    },
    Hovers: [],
    Fades: [],
    Xml: [],
    Xsl: [],
    MaxS: 0,
    GE: function (s) { return document.getElementById(s); },
    AE: function (o, e, r) {
        if (o == null) { return; }
        (this.b.IE) ? o.attachEvent("on" + e, r) : o.addEventListener(e, r, false);
    },
    RE: function (o, e, r) {
        if (o == null) { return; }
        (this.b.IE) ? o.detachEvent("on" + e, r) : o.removeEventListener(e, r, false);
    },
    Print: function () { window.print(); },
    Email: function (u) {
        if (!u) { u = location.href; }
        location.href = "mailto:?subject=" + ((document.title != '') ? document.title : 'Microsoft Research') + "&body=" + escape(u);
    },
    Share: function (s, u) {
        if (!u) { u = location.href; }
        u = escape(u);
        var n = "rmcshare";
        switch (s) {
            // Facebook Share  
            case "F":
                this.Open("/apps/c/1460.aspx?url=" + u + "&title=" + document.title, n, "");
                break;
            // LinkedIn Share  
            case "L":
                this.Open("/apps/c/1462.aspx?url=" + u + "&title=" + document.title, n, "");
                break;
            // Email Share 
            case "M":
                this.Open("/apps/c/1463.aspx?url=" + u + "&title=" + document.title, n, "");
                break;
            // Twitter Share    
            case "T":
                this.Open("/apps/c/1461.aspx?url=" + u + "&title=" + document.title, n, "");
                break;
        }
    },
    Open: function (u, n, f) { return window.open(u, n, f); },
    NewHover: function (o, c, dx, dy, b) { this.Hovers[o] = new this.Hover(o, c, this, dx, dy, b); },
    Hover: function (o, c, r, dx, dy, b) {
        this.Clear = function () {
            clearTimeout(t);
        }
        this.Show = function (evt) {
            z.Clear();
            if (b) {
                var e = evt.target || evt.srcElement;
                var rx = evt.layerX || evt.offsetX;
                var ry = evt.layerY || evt.offsetY;
                var px = evt.pageX || (evt.clientX + document.body.scrollLeft);
                var py = evt.pageY || (evt.clientY + document.documentElement.scrollTop);
                var ow = e.clientWidth;
                var oh = e.clientHeight;
                var x = px - rx;
                var y = py + (oh - ry);
                c.style.left = x + dx + "px";
                c.style.top = y + dy + "px";
            }
            c.style.display = "block";
        }
        this.Hide = function () {
            c.style.display = "none";
        }
        this.Out = function () {
            z.Clear();
            t = setTimeout("rmc.Hovers['" + n + "'].Hide();", z.Time);
        }
        var z = this, n = o, t = null;
        this.Time = 1000;
        o = r.GE(o);
        c = r.GE(c);
        r.AE(o, "mouseover", z.Show);
        r.AE(o, "mouseout", z.Out);
        r.AE(c, "mouseover", z.Clear);
        r.AE(c, "mouseout", z.Out);
    },
    GetXml: function (p, b, cb) {
        var x;
        try {
            x = new XMLHttpRequest();
            if (b) { x.onreadystatechange = cb; }
            x.open("GET", p, b);
        }
        catch (e) {
            x = new ActiveXObject("MSXML2.DOMDocument");
            x.async = false;
        }
        return x;
    },
    AddXml: function (n, p, cb, b) {
        this.Xml[n] = this.GetXml(p, b, cb);
        try {
            this.Xml[n].send(null);
            if (!b && cb != null) { cb(); }
        }
        catch (e) {
            this.Xml[n].load(p);
            cb();
        }
    },
    AddXsl: function (n, p) {
        if (this.b.IE) {
            var x = this.GetXml(p, false);
            try {
                x.send(null);
                this.Xsl[n] = x.responseXML;
            }
            catch (e) {
                x.load(p);
                this.Xsl[n] = x;
            }
        }
        else {
            this.Xsl[n] = new XSLTProcessor();
            try {
                var w = this.GetXml(p);
                w.send(null);
                this.Xsl[n].importStylesheet(w.responseXML);
            }
            catch (e) {
                // xsl error
            }
        }
    },
    Transform: function (x, s) {
        if (this.b.IE) {
            return x.transformNode(s);
        }
        else {
            var xs = new XMLSerializer();
            return xs.serializeToString(s.transformToFragment(x, document));
        }
    },
    Search: {
        Focus: function (o) {
            o.value = "";
            o.style.color = "#000";
            o.style.fontStyle = "normal";
        },
        Blur: function (o) {
            if (o.value == "") {
                o.value = "Search Microsoft Research";
                o.style.color = "#bbb";
                o.style.fontStyle = "italic";
            }
        },
        Submit: function () {
            var q = rmc.GE("cst");
            if (q != null && q.value != "Search Microsoft Research" && q.value != "") {
                var f = rmc.GE("csf");
                if (f != null) { f.submit(); }
            }
        }
    },
    BreadCrumb: function (o) {
        var h, s = "";
        if ((h = this.GE("bcHolder")) == null) { return; }
        for (var i in o) {
            s += " > ";
            if (o[i].u != null) {
                s += "<a href='" + o[i].u + "'>" + o[i].t + "</a>";
            }
            else { s += o[i].t; }
        }
        h.innerHTML = s;
    },
    PageDepth: function () {
        if (document.documentElement) {
            var de = document.documentElement;
            var p = "http://" + location.host + "/a/bi.txt?t=2&e=0&v=" + de.clientHeight + "," + de.scrollHeight + "," + rmc.MaxS;
            rmc.AddXml("bi", p, null, false);
        }
    },
    MaxScroll: function () {
        if (document.documentElement) {
            var x = document.documentElement.scrollTop;
            if (x > rmc.MaxS) { rmc.MaxS = x; }
        }
    },
    DOE: function (s) {
        s = s.replace(/&lt;/gi, "<");
        s = s.replace(/&gt;/gi, ">");
        return s;
    },
    NewFade: function (name, holder, buttons, control, amnt) { this.Fades[name] = new this.Fade(name, holder, buttons, control, amnt); },
    Fade: function (name, holder, buttons, control, amnt) {
        var timer = null;
        holder = rmc.GE(holder);
        if (holder == null) { return; }
        buttons = rmc.GE(buttons);
        control = rmc.GE(control);
        var intervalChange = 20;
        var intervalChild = 7000;
        var amountChange = 3.5;
        var children = holder.children;
        var currentChild = 0;
        var currentPercent = 0;
        var timerAmount = intervalChild;
        var toggled = false;

        var setTimer = function () { timer = setTimeout("rmc.Fades['" + name + "'].Update();", timerAmount); }
        var nextChild = function () { return (currentChild + 1 > children.length - 1) ? 0 : currentChild + 1; }
        var setOpacity = function (o, i, f) {
            o = o.children[0];
            (rmc.b.IE && !rmc.b.V9) ? o.style.filter = "alpha(opacity=" + i + ")" : o.style.opacity = f;
            o.style.display = (i <= 0) ? "none" : "block";
        }
        var toggleButtons = function (c, n) {
            if (buttons == null) { return; }
            buttons.children[c].className = "";
            buttons.children[n].className = "sel";
        }
        var PauseMouse = function () {
            clearTimeout(timer);
            if (control != null) {
                control.children[1].style.display = "none";
                control.children[0].style.display = "block";
            }
        }
        var PlayMouse = function () {
            if (control != null) {
                control.children[0].style.display = "none";
                control.children[1].style.display = "block";
            }
            setTimer();
        }

        this.Play = function () {
            rmc.AE(holder, "mouseover", PauseMouse);
            rmc.AE(holder, "mouseout", PlayMouse);
            PlayMouse();
        }
        this.Pause = function () {
            rmc.RE(holder, "mouseover", PauseMouse);
            rmc.RE(holder, "mouseout", PlayMouse);
            PauseMouse();
        }
        this.Update = function () {
            if (currentPercent == 0) { timerAmount = intervalChange; }
            else if (currentPercent > 100) {
                timerAmount = intervalChild;
                currentChild = nextChild();
                currentPercent = 0;
                setTimer();
                toggled = false;
                return;
            }
            currentPercent += amountChange;
            if (!toggled && currentPercent > 5) { toggleButtons(currentChild, nextChild()); toggled = true; }
            setOpacity(children[nextChild()], currentPercent, (currentPercent / 100));
            setOpacity(children[currentChild], (100 - currentPercent), 1 - (currentPercent / 100));
            setTimer();
        }
        this.GoTo = function (evt) {
            var n;
            for (n = 0; n < buttons.children.length; n++) {
                var e = evt.target || evt.srcElement;
                if (e === buttons.children[n]) { break; }
            }
            clearTimeout(timer);
            setOpacity(children[nextChild()], 0, 0);
            setOpacity(children[currentChild], 0, 0);
            setOpacity(children[n], 100, 1);
            toggleButtons(currentChild, n);
            currentChild = n;
            timerAmout = intervalChild;
            setTimer();
        }
        var z = this;
        if (buttons != null && holder.children.length > 1) {
            if (amnt > 0 && amnt < children.length) {
                // remove an amout of random children
                while (children.length > amnt) {
                    var r = parseInt(Math.random() * children.length);
                    holder.removeChild(children[r]);
                }
                children[0].children[0].className = "";
            }
            for (var x = 0; x < holder.children.length; x++) {
                var d = document.createElement("div");
                if (x == 0) { d.className = "sel"; }
                rmc.AE(d, "click", z.GoTo);
                buttons.appendChild(d);
            }
        }
        if (control != null) {
            rmc.AE(control.children[0], "click", z.Play);
            rmc.AE(control.children[1], "click", z.Pause);
        }
    },
    Translator: {
        CurrentLanguage: "en",
        FillLanguages: function () {
            var s = document.getElementById("selLang");
            var langIds = Microsoft.Translator.getLanguages();
            var langNames = Microsoft.Translator.getLanguageNames("en");
            for (var i in langIds) {
                if (langIds[i].toLowerCase() == "en")
                    continue;
                var o = document.createElement("option");
                if (i == 0) {
                    o.text = "Choose language";
                    s.appendChild(o);

                    o = document.createElement("option");
                    o.value = "en";
                    o.text = "Original";
                    s.appendChild(o);
                    o = document.createElement("option");
                }
                o.value = langIds[i];
                o.text = langNames[i];
                s.appendChild(o);
            }
        },
        Translate: function () {
            var s = document.getElementById("selLang");
            var p = "t=3&l=" + rmc.Translator.CurrentLanguage + "-";
            if (s.selectedIndex == 0) return;
            if (s.options[s.selectedIndex].value.toLowerCase() == "en")
                location.reload();
            var boop = Microsoft.Translator.Translate(document.body, rmc.Translator.CurrentLanguage, s.options[s.selectedIndex].value);
            rmc.Translator.CurrentLanguage = s.options[s.selectedIndex].value;
            var i = new Image();
            i.src = "/a/bi.txt?" + p + rmc.Translator.CurrentLanguage;
            return;

            document.getElementById("tProgress").innerText;
            boop.addProgressEvent(function (progress) {
                document.getElementById("tProgress").innerText = progress.toFixed(0).toString() + "%";
            });

        }
    }
};

function OpenFeedback() {
    var cci = rmc.GE("clickCountImg");
    if (cci != null) { cci.src = "/c/1455"; }
    rmc.Open("/apps/feedback/Feedback.aspx", "popwindow", "width=500px,height=540px,status=0,directories=0");
}
