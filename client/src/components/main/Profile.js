import { Component } from 'react';
import { UserAlbums, UserArtists } from 'react-spotify-api'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>Profile</h1>
                ALBUMS : 
                <UserAlbums>
                    {({data}) =>
                        data ? (
                            data.items.map(album => (
                                <h1 key={album.album.id}>{album.album.name}</h1>
                            ))
                        ) : null
                    }
                </UserAlbums>
                <hr/>
                ARTISTS : 
                <UserArtists>
                    {({data}) =>
                        data ? (
                            data.artists.items.map(artist => (
                                <h1 key={artist.id}>{artist.name}</h1>
                            ))
                        ) : null
                    }
                </UserArtists>
            </div>
        );
    }
}

export default Profile;
