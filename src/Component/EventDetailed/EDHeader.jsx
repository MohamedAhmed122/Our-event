import React, { Fragment, useState } from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "react-toastify";
import {
  addUserAttendance,
  cancelUserAttendance,
} from "../../firebase/firestoreService";
import { useSelector } from "react-redux";
import UnAuthModal from "../Modal-Component/ModalsForm/UnauthModal";
const EVHeader = ({ event, isHost, isGoing }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
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
    bottom: "2%",
    left: "5%",
    width: "100%",
    height: "auto",
    color: "white",
  };
  return (
    <Fragment>
      {modelOpen && <UnAuthModal setModelOpen={setModelOpen} />}
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image
            src={`/assets/categoryImages/${event.category}.jpg`}
            alt =''
            style={eventImageStyle}
            fluid
          />

          <Segment basic style={eventImageTextStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size='large'
                    content={event.title}
                    style={{ color: "white" }}
                  />
                  <p>{format(event.date, "MMMM d, yyyy h:mm a")}</p>
                  <p>
                    Hosted by{" "}
                    <strong>
                      <Link to={`/profile/${event.hostUId}`}>
                        {" "}
                        {event.hostedBy}{" "}
                      </Link>
                    </strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>

        <Segment attached="bottom" clearing>
          {!isHost && (
            <Fragment>
              {isGoing ? (
                <Button onClick={handleCancel} loading={loading}>
                  Cancel My Place
                </Button>
              ) : (
                <Button
                  color="teal"
                  loading={loading}
                  onClick={
                    isAuthenticated ? handleAddUser : () => setModelOpen(true)
                  }
                >
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
      </Segment.Group>
    </Fragment>
  );
};
export default EVHeader;
