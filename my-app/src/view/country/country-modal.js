import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import ButtonTag from '../../controls/Button/ButtonTag';
import Form from 'react-bootstrap/Form';
import TextInput from '../../controls/TextInput/TextInput';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

//https://reactcommunity.org/react-modal/
toast.configure();
class CountryModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            Name: ""
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.oneCountry !== this.props.oneCountry) {
            this.setState({
                id: this.props.oneCountry.id,
                Name: this.props.oneCountry.Name
            })
        }
    }

    onCountryNameHandler = (e) => {
        this.setState({
            Name: e.target.value
        })
    }

    updateCountry = (e) => {
        e.preventDefault();
        if (this.state.Name.trim() !== '') {
            this.props.updateCountry(this.state);
            this.setState({
                Name: ""
            }, () => {
                toast.success("Country updated.", { position: toast.POSITION.BOTTOM_RIGHT });
                this.props.showModelHandler();
            })
        }
    }

    createCountry = (e) => {
        e.preventDefault();
        if (this.state.Name.trim() !== '') {
            this.props.createOneCountry(this.state);
            this.setState({
                Name: ""
            }, () => {
                toast.success("Country saved.", { position: toast.POSITION.BOTTOM_RIGHT });
                this.props.showModelHandler();
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
                        Country Definition
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                    <Form>
                        <Form.Row>
                            <Col sm={6}>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <TextInput
                                        type={"text"}
                                        label={"Country Name: "}
                                        name={"country"}
                                        placeholder={"Country"}
                                        value={this.state.Name}
                                        onChange={this.onCountryNameHandler}
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
                                    onClick={!this.state.id ? this.createCountry : this.updateCountry}
                                    type={"submit"}
                                    text={!this.state.id ? "Submit" : "Update"}
                                    color={!this.state.id ? "primary" : "success"}
                                    className={"mr-2 float-right"}
                                    disabled={this.state.Name.trim() === ''}
                                />
                            </Col>
                        </Form.Row>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default CountryModal;