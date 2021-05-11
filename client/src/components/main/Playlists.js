import { Component } from 'react';
import {UserPlaylists} from 'react-spotify-api';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>Playlist</h1>
                <UserPlaylists options={{ limit: 5 }}>
                    {({data}) =>
                        data ? (
                            data.items.map(data => (
                                <h1 key={data.id}>{data.name}</h1>
                            ))
                        ) : null
                    }
                </UserPlaylists>
            </div>
        );
    }
}

export default Playlist;
