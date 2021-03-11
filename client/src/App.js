import React from 'react';
import Landing from 'components/Landing';
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
