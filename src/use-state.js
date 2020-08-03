import React, { useState } from "react";
import ReactDOM from 'react-dom'

const HookSwitcher = () => {
    const [ color, setColor ] = useState('black');
    const [ fontSize, setFontSize ] = useState(14);

    return (
        <div style={{ padding: '10px',
            backgroundColor: color,
            fontSize: `${fontSize}px` }}>
            Hello World
            <button
                onClick={() => setColor('black')}>
                Dark
            </button>
            <button
                onClick={() => setColor('white')}>
                Light
            </button>
            <button
                onClick={() => setFontSize((s) => s + 2)}>
                ++ fontSize
            </button>
        </div>
    );
};

ReactDOM.render(
    <HookSwitcher />,
    document.getElementById('root')
);