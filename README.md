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

## Architecture

In order to load the scripts a single time and allow for any number of editors to gain access to the monaco environment, I've created a MonacoProvider component, which should be near the top-level of your App and wrap any other Editor components, so they can obtain the Monaco environment via React Context.

## Components/Props

#### MonacoProvider


#### Editor


#### Controlled


#### Uncontrolled


#### DiffEditor


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
