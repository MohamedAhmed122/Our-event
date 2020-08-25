import React from "react";
import ModalWrapper from "../ManageModals/ModalWrapper";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "../../Forms/FormInput";
import { Button, Label, Divider } from "semantic-ui-react";
import { useDispatch } from "react-redux";

import {closeModal} from '../../../redux/Modal/ModalAction'
import { RegisterInFirebase } from "../../../firebase/firebaseService";
import SocialLogin from "./SocialLogin";

const RegisterForm = () => {
    const dispatch =useDispatch()
return (
    <ModalWrapper header="Register to our-events" size="mini">
    <Formik
        initialValues={{displayName:'', email: "", password: "" }}
        onSubmit={async(values,{setSubmitting, setErrors}) => {
            try {
                await RegisterInFirebase(values)
                setSubmitting(false);
                dispatch(closeModal())      
            } catch (error) {
                setErrors({auth: error.message})
                setSubmitting(false);
            }
        }}
        validationSchema={Yup.object({
            email: Yup.string().required().email(),
            password: Yup.string().required(),
            displayName: Yup.string().required()
        })}
        >
        {({ isSubmitting, dirty, isValid ,errors }) => (
        <Form className="ui form" autoComplete="off">
            <FormInput name="displayName" placeholder="displayName" />
            <FormInput name="email" placeholder="Email" />
            <FormInput name="password" placeholder="Password"  type='password'/>
            { errors.auth && <Label content={errors.auth} color='red' basic style={{marginBottom : 10}} />}
            <Button loading={isSubmitting}
            disabled={!isValid || !dirty || isSubmitting}
            color="teal" 
            type="submit" 
            content="Register"
            size='large'
            fluid
            />
            <Divider horizontal>Or</Divider>
            <SocialLogin />
        </Form>
        )}
    </Formik>
    </ModalWrapper>
);
};
export default RegisterForm;
