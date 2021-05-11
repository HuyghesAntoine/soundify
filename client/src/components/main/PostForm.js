import { Component } from "react";
import axios from "axios";

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        axios
            .put("http://localhost:3030/api/post/" + this.state.value)
            .then((response) => {
                console.log(response.data);
                this.setState({ res: response.data });
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <textarea
                        value={this.state.value}
                        onChange={this.handleChange}
                    />{" "}
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default PostForm;
