import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import UploadButton from "../components/UploadButton";
import ViewerComponent from "../components/ViewerComponent";

const Viewer = () => {
    return (
        <div className="viewer-main">
            <h4>Site Name</h4>
            <div className="viewer-container">
                <ViewerComponent />
            </div>
            <UploadButton/>
        </div>
    );
};

export default Viewer;