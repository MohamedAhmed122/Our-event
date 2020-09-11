import React, { Fragment, useState } from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { addUserAttendance, cancelUserAttendance } from "../../firebase/firestoreService";

const EVHeader = ({currentUser, event, isHost, isGoing }) => {
  const [loading, setLoading] = useState(false);
  const handleAddUser = async () => {
    setLoading(true);
    try {
      await addUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = async () => {
    setLoading(true);
    try {
      await cancelUserAttendance(event);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const eventImageStyle = {
    filter: "brightness(30%)",
  };

  const eventImageTextStyle = {
    position: "absolute",
    bottom: "5%",
    left: "5%",
    width: "100%",
    height: "auto",
    color: "white",
  };
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`/assets/categoryImages/${event.category}.jpg`}
          fluid
          style={eventImageStyle}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={event.title}
                  style={{ color: "white" }}
                />
                <p>{format(event.date, "MMMM d, yyyy h:mm a")}</p>
                <p>
                  Hosted by <strong><Link to={`/profile/${event.hostUId}`}> {event.hostedBy} </Link></strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      { currentUser &&
          <Segment attached="bottom" clearing>
          {!isHost && (
            <Fragment>
              {isGoing ? (
                <Button onClick={handleCancel} loading={loading} >Cancel My Place</Button>
              ) : (
                <Button color="teal" loading={loading} onClick={handleAddUser}>
                  JOIN THIS EVENT
                </Button>
              )}
            </Fragment>
          )}
          {isHost && (
            <Button
              color="orange"
              floated="right"
              as={Link}
              to={`/manage/${event.id}`}
            >
              Manage Event
            </Button>
          )}
        </Segment>
      }
    </Segment.Group>
  );
};
export default EVHeader;
