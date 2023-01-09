# IN2107 Advanced Seminar Blockchain Technologies

## Overview
* Development framework used in implementation is [TruffleSuite](https://trufflesuite.com).
* Using Truffle, we demonstrate an end-to-end smart contract development routine under a product called, `Validator`.
* Project is built on a backbone where smart contract development is strictly divided into three distinct phases.
    * [Contracts](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/contracts)
    * [Migrations](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/migrations)
    * [Tests](https://github.com/kaanguney/IN2107-Advanced-Seminar-Blockchain-Technologies/tree/main/tests)
* Contracts are written in Solidity, the programming language for writing smart contracts on the Ethereum blockchain. A brief look on this cheatsheet should provide enough syntactical information to replicate the `Validator` or patterns used in the `Validator`, which are also located in the contracts directory.
* Not all but most of the patterns located in the contracts are used to replicate commonly acknowledged best practices during smart contract development.
* Note that product source file is completely original but patterns are inspired / referenced by this very informative [repository](https://github.com/fravoll/solidity-patterns) and this [blog post](https://dev.to/jamiescript/design-patterns-in-solidity-1i28) published by Jamie Bones.

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
