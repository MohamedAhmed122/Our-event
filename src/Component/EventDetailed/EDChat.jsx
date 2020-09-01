import React, { Fragment, useEffect } from "react";
import { Comment, Header, Segment } from "semantic-ui-react";
import ChatForm from "./ChatForm";
import { useDispatch, useSelector } from "react-redux";
import {formatDistance} from 'date-fns'
import {
  getEventChatRef,
  ConvertToArray,
} from "../../firebase/firebaseService";
import { listenToEventChat } from "../../redux/Event/EventAction";
import { Link } from "react-router-dom";
import { CLEAR_COMMENTS } from "../../redux/Event/EventType";

const EVChat = ({ eventId }) => {
    const dispatch = useDispatch();
    const { comment } = useSelector((state) => state.event);

useEffect(() => {
    getEventChatRef(eventId).on("value", (snapshot) => {
        if (!snapshot.exists()) return;
        dispatch(listenToEventChat(ConvertToArray(snapshot.val())));
    
    return() =>{
        dispatch({type: CLEAR_COMMENTS});
        getEventChatRef().off()
    }
});
}, [eventId, dispatch]);

return (
    <Fragment>
        <Segment
            textAlign="center"
            attached="top"
            inverted
            color="teal"
            style={{ border: "none" }}
        >
            <Header>Chat about this event</Header>
        </Segment>

        <Segment attached>
            <Comment.Group>
            {comment.map((comment) => (
                <Comment key={comment.id}>
                <Comment.Avatar src={comment.photoURL || "/assets/user.png"} />
                <Comment.Content>
                    <Comment.Author as={Link} to={`/profile/${comment.uid}`}>{comment.displayName}</Comment.Author>
                    <Comment.Metadata>
                    <div>{formatDistance( comment.date,new Date())}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                    <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
                </Comment>
            ))}
            </Comment.Group>
            <ChatForm eventId={eventId} />
        </Segment>
    </Fragment>
);
};
export default EVChat;
