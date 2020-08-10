import React from "react";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import EventAttendees from "./Event-List-Attendees";

const EventListITem = ({
  event: {
    title,
    date,
    hostPhotoURL,
    attendees,
    category,
    hostedBy,
    city,
    venue,
    description,
  },
}) => (
  <Segment.Group>
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image size="tiny" src={hostPhotoURL} circular />
          <Item.Content>
            <Item.Header content={title} />
            <Item.Description>{hostedBy}</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
    <Segment>
      <span style={{ marginRight: "1em" }}>
        <Icon name="clock" /> {date}
      </span>
      <span>
        <Icon name="marker" /> {venue}
      </span>
    </Segment>
    <Segment secondary>
      <List horizontal>
        <List.Item>
          {attendees.map((attendee) => (
            <EventAttendees key={attendee.id} attendee={attendee} />
          ))}
        </List.Item>
        {/* <List.Item>
          <EventAttendees />
        </List.Item> */}
      </List>
    </Segment>
    <Segment clearing>
      <div>{description} </div>
      <Button color="teal" floated="right" content="view" />
    </Segment>
  </Segment.Group>
);
export default EventListITem;
