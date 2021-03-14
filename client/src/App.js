import React from 'react';
import Header from 'components/Header';
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
                <Bird />
                <Footer />
            </main>
        </>
    );
}
export default App;
