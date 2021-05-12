import { A } from "@patched/hookrouter";
import { Component } from "react";
import { UserAlbums, UserArtists } from "react-spotify-api";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1>Profile</h1>
                ALBUMS :
                <UserAlbums>
                    {({ data }) =>
                        data
                            ? data.items.map((album) => (
                                  <A
                                      className="text text-reset text-decoration-none"
                                      href={"/album/" + album.album.id}
                                  >
                                      <div className="d-flex pb-2">
                                          <img
                                              src={album.album.images[1].url}
                                              width="100px"
                                          />
                                          <span>
                                          </span>
                                          <h1 key={album.album.id}>
                                              {" "}
                                              &nbsp; {album.album.name}{" "}
                                              <span className="text-muted">
                                                  - {album.album.artists[0].name}
                                              </span>
                                          </h1>
                                      </div>
                                  </A>
                              ))
                            : null
                    }
                </UserAlbums>
                <hr />
                ARTISTS :
                <UserArtists>
                    {({ data }) =>
                        data
                            ? data.artists.items.map((artist) => (
                                <A
                                className="text text-reset text-decoration-none"
                                href={"/artist/" + artist.id}
                            >
                                  <div className="d-flex pb-2">
                                      <img
                                          className="rounded-circle"
                                          src={artist.images[0].url}
                                          width="50px"
                                      />
                                      <h1 key={artist.id}>
                                          {" "}
                                          &nbsp; {artist.name}
                                      </h1>
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
