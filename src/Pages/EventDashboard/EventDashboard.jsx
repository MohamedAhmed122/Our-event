import React  from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../../Component/Events/EventLists/EventList";
import EventForm from "../../Component/Events/EventForm/EventForm";
import { sampleData } from "../../api/SampleData";
const EventDashboard = ({ open, setOpen }) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={sampleData} />
      </Grid.Column>
      <Grid.Column width={6}>
        {open && <EventForm setOpen={setOpen} />}
      </Grid.Column>
    </Grid>
  );
};
export default EventDashboard;
