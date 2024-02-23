/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './navbarcomponent.css'
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* Hamburger Icon */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasWithBothOptions"
                    aria-controls="offcanvasWithBothOptions"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Brand */}
                <a className="navbar-brand" href="/homepage">
                    <h1 className='navhirestyle'>Latsify<span className='navinstyle'>CRM</span></h1>
                </a>

                {/* Offcanvas */}
                <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Navigation</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink
                                    exact
                                    to="/clients"
                                    activeClassName="active-customer"
                                    className="nav-link"
                                >
                                    Clients
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    exact
                                    to="/companies"
                                    activeClassName="active-ticket"
                                    className="nav-link"
                                >
                                    Companies
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    exact
                                    to="/employee"
                                    activeClassName="active-ticket"
                                    className="nav-link"
                                >
                                    Employee
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    exact
                                    to="/ticket"
                                    activeClassName="active-ticket"
                                    className="nav-link"
                                >
                                    Tickets
                                </NavLink>
                            </li>
                        </ul>

                    </div>
                </div>

                {/* Search Form */}
                <form className="d-flex ms-auto">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                </form>

                {/* Account Dropdown */}
                <div className="d-flex">
                    <button className="btn btn-outline-success me-2">
                        <Link className="dropdown-item" to="/accountinfo">Account</Link>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
