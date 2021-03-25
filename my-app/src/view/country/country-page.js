import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as countryActions from '../../actions/country-action/country-action';
import CountryModal from './country-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BsFillBackspaceReverseFill } from "react-icons/bs";
import { HiCog } from "react-icons/hi";
// eslint-disable-next-line
import _, { filter } from 'underscore'
import ButtonTag from '../../controls/Button/ButtonTag';
import * as customerActions from '../../actions/customer-action/customer-action';
import SearchInput from '../../controls/SearchInput/SearchInput';
import Pagination from '../../controls/Pagination/Pagination';
class CountryPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
            multiDeleteItems: [],
            currentPage: 1,
            postsPerPage: 5,
            countryFiltered: ""
        }
    }
    componentDidMount() {
        this.props.actions.loadCountries();
        this.props.actions.loadCustomers();
    }

    deleteOneCounty = (country) => {
        toast.success("Country deleted.", { position: toast.POSITION.BOTTOM_RIGHT });
        this.props.actions.deleteCountry(country);
        this.props.customers.forEach(customer => {
            if (customer.CountryId === country.id) {
                this.props.actions.updateCustomer({
                    id: customer.id,
                    Name: customer.Name,
                    Surname: customer.Surname,
                    Age: customer.Age,
                    CountryId: null
                });
            }
        });
    }

    editOneCountry = (country) => {
        this.props.actions.editCountry({
            id: country.id,
            Name: country.Name
        })
        this.showModelHandler();
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

    deleteSelectedCountries = () => {
        this.state.multiDeleteItems.forEach(country => {
            this.props.actions.deleteCountry(country);
        })
        toast.success(`${this.state.multiDeleteItems.length} ${this.state.multiDeleteItems.length !== 1 ? "Countries" : "Country"} deleted.`, { position: toast.POSITION.BOTTOM_RIGHT });
        this.setState({
            multiDeleteItems: []
        })
    }

    searchCountryName = (e) => {
        this.setState({
            countryFiltered: e.target.value
        })
    }
    render() {
        const { currentPage, postsPerPage, countryFiltered } = this.state;
        const filteredCountries = this.props.countries.filter(country => {
            return country.Name.toLowerCase().indexOf(countryFiltered.toLowerCase()) !== -1;
        });
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = filteredCountries.slice(indexOfFirstPost, indexOfLastPost);


        return (
            <div className="container">
                <div className="text-center">
                    <h1>Country</h1>
                </div>

                <div style={{ float: 'right', marginBottom: "10px" }}>
                    <SearchInput
                        placeholder={"Search Country"}
                        type={"text"}
                        name={"searchCountry"}
                        onChange={(e) => this.searchCountryName(e)}
                    />
                </div>


                <br />
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>__</th>
                            <th>CountryName</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentPosts.map((country, index) => {
                                return (
                                    <tr key={country.id}>
                                        <th>{index + 1}</th>
                                        <th><input type="checkbox" checked={this.state.multiDeleteItems.find(x => x.id === country.id) ? true : false} onChange={(e) => this.checkBoxHandler(e, country)} id="checkCountry" /></th>
                                        <td>{country.Name}</td>
                                        <th>
                                            <BsFillBackspaceReverseFill style={{ cursor: 'pointer' }} className={"mr-3"} onClick={() => this.deleteOneCounty(country)} title={"Delete"} />
                                            <HiCog style={{ cursor: 'pointer' }} title={"Edit"} onClick={() => this.editOneCountry(country)} />
                                        </th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <hr />
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={filteredCountries.length}
                    paginate={(paginate) => this.setState({ currentPage: paginate })}
                />
                <div className="float-right">Page Number: <b>{currentPage}</b></div>
                <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.showModelHandler}>Add</button>
                {this.state.multiDeleteItems.length !== 0 ? <ButtonTag
                    onClick={this.deleteSelectedCountries}
                    text={"Clear All"}
                    type={""}
                    color={"secondary"}
                    className={"ml-2"}
                /> : null}

                {
                    this.state.modalShow && <CountryModal
                        modalShow={this.state.modalShow}
                        showModelHandler={this.showModelHandler}
                        createOneCountry={this.props.actions.createCountry}
                        oneCountry={this.props.oneCountry}
                        updateCountry={this.props.actions.updateCountry}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        countries: state.countryReducer,
        oneCountry: state.oneCountryReducer,
        customers: state.customerReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            loadCountries: bindActionCreators(countryActions.loadCountries, dispatch),
            deleteCountry: bindActionCreators(countryActions.deleteCountry, dispatch),
            createCountry: bindActionCreators(countryActions.createCountry, dispatch),
            editCountry: bindActionCreators(countryActions.editCountry, dispatch),
            updateCountry: bindActionCreators(countryActions.updateCountry, dispatch),
            updateCustomer: bindActionCreators(customerActions.updateCustomer, dispatch),
            loadCustomers: bindActionCreators(customerActions.loadCustomers, dispatch)
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CountryPage);