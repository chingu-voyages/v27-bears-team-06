import React from 'react';
import Header from './components/Header';
import About from './components/About';
// import Map from './components/Map';
import ImageContainer from './containers/ImageContainer';
import './App.css';


//render UI components 

function App() {
	
	return (
		<>
		<Header/>
		<About/>
		<ImageContainer/>
		{/* <Map/> */}
		</>
	)
}
export default App;



