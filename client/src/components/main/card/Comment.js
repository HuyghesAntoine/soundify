import { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import Cookies from 'js-cookie';
import { HandThumbsUpFill, HandThumbsDownFill } from 'react-bootstrap-icons';

class Comment extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('spotifyAuthToken');
        const userId = Cookies.get('userId');

        this.state = {
            data: props.data,
            token: token,
            userId: userId,
        };

        this.action = [
            { name: 'upvote', icon: <HandThumbsUpFill /> },
            { name: 'downvote', icon: <HandThumbsDownFill /> },
        ];
    }

    handleClick(reaction) {
        const method = !this.state.data[reaction].includes(this.state.userId)
            ? 'put'
            : 'delete';
        axios({
            method: method,
            url:
                process.env.REACT_APP_API_URL +
                '/api/comment/' +
                this.state.data._id +
                '/react/' +
                reaction,
            headers: {
                Authorization: this.state.token,
            },
        }).then((response) => {
            if (response.data.nModified === 1) {
                if (method === 'put') {
                    const reactions = this.state.data[reaction];
                    reactions.push(this.state.userId);
                    this.setState((prevState) => ({
                        data: {
                            ...prevState.data,
                            [reaction]: reactions,
                        },
                    }));
                } else if (method === 'delete') {
                    const reactions = this.state.data[reaction];
                    const eq = (element) => element === this.state.userId;
                    reactions.pop(reactions.findIndex(eq));
                    this.setState((prevState) => ({
                        data: {
                            ...prevState.data,
                            [reaction]: reactions,
                        },
                    }));
                }
            }
        });
    }

    getEquivalence(reaction) {
        try {
            let res = this.action.find(({ name }) => name === reaction);
            return res.icon;
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div
                className=" col-8 position-relative border border-1 rounded mb-3 hover bg-dark shadow-lg"
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <div className="m-0">
                    <div className="m-2">
                        {' '}
                        <span className="text-primary fw-bold">
                            {this.state.data.username}
                        </span>{' '}
                        <span className="text-muted">
                            · <Moment fromNow>{this.state.data.date}</Moment>
                        </span>
                        <br />
                        {this.state.data.content}
                        {this.state.data.gif ? (
                            <div className="row justify-content-center">
                                <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                                    <img
                                        className="w-50 mx-auto d-block"
                                        src={this.state.data.gif}
                                    />
                                </div>
                            </div>
                        ) : null}
                    </div>

                    <div className="position-absolute top-50 start-100 translate-middle-y v-flex border-0 rounded">
                        {this.action.map((a, i) => {
                            return (
                                <span
                                    key={i}
                                    className="badge position-relative mb-0 "
                                >
                                    <button
                                        onClick={this.handleClick.bind(
                                            this,
                                            a.name
                                        )}
                                        className="btn btn-sm border-0 btn-outline-primary pb-0 pt-0"
                                    >
                                        {a.icon}
                                    </button>
                                    <span className="position-absolute top-50 start-75 badge translate-middle rounded-pill bg-secondary">
                                        {this.state.data[a.name].length}
                                        <span className="visually-hidden">
                                            number of {a.name}
                                        </span>
                                    </span>
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
export default Comment;
