import { Component } from 'react';
import {UserPlaylists, PlaylistImages} from 'react-spotify-api';

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>Playlist</h1>
                <UserPlaylists>
                    {({data}) =>
                        data ? (
                            data.items.map(data => (
                                <div className="d-flex">
                                    <img src={data.images[0].url} width="100px"/> <h1 key={data.id}>  {data.name}</h1>
                                </div>
                            ))
                        ) : null
                    }
                </UserPlaylists>
            </div>
        );
    }
}

export default Playlist;
