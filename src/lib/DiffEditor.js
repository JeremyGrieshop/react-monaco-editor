import React, {useRef, useEffect, useState} from "react";

import {useMonaco} from "./hooks";

const DiffEditor = ({ editorDidMount, original, modified, options, ...rest }) => {
    const containerRef = useRef();

    const [editor, setEditor] = useState();
    const monaco = useMonaco();

    useEffect(() => {
        return () => (editor && editor.dispose());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (monaco && containerRef) {
            // need to check on this, because containerRef may not be assigned yet?
            const editor = monaco.editor.createDiffEditor(
                containerRef.current,
                {...options}
            );

            setEditor(editor);
            if (original && modified) {
                const originalModel = monaco.editor.createModel(original.value, original.language);
                const modifiedModel = monaco.editor.createModel(modified.value, modified.language);

                editor.setModel({ original: originalModel, modified: modifiedModel });
            }

            if (editorDidMount)
                editorDidMount(editor);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [monaco, containerRef]);

    useEffect(() => {
        if (editor && options)
            editor.updateOptions({...options});
    }, [editor, options]);

    useEffect(() => {
        if (editor && original && modified) {
            const originalModel = monaco.editor.createModel(original.value, original.language);
            const modifiedModel = monaco.editor.createModel(modified.value, modified.language);

            editor.setModel({ original: originalModel, modified: modifiedModel });
        }
    }, [monaco, editor, original, modified]); 

    return (
        <div ref={containerRef} {...rest} />
    );
};

export default DiffEditor;
