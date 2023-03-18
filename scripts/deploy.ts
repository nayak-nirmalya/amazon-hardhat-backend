import { ethers } from "hardhat";
import { items } from "../items.json";
import { AmazonDApp, AmazonDApp__factory } from "../typechain-types";

const tokens = (no: string) => ethers.utils.parseUnits(no.toString(), "ether");

async function main() {
  // get signers
  const [owner] = await ethers.getSigners();

  // deploy contract
  const AmazonDApp = (await ethers.getContractFactory(
    "AmazonDApp"
  )) as AmazonDApp__factory;
  const amazonDApp: AmazonDApp = await AmazonDApp.deploy();

  await amazonDApp.deployed();

  console.log(`AmazonDApp Deployed to ${amazonDApp.address}`);

  // list items
  items.map(async (item) => {
    const transaction = await amazonDApp
      .connect(owner)
      .list(
        item.id,
        item.name,
        item.category,
        item.image,
        tokens(item.price),
        item.rating,
        item.stock
      );

    await transaction.wait();

    console.log(`Listed Item ${item.id}: ${item.name}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
