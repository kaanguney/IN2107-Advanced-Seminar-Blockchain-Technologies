// define pattern
let pattern = "Access Restriction Pattern";
let artifact = pattern.replace(' Pattern', '').replace(' ', '');

// load compiled contract
const AccessRestriction = artifacts.require(artifact);

// load truffle assertions
const truffleAssert = require("truffle-assertions"); 

// test contract
contract(AccessRestriction, (accounts) => {

    // test pattern name
    it("should return pattern name", async () => {
        const deployed = await AccessRestriction.deployed();
        const instance = await deployed.getInstance();
        assert.equal(instance, pattern);
    });
    
    // test function modifier for owner
    it("should change owner (success)", async () => {
        const deployed = await AccessRestriction.deployed();
        await deployed.changeOwner(accounts[1], {"from": accounts[0]});
        const owner = await deployed.getOwner();
        assert.equal(owner, accounts[1]);
    });

    // test function modifier on a failure condition
    it("should change owner (failure)", async () => {
        const deployed = await AccessRestriction.deployed();
        await truffleAssert.reverts(deployed.changeOwner(accounts[1], {"from": accounts[3]}));
    })
});