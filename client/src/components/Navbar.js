import React from 'react';

export default function Navigation() {
    return (
        <div
            style={{
                background: '#FFFFFF',
            }}
            className="fixed top-0 z-40 w-screen "
        >
            <div className="flex items-center justify-between flex-1 w-10/12 px-2 py-2 py-3 mx-auto text-3xl font-bold text-blue-500 cursor-pointer">
                <h1 className="">AVIAN</h1>
                <a href="https://github.com/chingu-voyages/v27-bears-team-06" rel="noreferrer" target="_blank">
                    <i className="fab fa-github fa-lg">
                        <span className="ml-3 text-lg">Github</span>
                    </i>
                </a>
            </div>
        </div>
    );
}
