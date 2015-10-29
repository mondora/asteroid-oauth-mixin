export default function getOauthClientId (configCollection, serviceName) {
    const serviceConfig = configCollection
        .find(config => config.get("service") === serviceName);
    return (
        serviceConfig.clientId ||
        serviceConfig.consumerKey ||
        serviceConfig.appId
    );
}
