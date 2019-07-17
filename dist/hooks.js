/**
 * Useful hooks to use with the Monaco environment.
 */
import { useContext } from "react";
import { MonacoContext } from "./context";
/*
 * Hook to get the monaco object, set the provider.
 */

export var useMonaco = function useMonaco() {
  return useContext(MonacoContext).monaco;
};
//# sourceMappingURL=hooks.js.map