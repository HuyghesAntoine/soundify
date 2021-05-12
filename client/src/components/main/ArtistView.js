import { Component } from "react";
import { ArtistTracks } from "react-spotify-api";
import TrackLineView from "./card/TrackLineView";

class ArtistView extends Component {
    constructor(props) {
        super(props);
        this.state = { id: props.id };
    }
    render() {
        return (
            <div>
                <h1>Artist</h1>
                <ArtistTracks id={this.state.id}>
                    {({ data }) =>
                        data
                            ? data.tracks.map((track, i) => (
                                  <TrackLineView track={track} index={i + 1} />
                              ))
                            : null
                    }
                </ArtistTracks>
            </div>
        );
    }
}

export default ArtistView;
