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

    struct Order {
        uint256 time;
        Item item;
    }

    address public owner;

    mapping(uint256 => Item) public items;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    event List(string name, uint256 cost, uint256 quantity);

    modifier onlyOwner() {
        // only owner
        require(msg.sender == owner, "Only Owner Can List Item.");
        _;
    }

    constructor() {
        owner = msg.sender;
        // console.log("Contract Owner: %o", msg.sender);
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
    ) public onlyOwner {
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
        items[_id] = item;

        // emit event
        emit List(_name, _cost, _stock);
    }

    // buy products
    function buy(uint256 _id) public payable {
        // fetch item
        Item memory item = items[_id];

        // create order
        Order memory order = Order(block.timestamp, item);

        // save order to blockchain (add order for user)
        orderCount[msg.sender] += 1;
        orders[msg.sender][orderCount[msg.sender]] = order;

        // subtract from stock
        item.stock -= 1;

        // emit event
    }

    // withdraw funds
}
