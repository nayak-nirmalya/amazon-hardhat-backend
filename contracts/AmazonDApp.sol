// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract AmazonDApp {
    string public name;

    // console.log("Contract Name: %o", name);
    constructor() {
        name = "AmazonDApp";
    }
}
