// load compiled contract
const StringEquality = artifacts.require("StringEquality");

// load truffle assertions
const truffleAssert = require("truffle-assertions");

// test contract
contract(StringEquality, (accounts) => {

    // test pattern name
    it("should return pattern name", async () => {
        const deployed = await StringEquality.deployed();
        const instance = await deployed.getInstance();
        assert.equal(instance, "String Equality Pattern");
    });

    // test string equality
    it("should return false for equality check (easy)", async () => {
        const deployed = await StringEquality.deployed();
        const s1 = "Erinc Argimak";
        const s2 = "Erinc Argimak";
        const result = await deployed.compareStrings.call(s1, s2);
        assert.equal(result, true);
    });

    // test string equality
    it("should return false for equality check (medium)", async () => {
        const deployed = await StringEquality.deployed();
        const s1 = "Kaan Guney Keklikci";
        const s2 = "Kaan Guney KEKLIKCI";
        const result = await deployed.compareStrings.call(s1, s2);
        assert.equal(result, false);
    });

    // test string equality
    it("should return false for equality check (hard)", async () => {
        const deployed = await StringEquality.deployed();
        const s1 = "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
        const s2 = "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111";
        const result = await deployed.compareStrings.call(s1, s2);
        assert.equal(result, false);
    });

    // test emitted event type
    it("should return correct event type", async () => {
        const deployed = await StringEquality.deployed();
        const s1 = "test";
        const s2 = "test";
        const result = await deployed.compareStrings(s1, s2);
        truffleAssert.eventEmitted(result, "Gas");
    });

    // test emitted event parameters
    it("should return correct event parameters", async () => {
        const deployed = await StringEquality.deployed();
        const s1 = "@kaanguney";
        const s2 = "@erincar";
        const result = await deployed.compareStrings(s1, s2);
        truffleAssert.eventEmitted(result, "Gas", (ev) => {
            return ev._len1 == s1.length && ev._len2 == s2.length && ev._gas > 0;
        });
    });
});