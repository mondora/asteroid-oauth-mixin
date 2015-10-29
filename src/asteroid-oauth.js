import urlParse from "url-parse";

import openOauthPopup from "./lib/open-oauth-popup";

const providers = {};

export function init ({endpoint, platform}) {
    this.oauth = {
        platform,
        url: urlParse(endpoint)
    };
}

export function registerOauthProvider (provider) {
    providers[provider.name] = provider;
}

// import * as googleProvider from "asteroid-oauth";
// googleProvider.registerOauthProvider({
//     name: "google",
//     getOptions: getGoogleOauthOptions
// });

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
