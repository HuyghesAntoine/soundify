import { Component } from 'react';
import Moment from 'react-moment';
import { Album, AlbumTracks } from 'react-spotify-api';
import TrackLineView from './TrackLineView';

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
                                <div className="d-flex align-items-center rounded mb-5">
                                    <div className="flex-shrink-0">
                                        {data.images[0] ? (
                                            <img
                                                src={data.images[0].url}
                                                className="rounded"
                                                width="150px"
                                                height="150px"
                                                alt={data.name}
                                            />
                                        ) : null}
                                    </div>
                                    <div className="flex-grow-1 ms-3 fs-3">
                                        <p className="mb-0 fs-2" key={data.id}>
                                            {data.name}
                                        </p>
                                        <p className="mb-0 fs-5 text-muted">
                                            {data.artists[0].name} -{' '}
                                            <Moment format="y">
                                                {data.release_date}
                                            </Moment>
                                        </p>
                                    </div>
                                </div>
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
