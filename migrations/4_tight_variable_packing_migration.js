// load compiled contract
const TightVariablePacking = artifacts.require("TightVariablePacking");

// deploy contract
module.exports = function(deployer) {
   deployer.deploy(TightVariablePacking);
};