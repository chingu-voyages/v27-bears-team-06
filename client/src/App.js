import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
// import Map from './components/Map';
import ImageContainer from './containers/ImageContainer';
import './App.css';

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

	return (
		<>
		<Header/>
		<About/>
		<ImageContainer userLocation={userLocation} />
		{/* <Map/> */}
		</>
	)
}
export default App;



