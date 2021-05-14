import { Component } from 'react';
import { Planet } from 'react-kawaii';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            self: props.self,
        };
    }

    render() {
        return (
            <div className="d-flex align-items-center mb-4">
                <div className="flex-shrink-0">
                    <Planet
                        className={
                            'border border-3 rounded-circle border-' +
                            this.state.user.status
                                .replace('online', 'success')
                                .replace('offline', 'danger')
                        }
                        size={40}
                        mood="happy"
                        color="#FCCB7E"
                    />
                </div>

                <div className="flex-grow-1 ms-3 fs-5 text-warning fw-bold">
                    <span>
                        {this.state.user.username}{' '}
                        {this.state.self ? (
                            <span className="text-muted">(you)</span>
                        ) : null}
                    </span>
                </div>

                {!this.state.self ? (
                    <button className="btn btn-outline-light">Follow</button>
                ) : null}
            </div>
        );
    }
}
export default User;
