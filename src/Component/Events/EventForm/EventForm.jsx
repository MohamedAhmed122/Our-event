import React, { useState, useEffect } from "react";
import { Segment, Header, Form, Button, FormField } from "semantic-ui-react";
import cuid from "cuid";

const EventForm = ({
  setOpen,
  selectedEvent,
  createEvent,
  handleUpdateEvent,
}) => {
  const [city, setCity] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  // To Select Event
  useEffect(() => {
    if (selectedEvent !== null) {
      setCategory(selectedEvent.category);
      setCity(selectedEvent.city);
      setDate(selectedEvent.date);
      setTitle(selectedEvent.title);
      setVenue(selectedEvent.venue);
      setDescription(selectedEvent.description);
    }
  }, [selectedEvent]);

  // To Create New Event & to update 
  const handleSubmit = () => {
    const values = {
      title,
      date,
      venue,
      city,
      category,
      description,
    };
    selectedEvent
      ? handleUpdateEvent({ ...selectedEvent, ...values })
      : createEvent({
          ...values,
          id: cuid(),
          hostedBy: "Bob",
          hostPhotoURL: "/assets/user.png",
          attendees: [],
        });
    setOpen(false);
  };

  return (
    <Segment clearing>
      <Header content="Create new Event" />
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Field>
        <FormField>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>
        <FormField>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </FormField>
        <FormField>
          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        </FormField>
        <FormField>
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </FormField>
        <Button content="Submit" type="submit" positive floated="right" />
        <Button
          content="Cancel"
          type="submit"
          floated="right"
          onClick={() => setOpen(false)}
        />
      </Form>
    </Segment>
  );
};

export default EventForm;
