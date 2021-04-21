import { Component } from 'react';
import User from './card/User';

class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>My Friends</h1>
                <User />
                <User />
                <User />
            </div>
        );
    }
}

export default Friends;
