// ECMAScript 6 Backwards compatability
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function(str) {
    return this.slice(0, str.length) == str;
  };
}

// Regex for finding new lines
var newLineRegex = /(?:\r\n|\r|\n)/g;

// Fetching DOM items
var activeCode = document.getElementById("active-code");
var editorDiv = document.getElementById("editor");
var staticCode = document.getElementById("static-code");
var runButton = document.getElementById("run-code");
var resultDiv = document.getElementById("result");
var playLink = document.getElementById("playlink");

// Background colors for program result on success/error
var successColor = "#E2EEF6";
var errorColor = "#F6E2E2";
var warningColor = "#FFFBCB";

// Error message to return when there's a server failure
var errMsg = "The server encountered an error while running the program.";

// Stores ACE editor markers (highights) for errors
var markers = [];

// Status codes, because there are no enums in Javascript
var SUCCESS = 0;
var ERROR = 1;
var WARNING = 2;

// JS exists, display ACE editor
staticCode.style.display = "none";
activeCode.style.display = "block";

// Setting up ace editor
var editor = ace.edit("editor");
var Range = ace.require('ace/range').Range;
editor.setTheme("ace/theme/chrome");
editor.getSession().setMode("ace/mode/rust");
editor.setShowPrintMargin(false);
editor.renderer.setShowGutter(false);
editor.setHighlightActiveLine(false);

// Changes the height of the editor to match its contents
function updateEditorHeight() {
  // http://stackoverflow.com/questions/11584061/
  var newHeight = editor.getSession().getScreenLength()
    * editor.renderer.lineHeight
    + editor.renderer.scrollBar.getWidth();

  editorDiv.style.height = Math.ceil(newHeight).toString() + "px";
  editor.resize();
};

// Set initial size to match initial content
updateEditorHeight();

function escapeHTML(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(newLineRegex, '<br />');
}

// Dispatches a XMLHttpRequest to the Rust playpen, running the program, and
// issues a callback to `callback` with the result (or null on error)
function runProgram(program, callback) {
  var req = new XMLHttpRequest();
  var data = JSON.stringify({
    version: "master",
      optimize: "2",
      code: program
  });

  // console.log("Sending", data);
  req.open('POST', "http://play.rust-lang.org/evaluate.json", true);
  req.onload = function(e) {
    if (req.readyState === 4 && req.status === 200) {
      var result = JSON.parse(req.response).result;

      // Need server support to get an accurate version of this.
      var statusCode = SUCCESS;
      if (result.indexOf("error:") !== -1) {
        statusCode = ERROR;
      } else if (result.indexOf("warning:") !== -1) {
        statusCode = WARNING;
      }

      callback(statusCode, result);
    } else {
      callback(false, null);
    }
  };

  req.onerror = function(e) {
    callback(false, null);
  }

  req.setRequestHeader("Content-Type", "application/json");
  req.send(data);
}

// The callback to runProgram
function handleResult(statusCode, message) {
  // Dispatch depending on result type
  if (result == null) {
    resultDiv.style.backgroundColor = errorColor;
    resultDiv.innerHTML = errMsg;
  } else if (statusCode == SUCCESS) {
    handleSuccess(message);
  } else if (statusCode == WARNING) {
    handleWarning(message);
  } else {
    handleError(message);
  }
}

// Called on successful program run: display output and playground icon
function handleSuccess(message) {
  resultDiv.style.backgroundColor = successColor;
  var program = encodeURIComponent(editor.getValue());
  // playLink.href = "http://play.rust-lang.org/?code=" + program + "&run=1"
  // console.log(playLink.href);
  resultDiv.innerHTML = '';        // clear resultDiv, then add
  resultDiv.appendChild(playLink); // playLink icon and message
  resultDiv.innerHTML += escapeHTML(message);
}

// Called when program run results in warning(s)
function handleWarning(message) {
  resultDiv.style.backgroundColor = warningColor;
  handleProblem(message, "warning");
}

// Called when program run results in error(s)
function handleError(message) {
  resultDiv.style.backgroundColor = errorColor;
  handleProblem(message, "error");
}

// Called on unsuccessful program run. Detects and prints problems (either
// warnings or errors) in program output and highlights relevant lines and text
// in the code.
function handleProblem(message, problem) {
  // Getting list of ranges with problems
  var lines = message.split(newLineRegex);

  // Cleaning up the message: keeps only relevant problem output
  var cleanMessage = lines.map(function(line) {
    if (line.startsWith("<anon>") || line.indexOf("^") !== -1) {
      var errIndex = line.indexOf(problem + ": ");
      if (errIndex !== -1) return line.slice(errIndex);
      return "";
    }

    // Discard playpen messages, keep the rest
    if (line.startsWith("playpen:")) return "";
    return line;
  }).filter(function(line) {
    return line !== "";
  }).map(function(line) {
    return escapeHTML(line);
  }).join("<br />");

  // Setting message
  var program = encodeURIComponent(editor.getValue());
  // playLink.href = "http://play.rust-lang.org/?code=" + program + "&run=1"
  // console.log(playLink.href);
  resultDiv.innerHTML = '';        // clear resultDiv, then add
  resultDiv.appendChild(playLink); // playLink icon and error message
  resultDiv.innerHTML += cleanMessage;

  // Highlighting the lines
  var ranges = parseProblems(lines);
  markers = ranges.map(function(range) {
    return editor.getSession().addMarker(range, "ace-" + problem + "-line",
      "fullLine", false);
  });

  // Highlighting the specific text
  markers = markers.concat(ranges.map(function(range) {
    return editor.getSession().addMarker(range, "ace-" + problem + "-text",
      "text", false);
  }));
}

// Parses a problem message returning a list of ranges (row:col, row:col) where
// problems in the code have occured.
function parseProblems(lines) {
  var ranges = [];
  for (var i in lines) {
    var line = lines[i];
    if (line.startsWith("<anon>:") && line.indexOf(": ") !== -1) {
      var parts = line.split(/:\s?|\s+/, 5).slice(1, 5);
      var ip = parts.map(function(p) { return parseInt(p, 10) - 1; });
      // console.log("line:", line, parts, ip);
      ranges.push(new Range(ip[0], ip[1], ip[2], ip[3]));
    }
  }

  return ranges;
}

// Registering handler for run button click
runButton.addEventListener("click", function(ev) {
  resultDiv.style.display = "block";
  resultDiv.innerHTML = "Running...";

  // clear previous markers, if any
  markers.map(function(id) { editor.getSession().removeMarker(id); });

  // Get the code, run the program
  var program = editor.getValue();
  runProgram(program, handleResult);
});

// When clicking on the playground icon, navigate to the playground itself
function goPlayground() {
  var program = "http://play.rust-lang.org/?code=" +
      encodeURIComponent(editor.getValue()) + "&run=1"
  window.location = program
  //  console.log(program);
}

// Highlight active line when focused
editor.on('focus', function() {
  editor.setHighlightActiveLine(true);
});

// Don't when not
editor.on('blur', function() {
  editor.setHighlightActiveLine(false);
});
