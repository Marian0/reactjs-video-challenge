import React, {Component} from 'react';
import {Tooltip, OverlayTrigger, Glyphicon} from 'react-bootstrap';

class TagTooltip extends Component {


    render() {

        if (! this.props.tags ) {
            return null;
        }

        const tooltip = (
            <Tooltip id="tooltip">
                Tags: {this.props.tags}
            </Tooltip>
        );


        return (
            <OverlayTrigger placement="top" overlay={tooltip}>
                <Glyphicon glyph="tags" />
            </OverlayTrigger>

        );

    }

}

export default TagTooltip;
