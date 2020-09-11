import React from "react";

import { Tab, Grid, Header, Card, Image } from "semantic-ui-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFirestoreCollection } from "../../../firebase/hooks/useFirestoreCollection";
import { getUserEventsQuery } from "../../../firebase/firestoreService";
import { listenToUserEvent } from "../../../redux/Profile/ProfileAction";
import {format} from 'date-fns'

const EventsTab = ({ profile, isCurrentUser }) => {
  const [activeEvent, setActiveEvent] = useState(0);
  const { events } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();

  useFirestoreCollection({
    query: () => getUserEventsQuery(activeEvent, profile.id),
    data: (event) => dispatch(listenToUserEvent(event)),
    deps: [dispatch, activeEvent, profile.id],
  });

  const panes = [
    { menuItem: "Future Events", pane: { key: "future" } },
    { menuItem: "Past Events", pane: { key: "Past" } },
    { menuItem: "I am Hosting", pane: { key: "Hosting" } },
  ];

  return (
    <Tab.Pane loading={loading} >
        <Grid>
            <Grid.Column width={16}>
            <Header floated="left" content="Events" />
            </Grid.Column>
        </Grid>
        <Grid>
            <Grid.Column width={16}>
            <Tab
                onTabChange={(e, data) => setActiveEvent(data.activeIndex)}
                panes={panes}
                menu={{ secondary: true, pointing: true }}
            />
            <Card.Group itemsPerRow={2} style={{ marginTop: 12 }}>
                {events.map((event) => (
                <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                    <Image
                    src={`/assets/categoryImages/${event.category}.jpg`}
                    style={{ minHeight: 100, objectFit: "cover" }}
                    />
                    <Card.Content>
                    <Card.Header content={event.title} textAlign="center" />
                    <Card.Meta textAlign="center">
                        <div>{format (event.date, 'dd MMM yyyy')}</div>
                        <div>{format (event.date, 'hh:mm a')}</div>
                    </Card.Meta>
                    </Card.Content>
                </Card>
                ))}
            </Card.Group>
            </Grid.Column>
        </Grid>
    </Tab.Pane>
  );
};
export default EventsTab;
