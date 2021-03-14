import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
import axios from 'axios';
import settings from 'config/settings';
import { useBreakpoints, Card, CardContent } from 'utils';

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const PopupCard = ({ comName, lat, lng, locName, sciName }) => {
    return (
        <div className="m-2 transition-all duration-200 transform border border-gray-400 rounded-lg cursor-pointer card hover:shadow-md hover:border-opacity-0 hover:-translate-y-1">
            <div className="m-3">
                <h2 className="mb-2 text-lg">
                    {`${comName} (${sciName})`}
                    <span className="inline float-right px-2 font-mono text-sm text-teal-800 align-top bg-teal-100 rounded-full animate-pulse">
                        {lat.toFixed(6)},{lng.toFixed(6)}
                    </span>
                </h2>
                <p className="font-mono text-sm font-light text-gray-700 transition-all duration-200 hover:text-gray-900">
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
    zoom: 11,
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
        <Card color="bg-blue-600">
            <CardContent>
                <div className="p-2" style={{ height: '80vh' }}>
                    <div className="mt-1 text-center">
                        <h3 className="mb-4 text-4xl font-semibold leading-normal text-gray-800 md:mb-2 md:text-2xl">Birds In Your Area</h3>
                        <small className="mb-4 text-lg leading-relaxed text-gray-800 md:mb-2 md:text-xs">
                            Note: Blue icons are other bird sightings; Red icons are bird sightings matching your
                            observed bird.
                        </small>
                    </div>
                    <div
                        className="flex w-full h-full mt-4"
                        style={{
                            width: '70vw',
                            height: `calc(65vh - 64px)`,
                        }}
                    >
                        <ReactMapGL
                            width="100%"
                            height="100%"
                            mapStyle="mapbox://styles/mapbox/streets-v9"
                            mapboxApiAccessToken={settings.REACT_APP_MAPBOX_API_TOKEN}
                            scrollZoom={!mobileSize}
                            onViewportChange={(newViewport) => setViewport(newViewport)}
                            onClick={() => setPopup(null)}
                            {...viewport}
                        >
                            <div className="absolute top-0 left-0 m-1">
                                <NavigationControl onViewportChange={(newViewport) => setViewport(newViewport)} />
                            </div>
                            {pins.length > 0 &&
                                pins.map((pin, index) => (
                                    <Marker
                                        key={index}
                                        latitude={pin.lat}
                                        longitude={pin.lng}
                                        offsetLeft={-19}
                                        offsetTop={-37}
                                    >
                                        <PinIcon
                                            size={40}
                                            color={
                                                predictedBird.toLowerCase() === pin.comName.toLowerCase()
                                                    ? 'red'
                                                    : 'blue'
                                            }
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
                </div>
            </CardContent>
        </Card>
    );
};

export default Map;
