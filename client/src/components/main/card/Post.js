import { Component } from 'react';
import { Ghost } from 'react-kawaii';
import Moment from 'react-moment';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
        };
    }

    render() {
        return (
            <div className="position-relative border-0 rounded mb-5 hover">
                <div className="m-2">
                    <span className="text-warning fw-bold">
                        {this.state.data.author}
                    </span>{' '}
                    <span className="text-muted">
                        · <Moment fromNow>{this.state.data.date}</Moment>
                    </span>
                    <br />
                    {this.state.data.content}
                    <div
                        className="position-absolute top-100 end-0 translate-middle-y d-flex"
                        id="reactList"
                    >
                        {this.state.data.reactions.map((reaction, i) => {
                            return (
                                <span
                                    key={i}
                                    className="badge position-relative m-2"
                                >
                                    <Ghost
                                        size={45}
                                        mood={reaction.mood}
                                        color="#e6cb53"
                                    />
                                    <span className="position-absolute top-0 end-0 badge rounded-pill bg-secondary">
                                        {reaction.count}
                                        <span className="visually-hidden">
                                            number of reaction
                                        </span>
                                    </span>
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
export default Post;
