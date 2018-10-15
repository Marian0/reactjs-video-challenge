import React, {Component} from 'react';
// import ReactDOM from 'react-dom';

class Player extends Component {

    componentDidUpdate = () => {
        // ReactDOM.findDOMNode(this.refs.videoPlayer).load();
    };


    render() {

        const {src, from, to} = this.props.video;

        //Default host
        let host = `${src}#t=${from ? from : 0}`;

        //Add to if it is defined
        if (to === parseInt(to, 10)) {
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


export default Player;
