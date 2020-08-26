import React from "react";
import { Formik, Form } from "formik";

import FormInput from "../../Forms/FormInput";
import FormArea from "../../Forms/FormArea";
import { Button } from "semantic-ui-react";
import { useSelector } from "react-redux";
import * as Yup from 'yup'
import { updateProfile } from "../../../firebase/firestoreService";


const ProfileForm = () => {

const {currentUser} = useSelector(state => state.auth)
return (
    <Formik
    initialValues={{ displayName: currentUser.displayName, description:currentUser.description || ' ' }}
    validationSchema={Yup.object({
        displayName:Yup.string().required(),
    })}
    onSubmit={async(values, {setSubmitting}) =>{
        try {
            await updateProfile(values)
            setSubmitting(false)
        } catch (error) {
            console.log(error)
        }
    }}
    >
        {({ isSubmitting, isValid, dirty }) => (
            <Form className="ui form">
                <FormInput name="displayName" placeholder="displayName" />
                <FormArea name="description" placeholder="Tell us About you" rows={3} />
                <Button
                    loading={isSubmitting}
                    disabled={!isValid || !dirty || isSubmitting}
                    floated='right'
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
export default  ProfileForm;