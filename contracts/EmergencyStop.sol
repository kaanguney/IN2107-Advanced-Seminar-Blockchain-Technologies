// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EmergencyStop {

  // declare state variables
  address owner;
  bool execute;
  string instance;
  mapping(address => uint) balances;

  constructor() {
    owner = msg.sender;
    execute = true;
    instance = "Emergency Stop Pattern";
  }

  // implement getter for instance test
  function getInstance() public view returns(string memory) {
    return instance;
  }

  // implement std. access restriction
  modifier onlyOwner(address account) {
    require(msg.sender == account, "Unauthorized access!");
    _;
  }

  // implement resume check
  modifier onExecute(bool _execute) {
    require(_execute, "Contract is in execution!");
    _;
  }

  // implement pause check
  modifier onPause(bool _execute) {
    require(!_execute, "Contract is on pause!");
    _;
  }

  // implement balance check
  modifier balanceCheck(uint amount) {
    require(balances[msg.sender] > amount, "Insufficient funds for withdrawal!");
    _;
  }

  function pause() public onlyOwner(owner) onExecute(execute) {
    execute = false;
  }

  function resume() public onlyOwner(owner) onPause(execute) {
    execute = true;
  }

  // deposit ether
  function deposit() public onExecute(execute) payable {
    balances[msg.sender] += msg.value;
  }

  // withdraw ether
  // TODO: add re-entrancy guard
  function withdraw() public onPause(execute) balanceCheck(msg.value) payable {
      (bool success, ) = msg.sender.call{value: msg.value}("");
      require(success, "Withdrawal failed!");
      balances[msg.sender] = 0;
  }

}
