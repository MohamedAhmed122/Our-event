import React from 'react';
import { Segment, Grid, Item, Header, Statistic, Divider, Reveal, Button } from 'semantic-ui-react';



const ProfileHeader =({profile , isCurrentUser})=>{
    console.log(profile);
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
                        <Button fluid color='teal' content='Following' />
                    </Reveal.Content>
                    <Reveal.Content hidden style={{width: '100%'}}>
                        <Button basic fluid color='teal' content='Unfollow' />
                    </Reveal.Content>
                </Reveal>
                }
            </Grid.Column>
        </Grid>
    </Segment>
    )
}
export default ProfileHeader;