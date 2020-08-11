import React, { Fragment } from "react";
import { Grid } from "semantic-ui-react";
import EVSidebar from "../../Component/EventDetailed/EDSidebar";
import EVHeader from "../../Component/EventDetailed/EDHeader";
import EVInfo from "../../Component/EventDetailed/EDInfo";
import EVChat from "../../Component/EventDetailed/EDChat";
import { useSelector } from "react-redux";

const EventDetailedPage = ({ match }) => {
  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  return (
    <Fragment>
      <Grid>
        <Grid.Column width={10}>
          <EVHeader event={event} />
          <EVInfo event={event} />
          <EVChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <EVSidebar />
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default EventDetailedPage;
