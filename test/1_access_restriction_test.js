// define pattern
let pattern = "Access Restriction Pattern";
let artifact = pattern.replace(' Pattern', '').replace(' ', '');

// load compiled contract
const AccessRestriction = artifacts.require(artifact);

// test contract
contract(AccessRestriction, (accounts) => {
    it("should return pattern name", async () => {
        const deployed = await AccessRestriction.deployed();
        const instance = await deployed.getInstance();
        assert.equal(instance, pattern);
    });
});