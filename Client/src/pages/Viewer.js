import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import UploadButton from "../components/UploadButton";
import ViewerComponent from "../components/ViewerComponent";

const Viewer = () => {
	return (
		<div className="viewer-main">
			<div className="viewer-container">
				<ViewerComponent />
			</div>
		</div>
	);
};

export default Viewer;
