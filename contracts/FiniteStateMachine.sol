// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Validator.sol";

contract FiniteStateMachine {

  Validator private validator;
  event Automata(string _input, Validator.Validation _start, Validator.Validation _end, bool _validity);

  constructor() {
    validator = new Validator();
  }

  function state() external view returns(Validator.Validation) {
    return validator.currentState();
  }

  function machine() external view returns(Validator) {
    return validator;
  }

  function transit(string calldata _key) external {
    Validator.Validation initial_state = validator.currentState();
    validator.record(_key);
    bool validity = validator.validate(_key);
    validator.rebase(_key);
    Validator.Validation last_state = validator.currentState();
    emit Automata(_key, initial_state, last_state, validity);
  }
}
