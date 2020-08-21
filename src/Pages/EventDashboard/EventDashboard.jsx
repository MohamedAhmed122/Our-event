import React  from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../../Component/Events/EventLists/EventList";
import {useSelector} from 'react-redux' 
import FilterEvent from "./EventFilters";

const EventDashboard = () => {
  const {events} = useSelector(state=> state.event)

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList  events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <FilterEvent />
      </Grid.Column>
    </Grid>
  );
};

export default (EventDashboard);

