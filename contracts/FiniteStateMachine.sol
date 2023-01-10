// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Validator.sol";

/// @title Finite-state machine
/// @author {kaanguney}, {erincar}
/// @notice State machine pattern implemented in {Validator.sol} is accessed via inheritance
/// @dev A single validation process is encapsulated into an external contract function

contract FiniteStateMachine is Validator {

  event Automata(string _input, Validator.Validation _start, Validator.Validation _end, bool _validity);

  function state() external view returns(Validation) {
    return this.currentState();
  }

  function transit(string calldata _key) external {
    Validator.Validation initial_state = this.state();
    this.record(_key);
    bool validity = this.validate(_key);
    this.rebase(_key);
    Validator.Validation last_state = this.state();
    emit Automata(_key, initial_state, last_state, validity);
  }
}
