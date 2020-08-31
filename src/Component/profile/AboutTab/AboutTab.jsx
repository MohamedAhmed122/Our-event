import React from "react";
import { Tab, Grid, Header, Button, Icon } from "semantic-ui-react";
import { useState } from "react";
import { format } from "date-fns";
import ProfileForm from "./ProfileForm";

const AboutTab = ({ profile, isCurrentUser }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <Tab.Pane>
        <Grid>
            <Grid.Column width={16}>
            <Header
                floated="left"
                icon="user teal"
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
                <ProfileForm setEditMode={setEditMode} profile={profile} />
            ) : (
                <>
                <div style={{ marginBottom: 15 }}>
                    <h5>
                    <Icon name="time" color="teal" />
                    Member since:{" "}
                    <span style={{ marginLeft: 2 }}>
                        {format(profile.createdAt, "dd mm yyyy")}
                    </span>
                    </h5>
                    {profile.description && (
                    <h5 style={{ marginTop: 20 }}>
                        <Icon name="address card outline" color="teal " /> Bio:{" "}
                        {profile.description || ""}
                    </h5>
                    )}
                    {profile.dateOfBirth && (
                    <h5>
                        <Icon name="birthday cake" color="teal" /> Was born in{" "}
                        {profile.dateOfBirth || ""}
                    </h5>
                    )}
                </div>
                </>
            )}
            </Grid.Column>
        </Grid>
    </Tab.Pane>
  );
};
export default AboutTab;
