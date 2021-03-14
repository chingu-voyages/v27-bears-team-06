import React, { useCallback, useState } from 'react';
import parse from 'html-react-parser';
import SpeciesInfoTable from './SpeciesInfoTable';
import { useBreakpoints, Button, Card, CardContent } from 'utils';
import axios from 'axios';

const BirdImage = ({ src, alt }) => (
    <div className="flex justify-center">
        <img src={src} alt={alt} className="h-auto max-w-full align-middle border-none rounded shadow-lg max-h-72" />
    </div>
);

const EBirdRedirectButton = ({ name }) => {
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

    return <Button onClick={redirectToEBirdUrl} label="Read More" />;
};

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
                    <h1 className="py-2 text-2xl font-bold text-green-800">{name}</h1>
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
            <EBirdRedirectButton name={name} />
        </div>
    );
};

const DesktopView = ({ record, imageUrl, imageAlt }) => {
    const { name, species_info: speciesInfo } = record;
    const { taxonomicComments: description, ...otherInfo } = speciesInfo;

    return (
        <>
            <div className="flex flex-col items-center justify-center p-4">
                {imageUrl && <BirdImage src={imageUrl} alt={imageAlt} />}
                <h1 className="py-2 text-2xl font-bold text-green-800">{name}</h1>
                <p className="mt-4 text-sm text-black break-all md:break-all ">{parse(description)}</p>
                <EBirdRedirectButton name={name} />
            </div>
            <div className="p-4">
                <SpeciesInfoTable {...otherInfo} />
            </div>
        </>
    );
};

const BirdDetails = ({ loading, ...props }) => {
    const { isXs, isSm } = useBreakpoints();
    const isMobile = isXs || isSm;

    if (loading) {
        return <span>Loading...</span>;
    }

    if (isMobile) {
        return <MobileView {...props} />;
    }

    return <DesktopView {...props} />;
};

const PlaceholderBird = () => (
    <div className="flex flex-col items-center justify-center p-4">
        <BirdImage
            src={'https://res.cloudinary.com/dlnsbto5l/image/upload/v1615408776/wyhtswfthsuwjdptn39k.jpg'}
            alt="Placeholder bird"
        />
        <h1 className="py-2 text-2xl font-bold text-green-800">
            Start by uploading an image via the "Send Prediction" button above
        </h1>
    </div>
);

export default function BirdCard({ imageUrl, imageAlt = 'Photo of bird', loading, record, children }) {
    return (
        <Card color="bg-teal-400">
            <CardContent>
                {!record && !loading ? (
                    <PlaceholderBird />
                ) : (
                    <BirdDetails imageUrl={imageUrl} imageAlt={imageAlt} record={record} loading={loading} />
                )}
            </CardContent>
            {children}
        </Card>
    );
}
