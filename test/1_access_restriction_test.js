// load compiled contract
const AccessRestriction = artifacts.require("AccessRestriction");

// test contract
contract(AccessRestriction, (accounts) => {
    it("should return pattern name", async () => {
        const pattern = await AccessRestriction.deployed();
        const name = await pattern.getName();
        assert.equal(name, "Access Restriction");
    });
});