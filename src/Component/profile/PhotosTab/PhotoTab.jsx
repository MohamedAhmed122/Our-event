import React from "react";
import { Tab, Grid, Header, Button, Card, Image } from "semantic-ui-react";
import { useState } from "react";
import UploadPhoto from "./UploadPhoto";
import { useFirestoreCollection } from "../../../firebase/hooks/useFirestoreCollection";
import {
  getUserPhotos,
  setMainPhoto,
  deletePhotoFromCollection,
} from "../../../firebase/firestoreService";
import { useDispatch, useSelector } from "react-redux";
import { listenToUserPhoto } from "../../../redux/Profile/ProfileAction";
import { toast } from "react-toastify";
import { deleteFromFirbaseStorage } from "../../../firebase/firebaseService";

const PhotosTab = ({ profile, isCurrentUser }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [update, setUpdate] = useState({ isUpdating: false, target: null });
  const [deleting, setDeleting] = useState({ isDeleting: false, target: null });
  const { photos } = useSelector((state) => state.profile);
  const { loading } = useSelector((state) => state.async);

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos) => dispatch(listenToUserPhoto(photos)),
    deps: [profile.id, dispatch],
  });

  const handleMainPhoto = async (photo, target) => {
    setUpdate({ isUpdating: true, target });
    try {
      await setMainPhoto(photo);
      toast.success(
        "Success,Photo has been updated and refresh the page, Please"
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdate({ isUpdating: true, target: null });
    }
  };

  const deletePhoto = async (photo, target) => {
    setDeleting({ isDeleting: true, target });
    try {
      await deleteFromFirbaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
      toast.info("Success, Photo has been Deleted");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting({ isDeleting: false, target: null });
    }
  };

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
                <Card.Group itemsPerRow={2}>
                {photos.map((photo) => (
                    <Card key={photo.id}>
                    <Image src={photo.url} style={{height: '30rem'}} />
                    {isCurrentUser && (
                        <Button.Group>
                        <Button
                            name={photo.id}
                            loading={
                            (update.isUpdating, update.target === photo.id)
                            }
                            onClick={(e) => handleMainPhoto(photo, e.target.name)}
                            basic
                            color="green"
                            content="main"
                            type="submit"
                        />
                        <Button
                            name={photo.id}
                            onClick={(e) => deletePhoto(photo, e.target.name)}
                            loading={
                            (deleting.isDeleting, deleting.target === photo.id)
                            }
                            basic
                            color="red"
                            icon="trash"
                        />
                        </Button.Group>
                    )}
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
