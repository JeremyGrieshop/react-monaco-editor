import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import React, { useState, useEffect } from "react";
import { MonacoContext } from "../context";
/* default CDN locations for monaco, can be overriden by initialize() */

var monacoBaseUrl = "https://cdn.jsdelivr.net/npm/monaco-editor@0.17.1/min/vs";
var monacoLoaderUrl = "https://cdn.jsdelivr.net/npm/monaco-editor@0.17.1/min/vs/loader.js";
var monacoWorkerMain = "https://cdn.jsdelivr.net/npm/monaco-editor@0.17.1/min/vs/base/worker/workerMain.js";
export var initialize =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(_ref) {
    var _ref$baseUrl, baseUrl, _ref$loaderUrl, loaderUrl, _ref$workerMain, workerMain, finalResolve, finalReject, script, loaderScript;

    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref$baseUrl = _ref.baseUrl, baseUrl = _ref$baseUrl === void 0 ? monacoBaseUrl : _ref$baseUrl, _ref$loaderUrl = _ref.loaderUrl, loaderUrl = _ref$loaderUrl === void 0 ? monacoLoaderUrl : _ref$loaderUrl, _ref$workerMain = _ref.workerMain, workerMain = _ref$workerMain === void 0 ? monacoWorkerMain : _ref$workerMain;
            document.addEventListener("monaco_init", function () {
              /* we've initialized everything and should have window.monaco now */
              finalResolve(window.monaco);
            });
            script = document.createElement("script");
            script.innerHTML = "\n        require.config({ paths: { 'vs': '".concat(monacoBaseUrl, "' }});\n        window.MonacoEnvironment = {\n            getWorkerUrl: function(workerId, label) {\n                return \"data:text/javascript;charset=utf-8,%0A%20%20%20%20%20%20%20%20self.MonacoEnvironment%20%3D%20%7B%0A%20%20%20%20%20%20%20%20%20%20baseUrl%3A%20'https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fmonaco-editor%400.17.1%2Fmin%2F'%0A%20%20%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%20%20%20%20importScripts('https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fmonaco-editor%400.17.1%2Fmin%2Fvs%2Fbase%2Fworker%2FworkerMain.js')%3B\"\n            }\n        };\n        require(['vs/editor/editor.main'], function() {\n            document.dispatchEvent(new Event('monaco_init'));\n        });\n    ");
            loaderScript = document.createElement("script");
            loaderScript.src = monacoLoaderUrl;

            loaderScript.onload = function () {
              script.onerror = finalReject;
              document.body.appendChild(script);
            };

            loaderScript.onerror = finalReject;
            document.body.appendChild(loaderScript);
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              finalResolve = resolve;
              finalReject = reject;
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initialize(_x) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * MonacoProvider
 *
 * This component loads the monaco environment, then passes
 * it along to other components via React Context.
 *
 */

export var MonacoProvider = function MonacoProvider(_ref3) {
  var baseUrl = _ref3.baseUrl,
      loaderUrl = _ref3.loaderUrl,
      workerMain = _ref3.workerMain,
      children = _ref3.children;

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      monaco = _useState2[0],
      setMonaco = _useState2[1];

  useEffect(function () {
    var initializeMonaco =
    /*#__PURE__*/
    function () {
      var _ref4 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2() {
        var monaco;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                monaco = initialize({
                  baseUrl: baseUrl,
                  loaderUrl: loaderUrl,
                  workerMain: workerMain
                });
                setMonaco(monaco);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function initializeMonaco() {
        return _ref4.apply(this, arguments);
      };
    }();

    initializeMonaco();
  }, []);
  return React.createElement(MonacoContext.Provider, {
    monaco: monaco
  }, children);
};
export default MonacoProvider;
//# sourceMappingURL=MonacoProvider.js.map