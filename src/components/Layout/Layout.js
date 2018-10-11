import React, {Component} from 'react'
import './Layout.css';
import Header from "../Header/Header";
import Player from "../Player/Player";
import ItemList from "../ItemList/ItemList";


class Layout extends Component {

    constructor(props, state) {

        super(props, state);

        this.originSource = {
            src: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
            name: 'Full Video',
            from: 0,
            to: null,
        };

        this.originSource.onPlay = this.playVideo;

        const crops  = [

            {
                src: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
                name: 'TEST1',
                from: 5,
                to: 10,
            },

            {
                src: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
                name: 'TEST2',
                from: 10,
                to: 20,
            },
            {
                src: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4',
                name: 'TEST 3',
                from: 15,
                to: null,
            }
        ];
        this.state = {
            currentVideo: this.originSource,
            crops,
        };



    }

    playVideo = (video) => {
        this.setState({currentVideo: video});
    };


    render() {

        return (
            <div className="App">
                <Header/>

                <div className="container">

                    <div className="col-md-7">

                        <h2>{this.state.currentVideo.name}</h2>
                        <Player video={this.state.currentVideo} showControls={true} />

                    </div>

                    <div className="col-md-5">

                        <h3>Original</h3>

                        <ItemList video={this.originSource} onPlay={this.playVideo} />

                        <div className="clearfix"></div>

                        <h3>Crops</h3>

                        <button>New Crop</button>

                        {this.state.crops.map((item,i) => <ItemList key={i} video={item} onPlay={this.playVideo}/>)}


                    </div>
                </div>


            </div>
        );
    }
}


export default Layout;
