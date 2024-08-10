import React from 'react';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('react-monaco-editor'), { ssr: false });

const Editor = ({ value, onChange, editorDidMount }) => {
    const handleEditorDidMount = (editor) => {
        window.monacoEditor = editor;
        const monaco = window.monaco || window.require('monaco-editor');
        if (monaco) {
            monacoInstance = monaco;
            console.log("Monaco instance successfully set");
        } else {
            console.error("Monaco instance could not be found");
        }
    };

    return (
        <MonacoEditor
            width="100%"
            height="400"
            language="markdown"
            theme="vs-dark"
            value={value}
            options={{
                selectOnLineNumbers: true,
                automaticLayout: true,
            }}
            onChange={onChange}
            editorDidMount={handleEditorDidMount}
        />
    );
};

export default Editor;