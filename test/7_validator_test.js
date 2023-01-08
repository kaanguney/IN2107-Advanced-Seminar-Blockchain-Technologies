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

    // validate first product
    it("should validate first product", async () => {
        const deployed = await Validator.deployed();
        const product = qr.generator.store()[0];
        const validity = await deployed.validate.call(product);
        assert.equal(validity, true);
    });

    // attempt an incorrect validation
    it("should attempt an incorrect validation operation", async () => {
        const deployed = await Validator.deployed();
        const product = qr.generator.store()[4];
        const validity = await deployed.validate.call(product);
        assert.equal(validity, false);
    });
});
