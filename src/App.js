import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import PeopleScreen from "./screens/PeopleScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <Route path='/people/:id' component={PeopleScreen} />
        <Route path='/page/:page' component={HomeScreen} exact />
        <Route path='/' component={HomeScreen} exact />
      </Container>
    </Router>
  );
};

export default App;
