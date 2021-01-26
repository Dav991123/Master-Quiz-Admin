import React, { useState, useEffect, memo } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

const CodeEditor = ({ questionCode, isOnChange, fontSize, onSetQuestionState }) => {
    
    const styleEditor = {
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 15
    }

    return (
        <div className={'editor-content'}>
            <Editor
                padding={10}
                style={styleEditor}
                value={questionCode}
                highlight={code => highlight(code, languages.js)}
                onValueChange={code => isOnChange && onSetQuestionState(code)}
            />
        </div>
    )
};
export default memo(CodeEditor);