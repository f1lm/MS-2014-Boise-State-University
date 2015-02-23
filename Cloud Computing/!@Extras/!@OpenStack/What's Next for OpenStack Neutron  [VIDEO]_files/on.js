

var onswipe = {"host":"http://synapse4.onswipe.com","redirectUrl":"nr","redirectReason":"no reason","canonicalHost":"","paramsWhitelist":[],"standalone":false,"debug":false};


onswipe.whitelistedParams = function() {
  if (!onswipe.paramsWhitelist.length) {
    return false;
  }
  return onswipe.paramsWhitelist.join('&');
};

onswipe.debug = false; // flag to enable debug logs

onswipe.triggerRedirect = function(url) {
    var redirect = url;
    if (redirect.indexOf('?') < 0)
      redirect += '?';
    else
      redirect += '&';

    var campaignParams = onswipe.whitelistedParams();
    if (campaignParams && campaignParams.length) {
      redirect += campaignParams + '&';
    }
    redirect += 'origin=' + encodeURIComponent(window.location);
    redirect += '&oswts=' + Date.now(); // timing query param to track time-to-content as well as synapse to width/height redirection
    if (top === self) {
      window.location = redirect;
    } else {
      self.parent.location = redirect;
    }

};

onswipe.getQueryParamDelimiter = function(url) {
    if (url.indexOf('?') < 0) {
      return '?';
    } else {
      return '&';
    }
};


if (navigator && navigator.standalone) {
  onswipe.standalone = true;
}

try {
  if (onswipe.redirectUrl !== 'nr') {
    if (document.referrer) {
      onswipe.referrer = document.referrer;
    } else {
      onswipe.referrer = '';
    }
    // check to see if there is an onswipe_redirect in the query params, as this can mean that we are in an infinite redirect
    var onswipeRedirectRegex = /onswipe_redirect[=%DF235]{1,5}(no|never)/ig
    var onswipeOptoutRegex = /onswipe_redirect[=%DF235]{1,5}never/ig  // matches query param for optouts only
    if (onswipeRedirectRegex.test(onswipe.redirectUrl)) { // abort redirect, redirect loop detected
        if (onswipe.debug && console)
            console.log('potential redirect loop detected. redirect aborted');
    } else if (onswipeOptoutRegex.test(onswipe.referrer)) { // this is to help prevent users from getting redirected back to the experience when they have opted out and cookies are disabled
        if (onswipe.debug && console)
            console.log('optout never detected in referrer so preventing redirect');
        var currentUrl = window.location;
        var cookiesEnabled = navigator.cookieEnabled || ("cookie" in document && (document.cookie.length > 0 || (document.cookie = "test").indexOf.call(document.cookie, "test") > -1));
        if (!onswipeRedirectRegex.test(currentUrl) && !cookiesEnabled) { // verify that the current document doesn't already have an onswipe_redirect param
            var delimiter = onswipe.getQueryParamDelimiter(currentUrl);
            var supressedRedirectUrl = currentUrl + delimiter + 'onswipe_redirect=never';
            console.log('triggering redirect to the current page with onswipe_redirect=never appended to prevent future redirects in this session: ' + supressedRedirectUrl);
            window.location = supressedRedirectUrl;
        }
    } else { // we should redirect
        var redirectBaseUrl = onswipe.redirectUrl;
        if (onswipe.referrer) {
            redirectBaseUrl += ((~redirectBaseUrl.indexOf('?') ? '&' : '?') + 'ref=' + encodeURIComponent(onswipe.referrer));  //you need parens around ternary
        }
        if (onswipe.debug && console)
            console.log('triggeringRedirect: ' + redirectBaseUrl);
        onswipe.triggerRedirect(redirectBaseUrl);
    }
  } else { // this is a 'nr' -- no redirect
    if (onswipe.debug && console)
        console.log('no redirect');
  }
} catch(e) {
  console.log('error redirecting: ' + e.message);
}

