import React from 'react';

export default function Navigation() {
  return (
    <div
      style={{
        background: '#FFFFFF',
      }}
      className=" fixed top-0 w-screen z-40  "
    >
      <div className="text-3xl justify-between px-2 py-2 font-bold text-blue-500 flex-1 cursor-pointer flex items-center w-10/12 mx-auto py-3">
          <h1 className="">
            AVIAN   
          </h1>
          <a href="https://github.com/chingu-voyages/v27-bears-team-06/tree/develop"><i className="fab fa-github fa-lg"><span className= "text-lg ml-3">Github</span></i></a>
        </div>
    </div>
  );
}