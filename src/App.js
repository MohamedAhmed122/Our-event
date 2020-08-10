import React, { Fragment } from "react";

import "./App.css";
import Navbar from "./Layout/nav/navbar";
import EventDashboard from "./Pages/EventDashboard/EventDashboard";
import { Container } from "semantic-ui-react";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Container className="main">
        <EventDashboard />
      </Container>
    </Fragment>
  );
}

export default App;
