import React from 'react';
import Profile from './components/main/Profile';
import Friends from './components/main/Friends';
import Home from './components/main/Home';
import LogoutPage from './components/LogoutPage';

const routes = {
    '/': () => <Home />,
    '/profile': () => <Profile />,
    '/friends': () => <Friends />,
    '/logout': () => <LogoutPage />,
};

export default routes;
