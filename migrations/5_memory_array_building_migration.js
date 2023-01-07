// load compiled contract
const MemoryArrayBuilding = artifacts.require("MemoryArrayBuilding");

// deploy contract
module.exports = function(deployer) {
   deployer.deploy(MemoryArrayBuilding);
};