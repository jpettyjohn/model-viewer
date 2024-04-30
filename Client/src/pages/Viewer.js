import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import UploadButton from "../components/UploadButton";

const Viewer = () => {
    return (
        /* Id like to change the styling to use app.css */
        <div class="viewer-main">
            <h4>Site Name</h4>
            <div class="viewer-container">
                <Card>
                    {/* Add your image component here */}
                    <Card.Img
                        variant="top"
                        // src={/*an image*/}
                        alt="Description of the image"
                        style={{ maxWidth: "100%" }}
                    />
                </Card>
            </div>
            <UploadButton/>
        </div>
    );
};

export default Viewer;