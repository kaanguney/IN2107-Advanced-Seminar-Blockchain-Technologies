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
