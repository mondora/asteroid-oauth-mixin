import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

import getOauthClientId from "lib/get-oauth-client-id";

describe("`getOauthClientId` lib", function () {

    it("should return `clientId` if it exist", function () {
        const configCollection = {
            find: sinon.stub().returns({
                clientId: "clientId",
                get: sinon.stub().returns({clientId: "clientId"})
            })
        };
        const ret = getOauthClientId(configCollection, "serviceName");
        expect(ret).to.equal("clientId");
    });

    it("should return `consumerKey` if it exist", function () {
        const configCollection = {
            find: sinon.stub().returns({
                consumerKey: "consumerKey",
                get: sinon.stub().returns({consumerKey: "consumerKey"})
            })
        };
        const ret = getOauthClientId(configCollection, "serviceName");
        expect(ret).to.equal("consumerKey");
    });

    it("should return `appId` if it exist", function () {
        const configCollection = {
            find: sinon.stub().returns({
                appId: "appId",
                get: sinon.stub().returns({appId: "appId"})
            })
        };
        const ret = getOauthClientId(configCollection, "serviceName");
        expect(ret).to.equal("appId");
    });

});
