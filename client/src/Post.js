import React from 'react';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: 'John',
            },
            post: {
                date: '13 min',
            },
        };
    }
    render() {
        return (
            <div
                data-use="comment"
                className="position-relative border rounded mb-4 col-9"
            >
                <div className="m-2">
                    <span className="text-warning fw-bold">
                        {this.state.user.username}
                    </span>{' '}
                    <span className="text-muted">· 33 min</span>
                    <br />
                    Villepin là ✔.
                </div>

                <iframe
                    title="spotify_integrate_player"
                    src="https://open.spotify.com/embed/track/2Hh39xSISWHxXjaWYSdgzs"
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                ></iframe>

                <div
                    className="position-absolute top-100 end-0 translate-middle-y d-fle"
                    id="reactList"
                >
                    <span className="d-inline badge bg-dark border position-relative p-1 m-2">
                        👍{' '}
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                            4
                            <span className="visually-hidden">
                                number of reaction
                            </span>
                        </span>
                    </span>
                    <span className="badge bg-dark border position-relative p-1 m-2">
                        😀{' '}
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                            2
                            <span className="visually-hidden">
                                number of reaction
                            </span>
                        </span>
                    </span>
                </div>
                <div id="emotelist" className="d-none position-absolute"></div>
            </div>
        );
    }
}

export default Post;
