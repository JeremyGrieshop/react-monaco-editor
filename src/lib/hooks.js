/**
 * Useful hooks to use with the Monaco environment.
 */

import {useContext} from "react";

import {MonacoContext} from "./context";


/*
 * Hook to get the monaco object, set the provider.
 */
export const useMonaco = () => {
    return useContext(MonacoContext);
};
