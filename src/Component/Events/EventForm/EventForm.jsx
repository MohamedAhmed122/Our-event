/* global google */
import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import FormInput from "../../Forms/FormInput";
import cuid from "cuid";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { createEvent, updateEvent, listenEvent } from "../../../redux/Event/EventAction";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormArea from "../../Forms/FormArea";
import FormSelect from "../../Forms/FormSelect";
import { categoryData } from "../../../api/categoryOp";
import FormDate from "../../Forms/FormDate";
import PlaceInput from "../../Forms/FormPlaces";
import { useFirestoreDoc } from "../../../firebase/hooks/useFirebaseDoc";
import { listenToEventDoc } from "../../../firebase/firestoreService";
import Loading from "../../Loading/LoadingComponent";

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  const {loading, error} = useSelector(state =>  state.async)
  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: {
      address: "",
      latLng: null,
    },
    venue: {
      address: "",
      latLng: null,
    },
    date: "",
  };
  useFirestoreDoc({
    query: () => listenToEventDoc(match.params.id),
    data: (event) => dispatch(listenEvent([event])),
    deps: [match.params.id], 
  });

  if (loading || (!selectedEvent && !error)) return <Loading />;
  if (error) return <Redirect to='/error'/>

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string().required("You must provide a category"),
    description: Yup.string().required(),
    city: Yup.object().shape({
      address: Yup.string().required("City is required"),
    }),
    venue: Yup.object().shape({
      address: Yup.string().required("Venue is required"),
    }),
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
        {({ isSubmitting, dirty, isValid, values }) => (
          <Form className="ui form" autoComplete="off">
            <Header content="Event Details" color="teal" sub />
            <FormInput name="title" placeholder="Event Title" />
            <FormSelect
              name="category"
              placeholder="Category"
              options={categoryData}
            />
            <FormArea
              name="description"
              placeholder="Event Description"
              rows={3}
            />
            <Header content="Event Location" color="teal" sub />
            <PlaceInput  name="city" placeholder="City" />
            <PlaceInput
            autoComplete='of'
              name="venue"
              disabled={!values.city.latLng}
              placeholder="Venue"
              options={{
                location: new google.maps.LatLng(values.city.latLng),
                radius: 1000,
                types: ["establishment"],
              }}
            />
            <FormDate
              name="date"
              placeholderText="Event Date"
              timeFormat="HH:mm"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:m a"
            />
            <Button
              type="submit"
              floated="right"
              loading={isSubmitting}
              disabled={!isValid || isSubmitting || !dirty}
              positive
              content="Submit"
            />
            <Button
              as={Link}
              disabled={isSubmitting}
              to="/event"
              type="submit"
              floated="right"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default EventForm;
