const EmergencyStop = artifacts.require("EmergencyStop");

module.exports = function(deployer) {
   deployer.deploy(EmergencyStop);
};