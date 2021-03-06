import amplitude from 'amplitude-js';

export const initAmplitude = () => {
  amplitude.getInstance().init(process.env.REACT_APP_AMPLITUDE_PROD);
};

export const setAmplitudeUserDevice = installationToken => {
  amplitude.getInstance().setDeviceId(installationToken);
};

export const setAmplitudeUserId = userId => {
  amplitude.getInstance().setUserId(userId);
};

export const setAmplitudeUserProperties = properties => {
  amplitude.getInstance().setUserProperties(properties);
};

export const sendAmplitudeData = (eventType, eventProperties) => {
  amplitude.getInstance().logEvent(eventType, eventProperties);
};

export const logOutAmplitude = () => {
    amplitude.getInstance().setUserId(null);
    amplitude.getInstance().regenerateDeviceId();
}