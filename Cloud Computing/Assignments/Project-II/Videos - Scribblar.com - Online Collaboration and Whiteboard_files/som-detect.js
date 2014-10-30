// Copyright (c) 2014 Big Nerd Software, LLC
// ALL RIGHTS RESERVED
//
// For more details read corresponding txt file

var _somWinJavaInstallUrl = 'http://screencast-o-matic.com/som_redirect_latest_java_install_exe';
var _somWinJavaCabInstallUrl = 'http://screencast-o-matic.com/som_redirect_latest_java_install_cab';
var _somDetectOptions;

function somDetect(options) {
    _somDetectOptions = options;

    var b = navigator.userAgent.toLowerCase();
    var isWin = b.indexOf("windows")>0;
    var isMac = b.indexOf("mac")>0;
    var isMacNeedsCheck = isMac && !(b.indexOf("10_5")>0 || b.indexOf("10.5")>0);
    var isIE = b.indexOf("msie")>0 || !!navigator.userAgent.match(/Trident\//);
    var isFireFox = b.indexOf("firefox")>0;
    var isChrome = b.indexOf("chrome")>0;
    var isSafari = !isChrome && b.indexOf("safari")>0;
    var isChromeOS = navigator.userAgent.indexOf('CrOS')>0;

    if (isChromeOS) {
        setTimeout(function() {
            _somDetectOptions.callback('chromeBookNotSupported');
        },100);
        return;
    }

    if (!navigator.javaEnabled() && (!isFireFox || _somIsPluginDetected())) {
        setTimeout(function() {
            _somDetectOptions.callback('javaDisabled');
        },100);
        return;
    }

    if (_somIsDetectSuccessCookieSet()) {
        setTimeout(function() {
            _somDetectReady();
        },100);
        return;
    }

    var iframeSrc = 'som-detect-';
    if (_somDetectOptions.path)
        iframeSrc = _somDetectOptions.path + iframeSrc;

    if (isWin) {
        iframeSrc += 'win-';
        if (isFireFox) {
            iframeSrc += "firefox.html";
        }
        else if (isChrome) {
            iframeSrc += "chrome.html";
        }
        else if (isIE) {
            iframeSrc += "ie.html";
        }
        else {
            // For any other browser we just try to detect the plugin or fail.
            setTimeout(function() {
                _somDetectOptions.callback(_somIsPluginDetected() ? 'success' : 'javaNotDetected');
            },100);
            return;
        }
    }
    else if (isMacNeedsCheck) {
        iframeSrc += 'mac-lion.html';
    }
    else {
        // Mac older than 10.6 and any other browsers besides ff/ie/chrome...
        setTimeout(function() {
            _somDetectOptions.callback(_somIsPluginDetected() ? 'success' : 'javaNotDetected');
        },100);
        return;
    }

    var div = document.getElementById('somDetectContainer');
    if (!div) {
        div = document.createElement('div');
        div.id = 'somDetectContainer';
        document.body.appendChild(div);
    }

    div.innerHTML = '<iframe frameborder="0" scrolling="no" width="1" height="1" src="'+iframeSrc+'"></iframe>';
}

function somDetectShowMacLionInstall(id) {
    var div = document.getElementById(id);

    var iframeSrc = 'som-detect-mac-lion-install.html';
    if (_somDetectOptions.path)
        iframeSrc = _somDetectOptions.path + iframeSrc;

    div.innerHTML = '<iframe frameborder="0" scrolling="no" width="150" height="60" src="'+iframeSrc+'"></iframe>';
}

function _somDetectReady() {
    _somSetDetectSuccessCookie();
    _somDetectOptions.callback('success');
}

function _somDetectLionNeedsInstall() {
    _somDetectOptions.callback('macLionNeedsInstall');
}

function _somIsPluginDetected() {
    java_installed = false;
    if (navigator.plugins && navigator.plugins.length)
    {
        for (x = 0; x <navigator.plugins.length; x++)
        {
            plugin_name = navigator.plugins[x].name;
            if (plugin_name.indexOf('Java Deployment Toolkit') != -1)
                continue;

            if (plugin_name.indexOf('Java(TM)') != -1)
            {
                java_installed = true;
                break;
            }
            else if (plugin_name.indexOf('Java ') != -1)
            {
                java_installed = true;
                break;
            }
        }
    }
    return java_installed;
}

var _somDetectCookieName = "somDetectSuccess3";

function _somSetDetectSuccessCookie() {
    var date = new Date();
    date.setTime(date.getTime()+(30*24*60*60*1000));
	var expires = date.toGMTString();
    document.cookie = _somDetectCookieName+"=true; expires="+expires+"; path=/";
}

function _somIsDetectSuccessCookieSet() {
  return document.cookie.indexOf(_somDetectCookieName+"=true")>0;
}
