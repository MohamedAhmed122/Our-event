import React from "react";
import { Menu, Header } from "semantic-ui-react";
import Calendar from 'react-calendar'
import { Fragment } from "react";

const FilterEvent = () => (
  <Fragment>
    <Menu vertical size="large" style={{ width: "100%" }}>
        <Header icon="filter" attached color="teal" content="Filter" />
        <Menu.Item content="All Events" />
        <Menu.Item content="I'm going" />
        <Menu.Item content="I'm Hosting" />
    </Menu>
    <Header icon='calendar' attached color='teal' content='Select date' />
    <Calendar/>
  </Fragment>
);
export default  FilterEvent;