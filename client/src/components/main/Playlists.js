import { Component } from "react";
import { A } from "@patched/hookrouter";
import { UserPlaylists } from "react-spotify-api";

class Playlists extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h1 className="d-flex flex-column text-center">Playlist</h1>
                <UserPlaylists>
                    {({ data }) =>
                        data
                            ? data.items.map((data) => (
                                  <A
                                      className="text text-reset text-decoration-none"
                                      href={"/playlist/" + data.id}
                                  >
                                      <div className="d-flex pb-2">
                                          <img
                                              src={
                                                  data.images[0]
                                                      ? data.images[0].url
                                                      : null
                                              }
                                              width="80px"
                                          />
                                          <div className="flex-fill d-flex align-items-center justify-content-between ps-2 pe-2">
                                              <div>
                                                  <p
                                                      className="fs-2"
                                                      key={data.id}
                                                  >
                                                      {" "}
                                                      {data.name}
                                                  </p>
                                              </div>
                                              <div>
                                                  <p className="fs-4 text-muted">
                                                      {" "}
                                                      (
                                                      {data.tracks.total > 0
                                                          ? `${data.tracks.total} songs`
                                                          : "Playlist empty"}
                                                      )
                                                  </p>
                                              </div>
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
