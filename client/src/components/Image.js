import React from 'react';

const WidgetButton = ({ openWidget }) => (
    <button
        class="mt-12 px-8 py-4 rounded-l-xl rounded-t-xl ont-light antialiased tracking-wide bg-gradient-to-b from-blue-600 to-blue-700 text-white outline-none focus:outline-none hover:shadow-lg hover:from-blue-700 transition duration-200 ease-in-out"
        onClick={openWidget}
    >
        Upload Image Via Widget
    </button>
);

export default function Image({ openWidget, imageUrl, imageAlt, loading, birdInfo }) {
    return (
        <div>
            <div class="lg:2/6 xl:w-2/4 mt-4 lg:mt-40 lg:ml-16 text-left flex flex-col items-center">
                {loading ? 'Loading...' : <WidgetButton openWidget={openWidget} />}
                <div class="mt-12 lg:mt-32 lg:ml-20 text-left">
                    <button
                        type="button"
                        class="flex items-center justify-center w-12 h-12 rounded-full bg-cool-gray-100 text-gray-800 animate-bounce hover:text-gray-900 hover:bg-cool-gray-50 transition duration-300 ease-in-out cursor-pointer"
                    >
                        <svg
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="p-24">
                <div class="w-96 m-auto ">
                    <div class="col-span-3 row-span-4 p-1 m-1">
                        {imageUrl && <img src={imageUrl} alt={imageAlt} className="displayed-image" />}
                    </div>

                    <div class="col-span-3 row-span-1">
                        <div class="flex align-bottom flex-col leading-none p-2 md:p-4">
                            <div class="flex flex-row justify-between items-center">
                                <a class="flex items-center no-underline hover:underline text-black" href="#"></a>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-3 row-span-1">
                        <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                            <h1 class="text-lg">
                                <a class="no-underline hover:underline text-black" href="#">
                                    {/* Predicted : Bird name
                    Confidence: [0-100]% 
                    Map: */}
                                </a>
                            </h1>
                        </header>
                    </div>
                </div>
            </div>
        </div>
    );
}
