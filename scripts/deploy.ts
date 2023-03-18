import { ethers } from "hardhat";
import items from "../items.json";
import { AmazonDApp, AmazonDApp__factory } from "../typechain-types";

async function main() {
  // get signers
  const [owner] = await ethers.getSigners();

  // deploy contract
  const AmazonDApp = (await ethers.getContractFactory(
    "AmazonDApp"
  )) as AmazonDApp__factory;
  const amazonDApp: AmazonDApp = await AmazonDApp.deploy();

  await amazonDApp.deployed();

  console.log(`AmazonDApp deployed to ${amazonDApp.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
