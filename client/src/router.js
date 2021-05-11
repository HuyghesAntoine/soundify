import React from 'react';
import Profile from './components/main/Profile';
import Friends from './components/main/Friends';
import Home from './components/main/Home';
import LogoutPage from './components/LogoutPage';
import Playlist from './components/main/Playlists';

const routes = {
    '/': () => <Home />,
    '/profile': () => <Profile />,
    '/friends': () => <Friends />,
    '/logout': () => <LogoutPage />,
    '/playlist': () => <Playlist />,
};

export default routes;
