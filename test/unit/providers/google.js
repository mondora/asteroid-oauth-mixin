import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

import * as googleOauth from "providers/google";

describe("`google` providers", function () {

    const generateCredentialToken = sinon.stub().returns("credentialToken");
    const getOauthState = sinon.stub().returns("state");
    const getOauthClientId = sinon.stub().returns("clientId");

    beforeEach(function () {
        generateCredentialToken.reset();
        googleOauth.__Rewire__("generateCredentialToken", generateCredentialToken);
        getOauthState.reset();
        googleOauth.__Rewire__("getOauthState", getOauthState);
        getOauthClientId.reset();
        googleOauth.__Rewire__("getOauthClientId", getOauthClientId);
    });

    afterEach(function () {
        googleOauth.__ResetDependency__("generateCredentialToken");
        googleOauth.__ResetDependency__("getOauthState");
        googleOauth.__ResetDependency__("getOauthClientId");
    });

    describe("`getOptions` function", function () {

        it("should call the `generateCredentialToken` function", function () {
            const options = {
                url: {
                    protocol: "protocol",
                    host: "host"
                },
                configCollection: {}
            };
            googleOauth.getOptions(options);
            expect(generateCredentialToken).to.have.callCount(1);
        });

        it("should call the `getOauthState` function with the correct parameter", function () {
            const options = {
                url: {
                    protocol: "protocol",
                    host: "host"
                },
                configCollection: {}
            };
            googleOauth.getOptions(options);
            expect(getOauthState).to.have.callCount(1);
            expect(getOauthState).to.have.been.calledWith("credentialToken");
        });

        it("should call the `getOauthClientId` function with the correct parameter", function () {
            const options = {
                url: {
                    protocol: "protocol",
                    host: "host"
                },
                configCollection: {}
            };
            googleOauth.getOptions(options);
            expect(getOauthClientId).to.have.callCount(1);
            expect(getOauthClientId).to.have.been.calledWith({}, "google");
        });

        it("should return an object with `credentialToken` and `loginUrl` parameter", function () {
            const options = {
                url: {
                    protocol: "protocol",
                    host: "host"
                },
                configCollection: {}
            };
            const ret = googleOauth.getOptions(options);
            expect(ret).to.deep.equal({
                credentialToken: "credentialToken",
                loginUrl: "https://accounts.google.com/o/oauth2/auth?response_type=token&client_id=clientId&redirect_uri=protocol%2F%2Fhost%2F_oauth%2Fgoogle&state=state&scope=openid%20email"
            });
        });

    });

});
