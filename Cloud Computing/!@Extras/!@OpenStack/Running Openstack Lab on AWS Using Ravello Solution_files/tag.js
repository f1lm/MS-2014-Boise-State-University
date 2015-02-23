// COPYRIGHT IHANCE 2007

//-------------------------------------------------------------------------------
var _ihance_cid  = "4469"
var _ihance_host = "http://www7.ravellosystems.com/";
//-------------------------------------------------------------------------------

var _ihance_prev = null;
var _ihance_kIgnoreLeads = false;

/***************************************
 * Standard tag; notifies of page load *
 ***************************************/
function _loadihimg(url) {
    if ("https:" == document.location.protocol) return;
    var img = document.createElement('IMG');
    document.body.appendChild(img);
    img.width = 0;
    img.height = 0;
    img.src = url;
}

function _shouldlog(cid) {
    if (!_ihance_kIgnoreLeads) return true;
    if (new String(document.URL).lastIndexOf(cid + '_rm_id=') != -1) return true;
    var cookies = document.cookie.split(";");
    for (var i=0; i<cookies.length; i++) {
        if (cookies[i].indexOf('status=1') != -1) return true;
    }
    return false;
}

function _ihlog(cid, loghost) {
    if (document == null || document.URL == null) return;
    if (!_shouldlog(cid)) return;

    var pv_lbl = "";
    if (document.URL != document.title && document.title != null) {
        pv_lbl = document.title;
    }

    var url = loghost + "/pv.aspx?cid=" + cid
        + "&pv_url=" + escape(document.URL)
        + "&pv_ref=" + escape(document.referrer)
        + "&pv_lbl=" + escape(pv_lbl);

    _loadihimg(url);
}

_ihlog(_ihance_cid, _ihance_host);



/***********************************************
 * function for making an Ihance call when a   *
 * download or non-tagged page is called.      *
 ***********************************************/
function _download(durl, dtitle) {
    var pv_url = escape(durl);
    var pv_lbl = escape(dtitle);
    var pv_ref = escape(document.URL);

    if (_shouldlog(_ihance_cid)) {
        var url = _ihance_host + "/pv.aspx?cid=" + _ihance_cid
            + "&pv_url=" + pv_url
            + "&pv_ref=" + pv_ref
            + "&pv_lbl=" + pv_lbl;

        _loadihimg(url);
    }

    var newWin = window.open('', '_blank');
    newWin.location.replace(durl);
}