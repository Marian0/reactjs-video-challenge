import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class VideoModal extends Component {

    constructor(props, state) {
        super(props, state);

        let {video, indexKey} = this.props;
        let modalTitle = "Edit Video";
        if (!video) {
            modalTitle = "New Video";

            video = {
                name: "",
                from: 0,
                to: ""

            };
        }

        this.state = {
            video,
            modalTitle
        };
    }

    handleClose = () => {
        this.props.onModalClosed();
    };

    handleSubmit = (event) => {
        event.preventDefault();
        //@todo: validate input this.state.video
        this.props.onModalSaved(this.state.video, this.props.indexKey);
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
        let {name, from, to} = this.state.video;


        return (
            <Modal show={isVisible} onHide={this.handleClose}>

                <form onSubmit={this.handleSubmit}>

                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.modalTitle || "New Video"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="form-group">
                            <label htmlFor="">Name</label>
                            <input type="text" className="form-control" value={name} onChange={this.handleChange} name="name"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">From</label>
                            <input type="number" className="form-control" value={from} onChange={this.handleChange} name="from"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="">To</label>
                            <input type="number" className="form-control" value={to} onChange={this.handleChange} name="to"/>
                        </div>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" onClick={this.handleSave}>Save</Button>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}


export default VideoModal;
