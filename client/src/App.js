import React from 'react';
import { useRoutes } from '@patched/hookrouter';
import { SpotifyApiContext, UserTop } from 'react-spotify-api';
import routes from './router';
import Error from './components/main/Error';
import Sidebar from './components/sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Cookies from 'js-cookie';
import LoginPage from './components/LoginPage';

const App = () => {
    const routeResult = useRoutes(routes);
    const token = Cookies.get('spotifyAuthToken');
    return (
        <div className="app">
            {token ? (
                <SpotifyApiContext.Provider value={token}>
                    <div className="App bg-dark text-light">
                        <div className="row m-0">
                            <Sidebar />
                            <div className="col-8">
                                {routeResult || <Error />}
                            </div>
                            <div className="col-2 border-start border-warning border-2">
                                <span className="text-muted">New Releases</span>
                                <p>You are authorized with token: {token}</p>
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
