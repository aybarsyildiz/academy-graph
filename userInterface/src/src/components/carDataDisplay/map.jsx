import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'


export default function googleMap() {
    return (
        <div className="map-container">
            <GoogleMapReact
                defaultCenter={{
                    lat: 40.730610,
                    lng: -73.935242
                }}
                defaultZoom={11}
            >
            </GoogleMapReact>
        </div>
    )
}
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
    }(googleMap));