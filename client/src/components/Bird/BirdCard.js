import React from 'react';

export default function Image({ imageUrl, imageAlt, loading, birdDetails }) {
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
        <div className="mx-auto px-4 py-8 max-w-xl my-20 ">
            <div className="bg-white shadow-2xl rounded-lg mb-6 tracking-wide">
                <div className="md:flex-shrink-0">
                    <img
                        src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg"
                        alt="mountains"
                        className="w-full h-64 rounded-lg rounded-b-none"
                    />
                </div>
                <div className="px-4 py-2 mt-2">
                    <h2 className="font-bold text-2xl text-gray-800 tracking-normal">{name}</h2>
                    <p className="text-sm text-gray-700 px-2 mr-1">{description}</p>
                    <p className="text-sm text-gray-700 px-2 mr-1">Other Info:{JSON.stringify(otherInfo)}</p>
                    <div className="flex items-center justify-between mt-2 mx-6">
                        <a href="#" className="text-blue-500 text-xs -ml-3 ">
                            Show More
                        </a>
                        <a href="#" className="flex text-gray-700">
                            <svg
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-6 h-6 text-blue-500"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                />
                            </svg>
                            5
                        </a>
                    </div>
                    <div className="author flex items-center -ml-3 my-3">
                        <div className="user-logo">
                            <img
                                className="w-12 h-12 object-cover rounded-full mx-4  shadow"
                                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=731&q=80"
                                alt="avatar"
                            />
                        </div>
                        <h2 className="text-sm tracking-tighter text-gray-900">
                            <a href="#">By Mohammed Ibrahim</a> <span className="text-gray-600">21 SEP 2015.</span>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

// {/* <div className="blog__wraper bg-green-300 py-20 px-20 ">

//      <div className="flex justify-between items-center md:flex-col ">

//      <div className="blog bg-white mr-5">
//          {imageUrl && <img className="w-42" src={imageUrl} alt={imageAlt} />}
//          {/* <div className="p-5">
//         <h1 className="text-2xl font-bold text-green-800 py-2">Lorem ipsum dolor sit amet</h1>
//          <p className="bg-white text-sm text-black">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis vitae qui distinctio ex soluta? Voluptates, ea! Esse, natus. Quas possimus laboriosam consectetur deserunt ea sapiente. Dicta ipsam atque voluptatem provident!</p>
//          <a href="" className="py-2 px-3 mt-4 text-white bg-green-500 inline-block rounded">Read More</a>
//          </div> */}
//      </div>

//      <div className="blog  bg-white mr-5 ">
//      {imageUrl && <img className="w-42 " src={imageUrl} alt={imageAlt} />}
//         <div className="p-5">
//             <h1 className="text-2xl font-bold text-green-800 py-2">{name}</h1>
//             <h3 className="bg-white text-sm text-black">{description}</h3>
//         <p className="bg-white text-sm text-black">Other Info:{JSON.stringify(otherInfo)}</p>
//         {/* <p className="bg-white text-sm text-black">Other Info:{JSON.stringify(otherInfo)}</p> */}
//         <a href="" className="py-2 px-3 mt-4  text-white bg-green-500 inline-block rounded">Read More</a>
//         </div>
//     </div>

//     </div>
//     </div>    */}

{
    /* <div className="bg-gradient-to-r from-green-400 to-blue-500 py-20 px-20">
                <div className=" blogs-wraper flex justify-between items-center">
                    <div className="blogs rounded-xl bg-white mr-5 ml-5">
                        {imageUrl && <img className="h-32 flex justify-between items-center" src={imageUrl} alt={imageAlt} />}</div>
                    
                    <div className="blogs bg-white mr-5 ml-5">
                        {imageUrl && <img className="h-32 flex justify-between items-center" src={imageUrl} alt={imageAlt} />}
                        <div className="p-5">
                            <h1 className="text-2xl font-bold text-green-800 py-2">{name}</h1>
                            <p className="bg-white text-sm text-black">{description}</p>
                            <p className="bg-white text-sm text-black">Other Info:{JSON.stringify(otherInfo)}</p>
                            <a href="" className="py-2 mt-4 px-6 text-white bg-green-500 inline-block rounded">
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </div> */
}

//  {/* User download Image card */}
//  < div >
//  <div className="flex flex-col justify-center items-center p-10 w-full">
//      <div className="w-96 m-auto ">
//          <div className="grid grid-cols-3 gap-4" >
//          <div className="col-span-3 row-span-4 p-1 m-1">
//              {imageUrl && <img src={imageUrl} alt={imageAlt} />}
//          </div>

//  {/* API download Image card */}
//             <div className="col-span-3 row-span-4 p-1 m-1">
//              {/* {birdInfo && <img src={birdInfo} />}     */}
//                  {imageUrl && <img src={imageUrl} alt={imageAlt} />}
//                      <span className=" mt-4 text-md whitespace-nowrap text-green-400 font-semibold">Blue Jay</span>
//                      <p className="text-sm font-light leading-relaxed mt-6 mb-4 text-indigo-800">
//                      Exhibits relatively deep separations between populations in Washington and those in the central and eastern states (Ball and Avise 1992).
//                      </p>
//              </div>
//          </div>
//      </div>
//  </div>
// </div>
