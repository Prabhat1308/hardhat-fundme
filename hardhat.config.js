require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("hardhat-deploy");

//cant install dotenv after installing hardhat-deploy
/** @type import('hardhat/config').HardhatUserConfig */
const URL = process.env.URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API = process.env.ETHERSCAN_API;
module.exports = {
  //solidity: "0.8.4",
  solidity: {
    compilers: [{ version: "0.8.4" }, { version: "0.6.6" }],
  },
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: URL,
      accounts: [PRIVATE_KEY],
      blockConfirmation: 6,
      chainId: 5,
    },
  },

  etherscan: {
    apiKey: ETHERSCAN_API,
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
