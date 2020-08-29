import React from "react";
import { Tab, Grid, Header, Button } from "semantic-ui-react";
import { useState } from "react";
import {format} from 'date-fns'
import ProfileForm from "./ProfileForm";


const AboutTab = ({ profile, isCurrentUser }) => {
  const [editMode, setEditMode] = useState(false);
 

  return (
    <Tab.Pane>
        <Grid>
            <Grid.Column width={16}>
            <Header
                floated="left"
                icon="user"
                content={`About ${profile.displayName}`}
            />
            {isCurrentUser && (
                <Button
                basic
                floated="right"
                onClick={() => setEditMode(!editMode)}
                content={editMode ? "Cancel" : "Edit"}
                />
            )}
            </Grid.Column>
            <Grid.Column width={16}>
            {editMode ? (
                <ProfileForm profile={profile} />
            ) : (
                <>
                <div style={{ marginBottom: 15 }}>
                    <strong>
                    Member since: <span style={{marginLeft: 2}}>{format((profile.createdAt), 'dd mm yyyy')}</span> 
                    </strong>  
                    {profile.description ? (
                    <div style={{ marginTop: 20 }}>
                        {" "}
                        Bio: {profile.description || ""}
                    </div>
                    ) : null}
                </div>
                </>
            )}
            </Grid.Column>
        </Grid>
    </Tab.Pane>
);
};
export default AboutTab;
