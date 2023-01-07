// load compiled contract
const TightVariablePacking = artifacts.require("TightVariablePacking");

// load truffle assertions
const truffleAssert = require("truffle-assertions");

// test contract
contract(TightVariablePacking, (accounts) => {

    // test pattern name
    it("should return pattern name", async () => {
        const deployed = await TightVariablePacking.deployed();
        const instance = await deployed.getInstance();
        assert.equal(instance, "Tight Variable Packing Pattern");
    });

    // test gas event name
    it("should return event name (gas)", async () => {
        const deployed = await TightVariablePacking.deployed();
        const param = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const result = await deployed.createMemoryArray(param);
        truffleAssert.eventEmitted(result, "Gas");
    });

    // test array event name
    it("should return event name (copy)", async () => {
        const deployed = await TightVariablePacking.deployed();
        const param = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const result = await deployed.createMemoryArray(param);
        truffleAssert.eventEmitted(result, "Copy");
    });

    // test memory and storage array equality
    it("should write memory array to storage array", async () => {
        const deployed = await TightVariablePacking.deployed();
        const param = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const result = await deployed.createMemoryArray(param);
        truffleAssert.eventEmitted(result, "Copy", (ev) => {
            return JSON.stringify(ev._storage_array) === JSON.stringify(ev._memory_array);
        });
    });

    // test emitting events during array equality check
    it("should emit both (gas, copy) events during copy operation", async () => {
        const deployed = await TightVariablePacking.deployed();
        const param = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const result = await deployed.createMemoryArray(param);
        try {
            truffleAssert.eventEmitted(result, "Gas", (ev) => {
                console.log(`Gas left before operation: ${ev._current_gas} wei`);
                console.log(`Gas exhausted during operation: ${ev._exhausted_gas} wei`);
                console.log(`Gas remaining after operation: ${ev._remaining_gas} wei`);
            });
        }
        catch(error) {}
        try {
            truffleAssert.eventEmitted(result, "Copy", (ev) => {
                console.log(`Array created in memory: ${ev._memory_array}`);
                console.log(`Array created in storage: ${ev._storage_array}`);
            });
        }
        catch(error) {}
    });
});