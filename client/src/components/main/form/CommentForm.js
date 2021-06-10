import { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { ArrowRight, EmojiSmile, Stickies } from 'react-bootstrap-icons';
import PickerGif from '@progresso/react-giphy-picker-https';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('spotifyAuthToken');
        this.state = {
            value: '',
            token: token,
            postId: props.id,
            gifPreview: null,
        };

        this.state.displayPicker = false;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleEmojiDisplay = this.handleEmojiDisplay.bind(this);
        this.handleGifDisplay = this.handleGifDisplay.bind(this);
    }

    handleSelectGif(gif) {
        this.setState({ gifPreview: gif.original.webp });
    }

    removeGif() {
        this.setState({ gifPreview: null });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleChangeSearch(event) {
        this.setState({ searchValue: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.value.length === 0) {
            this.setState({ formStyle: 'danger' });
        } else {
            axios({
                method: 'post',
                url: process.env.REACT_APP_API_URL + '/api/comment/',
                headers: {
                    Authorization: this.state.token,
                },
                data: {
                    post: this.state.postId,
                    content: this.state.value,
                    gif: this.state.gifPreview,
                    track: this.state.trackPreview
                        ? this.state.trackPreview.id
                        : null,
                },
            }).then((response) => {
                this.setState({
                    value: '',
                    res: response.data,
                    displayPicker: false,
                    displayMusicSearch: false,
                    displayPickerGif: false,
                    gifPreview: null,
                    trackPreview: null,
                });
            });
        }
    }

    handleEmojiDisplay() {
        this.setState({
            displayPicker: !this.state.displayPicker,
            displayPickerGif: false,
            displayMusicSearch: false,
        });
    }

    handleSelect(emoji) {
        this.setState({ value: this.state.value + emoji.native });
    }

    handleGifDisplay() {
        this.setState({
            displayPicker: false,
            displayMusicSearch: false,
            displayPickerGif: !this.state.displayPickerGif,
        });
    }

    render() {
        return (
            <div>
                {' '}
                <form
                    onSubmit={this.handleSubmit}
                    className="w-75 mx-auto mt-3 mb-5 border border-2 rounded bg-dark"
                >
                    <div>
                        <textarea
                            value={this.state.value}
                            onChange={this.handleChange}
                            className="w-100 bg-dark border-0 text-light"
                            style={{ resize: 'none', textIndent: '1%' }}
                        />

                        {this.state.gifPreview ? (
                            <div className="w-100">
                                <button
                                    type="button"
                                    className="btn-close btn-close-white float-end"
                                    aria-label="Close"
                                    onClick={this.removeGif.bind(this)}
                                ></button>
                                <img
                                    className="w-50 mx-auto d-block"
                                    src={this.state.gifPreview}
                                />
                            </div>
                        ) : null}
                    </div>
                    <div className="d-flex justify-content-between border-primary border-top">
                        <button
                            type="button"
                            className="col-2 btn btn-sm border-0 btn-outline-primary"
                            onClick={this.handleEmojiDisplay}
                        >
                            <EmojiSmile />
                        </button>
                        <button
                            type="button"
                            className="col-2 btn btn-sm border-0 btn-outline-primary"
                            onClick={this.handleGifDisplay}
                        >
                            <Stickies />
                        </button>
                        <button
                            type="submit"
                            className="col-2 btn btn-sm border-0 btn-outline-primary"
                        >
                            <ArrowRight />
                        </button>
                    </div>
                    {this.state.displayPicker ? (
                        <Picker
                            set="twitter"
                            title="Pick your emoji…"
                            emoji="point_up"
                            theme="dark"
                            color="#ffc107"
                            perLine={9}
                            emojiSize={20}
                            showPreview={false}
                            showSkinTones={false}
                            onSelect={this.handleSelect}
                            style={{
                                resize: 'none',
                                position: 'absolute',
                                zIndex: '10',
                            }}
                        />
                    ) : null}
                    {this.state.displayPickerGif ? (
                        <PickerGif
                            apiKey={process.env.REACT_APP_GIPHY_CLIENT_ID}
                            onSelected={this.handleSelectGif.bind(this)}
                            modal={true}
                            style={{ 'background-color': '#29343d' }}
                            width="1000px"
                        />
                    ) : null}
                </form>
            </div>
        );
    }
}

export default CommentForm;
