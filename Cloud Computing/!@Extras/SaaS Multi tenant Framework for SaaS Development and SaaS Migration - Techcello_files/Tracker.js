var Asc = -1;
var MXQueryParams = [];
var MXCustomVariable = '';

function pidTracker(OrgId, Domain) {
    document.cookie = 'MXCookie';

    //01 Initialize Variables
    var Referrer            = encodeURIComponent(document.referrer);
    var PageTitle           = encodeURIComponent(document.title);
    var OrgCode             = encodeURIComponent(OrgId);
    var CookieEnabled       = encodeURIComponent(document.cookie.indexOf("MXCookie") >= 0 ? 1 : 0);
    var URLProtocol         = window.location.protocol;
    var PID                 = GetCookie('ORG' + OrgId);
    var RefDomain           = (typeof (Domain) != 'undefined') ? Domain : 'web.mxradon.com';
    var CustomVariables     = encodeURIComponent(MXCustomVariable);
    var LPIds               = document.getElementsByName('MXHLandingPageId');
    var LandingPageId       = GetLandingPageId();

    //02 Create JScriptURL
    var JScriptURL = URLProtocol + '//' + RefDomain + '/t/WebTracker.aspx?p1=' + OrgCode + '&p2=' + PageTitle + '&p3=' + Asc + '&p4=' + Referrer + '&p5=' + CookieEnabled + '&p6=' + PID + '&p7=' + CustomVariables + '&p8=' + LandingPageId;

    //03 Attach script tag to document header
    var ElementHead = document.getElementsByTagName("head")[0];

    var JSScript = document.createElement('script');
    JSScript.type = 'text/javascript';
    JSScript.src = JScriptURL;

    ElementHead.appendChild(JSScript);

    if (OrgId) {
        getTopbar(OrgId);
    }
}

function GetCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

function MXPush(key, value) {
    MXCustomVariable += (key + '{=}' + value + '{next}');
}

function GetLandingPageId() {

    // 01 If Landing Page Id is set in variable "MXLandingPageId", then return that Landing Page Id
    if (typeof (MXLandingPageId) != 'undefined' && MXLandingPageId != null && MXLandingPageId != '') {
        return MXLandingPageId;
    }

    // 02 If Landing Page Id is passed in query string "lpid", then return that Landing Page Id
    loadQueryStringParams();
    var queryLandingPageId = MXQueryParams["lpid"];
    if (typeof (queryLandingPageId) != 'undefined' && queryLandingPageId != null && queryLandingPageId != '') {
        return queryLandingPageId;
    }

    return '';
}

function loadQueryStringParams() {
    var query = window.location.search.substring(1);
    var parms = query.split('&');
    for (var i = 0; i < parms.length; i++) {
        var pos = parms[i].indexOf('=');
        if (pos > 0) {
            var key = parms[i].substring(0, pos);
            var val = parms[i].substring(pos + 1);
            MXQueryParams[key] = val;
        }
    }
}


/****************************/
/* WEB EVENT TRACKER SCRIPT */
/****************************/
function logMXWebEvent(orgId, eventCode, note, score) {

    // p1 => OrgCode
    // p2 => PID
    // p3 => WebEventCode
    // p4 => AssociatedScore
    // p5 => PageTitle
    // p6 => PageReferrer
    // p7 => PageURL
    // p8 => Note
    // p9 => CookieEnabled
    // p10 => LandingPageId

    //00 Create MXCookie
    document.cookie = 'MXCookie';

    //01 Initialize Variables
    var OrgCode             = (encodeURIComponent(orgId || '')),
        PID                 = (GetCookie('ORG' + OrgCode) || ''),
        WebEventCode        = (encodeURIComponent(eventCode) || ''),
        AssociatedScore     = (score && !isNaN(score)) ? score : '',
        PageTitle           = (encodeURIComponent(document.title)),
        PageReferrer        = (encodeURIComponent(document.referrer)),
        PageURL             = (encodeURIComponent(document.location.href)),
        Note                = (encodeURIComponent(note || '')),
        CookieEnabled       = (encodeURIComponent(document.cookie.indexOf("MXCookie") >= 0 ? 1 : 0));
        LandingPageId       = GetLandingPageId();


    //02 Create JScriptURL
    var ScriptName          = 'event-tracking-script',
        URLProtocol         = window.location.protocol,
        RefDomain           = ('web.mxradon.com'),
        JScriptURL = URLProtocol + '//' + RefDomain + '/t/WebEventTracker.aspx?p1=' + OrgCode + '&p2=' + PID + '&p3=' + WebEventCode + '&p4=' + AssociatedScore + '&p5=' + PageTitle + '&p6=' + PageReferrer + '&p7=' + PageURL + '&p8=' + Note + '&p9=' + CookieEnabled + '&p10=' + LandingPageId;

    //03 Remove Event Tracking Script (if exists)
    _removeEventTrackingScript();

    //04 Attach Event Tracking Script to Head Tag
    var JSScript    = document.createElement('script');
    JSScript.type   = 'text/javascript';
    JSScript.src    = JScriptURL;
    JSScript.setAttribute('name', ScriptName);

    document.getElementsByTagName("head")[0].appendChild(JSScript);

    /*Helper Functions*/
    function _removeEventTrackingScript() {
        var Head = document.getElementsByTagName("head")[0];
        var eventTrackingScript = Head.querySelector('script[name="' + ScriptName + '"]');
        if (eventTrackingScript) {
            Head.removeChild(eventTrackingScript);
        }
    }
}


