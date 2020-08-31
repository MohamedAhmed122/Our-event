import React, { Fragment } from "react";
import { Button } from "semantic-ui-react";
import { Formik, Form } from "formik";
import FormArea from "../Forms/FormArea";
import { toast } from "react-toastify";
import { addEventChatComment } from "../../firebase/firebaseService";

const ChatForm = ({eventId}) => {
return (
    <Fragment>
        <Formik
            initialValues={{ comment: "" }}
            onSubmit={async(values,{setSubmitting ,resetForm }) =>{
                try {
                    await addEventChatComment(eventId, values.comment)
                    resetForm()
                } catch (error) {
                    toast.error(error.message)
                }finally{
                    setSubmitting(false)
                }
            }}
        >
            {({ isSubmitting }) => (
            <Form className=" ui form">
                <FormArea name="comment" placeholder="Type your Comment here" rows={2} />
                <Button
                loading={isSubmitting}
                content="Add Reply"
                labelPosition="left"
                icon="edit"
                primary
                />
            </Form>
            )}
        </Formik>
    </Fragment>
);
};
export default ChatForm;
