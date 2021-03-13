import React, { useMemo } from 'react';
import Typical from 'react-typical';
import birdsList from 'utils/birdsList';

const getSteps = () => {
    const steps = []
    birdsList.forEach((bird) => {
        steps.push(bird.name, 2500,)
    });

    return steps;
}

export default function Header(props) {
    const steps = useMemo(() => getSteps(), []);

    return (
        <div
            className="relative flex items-center content-center justify-center pt-16 pb-32 snap-center"
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
                <span id="blackOverlay" className="absolute w-full h-full bg-black opacity-20"></span>
            </div>
            <div className="container relative mx-auto">
                <div className="flex flex-wrap items-center">
                    <div className="w-full px-4 ml-auto mr-auto text-center">
                        <div className="px-6">
                            <h1 className="mt-20 text-5xl font-semibold text-white">
                                Recognize our feathered friends!
                            </h1>
                            <h2
                                className={`transform transition duration-2000 ease-in-out font-bold text-2xl text-blue-500 mt-10`}
                            >
                                <Typical steps={steps} loop={Infinity} wrapper="span" />
                            </h2>
                            <p className="mt-16 text-xl max-w-prose-center font-light leading-relaxed text-white break-words md:break-words">
                             Birds are a group of warm-blooded vertebrates constituting the class Aves, characterised by feathers, toothless beaked jaws, the laying of hard-shelled eggs,
                             a high metabolic rate, a four-chambered heart, and a strong yet lightweight skeleton. -Wikipedia
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
