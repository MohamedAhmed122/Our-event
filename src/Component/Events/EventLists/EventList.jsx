import React from "react";
import EventListITem from "./Event-List-Item";

const EventList = ({ events, handleSelected, handleDeleteEvent }) => (
  <div>
    {events.map((event) => (
      <EventListITem
        key={event.id}
        event={event}
        handleSelected={handleSelected}
        handleDeleteEvent={handleDeleteEvent}
      />
    ))}
  </div>
);
export default EventList;
