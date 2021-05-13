import { Component } from 'react';
import { A } from '@patched/hookrouter';
import { User } from 'react-spotify-api';
import {
    PatchCheck,
    BoxArrowLeft,
    People,
    House,
    MusicNoteList,
    Gear,
} from 'react-bootstrap-icons';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };
    }

    render() {
        return (
            <div className="vh-100 pt-3 d-flex flex-column justify-content-between col-2 border-end border-2 border-warning">
                <section className="d-flex flex-column text-center">
                    <img
                        className="avatar mx-auto d-block rounded-circle border border-2 border-warning bg-light"
                        src={process.env.PUBLIC_URL + '/img/avataaars.svg'}
                        alt="Avatar"
                    />
                    <span>
                        #
                        <User>
                            {({ data }) => {
                                return data ? (
                                    <span>
                                        {data.display_name}{' '}
                                        {data.product === 'premium' ? (
                                            <PatchCheck />
                                        ) : null}
                                    </span>
                                ) : null;
                            }}
                        </User>
                    </span>
                    <br />
                    <span>🟢 Listening ...</span>
                </section>

                <div className="align-self-center">
                    <ul className="list-unstyled text-center fs-5">
                        <li>
                            <A
                                className="text text-reset text-decoration-none"
                                href="/"
                            >
                                <House className="d-block d-sm-none fs-3 mb-2" />{' '}
                                <span className="d-none d-sm-block">Home</span>
                            </A>
                        </li>
                        <li>
                            <A
                                className="text text-reset text-decoration-none"
                                href="/friends"
                            >
                                <People className="d-block d-sm-none fs-3 mb-2" />{' '}
                                <span className="d-none d-sm-block">
                                    Friends
                                </span>
                            </A>
                        </li>
                        <li>
                            <A
                                className="text text-reset text-decoration-none"
                                href="/profile"
                            >
                                <Gear className="d-block d-sm-none fs-3 mb-2" />{' '}
                                <span className="d-none d-sm-block">
                                    Profile
                                </span>
                            </A>
                        </li>
                        <li>
                            <A
                                className="text text-reset text-decoration-none"
                                href="/playlist"
                            >
                                <MusicNoteList className="d-block d-sm-none fs-3 mb-2" />{' '}
                                <span className="d-none d-sm-block">
                                    Playlist
                                </span>
                            </A>
                        </li>
                    </ul>
                </div>
                <A
                    className="fs-5 pb-4 text text-reset text-decoration-none"
                    href="/logout"
                >
                    <BoxArrowLeft className="d-block d-sm-none fs-1 mb-2" />
                    <span className="d-none d-sm-block">
                        <BoxArrowLeft /> Logout
                    </span>
                </A>
            </div>
        );
    }
}
export default Sidebar;
