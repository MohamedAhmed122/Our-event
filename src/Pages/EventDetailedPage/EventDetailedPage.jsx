import React, { Fragment } from "react";
import { Grid } from "semantic-ui-react";
import EVSidebar from "../../Component/EventDetailed/EDSidebar";
import EVHeader from "../../Component/EventDetailed/EDHeader";
import EVInfo from "../../Component/EventDetailed/EDInfo";
import EVChat from "../../Component/EventDetailed/EDChat";
import { useSelector, useDispatch } from "react-redux";
import { useFirestoreDoc } from "../../firebase/hooks/useFirebaseDoc";
import { listenToEventDoc } from "../../firebase/firestoreService";
import { listenEvent } from "../../redux/Event/EventAction";
import Loading from '../../Component/Loading/LoadingComponent'
import { Redirect } from "react-router-dom";

const EventDetailedPage = ({ match }) => {
  const { loading, error } = useSelector((state) => state.async);
  const dispatch = useDispatch()
  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  useFirestoreDoc({
    query: () => listenToEventDoc(match.params.id),
    data: (event) => dispatch(listenEvent([event])),
    deps: [match.params.id], 
  });

  if (loading || (!event && !error)) return <Loading />;
  if (error) return <Redirect to='/error'/>
  return (
    <Fragment>
      <Grid>
        <Grid.Column width={10}>
          <EVHeader event={event} />
          <EVInfo event={event} />
          <EVChat />
        </Grid.Column>
        <Grid.Column width={6}> 
          <EVSidebar />
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default EventDetailedPage;
