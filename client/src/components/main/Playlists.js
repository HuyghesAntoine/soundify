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
                                <div className="d-flex pb-2">
                                    <img src={data.images[0] ? data.images[0].url : null} width="80px"/>
                                    <div className="flex-fill d-flex align-items-center justify-content-between ps-2 pe-2">
                                        <div>
                                        <p className="fs-2" key={data.id}>  {data.name}</p>
                                        </div>
                                        <div><p className="fs-4 text-muted"> ({data.tracks.total} songs)</p></div>
                                    </div>
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
