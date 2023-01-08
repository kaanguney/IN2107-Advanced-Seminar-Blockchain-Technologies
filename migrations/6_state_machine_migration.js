const StateMachine = artifacts.require("StateMachine");

module.exports = function(deployer) {
   deployer.deploy(StateMachine);
};