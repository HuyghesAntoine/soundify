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
            {token ? Cookies.remove('spotifyAuthToken') : <h1>logout page </h1>}
        </div>
    );
};
export default App;
