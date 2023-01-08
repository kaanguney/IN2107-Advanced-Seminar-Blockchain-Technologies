// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EmergencyStop {

  address owner;
  bool execute;
  bool withdrawal;
  mapping(address => uint) balances;

  constructor() {
    owner = msg.sender;
    execute = true;
    withdrawal = false;
  }

  function getContractBalance() public view returns(uint) {
    return balances[address(this)];
  }

  function getContractAddress() public view returns(address) {
    return address(this);
  }

  function getOwnerAddress() public view returns(address) {
    return owner;
  }

  function getExecutionState() public view returns(bool) {
    return execute;
  }

  function getWithdrawalState() public view returns(bool) {
    return withdrawal;
  }

  function getOwnerBalance() public view returns(uint) {
    return balances[msg.sender];
  }

  modifier onlyOwner(address account) {
    require(msg.sender == account, "Unauthorized access!");
    _;
  }  

  modifier onExecute(bool _execute) {
    require(_execute == true, "Contract is in execution!");
    _;
  }

  modifier onPause(bool _execute) {
    require(_execute == false, "Contract is on pause!");
    _;
  }

  modifier balanceCheck(uint amount) {
    require(balances[address(this)] > amount, "Insufficient funds for withdrawal!");
    _;
  }

  function pause() public onlyOwner(owner) onExecute(execute) {
    execute = false;
  }

  function resume() public onlyOwner(owner) onPause(execute) {
    execute = true;
  }

  function deposit() external onExecute(execute) payable {
    balances[address(this)] += msg.value;
  }

  function withdraw() public onPause(execute) balanceCheck(0) payable {
    balances[address(this)] = 0;
  }
}
