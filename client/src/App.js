import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import About from './components/About';
import Map from './components/Map';
// import Card from './components/Card';
import ImageContainer from './containers/ImageContainer';
import './App.css';

function App() {
    return (
        <>
            <Header />
            <About />
            <ImageContainer />
            <Map />
        </>
    );
}
export default App;
