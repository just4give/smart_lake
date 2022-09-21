import React from 'react';
import PropTypes from 'prop-types';
import './Marker.css';
import { useIonRouter } from "@ionic/react";

interface MarkerProps {
  text: string;
  lat: number;
  lng: number;
  id: string
}




const Marker: React.FC<MarkerProps> = ({text, lat, lng, id})=>{

  const router = useIonRouter();

  const markerClicked = (ev: any, id: string) =>{
    ev.preventDefault();
    console.log('marker clicked', id);
    router.push(`/device/${id}`, "forward", "push");
  }

  return (
  <div>
   <img src="./assets/mc_anomaly.png" className="marker" onClick={async (ev) =>{ markerClicked(ev, id)}}></img>
   </div>
  )

}


// Marker.propTypes = {
  
//   text: PropTypes.string.isRequired,
// };

export default Marker

