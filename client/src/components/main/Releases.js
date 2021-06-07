import { A } from '@patched/hookrouter';
import { Component } from 'react';
import { BrowseNew } from 'react-spotify-api';

class Releases extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1 className="d-flex flex-column text-center">Releases</h1>

                <BrowseNew options={{ limit: 15 }}>
                    {({ data }) =>
                        data
                            ? data.albums.items.map((album) => (
                                  <A
                                      className="text text-reset text-decoration-none"
                                      href={'/album/' + album.id}
                                      key={album.id}
                                  >
                                      <div className="hover rounded row">
                                          <div className="col-lg-6 col-12">
                                              <p
                                                  key={album.id}
                                                  className="break-word"
                                              >
                                                  {album.name}{' '}
                                                  {album.artists[0] ? (
                                                      <span className="text-muted">
                                                          {
                                                              album.artists[0]
                                                                  .name
                                                          }
                                                      </span>
                                                  ) : null}
                                              </p>
                                          </div>
                                          <div className="col-lg-6 col-12">
                                              <img
                                                  src={album.images[0].url}
                                                  width="100%"
                                                  alt={album.name}
                                                  className="rounded"
                                              />
                                          </div>
                                          {/*<button>{album.uri}</button>*/}
                                      </div>

                                      <hr />
                                  </A>
                              ))
                            : null
                    }
                </BrowseNew>
            </div>
        );
    }
}

export default Releases;
