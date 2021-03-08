import React, { useCallback } from 'react';
import Progress from './Progress';
import settings from 'config/settings';

function WidgetButton({ onSuccess, loading }) {
    const handleUpload = useCallback(
        (error, { event, info }) => {
            if (error) {
                return console.error(error.message);
            }

            if (event === 'success') {
                onSuccess(info);
                // closeWidget();
            }
        },
        [onSuccess]
    );

    const widget = useCallback(() => {
        window.cloudinary.createUploadWidget(
            {
                cloudName: settings.REACT_APP_CLOUD_NAME,
                uploadPreset: settings.REACT_APP_UPLOAD_PRESET,
            },
            handleUpload
        );
    }, [handleUpload]);

    // useEffect(() => {
    //     if (!loading) {
    //         widget.hide();
    //     }
    // }, [widget]);

    const closeWidget = useCallback(() => widget.hide(), [widget]);
    const openWidget = useCallback(() => widget.open(), [widget]);

    if (loading) {
        return <Progress />;
    }

    return (
        <button
            className="mt-12 px-8 py-4 rounded-l-xl rounded-t-xl font-light antialiased tracking-wide bg-gradient-to-b from-blue-600 to-blue-700 text-white outline-none focus:outline-none hover:shadow-lg hover:from-blue-700 transition duration-200 ease-in-out"
            onClick={openWidget}
        >
            Upload Image Via Widget
        </button>
    );
}

export default WidgetButton;
