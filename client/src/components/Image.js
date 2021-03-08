import React from 'react';
import Loading from '../components/Loading';

const WidgetButton = ({ openWidget }) => (
    <button
        className="mt-12 px-8 py-4 rounded-l-xl rounded-t-xl font-light antialiased tracking-wide bg-gradient-to-b from-blue-600 to-blue-700 text-white outline-none focus:outline-none hover:shadow-lg hover:from-blue-700 transition duration-200 ease-in-out"
        onClick={openWidget}
    >
        Upload Image Via Widget
    </button>
);



export default function Image({ openWidget, imageUrl, imageAlt, loading, birdDetails }) {
    const { name, species_info: speciesInfo } = birdDetails;
    const {
        // synonyms,
        // otherCommonNames,
        // kingdom,
        // phylum,
        // taxclass,
        // taxorder,
        // family,
        // genus,
        // informalTaxonomy,
        taxonomicComments: description,
        ...otherInfo
    } = speciesInfo;
   
    return (
        <div>
            <div className="lg:2/6 xl:w-2/4 mt-4 lg:mt-40 lg:ml-16 text-left flex flex-col items-center">
                {loading ? <Loading loading={loading} /> : <WidgetButton openWidget={openWidget} />}
                <div className="mt-12 lg:mt-32 lg:ml-20 text-left flex flex-col items-center">
                    <button
                        type="button"
                        className="flex justify-center w-16 h-16 rounded-full animate-bounce text-green-400 transition duration-300 ease-in-out cursor-pointer"
                    >
                        <svg
                            className="w-6 h-6"
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
            <div class="p-24  bg-gradient-to-r from-green-400 to-blue-500 ">
                <div class="w-96 m-auto bg-white ">
                    <div class="col-span-3 row-span-4 p-1 m-1">
                        {imageUrl && <img src={imageUrl} alt={imageAlt} className="displayed-image" />}
                    </div>

                    <div class="col-span-3 row-span-full p-1 m-1">
                        {imageUrl && <img src={imageUrl} alt={imageAlt} className="displayed-image" />}
                    </div>

                    <div class="col-span-3 row-span-1 ">
                        <div class="flex align-bottom flex-col leading-none p-2 md:p-4">
                            <div class="flex flex-row justify-between items-center">
                            <div className="p-2">
                            <h1 className="text-2xl font-bold text-green-800 py-2">{name}</h1>
                            <p className= "mt-4 bg-white text-sm text-black break-all md:break-all ">{description}</p>
                            <p className= "mt-4 bg-white text-sm text-black break-all md:break-all ">Other Info:{JSON.stringify(otherInfo)}</p>
                            <a href="" className="py-2 mt-4 px-6 text-white bg-green-500 inline-block rounded">
                                Read More
                            </a>
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div> 
       
    );
}