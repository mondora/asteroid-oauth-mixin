import urlParse from "url-parse";

import openOauthPopup from "./lib/open-oauth-popup";
// TODO implement some other common providers such as facebook and twitter
import * as google from "./providers/google";

const providers = {google};

export function init ({endpoint, platform}) {
    this.oauth = {
        platform,
        url: urlParse(endpoint)
    };
}

export function registerOauthProvider (provider) {
    providers[provider.name] = provider;
}

const configCollectionName = "meteor_accounts_loginServiceConfiguration";

export function loginWith (providerName, scope) {
    const options = providers[providerName].getOptions({
        url: this.oauth.url,
        configCollection: this.collections.get(configCollectionName),
        scope
    });
    return openOauthPopup(
        this.oauth.platform,
        this.oauth.url.host,
        options.credentialToken,
        options.loginUrl,
        (oauth) => this.login({oauth})
    );
}
