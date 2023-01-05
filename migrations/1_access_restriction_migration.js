// load compiled contract
const AccessRestriction = artifacts.require("AccessRestriction");

// deploy contract
module.exports = function(deployer) {
   deployer.deploy(AccessRestriction);
};