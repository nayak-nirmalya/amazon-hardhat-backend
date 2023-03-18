// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract AmazonDApp {
    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    address public owner;

    mapping(uint256 => Item) public items;

    constructor() {
        owner = msg.sender;
        console.log("Contract Owner: %o", msg.sender);
    }

    // list products
    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public {
        // create Item struct
        Item memory item = Item({
            id: _id,
            name: _name,
            category: _category,
            image: _image,
            cost: _cost,
            rating: _rating,
            stock: _stock
        });

        // save Item struct
    }

    // buy products

    // withdraw funds
}
