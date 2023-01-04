// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./AccessRestriction.sol";

contract EmergencyStop {

  // declare state variables
  address owner;
  bool execute;

  constructor() {
    owner = msg.sender;
    execute = false;
  }

  modifier onPause() {
    require(execute, "Contract is in execution!");
    _;
  }

  modifier canExecute() {
    require(!execute, "Contract is on pause!");
    _;
  }

  // TODO: implement emergency conditions
}
