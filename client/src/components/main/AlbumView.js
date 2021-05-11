import { Component } from "react";
import { Album, AlbumTracks } from "react-spotify-api";

class AlbumView extends Component {
    constructor(props) {
        super(props);
        this.state = { id: props.id };
    }
    render() {
        return (
            <div>
                <h1>Album</h1>
                <Album id={this.state.id}>
                    {({ data }) =>
                        data ? (
                            <div>
                                <h1>{data.name}</h1>
                                {data.images[0] ? (
                                    <img
                                        src={data.images[0].url}
                                        alt="Album Image"
                                        width="100px"
                                    ></img>
                                ) : null}
                                <p>{data.release_date}</p>
                            </div>
                        ) : null
                    }
                </Album>
                <AlbumTracks id={this.state.id}>
                    {({ data }) =>
                        data
                            ? data.items.map((track) => (
                                  <div>
                                      <span key={track.id}>{track.name}</span>
                                  </div>
                              ))
                            : null
                    }
                </AlbumTracks>
            </div>
        );
    }
}

export default AlbumView;
