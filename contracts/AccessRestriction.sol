// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AccessRestriction {

  // declare state variables
  address private owner;
  uint private timestamp;

  // define a custom event
  event ownerChange(address _owner, address buyer, uint _timestamp);

  // constructor 
  constructor() {
    owner = msg.sender;
    timestamp = block.timestamp;
  }

  // implement access restriction to change the owner
  modifier onlyOwner(address account) {
    require(msg.sender == account, "Unauthorized access!");
    // execute rest
    _;
  }

  // implement requirement to purchase
  modifier contractCost(uint cost) {
    require(cost <= msg.value, "Insufficient balance!");
    _;
    // TODO: implement transfer using `call`
    // TODO: implement `fallback` function`
    if(msg.value > cost) {
      payable(msg.sender).transfer(msg.value - cost);
    }
  }

  // implement requirement to disown the contract
  modifier onlyAfter(uint _time) {
    require(block.timestamp >= _time, "Cannot disown contract yet!");
    _;
  }

  // disown the contract
  function disown() public onlyOwner(owner) onlyAfter(timestamp + 4 weeks) {
    delete owner;
  }

  // change the owner
  function changeOwner(address _owner) public onlyOwner(owner) {
    timestamp = block.timestamp;
    emit ownerChange(owner, _owner, block.timestamp);
    owner = _owner;
  }

  // transfer ownership without only owner restriction
  // should ideally adhere to `external` keyword
  function forceOwnerChange(address _owner) public payable contractCost(100 gwei) {
    owner = _owner;
  }
}
