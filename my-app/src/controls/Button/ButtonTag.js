import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';

export default class ButtonTag extends Component {
    render() {
        return (
            <Button
                onClick={this.props.onClick}
                type={this.props.type || ""}
                variant={this.props.color}
                className={this.props.className || ""}
                disabled={this.props.disabled || false}
            >
                {this.props.text}
            </Button>
        )
    }
}
