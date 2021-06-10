import { Component } from 'react';
import { Search } from 'react-bootstrap-icons';
import User from './card/User';
import axios from 'axios';
import Cookies from 'js-cookie';

class Friends extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('spotifyAuthToken');

        this.state = {
            token: token,
            value: '',
            res: [],
            self: null,
            follow: [],
        };

        this.handleChange = this.handleChange.bind(this);
        if (Cookies.get('r') === 'true')
            setTimeout(() => this.getFriends(), 1000);
        else {
            this.getFriends();
        }
    }

    getFriends() {
        axios({
            method: 'get',
            url: process.env.REACT_APP_API_URL + '/api/me',
            headers: {
                Authorization: this.state.token,
            },
        }).then((response) => {
            this.setState({ self: response.data });
            var self = response.data;
            axios({
                method: 'get',
                url:
                    process.env.REACT_APP_API_URL +
                    '/api/user/' +
                    self._id +
                    '/follow',
                headers: {
                    Authorization: this.state.token,
                },
            }).then((response) => {
                this.setState({ follow: response.data });
                Cookies.set('r', false);
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
                    process.env.REACT_APP_API_URL +
                    '/api/user/search?query=' +
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
                {this.state.self
                    ? this.state.res.map((user) => (
                          <User
                              user={user}
                              self={user._id === this.state.self._id}
                              follow={this.state.self.follow.includes(user._id)}
                          />
                      ))
                    : null}
                <hr />
                {this.state.follow
                    ? this.state.follow.map((user) => (
                          <User user={user} self={false} follow={true} />
                      ))
                    : null}
            </div>
        );
    }
}

export default Friends;
