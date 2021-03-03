import axios from 'axios';
import React, { useState, useCallback } from 'react';
import Image from '../components/Image';
import settings from '../config/settings';

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

const ImageContainer = ({ userLocation }) => {
    const [birdDetails, setBirdDetails] = useState(mockedBirdData);
    const [fileImage, setFileImage] = useState({ imageUrl: '', imageAlt: '' });
    const [loading, setLoading] = useState(false);

    const sendBirdData = useCallback(
        ({ url, latitude, longitude }) =>
            axios
                .post(`${settings.REACT_APP_API_URL}/bird`, {
                    url,
                    lat: latitude,
                    long: longitude,
                })
                .then(response => {
                    setLoading(false);
                    setBirdDetails(response.data)
                    return response.data;
                })
                .catch(error => {
                    console.log(error);
                }),
        []
    );

    const openWidget = useCallback(() => {
        window.cloudinary
            .createUploadWidget(
                {
                    cloudName: settings.REACT_APP_CLOUD_NAME,
                    uploadPreset: settings.REACT_APP_UPLOAD_PRESET,
                },
                async (error, { event, info }) => {
                    if (error) {
                        return console.error(error.message);
                    }

                    if (event === 'success') {
                        setFileImage({ imageUrl: info.secure_url, imageAlt: `An image of ${info.original_filename}` });
                        setLoading(true);
                        await sendBirdData({ url: info.secure_url, ...userLocation })
 
                    }
                }
            )
            .open();
    }, [sendBirdData, userLocation]);

    return <Image openWidget={openWidget} loading={loading} birdDetails={birdDetails} {...fileImage} />;
    
};

export default ImageContainer;
