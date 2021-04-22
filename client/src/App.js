import React from 'react';
import { useRoutes } from '@patched/hookrouter';
import { SpotifyApiContext } from 'react-spotify-api';
import routes from './router';
import Cookies from 'js-cookie';
import LoginPage from './components/LoginPage';
import Error from './components/main/Error';
import Sidebar from './components/sidebar/Sidebar';
import Releases from './components/main/Releases';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
