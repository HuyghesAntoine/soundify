import React from 'react';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';
import { navigate } from '@patched/hookrouter';

class LoginPage extends React.Component {
    render() {
        return (
            <div className="position-relative vh-100 bg-dark">
                <div className="position-absolute top-50 start-50 translate-middle">
                    <h1 className="text-light text-center">SoundIfy</h1>
                    <SpotifyAuth
                        redirectUri="http://localhost:3000"
                        clientID={process.env.REACT_APP_SPOTIFY_CLIENT_ID}
                        scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]} // either style will work
                        onAccessToken={(token) => {
                            console.log('onAccessToken');
                            navigate('/friends', true);
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default LoginPage;
