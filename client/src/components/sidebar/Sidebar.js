import { Component } from 'react';
import { A } from '@patched/hookrouter';
import Cookies from 'js-cookie';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '' };
        this.getName();
    }

    async getName() {
        const token = Cookies.get('spotifyAuthToken');
        console.log(token);
        let res = await fetch('https://api.spotify.com/v1/me', {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
        res = await res.json();
        console.log(res);
        this.setState({ username: res.display_name });
    }

    render() {
        return (
            <div className="col-2 border-end border-2 border-warning align-middle">
                <img
                    className="avatar rounded-circle border border-2 border-warning bg-light"
                    src={process.env.PUBLIC_URL + '/img/avataaars.svg'}
                    alt="Avatar"
                />
                <span>#{this.state.username}</span> <br />
                <span>🟢 Listening ...</span>
                <div className="">
                    <ul className="list-unstyled">
                        <li>
                            <A href="/">Home</A>
                        </li>
                        <li>
                            <A href="/friends">friends</A>
                        </li>
                        <li>
                            <A href="/profile">Profile</A>
                        </li>
                    </ul>
                </div>
                <li className="position-absolute bottom-0 start-0 pb-4 list-unstyled">
                    <A href="/logout">Logout</A>
                </li>
            </div>
        );
    }
}
export default Sidebar;
