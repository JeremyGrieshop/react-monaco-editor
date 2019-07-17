import React, {useRef, useEffect, useState} from "react";

import {useMonaco} from "./hooks";

const useEditor = ({ containerRef, onChanged, editorDidMount, value, options, ...rest }) => {
    const [change, setChange] = useState();
    const [editor, setEditor] = useState();
    const monaco = useMonaco();

    useEffect(() => {
        return () => (editor && editor.dispose());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (monaco && containerRef) {
            // need to check on this, because containerRef may not be assigned yet?
            const editor = monaco.editor.create(
                containerRef.current,
                {...options, value}
            );

            setEditor(editor);
            editor.onDidChangeModelContent(onDidChangeModelContent);

            if (editorDidMount)
                editorDidMount(editor);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [monaco, containerRef]);

    useEffect(() => {
        if (onChanged && editor) {
            onChanged( editor.getValue() );
        }
    }, [change, onChanged, editor]);

    useEffect(() => {
        if (editor && options)
            editor.updateOptions({...options});
    }, [editor, options]);

    const onDidChangeModelContent = (e) => {
        setChange(e);
    };

    return editor;
};

export const Uncontrolled = ({ onChanged, editorDidMount, value, options, ...rest }) => {

    const containerRef = useRef();
    useEditor({ containerRef, editorDidMount, onChanged, value, options });

    return (
        <div ref={containerRef} {...rest} />
    );
};

export const Controlled = ({ onChanged, editorDidMount, value, options, ...rest }) => {
    const containerRef = useRef();
    const [position, setPosition] = useState();

    const onChangedWrapper = (value) => {
        setPosition(editor.getPosition());
        onChanged(value);
    };

    const editor = useEditor({ containerRef, onChanged: onChangedWrapper, editorDidMount, value, options, ...rest });

    useEffect(() => {
        if (editor) {
            editor.setValue(value);
            if (position)
                editor.setPosition(position);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editor, value]);

    return (
        <div ref={containerRef} {...rest} />
    );
 
};


export default Uncontrolled;
