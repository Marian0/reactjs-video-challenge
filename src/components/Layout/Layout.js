import React, {Component} from 'react'
import './Layout.css';
import Header from "../Header/Header";
import Player from "../Player/Player";
import ItemList from "../ItemList/ItemList";
import CropSidebar from "../CropSidebar/CropSidebar";


class Layout extends Component {

    constructor(props, state) {
        super(props, state);

        //Original Video Source
        this.originSource = {
            src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
            name: 'Full Video',
            from: 0,
            to: null,
        };

        this.originSource.onPlay = this.playVideo;

        //Video crop list
        let crops = [];

        //Getting them from browser Local Storage
        const savedVideos = localStorage.getItem("crops");
        if (savedVideos) {
            crops = JSON.parse(savedVideos);
        }

        //Default App State
        this.state = {
            currentVideo: this.originSource,
            crops,
            keywords: "",
            showing: crops
        };
    }

    playVideo = (video) => {
        this.setState(() => {
            return {currentVideo: video};
        });

        const videoContainer = document.getElementById("mainPlayer");
        //Forces browser to reload HTML5 video
        videoContainer.load();

        videoContainer.addEventListener('loadeddata', function() {
            // Video is loaded and can be played
            videoContainer.play();
        }, false);

    };

    removeVideo = (video_id) => {

        this.setState((prevState) => {
            const newCrops = prevState.crops.filter((_, i) => i !== video_id);
            localStorage.setItem("crops", JSON.stringify(newCrops));

            return {
                crops: newCrops,
                currentVideo: this.originSource,
                keywords: "",
                showing: newCrops
            }
        });

        this.filterCrops(this.state.keywords);

    };

    filterCrops = (keywords) => {

        let newShowing = this.state.crops;

        if (keywords.length > 0) {
            newShowing = this.state.crops.filter((video) => {
                return video.tags.toLowerCase().includes(keywords);
            });
        }

        this.setState(() => {

            return {
                keywords,
                showing: newShowing
            };

        });
    };

    removeAllVideos = () => {

        if (!window.confirm("Are you sure ?")) {
            return;
        }

        this.setState(() => {
            return {
                crops: [],
                currentVideo: this.originSource,
                keywords: "",
                showing: []
            };
        });

        localStorage.setItem("crops", JSON.stringify([]));
    };


    //New or Edit
    saveVideo = (video, key) => {
        const newCrops = this.state.crops.slice();
        video.src = this.originSource.src;

        if (key === parseInt(key, 10)) {
            //key is integer
            newCrops[key] = video;
        } else {
            newCrops.unshift(video);
        }

        this.setState(() => {

            return {
                crops: newCrops,
                currentVideo: video,
                keywords: "",
                showing: newCrops
            };
        });

        localStorage.setItem("crops", JSON.stringify(newCrops));
    };

    render() {
        return (
            <div className="App">
                <Header/>

                    <div className="container">

                    <div className="col-md-7">

                        <h2>{this.state.currentVideo.name}</h2>
                        <Player video={this.state.currentVideo} showControls={true}/>

                        <p className="foot">ReactJS Application created for coding challenge by <a href="https://www.linkedin.com/in/marianopeyregne/" rel="noopener noreferrer" target="_blank">Mariano Peyregne</a></p>

                    </div>

                    <div className="col-md-5">

                        <h3>Original</h3>

                        <ItemList video={this.originSource} onPlay={this.playVideo} hasOptions={false}/>

                        <div className="clearfix"></div>

                        <CropSidebar
                            removeAllVideos={this.removeAllVideos}
                            saveVideo={this.saveVideo}
                            playVideo={this.playVideo}
                            removeVideo={this.removeVideo}
                            filterCrops={this.filterCrops}
                            showing={this.state.showing}
                            cropsCount={this.state.crops.length}
                        />

                    </div>
                </div>

            </div>
        );
    }
}

export default Layout;
