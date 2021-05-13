import { Component } from 'react';
import Post from './card/Post';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1 className="d-flex flex-column text-center">My Feed</h1>
                <Post />
                <Post />
                <Post />
            </div>
        );
    }
}

export default Home;
