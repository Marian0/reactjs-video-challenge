import React, {Component} from 'react';
import PropTypes from 'prop-types'; // ES6

class Player extends Component {

    componentDidUpdate = () => {
        // ReactDOM.findDOMNode(this.refs.videoPlayer).load();
    };


    render() {

        const {src, from, to} = this.props.video;

        //Default host
        let host = `${src}#t=${from ? from : 0}`;

        //Add to if it is defined
        if (Number.isInteger(parseInt(to))) {
            host += `,${to}`;
        }

        return (
            <div id="video-player">
                <video controls={this.props.showControls} id={this.props.showControls ? "mainPlayer" : null} ref="videoPlayer">
                    <source src={host}/>
                </video>
            </div>
        );
    }
}

Player.propTypes = {
    video: PropTypes.object,
    showControls: PropTypes.bool,
};

export default Player;
