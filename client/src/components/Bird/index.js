import React, { useCallback, useEffect, useState, Fragment } from 'react';
import BirdCard from './BirdCard';
import Widget from './Widget';
import axios from 'axios';
import settings from 'config/settings';
import Notification from 'utils/Notification';

const mockedBirdData = {
    id: 1,
    image_url: 'https://cdn.britannica.com/57/76057-004-274A29D0.jpg',
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

const Bird = () => {
    const [birdDetails, setBirdDetails] = useState(mockedBirdData);
    const [fileImage, setFileImage] = useState({ imageUrl: null, imageAlt: null });
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
            <Notification message={showNotification.message} type={showNotification.type} isOpen={!!showNotification.type} />
            <Widget onSuccess={onSuccess} loading={loading} />
            <BirdCard loading={loading} record={birdDetails} {...fileImage} />
        </Fragment>
    );
};

export default Bird;
