/**
 * Monaco React Context provides the global monaco object
 * via React Context.
 */
import React from "react";
export var MonacoContext = React.createContext();
/* export a HOC for consumers */

export var withMonacoContext = function withMonacoContext(Component) {
  return function (props) {
    return React.createElement(MonacoContext.Consumer, null, function (monaco) {
      return React.createElement(Component, Object.assign({
        monaco: monaco
      }, props));
    });
  };
};
//# sourceMappingURL=context.js.map