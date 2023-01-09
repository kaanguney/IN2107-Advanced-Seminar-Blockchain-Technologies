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

    // test default state
    it("should return idle state", async () => {
        const deployed = await Validator.deployed();
        const state = await deployed.state();
        assert.equal(state, 0);
    });

    // record first product
    it("should record first product", async () => {
        const deployed = await Validator.deployed();
        const product = qr.generator.store()[0];
        await deployed.record(product);
        const state = await deployed.state();
        assert.equal(state, 1);
    });

    // attempt to re-record first product
    it("should attempt an incorrect record operation", async () => {
        const deployed = await Validator.deployed();
        const product = qr.generator.store()[0];
        await truffleAssert.reverts(deployed.record(product));
    });

    // attempt an incorrect rebasing operation
    it("should attempt an incorrect rebasing operation", async () => {
        const deployed = await Validator.deployed();
        await truffleAssert.reverts(deployed.rebase());
    });

    // attempt an incorrect validation
    it("should attempt an incorrect validation operation", async () => {
        const deployed = await Validator.deployed();
        const product = qr.generator.store()[4];
        const validity = await deployed.validate.call(product);
        assert.equal(validity, false);
    });

    // validate first product
    it("should validate first product", async () => {
        const deployed = await Validator.deployed();
        const product = qr.generator.store()[0];
        const validity = await deployed.validate.call(product);
        assert.equal(validity, true);
    });

    // attempt to call an internal function
    it("should attempt to call an internal function", async () => {
        const deployed = await Validator.deployed();
        const product = qr.generator.store()[0];
        try {
            await truffleAssert.reverts(deployed.verify(product));
        }
        catch(error) {}
    });

    // test validity of emitted validation event (parameters)
    it("should propagate state ", async () => {
        const deployed = await Validator.deployed();
        const result = await deployed.propagate();
        truffleAssert.eventEmitted(result, "Transition", (ev) => {
            return ev._from == 1 && ev._to == 2 && ev._gas;
        });
    });

    // rebase after validating the first product
    it("should rebase to the default state", async () => {
        const deployed = await Validator.deployed();
        const result = await deployed.rebase()
        truffleAssert.eventEmitted(result, "Transition", (ev) => {
            console.log(`    \u2713 Gas left after public rebase call: ${ev._gas} wei`);
            return ev._to == 0;
        });
    });

    // record third product
    it("should record third product", async () => {
        const deployed = await Validator.deployed();
        const product = qr.generator.store()[2];
        await deployed.record(product);
        const state = await deployed.state();
        assert.equal(state, 1);
    });

    // attempt an incorrect rebasing operation
    it("should attempt an incorrect rebasing operation", async () => {
        const deployed = await Validator.deployed();
        await truffleAssert.reverts(deployed.rebase());
    });

    // attempt an incorrect validation
    it("should attempt an incorrect validation operation", async () => {
        const deployed = await Validator.deployed();
        const product = qr.generator.store()[6];
        const validity = await deployed.validate.call(product);
        assert.equal(validity, false);
    });

    // test an invalid event
    it("should attempt an incorrect event fetch", async () => {
        const deployed = await Validator.deployed();
        const result = await deployed.propagate();
        truffleAssert.eventNotEmitted(result, "Transition", (ev) => {
            return ev._from == 0 && ev._to == 1 && ev._gas == 0;
        });
    });

    // last event was invalid, but validation should have went through
    it("should return state as valid", async () => {
        const deployed = await Validator.deployed();
        const state = await deployed.state();
        assert.equal(state, 2);
    });

    // rebase externally
    it("should rebase to the default state", async () => {
        const deployed = await Validator.deployed();
        const result = await deployed.externalRebase();
        truffleAssert.eventEmitted(result, "Transition", (ev) => {
            console.log(`    \u2713 Gas left after external rebase call: ${ev._gas} wei`);
            return ev._to == 0;
        });
    });
});
