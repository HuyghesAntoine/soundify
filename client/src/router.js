import React from "react";
import Profile from "./components/main/Profile";
import Friends from "./components/main/Friends";
import Home from "./components/main/Home";
import LogoutPage from "./components/LogoutPage";
import Playlists from "./components/main/Playlists";
import PlaylistView from "./components/main/PlaylistView";
import AlbumView from "./components/main/AlbumView";
import ArtistView from "./components/main/ArtistView";

const routes = {
    "/": () => <Home />,
    "/profile": () => <Profile />,
    "/friends": () => <Friends />,
    "/logout": () => <LogoutPage />,
    "/playlist": () => <Playlists />,
    "/playlist/:id": ({ id }) => <PlaylistView id={id} />,
    "/album/:id": ({ id }) => <AlbumView id={id} />,
    "/artist/:id": ({ id }) => <ArtistView id={id} />,
};

export default routes;
