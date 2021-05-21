import { Component } from 'react';
import { Search } from 'react-bootstrap-icons';
import { Scrollbars } from 'react-custom-scrollbars-2';
import User from './card/User';
import axios from 'axios';
import Cookies from 'js-cookie';

class Friends extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('spotifyAuthToken');
        this.state = { token: token, value: '', res: [], self: null };

        this.handleChange = this.handleChange.bind(this);

        axios({
            method: 'get',
            url: 'http://localhost:3030/api/me',
            headers: {
                Authorization: this.state.token,
            },
        }).then((response) => {
            this.setState({ self: response.data });
            console.log(response.data);
            axios({
                method: 'get',
                url:
                    'http://localhost:3030/api/user/' +
                    response.data._id +
                    '/followers',
                headers: {
                    Authorization: this.state.token,
                },
            }).then((response) => {
                console.log(response);
            });
        });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });

        if (event.target.value.length === 0) {
            this.setState({ res: [] });
        } else {
            axios({
                method: 'get',
                url:
                    'http://localhost:3030/api/user/search?query=' +
                    event.target.value,
                headers: {
                    Authorization: this.state.token,
                },
            }).then((response) => {
                this.setState({
                    res: response.data,
                });
            });
        }
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-between mt-3">
                    <h1 className="sh">My Friends</h1>

                    <div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control bg-dark text-light"
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="searchFriend"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                            <button
                                className="btn btn-outline-light"
                                id="searchFriend"
                            >
                                <Search />
                            </button>
                        </div>
                    </div>
                </div>
                {this.state.res.map((user) => (
                    <User
                        user={user}
                        self={user._id === this.state.self._id}
                        follow={this.state.self.follow.includes(user._id)}
                    />
                ))}
                <hr />
                {this.state.self
                    ? this.state.self.follow.map((user) => <p>{user}</p>)
                    : null}
            </div>
        );
    }
}

export default Friends;
