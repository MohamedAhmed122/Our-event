import React from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';
import MyDropzone from './PhotoDropzone';
import { useState } from 'react';
import CropImage from './PhotosCropper'

const UploadPhoto =()=>{
    const [files,setFiles]=useState([])
    const [image,setImage]=useState(null)
    return(
    <Grid>
        <Grid.Column width={4}>
            <Header color ='teal' sub content='Step 1 - Add Photo'/>
            <MyDropzone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
            <Header color ='teal' sub content='Step 1 - Resize'/>
            {
                files.length >0 &&
                <CropImage setImage={setImage} imagePreview={files[0].preview}/>
            }
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
            <Header color ='teal' sub content='Step 3 - Preview & Upload'/>
            {
                files.length >0 &&
                <div>
                    <div className='img-preview' style={{minHeight: 200,minWidth:200, overflow: "hidden" }} />
                    <Button.Group>
                        <Button style={{width: 100}} positive icon='check'/>
                        <Button style={{width: 100}} icon='close'/>
                    </Button.Group>
                </div>
            }
        </Grid.Column>
    
    </Grid>
)}
export default UploadPhoto;