# IN2107 Advanced Seminar Blockchain Technologies

## Overview
* Development framework used in implementation is [TruffleSuite](https://trufflesuite.com).
* Using Truffle, we demonstrate an end-to-end smart contract development routine under based on two contracts, namely [Validator.sol](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts/Validator.sol) and [FiniteStateMachine.sol](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts/FiniteStateMachine.sol).
* Project is built on a backbone where smart contract development is strictly divided into three distinct phases.
    * [Contracts](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts)
    * [Migrations](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/migrations)
    * [Tests](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/test)
* Contracts are written in Solidity, the programming language for writing smart contracts on the Ethereum blockchain. A brief look on this [cheatsheet](https://docs.soliditylang.org/en/v0.8.17/cheatsheet.html) should provide enough syntactical information to replicate the Finite-state Machine (FSM) or patterns used in the FSM, which are also located in the contracts directory.
* Migrations are essentially source files that have subroutines for deploying smart contracts to [Ganache](https://trufflesuite.com/ganache/).
* Not all but most of the patterns located in the contracts are used to replicate commonly acknowledged best practices during smart contract development.
* Note that [Validator.sol](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts/Validator.sol) and [FiniteStateMachine.sol](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts/FiniteStateMachine.sol) implementations are completely original but patterns are inspired / referenced by this very informative [repository](https://github.com/fravoll/solidity-patterns) and this [blog post](https://dev.to/jamiescript/design-patterns-in-solidity-1i28) published by Jamie Bones.

## Requirements
* [TruffleSuite](https://trufflesuite.com)
  * Truffle v5.6.5 (core: 5.6.5)
  * Ganache v7.5.0
  * Solidity - 0.8.17 (solc-js)
  * Node v16.18.0
  * Web3.js v1.7.4
* [npm](https://www.npmjs.com) (8.19.2)
  * [Truffle Assertions](https://www.npmjs.com/package/truffle-assertions) (^0.9.2)
  * [qrcode](https://www.npmjs.com/package/qrcode) (^1.5.1)
  
## Development
* To reproduce the project locally, jump directly to the local deployment process and unit testing project contracts below. Project initialization, contract creation, creation of migration files and adjusting truffle configuration file is already taken care of. Nonetheless, they are included as development steps in the section. 
* Project is initialized by running the following command from the terminal.
  * `truffle init`
* From now on, execute all below steps from truffle project root.
* [Validator.sol](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts/Validator.sol) is created under [contracts](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts) directory by running the following command from the terminal.
  * `truffle create contract Validator`
* [FiniteStateMachine.sol](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts/FiniteStateMachine.sol) is created under [contracts](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts) directory by running the following command from the terminal.
  * `truffle create contract FiniteStateMachine`
* Inside [migrations](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/migrations) directory, create a migration, i.e. deployment script for each smart contract to deploy the contracts on development network on port 7545 unless specified otherwise in [truffle-config.js](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/truffle-config.js). It is imperative to make sure that [Ganache](https://trufflesuite.com/ganache/) is running on port 7545 beforehand. Again, a clone of this repository provides the migration files. To reproduce this step, only make sure that you install [Ganache](https://trufflesuite.com/ganache/) and launch it on port 7545.
* Contracts are deployed on the development network by running the following command. Note that each time a change in source code of a smart contract is made, contract has to be deployed again to reflect changes. 
  * `truffle migrate`
* To run all unit tests for all smart contracts, run the following command.
  * `truffle test`
* In order to test a single smart contract, pass the relative path of the corresponding unit test file. For instance to test [FiniteStateMachine.sol](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts/FiniteStateMachine.sol) only, run the following command.
  * `truffle test ./test/8_finite_state_machine_test.js`

## Contracts
* Individual patterns and migration files are self-explanatory, therefore this section mainly focuses on two smart contracts, that are [Validator.sol](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts/Validator.sol) and [FiniteStateMachine.sol](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts/FiniteStateMachine.sol).
* [Validator.sol](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts/Validator.sol)
  * Validator is a state machine, replicating the core concept embedded in Ethereum blokchain itself.
  * There are three states in the whole validation process which are stored with an attribute defined in contract storage, that is `enum Validation { Idle, Record, Validate }`. By default, Validator is `Validation.Idle`.
  * Validator also has a `string[] keystore`, where product qr codes generated by [qrcode](https://www.npmjs.com/package/qrcode) are stored. Note that `keystore` is a storage variable in the smart contract.
  * In order to validate the qr codes stored in the contract storage, a mapping defined as `mapping(string => bytes32) private validator` is necessary to apply the [String Equality Pattern](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts/StringEquality.sol).
  * While recording a qr code to the `keystore` in contract storage, Validator hashes the qr code with `keccak256(abi.encodePacked(_key))`. First, `_key` in this case the qr code as a string literal, is passed on to `function record(string memory _key)` where it's mapped to a random 256-bit hexadecimal number, assuming the `require()` guard check, a subroutine of [Access Restriction Pattern](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts/AccessRestriction.sol) has been passed. Note that `abi.encodePacked(_key)` encodes the string literal to `bytes32` (type requirement for built-in `keccak256()`), which is established by `encodePacked()` method of [Contract Application Binary Interface (ABI)](https://docs.soliditylang.org/en/v0.8.11/abi-spec.html).
  * After the hash of the product qr is computed, a transition activity is emitted, i.e. `emit Transition(validation, Validation.Validate, gasleft())` where the current state, the state to transition to and the gas remaining reserved for the subroutine call are the event parameters.
  * Then, the state is updated accordingly by `transitionRecord()` where Validator transitions to `Validation.Record` from `Validation.Idle` state.
  * After the recording operation, Validator has to verify the qr code that now persists on the contract storage. For verification, `verify(string calldata _key)` simply computes the hash of the currently recorded qr code and returns the validity for its hash. Note that this function's visibility is `internal`, meaning that it can only be called from the contract itself. Moreover, it is also a `view` function because it reads from the storage but does not write to the storage. On the other hand, all state transition functions are `pure` functions, as in `transitionRecord()`, meaning they return a constant value and don't have to read from the storage either. This is very important for gas efficiency.
  * Finally, Validator calls the `internal` verification function, that is, `verify(string calldata _key)` from `validate(string calldata _key)` and returns the validity of the qr. State transitions to `Validation.Validate` from `Validation.Record` using `transitionValidation()`. Again, a transition event is emitted.
  * Notice that during recording and verification the string literal is passed as `calldata`. This is the most efficient way to pass parameters to functions in Solidity because it avoids unnecessary copies and packs the variable to multiples of 32 bytes. Alternatively, `memory` keyword could also be used to pass the parameters as both `memory` and `calldata` occupy non-persistent memory slots during smart contract execution. Generally, it is recommended to use `calldata` over `memory` because it costs less gas.
  * After validity of the qr is returned from `validate(string calldata _key)`, state machine has to rebase back to the default state by design, that is `Validation.Idle`. Rebasing is deleting the validated qr from the `validator` mapping in context of this state machine. In order to delete the hashed qr from this mapping, `mapping(string => uint256) private indexer` is introduced to retain the index of the hashed qr that resides in contract storage. State machine can only rebase on the `Validation.Validate` state and that is implemented identically to the guard check mentioned earlier.
  * Note that deletion from a mapping does not free memory in Solidity because mapping itself lies in the storage for life. Instead, deletion sets the mapping value to 0.
  * Finally, Validator transitions to the default state by `transitionIdle()`, this time emitting a state transition event and `Validity` event which specifically emits a boolean to determine whether the state machine was successful on product validation or not.
* [FiniteStateMachine.sol](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts/FiniteStateMachine.sol)
  * Unlike [main](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts/FiniteStateMachine.sol), [development](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/development/contracts/FiniteStateMachine.sol) branch inherits from [Validator.sol](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/development/Validator.sol).
  * `this.f()` pattern is utilized.
  * Finite-state machine encapsulates all three phases of state transitioning by wrapping them up to a single function, `transit(string calldata _key)`.
  * Calling `transit(string calldata _key)` is equivalent to a single validation round. 
