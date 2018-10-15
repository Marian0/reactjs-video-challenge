import React, {Component} from 'react';
import ItemList from "../ItemList/ItemList";
import VideoModal from "../VideoModal/VideoModal";


class CropSidebar extends Component {

    constructor(props, state) {
        super(props, state);

        this.state = {
            modalProps: {
                isVisible: false,
                video: null,
                key: null
            },
        }
    }

    newModal = () => {
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

    editModal = (video, id) => {
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

    renderModal = () => {
        if (this.state.modalProps.isVisible) {
            return (
                <VideoModal {...this.state.modalProps} videoId={this.state.modalProps.key} onModalClosed={this.closeModal} onModalSaved={this.props.saveVideo}/>);
        }

        return null;
    };

    handleFilter = (event) => {
        this.props.filterCrops(event.target.value.toLowerCase());
    };

    render() {

        return (
            <div>

                {this.renderModal()}

                <h3>Crops</h3>

                <button onClick={this.newModal} className="btn btn-default pull-right">
                    <i className="glyphicon glyphicon-plus"></i>
                    New Crop
                </button>

                <button onClick={this.props.removeAllVideos} className="btn btn-danger pull-left">
                    <i className="glyphicon glyphicon-trash"></i>
                    Remove All
                </button>

                <div className="clearfix"></div>

                {
                    this.props.cropsCount > 0 &&
                    <form action="">
                        <br/>
                        <div className="form-group">
                            <input type="text" onChange={this.handleFilter} placeholder="Type to filter..."
                                   className="form-control"/>
                        </div>
                    </form>
                }

                {
                    this.props.showing.map((item, i) => <ItemList
                        key={i}
                        video={item}
                        hasOptions={true}
                        removeVideo={this.props.removeVideo}
                        onPlay={this.props.playVideo}
                        onEdit={this.editModal}
                    />)
                }

                <br/>

                {
                    this.props.cropsCount === 0 &&
                    <div className="alert alert-info starting">Let's start creating new videos by clicking on New Crop button !</div>
                }
            </div>
        );
    }
}


export default CropSidebar;
