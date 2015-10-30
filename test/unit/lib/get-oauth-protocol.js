import chai, {expect} from "chai";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

import getOauthProtocol from "lib/get-oauth-protocol";

describe("`getOauthProtocol` lib", function () {

    it("should return `http:` protocol is `http:`", function () {
        const ret = getOauthProtocol("http:");
        expect(ret).to.equal("http:");
    });

    it("should return `ws:` protocol is `http:`", function () {
        const ret = getOauthProtocol("ws:");
        expect(ret).to.equal("http:");
    });

    it("should return `https:` protocol is `http:`", function () {
        const ret = getOauthProtocol("https:");
        expect(ret).to.equal("https:");
    });

    it("should return `wss:` protocol is `http:`", function () {
        const ret = getOauthProtocol("wss:");
        expect(ret).to.equal("https:");
    });

});
