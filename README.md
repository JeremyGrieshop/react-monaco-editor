# react-monaco-editor

Use the Monaco editor within React!  This project was first inspired by the work here:  https://raw.githubusercontent.com/SurenAt93/monaco-react

## Purpose

The Monaco Editor is a rich code editor, ported from Microsoft's VS Code base, written in Typescript, designed to be run from a web browser.  However, it currently only supports AMD/ESM loading techniques, which makes it a challenge to use within a React application that was created and maintained with create-react-app.  Most efforts require you to eject your project and modify the default webpack configuration.  This project, like SurenAt93's project, aims to avoid this complexity by dynamically loading the Monaco scripts by inject some require code via script tag and using the window.monaco global space it creates.

## Installation

```bash
yarn add @memsetzero/react-monaco-editor
# or
npm i @memsetzero/react-monaco-editor
```

## Demo

[CodeSandbox Demo](https://codesandbox.io/embed/memsetzeroreact-monaco-editor-lelh8)

## Architecture

In order to load the scripts a single time and allow for any number of editors to gain access to the monaco environment, I've created a MonacoProvider component, which should be near the top-level of your App and wrap any other Editor components, so they can obtain the Monaco environment via React Context.

#### Controlled vs Uncontrolled



## Components/Props

#### MonacoProvider

| Name | Type | Default | Description |
|:----------|:-------------|:------|:------|
|theme|enum: 'vs-light' \| 'vs-dark' | 'vs-light' | Theme to be used for the Monaco environment.|
|modelLanguages|array|[]|Sets an array of languages, used by models.|
|modelMarkers|array|[]|Sets an array of markers, used by models.|
|baseUrl|string||The CDN base url to fetch Monaco editor scripts.|
|loaderUrl|string||The CDN url for loading the Monaco editor scripts.|
|workerMain|string|||

#### Editor

| Name | Type | Default | Description |
|:----------|:-------------|:------|:------|
|value|string||The text value to set in the Monaco editor.|
|options|object||A list of Monaco options, defined at https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html.|
|editorDidMount|() => (editor)||Optional callback after the editor has mounted.|

#### Controlled

| Name | Type | Default | Description |
|:----------|:-------------|:------|:------|
|value|string||The text value to set in the Monaco editor.|
|options|object||A list of Monaco options, defined at https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html.|
|onChanged||||
|editorDidMount|() => (editor)||Optional callback after the editor has mounted.|

#### Uncontrolled

| Name | Type | Default | Description |
|:----------|:-------------|:------|:------|
|value|string||The text value to set in the Monaco editor.  Once set, further updates are ignored.|
|options|object||A list of Monaco options, defined at https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html.|
|editorDidMount|() => (editor)||Optional callback after the editor has mounted.|

#### DiffEditor

| Name | Type | Default | Description |
|:----------|:-------------|:------|:------|
|original|object||An object with a value and language properties describing original content.|
|modified|object||An object with a value and language properties describing modified content.|
|editorDidMount|() => (editor)||Optional callback after the editor has mounted.|

## Examples


#### Basic Editor

```js

import React from 'react';

import {MonacoProvider, Editor} from '@memsetzero/react-monaco-editor';

function App() {
  return (
    <MonacoProvider theme="vs-dark">
      <Editor 
        style={{width: "100%", height: "600px"}}
        value="Hello, Monaco World!"
        options={{
          lineNumbers: false
        }}
      />
    </MonacoProvider>
  );
}


```

#### Diff Editor

```js

import React from 'react';

import {MonacoProvider, DiffEditor} from '@memsetzero/react-monaco-editor';

function App() {
  return (
    <MonacoProvider theme="vs-dark">
      <DiffEditor
        style={{width: "100%", height: "600px"}}
        original={{
          value: "Hello, Monaco World!",
          language: "text/plain"
        }}
        modified={{
          value: "Hello, Monaco World, I'm different!",
          language: "text/plain"
        }}
      />
    </MonacoProvider>
  );
}


```

#### Controlled Editor


```js

import React, {useState} from 'react';

import {MonacoProvider, Controlled as Editor} from '@memsetzero/react-monaco-editor';

function App() {
  const [value, setValue] = useState("Hello, Monaco World!");

  return (
    <MonacoProvider theme="vs-light">
      <Editor
        style={{width: "100%", height: "600px"}}
        value={value}
        onChanged={setValue}
      />
    </MonacoProvider>
  );
}


```

