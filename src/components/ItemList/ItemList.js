import React, {Component} from 'react'
import Player from "../Player/Player";
import './ItemList.css';

class ItemList extends Component {

    playVideo = () => {
        this.props.onPlay(this.props.video);
    };

    removeVideo = () => {
        if (! window.confirm("Are you sure you want to remove this video?")) {
            return;
        }
        this.props.removeVideo(parseInt(this._reactInternalFiber.key));
    };

    render() {
        const {name, from, to} = this.props.video;
        return (
            <div className="item-list">
                <div className="col-md-6">
                    <Player video={this.props.video}/>
                </div>
                <div className="col-md-6 video-details">
                    <h4>{name}</h4>
                    <p>Sliced {from} - {to}</p>
                    <button onClick={this.playVideo} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-play-circle"></i></button>
                    <button onClick={this.playVideo} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-pencil"></i></button>
                    <button onClick={this.removeVideo} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-trash"></i></button>
                </div>
            </div>

        );
    }
}


export default ItemList;
