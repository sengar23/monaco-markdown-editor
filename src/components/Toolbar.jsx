import React from 'react';

const Toolbar = ({ onBold, onItalic, onHeading, onCode, onLink }) => {
    return (
        <div style={{ marginBottom: '10px' }}>
            <button onClick={onBold}><b>B</b></button>
            <button onClick={onItalic}><i>I</i></button>
            <button onClick={onHeading}>H1</button>
            <button onClick={onCode}>Code</button>
            <button onClick={onLink}>Link</button>
            {/* Add more buttons as needed */}
        </div>
    );
};

export default Toolbar;