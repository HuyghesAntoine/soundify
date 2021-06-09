import Cookies from 'js-cookie';
import { Component } from 'react';
import Post from './card/Post';
import CommentForm from './CommentForm'
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Comment from './card/Comment';

class Home extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('spotifyAuthToken');
        const id = props.id
        this.state = { id : id,  post: null };

        axios({
            method: 'get',
            url: process.env.REACT_APP_API_URL+'/api/post/' + id,
            headers: {
                Authorization: token,
            },
        }).then((response) => {
            console.log(response.data);
            this.setState({
                post: response.data,
            });
        });
    }
    render() {
        return (
            <div>
                {this.state.post ? 
                    <div>
                    <Post data={this.state.post} />
                    <CommentForm id={this.state.post._id} />
                     { this.state.post.comments.map( comment => <Comment data={comment} /> ) }
                    </div>
                 : (
                    <div>
                        <SkeletonTheme
                            color="#bbb"
                            highlightColor="#aaa"
                            duration={2}
                        >
                            <h1>
                                <Skeleton className="pt-3 mb-5" />
                            </h1>
                        </SkeletonTheme>
                    </div>
                )}
            </div>
        );
    }
}

export default Home;
