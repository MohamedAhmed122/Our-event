import React from "react";
import ModalWrapper from "../ManageModals/ModalWrapper";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormInput from "../../Forms/FormInput";
import { Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { signInUser } from "../../../redux/Auth/Auth.Action";
import {closeModal} from '../../../redux/Modal/ModalAction'

const LoginForm = () => {
    const dispatch =useDispatch()
return (
    <ModalWrapper header="Sign in to our-events" size="mini">
    <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values,{setSubmitting}) => {
            dispatch(signInUser(values));
            setSubmitting(false);
            dispatch(closeModal())        
        }}
        validationSchema={Yup.object({
            email: Yup.string().required().email(),
            password: Yup.string().required()
        })}
        >
        {({ isSubmitting, dirty, isValid }) => (
        <Form className="ui form" autoComplete="off">
            <FormInput name="email" placeholder="Email" />
            <FormInput name="password" placeholder="Password"  type='password'/>
            <Button loading={isSubmitting}
            disabled={!isValid || !dirty || isSubmitting}
            color="teal" 
            type="submit" 
            content="LogIn"
            size='large'
            fluid
            />
        </Form>
        )}
    </Formik>
    </ModalWrapper>
);
};
export default LoginForm;
