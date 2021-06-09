import React from 'react';

const PlayerContext = React.createContext({
    current: '',
    setCurrent: (value) => {this.current = value},
});

export default PlayerContext;
