// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EmergencyStop {

  // declare state variables
  address owner;
  bool execute;

  constructor() {
    owner = msg.sender;
    execute = true;
  }

  // implement std. access restriction
  modifier onlyOwner(address account) {
    require(msg.sender == account, "Unauthorized access!");
    _;
  }

  // implement resume check
  modifier onExecute(bool _execute) {
    require(_execute, "Contract is in execution!");
    _;
  }

  // implement pause check
  modifier onPause(bool _execute) {
    require(!_execute, "Contract is on pause!");
    _;
  }

  function pause() public onlyOwner(owner) onExecute(execute) {
    execute = false;
  }

  function resume() public onlyOwner(owner) onPause(execute) {
    execute = true;
  }

}
