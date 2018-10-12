import React, {Component} from 'react'
import Player from "../Player/Player";
import './ItemList.css';

class ItemList extends Component {

    getVideoId() {
        return parseInt(this._reactInternalFiber.key);
    }

    playVideo = () => {
        this.props.onPlay(this.props.video);
    };

    editVideo = () => {
        this.props.onEdit(this.props.video, this.getVideoId());
    };

    removeVideo = () => {
        if (!window.confirm("Are you sure you want to remove this video?")) {
            return;
        }
        this.props.removeVideo(this.getVideoId());
    };

    render() {
        const {name, from, to} = this.props.video;
        return (
            <div className="item-list">
                <div className="col-md-6">
                    <button onClick={this.playVideo}>
                        <Player video={this.props.video}/>
                    </button>
                </div>
                <div className="col-md-6 video-details">
                    <h4>{name}</h4>
                    {
                        this.props.hasOptions &&
                        <div>
                            <p>Sliced from {from} to {to? to: 'end'}</p>
                            <button onClick={this.editVideo} className="btn btn-default btn-sm"><i
                                className="glyphicon glyphicon-pencil"></i></button>
                            <button onClick={this.removeVideo} className="btn btn-default btn-sm"><i
                                className="glyphicon glyphicon-trash"></i></button>
                        </div>
                    }
                </div>
                <div className="clearfix"></div>
            </div>

        );
    }
}


export default ItemList;
