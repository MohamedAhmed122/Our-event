import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../../Component/Events/EventLists/EventList";
import EventForm from "../../Component/Events/EventForm/EventForm";
import { sampleData } from "../../api/SampleData";
const EventDashboard = ({ open, setOpen,handleSelected,selectedEvent }) => {
  const [events, setEvents] = useState(sampleData);

  
  const handleCreateEvent=(event)=>{
    setEvents([...events, event])
  } 
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} handleSelected={handleSelected}/>
      </Grid.Column>
      <Grid.Column width={6}>
        {open && (
          <EventForm
            setOpen={setOpen}
            createEvent={handleCreateEvent}
            selectedEvent={selectedEvent}
            //////////////////////
            key={selectedEvent ? selectedEvent.id : null}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
export default EventDashboard;
