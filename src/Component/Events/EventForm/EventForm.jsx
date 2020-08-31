/* global google */
import React from "react";
import { Segment, Header, Button } from "semantic-ui-react";
import FormInput from "../../Forms/FormInput";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { listenEvent } from "../../../redux/Event/EventAction";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormArea from "../../Forms/FormArea";
import FormSelect from "../../Forms/FormSelect";
import { categoryData } from "../../../api/categoryOp";
import FormDate from "../../Forms/FormDate";
import PlaceInput from "../../Forms/FormPlaces";
import { useFirestoreDoc } from "../../../firebase/hooks/useFirebaseDoc";
import {
  listenToEventDoc,
  UpdateEventToFirestore,
  CreateEventToFirestore,
  cancelEvent,
} from "../../../firebase/firestoreService"; 
import Loading from '../../../Layout/Loading/LoadingComponent';
import { toast } from "react-toastify";

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );
  const { loading, error } = useSelector((state) => state.async);
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
    shouldExecute: !!match.params.id,
    query: () => listenToEventDoc(match.params.id),
    data: (event) => dispatch(listenEvent([event])),
    deps: [match.params.id],
  });

  if (loading) return <Loading />;
  if (error) return <Redirect to="/error" />;

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
        onSubmit={async (values, ) => {
          try {
            selectedEvent
              ? await UpdateEventToFirestore(values)
              : await CreateEventToFirestore(values);
            history.push("/event");
            toast.success('Success,Event has been created')
          } catch (error) {
            toast.error(error.message)
          }
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
            <PlaceInput name="city" placeholder="City" />
            <PlaceInput
              autoComplete="of"
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
            {selectedEvent && (
              <Button
                type="button"
                floated="left"
                onClick={() => cancelEvent(selectedEvent)}
                color={selectedEvent.isCancel ? "green" : "red"}
                content={
                  selectedEvent.isCancel ? "Reactivate event" : "Cancel Event"
                }
              />
            )}
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
