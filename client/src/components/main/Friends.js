import { Component } from 'react';
import { Search } from 'react-bootstrap-icons';
import User from './card/User';
import axios from 'axios';
import Cookies from 'js-cookie';

class Friends extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('spotifyAuthToken');
        this.state = { token: token, value: '', res: [] };

        this.handleChange = this.handleChange.bind(this);
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
                console.log(response.data);
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
                    <h1>My Friends</h1>

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
                {console.log(this.state.res)}
                {this.state.res.map((user) => (
                    <User user={user} />
                ))}
                <hr />
            </div>
        );
    }
}

export default Friends;
