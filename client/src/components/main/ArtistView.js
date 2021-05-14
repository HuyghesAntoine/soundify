import { Component } from 'react';
import { A } from '@patched/hookrouter';
import { ArtistTracks, ArtistAlbums } from 'react-spotify-api';
import TrackLineView from './card/TrackLineView';

class ArtistView extends Component {
    constructor(props) {
        super(props);
        this.state = { id: props.id };
    }
    render() {
        return (
            <div>
                <h1>Top tracks :</h1>
                <ArtistTracks id={this.state.id}>
                    {({ data }) =>
                        data
                            ? data.tracks.map((track, i) => (
                                  <TrackLineView track={track} index={i + 1} />
                              ))
                            : null
                    }
                </ArtistTracks>
                <hr />
                <div className="row justify-content-between">
                    <h1> Recent albums : </h1>
                    <ArtistAlbums id={this.state.id} options={{ limit: 8 }}>
                        {({ data }) =>
                            data
                                ? data.items.map((album) => (
                                      <A
                                          className="text text-reset text-decoration-none col"
                                          href={'/album/' + album.id}
                                          key={album.id}
                                      >
                                          <img
                                              src={album.images[0].url}
                                              width="100px"
                                              alt=""
                                          />
                                          <span> {album.name} </span>
                                      </A>
                                  ))
                                : null
                        }
                    </ArtistAlbums>
                </div>
            </div>
        );
    }
}

export default ArtistView;
