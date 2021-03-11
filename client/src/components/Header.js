import React, { useEffect, useState } from 'react';
import Typical from 'react-typical';

export default function Header(props) {
    const [animated, setAnimated] = useState(false);
    useEffect(() => {
        setAnimated(true);
    }, []);

    return (
        <div
            className="relative pt-16 pb-32 flex content-center items-center justify-center"
            style={{
                minHeight: '75vh',
            }}
        >
            <div
                className="absolute top-0 w-full h-full bg-right-top bg-cover"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1506220926022-cc5c12acdb35?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1650&q=80')",
                }}
            >
                <span id="blackOverlay" className="w-full h-full absolute opacity-20 bg-black"></span>
            </div>
            <div className="container relative mx-auto">
                <div className="items-center flex flex-wrap">
                    <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                        <div className="pr-12">
                            <h1 className="text-white font-semibold text-5xl mt-20">
                                Recognize our feathered friends!
                            </h1>
                            <h2
                                className={`${
                                    animated ? '' : 'translate-y-10 opacity-0'
                                }  transform transition duration-2000 ease-in-out font-bold text-2xl text-blue-500 mt-10`}
                            >
                                <Typical
                                    steps={['Falcon', 1000, 'BlueJay', 1000, 'Hummingbird', 1000]}
                                    loop={Infinity}
                                    wrapper="p"
                                />
                            </h2>

                            <p className="text-xl font-light leading-relaxed mt-6 mb-4 text-white break-words md:break-all md:inline-block">
                                Avian detects what kind of a bird is on a uploaded image using efficient collection of
                                training data and helping a community to learn more about bird life in their area. Let's
                                find your bird! To start just select an image to upload.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
