import React, {useState} from 'react';
import { render } from "react-dom";

import {MonacoProvider} from "./lib/MonacoProvider";
import {Controlled, Uncontrolled} from "./lib/Editor";
import DiffEditor from "./lib/DiffEditor";

const App = () => {
    const [value1, ] = useState("Hello, Monaco World1!");
    const [value2, setValue2] = useState("Hello, Monaco World2!");

    return (
        <MonacoProvider theme="vs-light">
            Uncontrolled Editor:
            <Uncontrolled
                style={{ height: "300px" }}
                value={value1}
                options={{
                }}
            />
            <div style={{height: "40px"}} />
            Controlled Editor:
            <Controlled
                style={{ height: "300px" }}
                value={value2}
                options={{
                    lineNumbers: "off",
                }}
                onChanged={setValue2}
            />
            <div style={{height: "40px"}} />
            Diff Editor:
            <DiffEditor 
                style={{ height: "300px" }}
                original={{ value: value1, language: "text/plain" }}
                modified={{ value: value2, language: "text/plain" }}
            />
        </MonacoProvider>
    );
};

render(<App />, document.getElementById("root"));
