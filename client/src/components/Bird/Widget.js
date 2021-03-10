import React, { useCallback, useEffect, useMemo, useState } from 'react';
import settings from 'config/settings';
import Button from 'utils/Button';

function Widget({ onSuccess, loading }) {
    const [triggerClose, setTriggerClose] = useState(false);

    const handleUpload = useCallback(
        (error, { event, info }) => {
            if (error) {
                return console.error(error.message);
            }

            if (event === 'success') {
                setTriggerClose(true);
                onSuccess(info);
            }
        },
        [onSuccess, setTriggerClose]
    );

    const widget = useMemo(
        () =>
            window.cloudinary.createUploadWidget(
                {
                    cloudName: settings.REACT_APP_CLOUD_NAME,
                    uploadPreset: settings.REACT_APP_UPLOAD_PRESET,
                },
                handleUpload
            ),
        [handleUpload]
    );

    useEffect(() => {
        if (triggerClose) {
            widget.hide();
            setTriggerClose(false);
        }
    }, [triggerClose, widget]);

    const openWidget = useCallback(() => widget.open(), [widget]);

    return (
        <div className="flex justify-around m-3">
            <Button disabled={loading} showSpinner={loading} onClick={openWidget} label="Upload Image" />
        </div>
    );
}

export default Widget;
