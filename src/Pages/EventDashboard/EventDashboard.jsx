import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../../Component/Events/EventLists/EventList";
import EventForm from "../../Component/Events/EventForm/EventForm";
import { sampleData } from "../../api/SampleData";
const EventDashboard = ({
  open,
  setOpen,
  handleSelected,
  selectedEvent,
  setSelectedEvent,
}) => {
  const [events, setEvents] = useState(sampleData);

  const handleCreateEvent = (event) => {
    setEvents([...events, event]);
  };

  const handleUpdateEvent = (updateEvent) => {
    setEvents(
      events.map((event) => (event.id === updateEvent.id ? updateEvent : event))
    );
    setSelectedEvent(null);
    // setOpen(false)
  };

  const handleDeleteEvent =(evt) =>{
    setEvents(events.filter(event => event.id !== evt.id))
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList handleDeleteEvent={handleDeleteEvent} events={events} handleSelected={handleSelected} />
      </Grid.Column>
      <Grid.Column width={6}>
        {open && (
          <EventForm
            setOpen={setOpen}
            createEvent={handleCreateEvent}
            selectedEvent={selectedEvent}
            key={selectedEvent ? selectedEvent.id : null}
            handleUpdateEvent={handleUpdateEvent}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
export default EventDashboard;
