import React from "react";
import EventListITem from "./Event-List-Item";

const EventList = ({ events, handleSelected }) => (
  <div>
    {events.map((event) => (
      <EventListITem
        key={event.id}
        event={event}
        handleSelected={handleSelected}
      />
    ))}
  </div>
);
export default EventList;
