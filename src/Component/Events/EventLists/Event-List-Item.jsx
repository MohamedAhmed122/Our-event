import React from "react";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import EventAttendees from "./Event-List-Attendees";

const EventListITem = () => (
  <Segment.Group>
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image size="tiny" src="/assets/user.png" circular />
          <Item.Content>
            <Item.Header content="Event Title" />
            <Item.Description>Hosted By Bob</Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
    <Segment>
      <span style={{ marginRight: "1em" }}>
        <Icon name="clock" /> Date
      </span>
      <span>
        <Icon name="marker" /> Avenue
      </span>
    </Segment>
    <Segment secondary>
      <List horizontal>
        <List.Item>
          <EventAttendees />
        </List.Item>
        <List.Item>
          <EventAttendees />
        </List.Item>
      </List>
    </Segment>
    <Segment clearing>
      <div>Description of the Event </div>
      <Button color="teal" floated="right" content="view" />
    </Segment>
  </Segment.Group>
);
export default EventListITem;
