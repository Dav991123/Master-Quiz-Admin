import React, { useState, useEffect, memo } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import Editor from 'react-simple-code-editor'
import './index.scss';


const styles = {
    root: {
        fontSize: '18px',
      boxSizing: 'border-box',
      fontFamily: '"Dank Mono", "Fira Code", monospace',
      ...theme.plain
    }
}

const CodeEditor = ({ questionCode, isOnChange, onSetQuestionState }) => {
    
    const highlight = code => (
        <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                </div>
              ))}
            </>
          )}
        </Highlight>
    )

    return (
        <div className="editor-content">
            <Editor
                value={questionCode}
                onValueChange={() => {}}
                highlight={highlight}
                padding={10}
                style={styles.root}
            />
        </div>
    )
};
export default memo(CodeEditor);