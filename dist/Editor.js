import React, { useRef } from "react";
import { useMonaco } from "./hooks";
export var Uncontrolled = function Uncontrolled(props) {
  var containerRef = useRef();
  var monaco = useMonaco();
  console.log(monaco);
  return React.createElement("div", {
    ref: containerRef
  });
};
export default Uncontrolled;
//# sourceMappingURL=Editor.js.map