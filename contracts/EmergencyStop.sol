// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EmergencyStop {

  // declare state variables
  address owner;
  bool execute;
  bool withdrawal;
  string instance;
  mapping(address => uint) balances;

  constructor() {
    owner = msg.sender;
    execute = true;
    withdrawal = false;
    instance = "Emergency Stop Pattern";
  }

  // implement getter for instance test
  function getInstance() public view returns(string memory) {
    return instance;
  }

  // implement getter for contract balance
  function getContractBalance() public view returns(uint) {
    return balances[address(this)];
  }

  // implement getter for contract address
  function getContractAddress() public view returns(address) {
    return address(this);
  }

  // implement getter for contract address
  function getOwnerAddress() public view returns(address) {
    return owner;
  }

  // implement getter for pause / resume operations
  function getExecutionState() public view returns(bool) {
    return execute;
  }

  // implement getter for withdrawal function test
  function getWithdrawalState() public view returns(bool) {
    return withdrawal;
  }

  // implement getter for owner balance
  function getOwnerBalance() public view returns(uint) {
    return balances[msg.sender];
  }


  // implement std. access restriction
  modifier onlyOwner(address account) {
    require(msg.sender == account, "Unauthorized access!");
    _;
  }  

  // implement resume check
  modifier onExecute(bool _execute) {
    require(_execute == true, "Contract is in execution!");
    _;
  }

  // implement pause check
  modifier onPause(bool _execute) {
    require(_execute == false, "Contract is on pause!");
    _;
  }

  // implement balance check
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

  // deposit ether to the contract
  function deposit() external onExecute(execute) payable {
    balances[address(this)] += msg.value;
  }

  // withdraw all funds from the contract
  function withdraw() public onPause(execute) balanceCheck(0) payable {
    balances[address(this)] = 0;
  }
}
