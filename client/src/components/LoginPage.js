import React from 'react';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';
import { navigate } from '@patched/hookrouter';
import axios from 'axios';
import Cookies from 'js-cookie';

class LoginPage extends React.Component {
    constructor(props){
        super(props)
        Cookies.set("r",true,{expires:1})
    }

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
                            redirectUri={process.env.REACT_APP_URL}
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
                                    url: process.env.REACT_APP_API_URL+'/api/hello',
                                    headers: {
                                        Authorization: token,
                                    },
                                }).then((response) => {
                                    axios({
                                        method: 'get',
                                        url: process.env.REACT_APP_API_URL+'/api/me',
                                        headers: {
                                            Authorization: token,
                                        },
                                    }).then((response) => {
                                        Cookies.set("userId",response.data._id,{expires:1})
                                    });
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
