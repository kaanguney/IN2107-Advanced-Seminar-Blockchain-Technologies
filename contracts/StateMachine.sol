// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract StateMachine {

  enum States {
    Idle,
    Active,
    Abort
  }
  States state;
  
  constructor() {
    state = States.Idle;
  }

  modifier outOfBoundsForward() {
    require(state != States.Abort, "Cannot increment state!");
    _;
  }

  modifier outOfBoundsBackward() {
    require(state != States.Idle, "Cannot decrement state!");
    _;
  }

  function forward() public outOfBoundsForward() {
    state = States(uint256(state) + 1);
  }

  function getState() public view returns(States) {
    return state;
  }

  function backward() public outOfBoundsBackward() {
    state = States(uint256(state) - 1);
  }
}
