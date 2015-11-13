import chai, {expect} from "chai";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

import getOauthClientId from "lib/get-oauth-client-id";

describe("`getOauthClientId` lib", function () {

    it("should return `clientId` if it exist", function () {
        const configCollection = {
            clientId: "clientId"
        };
        const ret = getOauthClientId(configCollection);
        expect(ret).to.equal("clientId");
    });

    it("should return `consumerKey` if it exist", function () {
        const configCollection = {
            consumerKey: "consumerKey"
        };
        const ret = getOauthClientId(configCollection, "serviceName");
        expect(ret).to.equal("consumerKey");
    });

    it("should return `appId` if it exist", function () {
        const configCollection = {
            appId: "appId"
        };
        const ret = getOauthClientId(configCollection, "serviceName");
        expect(ret).to.equal("appId");
    });

});
