import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../../Component/Events/EventLists/EventList";
import { useSelector, useDispatch } from "react-redux";
import FilterEvent from "./EventFilters";
import {
  getEventFromFirestore,
  dataFromSnapshot,
} from "../../firebase/firestoreService";

import EventListItemPlaceholder from "../../Component/Loading/EventListItemPlaceholder";
import { listenEvent } from "../../redux/Event/EventAction";

const EventDashboard = () => {
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = getEventFromFirestore({
      // this what happen next
      next: (snapshot) =>
        dispatch(
          listenEvent(
            snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
          )
        ),
      error: (error) => console.log(error),
    });
    return unsubscribe;
  },[dispatch]);

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
