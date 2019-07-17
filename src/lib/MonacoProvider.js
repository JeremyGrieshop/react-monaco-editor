import React, {useState, useEffect} from "react";

import {MonacoContext} from "./context";

/* default CDN locations for monaco, can be overriden by initialize() */
const monacoBaseUrl     = "https://cdn.jsdelivr.net/npm/monaco-editor@0.17.1/min/vs";
const monacoLoaderUrl   = "https://cdn.jsdelivr.net/npm/monaco-editor@0.17.1/min/vs/loader.js";
const monacoWorkerMain  = "https://cdn.jsdelivr.net/npm/monaco-editor@0.17.1/min/vs/base/worker/workerMain.js";


export const initialize = async ({ baseUrl = monacoBaseUrl, loaderUrl = monacoLoaderUrl, workerMain = monacoWorkerMain }) => {
    let finalResolve, finalReject;

    document.addEventListener("monaco_init", () => {
        /* we've initialized everything and should have window.monaco now */
        finalResolve(window.monaco);
    });

    const script = document.createElement("script");
    script.innerHTML = `
        require.config({ paths: { 'vs': '${monacoBaseUrl}' }});
        window.MonacoEnvironment = {
            getWorkerUrl: function(workerId, label) {
                return "data:text/javascript;charset=utf-8,%0A%20%20%20%20%20%20%20%20self.MonacoEnvironment%20%3D%20%7B%0A%20%20%20%20%20%20%20%20%20%20baseUrl%3A%20'https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fmonaco-editor%400.17.1%2Fmin%2F'%0A%20%20%20%20%20%20%20%20%7D%3B%0A%20%20%20%20%20%20%20%20importScripts('https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fmonaco-editor%400.17.1%2Fmin%2Fvs%2Fbase%2Fworker%2FworkerMain.js')%3B"
            }
        };
        require(['vs/editor/editor.main'], function() {
            document.dispatchEvent(new Event('monaco_init'));
        });
    `;

    const loaderScript = document.createElement("script");
    loaderScript.src = monacoLoaderUrl;

    loaderScript.onload = () => {
        script.onerror = finalReject;

        document.body.appendChild(script);
    };

    loaderScript.onerror = finalReject;
    document.body.appendChild(loaderScript);

    return new Promise((resolve, reject) => {
        finalResolve = resolve;
        finalReject = reject;
    });
};

/**
 * MonacoProvider
 *
 * This component loads the monaco environment, then passes
 * it along to other components via React Context.
 *
 */

export const MonacoProvider = ({ 
    baseUrl, 
    loaderUrl, 
    workerMain, 
    theme = "vs-light", 
    modelLanguages = [],
    modelMarkers = [],
    children 
}) => {
    const [monaco, setMonaco] = useState();

    useEffect(() => {
        const initializeMonaco = async () => {
            const monaco = await initialize({ baseUrl, loaderUrl, workerMain });
            setMonaco(monaco);
        };

        initializeMonaco();
    }, [baseUrl, loaderUrl, workerMain]);

    useEffect(() => {
        if (monaco && theme) {
            monaco.editor.setTheme(theme); 
        }
    }, [monaco, theme]);

    useEffect(() => {
        if (monaco && modelLanguages) {
            modelLanguages.forEach(({model, languageId}) => 
                model.editor.setModelLanguage(model, languageId)
            );
        }
    }, [monaco, modelLanguages]);

    useEffect(() => {
        if (monaco && modelMarkers) {
            modelMarkers.forEach(({model, owner, markers}) =>
                model.editor.setModelMarkers(model, owner, markers)
            );
        }
    }, [monaco, modelMarkers]);

    return (
        <MonacoContext.Provider value={monaco}>
            { children }
        </MonacoContext.Provider>
    );
};

export default MonacoProvider;
