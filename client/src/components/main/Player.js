import { Component } from 'react';
import SpotifyPlayer from "react-spotify-web-playback";
import PlayerContext from '../PlayerContext';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = { uris: [''] };
    }

    render() {
        return (
            <div className="fixed-bottom col-8 m-auto">
                <PlayerContext.Consumer>
                    {(value) => (
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
                        uris={value.current}
                    />

                    )}
                </PlayerContext.Consumer>

                
            </div>
        );
    }
}

export default Player;
