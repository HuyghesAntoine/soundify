import { Component } from 'react';
import { Playlist, PlaylistTracks } from 'react-spotify-api';
import TrackLineView from './TrackLineView';

class PlaylistView extends Component {
    constructor(props) {
        super(props);
        this.state = { id: props.id };
    }
    render() {
        return (
            <div>
                <Playlist id={this.state.id}>
                    {({ data }) => (data ? <h1>{data.name}</h1> : null)}
                </Playlist>
                <PlaylistTracks id={this.state.id}>
                    {({ data }) =>
                        data
                            ? data.items.map((track, i) => (
                                  <TrackLineView
                                      track={track.track}
                                      index={i + 1}
                                  />
                              ))
                            : null
                    }
                </PlaylistTracks>
            </div>
        );
    }
}

export default PlaylistView;
