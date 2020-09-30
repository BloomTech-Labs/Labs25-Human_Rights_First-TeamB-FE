////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// IMPORTS
import React, { useState, useRef } from 'react';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';
import Moment from 'react-moment';
import '../../main.css';
import mapStyles from './mapStyles';
import clusterStyles from './clusterStyles';
import useSwr from 'swr';
//////////////  fetcher /////////
const fetcher = (...args) => fetch(...args).then(response => response.json());
////////////////////////////////////// MAP //////////////
function Map() {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const mapRef = useRef();
  const url = 'https://labs25-hrf-teamb-api.herokuapp.com/api';
  const { data, error } = useSwr(url, fetcher);
  var events = data && !error ? data : [];
  // randomize the markers //////////////////////////////

  const newData = events.map(item => {
    return {
      ...item,
      Event: {
        ...item.Event,
        geocoding: {
          ...item.Event.geocoding,
          lat:
            parseFloat(item.Event.geocoding.lat) +
            2 * 0.04 * (Math.random() - 0.5),
          long:
            parseFloat(item.Event.geocoding.long) +
            2 * 0.04 * (Math.random() - 0.5),
        },
      },
    };
  });

  const OPTIONS = {
    minZoom: 4,
    maxZoom: 12,
    styles: mapStyles,
  };

  // ///////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <GoogleMap
        defaultZoom={4.3}
        options={OPTIONS}
        defaultCenter={{ lat: 39.8283, lng: -98.5795 }}
        defaultOptions={{ styles: mapStyles }}
        yesIWantToUseGoogleMapApiInternals
      >
        <MarkerClusterer
          clusterClass="clusterClass"
          gridSize={80}
          minimumClusterSize={5}
          styles={clusterStyles}
        >
          {events.map(incident => (
            <Marker
              markerClass="clusterClass"
              key={incident.ID}
              position={{
                lat: parseFloat(incident.Event.geocoding.lat),
                lng: parseFloat(incident.Event.geocoding.long),
              }}
              onClick={() => {
                setSelectedIncident(incident);
              }}
            ></Marker>
          ))}
          {selectedIncident && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedIncident.Event.geocoding.lat),
                lng: parseFloat(selectedIncident.Event.geocoding.long),
              }}
              onCloseClick={() => {
                setSelectedIncident(null);
              }}
            >
              <div>
                <h2>Incident Information:</h2>
                <h3>{selectedIncident.Event.title}</h3>
                <p>
                  Location: {selectedIncident.Event.city},{' '}
                  {selectedIncident.Event.state}{' '}
                </p>
                <p>
                  Date:
                  <Moment format="dddd, MMMM DD, YYYY">
                    {selectedIncident.Event.date}
                  </Moment>
                </p>
                <div className="refLinks">
                  <p>
                    {' '}
                    {selectedIncident.Event.links.map(element => (
                      <a
                        href={element}
                        className="search-links"
                        target="_blank"
                      >
                        {' '}
                        &#8226; {element} <br />{' '}
                      </a>
                    ))}
                  </p>
                </div>
                <p></p>
              </div>
            </InfoWindow>
          )}
        </MarkerClusterer>
      </GoogleMap>
    </>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// EXPORTED MAP
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div style={{ width: '100%', height: '65vh' }}>
      <WrappedMap
        googleMapURL={process.env.REACT_APP_GOOGLE_TOKEN}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// END
