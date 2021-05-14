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
            url: 'http://localhost:3030/api/me',
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
        if (this.state.value.length === 0) {
            this.setState({ formStyle: 'danger' });
        } else {
            axios({
                method: 'put',
                url: 'http://localhost:3030/api/user/bio',
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
    }

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="w-50 mx-auto gap-2 mt-2"
            >
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
                            this.state.formStyle +
                            ' ' +
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
