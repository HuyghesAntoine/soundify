import React from 'react';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';
import { navigate } from '@patched/hookrouter';
import axios from 'axios';

class LoginPage extends React.Component {
    render() {
        return (
            <div className="position-relative vh-100 bg-secondary">
                <div className="position-absolute top-50 start-50 translate-middle">
                    <div className="d-flex">
                        <img
                            src={process.env.PUBLIC_URL + 'soundIfyDroite.png'}
                            width="300px"
                            alt="Green haired person logo facing right"
                        />
                        <h1
                            className="text-light text-center align-self-center"
                            style={{ fontSize: '100px' }}
                        >
                            Soundify
                        </h1>
                        <img
                            src={process.env.PUBLIC_URL + 'soundIfyGauche.png'}
                            width="300px"
                            alt="Green haired person logo facing left"
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <SpotifyAuth
                            title="Continue with Spotify"
                            className="mx-auto"
                            redirectUri="http://localhost:3000"
                            clientID={process.env.REACT_APP_SPOTIFY_CLIENT_ID}
                            scopes={[
                                Scopes.userReadPrivate,
                                Scopes.userReadEmail,
                                Scopes.userReadPlaybackState,
                                Scopes.userModifyPlaybackState,
                                Scopes.userLibraryRead,
                                Scopes.userLibraryModify,
                                Scopes.playlistReadPrivate,
                                Scopes.userFollowRead,
                                Scopes.userFollowModify,
                            ]}
                            logoClassName={'spotifyLogoBtn'}
                            onAccessToken={(token) => {
                                axios({
                                    method: 'put',
                                    url: 'http://localhost:3030/api/hello',
                                    headers: {
                                        Authorization: token,
                                    },
                                }).then((response) => {
                                    this.setState({ internal: response.data });
                                });
                                navigate('/friends', true);
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
