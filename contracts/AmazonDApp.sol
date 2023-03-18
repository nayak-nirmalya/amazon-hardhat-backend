// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract AmazonDApp {
    string public name;
    address public owner;

    constructor() {
        name = "AmazonDApp";
        owner = msg.sender;
        console.log("Contract Name: %o\nContract Owner: %o", name, msg.sender);
    }
}
