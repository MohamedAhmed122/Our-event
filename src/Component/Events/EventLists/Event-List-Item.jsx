import React from "react";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import EventAttendees from "./Event-List-Attendees";
import { Link } from "react-router-dom";
import {deleteEvent} from '../../../redux/Event/EventAction'
import {connect} from 'react-redux'

const EventListITem = ({ event ,deleteEvent}) => {
  const {
    title,
    date,
    hostPhotoURL,
    attendees,
    hostedBy,
    venue,
    description,
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
        </List>
      </Segment>
      <Segment clearing>
        <div>{description} </div>
        <Button
          color="teal"
          floated="right"
          content="View"
          as={Link} to={`/event/${event.id}`}
        />
        <Button
          color='red'
          floated="right"
          content="Delete"
          onClick={()=> deleteEvent(event.id)}
        />
      </Segment>
    </Segment.Group>
  );
};

const mapDispatchToProps =(dispatch)=>({
  
  deleteEvent: (event)=>dispatch(deleteEvent(event))
})

export default connect(null,mapDispatchToProps) (EventListITem);
