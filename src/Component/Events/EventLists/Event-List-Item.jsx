import React from "react";
import { Segment, Item, Icon, List, Button, Label } from "semantic-ui-react";
import EventAttendees from "./Event-List-Attendees";
import { Link } from "react-router-dom";
import { deleteEvent } from "../../../redux/Event/EventAction";
import { connect } from "react-redux";
import { format } from "date-fns";
import { deleteEventFromFirestore } from "../../../firebase/firestoreService";

const EventListITem = ({ event, deleteEvent }) => {
  const {
    title,
    date,
    hostPhotoURL,
    attendees,
    hostedBy,
    venue,
    description,
    isCancel,
  } = event;
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" src={hostPhotoURL} circular />
            <Item.Content>
              <Item.Header content={title} />
              <Item.Description>{hostedBy}</Item.Description>
              {isCancel ? (
                <Label
                  color="red"
                  ribbon="right"
                  content="this Event has been Canceled"
                  style={{top: '-40px'}}
                />
              ): null}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span style={{ marginRight: "1em" }}>
          <Icon name="clock" /> {format(date, "MMMM d, yyyy h:mm a")}
        </span>
        <span>
          <Icon name="marker" /> {venue.address}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          <List.Item>
            {attendees.map((attendee) => (
              <EventAttendees key={attendee.id} attendee={attendee} />
            ))}
          </List.Item>
        </List>
      </Segment>
      <Segment clearing>
        <div>{description} </div>
        <Button
          color="teal"
          floated="right"
          content="View"
          as={Link}
          to={`/event/${event.id}`}
        />
        <Button
          color="red"
          floated="right"
          content="Delete"
          onClick={() => deleteEventFromFirestore(event.id)}
        />
      </Segment>
    </Segment.Group>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteEvent: (event) => dispatch(deleteEvent(event)),
});

export default connect(null, mapDispatchToProps)(EventListITem);
