import { Component } from 'react';

class NonExistentPage extends Component {
    render() {
        return (
            <div>
                {' '}
                <h1>404</h1> <p>Page doesn't exist</p>
            </div>
        );
    }
}
export default NonExistentPage;
