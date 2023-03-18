import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("AmazonDApp", () => {
  describe("Smoke Test", () => {
    it("Should Print Contract Name", async () => {
      const AmazonDApp = await ethers.getContractFactory("AmazonDApp");
      const amazonDApp = await AmazonDApp.deploy();

      expect(await amazonDApp.name()).to.equal("AmazonDApp");
    });
  });
});
