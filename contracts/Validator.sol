// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Validator {

  enum Validation {
    Idle,
    Record,
    Validate
  }
  Validation validation;
  mapping(string => bytes32) validator;
  string[] keystore;
  event Transition(Validation _from, Validation _to, uint256 _gas);

  constructor() {
    validation = Validation.Idle;
  }

  function state() public view returns(Validation) {
    return validation;
  }

  modifier onIdle() {
    require(validation == Validation.Idle, "Cannot propagate state to record data!");
    _;
  }

  modifier onRecord() {
    require(validation == Validation.Record, "Cannot propagate state to validate data!");
    _;
  }

  modifier onValid() {
    require(validation == Validation.Validate, "Can only rebase on valid state!");
    _;
  }

  function record(string memory _key) public onIdle() {
    validator[_key] = keccak256(abi.encodePacked(_key));
    addKey(_key);
    propagate();
  }

  function adapt(Validation _state) internal pure returns(Validation) {
      Validation next_state = Validation(uint(_state) + 1);
      return next_state;
  }
  
  function propagate() public {
    Validation next_state = adapt(validation);
    emit Transition(validation, next_state, gasleft());
    validation = next_state;
  }

  function addKey(string memory _key) internal {
    keystore.push(_key);
  }

  function deleteKey(string memory _key) internal {
    delete validator[_key];
  }

  function rebase() public onValid() {
    for (uint256 i = 0; i < keystore.length; i++) {
      deleteKey(keystore[i]);
    }
    Validation next_state = Validation(uint(validation) - 2);
    emit Transition(validation, next_state, gasleft());
    validation = next_state;
  }

  function externalRebase() external onValid() {
    for (uint256 i = 0; i < keystore.length; i++) {
      deleteKey(keystore[i]);
    }
    Validation next_state = Validation(uint(validation) - 2);
    emit Transition(validation, next_state, gasleft());
    validation = next_state;
  }

  function verify(string memory _key) internal view returns(bool) {
    bool found = validator[_key] == keccak256(abi.encodePacked(_key));
    return found;
  }

  function validate(string memory _key) public onRecord() returns(bool) {
    bool validity = verify(_key);
    propagate();
    return validity;
  }
}
