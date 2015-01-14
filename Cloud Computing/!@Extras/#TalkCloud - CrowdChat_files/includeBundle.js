!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.true=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
// fifo queue for site tour messages
var messageQueue = [];
exports.messageQueue = messageQueue;

exports.queueMessage = function(messageID, messageCallback) {
  if(messageQueue.length == 0) {
    messageCallback();
  }
  messageQueue.push({id: messageID, call: messageCallback});
}

exports.dequeueMessage = function() {
  if(messageQueue.length == 0) {
    return false;
  }
  messageQueue.shift();
  if(messageQueue.length > 0) {
    messageQueue[0].call();
  }
}

},{}],2:[function(_dereq_,module,exports){
exports.client = _dereq_('./client.js');

},{"./client.js":1}],3:[function(_dereq_,module,exports){
var lib = _dereq_('crowdchatshared');
window.clientcode = lib.client;

},{"crowdchatshared":2}]},{},[3])
(3)
});