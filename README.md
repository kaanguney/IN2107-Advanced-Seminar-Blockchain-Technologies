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

## Contracts
* Individual patterns and migration files are self-explanatory, therefore this section mainly focuses on two smart contracts, that are [Validator.sol](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts/Validator.sol) and [FiniteStateMachine.sol](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts/FiniteStateMachine.sol) and two unit test files [7_validator_test.js](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/test/7_validator_test.js) and [8_finite_state_machine_test.js](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/test/8_finite_state_machine_test.js).
* Validator is a state machine, replicating the core concept embedded in Ethereum blokchain itself.
* There are three states in the whole validation process which are stored with an attribute defined in contract storage, that is `enum Validation { Idle, Record, Validate }`.
* Validator also has a `string[] keystore`, where data points, i.e. keys are stored. Note that `keystore` is a storage variable in the smart contract.
* In order to validate the keys stored in the contract storage, a mapping is necessary to apply the String Equality Pattern demonstrated in a separate contract in the contracts directory.
 
