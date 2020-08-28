import React from 'react';
import { useSelector } from 'react-redux';
import { Segment, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ErrorComponent =()=>{
    const {error} =useSelector(state => state.async);
    return(
        <Segment placeholder>
            <Header textAlign='center' content={error?.message || "Oops -We have an error you Son of bitch should not be here"} />
            <Button as={Link} to='/event' primary style={{marginTop: 25}} content='Return To events Page' />
        </Segment>
    )
}
export default ErrorComponent;