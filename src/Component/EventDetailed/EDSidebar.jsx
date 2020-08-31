import React, { Fragment } from "react";
import { Segment, Item } from "semantic-ui-react";

const EVSidebar = ({ attendee }) => (
  <Fragment>
    <Segment
      textAlign="center"
      style={{ border: "none" }}
      attached="top"
      secondary
      inverted
      color="teal"
    >
      {attendee.id.length > 1
        ? "one person is going to the Event "
        : " People are going to the Event"}
    </Segment>
    <Segment attached>
      <Item.Group relaxed divided>
        <Item key={attendee.id} style={{ position: "relative" }}>
          <Item.Image
            size="tiny"
            src={attendee.photoURL || "/assets/user.png"}
          />
          <Item.Content verticalAlign="middle">
            <Item.Header as="h3">
              <span>{attendee.displayName}</span>
            </Item.Header>
          </Item.Content>
        </Item>
      </Item.Group>
    </Segment>
  </Fragment>
);
export default EVSidebar;
