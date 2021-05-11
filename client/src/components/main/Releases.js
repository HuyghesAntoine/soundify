import { Component } from 'react';
import { BrowseNew } from 'react-spotify-api';

class Releases extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>Releases</h1>

                <BrowseNew options={{ limit: 5 }}>
                    {({ data }) =>
                        data
                            ? data.albums.items.map((album) => (
                                <div>
                                  <p key={album.id}>{album.name}</p>
                                  <button>{album.uri}</button>
                                </div>

                              ))
                            : null
                    }
                </BrowseNew>
            </div>
        );
    }
}

export default Releases;
