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
import {ToastContainer} from 'react-toastify'
import ErrorComponent from "./Component/error/Error";
import AccountPage from "./Pages/AccountPage/AccountPage";
import { useSelector } from "react-redux";
import Loading from "./Component/Loading/LoadingComponent";


function App() {

  const { key } = useLocation();
  const {initialized} = useSelector(state => state.async)
   if (!initialized) return <Loading />
  return (
    <Fragment>
      <ModalManger />
      <ToastContainer position='bottom-right' />
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
                <Route path='/error' component={ErrorComponent} />
                <Route exact path='/settings' component={AccountPage}/>
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
}

export default App;
