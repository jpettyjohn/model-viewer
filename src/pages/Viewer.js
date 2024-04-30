import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import UploadButton from "../components/UploadButton";

const Viewer = () => {
    return (
        /* Id like to change the styling to use app.css */
        <div style={{ padding: "20px" }}>
            <Container>
                <h4 style={{ textAlign: "center" }}>Site Name</h4>
                <Row className="justify-content-center">
                    <Col xs={12} sm={6}>
                        <Card>
                            {/* Add your image component here */}
                            <Card.Img
                                variant="top"
                                // src={/*an image*/}
                                alt="Description of the image"
                                style={{ maxWidth: "100%" }}
                            />
                        </Card>
                    </Col>
                    <UploadButton/>
                </Row>
            </Container>
        </div>
    );
};

export default Viewer;