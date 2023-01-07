// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract StringEquality {

  // declare state variables
  string instance;

  // define custom events
  event Gas(uint256 _len1, uint256 _len2, uint256 _gas);

  constructor() {
    instance = "String Equality Pattern";
  }

  function getInstance() public view returns(string memory) {
    return instance;
  }

  function compareStrings(string memory _t1, string memory _t2) public returns(bool) {
    bytes memory _b1 = bytes(_t1);
    bytes memory _b2 = bytes(_t2);
    uint256 _len1 = _b1.length;
    uint256 _len2 = _b2.length;
    if(_len1 != _len2) {
      emit Gas(_len1, _len2, gasleft());
      return false;
    }
    else {
      bool result = keccak256(_b1) == keccak256(_b2);
      emit Gas(_len1, _len2, gasleft());
      return result;
    }
  }
}
