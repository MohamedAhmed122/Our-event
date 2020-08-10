import React, { Fragment, useState } from "react";

import "./App.css";
import Navbar from "./Layout/nav/navbar";
import EventDashboard from "./Pages/EventDashboard/EventDashboard";
import { Container } from "semantic-ui-react";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Navbar setOpen={setOpen} />
      <Container className="main">
        <EventDashboard open={open} setOpen={setOpen}/>
      </Container>
    </Fragment>
  );
}

export default App;
