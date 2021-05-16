import { A } from '@patched/hookrouter';
import { Component } from 'react';
import { UserAlbums, UserArtists } from 'react-spotify-api';
import BioForm from './BioForm';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1 className="text-center sh">Profile</h1>

                <h3>Bio</h3>

                <BioForm />

                <h3>Favorite albums : </h3>
                <UserAlbums>
                    {({ data }) =>
                        data
                            ? data.items.map((album) => (
                                  <A
                                      className="text text-reset text-decoration-none"
                                      href={'/album/' + album.album.id}
                                  >
                                      <div className="d-flex align-items-center rounded mb-2 hover">
                                          <div className="flex-shrink-0">
                                              <img
                                                  src={
                                                      album.album.images[1].url
                                                  }
                                                  className="rounded"
                                                  width="100px"
                                                  height="100px"
                                                  alt={album.album.name}
                                              />
                                          </div>
                                          <div className="flex-grow-1 ms-3 fs-3">
                                              <p
                                                  className="mb-0 fs-4"
                                                  key={album.album.id}
                                              >
                                                  {album.album.name}
                                              </p>
                                              <p className="mb-0 fs-5 text-muted">
                                                  {album.album.artists[0].name}
                                              </p>
                                          </div>
                                      </div>
                                  </A>
                              ))
                            : null
                    }
                </UserAlbums>
                <hr />
                <h3>Favorite artits : </h3>
                <UserArtists>
                    {({ data }) =>
                        data
                            ? data.artists.items.map((artist) => (
                                  <A
                                      className="text text-reset text-decoration-none"
                                      href={'/artist/' + artist.id}
                                  >
                                      <div className="d-flex rounded align-items-center mb-2 hover">
                                          <div className="flex-shrink-0">
                                              <img
                                                  className="rounded-circle"
                                                  src={artist.images[0].url}
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
                              ))
                            : null
                    }
                </UserArtists>
            </div>
        );
    }
}

export default Profile;
