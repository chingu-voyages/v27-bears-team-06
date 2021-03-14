import React, { useCallback, useEffect, useState, Fragment } from 'react';
import BirdCard from './BirdCard';
import Widget from './Widget';
import Map from './Map';
import axios from 'axios';
import settings from 'config/settings';
import Notification from 'utils/Notification';

const Bird = () => {
    const [birdDetails, setBirdDetails] = useState(null);
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
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                    setShowNotification({ type: 'warning', message: 'Could not find prediction!' });
                });

        if (fileImage.imageUrl) {
            setShowNotification({ type: 'info', message: 'Prediction is processing' });
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
            <BirdCard loading={loading} record={birdDetails} {...fileImage}>
                <Widget onSuccess={onSuccess} loading={loading} />
            </BirdCard>
            <Map predictedBird={birdDetails ? birdDetails.name : ''} />
        </Fragment>
    );
};

export default Bird;
