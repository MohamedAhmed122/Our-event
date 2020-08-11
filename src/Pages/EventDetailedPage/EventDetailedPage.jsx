import React, { Fragment } from "react";
import { Grid } from "semantic-ui-react";
import EVSidebar from "../../Component/EventDetailed/EDSidebar";
import EVHeader from "../../Component/EventDetailed/EDHeader";
import EVInfo from "../../Component/EventDetailed/EDInfo";
import EVChat from "../../Component/EventDetailed/EDChat";

const EventDetailedPage = () => (
  <Fragment>
    <Grid>
      <Grid.Column width={10}>
        <EVHeader />
        <EVInfo />
        <EVChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EVSidebar />
      </Grid.Column>
    </Grid>
  </Fragment>
);

export default EventDetailedPage;
