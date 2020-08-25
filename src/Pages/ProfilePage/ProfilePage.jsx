import React, { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from '../../Component/profile/ProfileHeader';
import ProfileContent from '../../Component/profile/ProfileContent';

const ProfilePage =()=>{
    return(
        <Fragment>
            <Grid>
                <Grid.Column width={16}>
                    <ProfileHeader/>
                    <ProfileContent />
                </Grid.Column>
            </Grid>
        </Fragment>
    )
}
export default ProfilePage