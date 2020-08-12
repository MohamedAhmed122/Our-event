import React from "react";
import EventListITem from "./Event-List-Item";

const EventList = ({ events }) => (
  <div>
    {events.map((event) => (
      <EventListITem key={event.id} event={event} />
    ))}
  </div>
);
export default EventList;
