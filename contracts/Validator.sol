// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Validator {

  // TODO: save keys in an array, delete mappings on a rebase request
  // TODO: add keys from multiple accounts, e.g. Memory Array Building

  enum Validation {
    Idle,
    Record,
    Validate
  }
  Validation validation;
  mapping(string => bytes32) validator;

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

  function record(string memory _data) public onIdle() {
    validator[_data] = keccak256(abi.encodePacked(_data));
    emit Transition(validation, Validation.Record, gasleft());
    validation = Validation.Record;
  }
  
  function propagate() internal {
    emit Transition(validation, Validation.Validate, gasleft());
    validation = Validation.Validate;
  }

  function rebase() internal {
    emit Transition(validation, Validation.Idle, gasleft());
    validation = Validation.Idle;
  }

  function verify(string memory _data) internal view returns(bool) {
    bool found = validator[_data] == keccak256(abi.encodePacked(_data));
    return found;
  }

  function validate(string memory _data) public onRecord() returns(bool) {
    bool validity = verify(_data);
    propagate();
    return validity;
  }
}
