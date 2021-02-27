import React from 'react';
import Header from './components/Header';
import About from './components/About';
// import Map from './components/Map';
import ImageContainer from './containers/ImageContainer';
import './App.css';
import axios from 'axios';
import settings from './config/settings'

//render UI components 

const pingApi = async () => {
    const response = await axios.get(`${settings.REACT_APP_API_URL}/ping`);
    console.log('👀 ~ file: App.js ~ line 14 ~ pingApi ~ response', response);
};

function App() {
	
	return (
		<>
        <button onClick={pingApi}>PING</button>
		<Header/>
		<About/>
		<ImageContainer/>
		{/* <Map/> */}
		</>
	)
}
export default App;



