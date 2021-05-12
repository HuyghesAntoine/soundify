import { Component } from "react";
import Moment from "react-moment";

class TrackLineView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            track: props.track,
            index: props.index,
            isAlbum: props.isAlbum ? props.isAlbum : false,
        };
    }

    render() {
        return (
            <div className="row justify-content-between">
                <div className="col">
                    <div class="d-flex align-items-center">
                        <div class="flex-grow-1 text-white-50">
                            {this.state.index}
                        </div>
                        {!this.state.isAlbum ? (
                            <div class="flex-shrink-0">
                                <img
                                    src={this.state.track.album.images[0].url}
                                    width="40px"
                                ></img>
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="col-5" key={this.state.track.id}>
                    {this.state.track.name}
                </div>
                <div className="col text-white-50 text-truncate">
                    {this.state.track.artists.map((artist, i) => (
                        <span>
                            {i ? ", " : null}
                            {artist.name}
                        </span>
                    ))}
                </div>
                <div className="col-1 text-white-50 text-end">
                    <Moment format="m:ss">
                        {this.state.track.duration_ms}
                    </Moment>
                </div>
            </div>
        );
    }
}
export default TrackLineView;
