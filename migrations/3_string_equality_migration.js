// load compiled contract
const StringEquality = artifacts.require("StringEquality");

// deploy contract
module.exports = function(deployer) {
   deployer.deploy(StringEquality);
};