import React, { useEffect } from "react";
import {
  Segment,
  Grid,
  Item,
  Header,
  Statistic,
  Divider,
  Reveal,
  Button,
} from "semantic-ui-react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  followUser,
  unfollowUser,
  getFollowingDoc,
} from "../../firebase/firestoreService";
import { setFollowUser, setUnFollowUser } from "../../redux/Profile/ProfileAction";
import { useDispatch, useSelector } from "react-redux";

const ProfileHeader = ({ profile, isCurrentUser }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [, setFollow] = useState(true); 
const {isFollowing} = useSelector(state => state.profile)

useEffect(() => {
    if (isCurrentUser) return;
    setLoading(true);
    async function fetchFollowingDoc() {
        try {
            const followingDoc = await getFollowingDoc(profile.id);
            if (followingDoc && followingDoc.exists) {
            dispatch(setFollowUser());
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    fetchFollowingDoc().then(() => setLoading(false));
}, [dispatch, profile.id, isCurrentUser]);


const handleFollow = async () => {
    setLoading(true);
    setFollow(false);
    try {
        await followUser(profile);
        dispatch(setFollowUser())
    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
};

const handleUnFollow = async () => {
    setLoading(true);
    try {
        await unfollowUser(profile);
        dispatch(setUnFollowUser())
    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
};

  return (
    <Segment>
        <Grid>
            <Grid.Column width={12}>
            <Item.Group>
                <Item>
                <Item.Image
                    avatar
                    size="small"
                    src={profile.photoURL || "/assets/user.png"}
                />
                <Item.Content verticalAlign="middle">
                    <Header
                    style={{ display: "block", marginBottom: 10 }}
                    content={profile.displayName}
                    />
                </Item.Content>
                </Item>
            </Item.Group>
            </Grid.Column>
            <Grid.Column width={4}>
            <Statistic.Group>
                <Statistic label="Followers" value={profile.followerCount || 0} />
                <Statistic label="Following" value={profile.followingCount || 0} />
            </Statistic.Group>
            <Divider />
            {!isCurrentUser && (
                <Reveal animated="move">
                <Reveal.Content visible style={{ width: "100%" }}>
                    <Button
                    fluid
                    color="teal"

                    content={isFollowing ? 'Following' : 'Not Following'}
                    />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: "100%" }}>
                    <Button
                    basic
                    onClick={isFollowing ?()=>handleUnFollow() :()=>handleFollow()}
                    loading={loading}
                    fluid
                    color="teal"
                    content={isFollowing ? 'Unfollow': 'Follow'}
                    />
                </Reveal.Content>
                </Reveal>
            )}
            
            </Grid.Column>
        </Grid>
    </Segment>
  );
};
export default ProfileHeader;
