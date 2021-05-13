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
                <h1 className="d-flex flex-column text-center">My Friends</h1>
                <User />
                <User />
                <User />
            </div>
        );
    }
}

export default Friends;
