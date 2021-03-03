import React from 'react';
import Logo from './Logo/logo.png';


export default function Header(props){
    return (
    <div className="min-h-screen min-w-full bg-gray-100 flex flex-col md:justify-center p-10 s:flex">
    <div className="relative w-full max-w-full lg:max-w-6xl xl:max-w-screen-2xl mx-auto s:flex md:flex">
      <div className="absolute inset-0 -mr-3.5 bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:rotate-3 sm:rounded-3xl"></div>
      <div className="relative bg-white shadow-lg sm:rounded-3xl">
        
        <div className="px-20 py-6">
        
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-center text-3xl font-bold text-true-gray-800">
              <img className="md:flex-center mx-auto w-24" src={Logo} alt="logo" />
                <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">AVIAN</h1>
              </div>   
            </div>
          </div>
          
          <div className="lg:2/6 xl:w-2/4 mt-20 lg:mt-40 lg:ml-16 text-left">
            <div className="text-6xl font-semibold text-gray-900 leading-none">Recognize our feathered friends</div>
            <div className="mt-10 mb-10 text-4xl font-semibold text-blue-600  antialiased">What’s that bird?</div>
          </div>    
        </div>
      </div>
    </div>
  </div>
           
    );
}