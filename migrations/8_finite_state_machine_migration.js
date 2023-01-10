const FiniteStateMachine = artifacts.require("FiniteStateMachine");

module.exports = function(deployer) {
   deployer.deploy(FiniteStateMachine);
};