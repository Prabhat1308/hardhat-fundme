const { networkConfig } = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");
const {
  developmentChains,
  DECIMALS,
  INITIAL_ANS,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments; //log = console.log
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  // if (developmentChains.includes(network.name)) {
  //   log("Local network detected. deploying mocks");
  //   await deploy("MockV3Aggregator", {
  //     contract: "MockV3Aggregator",
  //     from: deployer,
  //     log: true,
  //     args: [DECIMALS, INITIAL_ANS],
  //   });
  //   log("MOCKS DEPLOYED");
  //   log("---------");
  // }

  //const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];

  let ethUsdPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }
  //if the contract doesnt exist we deploy a minimal version of our local testing
  const args = [ethUsdPriceFeedAddress];
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API) {
    await verify(fundMe.address, args);
  }

  log("-----------------------------");
};

module.exports.tags = ["all", "fundMe"];
