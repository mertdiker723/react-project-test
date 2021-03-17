import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import ButtonTag from '../../controls/Button/ButtonTag';
import Form from 'react-bootstrap/Form';
import TextInput from '../../controls/TextInput/TextInput';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import SelectInput from '../../controls/Select/SelectInput';
toast.configure();
class CustomerModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Name: "",
            Surname: "",
            Age: undefined,
            CountryId: undefined,
            errorMessage: ""
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.customer !== this.props.customer) {
            this.setState({
                id: this.props.customer.id,
                Name: this.props.customer.Name,
                Surname: this.props.customer.Surname,
                Age: this.props.customer.Age,
                CountryId: this.props.customer.CountryId
            })
        }
    }


    onCustomerSelectHandler = (val, name) => {
        if (val !== "Default select") {
            this.setState({
                ...this.state,
                [name]: val
            })
        }

    }
    onCustomerHandler = (e, name) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }
    createCustomer = (e) => {
        e.preventDefault();
        if (this.state.Surname && this.state.Name && this.state.Age) {
            this.props.createCustomer({
                Name: this.state.Name,
                Surname: this.state.Surname,
                Age: this.state.Age,
                CountryId: this.state.CountryId || null
            });
            this.setState({
                Name: "",
                Surname: "",
                Age: null,
                CountryId: null
            }, () => {
                toast.success("Customer saved.", { position: toast.POSITION.BOTTOM_RIGHT });
                this.props.showModelHandler();
            })
        }
        else {
            this.setState({
                errorMessage: "Required Field"
            })
        }

    }

    updateCustomer = (e) => {
        e.preventDefault();
        if (this.state.Surname && this.state.Name && this.state.Age) {
            this.props.updateCustomer({
                id: this.state.id,
                Name: this.state.Name,
                Surname: this.state.Surname,
                Age: this.state.Age,
                CountryId: this.state.CountryId || null
            });
            this.setState({
                Name: "",
                Surname: "",
                Age: null,
                CountryId: null
            }, () => {
                toast.success("Customer updated.", { position: toast.POSITION.BOTTOM_RIGHT });
                this.props.showModelHandler();
            })
        }
        else {
            this.setState({
                errorMessage: "Required Field"
            })
        }

    }

    render() {
        return (
            <Modal
                show={this.props.modalShow}
                onHide={this.props.showModelHandler}
                size={"lg"}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Customer Definition
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Row>
                            <Col sm={6}>
                                <Form.Group as={Col} controlId="nameSurname">
                                    <TextInput
                                        type={"text"}
                                        label={"Name: "}
                                        name={"Name"}
                                        placeholder={"Name"}
                                        value={this.state.Name}
                                        onChange={this.onCustomerHandler}
                                    />
                                    {!this.state.Name ? <span style={{ color: "red" }}>{this.state.errorMessage}</span> : null}
                                    <br />
                                    <TextInput
                                        type={"text"}
                                        label={"Surname: "}
                                        name={"Surname"}
                                        placeholder={"Surname"}
                                        value={this.state.Surname}
                                        onChange={this.onCustomerHandler}
                                    />
                                    {!this.state.Surname ? <span style={{ color: "red" }}>{this.state.errorMessage}</span> : null}
                                </Form.Group>
                            </Col>
                            <Col sm={6}>
                                <Form.Group as={Col} controlId="ageCountry">
                                    <TextInput
                                        type={"number"}
                                        label={"Age: "}
                                        name={"Age"}
                                        placeholder={"Age"}
                                        value={this.state.Age}
                                        onChange={this.onCustomerHandler}
                                    />
                                    {!this.state.Age ? <span style={{ color: "red" }}>{this.state.errorMessage}</span> : null}
                                    <br />
                                    <SelectInput
                                        label={"Country"}
                                        name={"CountryId"}
                                        values={this.props.countries}
                                        value={+this.state.CountryId}
                                        onChange={this.onCustomerSelectHandler}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col>
                                <ButtonTag
                                    onClick={this.props.showModelHandler}
                                    text={"Close"}
                                    type={""}
                                    color={"secondary"}
                                    className={"float-right"}
                                />
                                <ButtonTag
                                    onClick={!this.state.id ? this.createCustomer : this.updateCustomer}
                                    type={"submit"}
                                    text={!this.state.id ? "Submit" : "Update"}
                                    color={!this.state.id ? "primary" : "success"}
                                    className={"mr-2 float-right"}
                                />
                            </Col>
                        </Form.Row>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default CustomerModal;