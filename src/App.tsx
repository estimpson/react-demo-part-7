import React from 'react';
import './App.css';
import { ChannelList } from './app/components/Channels';

class App extends React.Component {
    render() {
        return (
            <div>
                <h2>'Hello World'</h2>
                <ChannelList />
            </div>
        );
    }
}

export default App;
