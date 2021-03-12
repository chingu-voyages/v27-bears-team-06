import React from 'react';
import Header from 'components/Header';
import About from 'components/About';
import Bird from 'components/Bird';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import './App.css';

function App() {
    return (
        <>
            <Navbar />
            <main className="h-screen overflow-y-scroll snap snap-y snap-proximity">
                <Header />
                <About />
                <Bird />
                <Footer />
            </main>
        </>
    );
}
export default App;
