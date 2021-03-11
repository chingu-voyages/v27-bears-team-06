import React, { useCallback, useEffect, useState, Fragment } from 'react';
import BirdCard from './BirdCard';
import Widget from './Widget';
import Map from './Map';
import axios from 'axios';
import settings from 'config/settings';
import Notification from 'utils/Notification';

const mockedBirdData = {
    id: 1,
    name: 'Laysan Albatross',
    species_info: {
        synonyms: ['Diomedea immutabilis'],
        otherCommonNames: ['Albatros de Laysan', 'Albatros de Laysan'],
        kingdom: 'Animalia',
        phylum: 'Craniata',
        taxclass: 'Aves',
        taxorder: 'Procellariiformes',
        family: 'Diomedeidae',
        genus: 'Phoebastria',
        taxonomicComments:
            'Formerly in genus <i>Diomedea</i>; tranferred to <i>Phoebastria </i>by AOU (1997). Occasionally hybridizes with <i>P. nigripes</i> (AOU 1998).',
        informalTaxonomy: 'Animals - Vertebrates - Birds',
    },
};

const mockedBirdImage = {
    imageUrl: 'https://res.cloudinary.com/dlnsbto5l/image/upload/v1615408776/wyhtswfthsuwjdptn39k.jpg',
    imageAlt: null,
};

const Bird = () => {
    const [birdDetails, setBirdDetails] = useState(mockedBirdData);
    const [fileImage, setFileImage] = useState({ imageUrl: mockedBirdImage.imageUrl, imageAlt: null });
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState({});

    const onSuccess = useCallback((info) => {
        setFileImage({ imageUrl: info.secure_url, imageAlt: `An image of ${info.original_filename}` });
        setLoading(true);
    }, []);

    useEffect(() => {
        const sendBirdData = () =>
            axios
                .get(`${settings.REACT_APP_API_URL}/bird`, { params: { image_url: fileImage.imageUrl } })
                .then((response) => {
                    setLoading(false);
                    setBirdDetails(response.data.data);
                    setShowNotification({ type: 'info', message: 'Prediction is processing' });
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    setShowNotification({ type: 'warning', message: 'Could not find prediction!' });
                });

        if (fileImage.imageUrl) {
            sendBirdData();
        }
    }, [fileImage.imageUrl]);

    return (
        <Fragment>
            <Notification
                message={showNotification.message}
                type={showNotification.type}
                isOpen={!!showNotification.type}
            />
            <Widget onSuccess={onSuccess} loading={loading} />
            <BirdCard loading={loading} record={birdDetails} {...fileImage} />
            <Map predictedBird={birdDetails ? birdDetails.name : ''} />
        </Fragment>
    );
};

export default Bird;
