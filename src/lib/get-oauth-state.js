export default function getOauthState (credentialToken) {
    const state = {
        loginStyle: "popup",
        credentialToken,
        isCordova: false
    };
    // Encode base64 as not all login services URI-encode the state
    // parameter when they pass it back to us.
    // TODO: document to include a btoa/atob polyfill to support older browsers
    return window.btoa(JSON.stringify(state));
}
