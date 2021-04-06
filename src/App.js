import React from "react";
import Header from "./components/Header";
import Product from "./components/Product";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <Product />
      </Container>
    </>
  );
};

export default App;
