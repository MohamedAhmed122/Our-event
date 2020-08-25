import React from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../../Component/Events/EventLists/EventList";
import { useSelector, useDispatch } from "react-redux";
import FilterEvent from "./EventFilters";
import { listenToEventFromFirestore } from "../../firebase/firestoreService";

import EventListItemPlaceholder from "../../Component/Loading/EventListItemPlaceholder";
import { listenEvent } from "../../redux/Event/EventAction";

import { useFirestoreCollection } from "../../firebase/hooks/useFirestoreCollection";

const EventDashboard = () => {
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();

  useFirestoreCollection({
    query: () => listenToEventFromFirestore(),
    data: (events) => dispatch(listenEvent(events)),
    deps: [dispatch],
  });

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading ? <EventListItemPlaceholder /> : null}
        <EventList events={events} />
      </Grid.Column> 
      <Grid.Column width={6}>{loading ? null : <FilterEvent />}</Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
