import React, {Component} from 'react'

class ItemList extends Component {

    constructor(props, state) {
        super(props, state);
    }


    playVideo = () => {
        this.props.onPlay(this.props.video);
    };

    render() {
        const {title, from, to} = this.props.video;
        return (
            <div>
                <h4>{title}</h4>
                <p>From: {from}</p>
                <p>To: {to}</p>
                <a href="#" onClick={this.playVideo}> CLICK </a>
            </div>

        );
    }
}


export default ItemList;
