// load compiled contract
const EmergencyStop = artifacts.require("EmergencyStop");

// deploy contract
module.exports = function(deployer) {
   deployer.deploy(EmergencyStop);
};