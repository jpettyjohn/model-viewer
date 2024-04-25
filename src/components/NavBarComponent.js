import React, { useState,  useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavbarComponent = () => {

    return (
        <Navbar bg="dark" expand="lg">
            <div className='navbar-main'>
                <div className="navbar-container">
                    <NavLink to="/" className="inactive navlink" activeClassName="active">Home</NavLink>
                    <NavLink to="/viewer" className="inactive navlink" activeClassName="active">Viewer</NavLink> 
                </div>
            </div>
        </Navbar>
    );
}

export default NavbarComponent;