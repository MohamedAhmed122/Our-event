import React, { Fragment, useState } from "react";

import "./App.css";
import Navbar from "./Layout/nav/navbar";
import EventDashboard from "./Pages/EventDashboard/EventDashboard";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage/Home";
import EventDetailedPage from "./Pages/EventDetailedPage/EventDetailedPage";
import CreateEvent from "./Component/Events/EventForm/EventForm";

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
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <Navbar setOpen={handleOpen} />
            <Container className="main">
              <Switch>
                <Route
                  exact
                  path="/event"
                  render={() => (
                    <EventDashboard
                      open={open}
                      setOpen={setOpen}
                      handleSelected={handleSelected}
                      selectedEvent={selectedEvent}
                      setSelectedEvent={setSelectedEvent}
                    />
                  )}
                />
                <Route path="/event/:id" component={EventDetailedPage} />
                <Route path="/createEvent" component={CreateEvent} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
}

export default App;
