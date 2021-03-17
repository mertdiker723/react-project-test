import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadCustomers } from '../actions/customer-action/customer-action';
import { loadCountries } from '../actions/country-action/country-action'
import './Home.css';
import _ from 'underscore';
class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            labels: [],
            datasets: [
                {
                    label: '',
                    data: []
                }
            ]
        }
    }

    componentDidMount() {
        this.props.actions.loadCustomers();
        this.props.actions.loadCountries();
    }

    componentDidUpdate(prevProps, prevState) {
        const { customers } = this.props;
        if (prevProps.customers !== customers) {
            this.setState({
                ...this.state,
                labels: customers.map(item => item.Name),
                datasets: [
                    {
                        label: 'Customer Age Table',
                        data: customers.map(item => +item.Age),
                        borderColor: ['rgb(209, 97, 97,0.3)'],
                        backgroundColor: ['rgb(135, 171, 144,0.5)'],
                        pointBackgroundColor: ['rgb(209, 97, 97)'],
                        pointBorderColor: ['rgb(209, 97, 97,0.2)'],
                    }
                ]
            })
        }
    }


    render() {
        const { customers } = this.props;
        const selectedCountries = customers.filter((item, pos, self) => self.findIndex(v => v.CountryId === item.CountryId) === pos);
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Home</h1>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 d-flex justify-content-center">
                        <div className={"chart-home"}>
                            <Line data={this.state} />
                        </div>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 d-flex justify-content-center">
                                <div className="chart-country">
                                    <h4 style={{ textAlign: "center" }}>Customers</h4>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Surname</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                customers.map((customer, index) => {
                                                    return (
                                                        <tr>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{customer.Name}</td>
                                                            <td>{customer.Surname}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <div className="chart-country">
                                    <h4 style={{ textAlign: "center" }}>Selected Countries</h4>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                selectedCountries.map((customer, index) => {
                                                    return (
                                                        <tr>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{customer.CountryName}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
        countries: state.countryReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            loadCustomers: bindActionCreators(loadCustomers, dispatch),
            loadCountries: bindActionCreators(loadCountries, dispatch)
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);