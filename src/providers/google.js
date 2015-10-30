import parse from "url-parse";

import generateCredentialToken from "../lib/generate-credential-token";
import getOauthState from "../lib/get-oauth-state";
import getOauthClientId from "../lib/get-oauth-client-id";
import getOauthProtocol from "../lib/get-oauth-protocol";

export const name = "google";

export function getOptions ({url, configCollection, scope}) {
    const credentialToken = generateCredentialToken();
    const {protocol, host} = url;
    const query = {
        "response_type": "token",
        "client_id": getOauthClientId(configCollection, "google"),
        "redirect_uri": getOauthProtocol(protocol) + `//${host}/_oauth/google`,
        "state": getOauthState(credentialToken),
        "scope": scope || "openid email"
    };
    const loginUrl = parse("https://accounts.google.com/o/oauth2/auth")
        .set("query", query)
        .toString();
    return {credentialToken, loginUrl};
}
