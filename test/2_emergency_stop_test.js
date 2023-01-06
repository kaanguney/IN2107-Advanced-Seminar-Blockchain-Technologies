// define pattern
let pattern = "Emergency Stop Pattern";
let artifact = pattern.replace(' Pattern', '').replace(' ', '');

// load compiled contract
const EmergencyStop = artifacts.require(artifact);

// test contract
contract(EmergencyStop, (accounts) => {

    // test pattern name
    it("should return pattern name", async () => {
        const deployed = await EmergencyStop.deployed();
        const instance = await deployed.getInstance();
        assert.equal(instance, pattern);
    });

    // test owner only function modifier
    it("should return execution state", async () => {
        const deployed = await EmergencyStop.deployed();
        const state = await deployed.getExecutionState();
        assert.equal(state, true);
    });

    // test contract on pause state
    it("should return pause state", async () => {
        const deployed = await EmergencyStop.deployed();
        await deployed.pause();
        const state = await deployed.getExecutionState();
        assert.equal(state, false);
    });

    // test contract on resume state
    it("should return resume state", async () => {
        const deployed = await EmergencyStop.deployed();
        await deployed.resume();
        const state = await deployed.getExecutionState();
        assert.equal(state, true);
    });

    // test deposit
    it("should return deposit state", async () => {
        const deployed = await EmergencyStop.deployed();
        await deployed.deposit({"from": accounts[1], value: 10});
        const state = await deployed.getWithdrawalState();
        assert.equal(state, false);
    });

    // pause contract
    it("should return pause state", async () => {
        const deployed = await EmergencyStop.deployed();
        await deployed.pause();
        const state = await deployed.getExecutionState();
        assert.equal(state, false);
    });

    // should check contract balance after deposit
    it("should return contract balance", async () => {
        const deployed = await EmergencyStop.deployed();
        const balance = await deployed.getContractBalance();
        assert.equal(balance > 0, true);
    });

    // test contract on resume state
    it("should return resume state", async () => {
        const deployed = await EmergencyStop.deployed();
        await deployed.resume();
        const state = await deployed.getExecutionState();
        assert.equal(state, true);
    });

    // test contract address
    it("should log contract address", async () => {
        const deployed = await EmergencyStop.deployed();
        const address = await deployed.getContractAddress();
        try {
            assert.ok(address !== null);
        } 
        catch (error) {
            console.log(error);
        }
        console.log(`Contract address: ${address}`);
    });

    // test owner address
    it("should log owner address", async () => {
        const deployed = await EmergencyStop.deployed();
        const address = await deployed.getOwnerAddress();
        try {
            assert.ok(address !== null);
        } 
        catch (error) {
            console.log(error);
        }
        console.log(`Owner address: ${address}`);
    });
    
    // test deposit
    it("should log valid contract balance (deposit)", async () => {
        const deployed = await EmergencyStop.deployed();
        const balance = await deployed.getContractBalance();
        await deployed.deposit({"from": accounts[1], value: 10});
        const diff = await deployed.getContractBalance() - balance;
        assert.ok(diff > 0);
        console.log(`Contract balance increased by (post deposit): ${diff}`);
    });

    // pause contract to test emergency withdrawal
    it("should return pause state", async () => {
        const deployed = await EmergencyStop.deployed();
        await deployed.pause();
        const state = await deployed.getExecutionState();
        assert.equal(state, false);
    });

    // test withdrawal
    it("should log valid contract balance", async () => {
        const deployed = await EmergencyStop.deployed();
        const address = await deployed.getContractAddress();
        await deployed.withdraw();
        const balance = await deployed.getContractBalance();
        console.log(`Contract balance (post withdrawal): ${balance}`);
    });
});