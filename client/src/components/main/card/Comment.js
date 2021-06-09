import { Component } from 'react';
import Moment from 'react-moment';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Track } from 'react-spotify-api';
import { HandThumbsUpFill, HandThumbsDownFill } from 'react-bootstrap-icons';
import TrackLineView from '../view/TrackLineView';
import { A } from '@patched/hookrouter/dist/Link';

class Comment extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('spotifyAuthToken');

        this.state = {
            data: props.data,
            token: token,
        };

        this.action = [
            { name: 'upvote', icon: <HandThumbsUpFill /> },
            { name: 'downvote', icon: <HandThumbsDownFill /> },
        ];
    }

    handleClick(reaction) {
        const method = !this.state.data[reaction].includes(this.state.user)
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
            console.log(response.data);
            /*const reactions = this.state.data.reactions;
        
            }

            this.setState((prevState) => ({
                data: {
                    ...prevState.data,
                    reactions: reactions,
                },
                reactionPanel: false,
            }));*/
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
                className="position-relative border border-1 rounded mb-3 hover bg-dark shadow-lg"
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <div className="m-0">
                    <div className="m-2">
                        {' '}
                        <span className="text-primary fw-bold">
                            {this.state.data.author}
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

                    {this.state.data.track ? (
                        <div className="border-top p-2">
                            <Track id={this.state.data.track}>
                                {({ data }) =>
                                    data ? (
                                        <TrackLineView track={data} index={1} />
                                    ) : null
                                }
                            </Track>
                        </div>
                    ) : null}

                    <div className="position-absolute top-100 start-0 translate-middle-y d-flex border rounded bg-dark">
                        {this.action.map((a, i) => {
                            return (
                                <span
                                    key={i}
                                    className="badge position-relative mb-1"
                                >
                                    <button
                                        onClick={this.handleClick.bind(
                                            this,
                                            a.name
                                        )}
                                        className="btn btn-sm border-0 btn-outline-primary"
                                    >
                                        {a.icon}
                                    </button>
                                    <span className="position-absolute top-0 end-0 badge rounded-pill bg-secondary">
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
