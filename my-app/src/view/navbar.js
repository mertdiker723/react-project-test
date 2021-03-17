import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-light">
                <div>
                    <div className="navbar-brand text-danger" style={{ cursor: "pointer" }} onClick={() => this.props.history.push("/")}>Netsis</div>
                    <button className="navbar-toggler mr-2 text-dark" onClick={() => this.props.history.push("/")}>Home</button>
                    <button className="navbar-toggler mr-2 text-dark" onClick={() => this.props.history.push("/customer")}>Customer</button>
                    <button className="navbar-toggler mr-2 text-dark" onClick={() => this.props.history.push("/country")}>Country</button>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar);