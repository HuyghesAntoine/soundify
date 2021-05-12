import { Component } from "react";
import { Playlist, PlaylistTracks } from "react-spotify-api";
import Moment from "react-moment";

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
                            ? data.items.map((track, i) => (
                                  <div className="row justify-content-between">
                                      <div className="col">
                                          <div class="d-flex align-items-center">
                                              <div class="flex-grow-1 text-white-50">
                                                  {i + 1}
                                              </div>
                                              <div class="flex-shrink-0">
                                                  <img
                                                      src={
                                                          track.track.album
                                                              .images[0].url
                                                      }
                                                      width="40px"
                                                  ></img>
                                              </div>
                                          </div>
                                      </div>

                                      <div
                                          className="col-5"
                                          key={track.track.id}
                                      >
                                          {track.track.name}
                                      </div>
                                      <div className="col text-white-50">
                                          {track.track.artists[0].name}
                                      </div>
                                      <div className="col text-white-50 text-end">
                                          <Moment format="m:ss">
                                              {track.track.duration_ms}
                                          </Moment>
                                      </div>
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
