import React from 'react';
import { Segment, Header, Button, Label } from 'semantic-ui-react';
import { Formik,  Form } from 'formik';
import * as Yup from 'yup'
import FormInput from '../../Component/Forms/FormInput';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateUserPassword } from '../../firebase/firebaseService';

const AccountPage =()=>{
    const { currentUser } = useSelector((state) => state.auth);
    return(
        <Segment>
            <Header content='Account' size='large' dividing />
            {currentUser.providerId === 'password' &&
                <div> 
                <Header color='teal' sub content='Change Password' />
                <p>Use this form to change your Password</p>
                <Formik
                initialValues={{newPassword1:'',newPassword2: ''}}
                validationSchema={Yup.object({
                    newPassword1: Yup.string().required('Password is required'),
                    newPassword2: Yup.string().oneOf(
                    [Yup.ref('newPassword1'), null],
                    'Passwords do not match'
                    ),
                })}
                onSubmit={async(values,{setSubmitting,setErrors},)=>{
                    try {
                        await updateUserPassword(values)                  
                    } catch (error) {
                        setErrors({auth: error.message})
                    }finally{
                        setSubmitting(false)
                    }
                    values.newPassword1=""
                    values.newPassword2=""
                }}
                >
                    {({isSubmitting,isValid, dirty, errors})=>(
                        <Form className='ui form'>
                            <FormInput name='newPassword1' type='password' placeholder='New Password'/>
                            <FormInput name='newPassword2' type='password' placeholder='Confirm Password'/>
                            { errors.auth &&
                                <Label 
                                content={errors.auth}
                                color='red' 
                                basic 
                                style={{marginBottom : 10}} 
                                />
                            }
                            <Button
                            disabled={!isValid || !dirty || isSubmitting} 
                            type='submit' 
                            loading={isSubmitting}
                            positive
                            content='Update Password' 
                            size='large'
                            style={{marginBottom:15, display: 'block'}}
                            />
                        </Form>
                    )}
                </Formik>
            </div>
            }
            { currentUser.providerId === 'facebook.com' &&    
                <div>
                    <Header color='teal' sub content='Facebook Account' />
                    <p>Please visit Facebook To update your account</p>
                    <Button 
                    color='facebook' 
                    icon='facebook' 
                    as={Link} 
                    to='https://facebook.com' size='large' 
                    content='Go to Facebook'
                    style={{marginBottom:15}}
                    />
                </div>}
                {    currentUser.providerId === 'google.com' &&       
                <div>
                    <Header color='teal' sub content='Google Account' />
                    <p>Please visit Google To update your account</p>
                    <Button 
                    color='google plus' 
                    icon='google' 
                    as={Link} 
                    to='https://google.com' size='large' 
                    content='Go to Google' />
                </div>}
            
            
        </Segment>
    )
}

export default  AccountPage;