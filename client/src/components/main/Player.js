import { Component } from 'react';
//import SpotifyPlayer from "react-spotify-web-playback";

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = { uris: ['spotify:artist:6HQYnRM4OzToCYPpVBInuU'] };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ uris: ['spotify:artist:2BTZIqw0ntH9MvilQ3ewNY'] });
    }
    render() {
        return (
            <div className="fixed-bottom">
                {/*<button onClick={this.handleClick}>Click here!</button>
                <SpotifyPlayer
                    styles={{
                        activeColor: "#fff",
                        bgColor: "#212529",
                        color: "#fff",
                        loaderColor: "#fff",
                        sliderColor: "#1cb954",
                        trackArtistColor: "#ccc",
                        trackNameColor: "#fff",
                    }}
                    token={this.props.token}
                    uris={this.state.uris}
                />*/}
            </div>
        );
    }
}

export default Player;
