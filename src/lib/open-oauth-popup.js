import BrowserOauthFlow from "../platforms/browser";

const platformsOauthFlowClasses = {
    browser: BrowserOauthFlow
};

export default function openOauthPopup (platform, host, credentialToken, loginUrl, afterCredentialSecretReceived) {
    const OauthFlow = platformsOauthFlowClasses[platform];
    const oauthFlow = new OauthFlow({host, credentialToken, loginUrl});
    return oauthFlow.init()
        .then(afterCredentialSecretReceived);
}
