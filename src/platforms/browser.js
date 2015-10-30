import parse from "url-parse";

export default class BrowserOauthFlow {

    constructor ({credentialToken, host, loginUrl}) {
        this.credentialToken = credentialToken;
        this.host = host;
        this.loginUrl = loginUrl;
        this._credentialSecretPromise = new Promise((resolve, reject) => {
            this._resolvePromise = resolve;
            this._rejectPromise = reject;
        });
    }

    _startPolling () {
        const request = JSON.stringify({
            credentialToken: this.credentialToken
        });
        this.intervalId = window.setInterval(() => {
            this.popup.postMessage(request, this.host);
        }, 100);
        window.addEventListener("message", ::this._onMessage);
    }

    _stopPolling () {
        window.clearInterval(this.intervalId);
    }

    _onMessage ({data, origin}) {
        try {
            const message = JSON.parse(data);
            if (parse(origin).host !== this.host) {
                return;
            }
            if (message.credentialToken === this.credentialToken) {
                this._resolvePromise({
                    credentialToken: message.credentialToken,
                    credentialSecret: message.credentialSecret
                });
            }
            if (message.error) {
                this._rejectPromise(message.error);
            }
        } catch (ignore) {
            /*
            *   Simply ignore messages that:
            *       - are not JSON strings
            *       - don't match our `host`
            *       - dont't match our `credentialToken`
            */
        }
    }

    _openPopup () {
        // Open the oauth popup
        this.popup = window.open(this.loginUrl, "_blank", "location=no,toolbar=no");
        // If the focus property exists, it's a function and it needs to be
        // called in order to focus the popup
        if (this.popup.focus) {
            this.popup.focus();
        }
    }

    _closePopup () {
        this.popup.close();
    }

    init () {
        this._openPopup();
        this._startPolling();
        return this._credentialSecretPromise.then(credentialSecret => {
            this._stopPolling();
            this._closePopup();
            return credentialSecret;
        });
    }

}
