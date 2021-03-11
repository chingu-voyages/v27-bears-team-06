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
            <Navbar transparent />
            <main className="overflow-y-scroll snap snap-y snap-proximity h-screen">
                <Header />
                <About />
                <Bird />
     <Footer />     
            </main>

        </>
    );
}
export default App;
