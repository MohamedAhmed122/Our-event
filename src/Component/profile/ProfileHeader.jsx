import React from 'react';
import { Segment, Grid, Item, Header, Statistic, Divider, Reveal, Button } from 'semantic-ui-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { followUser, unfollowUser } from '../../firebase/firestoreService';



const ProfileHeader =({profile , isCurrentUser})=>{

    const [loading,setLoading] = useState(false)
    const [follow, setFollow] = useState(true)

    const handleFollow =async()=>{
        setLoading(true)
        setFollow(false)
        try {
            await followUser(profile)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    
    const handleUnFollow =async()=>{
        setLoading(true)
        try {
            await unfollowUser(profile)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    return(
        <Segment>
        <Grid>
            <Grid.Column width={12}>
                <Item.Group>
                    <Item>
                        <Item.Image avatar size='small' src={profile.photoURL || '/assets/user.png'}  />
                        <Item.Content verticalAlign='middle'>
                            <Header style={{display: 'block', marginBottom: 10}} content={profile.displayName}/>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Grid.Column>
            <Grid.Column width={4}>
                <Statistic.Group>
                    <Statistic label='Followers' value={10} />
                    <Statistic label='Following' value={20} />
                </Statistic.Group>
                <Divider />
                {
                    !isCurrentUser &&
                    <Reveal animated='move'>
                    <Reveal.Content visible style={{width: '100%'}}>
                        <Button fluid color='teal' onClick={handleFollow}  content='Follow'  />
                    </Reveal.Content>
                    <Reveal.Content hidden style={{width: '100%'}}>
                        <Button basic onClick={handleFollow} loading={loading} fluid color='teal' content='Follow' />
                    </Reveal.Content>
                </Reveal>
                }
                <Button basic onClick={handleUnFollow} loading={loading} fluid color='teal' content='Unfollow' />
            </Grid.Column>
        </Grid>
    </Segment>
    )
}
export default ProfileHeader;