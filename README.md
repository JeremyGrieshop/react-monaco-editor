# react-monaco-editor

This project was first inspired by the work here:  https://raw.githubusercontent.com/SurenAt93/monaco-react

## Purpose

The Monaco Editor is a rich code editor, ported from Microsoft's VS Code base, written in Typescript, designed to be run from a web browser.  However, it currently only supports AMD/ESM loading techniques, which makes it a challenge to use within a React application that was created and maintained with create-react-app.  Most efforts require you to eject your project and modify the default webpack configuration.  This project, like SurenAt93's project, aims to avoid this complexity by dynamically loading the Monaco scripts by inject some require code via <script> tag and using the window.monaco global space it creates.

## Installation

```bash
npm i @grieshop/react-monaco-editor
```

## Demo


## Example
