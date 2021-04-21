import { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'RandomFriend' + parseInt(Math.random() * 10),
            picture:
                process.env.PUBLIC_URL +
                '/img/avataaars(' +
                (parseInt(Math.random() * 10) % 4) +
                ').svg',
            doing: ['success', 'warning', 'danger'][
                Math.floor(Math.random() * 3)
            ],
            listening: undefined,
        };
    }

    render() {
        return (
            <div class="position-relative mb-4">
                <div class="m-2">
                    <img
                        className="avatar-friend rounded-circle border border-2 border-${this.state.doing} bg-light"
                        src={this.state.picture}
                        alt="Avatar"
                    />
                    <span className="ps-3 text-warning fw-bold">
                        {this.state.username}
                    </span>
                </div>
            </div>
        );
    }
}
export default User;
