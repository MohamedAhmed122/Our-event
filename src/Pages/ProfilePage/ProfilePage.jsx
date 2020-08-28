import React from "react";
import { Grid } from "semantic-ui-react";
import ProfileHeader from "../../Component/profile/ProfileHeader";
import ProfileContent from "../../Component/profile/ProfileContent";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../Layout/Loading/LoadingComponent";
import { useFirestoreDoc } from "../../firebase/hooks/useFirebaseDoc";
import { getUserProfile } from "../../firebase/firestoreService";
import { listenToSelectedUserProfile } from "../../redux/Profile/ProfileAction";

const ProfilePage = ({ match }) => {
  const dispatch = useDispatch();
  const { selectedUserProfile } = useSelector((state) => state.profile);
  const { currentUser } = useSelector((state) => state.auth);

  const { loading, error } = useSelector((state) => state.async);

  useFirestoreDoc({
    query: () => getUserProfile(match.params.id),
    data: (profile) => dispatch(listenToSelectedUserProfile(profile)),
    deps: [dispatch, match.params.id],
  });

  if ((loading && !selectedUserProfile) || (!selectedUserProfile && !error))
    return <Loading />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader
          profile={selectedUserProfile}
          isCurrentUser={currentUser.uid === selectedUserProfile.id}
        />
        <ProfileContent
          profile={selectedUserProfile}
          isCurrentUser={currentUser.uid === selectedUserProfile.id}
        />
      </Grid.Column>
    </Grid>
  );
};
export default ProfilePage;
