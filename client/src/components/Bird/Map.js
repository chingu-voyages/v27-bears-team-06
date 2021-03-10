import React, { useState, useEffect } from 'react';
import mapboxgl from "mapbox-gl";
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
import axios from 'axios';
import useBreakpoints from '../../utils/useBreakpoints';
import settings from '../../config/settings';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const PopupCard = ({ comName, lat, lng, locName, sciName }) => {
    return (
        <div className="card m-2 cursor-pointer border border-gray-400 rounded-lg hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
            <div className="m-3">
                <h2 className="text-lg mb-2">
                    {`${comName} (${sciName})`}
                    <span className="text-sm text-teal-800 font-mono bg-teal-100 inline rounded-full px-2 align-top float-right animate-pulse">
                        {lat.toFixed(6)},{lng.toFixed(6)}
                    </span>
                </h2>
                <p className="font-light font-mono text-sm text-gray-700 hover:text-gray-900 transition-all duration-200">
                    {locName}
                </p>
            </div>
        </div>
    );
};

const PinIcon = ({ size, color, onClick }) => (
    <div
        style={{
            width: size,
            color,
            cursor: 'pointer',
        }}
        onClick={onClick}
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
            />
        </svg>
    </div>
);

const INITIAL_VIEWPORT = {
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 13,
};

const Map = ({ predictedBird }) => {
    const { isXs, isSm } = useBreakpoints();
    const mobileSize = isXs || isSm;
    const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
    const [userPosition, setUserPosition] = useState(null);
    const [popup, setPopup] = useState(null);
    const [pins, setPins] = useState([]);

    useEffect(() => {
        const getPins = () => {
            const config = { params: { lat: userPosition.latitude, lng: userPosition.longitude } };
            axios
                .get(`${settings.REACT_APP_API_URL}/location`, config)
                .then((response) => setPins(response.data.data))
                .catch((error) => {
                    console.log(error);
                });
        };

        if (userPosition) {
            getPins();
        }
    }, [userPosition]);

    useEffect(() => {
        const getUserPosition = () => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((posiition) => {
                    const { latitude, longitude } = posiition.coords;
                    setViewport((prevViewport) => ({ ...prevViewport, latitude, longitude }));
                    setUserPosition({ latitude, longitude });
                });
            }
        };

        getUserPosition();
    }, []);

    const handleSelect = (pin) => {
        setPopup(pin);
    };

    return (
        <div style={mobileSize ? classes.rootMobile : classes.root}>
            <ReactMapGL
                width="100vw"
                height="calc(100vh - 64px)"
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken={settings.REACT_APP_MAPBOX_API_TOKEN}
                scrollZoom={!mobileSize}
                onViewportChange={(newViewport) => setViewport(newViewport)}
                onClick={() => setPopup(null)}
                {...viewport}
            >
                <div style={classes.navigationControl}>
                    <NavigationControl onViewportChange={(newViewport) => setViewport(newViewport)} />
                </div>
                {pins.length > 0 &&
                    pins.map((pin, index) => (
                        <Marker key={index} latitude={pin.lat} longitude={pin.lng} offsetLeft={-19} offsetTop={-37}>
                            <PinIcon
                                size={40}
                                color={predictedBird.toLowerCase() === pin.comName.toLowerCase() ? 'red' : 'blue'}
                                onClick={() => handleSelect(pin)}
                            />
                        </Marker>
                    ))}
                {popup && (
                    <Popup
                        anchor="top"
                        latitude={popup.lat}
                        longitude={popup.lng}
                        closeOnClick={false}
                        onClose={() => setPopup(null)}
                    >
                        <PopupCard {...popup} />
                    </Popup>
                )}
            </ReactMapGL>
        </div>
    );
};

const classes = {
    root: {
        display: 'flex',
    },
    rootMobile: {
        display: 'flex',
        flexDirection: 'column-reverse',
    },
    navigationControl: {
        position: 'absolute',
        top: 0,
        left: 0,
        margin: '1em',
    },
    deleteIcon: {
        color: 'red',
    },
    popupImage: {
        padding: '0.4em',
        height: 200,
        width: 200,
        objectFit: 'cover',
    },
    popupTab: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
};

export default Map;
