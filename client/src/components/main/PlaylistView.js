import { Component } from "react";
import { Playlist, PlaylistTracks } from "react-spotify-api";

class PlaylistView extends Component {
    constructor(props) {
        super(props);
        this.state = { id: props.id };
    }
    render() {
        return (
            <div>
                <h1>Playlist</h1>
                <Playlist id={this.state.id}>
                    {({ data }) => (data ? <h1>{data.name}</h1> : null)}
                </Playlist>
                <PlaylistTracks id={this.state.id}>
                    {({ data }) =>
                        data
                            ? data.items.map((track) => (
                                  <div>
                                      <img
                                          src={track.track.album.images[0].url}
                                          width="40px"
                                      ></img>
                                      <span key={track.track.id}>
                                          {track.track.name}
                                      </span>
                                  </div>
                              ))
                            : null
                    }
                </PlaylistTracks>
            </div>
        );
    }
}

export default PlaylistView;
