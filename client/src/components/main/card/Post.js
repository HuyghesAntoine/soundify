import { Component } from 'react';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'RandomDude' + parseInt(Math.random() * 10),
            content: 'Some Content',
            date: undefined,
            reactions: [
                { emoji: '👍', count: parseInt(Math.random() * 10) },
                { emoji: '😀', count: parseInt(Math.random() * 10) },
            ],
        };
    }

    render() {
        return (
            <div class="position-relative border rounded mb-4">
                <div class="m-2">
                    <span class="text-warning fw-bold">
                        {this.state.username}
                    </span>{' '}
                    <span class="text-muted">· {this.state.date} min ago</span>
                    <br />
                    {this.state.content}
                    <div
                        class="position-absolute top-100 end-0 translate-middle-y d-fle"
                        id="reactList"
                    >
                        {this.state.reactions.map((reaction) => {
                            return (
                                <span class="d-inline badge bg-dark border position-relative p-1 m-2">
                                    {reaction.emoji}{' '}
                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                                        {reaction.count}
                                        <span class="visually-hidden">
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
