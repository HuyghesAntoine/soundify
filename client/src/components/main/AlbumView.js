import { Component } from 'react';
import Moment from 'react-moment';
import { Album, AlbumTracks } from 'react-spotify-api';
import TrackLineView from './card/TrackLineView';

class AlbumView extends Component {
    constructor(props) {
        super(props);
        this.state = { id: props.id };
    }
    render() {
        return (
            <div>
                <Album id={this.state.id}>
                    {({ data }) =>
                        data ? (
                            <div>
                                <h1>{data.name}</h1>
                                {data.images[0] ? (
                                    <img
                                        src={data.images[0].url}
                                        width="100px"
                                        alt={data.name}
                                    ></img>
                                ) : null}
                                <p>
                                    <Moment format="y">
                                        {data.release_date}
                                    </Moment>
                                </p>
                                <AlbumTracks id={this.state.id}>
                                    {({ data }) =>
                                        data
                                            ? data.items.map((track, i) => (
                                                  <TrackLineView
                                                      track={track}
                                                      index={i + 1}
                                                      isAlbum={true}
                                                  />
                                              ))
                                            : null
                                    }
                                </AlbumTracks>

                                <div className="pt-5 text-white-50 lh-1">
                                    {data.copyrights.map((copyright) => (
                                        <p>{copyright.text}</p>
                                    ))}
                                </div>
                            </div>
                        ) : null
                    }
                </Album>
            </div>
        );
    }
}

export default AlbumView;
