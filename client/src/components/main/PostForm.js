import { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { EmojiSmile } from 'react-bootstrap-icons';

class PostForm extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('spotifyAuthToken');
        this.state = { value: '', token: token };

        this.state.displayPicker = false;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleEmojiDisplay = this.handleEmojiDisplay.bind(this);
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
                method: 'put',
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
                    displayPicker: !this.state.displayPicker,
                });
            });
        }
    }

    handleEmojiDisplay() {
        this.setState({ displayPicker: !this.state.displayPicker });
    }

    handleSelect(emoji) {
        this.setState({ value: this.state.value + emoji.native });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="w-50 mx-auto mt-2">
                <h3>Post</h3>
                <div>
                    <textarea
                        value={this.state.value}
                        onChange={this.handleChange}
                        className="w-100 bg-dark border border-2 rounded text-light"
                    />
                </div>

                <div className="row">
                    <button
                        type="button"
                        className="col-2 btn btn-sm btn-outline-light"
                        onClick={this.handleEmojiDisplay}
                    >
                        <EmojiSmile />
                    </button>
                    <input
                        type="submit"
                        className="col-10 btn btn-small btn-outline-light"
                        value="Submit"
                    />
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
            </form>
        );
    }
}

export default PostForm;
