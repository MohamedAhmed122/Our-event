import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import FormInput from "../../Forms/FormInput";
import cuid from "cuid";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createEvent, updateEvent } from "../../../redux/Event/EventAction";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormArea from "../../Forms/FormArea";
import FormSelect from "../../Forms/FormSelect";
import {categoryData} from  '../../../api/categoryOp'

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
    category: Yup.string().required("You must provide category"),
    city: Yup.string().required("You must provide city"),
    description: Yup.string().required("You must provide description"),
    venue: Yup.string().required("You must provide venue"),
    date: Yup.string().required(),
  });

  return (
    <Segment clearing>
      <Formik
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: "Bob",
                  attendees: [],
                  hostPhotoURL: "/assets/user.png",
                })
              );
          history.push("/event");
        }}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className="ui form" autoComplete="off">
          <Header content="Event Details" color="teal" sub />
          <FormInput name="title" placeholder="Event Title" />
          <FormSelect name="category" placeholder="Category" options={categoryData} />
          <FormArea
            name="description"
            placeholder="Event Description"
            rows={3}
          />
          <Header content="Event Location" color="teal" sub />
          <FormInput name="city" placeholder="City" />
          <FormInput name="venue" placeholder="Venue" />
          <FormInput name="date" placeholder="Event Date" type="date" />
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
