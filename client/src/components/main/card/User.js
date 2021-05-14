import { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
        };
    }

    render() {
        return (
            <div className="position-relative mb-4">
                <div className="m-2">
                    <img
                        className="avatar-friend rounded-circle border border-2 border-${this.state.doing} bg-light"
                        src={this.state.picture ? this.state.picture : null}
                        alt="Avatar"
                    />
                    <span className="ps-3 text-warning fw-bold">
                        {this.state.user.username}
                    </span>
                </div>
            </div>
        );
    }
}
export default User;
