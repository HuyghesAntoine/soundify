import { Component } from "react";
import Post from "./card/Post";
import PostForm from "./PostForm";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1 className="text-center">My Feed</h1>
                <PostForm />
                <Post />
                <Post />
                <Post />
            </div>
        );
    }
}

export default Home;
