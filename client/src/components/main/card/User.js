import axios from 'axios';
import { Component } from 'react';
import { PersonCheck, PersonPlus, PersonX } from 'react-bootstrap-icons';
import { Planet } from 'react-kawaii';
import Cookies from 'js-cookie';

class User extends Component {
    constructor(props) {
        super(props);
        this.token = Cookies.get('spotifyAuthToken');

        this.state = {
            user: props.user,
            self: props.self,
            follow: props.follow,
            hover: false,
        };

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleMouseEnter(event) {
        this.setState({ hover: true });
    }

    handleMouseLeave(event) {
        this.setState({ hover: false });
    }

    handleClick(event) {
        console.log(
            process.env.REACT_APP_API_URL+'/api/' +
                (this.state.follow ? 'unfollow' : 'follow') +
                '/' +
                this.state.user._id
        );
        axios({
            method: 'put',
            url:
            process.env.REACT_APP_API_URL+'/api/' +
                (this.state.follow ? 'unfollow' : 'follow') +
                '/' +
                this.state.user._id,
            headers: {
                Authorization: this.token,
            },
            data: {
                content: this.state.value,
            },
        }).then((response) => {
            this.setState({
                res: response.data,
                follow: !this.state.follow,
            });
        });
    }

    render() {
        return (
            <div
                className="d-flex align-items-center mb-4"
                key={this.state.user._id}
            >
                <div className="flex-shrink-0">
                    <Planet
                        className={
                            'border border-3 rounded-circle border-' +
                            (this.state.user.status
                                ? this.state.user.status
                                      .replace('online', 'success')
                                      .replace('offline', 'danger')
                                : 'success')
                        }
                        size={40}
                        mood="happy"
                        color="#FCCB7E"
                    />
                </div>

                <div className="flex-grow-1 ms-3 fs-5 text-primary fw-bold">
                    <span>
                        {this.state.user.username}{' '}
                        {this.state.self ? (
                            <span className="text-muted">(you)</span>
                        ) : null}
                    </span>
                </div>

                {!this.state.self ? (
                    <button
                        className={
                            'btn btn-outline-light fs-4 p-0 ps-1 pe-1 ' +
                            (this.state.follow
                                ? !this.state.hover
                                    ? 'border-success'
                                    : 'border-danger'
                                : null)
                        }
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                        onClick={this.handleClick}
                    >
                        {this.state.follow ? (
                            !this.state.hover ? (
                                <PersonCheck />
                            ) : (
                                <PersonX />
                            )
                        ) : (
                            <PersonPlus />
                        )}
                    </button>
                ) : null}
            </div>
        );
    }
}
export default User;
