export default function getOauthClientId (serviceConfig) {
    return (
        serviceConfig.clientId ||
        serviceConfig.consumerKey ||
        serviceConfig.appId
    );
}
