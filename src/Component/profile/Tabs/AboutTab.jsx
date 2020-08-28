import React from "react";
import { Tab, Grid, Header, Button } from "semantic-ui-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ProfileForm from "./ProfileForm";
import { format } from "date-fns";


const AboutTab = ({profile}) => {
const [editMode, setEditMode] = useState(null);
const { currentUser } = useSelector((state) => state.auth);
console.log(currentUser);
return (
    <Tab.Pane>
        <Grid>
            <Grid.Column width={16}>
            <Header
                floated="left"
                icon="user"
                content={`About ${profile.displayName}`}
            />
            <Button
                basic
                floated="right"
                onClick={() => setEditMode(!editMode)}
                content={editMode ? "Cancel" : "Edit"}
            />
            </Grid.Column>
            <Grid.Column width={16}>
            {editMode ? (
                <ProfileForm />
            ) : (
                <>
                <div style={{ marginBottom: 15 }}>
                  <strong>
                  Member since: {format(profile.createdAt, 'dd MMM yyyy')}
                  </strong>
                  <div>{currentUser.description || ''}</div>
                </div>
              </>
            )}
            </Grid.Column>
        </Grid>
    </Tab.Pane>
);
};
export default AboutTab;
