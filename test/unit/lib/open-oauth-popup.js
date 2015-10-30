import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

import openOauthPopup from "lib/open-oauth-popup";

describe("`openOauthPopup` lib", function () {

    const init = sinon.stub().returns(Promise.resolve({oauth: "oauth"}));

    const platformsOauthFlowClasses = {
        browser: sinon.stub().returns({init}),
        chrome: sinon.stub().returns({init})
    };

    const afterCredentialSecretReceived = sinon.spy();

    beforeEach(function () {
        afterCredentialSecretReceived.reset();
        platformsOauthFlowClasses.browser.reset();
        init.reset();
        openOauthPopup.__Rewire__("platformsOauthFlowClasses", platformsOauthFlowClasses);
    });

    afterEach(function () {
        openOauthPopup.__ResetDependency__("platformsOauthFlowClasses");
    });

    it("should call only the selected platform with the correct parameter", function () {
        openOauthPopup("browser", "host", "credentialToken", "loginUrl", afterCredentialSecretReceived);
        expect(platformsOauthFlowClasses.browser).to.have.callCount(1);
        expect(platformsOauthFlowClasses.chrome).to.have.callCount(0);
        expect(platformsOauthFlowClasses.browser).to.have.been.calledWith({
            host: "host",
            credentialToken: "credentialToken",
            loginUrl: "loginUrl"
        });
    });

    it("should call the `init` method", function () {
        openOauthPopup("browser", "host", "credentialToken", "loginUrl", afterCredentialSecretReceived);
        expect(init).to.have.callCount(1);
    });

    it("should call the `afterCredentialSecretReceived` method", function () {
        openOauthPopup("browser", "host", "credentialToken", "loginUrl", afterCredentialSecretReceived);
        return init()
            .then(function () {
                expect(afterCredentialSecretReceived).to.have.callCount(1);
            });
    });

});
