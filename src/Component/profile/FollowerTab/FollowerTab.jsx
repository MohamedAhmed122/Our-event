import React from "react";
import { Tab, Grid, Header, Card } from "semantic-ui-react";
import ProfileCard from "../ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { useFirestoreCollection } from "../../../firebase//hooks/useFirestoreCollection";
import {
  getFollowersCollection,
  getFollowingCollection,
} from "../../../firebase/firestoreService";
import {
  listenToFollowers,
  listenToFollowing,
} from "../../../redux/Profile/ProfileAction";


const FollowerTab = ({ profile, activeTab }) => {

const dispatch = useDispatch();
const { followers, following } = useSelector((state) => state.profile);

useFirestoreCollection({
    query:
        activeTab === 3
            ? () => getFollowersCollection(profile.id)
            : () => getFollowingCollection(profile.id),
    data: (profile) =>
        activeTab === 3
            ? dispatch(listenToFollowers(profile))
            : dispatch(listenToFollowing(profile)),
    deps: [dispatch, activeTab],
});

return (
    <Tab.Pane>
        <Grid>
            <Grid.Column width={16}>
            <Header floated="left" content={activeTab === 3? 'Followers': 'Following'} />
            </Grid.Column>
            <Grid.Column width={16}>
            <Card.Group itemsPerRow={5}>
                {
                    activeTab === 3 &&
                    followers.map(follower =>  <ProfileCard profile={follower} key={follower.id}/>)
                }
                {
                    activeTab === 4 &&
                    following.map(follower =>  <ProfileCard profile={follower} key={follower.id}/>)
                }
            </Card.Group>
            </Grid.Column>
        </Grid>
    </Tab.Pane>
);
};
export default FollowerTab;
