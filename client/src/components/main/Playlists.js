import { Component } from 'react';
import { A } from '@patched/hookrouter';
import { UserPlaylists } from 'react-spotify-api';
import { Mug } from 'react-kawaii';

class Playlists extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1 className="text-center">Playlist</h1>
                <UserPlaylists>
                    {({ data }) =>
                        data
                            ? data.items.map((data) => (
                                  <A
                                      className="text text-reset text-decoration-none"
                                      href={'/playlist/' + data.id}
                                  >
                                      <div className="d-flex align-items-center rounded mb-2 hover">
                                          <div class="flex-shrink-0">
                                              {data.images[0] ? (
                                                  <img
                                                      src={data.images[0].url}
                                                      className="rounded"
                                                      width="80px"
                                                      height="80px"
                                                  />
                                              ) : (
                                                  <Mug
                                                      size={52}
                                                      mood="sad"
                                                      color="#A6E191"
                                                  />
                                              )}
                                          </div>
                                          <div className="flex-grow-1 ms-3 fs-3">
                                              <p
                                                  className="mb-0 fs-4"
                                                  key={data.id}
                                              >
                                                  {data.name}
                                              </p>
                                              <p className="mb-0 fs-5 text-muted">
                                                  (
                                                  {data.tracks.total > 0
                                                      ? `${data.tracks.total} songs`
                                                      : 'Playlist empty'}
                                                  )
                                              </p>
                                          </div>
                                      </div>
                                  </A>
                              ))
                            : null
                    }
                </UserPlaylists>
            </div>
        );
    }
}

export default Playlists;
