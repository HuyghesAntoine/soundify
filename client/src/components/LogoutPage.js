import React from 'react';
import Cookies from 'js-cookie';
import 'react-spotify-auth/dist/index.css';
import { navigate } from '@patched/hookrouter';

const Logout = () => {
    const token = Cookies.get('spotifyAuthToken');
    return (
        <div className="app">
            {token ? Cookies.remove('spotifyAuthToken') : <h1>logout page </h1>}
            {navigate('/')}
        </div>
    );
};
export default Logout;
