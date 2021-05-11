import React from "react";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";
import { navigate } from "@patched/hookrouter";
import axios from "axios";

class LoginPage extends React.Component {
    render() {
        return (
            <div className="position-relative vh-100 bg-dark">
                <div className="position-absolute top-50 start-50 translate-middle">
                    <h1 className="text-light text-center">SoundIfy</h1>
                    {console.log(process.env.REACT_APP_SPOTIFY_CLIENT_ID)}
                    <SpotifyAuth
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
                        onAccessToken={(token) => {
                            axios
                                .put(
                                    "http://localhost:3030/api/hello?access_token=" +
                                        token
                                )
                                .then((response) => {
                                    console.log(response.data);
                                    this.setState({ internal: response.data });
                                });
                            navigate("/friends", true);
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default LoginPage;
