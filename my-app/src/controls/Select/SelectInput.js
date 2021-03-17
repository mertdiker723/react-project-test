import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
class SelectInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: undefined
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.value) {
            if (prevProps.value !== this.props.value) {
                this.setState({
                    value: +this.props.value
                })
            }
        }

    }


    handleChange = (e) => {
        this.setState({
            value: +e.target.value
        }, () => {
            this.props.onChange(this.state.value, this.props.name)
        })
    }

    render() {

        return (
            <>
                <Form.Label><b>{this.props.label}</b></Form.Label>
                <select className="form-control" onChange={(e) => this.handleChange(e)} value={this.state.value || "Default select"} name={this.props.name}>
                    <option defaultChecked >Default select</option>
                    {
                        this.props.values.map(item => {
                            return (
                                <option key={item.id} value={item.id}>{item.Name}</option>
                            )
                        })
                    }
                </select>
            </>
        )
    }
}

export default SelectInput;


