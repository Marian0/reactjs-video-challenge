import React, {Component} from 'react'
import Player from "../Player/Player";
import './ItemList.css';

class ItemList extends Component {

    constructor(props, state) {
        super(props, state);
    }


    playVideo = () => {
        this.props.onPlay(this.props.video);
    };

    render() {
        const {name, from, to, src} = this.props.video;
        return (
            <div className="item-list">
                <div className="col-md-6">
                    <Player video={this.props.video}/>
                </div>
                <div className="col-md-6 video-details">
                    <h4>{name}</h4>
                    <p>Sliced {from} - {to}</p>
                    <a href="#" onClick={this.playVideo} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-play-circle"></i></a>
                    <a href="#" onClick={this.playVideo} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-pencil"></i></a>
                    <a href="#" onClick={this.playVideo} className="btn btn-default btn-sm"><i className="glyphicon glyphicon-trash"></i></a>
                </div>
            </div>

        );
    }
}


export default ItemList;
