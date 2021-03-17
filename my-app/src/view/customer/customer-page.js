import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as customerActions from '../../actions/customer-action/customer-action.js';
import * as countryActions from '../../actions/country-action/country-action.js';
import { BsFillBackspaceReverseFill } from "react-icons/bs";
import { HiCog } from "react-icons/hi";
import _ from 'underscore';
import CustomerModal from './customer-modal';
import { toast } from 'react-toastify';
import ButtonTag from '../../controls/Button/ButtonTag.js';
import SearchInput from '../../controls/SearchInput/SearchInput.js';
class CustomerPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
            multiDeleteItems: [],
            customerFiltered: ""
        }
    }
    componentDidMount() {
        this.props.actions.loadCountries();
        this.props.actions.loadCustomers();
    }

    deleteOneCustomer = (customer) => {
        toast.success("Customer deleted.", { position: toast.POSITION.BOTTOM_RIGHT });
        this.props.actions.deleteCustomer(customer)
    }
    showModelHandler = () => {
        this.setState((prevState) => {
            return {
                modalShow: !prevState.modalShow
            }
        })
    }

    checkBoxHandler = (e, data) => {
        if (e.target.checked) {
            const selectedCountries = [...this.state.multiDeleteItems, data];
            this.setState({
                multiDeleteItems: selectedCountries
            })
        }
        else {
            const filteredCountries = this.state.multiDeleteItems.filter(item => item.id !== data.id);
            this.setState({
                multiDeleteItems: filteredCountries
            })
        }
    }

    deleteSelectedCustomers = () => {
        this.state.multiDeleteItems.forEach(customer => {
            this.props.actions.deleteCustomer(customer);
        })
        toast.success(`${this.state.multiDeleteItems.length} ${this.state.multiDeleteItems.length !== 1 ? "Customers" : "Customer"} deleted.`, { position: toast.POSITION.BOTTOM_RIGHT });
        this.setState({
            multiDeleteItems: []
        })
    }


    editOneCustomer = (customer) => {
        this.props.actions.editCustomer(customer);
        this.showModelHandler();
    }

    searchCustomerName = (e) => {
        this.setState({
            customerFiltered: e.target.value
        })
    }

    render() {
        const filteredCountries = this.props.customers.filter(country => {
            return country.Name.toLowerCase().indexOf(this.state.customerFiltered.toLowerCase()) !== -1;
        });
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Customer</h1>
                </div>
                <div style={{ float: 'right', marginBottom: "10px" }}>
                    <SearchInput
                        placeholder={"Search Customer"}
                        type={"text"}
                        name={"searchCustomer"}
                        onChange={(e) => this.searchCustomerName(e)}
                    />
                </div>

                <br /><br />
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>__</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Age</th>
                            <th>Country</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredCountries.map((customer, index) => {
                                return (
                                    <tr key={customer.id}>
                                        <th>{index + 1}</th>
                                        <th><input type="checkbox" onChange={(e) => this.checkBoxHandler(e, customer)} id="checkCustomer" /></th>
                                        <td>{customer.Name || '-'}</td>
                                        <td>{customer.Surname || '-'}</td>
                                        <td>{+customer.Age || '-'}</td>
                                        <td>{customer.CountryName || "-"}</td>
                                        <td>
                                            <BsFillBackspaceReverseFill style={{ cursor: 'pointer' }} onClick={() => this.deleteOneCustomer(customer)} className={"mr-3"} title={"Delete"} />
                                            <HiCog title={"Edit"} style={{ cursor: 'pointer' }} onClick={() => this.editOneCustomer(customer)} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <hr />
                <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.showModelHandler}>Add</button>

                {this.state.multiDeleteItems.length !== 0 ? <ButtonTag
                    onClick={this.deleteSelectedCustomers}
                    text={"Clear All"}
                    type={""}
                    color={"secondary"}
                    className={"ml-2"}
                /> : null}

                {
                    this.state.modalShow && <CustomerModal
                        modalShow={this.state.modalShow}
                        showModelHandler={this.showModelHandler}
                        createCustomer={this.props.actions.createCustomer}
                        customer={this.props.customer}
                        countries={this.props.countries}
                        updateCustomer={this.props.actions.updateCustomer}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        customers: state.countryReducer.length === 0 ? state.customerReducer : state.customerReducer.map(customer => {
            return {
                ...customer,
                CountryName: _.find(state.countryReducer, a => a.id === +customer.CountryId) ? _.find(state.countryReducer, a => a.id === +customer.CountryId).Name : ""
            }
        }),
        countries: state.countryReducer,
        customer: state.oneCustomerReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            loadCustomers: bindActionCreators(customerActions.loadCustomers, dispatch),
            loadCountries: bindActionCreators(countryActions.loadCountries, dispatch),
            createCustomer: bindActionCreators(customerActions.createCustomer, dispatch),
            deleteCustomer: bindActionCreators(customerActions.deleteCustomer, dispatch),
            editCustomer: bindActionCreators(customerActions.editCustomer, dispatch),
            updateCustomer: bindActionCreators(customerActions.updateCustomer, dispatch)
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPage);