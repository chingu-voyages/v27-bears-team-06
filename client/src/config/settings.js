const settings = {
    REACT_APP_CLOUD_NAME: process.env.REACT_APP_CLOUD_NAME || window._env_.REACT_APP_CLOUD_NAME,
    REACT_APP_UPLOAD_PRESET: process.env.REACT_APP_UPLOAD_PRESET || window._env_.REACT_APP_UPLOAD_PRESET,
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY || window._env_.REACT_APP_API_KEY,
    REACT_APP_API_SECRET: process.env.REACT_APP_API_SECRET || window._env_.REACT_APP_API_SECRET,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL || window._env_.REACT_APP_API_URL,
    REACT_APP_MAPBOX_API_TOKEN: process.env.REACT_APP_MAPBOX_API_TOKEN || window._env_.REACT_APP_MAPBOX_API_TOKEN,
};

export default settings;
