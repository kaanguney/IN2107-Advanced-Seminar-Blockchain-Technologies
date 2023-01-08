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

  function record(string memory _key) public onIdle() {
    validator[_key] = keccak256(abi.encodePacked(_key));
    addKey(_key);
    emit Transition(validation, Validation.Record, gasleft());
    validation = Validation.Record;
  }
  
  function propagate() internal {
    emit Transition(validation, Validation.Validate, gasleft());
    validation = Validation.Validate;
  }

  function addKey(string memory _key) internal {
    keystore.push(_key);
  }

  function deleteKey(string memory _key) internal {
    delete validator[_key];
  }

  function rebase() internal {
    for (uint256 i = 0; i < keystore.length; i++) {
      deleteKey(keystore[i]);
    }
    emit Transition(validation, Validation.Idle, gasleft());
    validation = Validation.Idle;
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
