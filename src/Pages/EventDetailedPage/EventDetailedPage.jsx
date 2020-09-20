import React, { Fragment, useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import EVSidebar from "../../Component/EventDetailed/EDSidebar";
import EVHeader from "../../Component/EventDetailed/EDHeader";
import EVInfo from "../../Component/EventDetailed/EDInfo";
import EVChat from "../../Component/EventDetailed/EDChat";
import { useSelector, useDispatch } from "react-redux";
import { useFirestoreDoc } from "../../firebase/hooks/useFirebaseDoc";
import { listenToEventDoc } from "../../firebase/firestoreService";
import { listenEvent } from "../../redux/Event/EventAction";
import Loading from "../../Layout/Loading/LoadingComponent";
import { Redirect } from "react-router-dom";

const EventDetailedPage = ({ match }) => {
  const { loading, error } = useSelector((state) => state.async);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const event = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const isHost = event?.hostUId === currentUser?.uid;
  const isGoing = event?.attendees?.some(
    (attendee) => attendee.id === currentUser?.uid
  );

  useFirestoreDoc({
    query: () => listenToEventDoc(match.params.id),
    data: (event) => dispatch(listenEvent([event])),
    deps: [match.params.id],
  });
  const [reduceWidth,setReduceWidth ] =useState(false)

  const handleWidth =()=>{
    if(window.outerWidth <= 765){
      setReduceWidth(true)
    }
      else{
        setReduceWidth(false)
      }
    
  }
  useEffect(()=>{
    handleWidth()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[reduceWidth,window.addEventListener("resize", handleWidth)])
  
  window.addEventListener("resize", handleWidth)
  if (loading  || (!event && !error)) return <Loading />;
  if (error) return <Redirect to="/error" />;
  return (
    <Fragment>
      <Grid>
        <Grid.Column width={reduceWidth? 15:10}>
          <EVHeader  currentUser={currentUser} event={event} isHost={isHost} isGoing={isGoing} />
          <EVInfo event={event} />
          <EVChat currentUser={currentUser} eventId={event.id} />
        </Grid.Column>
        <Grid.Column width={reduceWidth? 1 :6}>
          <EVSidebar event={event}  />
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default EventDetailedPage;
