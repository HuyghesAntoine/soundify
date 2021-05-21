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
        this.activeMoods = ['lovestruck', 'happy', 'shocked', 'sad', 'ko'];

        this.color = {
            lovestruck: '#f39189',
            happy: '#efbbcf',
            sad: '#f2dcbb',
            shocked: '#fff5ea',
            ko: '#e0e4e8',
        };

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
                className="position-relative border border-1 rounded mb-5 hover bg-dark"
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
                        id="reactList"
                        className={
                            'd-flex justify-content-between align-self-center ' +
                            (this.state.hover ||
                            this.state.data.reactions.filter(
                                (element) => element.count > 0
                            ).length !== 0
                                ? 'border-top'
                                : '')
                        }
                    >
                        <div>
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
                                                color={
                                                    this.color[reaction.mood]
                                                }
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

                        <div className="align-self-center">
                            <span
                                className={
                                    'fs-6 badge pe-3 ' +
                                    (!this.state.hover ? 'd-none' : null)
                                }
                                onClick={this.handleDisplayReactPaneClick.bind(
                                    this
                                )}
                            >
                                <EmojiSmile /> +
                            </span>
                        </div>
                        <div
                            className={
                                'position-absolute top-100 start-50 translate-middle d-flex border rounded bg-dark ' +
                                (!this.state.moodPanel ? 'd-none' : '')
                            }
                        >
                            {this.activeMoods.map((reaction, i) => {
                                return (
                                    <span
                                        key={i}
                                        className="hover ps-2 pt-1 pb-1 pe-2"
                                        onClick={() => {
                                            this.handleClick(reaction);
                                        }}
                                    >
                                        <Ghost
                                            size={35}
                                            mood={reaction}
                                            color={this.color[reaction]}
                                        />
                                    </span>
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
