/* global define: false, window: false */

define(function() {
  'use strict';

  /**
   * Returns true if given value is undefined.
   * @param v {*} value to check.
   * @returns {boolean} true if a given value is undefined otherwise false.
   */
  function isUndefined(v) {
    return v === void 0;
  }

  /**
   * No-op.
   */
  function noop() {
  }

  var MRAID_LOADING = 'loading';
  var MRAID_READY = 'ready';

  /**
   * Registers a callback for MRAID ready. If MRAID is already ready, the callback is called immediately.
   * @param {Function} callback function to call after MRAID is ready.
   */
  function mraidReady(callback) {
    callback = callback || noop;
    if (isUndefined(window.mraid)) {
      callback();
    } else if (window.mraid.getState() !== MRAID_LOADING) {
      callback(window.mraid);
    } else {
      window.mraid.addEventListener(MRAID_READY, function onMRAIDReady() {
        window.mraid.removeEventListener(MRAID_READY, onMRAIDReady);
        callback(window.mraid);
      });
    }
    return mraidReady;
  }

  mraidReady.version = '0.0.1';

  /**
   * Loader Plugin API method.
   */
  mraidReady.load = function(name, req, onLoad, config) {
    if (config.isBuild) {
      onLoad(null);
    } else {
      mraidReady(onLoad);
    }
  };

  return mraidReady;
});