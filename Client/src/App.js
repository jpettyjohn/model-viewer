import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBarComponent from "./components/NavBarComponent";
import Viewer from "./pages/Viewer";
import Home from "./pages/Home";
import Sites from "./pages/Sites";
import Auth from "./utils/auth";
import "./App.css";

function App() {
	const containerStyle = {
		backgroundColor: "rgb(106, 113, 125)",
		color: "white",
		minHeight: "90vh",
		width: "100%",
		paddingTop: "2vh",
	};

	return (
		<Router>
			<NavBarComponent />
			<Container fluid style={containerStyle}>
				<Routes>
					<Route path="/" Component={Home} />
					<Route path="/viewer" Component={Viewer} />
					<Route path="/sites" Component={Sites} />
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
