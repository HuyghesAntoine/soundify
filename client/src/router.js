import React from 'react';
import Profile from './components/main/Profile';
import Friends from './components/main/Friends';
import Home from './components/main/Home';
import LogoutPage from './components/LogoutPage';
import Playlists from './components/main/Playlists';
import PlaylistView from './components/main/view/PlaylistView';
import AlbumView from './components/main/view/AlbumView';
import PostView from './components/main/view/PostView';
import ArtistView from './components/main/view/ArtistView';
import Releases from './components/main/Releases';
import SearchView from './components/main/view/SearchView';

const routes = {
    '/': () => <Home />,
    '/profile': () => <Profile />,
    '/friends': () => <Friends />,
    '/logout': () => <LogoutPage />,
    '/releases': () => <Releases />,
    '/playlist': () => <Playlists />,
    '/playlist/:id*': ({ id }) => <PlaylistView id={id} />,
    '/album/:id*': ({ id }) => <AlbumView id={id} />,
    '/artist/:id*': ({ id }) => <ArtistView id={id} />,
    '/post/:id*': ({ id }) => <PostView id={id} />,
    '/search': () => <SearchView />,
};

export default routes;
