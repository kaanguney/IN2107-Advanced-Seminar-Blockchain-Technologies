// load compiled contract
const StateMachine = artifacts.require("StateMachine");

// deploy contract
module.exports = function(deployer) {
   deployer.deploy(StateMachine);
};