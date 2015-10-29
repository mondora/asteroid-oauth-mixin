import chai, {expect} from "chai";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

import generateCredentialToken from "lib/generate-credential-token";

describe("`generateCredentialToken` lib", function () {

    it("should return a string", function () {
        const ret = generateCredentialToken();
        expect(ret).to.be.a("string");
    });

});
