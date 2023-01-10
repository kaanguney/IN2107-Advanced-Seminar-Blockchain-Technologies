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

const FiniteStateMachine = artifacts.require("FiniteStateMachine");
const Validator = artifacts.require("Validator");

const truffleAssert = require("truffle-assertions");

contract(FiniteStateMachine, (accounts) => {

    // define the contract instance
    // hook provided by Mocha
    let deployed;
    beforeEach("should setup the contract instance", async () => {
        deployed = await FiniteStateMachine.deployed();
    });

    // test default state
    // state is `Idle`
    it("should return idle state", async () => {
        const state = await deployed.state();
        assert.equal(state, Validator.Validation.Idle);
    });

    // validate each qr code using the finite state machine
    let data = qr.generator.store();
    for(let i = 0; i < data.length; i++) {
        it(`should validate product ${i + 1}`, async () => {
            const product = data[i];
            const result = await deployed.transit(product);
            truffleAssert.eventEmitted(result, "Automata", (ev) => {
                return ev._input == data[i] && ev._start == Validator.Validation.Idle && ev._end == Validator.Validation.Idle && ev._validity;
            });
        });
    }
});
