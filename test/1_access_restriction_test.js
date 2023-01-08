const AccessRestriction = artifacts.require("AccessRestriction");

const truffleAssert = require("truffle-assertions"); 

contract(AccessRestriction, (accounts) => {
    
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
    });

    // test emitted event type for gas usage
    it("should return event type (gas usage)", async () => {
        const deployed = await AccessRestriction.deployed();
        const result = await deployed.forceOwnerChange(accounts[2]);
        truffleAssert.eventEmitted(result, "gasUsage");
    });

    // test emitted event type for owner change
    it("should return event type (owner change)", async () => {
        const deployed = await AccessRestriction.deployed();
        const result = await deployed.changeOwner(accounts[0], {"from": accounts[2]});
        truffleAssert.eventEmitted(result, "ownerChange");
    });

    // test emitted event parameters for owner change, success
    it("should return event parameters (owner change, success)", async () => {
        const deployed = await AccessRestriction.deployed();
        const result = await deployed.changeOwner(accounts[2], {"from": accounts[0]});
        truffleAssert.eventEmitted(result, "ownerChange", (ev) => {
            return ev._owner === accounts[0] && ev._account === accounts[2] && ev._timestamp;
        });
    });

    // test emitted event parameters for owner change, failure
    it("should return event parameters (owner change, failure)", async () => {
        const deployed = await AccessRestriction.deployed();
        const result = await deployed.changeOwner(accounts[0], {"from": accounts[2]});
        truffleAssert.eventNotEmitted(result, "ownerChange", (ev) => {
            return ev._owner === accounts[1] && ev._account === accounts[3] && ev._timestamp;
        });
    });
});