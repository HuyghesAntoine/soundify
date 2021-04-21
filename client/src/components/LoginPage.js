import React from 'react';
import { SpotifyApiContext } from 'react-spotify-api';
import Cookies from 'js-cookie';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';
import { navigate } from '@patched/hookrouter';

const App = () => {
    const token = Cookies.get('spotifyAuthToken');
    return (
        <div className="app">
            {token ? (
                <SpotifyApiContext.Provider value={token}>
                    <p>You are authorized with token: {token}</p>
                    {navigate('/')}
                </SpotifyApiContext.Provider>
            ) : (
                <SpotifyAuth
                    redirectUri="http://localhost:3000/login"
                    clientID={process.env.REACT_APP_SPOTIFY_CLIENT_ID}
                    scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
                />
            )}
        </div>
    );
};
export default App;
