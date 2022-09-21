import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import GoogleMapReact, { MapOptions } from 'google-map-react';
import './Dashboard.css';
import Marker from "../components/Marker";
import { listSmartLakeDevices } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";



const renderMarkers = (map, maps) => {
    console.log("render markers", map, maps);
};

const Dashboard: React.FC = () =>{

    const [devices, setDevices] = useState<any>([]);

  React.useEffect(()=> {
    console.log("useEffect dashboard");
    fetchDevices();
    
  },[]);

  async function fetchDevices() {
    try {
      const devicesData:any = await API.graphql(graphqlOperation(listSmartLakeDevices));
      const devices = devicesData.data.listSmartLakeDevices.items;
      console.log(devices);
      setDevices(devices);

    } catch (err) { console.log('error fetching devices') }
  }
  const mapOptions:MapOptions = {
    styles: [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }]
        },
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ "visibility": "off" }]
        },
        
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#212a37' }]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ "visibility": "off" }]
        },
        {
          featureType: 'road',
          elementType: 'labels',
          stylers: [{ "visibility": "off" }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ "visibility": "off" }]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ "visibility": "off" }]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels',
          stylers: [{ "visibility": "off" }]
        },
        
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#17263c' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#515c6d' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#17263c' }]
        }
      ]
  }


  const defaultProps = {
    center: {
        lat: 41.371929, 
        lng: -72.2195677
    },
    zoom: 15
  };


    return (
        <IonPage>
            <IonContent class="ion-padding">
                <h3>Dashboard</h3>
                <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "type_your_google_api_key" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options = {mapOptions}
        onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
      >
        {
            devices.map(place =>{
                return <Marker 
                key={place.id}
                id={place.id}
                lat={place.lat}
                lng={place.lng}
                text="My Marker" 
                />
            })
        }
        
       

      </GoogleMapReact>
    </div>
            </IonContent>
        </IonPage>

    );

}

export default Dashboard;