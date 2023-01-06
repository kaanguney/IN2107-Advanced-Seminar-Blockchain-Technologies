// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Viserion {

  mapping(address => uint) private _balances;
  mapping(address => mapping(address => uint)) private _allowances;
  uint256 private _totalSupply;
  string private _name;
  string private _symbol;

  constructor(string memory name_, string memory symbol_) {
    _name = name_;
    _symbol = symbol_;
  }

  function name() public view returns(string memory) {
    return _name;
  }

  function symbol() public view returns(string memory) {
    return _symbol;
  }

  function decimals() public pure returns(uint8) {
    return 18;
  }

  function totalSupply() public view returns(uint256) {
    return _totalSupply;
  }

  function balanceOf(address account) public view returns(uint256) {
    return _balances[account];
  }
}
