import React from 'react';
import { getWorkingPath, useRoutes } from '@patched/hookrouter';
import { SpotifyApiContext } from 'react-spotify-api';
import routes from './router';
import Cookies from 'js-cookie';
import LoginPage from './components/LoginPage';
import Error from './components/main/Error';
import Sidebar from './components/sidebar/Sidebar';
import Releases from './components/main/Releases';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/No Added Sugar.woff';
import './App.css';
import './SoundifyBootstrap.css';
import Player from './components/main/Player';
import ScrollbarsCustom from './components/main/ScrollbarsCustom';


const App = () => {
    const routeResult = useRoutes(routes);
    const token = Cookies.get('spotifyAuthToken');

    return (
        <div className="app vh-100 mb-5">
            {token ? (
                <SpotifyApiContext.Provider value={token}>
                    <div className="App bg-dark text-light">
                        <div className="row m-0">
                            <Sidebar />

                            
                                <div className="vh-100 overflow-hidden col p-1 m-0">
                                    <ScrollbarsCustom>
                                        <div className="p-4 ">
                                            {routeResult || <Error />}
                                            <Player token={token} />
                                        </div>
                                    </ScrollbarsCustom>
                                </div>
                            

                            <div
                                className={
                                    'col-2 text-break border-start border-primary border-2 m-0 p-0' +
                                    (getWorkingPath() === '/releases'
                                        ? 'd-none'
                                        : 'd-none d-sm-block')
                                }
                            >
                                 <ScrollbarsCustom>
                                    <div className="p-4 ">
                                        {console.log(getWorkingPath() === '/releases')}
                                        <Releases />
                                    </div>
                                </ScrollbarsCustom>
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
