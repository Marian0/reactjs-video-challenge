import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class VideoModal extends Component {

    constructor(props, state) {
        super(props, state);

        let {video} = this.props;
        let modalTitle = "Edit Video";
        if (!video) {
            modalTitle = "New Video";

            video = {
                name: "",
                from: "",
                to: "",
                tags: ""
            };
        }

        this.state = {
            video,
            modalTitle,
            key: this.props.videoId,
            error: ""
        };
    }

    handleClose = () => {
        this.props.onModalClosed();
    };

    validateVideo = (video) => {

        try {

            if (!video.name || video.name.length === 0) {
                throw new Error("Please, enter a valid name");
            }

            if (parseInt(video.from) !== video.from) {
                throw new Error("Please, enter a valid from");
            }

            if (parseInt(video.from) !== video.from) {
                throw new Error("Please, enter a valid to");
            }

            if (parseInt(video.from) > parseInt(video.to)) {
                throw new Error("To should be greater than from");
            }

            return true;

        } catch (err) {

            this.setState(() => {
                return {
                    error: err.message
                }
            });

            return false;
        }

    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.validateVideo(this.state.video)) {
            return;
        }

        this.props.onModalSaved(this.state.video, this.state.key);
        this.handleClose();
    };

    handleChange = (event) => {
        let {video} = this.state;

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        video[name] = value;

        this.setState(() => {
            return {video};
        });
    };

    render() {
        let {isVisible} = this.props;
        let {name, from, to, tags} = this.state.video;


        return (
            <Modal show={isVisible} onHide={this.handleClose}>

                <form onSubmit={this.handleSubmit}>

                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle || "New Video"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {
                            this.state.error &&
                                <div className="alert alert-danger">
                                    { this.state.error }
                                </div>
                        }

                        <div className="form-group">
                            <label htmlFor="">Name</label>
                            <input type="text" className="form-control" value={name} onChange={this.handleChange} name="name"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Start Time (in seconds)</label>
                            <input type="number" className="form-control" value={from} onChange={this.handleChange} name="from"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">End Time (in seconds)</label>
                            <input type="number" className="form-control" value={to} onChange={this.handleChange} name="to"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">Tags</label>
                            <input type="text" className="form-control" value={tags} onChange={this.handleChange} name="tags"/>
                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" onClick={this.handleSave}>
                            <i className="glyphicon glyphicon-save"></i>
                            Save
                        </Button>
                        <Button onClick={this.handleClose}>
                            <i className="glyphicon glyphicon-remove"></i>
                            Close
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}


export default VideoModal;
