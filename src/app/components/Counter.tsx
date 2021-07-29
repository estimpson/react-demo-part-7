import React, { useState } from 'react';
import './Counter.css';

export function Counter() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
        <div className={'my-counter-text'}>
            <p>You clicked {count} times!</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}