/********************************/
/* LeadSquaredTopbar Script     */
/********************************/

function getTopbar(OrgId) {

    // p1  => OrgCode
    // p2  => PageURL
    // p3  => PageReferrer
    // p4  => PageTitle
    // p5  => IsDebuggingAllowed
    // p6  => Current Time Stamp in UTC

    //01 Initialize Variables
    var Referrer = encodeURIComponent(document.referrer);
    var PageTitle = encodeURIComponent(document.title);
    var PageUrl = encodeURIComponent(location.href);
    var OrgCode = encodeURIComponent(OrgId);
    var URLProtocol = window.location.protocol;
    var RefDomain = 'web.mxradon.com';
    var currentTimeStamp = Math.round(new Date().getTime() / 1000.0);
    var WidgetType = 1; // 1. Topbar

    //02 Create JScriptURL
    var JScriptURL = URLProtocol + '//' + RefDomain + '/t/LeadSquaredWidget.aspx?p1=' + OrgCode + '&p2=' + PageUrl + '&p3=' + Referrer + '&p4=' + PageTitle + '&p5=true' + '&p6=' + currentTimeStamp + '&p7=' + WidgetType;

    //03 Attach script tag to document header
    var ElementHead = document.getElementsByTagName("head")[0];

    var JSScript = document.createElement('script');
    JSScript.type = 'text/javascript';
    JSScript.src = JScriptURL;

    ElementHead.appendChild(JSScript);
}
var MergeJSON = function (mergeWith, newObj) {
    for (var key in newObj) {
        mergeWith[key] = newObj[key];
    }
    return mergeWith;
}

function logWebEvent(orgId) {
    var mxMessage = 'Message{=}Topbar CTA button clicked by the user{mxend}WebWidgetId{=}' + mxTopbarId + '{mxend}WebWidgetName{=}' + mxTopbarName + '{mxend}';
    logMXWebEvent(orgId, '152', mxMessage);
    return true;
}

function closeLSQTopbar(orgId) {
    var topbarIframe = document.getElementById('lsqtopbar_container');
    var topbarContentWindow = topbarIframe.contentDocument || topbarIframe.contentWindow.document;
    var topbarMessage = topbarContentWindow.getElementById('topbar_message');
    var topbarLink = topbarContentWindow.getElementById('topbar_linktext')
    var topbarPusher = document.getElementById('lsqtopbar_pusher');
    var topbarLinkVal = topbarLink.href.slice(-1) === '/' ? topbarLink.href.substring(0, topbarLink.href.length - 1).trim() : topbarLink.href;
    var topbarData = {
        Message: topbarMessage.textContent.trim(),
        LinkText: topbarLink.textContent.trim(),
        LinkUrl: topbarLinkVal.trim(),
        OrgCode: orgId,
        TopbarId: mxTopbarId.trim(),
        TopbarName: mxTopbarName.trim()
    };
    var now = new Date();
    var time = now.getTime();
    var expireTime = time + 1000 * 3.15569e7 * 10; // 10 Years
    now.setTime(expireTime);
    document.cookie = "LSQTopBarCookie=" + JSON.stringify(topbarData) + ';expires=' + now.toGMTString() + ';path=/';

    topbarIframe.style.display = 'none';
    topbarPusher.style.display = 'none';
    return false;
}

