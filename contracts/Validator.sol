// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/// @title {The Validator}
/// @author {kaanguney}, {erincar}
/// @notice Product validation is iterative, state transitions are guarded by a parametrized function modifier
/// @dev Default state is {Validation.Idle}. A single validation terminates upon rebasing back to default state

contract Validator {

  enum Validation {
    Idle,
    Record,
    Validate
  }
  Validation private validation;
  mapping(string => bytes32) private validator;
  mapping(string => uint256) private indexer;
  string[] private keystore;
  event Transition(Validation _from, Validation _to, uint256 _gas);
  event Validity(bool _validity);

  constructor() {
    validation = Validation.Idle;
  }

  modifier guardState(Validation _state) {
    require(validation == _state, "Invalid state!");
    _;
  }

  function currentState() external view returns(Validation) {
    return validation;
  }

  function transitionIdle() internal pure returns(Validation) {
    return Validation.Idle;
  }

  function transitionRecord() internal pure returns(Validation) {
    return Validation.Record;
  }

  function transitionValidate() internal pure returns(Validation) {
    return Validation.Validate;
  }

  function record(string memory _key) external guardState(Validation.Idle) {
    validator[_key] = keccak256(abi.encodePacked(_key));
    addKey(_key);
    emit Transition(validation, Validation.Record, gasleft());
    validation = transitionRecord();
  }

  function addKey(string memory _key) internal {
    keystore.push(_key);
    indexer[_key] = keystore.length - 1;
  }

  function deleteKey(string memory _key) internal {
    delete validator[_key];
    delete indexer[_key];
  }

  function rebase(string calldata _key) external guardState(Validation.Validate) {
    deleteKey(_key);
    emit Transition(validation, Validation.Idle, gasleft());
    validation = transitionIdle();
  }

  function verify(string calldata _key) internal view returns(bool) {
    bool found = validator[_key] == keccak256(abi.encodePacked(_key));
    return found;
  }

  function validate(string calldata _key) external guardState(Validation.Record) returns(bool) {
    bool validity = verify(_key);
    emit Validity(validity);
    emit Transition(validation, Validation.Validate, gasleft());
    validation = transitionValidate();
    return validity;
  }
}
