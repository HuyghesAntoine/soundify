import { Component } from 'react';
import { A } from '@patched/hookrouter';
import { User } from 'react-spotify-api';
import { BoxArrowLeft } from 'react-bootstrap-icons';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };
    }

    render() {
        return (
            <div className="pt-3 d-flex flex-column justify-content-between col-2 border-end border-2 border-warning">
                <section className="d-flex flex-column text-center">
                    <img
                        className="avatar mx-auto d-block rounded-circle border border-2 border-warning bg-light"
                        src={process.env.PUBLIC_URL + '/img/avataaars.svg'}
                        alt="Avatar"
                    />
                    <span>
                        #{' '}
                        <User>
                            {({ data }) => {
                                return data ? (
                                    <span>{data.display_name}</span>
                                ) : null;
                            }}
                        </User>
                    </span>{' '}
                    <br />
                    <span>🟢 Listening ...</span>
                </section>

                <div className="align-self-center">
                    <ul className="list-unstyled text-center">
                        <li>
                            <A
                                className="fs-5 text text-reset text-decoration-none"
                                href="/"
                            >
                                Home
                            </A>
                        </li>
                        <li>
                            <A
                                className="fs-5 text text-reset text-decoration-none"
                                href="/friends"
                            >
                                friends
                            </A>
                        </li>
                        <li>
                            <A
                                className="fs-5 text text-reset text-decoration-none"
                                href="/profile"
                            >
                                Profile
                            </A>
                        </li>
                        <li>
                            <A
                                className="fs-5 text text-reset text-decoration-none"
                                href="/playlist"
                            >
                                Playlist
                            </A>
                        </li>
                    </ul>
                </div>
                <A
                    className="fs-5 pb-4 text text-reset text-decoration-none"
                    href="/logout"
                >
                    <BoxArrowLeft /> Logout
                </A>
            </div>
        );
    }
}
export default Sidebar;
