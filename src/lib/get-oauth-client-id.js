export default function getOauthClientId (configCollection, serviceName) {
    const serviceConfig = configCollection
        .find(config => config.get("service") === serviceName);
    return (
        serviceConfig.get("clientId") ||
        serviceConfig.get("consumerKey") ||
        serviceConfig.get("appId")
    );
}
