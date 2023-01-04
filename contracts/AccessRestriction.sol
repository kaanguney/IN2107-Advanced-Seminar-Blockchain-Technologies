// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AccessRestriction {

  // declare state variables
  address owner;
  uint timestamp;

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
    // TODO: implement `fallback`
    // TODO: implement varying `transfer` practices in an `external contract`
    if(msg.value > cost) {
      // payable(msg.sender).transfer(msg.value - cost);
      (bool success, ) = address(this).call{value: msg.value - cost}("");
      require(success, "Refund transfer failed!");
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

  // use `external` in case function is not called by the contract itself
  // due to gas efficiency
  function forceOwnerChange(address _owner) public payable contractCost(100 gwei) {
    owner = _owner;
  }
}
