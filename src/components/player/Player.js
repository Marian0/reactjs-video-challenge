import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Player extends Component {

    constructor(props, state) {
        super(props, state);
    }

    componentDidUpdate = () => {
        ReactDOM.findDOMNode(this.refs.videoPlayer).load();
    };
    render() {

        const {src, from, to, name} = this.props.video;
        const host = `${src}#t=${from},${to}`;

        console.log(host);

        return (
            <div id="video-player">
                <h2>{name}</h2>
                <video controls ref="videoPlayer">
                    <source src={host} />
                </video>
            </div>
        );
    }
}


export default Player;
