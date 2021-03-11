import React, { useCallback, useState } from 'react';
import parse from 'html-react-parser';
import SpeciesInfoTable from './SpeciesInfoTable';
import { useBreakpoints, Button, Card, CardContent } from 'utils';
import axios from 'axios';

const BirdImage = ({ src, alt }) => (
    <div className="flex justify-center">
        <img src={src} alt={alt} className="shadow-lg rounded max-w-full h-auto align-middle border-none" />
    </div>
);

const MobileView = ({ record, imageUrl, imageAlt }) => {
    const [showMore, setShowMore] = useState(false);
    const { name, species_info: speciesInfo } = record;
    const { taxonomicComments: description, ...otherInfo } = speciesInfo;

    const Content = useCallback(
        () =>
            showMore ? (
                <SpeciesInfoTable {...otherInfo} />
            ) : (
                <>
                    <h1 className="text-2xl font-bold text-green-800 py-2">{name}</h1>
                    <p className="mt-4 text-sm text-black break-all md:break-all ">{parse(description)}</p>
                </>
            ),
        [description, name, otherInfo, showMore]
    );

    return (
        <div className="p-2">
            {imageUrl && <BirdImage src={imageUrl} alt={imageAlt} />}
            <Content />
            <Button onClick={() => setShowMore(!showMore)} label={showMore ? 'Hide Details' : 'Show Details'} />
        </div>
    );
};

const DesktopView = ({ record, imageUrl, imageAlt }) => {
    const { name, species_info: speciesInfo } = record;
    const { taxonomicComments: description, ...otherInfo } = speciesInfo;

    const redirectToEBirdUrl = useCallback(() => {
        const config = {
            params: {
                locale: 'en_US',
                cat: 'species',
                limit: 150,
                key: 'jfekjedvescr',
                q: name,
            },
        };
        axios
            .get(`https://api.ebird.org/v2/ref/taxon/find`, config)
            .then((response) => {
                const speciesCode = response.data[0].code;
                window.open(`https://ebird.org/species/${speciesCode}`, '_blank');
            })
            .catch((error) => {
                console.log(error);
            });
    }, [name]);

    return (
        <>
            <div className="p-4 flex justify-center items-center flex-col">
                {imageUrl && <BirdImage src={imageUrl} alt={imageAlt} />}
                <h1 className="text-2xl font-bold text-green-800 py-2">{name}</h1>
                <p className="mt-4 text-sm text-black break-all md:break-all ">{parse(description)}</p>
                <Button onClick={redirectToEBirdUrl} label="Read More" />
            </div>
            <div className="p-4 flex justify-center items-center flex-col">
                <SpeciesInfoTable {...otherInfo} />
            </div>
        </>
    );
};

const BirdDetails = (props) => {
    const { isXs, isSm } = useBreakpoints();
    const isMobile = isXs || isSm;

    if (isMobile) {
        return <MobileView {...props} />;
    }

    return <DesktopView {...props} />;
};

export default function BirdCard({ imageUrl, imageAlt = 'Photo of bird', loading, record }) {
    return (
        <Card color="bg-teal-400">
            <CardContent>
                {!record || loading ? (
                    <span>Loading...</span>
                ) : (
                    <BirdDetails imageUrl={imageUrl} imageAlt={imageAlt} record={record} />
                )}
            </CardContent>
        </Card>
    );
}
