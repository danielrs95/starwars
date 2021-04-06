import React from "react";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <HomeScreen />
      </Container>
    </>
  );
};

export default App;
