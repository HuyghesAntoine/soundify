import { Component } from 'react';
import { Ghost } from 'react-kawaii';
import Moment from 'react-moment';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Track } from 'react-spotify-api';
import { EmojiSmile } from 'react-bootstrap-icons';
import TrackLineView from './TrackLineView';

class Post extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('spotifyAuthToken');

        this.state = {
            data: props.data,
            token: token,
            hover: false,
            moodPanel: false,
        };
        this.activeMoods = ['lovestruck', 'sad', 'shocked'];

        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        //this.handleClick = this.handleClick.bind(this);
    }

    handleMouseEnter() {
        this.setState({ hover: true });
    }

    handleMouseLeave() {
        this.setState({
            hover: false,
            moodPanel: false,
        });
    }

    handleDisplayReactPaneClick() {
        this.setState({ moodPanel: true });
    }

    handleClick(reaction) {
        const method =
            this.state.data.reactions.filter(
                (react) => react.mood === reaction && react.user === true
            ).length === 0
                ? 'put'
                : 'delete';
        axios({
            method: method,
            url:
                'http://localhost:3030/api/post/' +
                this.state.data._id +
                '/react/' +
                reaction,
            headers: {
                Authorization: this.state.token,
            },
        }).then((response) => {
            const reactions = this.state.data.reactions;
            if (method === 'put') {
                reactions.forEach((react) => {
                    if (react.mood == reaction) {
                        react.user = true;
                        react.count = react.count + 1;
                    }
                });
            } else {
                reactions.forEach((react) => {
                    if (react.mood == reaction) {
                        react.user = false;
                        react.count = react.count - 1;
                    }
                });
            }

            this.setState((prevState) => ({
                data: {
                    ...prevState.data,
                    reactions: reactions,
                },
                moodPanel: false,
            }));
        });
    }

    render() {
        return (
            <div
                className="position-relative border border-1 rounded mb-5 hover"
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
                    <div
                        className={
                            'position-absolute top-100 start-0 translate-middle-y d-flex '
                        }
                        id="reactList"
                    >
                        {this.state.data.reactions.map((reaction, i) => {
                            if (reaction.count !== 0)
                                return (
                                    <span
                                        key={i}
                                        className="badge position-relative m-2"
                                    >
                                        <Ghost
                                            size={45}
                                            mood={reaction.mood}
                                            color="#e6cb53"
                                        />
                                        <span
                                            className={
                                                'position-absolute top-0 end-0 badge rounded-pill bg-secondary ' +
                                                (reaction.user
                                                    ? 'text-warning'
                                                    : '')
                                            }
                                        >
                                            {reaction.count}
                                            <span className="visually-hidden">
                                                number of reaction
                                            </span>
                                        </span>
                                    </span>
                                );
                        })}
                    </div>

                    <div
                        className={
                            'position-absolute top-100 end-0 translate-middle-y d-flex '
                        }
                    >
                        <span
                            className={
                                'badge rounded-pill bg-secondary position-relative m-2 ' +
                                (!this.state.hover ? 'd-none' : null)
                            }
                            onClick={this.handleDisplayReactPaneClick.bind(
                                this
                            )}
                        >
                            <EmojiSmile />
                        </span>
                        <div
                            className={!this.state.moodPanel ? 'd-none' : null}
                        >
                            {this.activeMoods.map((reaction, i) => {
                                return (
                                    <button
                                        key={i}
                                        className="badge hover m-2"
                                        onClick={() => {
                                            this.handleClick(reaction);
                                        }}
                                    >
                                        <Ghost
                                            size={20}
                                            mood={reaction}
                                            color="#e6cb53"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Post;
