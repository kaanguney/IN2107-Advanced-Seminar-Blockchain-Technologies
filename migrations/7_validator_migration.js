// load compiled contract
const Validator = artifacts.require("Validator");

// deploy contract
module.exports = function(deployer) {
   deployer.deploy(Validator);
};