import React, { Fragment } from "react";
import {  Image } from "semantic-ui-react";

const EventAttendees = ({attendee:{photoURL}}) => (
  <Fragment>
    <Image style={{marginLeft:' 1rem'}} size="mini" src={photoURL} circular />
  </Fragment>
);
export default EventAttendees;
