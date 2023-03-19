# AmazonDApp

## Technology Stack & Tools

- [Solidity](https://soliditylang.org/) (Writing Smart Contracts & Tests)
- [TypeScript](https://www.typescriptlang.org/) (Deploy & Testing)
- [Hardhat](https://hardhat.org/) (Development Framework)

## Requirements For Initial Setup

- Install [NodeJS](https://nodejs.org/en/)

## Setting Up

### 1. Clone/Download the Repository

`$ git clone https://github.com/nayak-nirmalya/amazon-hardhat-backend.git`

### 2. Install Dependencies:

`$ npm install`

### 3. Run tests

`$ npx hardhat test`

### 4. Start Hardhat node

`$ npx hardhat node`

### 5. Run deployment script

In a separate terminal execute:
`$ npx hardhat run .\scripts\deploy.ts --network localhost`

To Deploy to Polygon Mumbai TestNet:
`$ npx hardhat run .\scripts\deploy.ts --network polygon_mumbai`

### 6. Start Front-End [React (Vite)](https://github.com/nayak-nirmalya/amazon-fs-web3)

```
npm install
npm run dev
```
