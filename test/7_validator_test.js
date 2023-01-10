const qr = require("./provider");

const products = [
    "https://innventory.de/produkt/game-of-thrones-pop-deluxe-vinyl-figur-night-king-on-iron-throne-15-cm/",
    "https://innventory.de/produkt/game-of-thrones-pop-tv-vinyl-figur-yara-greyjoy-9-cm/",
    "https://innventory.de/produkt/house-of-the-dragon-pop-tv-vinyl-figur-daemon-targaryen-9-cm/",
    "https://innventory.de/produkt/game-of-thrones-pop-rides-vinyl-figur-night-king-viserion-15-cm/",
    "https://innventory.de/produkt/game-of-thrones-pop-deluxe-vinyl-figur-jon-snow-on-iron-throne-15-cm/",
    "https://innventory.de/produkt/house-of-the-dragon-pop-tv-vinyl-figur-corlys-velaryon-9-cm/",
    "https://innventory.de/produkt/game-of-thrones-super-sized-pop-tv-vinyl-figur-the-mountain-15-cm/",
    "https://innventory.de/produkt/game-of-thrones-pop-television-vinyl-figur-king-bran-the-broken-9-cm/",
];

console.log();
for (let i = 0; i < products.length; i++) { 
    const _key = qr.generator.provide(products[i]);
    qr.generator.keystore.push(_key);
};

for (let i = 0; i < products.length; i++) {
    qr.generator.display(i, products);
};

const Validator = artifacts.require("Validator");

const truffleAssert = require("truffle-assertions");

contract(Validator, (accounts) => {

    // define the contract instance
    // hook provided by Mocha
    let deployed;
    beforeEach("should setup the contract instance", async () => {
        deployed = await Validator.deployed();
    });

    // test default state
    // state is `Idle`
    it("should return idle state", async () => {
        const state = await deployed.currentState();
        assert.equal(state, Validator.Validation.Idle);
    });

    // record first product
    // state transitions to `Record` from `Idle`
    it("should record first product", async () => {
        const product = qr.generator.store()[0];
        await deployed.record(product);
        const state = await deployed.currentState();
        assert.equal(state, Validator.Validation.Record);
    });

    // attempt to re-record first product
    // expected to fail due to no validation so far
    it("should attempt an incorrect record operation", async () => {
        const product = qr.generator.store()[0];
        await truffleAssert.reverts(deployed.record(product));
    });

    // attempt an incorrect rebasing operation
    // expected to fail due to no validation so far
    it("should attempt an incorrect rebasing operation", async () => {
        const product = qr.generator.store()[0];
        await truffleAssert.reverts(deployed.rebase(product));
    });

    // validate first product
    // state transitions to `Validate` from `Record`
    it("should validate first product", async () => {
        const product = qr.generator.store()[0];
        const result = await deployed.validate(product);
        truffleAssert.eventEmitted(result, "Validity", (ev) => {
            return ev._validity;
        });
    });

    // attempt to call an internal function
    // expected to fail due to `internal` keyword in function signature
    it("should attempt to call an internal function", async () => {
        const product = qr.generator.store()[0];
        try {
            await truffleAssert.reverts(deployed.verify(product));
        }
        catch(error) {}
    });

    // rebase after validating the first product
    // state transitions to `Idle` from `Validate`
    it("should rebase to the default state", async () => {
        const product = qr.generator.store()[0];
        const result = await deployed.rebase(product)
        truffleAssert.eventEmitted(result, "Transition", (ev) => {
            return ev._to == Validator.Validation.Idle;
        });
    });

    // record third product
    // state transitions to `Record` from `Idle`
    it("should record third product", async () => {
        const product = qr.generator.store()[2];
        await deployed.record(product);
        const state = await deployed.currentState();
        assert.equal(state, Validator.Validation.Record);
    });

    // attempt an incorrect rebasing operation
    // expected to fail due to no validation so far
    it("should attempt an incorrect rebasing operation", async () => {
        const product = qr.generator.store()[5];
        await truffleAssert.reverts(deployed.rebase(product));
    });

    // validate third product
    // state transitions to `Validate` from `Record`
    it("should validate third product", async () => {
        const product = qr.generator.store()[2];
        const result = await deployed.validate(product);
        truffleAssert.eventEmitted(result, "Validity", (ev) => {
            return ev._validity;
        });
    });

    // rebase for the last time
    // state transitions to `Idle` from `Validate`
    it("should rebase to the default state", async () => {
        const product = qr.generator.store()[2];
        const result = await deployed.rebase(product);
        truffleAssert.eventEmitted(result, "Transition", (ev) => {
            return ev._to == Validator.Validation.Idle;
        });
    });
});
