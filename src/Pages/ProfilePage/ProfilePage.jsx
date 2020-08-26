import React from "react";
import { Grid } from "semantic-ui-react";
import ProfileHeader from "../../Component/profile/ProfileHeader";
import ProfileContent from "../../Component/profile/ProfileContent";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../Component/Loading/LoadingComponent";
import { useFirestoreDoc } from "../../firebase/hooks/useFirebaseDoc";
import { getUserProfile } from "../../firebase/firestoreService";
import { listenToCurrentUserProfile } from "../../redux/Profile/ProfileAction";

const ProfilePage = ({ match }) => {
  const dispatch = useDispatch();
  const { currentUserProfile } = useSelector((state) => state.profile);

const { loading} = useSelector((state) => state.async);

useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToCurrentUserProfile(profile)),
    deps: [dispatch, match.params.id],
});

    if (loading) return <Loading />;

return (
    <Grid>
        <Grid.Column width={16}>
            <ProfileHeader profile={currentUserProfile} />
            <ProfileContent profile={currentUserProfile} />
        </Grid.Column>
    </Grid>
);
};
export default ProfilePage;
