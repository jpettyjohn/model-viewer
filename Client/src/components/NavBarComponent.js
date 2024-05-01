import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import Logo from "../assets/images/vdclogo.jpg";

const NavbarComponent = () => {
	return (
		<Navbar bg="dark" expand="lg">
			<div className="navbar-main">
				<div className="navbar-logo-container">
					<Navbar.Brand as={NavLink} to="/">
						<img
							className="navbar-logo"
							src={Logo}
							alt="This is the logo"></img>
					</Navbar.Brand>
				</div>
				<div className="navbar-container">
					<NavLink
						to="/viewer"
						className="inactive navlink"
						activeClassName="active">
						Viewer
					</NavLink>
					<NavLink
						to="/sites"
						className="inactive navlink"
						activeClassName="active">
						Sites
					</NavLink>
				</div>
			</div>
		</Navbar>
	);
};

export default NavbarComponent;
