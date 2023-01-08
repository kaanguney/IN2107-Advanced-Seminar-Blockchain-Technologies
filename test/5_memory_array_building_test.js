const MemoryArrayBuilding = artifacts.require("MemoryArrayBuilding");

contract(MemoryArrayBuilding, (accounts) => {

    // test adding a single element to storage by owner
    it("should add an element to storage by owner", async () => {
        const deployed = await MemoryArrayBuilding.deployed();
        const seed = 42;
        await deployed.addElement(accounts[0], seed);
        const size = await deployed.getContentCount();
        assert.equal(size, 1);
    });

    // test adding multiple elements to storage by owner
    it("should add two more elements to storage by owner", async () => {
        const deployed = await MemoryArrayBuilding.deployed();
        const s1 = 84;
        const s2 = 126;
        await deployed.addElement(accounts[0], s1);
        await deployed.addElement(accounts[0], s2)
        const size = await deployed.getContentCount();
        assert.equal(size, 3);
    });

    // add five elements at once
    it("should add five elements to storage by owner", async () => {
        const deployed = await MemoryArrayBuilding.deployed();
        for(let i = 0; i < 5; i++) {    
            await deployed.addElement(accounts[0], i);
        };
        const size = await deployed.getContentCount();
        assert.equal(Number(size), 8);
    });

    // add 3 more elements by third account
    it("should add 3 more elements to storage by the third account", async () => {
        const deployed = await MemoryArrayBuilding.deployed();
        for(let i = 6; i < 9; i++) {    
            await deployed.addElement(accounts[2], i);
        };
        const size = await deployed.getContentCount();
        assert.equal(Number(size), 11);
    });

    // return number of elements added by the owner
    it("should return number of elements added by owner", async () => {
        const deployed = await MemoryArrayBuilding.deployed();
        const elements = await deployed.getElements(accounts[0]);
        assert.equal(elements.length, 8);
    });

    // test deleting first element
    it("should delete first element from storage", async () => {
        const deployed = await MemoryArrayBuilding.deployed();
        await deployed.removeElement(0);
        const deleted = await deployed.elementAt(0);
        assert.equal(deleted.owner, "0x0000000000000000000000000000000000000000");
    });

    // test deleting seventh element
    it("should delete seventh element from storage", async () => {
        const deployed = await MemoryArrayBuilding.deployed();
        await deployed.removeElement(6);
        const deleted = await deployed.elementAt(6);
        assert.equal(deleted.owner, "0x0000000000000000000000000000000000000000");
    });
});