// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MemoryArrayBuilding {

  mapping(address => uint256) items;
  struct Content { 
    address owner; 
    uint256 seed; 
    uint256 _timestamp; 
  }
  Content[] contents;

  constructor() {}

  function addElement(address account, uint256 _seed) public {
    Content memory content;
    content.owner = account;
    content._timestamp = block.timestamp;
    content.seed = _seed;
    contents.push(content);
    if(account == msg.sender) {
      items[msg.sender] += 1;
    }
  }

  modifier outOfBounds(uint256 _index) {
    require(_index < getContentCount(), "Index out of bounds!");
    _;
  }

  function removeElement(uint256 _index) outOfBounds(_index) public {
    delete contents[_index];
  }

  function elementAt(uint256 _index) outOfBounds(_index) public view returns(Content memory _content) {
    return contents[_index];
  }

  function getContentCount() public view returns(uint256) {
    return contents.length;
  }

  function getContents() public view returns(Content[] memory) {
    return contents;
  }

  function getElements(address _owner) public view returns(uint256[] memory) {
    uint256 size = items[_owner];
    uint256 counter = 0;
    uint256[] memory indices = new uint256[](size);
    for (uint256 i = 0; i < contents.length; i++) {
     if(contents[i].owner == _owner) {
      indices[counter] = i; 
      counter ++;
     } 
    }
    return indices;
  }
}
