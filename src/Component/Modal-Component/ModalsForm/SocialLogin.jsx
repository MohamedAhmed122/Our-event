import React, { Fragment } from "react";
import { Button } from "semantic-ui-react";
import { socialLogin } from "../../../firebase/firebaseService";
import { useDispatch } from "react-redux";
import {closeModal} from '../../../redux/Modal/ModalAction'
const SocialLogin = () => {
    const dispatch = useDispatch()
    const handleSocialLogin =(selectedProvider)=>{
        socialLogin(selectedProvider)
        dispatch(closeModal())
    }
return (
    <Fragment>
        <Button
            onClick={()=>handleSocialLogin('facebook')}
            color="facebook"
            fluid
            icon="facebook"
            content="Login With Facebook"
            style={{ marginBottom: 10 }}
        />
        <Button
            onClick={()=>handleSocialLogin('google')}
            color="google plus"
            fluid
            icon="google"
            content="Login With Google"
        />
    </Fragment>
);
};
export default SocialLogin;
