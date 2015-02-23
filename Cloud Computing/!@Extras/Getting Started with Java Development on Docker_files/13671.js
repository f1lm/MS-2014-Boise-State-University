// asciinema.org - embeddable player

(function() {
  var apiHost = "https://asciinema.org";
  var apiUrl = apiHost + '/api';
  var iframe;

  function receiveSize(e) {
    if (e.origin === apiHost) {
      var event = e.data[0];
      var data  = e.data[1];
      if (event == 'asciicast:size' && data.id == 13671) {
        iframe.style.width  = '' + data.width + 'px';
        iframe.style.height = '' + data.height + 'px';
      }
    }
  }

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  function params(container, script) {
    var params = [];

    var size = script.getAttribute('data-size');
    if (size) {
      params = params.concat(['size=' + size]);
    }
    var speed = script.getAttribute('data-speed');
    if (speed) {
      params = params.concat(['speed=' + speed]);
    }
    var autoplay = script.getAttribute('data-autoplay');
    if (autoplay) {
      params = params.concat(['autoplay=' + autoplay]);
    }
    var loop = script.getAttribute('data-loop');
    if (loop) {
      params = params.concat(['loop=' + loop]);
    }
    var theme = script.getAttribute('data-theme');
    if (theme) {
      params = params.concat(['theme=' + theme]);
    }

    return '?' + params.join('&');
  }

  function insertPlayer(script) {
    var container = document.createElement('div');
    container.id = "asciicast-container-13671";
    container.className = 'asciicast';
    container.style.display = 'block';
    container.style.float = 'none';
    container.style.overflow = 'hidden';
    container.style.padding = 0;
    container.style.margin = '20px 0';

    insertAfter(script, container);

    iframe = document.createElement('iframe');
    iframe.src = apiUrl + "/asciicasts/13671" + params(container, script);
    iframe.id = "asciicast-iframe-13671";
    iframe.name = "asciicast-iframe-13671";
    iframe.scrolling = "no";
    iframe.setAttribute('allowFullScreen', 'true');
    iframe.style.overflow = "hidden";
    iframe.style.margin = 0;
    iframe.style.border = 0;
    iframe.style.display = "inline-block";
    iframe.style.width = "100%";
    iframe.style.float = "none";
    iframe.style.visibility = "hidden";
    iframe.onload = function() { this.style.visibility = 'visible' };

    container.appendChild(iframe);
  }

  var script = document.getElementById("asciicast-13671");

  if (script) {
    insertPlayer(script);
    window.addEventListener("message", receiveSize, false);
  }
})();
