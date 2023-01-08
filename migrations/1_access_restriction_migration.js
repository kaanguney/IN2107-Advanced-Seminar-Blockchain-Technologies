const AccessRestriction = artifacts.require("AccessRestriction");

module.exports = function(deployer) {
   deployer.deploy(AccessRestriction);
};