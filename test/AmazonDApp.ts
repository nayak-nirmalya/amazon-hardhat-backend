import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { AmazonDApp, AmazonDApp__factory } from "../typechain-types";

const tokens = (no: number) => ethers.utils.parseUnits(no.toString(), "ether");

describe("AmazonDApp", () => {
  let amazonDApp: AmazonDApp;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];

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
    it("Should Print Contract Name", async () => {
      const name = await amazonDApp.name();
      expect(name).to.equal("AmazonDApp");
    });

    it("Should Verify the Owner", async () => {
      const contractOwner = await amazonDApp.owner();
      expect(contractOwner).to.equal(owner.address);
    });
  });
});
