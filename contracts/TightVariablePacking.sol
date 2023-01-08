// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TightVariablePacking {

  uint8[10] ints;
  event Gas(uint256 _current_gas, uint256 _exhausted_gas, uint256 _remaining_gas);
  event Copy(uint8[10] _storage_array, uint8[10] _memory_array);

  constructor() {}

  function createMemoryArray(uint8[10] memory _ints) public {
    uint256 _gas = gasleft();
    ints = _ints;
    emit Gas(_gas, _gas - gasleft(), gasleft());
    emit Copy(ints, _ints);
  }
}
