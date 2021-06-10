import axios from 'axios';
import { Component } from 'react';
import {
    InfoCircle,
    PersonCheck,
    PersonPlus,
    PersonX,
} from 'react-bootstrap-icons';
import { Planet } from 'react-kawaii';
import Cookies from 'js-cookie';
import { User as UserSpotify } from 'react-spotify-api';

class User extends Component {
    constructor(props) {
        super(props);
        this.token = Cookies.get('spotifyAuthToken');

        this.state = {
            user: props.user,
            self: props.self,
            follow: props.follow,
            hover: false,
            info: null,
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
        axios({
            method: 'put',
            url:
                process.env.REACT_APP_API_URL +
                '/api/' +
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

    displayInfo() {
        axios({
            method: 'get',
            url:
                process.env.REACT_APP_API_URL +
                '/api/user/profil/' +
                this.state.user._id,
            headers: {
                Authorization: this.token,
            },
            data: {
                content: this.state.value,
            },
        }).then((response) => {
            this.setState({
                info: response.data,
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
                            <span className="text-muted fs-6 pe-1">(you)</span>
                        ) : null}
                        <InfoCircle onClick={this.displayInfo.bind(this)} />
                    </span>
                    <div>
                        {this.state.info ? (
                            <div className="fs-6">
                                Bio : {this.state.info.bio} <br />{' '}
                                {this.state.info.nbPost} post{this.state.info.nbPost > 1 ? 's' : null} ·{' '}
                                {this.state.info.nbComms} comment{this.state.info.nbComms > 1 ? 's' : null} ·{' '}
                                {this.state.info.nbFollow} follow ·{' '}
                                {this.state.info.nbFollowers} follower{this.state.info.nbFollowers > 1 ? 's' : null}
                            </div>
                        ) : null}
                    </div>
                </div>

                {!this.state.self ? (
                    <button
                        className={
                            'btn btn-outline-light fs-4 m-0 p-0 ps-1 pe-1 ' +
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
