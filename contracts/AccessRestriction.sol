// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract AccessRestriction {

  address owner;
  uint timestamp;
  event ownerChange(address _owner, address _account, uint _timestamp);
  event gasUsage(uint _gas);

  constructor() {
    owner = msg.sender;
    timestamp = block.timestamp;
  }

  function getOwner() public view returns(address) {
    return owner;
  }

  modifier onlyOwner(address account) {
    require(msg.sender == account, "Unauthorized access!");
    _;
  }

  modifier onlyAfter(uint _time) {
    require(block.timestamp >= _time, "Cannot disown contract yet!");
    _;
  }

  function disown() public onlyOwner(owner) onlyAfter(timestamp + 4 weeks) {
    delete owner;
  }

  function changeOwner(address _owner) public onlyOwner(owner) {
    timestamp = block.timestamp;
    emit ownerChange(owner, _owner, block.timestamp);
    owner = _owner;
  }

  function forceOwnerChange(address _owner) public {
    owner = _owner;
    emit gasUsage(gasleft());
  }
}
