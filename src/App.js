import React, { Fragment, useState } from "react";

import "./App.css";
import Navbar from "./Layout/nav/navbar";
import EventDashboard from "./Pages/EventDashboard/EventDashboard";
import { Container } from "semantic-ui-react";

function App() {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelected = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };
  const handleOpen = () => {
    setSelectedEvent(null);
    setOpen(true);
  };
  return (
    <Fragment>
      <Navbar setOpen={handleOpen} />
      <Container className="main">
        <EventDashboard
          open={open}
          setOpen={setOpen}
          handleSelected={handleSelected}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
        />
      </Container>
    </Fragment>
  );
}

export default App;
