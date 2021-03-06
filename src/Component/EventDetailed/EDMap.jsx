import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'
import GoogleMapReact from 'google-map-react'


const Marker =()=>(
<Icon color='red' size='big' name='marker' />
)


const EDMap =({latLng: {lat,lng}})=>{
    const zoom=15;
    return(
         <Segment attached="bottom">
        <div style={{ height: "300px", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyA_kUyNFoCjw7AEOj40lZwaUl0ExRTo79c" }}
            defaultCenter={{lat,lng}}
            defaultZoom={zoom}
          >
            <Marker lat={lat} lng={lng} />
          </GoogleMapReact>
        </div>
      </Segment>
    )
}
export default  EDMap