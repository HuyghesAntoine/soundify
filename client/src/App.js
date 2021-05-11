import React from "react";
import { useRoutes } from "@patched/hookrouter";
import { SpotifyApiContext, User } from "react-spotify-api";
import routes from "./router";
import Cookies from "js-cookie";
import LoginPage from "./components/LoginPage";
import Error from "./components/main/Error";
import Sidebar from "./components/sidebar/Sidebar";
import Releases from "./components/main/Releases";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Player from "./components/main/Player";

const App = () => {
    const routeResult = useRoutes(routes);
    const token = Cookies.get("spotifyAuthToken");
    console.log(token);
    return (
        <div className="app vh-100 mb-5">
            {token ? (
                <SpotifyApiContext.Provider value={token}>
                    <div className="App bg-dark text-light">
                        <div className="row m-0">
                            <Sidebar />
                            <div className="vh-100 overflow-auto col-8 overflow-auto">
                                {routeResult || <Error />}
                                <Player token={token} />
                            </div>
                            <div className="col-2 border-start border-warning border-2 overflow-auto">
                                <Releases />
                            </div>
                        </div>
                    </div>
                </SpotifyApiContext.Provider>
            ) : (
                <LoginPage />
            )}
        </div>
    );
};

export default App;
