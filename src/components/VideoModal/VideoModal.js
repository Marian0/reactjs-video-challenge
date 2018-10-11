import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';

class VideoModal extends Component {

    constructor(props, state) {
        super(props, state);
    }

    handleClose = () => {
        this.props.onModalClosed();
    };

    render() {
        let {isVisible, video, key} = this.props;
        return (
            <Modal show={isVisible} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Hello</h4>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


export default VideoModal;
