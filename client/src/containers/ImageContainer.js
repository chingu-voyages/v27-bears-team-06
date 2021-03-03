import axios from 'axios';
import React, { useState, useCallback } from 'react';
import Image from '../components/Image';
import settings from '../config/settings';

const ImageContainer = ({ userLocation }) => {
    const [birdInfo, setBirdInfo] = useState({
        name: null,
        description: null,
    });
    const [fileImage, setFileImage] = useState({ imageUrl: '', imageAlt: '' });
    const [loading, setLoading] = useState(false);

    const sendBirdData = useCallback(
        ({ url, latitude, longitude }) =>
            axios
                .post(`${settings.REACT_APP_API_URL}/bird-mock`, {
                    url,
                    lat: latitude,
                    long: longitude,
                })
                .then(function (response) {
                    console.log(response);
                    setLoading(false);
                    return response.data;
                })
                .catch(function (error) {
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
                            .then((data) => setBirdInfo({ name: data.name, description: data.description }))
                            .catch((err) => console.log(err.message));
                    }
                }
            )
            .open();
    }, [sendBirdData, userLocation]);

    // TODO: If loading = true, show loading progress
    return <Image openWidget={openWidget} loading={loading} birdInfo={birdInfo} {...fileImage} />;
    
};

export default ImageContainer;
