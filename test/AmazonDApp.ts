import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { AmazonDApp, AmazonDApp__factory } from "../typechain-types";

const tokens = (no: number) => ethers.utils.parseUnits(no.toString(), "ether");

describe("AmazonDApp", () => {
  let amazonDApp: AmazonDApp;

  beforeEach(async () => {
    // deploy contract
    const AmazonDApp = (await ethers.getContractFactory(
      "AmazonDApp"
    )) as AmazonDApp__factory;
    amazonDApp = await AmazonDApp.deploy();
  });

  describe("Smoke Test", () => {
    it("Should Print Contract Name", async () => {
      const name = await amazonDApp.name();
      expect(name).to.equal("AmazonDApp");
    });
  });
});
