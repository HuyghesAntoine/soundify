import { Component } from "react";
import { Track } from 'react-spotify-api'





class ArtistView extends Component {
    constructor(props) {
        super(props);
        this.state = { id: props.id };
    }
    render() {
        return (
            <div>
                <h1>Artist</h1>
                <Track id={this.state.id}>
                    {({data}) => (
                        data ? (
                            data.map(track => (
                                <h1 key={track.id}>{track.name}</h1>
                            ))
                        ) : null
                    )}
                </Track>
            </div>
        );
    }
}

export default ArtistView;
