import React from 'react';
import { useRoutes } from '@patched/hookrouter';
import routes from './router';
import Error from './components/main/Error';
import Sidebar from './components/sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css' // 

function App() {
    const routeResult = useRoutes(routes);
    return (
        <div className="App bg-dark text-light">
            <div className="row m-0">
                <Sidebar />
                <div className="col-8">{routeResult || <Error />}</div>
                <div className="col-2 border-start border-warning border-2">
                    <span className="text-muted">New Releases</span>
                </div>
            </div>
        </div>
    );
}

export default App;
