import { A } from '@patched/hookrouter';
import { Component } from 'react';
import Moment from 'react-moment';
import { ChatSquareText } from 'react-bootstrap-icons';
import axios from 'axios';

class TrackLineView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            track: props.track,
            index: props.index,
            isAlbum: props.isAlbum ? props.isAlbum : false,
            displayLyrics : false,
            lyrics : "",
        };
    }

    handleLyrics(event) {
        console.log(event);
        this.setState( {displayLyrics : !this.state.displayLyrics})
        if(this.state.lyrics.length === 0){
            axios({
                method: 'get',
                url: process.env.REACT_APP_API_URL+'/api/lyrics/'+this.state.track.artists[0].name+
                " "+this.state.track.name,
                headers: {
                    Authorization: this.state.token,
                }
            }).then((response) => {
                console.log(response.data);
                this.setState({lyrics : response.data})
            });
        }
    }

    render() {
        return (
            <div className="row justify-content-between hover">
                <div className={!this.state.displayLyrics ? 'd-none' : ''}>
                    <div className="d-flex justify-content-between">
                        <p>Lyrics</p>
                        <button className="btn-close btn-close-white btn-sm"
                         onClick={this.handleLyrics.bind(this)}>
                        </button>
                    </div>
                    {(this.state.lyrics.length === 0) ?
                    <div className="d-flex">
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                    </div> : 
                    <div dangerouslySetInnerHTML={{ __html: this.state.lyrics}}></div>
                 }
                </div>
                <div className="col">
                    <div className="d-flex align-items-center">
                        <div className="flex-grow-1 text-white-50">
                            {this.state.index}
                        </div>
                        <div className="flex-grow-1 text-white-50">
                            <ChatSquareText
                                onClick={this.handleLyrics.bind(this)}
                                style={{cursor: 'pointer'}}
                            />
                        </div>
                        {!this.state.isAlbum ? (
                            <div className="flex-shrink-0">
                                <img
                                    src={this.state.track.album.images[0].url}
                                    width="40px"
                                    alt={this.state.track.album.name}
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
                        <A
                            className="text text-reset text-decoration-none"
                            href={'/artist/' + artist.id}
                            key={artist.id}
                        >
                            <span>
                                {i ? ', ' : null}
                                {artist.name}
                            </span>
                        </A>
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
