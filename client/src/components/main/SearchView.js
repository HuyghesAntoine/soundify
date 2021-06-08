import { Component } from 'react';
import { Search as SearchIcon } from 'react-bootstrap-icons';
import { Search } from 'react-spotify-api';
import { A } from '@patched/hookrouter';
import TrackLineView from './card/TrackLineView';
import { Ghost } from 'react-kawaii';

class SearchView extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div>
                <div className="d-flex justify-content-between mt-3">
                    <h1 className="sh">Search</h1>

                    <div>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control bg-dark text-light"
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="search"
                                value={this.state.value}
                                onChange={this.handleChange.bind(this)}
                            />
                            <button
                                className="btn btn-outline-light"
                                id="search"
                            >
                                <SearchIcon />
                            </button>
                        </div>
                    </div>
                </div>

                {this.state.value.length ? (
                    <Search
                        query={this.state.value}
                        album
                        artist
                        track
                        options={{ limit: 5 }}
                    >
                        {({ data }) =>
                            data ? (
                                <div className="row">
                                    {!data.albums.items.length &&
                                    !data.tracks.items.length &&
                                    !data.artists.items.length ? (
                                        <div className="m-auto text-center">
                                            <p>
                                                We searched for "
                                                {this.state.value}" but found
                                                absolutely nothing{' '}
                                            </p>
                                            <Ghost size="80px" mood="ko" />
                                        </div>
                                    ) : null}
                                    <div className="col">
                                        {data.albums.items.length ? (
                                            <p className="fs-2">Albums</p>
                                        ) : null}
                                        {data.albums.items.map((album) => (
                                            <A
                                                className="text text-reset text-decoration-none"
                                                href={'/album/' + album.id}
                                            >
                                                <div className="d-flex align-items-center rounded mb-2 hover">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            src={
                                                                album.images[1]
                                                                    .url
                                                            }
                                                            className="rounded"
                                                            width="100px"
                                                            height="100px"
                                                            alt={album.name}
                                                        />
                                                    </div>
                                                    <div className="flex-grow-1 ms-3 fs-3">
                                                        <p
                                                            className="mb-0 fs-4"
                                                            key={album.id}
                                                        >
                                                            {album.name}
                                                        </p>
                                                        <p className="mb-0 fs-5 text-muted">
                                                            {
                                                                album.artists[0]
                                                                    .name
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </A>
                                        ))}
                                    </div>

                                    <div className="col">
                                        {data.tracks.items.length ? (
                                            <p className="fs-2">Tracks</p>
                                        ) : null}
                                        {data.tracks
                                            ? data.tracks.items.map(
                                                  (track, i) => (
                                                      <TrackLineView
                                                          track={track}
                                                          index={i + 1}
                                                      />
                                                  )
                                              )
                                            : null}

                                        {data.artists.items.length ? (
                                            <p className="fs-2">Artists</p>
                                        ) : null}
                                        {data.artists.items.map((artist) => (
                                            <A
                                                className="text text-reset text-decoration-none"
                                                href={'/artist/' + artist.id}
                                            >
                                                <div className="d-flex rounded align-items-center mb-2 hover">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            className="rounded-circle"
                                                            src={
                                                                artist.images[0]
                                                                    ? artist
                                                                          .images[0]
                                                                          .url
                                                                    : null
                                                            }
                                                            width="50px"
                                                            height="50px"
                                                            alt="..."
                                                        />
                                                    </div>
                                                    <div className="flex-grow-1 ms-3 fs-3">
                                                        {artist.name}
                                                    </div>
                                                </div>
                                            </A>
                                        ))}
                                    </div>
                                </div>
                            ) : null
                        }
                    </Search>
                ) : (
                    ''
                )}
            </div>
        );
    }
}

export default SearchView;
