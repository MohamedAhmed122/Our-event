import React from "react";
import { Tab, Grid, Header, Button, Card, Image } from "semantic-ui-react";
import { useState } from "react";
import UploadPhoto from "./UploadPhoto";
import {useFirestoreCollection} from "../../../firebase/hooks/useFirestoreCollection";
import { getUserPhotos, setMainPhoto } from "../../../firebase/firestoreService";
import { useDispatch, useSelector } from "react-redux";
import { listenToUserPhoto } from "../../../redux/Profile/ProfileAction";
import { toast } from "react-toastify";

const PhotosTab = ({ profile, isCurrentUser }) => {
const dispatch = useDispatch();
const [editMode, setEditMode] = useState(false);
const [update, setUpdate] =useState(false)
const { photos } = useSelector((state) => state.profile);
const { loading } = useSelector((state) => state.async);

useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhoto(photos)),
    deps: [profile.id, dispatch],
});

const handleMainPhoto = async(photo)=>{
    setUpdate(true);
    try {
        await setMainPhoto(photo)
        // toast.success('Success','Photo has been updated')
    } catch (error) {
        toast.error(error.message)
        setUpdate(false)
    }
}

return (
    <Tab.Pane loading={loading}>
        <Grid>
            <Grid.Column width={16}>
            <Header floated="left" icon="photo" content={"My Photos"} />
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
                <UploadPhoto setEditMode={setEditMode} />
            ) : (
                <Card.Group itemsPerRow={5}>
                {photos.map((photo) => (
                    <Card key={photo.id}>
                    <Image src={photo.url} />
                    <Button.Group>
                        <Button loading={update} onClick={()=> handleMainPhoto(photo)} basic color="green" content="main" />
                        <Button basic color="red" icon="trash" />
                    </Button.Group>
                    </Card>
                ))}
                </Card.Group>
            )}
            </Grid.Column>
        </Grid>
    </Tab.Pane>
);
};
export default PhotosTab;
