import React, { useState } from "react";
import { Grid, } from "semantic-ui-react";
import EventList from "../../Component/Events/EventLists/EventList";

import { sampleData } from "../../api/SampleData";
const EventDashboard = () => {
  const [events, setEvents] = useState(sampleData);

  // const handleCreateEvent = (event) => {
  //   setEvents([...events, event]);
  // };

  // const handleUpdateEvent = (updateEvent) => {
  //   setEvents(
  //     events.map((event) => (event.id === updateEvent.id ? updateEvent : event))
  //   );
  //   setSelectedEvent(null);
  //   // setOpen(false)
  // };

  const handleDeleteEvent = (evt) => {
    setEvents(events.filter((event) => event.id !== evt.id));
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList
          handleDeleteEvent={handleDeleteEvent}
          events={events}
         
        />
      </Grid.Column>
      <Grid.Column width={6}>
       <h2>Event Filters</h2>
      </Grid.Column>
    </Grid>
  );
};
export default EventDashboard;
