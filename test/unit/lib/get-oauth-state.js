import chai, {expect} from "chai";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

import getOauthState from "lib/get-oauth-state";

function btoa (s) {
    return new Buffer(s).toString("base64");
}
function atob (s) {
    return new Buffer(s, "base64").toString("utf8");
}

describe("`getOauthState` lib", function () {

    before(function () {
        global.window = {btoa, atob};
    });

    after(function () {
        delete global.window;
    });

    it("should return the correct string, encoded in base-64", function () {
        const credentialToken = "credentialToken";
        const ret = getOauthState(credentialToken);
        expect(ret).to.be.a("string");
        expect(JSON.parse(atob(ret))).to.deep.equal({
            credentialToken,
            isCordova: false,
            loginStyle: "popup"
        });
    });

});
