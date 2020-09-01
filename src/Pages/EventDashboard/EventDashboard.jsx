import React from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../../Component/Events/EventLists/EventList";
import { useSelector, useDispatch } from "react-redux";
import FilterEvent from "./EventFilters";
import { listenToEventFromFirestore } from "../../firebase/firestoreService";

import EventListItemPlaceholder from "../../Layout/Loading/EventListItemPlaceholder";
import { listenEvent } from "../../redux/Event/EventAction";

import { useFirestoreCollection } from "../../firebase/hooks/useFirestoreCollection";
import { useState } from "react";

const EventDashboard = () => {
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const [predicate, setPredicate] = useState(
    new Map([
      ["startDate", new Date()],
      ["filter", "all"],
    ])
  );

  const handlePredicate = (key, value) => {
    setPredicate(new Map(predicate.set(key, value)));
  };

  const dispatch = useDispatch();

  useFirestoreCollection({
    query: () => listenToEventFromFirestore(predicate),
    data: (events) => dispatch(listenEvent(events)),
    deps: [dispatch,predicate],
  });

  return (
    <Grid>
      <Grid.Column width={10}>
        {loading ? <EventListItemPlaceholder /> : null}
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        {loading ? null : (
          <FilterEvent
            setPredicate={handlePredicate}
            loading={loading}
            predicate={predicate}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;
