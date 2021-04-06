import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

const HomeScreen = () => {
  return (
    <>
      <Row>
        <Col sm={12} md={6} lg={4}>
          <Product />
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;
