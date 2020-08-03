import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';

const App = () => {
    const [ count, setCount ] = useState(0);
    const [ visible, setVisible ] = useState(true);

    if (visible) {
        return(
            <div>
                <button onClick={ () => setCount((prev) => prev + 1) }>
                    +
                </button>
                <button onClick={ () => setVisible((prev) => !prev ) }>
                    hide
                </button>
                <HookCounter value={count} />
            </div>
        );
    } else {
        return(
            <button onClick={ () => setVisible((prev) => !prev)}>
                show
            </button>
        );
    }
};

const HookCounter = ({ value }) => {
    useEffect(() => console.log("Mounted"), [ value ]);

    return <p> { value } </p>;
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);