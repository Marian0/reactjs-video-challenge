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

        //Default host
        let host = `${src}#t=${from?from:0}`;

        //Add to if it is defined
        if (to === parseInt(to,10)) {
            host += `,${to}`;
        }

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
