import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
// import Card from './components/Card';
import ImageContainer from './containers/ImageContainer';
import './App.css';
import axios from 'axios';
import settings from './config/settings';

function App() {
    const [userLocation, setUserLocation] = useState({
        latitude: null,
        longitude: null,
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) =>
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
            );
        } else {
            console.log("Could not access user's geolocation");
        }
    }, []);

    const pingApi = async () => {
        const response = await axios.get(`${settings.REACT_APP_API_URL}/ping`);
        console.log('👀 ~ file: App.js ~ line 14 ~ pingApi ~ response', response);
    };

    return (
        <>
            <button onClick={pingApi}>PING</button>
            <Header />
            <About />
            <ImageContainer userLocation={userLocation} />
            {/* <Card /> */}
            {/* <Map/> */}
        </>
    );
}
export default App;
