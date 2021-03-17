import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'

class TextInput extends Component {
    render() {
        return (
            <>
                <Form.Label>
                    <b>{this.props.label}</b>
                </Form.Label>
                <Form.Control
                    type={this.props.type}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    className={this.props.className || ""}
                    value={this.props.value}
                    onChange={(e) => this.props.onChange(e, this.props.name)}
                />
            </>
        )
    }
}


export default TextInput;