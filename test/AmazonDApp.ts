import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { AmazonDApp, AmazonDApp__factory } from "../typechain-types";
import { ContractTransaction } from "ethers";

const tokens = (no: number) => ethers.utils.parseUnits(no.toString(), "ether");

describe("AmazonDApp", () => {
  let amazonDApp: AmazonDApp;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];

  const ID = 1;
  const NAME = "Shoes";
  const CATEGORY = "Clothing";
  const IMAGE =
    "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg";
  const COST = tokens(1);
  const RATING = 4;
  const STOCK = 5;

  beforeEach(async () => {
    // get signers
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // deploy contract
    const AmazonDApp = (await ethers.getContractFactory(
      "AmazonDApp"
    )) as AmazonDApp__factory;
    amazonDApp = await AmazonDApp.deploy();
  });

  describe("Deployment", () => {
    it("Should Verify the Owner", async () => {
      const contractOwner = await amazonDApp.owner();
      expect(contractOwner).to.equal(owner.address);
    });
  });

  describe("Listing of Item", () => {
    let transaction: ContractTransaction;

    const ID = 1;
    const NAME = "Shoes";
    const CATEGORY = "Clothing";
    const IMAGE =
      "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg";
    const COST = tokens(1);
    const RATING = 4;
    const STOCK = 5;

    beforeEach(async () => {
      transaction = await amazonDApp
        .connect(owner)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);

      await transaction.wait();
    });

    it("Should Verify Listing of An Item with All Attributes", async () => {
      const item = await amazonDApp.items(ID);

      expect(item.id).to.equal(ID);
      expect(item.name).to.equal(NAME);
      expect(item.category).to.equal(CATEGORY);
      expect(item.image).to.equal(IMAGE);
      expect(item.cost).to.equal(COST);
      expect(item.rating).to.equal(RATING);
      expect(item.stock).to.equal(STOCK);
    });

    it("Should Emit List Event with Arguments", async () => {
      expect(transaction)
        .to.emit(amazonDApp, "List")
        .withArgs(NAME, COST, STOCK);
    });

    it("Should Failed if Anyone Except 'Owner' try to List", async () => {
      await expect(
        amazonDApp
          .connect(addr1)
          .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
      ).to.be.revertedWith("Only Owner Can List Item.");
    });
  });

  describe("Buy Item", () => {
    let transaction: ContractTransaction;

    beforeEach(async () => {
      // list item
      transaction = await amazonDApp
        .connect(owner)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();

      // buy item
      transaction = await amazonDApp.connect(addr1).buy(ID, {
        value: COST,
      });
      await transaction.wait();
    });

    it("Updates the Contract Balance", async () => {
      const contractBalance = await ethers.provider.getBalance(
        amazonDApp.address
      );
      expect(contractBalance).to.equal(COST);
    });

    it("Updates Buyer's Order Count", async () => {
      const result = await amazonDApp.orderCount(addr1.address);
      expect(result).to.equal(1);
    });

    it("Should Add Order", async () => {
      const order = await amazonDApp.orders(addr1.address, 1);

      expect(order.time).to.be.greaterThan(0);
      expect(order.item.name).to.equal(NAME);
    });

    it("Should Emit Buy Event with Arguments", async () => {
      expect(transaction)
        .to.emit(amazonDApp, "Buy")
        .withArgs(addr1.address, 1, 1);
    });

    it("Should Failed if Not Enough ETH", async () => {
      await expect(
        amazonDApp.connect(addr2).buy(ID, {
          value: tokens(0.76),
        })
      ).to.be.revertedWith("Not Enough ETH!");
    });

    it("Should Failed if Not Enough Stock!", async () => {
      const ONE_ITEM = 2;

      await amazonDApp.list(ONE_ITEM, NAME, CATEGORY, IMAGE, COST, RATING, 0);

      await expect(
        amazonDApp.connect(addr1).buy(ONE_ITEM, {
          value: COST,
        })
      ).to.be.revertedWith("Not Enough Stock!");
    });
  });
});
