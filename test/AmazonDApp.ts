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
      transaction = await amazonDApp.connect(owner).buy(ID, {
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

    // it("Should Emit List Event with Arguments", async () => {
    //   expect(transaction)
    //     .to.emit(amazonDApp, "List")
    //     .withArgs(NAME, COST, STOCK);
    // });

    // it("Should Failed if Anyone Except 'Owner' try to List", async () => {
    //   await expect(
    //     amazonDApp
    //       .connect(addr1)
    //       .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK)
    //   ).to.be.revertedWith("Only Owner Can List Item.");
    // });
  });
});
