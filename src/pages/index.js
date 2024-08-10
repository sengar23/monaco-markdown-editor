import { useState } from 'react';
import Editor from '../components/MonacoEditor';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Toolbar from '../components/Toolbar';

export default function Home() {
    const [markdown, setMarkdown] = useState(`# Hello, Markdown!\n\n\`\`\`javascript\nconsole.log('Hello, world!');\n\`\`\``);

    let monacoInstance = null;

    const handleEditorChange = (value) => {
        setMarkdown(value);
    };

    const insertText = (text, surround = false) => {
        const editor = window.monacoEditor;
        if (!editor || !monacoInstance) {
            console.error("Monaco Editor or Monaco instance is not available");
            return;
        }

        const selection = editor.getSelection();
        const selectedText = editor.getModel().getValueInRange(selection);

        const range = new monacoInstance.Range(
            selection.startLineNumber,
            selection.startColumn,
            selection.endLineNumber,
            selection.endColumn
        );

        let newText;
        if (surround) {
            newText = text + selectedText + text;
        } else {
            newText = text + selectedText;
        }

        editor.executeEdits("", [{
            range,
            text: newText,
            forceMoveMarkers: true
        }]);

        editor.focus();
    };

    const onBold = () => insertText('**', true);
    const onItalic = () => insertText('_', true);
    const onHeading = () => insertText('# ', false);
    const onCode = () => insertText('```\n', false);
    const onLink = () => insertText('[Link Text](URL)', false);

    return (
        <div style={{ padding: '20px' }}>
            <Toolbar 
                onBold={onBold} 
                onItalic={onItalic} 
                onHeading={onHeading} 
                onCode={onCode} 
                onLink={onLink} 
            />
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h2>Markdown Editor</h2>
                    <Editor 
                        value={markdown} 
                        onChange={handleEditorChange} 
                        editorDidMount={(editor, monaco) => { 
                            console.log("Editor and Monaco instances are set"); // Debugging log
                            window.monacoEditor = editor; 
                            monacoInstance = monaco; 
                        }} 
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <h2>Markdown Preview</h2>
                    <MarkdownRenderer content={markdown} />
                </div>
            </div>
        </div>
    );
}