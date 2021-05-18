import { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import {
    ArrowRight,
    EmojiSmile,
    MusicNoteBeamed,
    Stickies,
} from 'react-bootstrap-icons';
import PickerGif from '@progresso/react-giphy-picker-https';

class PostForm extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('spotifyAuthToken');
        this.state = { value: '', token: token, lastPost: [] };

        this.state.displayPicker = false;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleEmojiDisplay = this.handleEmojiDisplay.bind(this);
        this.handleGifDisplay = this.handleGifDisplay.bind(this);
        this.handleMusicSearchDisplay =
            this.handleMusicSearchDisplay.bind(this);
    }

    log(gif) {
        console.log(gif);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.value.length === 0) {
            this.setState({ formStyle: 'danger' });
        } else {
            axios({
                method: 'post',
                url: 'http://localhost:3030/api/post',
                headers: {
                    Authorization: this.state.token,
                },
                data: {
                    content: this.state.value,
                },
            }).then((response) => {
                console.log(response.data);
                this.setState({
                    value: '',
                    res: response.data,
                    displayPicker: false,
                    displayMusicSearch: false,
                    displayPickerGif: false,
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

    handleMusicSearchDisplay() {
        this.setState({
            displayPicker: false,
            displayPickerGif: false,
            displayMusicSearch: !this.state.displayMusicSearch,
        });
    }

    render() {
        return (
            <div>
                {' '}
                <form
                    onSubmit={this.handleSubmit}
                    className="w-75 mx-auto mt-3 mb-5 border border-2 rounded"
                >
                    <div>
                        <textarea
                            value={this.state.value}
                            onChange={this.handleChange}
                            className="w-100 bg-dark border-0 text-light"
                            style={{ resize: 'none' }}
                        />
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
                            type="button"
                            className="col-2 btn btn-sm border-0 btn-outline-primary"
                            onClick={this.handleMusicSearchDisplay}
                        >
                            <MusicNoteBeamed />
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
                        />
                    ) : null}
                    {this.state.displayPickerGif ? (
                        <PickerGif
                            apiKey={process.env.REACT_APP_GIPHY_CLIENT_ID}
                            onSelected={this.log.bind(this)}
                            modal={true}
                            style={{ 'background-color': '#29343d' }}
                            width="1000px"
                        />
                    ) : null}

                    {this.state.displayMusicSearch ? (
                        <div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control bg-dark text-light"
                                    placeholder="Search your music"
                                    aria-label="Search"
                                    aria-describedby="searchMusic"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                />
                                <button
                                    className="btn btn-outline-light"
                                    id="searchMusic"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    ) : null}
                </form>
            </div>
        );
    }
}

export default PostForm;
