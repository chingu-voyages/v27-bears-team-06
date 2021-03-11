import React from 'react';
import Header from 'components/Header';
import About from 'components/About';
import Bird from 'components/Bird';
import './App.css';

function App() {
    return (
        <main className="overflow-y-scroll snap snap-y snap-proximity h-screen">
            <Header />
            <About />
            <Bird />
        </main>
    );
}
export default App;
