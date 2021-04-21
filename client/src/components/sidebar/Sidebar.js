import { Component } from 'react';
import { A } from '@patched/hookrouter';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { username: 'John' };
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
            </div>
        );
    }
}
export default Sidebar;
