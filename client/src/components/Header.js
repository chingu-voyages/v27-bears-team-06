import React from 'react';
import Logo from './Logo/logo.png';


export default function Header(props){

    return (
        <header className="bg-gradient-to-r from-green-400 to-blue-500 font-semibold text-gray-900 flex flex-col items-center">
            <div className="md:flex justify-center py-16  ">
                <div className="p-2 my-auto">
                    <img className="sm:flex mx-auto w-24" src={Logo} alt="logo" />
                </div>
                <div className="p-2 my-auto ">
                    <div className="text-black text-3xl text-center my-8">
                        <div className=" my-2 text-4xl leading-none"> Recognize our feathered friends </div>
                    </div>
                    <p className=" my-4 text-indigo-700 font-bold text-3xl text-center"> What’s that bird? </p>
                </div>
                {/* <div className="lg:2/6 xl:w-2/4 mt-4 lg:mt-40 lg:ml-16 text-left flex flex-col items-center">
                <button className="mt-2 px-8 py-4 rounded-l-xl rounded-t-xl ont-light antialiased tracking-wide bg-gradient-to-b from-blue-600 to-blue-700 text-white outline-none focus:outline-none hover:shadow-lg hover:from-blue-700 transition duration-200 ease-in-out"
                 onClick={openWidget}>
                  Upload Bird Image 
                </button>
            </div> */}
            </div>
        </header>
    );
}