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
                                  <p key={album.id}>{album.name} - {album.artists[0].name}</p>
                                  <img src={album.images[0].url} width="100px"/>
                                  <button>{album.uri}</button>
                                  <hr/>
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
