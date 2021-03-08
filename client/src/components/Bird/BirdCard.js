import React, { useState } from 'react';
import parse from 'html-react-parser';
import SpeciesInfoTable from './SpeciesInfoTable';
import Progress from './Progress';

const BirdImage = ({ src, alt }) => (
    <div class="col-span-3 row-span-full p-1 m-1">
        <img src={src} alt={alt} className="displayed-image" />
    </div>
);

const Card = ({ children }) => (
    <div class="p-24 bg-gradient-to-r from-green-400 to-blue-500 ">
        <div class="max-w-2xl m-auto bg-white ">{children}</div>
    </div>
);

const CardContent = ({ children }) => (
    <div class="col-span-3 row-span-1 ">
        <div class="flex align-bottom flex-col leading-none p-2 md:p-4">
            <div class="flex flex-row justify-between items-center">
                <div className="p-2">{children}</div>
            </div>
        </div>
    </div>
);

const BirdDetails = ({ name, species_info: speciesInfo }) => {
    const [showMore, setShowMore] = useState(false);
    const { taxonomicComments: description, ...otherInfo } = speciesInfo;

    return (
        <>
            <h1 className="text-2xl font-bold text-green-800 py-2">{name}</h1>
            <p className="mt-4 bg-white text-sm text-black break-all md:break-all ">{parse(description)}</p>
            {showMore && <SpeciesInfoTable {...otherInfo} />}
            <button
                onClick={() => setShowMore(!showMore)}
                className="py-2 mt-4 px-6 text-white bg-green-500 inline-block rounded"
            >
                {showMore ? 'Hide Details' : 'Show Details'}
            </button>
        </>
    );
};

export default function BirdCard({ imageUrl, imageAlt, loading, record }) {
    return (
        <Card>
            {imageUrl && <BirdImage src={imageUrl} alt={imageAlt} />}
            <CardContent>
                {record || loading ? (
                    <div>
                        <Progress />
                        Loading...
                    </div>
                ) : (
                    <BirdDetails {...record} />
                )}
            </CardContent>
        </Card>
    );
}
