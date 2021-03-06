import React from "react";
import { Formik, Form } from "formik";

import FormInput from "../../Forms/FormInput";
import FormArea from "../../Forms/FormArea";
import { Button } from "semantic-ui-react";

import * as Yup from "yup";
import { updateProfile } from "../../../firebase/firestoreService";

const ProfileForm = ({ profile, setEditMode }) => {
  return (
    <Formik
      initialValues={{
        displayName: profile.displayName,
        description: profile.description || " ",
        dateOfBirth: profile.dateOfBirth || "",
      }}
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updateProfile(values);
          setSubmitting(false);
          setEditMode(false);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form className="ui form">
          <FormInput name="displayName" placeholder="displayName" />
          <FormInput name="dateOfBirth" placeholder="Your Birthday" type='date' />
          <FormArea
            name="description"
            placeholder="Tell us more about you"
            rows={3}
          />
          <Button
            loading={isSubmitting}
            disabled={!isValid || !dirty || isSubmitting}
            floated="right"
            type="submit"
            size="large"
            positive
            content="Update Profile"
          />
        </Form>
      )}
    </Formik>
  );
};
export default ProfileForm;
