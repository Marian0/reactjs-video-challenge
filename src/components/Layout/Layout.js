import React, {Component} from 'react'
import './Layout.css';
import Header from "../Header/Header";
import Player from "../Player/Player";
import ItemList from "../ItemList/ItemList";
import VideoModal from "../VideoModal/VideoModal";


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

        const crops = [

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
            modalProps: {
                isVisible: false,
                video: null,
                key: null
            },
            crops,
        };

    }

    playVideo = (video) => {
        this.setState(() => {
            return {currentVideo: video};
        });
    };

    editVideo = (video, id) => {
        this.setState(() => {
            return {
                modalProps: {
                    isVisible: true,
                    video,
                    key: id
                }
            }
        });
    };

    newVideo = () => {
        this.setState(() => {
            return {
                modalProps: {
                    isVisible: true,
                    video: null,
                    key: null
                }
            }
        });
    };

    removeVideo = (video_id) => {

        this.setState((prevState) => {
            return {
                crops: prevState.crops.filter((_, i) => i !== video_id)
            }
        });

    };

    removeAllVideos = () => {

        if (!window.confirm("Are you sure ?")) {
            return;
        }

        this.setState(() => {
            return {
                crops: []
            };
        })
    };

    closeModal = () => {
        this.setState(() => {
            return {
                modalProps: {
                    isVisible: false,
                    video: null,
                    key: null
                }
            }
        });
    };

    //New or Edit
    saveVideo = (video) => {

        const newCrops = this.state.crops.slice();
        video.src = this.originSource.src;

        if (this.state.modalProps.key) {
            newCrops[this.state.modalProps.key] = video;
        } else {
            newCrops.unshift(video);
        }

        this.setState(() => {
            return {
                crops: newCrops
            };
        });
    };

    renderModal = () => {
        if (this.state.modalProps.isVisible) {
            return (
                <VideoModal {...this.state.modalProps} onModalClosed={this.closeModal} onModalSaved={this.saveVideo}/>);
        }

        return null;
    };

    render() {
        return (
            <div className="App">
                <Header/>

                {this.renderModal()}

                <div className="container">

                    <div className="col-md-7">

                        <h2>{this.state.currentVideo.name}</h2>
                        <Player video={this.state.currentVideo} showControls={true}/>

                    </div>

                    <div className="col-md-5">

                        <h3>Original</h3>

                        <ItemList video={this.originSource} onPlay={this.playVideo} hasOptions={false}/>

                        <div className="clearfix"></div>

                        <h3>Crops</h3>

                        <button onClick={this.newVideo}>New Crop</button>
                        <button onClick={this.removeAllVideos}>Remove All</button>

                        {
                            this.state.crops.map((item, i) => <ItemList
                                key={i}
                                video={item}
                                hasOptions={true}
                                removeVideo={this.removeVideo}
                                onPlay={this.playVideo}
                                onEdit={this.editVideo}
                            />)
                        }


                    </div>
                </div>

            </div>
        );
    }
}


export default Layout;
