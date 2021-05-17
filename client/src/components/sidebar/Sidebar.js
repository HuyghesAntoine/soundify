import { Component } from 'react';
import { A } from '@patched/hookrouter';
import { User } from 'react-spotify-api';
import {
    PatchCheck,
    BoxArrowLeft,
    People,
    House,
    MusicNoteList,
    Person,
    Disc,
} from 'react-bootstrap-icons';
import { Ghost } from 'react-kawaii';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };
    }

    render() {
        return (
            <div className="vh-100 pt-3 d-flex flex-column justify-content-between col-2 border-end border-2 border-primary">
                <section className="d-flex flex-column text-center">
                    <User>
                        {({ data }) => {
                            return data ? (
                                <div>
                                    {console.log(data)}
                                    <div>
                                        {data.images[0] ? (
                                            <img
                                                className="avatar mx-auto img-fluid d-block rounded-circle border border-2 border-primary bg-light"
                                                src={data.images[0].url}
                                                width="100%"
                                                alt="Avatar"
                                            />
                                        ) : (
                                            <div
                                                className="mx-auto"
                                                style={{ maxWidth: '100px' }}
                                            >
                                                <Ghost size="100%" mood="ko" />
                                            </div>
                                        )}
                                    </div>

                                    <h5 className="d-block text-truncate mt-3">
                                        {data.display_name}{' '}
                                        {data.product === 'premium' ? (
                                            <PatchCheck />
                                        ) : null}
                                    </h5>
                                </div>
                            ) : null;
                        }}
                    </User>
                </section>

                <div className="align-self-center">
                    <ul className="list-unstyled text-center fs-5">
                        <li>
                            <A
                                className="text text-reset text-decoration-none"
                                href="/"
                            >
                                <div className="d-flex">
                                    <House className="d-block d-sm-none d-xl-block fs-3 mb-2 me-2" />{' '}
                                    <span className="d-none d-sm-block">
                                        Home
                                    </span>
                                </div>
                            </A>
                        </li>
                        <li>
                            <A
                                className="text text-reset text-decoration-none"
                                href="/friends"
                            >
                                <div className="d-flex">
                                    <People className="d-block d-sm-none d-xl-block fs-3 mb-2 me-2" />{' '}
                                    <span className="d-none d-sm-block">
                                        Friends
                                    </span>
                                </div>
                            </A>
                        </li>
                        <li>
                            <A
                                className="text text-reset text-decoration-none"
                                href="/profile"
                            >
                                <div className="d-flex">
                                    <Person className="d-block d-sm-none d-xl-block fs-3 mb-2 me-2" />{' '}
                                    <span className="d-none d-sm-block">
                                        Profile
                                    </span>
                                </div>
                            </A>
                        </li>
                        <li>
                            <A
                                className="text text-reset text-decoration-none"
                                href="/playlist"
                            >
                                <div className="d-flex">
                                    <MusicNoteList className="d-block d-sm-none d-xl-block fs-3 mb-2 me-2" />{' '}
                                    <span className="d-none d-sm-block">
                                        Playlist
                                    </span>
                                </div>
                            </A>
                        </li>
                        <li>
                            <A
                                className="text text-reset text-decoration-none"
                                href="/releases"
                            >
                                <div className="d-flex">
                                    <Disc className="d-block d-sm-none fs-3 mb-2 me-2" />{' '}
                                    <span className="visually-hidden">
                                        Releases
                                    </span>
                                </div>
                            </A>
                        </li>
                    </ul>
                </div>
                <A
                    className="fs-5 pb-1 text text-reset text-decoration-none"
                    href="/logout"
                >
                    <BoxArrowLeft className="d-block d-sm-none fs-1 mb-1" />
                    <span className="d-none d-sm-block">
                        <BoxArrowLeft /> Logout
                    </span>
                </A>
            </div>
        );
    }
}
export default Sidebar;
