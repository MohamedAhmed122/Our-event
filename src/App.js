import React, { Fragment } from "react";

import "./App.css";
import Navbar from "./Layout/nav/navbar";
import EventDashboard from "./Pages/EventDashboard/EventDashboard";
import { Container } from "semantic-ui-react";
import { Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage/Home";
import EventDetailedPage from "./Pages/EventDetailedPage/EventDetailedPage";
import CreateEvent from "./Component/Events/EventForm/EventForm";
import ModalManger from "./Component/Modal-Component/ManageModals/ModalManager";

function App() {
  const { key } = useLocation();
  return (
    <Fragment>
      <ModalManger />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <Navbar />
            <Container className="main">
              <Switch>
                <Route exact path="/event" component={EventDashboard} />
                <Route path="/event/:id" component={EventDetailedPage} />
                <Route
                  path={["/createEvent", "/manage/:id"]}
                  component={CreateEvent}
                  key={key}
                />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
}

export default App;
