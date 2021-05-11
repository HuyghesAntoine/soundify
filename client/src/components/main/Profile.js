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
                                <div className="d-flex">
                                <img src={album.album.images[1].url} width="100px" />
                                <h1 key={album.album.id}> &nbsp; {album.album.name} </h1>
                                </div>
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
                                <div className="d-flex">
                                    <img className="rounded-circle" src={artist.images[0].url} width="50px"/>
                                    <h1 key={artist.id}> &nbsp; {artist.name}</h1>
                                </div>
                            ))
                        ) : null
                    }
                </UserArtists>
            </div>
        );
    }
}

export default Profile;
