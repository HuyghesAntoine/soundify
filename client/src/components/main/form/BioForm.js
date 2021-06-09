import { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

class BioForm extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('spotifyAuthToken');

        this.state = {
            value: '',
            token: token,
            formStyle: 'light',
            inputDisplay: 'd-none',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        axios({
            method: 'get',
            url: process.env.REACT_APP_API_URL + '/api/me',
            headers: {
                Authorization: this.state.token,
            },
        }).then((response) => {
            console.log(response.data);
            this.setState({
                value: response.data.bio,
            });
        });
    }

    handleChange(event) {
        this.setState({ value: event.target.value, inputDisplay: '' });
    }
    handleSubmit(event) {
        event.preventDefault();
        axios({
            method: 'put',
            url: process.env.REACT_APP_API_URL + '/api/user/bio',
            headers: {
                Authorization: this.state.token,
            },
            data: {
                content: this.state.value,
            },
        }).then((response) => {
            console.log(response.data);
            this.setState({
                res: response.data,
                inputDisplay: 'd-none',
            });
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="mx-auto gap-2 mt-2">
                <div>
                    <textarea
                        value={this.state.value}
                        onChange={this.handleChange}
                        placeholder=" Nothing in your bio. Change that now!"
                        className="w-100 bg-secondary text-light border border-1 rounded"
                        style={{ resize: 'none', textIndent: '1%' }}
                    />
                </div>
                <div className="d-grid">
                    <input
                        type="submit"
                        className={
                            'btn btn-outline-primary btn-sm ' +
                            this.state.inputDisplay
                        }
                        value="Update my bio"
                    />
                </div>
            </form>
        );
    }
}

export default BioForm;
