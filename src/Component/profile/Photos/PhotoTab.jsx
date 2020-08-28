import React from "react";
import { Tab, Grid, Header, Button, Card, Image } from "semantic-ui-react";
import { useState } from "react";


const PhotosTab = ({ profile, isCurrentUser }) => {
  const [editMode, setEditMode] = useState(null);

  return (
    <Tab.Pane>
        <Grid>
            <Grid.Column width={16}>
            <Header floated="left" icon="user" content={"My Photos"} />
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
                <h2>Profile Picture will come here</h2>
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
