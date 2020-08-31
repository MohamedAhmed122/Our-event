import React, { Fragment } from "react";
import { Segment, Item, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

const EVSidebar = ({ event }) => (

  <Fragment>
    <Segment
      textAlign="center"
      style={{ border: "none" }}
      attached="top"
      secondary
      inverted
      color="teal"
    >
      {event.attendees.length} {event.attendees.length > 1 ? 'People are' : 'Person is'}   Going
    </Segment>
    <Segment attached>
      <Item.Group relaxed divided>
        {event.attendees.map((attendee) => (
          <Item  key={attendee.id} style={{ position: "relative" }}>
            {
              event.hostUId === attendee.id &&(
                <Label style={{position: 'absolute'}} color='orange' ribbon='right' content='Host' />
              )
            }
            <Item.Image
              size="tiny"
              src={attendee.photoURL || "/assets/user.png"}
            />
            <Item.Content verticalAlign="middle">
              <Item.Header as={Link} to={`/profile/${attendee.id}`}>
                <span>{attendee.displayName}</span>
              </Item.Header>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  </Fragment>
);
export default EVSidebar;
