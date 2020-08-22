import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../../Component/Events/EventLists/EventList";
import { useSelector } from "react-redux";
import FilterEvent from "./EventFilters";
import {
  getEventFromFirestore,
  dataFromSnapshot,
} from "../../firebase/firestoreService";
import Loading from "../../Component/Loading/LoadingComponent";
import EventListItemPlaceholder from "../../Component/Loading/EventListItemPlaceholder";

const EventDashboard = () => {
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);

  useEffect(() => {
    const unsubscribe = getEventFromFirestore({
      next: (snapshot) =>
        console.log(
          snapshot.docs.map((docSnapshot) => dataFromSnapshot(docSnapshot))
        ),
      error: (error) => console.log(error),
    });
    return unsubscribe;
  });
  // if (loading) return <EventListItemPlaceholder/>
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
