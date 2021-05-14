import { Component } from 'react';
import { Ghost } from 'react-kawaii';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'RandomDude' + parseInt(Math.random() * 10),
            content: 'Some Content',
            date: undefined,
            reactions: [
                { mood: 'ko', count: parseInt(Math.random() * 10) },
                { mood: 'excited', count: parseInt(Math.random() * 10) },
            ],
        };
    }

    render() {
        return (
            <div className="position-relative border rounded mb-5">
                <div className="m-2">
                    <span className="text-warning fw-bold">
                        {this.state.username}
                    </span>{' '}
                    <span className="text-muted">
                        · {this.state.date} min ago
                    </span>
                    <br />
                    {this.state.content}
                    <div
                        className="position-absolute top-100 end-0 translate-middle-y d-flex"
                        id="reactList"
                    >
                        {this.state.reactions.map((reaction, i) => {
                            return (
                                <span
                                    key={i}
                                    className="badge bg-dark border position-relative m-2"
                                >
                                    <Ghost
                                        size={40}
                                        mood={reaction.mood}
                                        color="#e6cb53"
                                    />
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
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
