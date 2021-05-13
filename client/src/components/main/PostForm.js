import { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

class PostForm extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('spotifyAuthToken');
        this.state = { value: '', token: token, formStyle: 'light' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                    formStyle: 'ligth',
                });
            });
        }
    }

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="w-50 mx-auto gap-2 mt-2"
            >
                <h3>Post</h3>
                <div>
                    <textarea
                        value={this.state.value}
                        onChange={this.handleChange}
                        className="w-100 bg-dark border border-2 rounded text-light"
                    />
                </div>
                <div className="d-grid">
                    <input
                        type="submit"
                        className={
                            'btn btn-small btn- btn-outline-' +
                            this.state.formStyle
                        }
                        value="Submit"
                    />
                </div>
            </form>
        );
    }
}

export default PostForm;
