import Cookies from 'js-cookie';
import { Component } from 'react';
import Post from './card/Post';
import PostForm from './form/PostForm';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import redirect from '@patched/hookrouter/dist/redirect';
import { navigate } from '@patched/hookrouter';

class Home extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('spotifyAuthToken');
        this.state = { timeline: [] };

        axios({
            method: 'get',
            url: process.env.REACT_APP_API_URL + '/api/timeline',
            headers: {
                Authorization: token,
            },
        }).then((response) => {
            if(response.data.error && response.data.error.code === 401)
                navigate('/logout')
            this.setState({
                timeline: response.data,
            });
        });
    }
    render() {
        return (
            <div className>
                <h1 className="text-center sh">Feed</h1>
                <PostForm />
                {this.state.timeline.length !== 0 ? (
                    this.state.timeline.map((post) => <Post data={post} />)
                ) : (
                    <div>
                        <SkeletonTheme
                            color="#bbb"
                            highlightColor="#aaa"
                            duration={2}
                        >
                            <h1>
                                <Skeleton className="pt-3 mb-5" count={10} />
                            </h1>
                        </SkeletonTheme>
                    </div>
                )}
            </div>
        );
    }
}

export default Home;
