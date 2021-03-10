import React, { useState } from 'react';
import parse from 'html-react-parser';
import SpeciesInfoTable from './SpeciesInfoTable';
import Button from 'utils/Button';
import useBreakpoints from 'utils/useBreakpoints';

const BirdImage = ({ src, alt }) => (
    <div className="flex justify-center">
        <img src={src} alt={alt} className="shadow-lg rounded max-w-full h-auto align-middle border-none" />
    </div>
);

const Card = ({ children }) => (
    <div className="p-24 bg-teal-400 flex justify-center">
        <div className="md:max-w-md">{children}</div>
    </div>
);

const CardContent = ({ children }) => (
    <div className="flex align-bottom flex-col leading-none p-2 md:p-4 bg-white rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">
        <div className="flex flex-row justify-between items-center">{children}</div>
    </div>
);

const BirdDetails = ({ name, species_info: speciesInfo, imageUrl, imageAlt }) => {
    const [showMore, setShowMore] = useState(false);
    const { taxonomicComments: description, ...otherInfo } = speciesInfo;
    const { isXs, isSm } = useBreakpoints();
    const isMobile = isXs || isSm;

    if (isMobile) {
        return showMore ? (
            <div className="p-2">
                {imageUrl && <BirdImage src={imageUrl} alt={imageAlt} />}
                <SpeciesInfoTable {...otherInfo} />
                <Button onClick={() => setShowMore(!showMore)} label={showMore ? 'Hide Details' : 'Show Details'} />
            </div>
        ) : (
            <div className="p-2">
                {imageUrl && <BirdImage src={imageUrl} alt={imageAlt} />}
                <h1 className="text-2xl font-bold text-green-800 py-2">{name}</h1>
                <p className="mt-4 text-sm text-black break-all md:break-all ">{parse(description)}</p>
                <Button onClick={() => setShowMore(!showMore)} label={showMore ? 'Hide Details' : 'Show Details'} />
            </div>
        );
    }

    return (
        <>
            <div className="p-2">
                {imageUrl && <BirdImage src={imageUrl} alt={imageAlt} />}
                <h1 className="text-2xl font-bold text-green-800 py-2">{name}</h1>
                <p className="mt-4 text-sm text-black break-all md:break-all ">{parse(description)}</p>
                <Button onClick={() => setShowMore(!showMore)} label={showMore ? 'Hide Details' : 'Show Details'} />
            </div>
            <div className="p-2">{showMore && <SpeciesInfoTable {...otherInfo} />}</div>
        </>
    );
};

export default function BirdCard({ imageUrl, imageAlt = 'Photo of bird', loading, record }) {
    return (
        <div className="block">
            <div className="flex items-center justify-center h-screen w-screen bg-teal-400">
                <Card>
                    <CardContent image={imageUrl && <BirdImage src={imageUrl} alt={imageAlt} />}>
                        {!record || loading ? (
                            <span>Loading...</span>
                        ) : (
                            <BirdDetails imageUrl={imageUrl} imageAlt={imageAlt} {...record} />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
