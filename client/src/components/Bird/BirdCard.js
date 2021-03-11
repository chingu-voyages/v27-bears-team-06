import React, { useState } from 'react';
import parse from 'html-react-parser';
import SpeciesInfoTable from './SpeciesInfoTable';
import { useBreakpoints, Button, Card, CardContent } from 'utils';

const BirdImage = ({ src, alt }) => (
    <div className="flex justify-center">
        <img src={src} alt={alt} className="shadow-lg rounded max-w-full h-auto align-middle border-none" />
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
        <Card color="bg-teal-400">
            <CardContent image={imageUrl && <BirdImage src={imageUrl} alt={imageAlt} />}>
                {!record || loading ? (
                    <span>Loading...</span>
                ) : (
                    <BirdDetails imageUrl={imageUrl} imageAlt={imageAlt} {...record} />
                )}
            </CardContent>
        </Card>
    );
}
