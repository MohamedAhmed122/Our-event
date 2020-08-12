import React, { useState } from "react";
import { Segment, Header, FormField, Button, Label } from "semantic-ui-react";
// import cuid from "cuid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { createEvent, updateEvent } from "../../../redux/Event/EventAction";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide title"),
  });

  return (
    <Segment clearing>
      <Header content={selectedEvent ? "Edit the event" : "Create new event"} />
      <Formik
        onSubmit={(values) => console.log(values)}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className="ui form" autoComplete="off">
          <FormField>
            <Field name="title" placeholder="Event Title" />
            <ErrorMessage
              name="title"
              render={(error) => <Label content={error} color="red" basic />}
            />
          </FormField>
          <FormField>
            <Field name="category" placeholder=" Category" />
          </FormField>
          <FormField>
            <Field name="description" placeholder="Event description" />
          </FormField>
          <FormField>
            <Field name="city" placeholder="City" />
          </FormField>
          <FormField>
            <Field name="venue" placeholder="Venue" />
          </FormField>
          <FormField>
            <Field name="date" placeholder="Event Date" type="date" />
          </FormField>
          <Button type="submit" floated="right" positive content="Submit" />
          <Button
            as={Link}
            to="/event"
            type="submit"
            floated="right"
            content="Cancel"
          />
        </Form>
      </Formik>
    </Segment>
  );
};

export default EventForm;

// const [values, setValues] = useState(initialValues);

// function handleFormSubmit() {
//   selectedEvent
//     ? dispatch(updateEvent({ ...selectedEvent, ...values }))
//     : dispatch(
//         createEvent({
//           ...values,
//           id: cuid(),
//           hostedBy: "Bob",
//           attendees: [],
//           hostPhotoURL: "/assets/user.png",
//         })
//       );
//   history.push("/event");
// }

// function handleInputChange(e) {
//   const { name, value } = e.target;
//   setValues({ ...values, [name]: value });
// }
