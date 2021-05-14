import Cookies from 'js-cookie';
import { Component } from 'react';
import Post from './card/Post';
import PostForm from './PostForm';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('spotifyAuthToken');
        this.state = { timeline: [] };

        axios({
            method: 'get',
            url: 'http://localhost:3030/api/timeline',
            headers: {
                Authorization: token,
            },
        }).then((response) => {
            console.log(response.data);
            this.setState({
                timeline: response.data,
            });
        });
    }
    render() {
        return (
            <div>
                <h1 className="text-center">My Feed</h1>
                <PostForm />
                {this.state.timeline.map((post) => (
                    <Post data={post} />
                ))}
            </div>
        );
    }
}

export default Home;
