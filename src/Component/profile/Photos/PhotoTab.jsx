import React from "react";
import { Tab, Grid, Header, Button, Card, Image } from "semantic-ui-react";
import { useState } from "react";
import UploadPhoto from "./UploadPhoto";


const PhotosTab = ({ profile, isCurrentUser }) => {
  const [editMode, setEditMode] = useState(true);

  return (
    <Tab.Pane>
        <Grid>
            <Grid.Column width={16}>
            <Header floated="left" icon='photo' content={"My Photos"} />
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
                <UploadPhoto/>
            ) : (
                <Card.Group itemsPerRow={5}>
                    <Card>
                        <Image  src={'/assets/user.png'} />
                        <Button.Group>
                            <Button basic color='green' content='main' />
                            <Button basic color='red' icon='trash' />

                        </Button.Group>
                    </Card>
                </Card.Group>
            )}
            </Grid.Column>
        </Grid>
    </Tab.Pane>
  );
};
export default PhotosTab;
