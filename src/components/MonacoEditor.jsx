import React from 'react';
import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(() => import('react-monaco-editor'), { ssr: false });

const Editor = ({ value, onChange, editorDidMount }) => {
    const handleEditorDidMount = (editor, monaco) => {
        console.log("Monaco Editor Mounted"); // Debugging log
        window.monacoEditor = editor; // Set the editor instance on the window object
        if (editorDidMount) {
            editorDidMount(editor, monaco);
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