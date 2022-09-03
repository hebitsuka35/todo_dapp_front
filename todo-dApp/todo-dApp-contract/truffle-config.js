//truffle-config.js
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();

// var ALCHEMY_API_KEY = "A9LzTxxt0riT3vsSTBDNznCq_TxKanLo";

var ALCHEMY_API_KEY = "YOU-ALCHEMY_API_KEY--POLYGON";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "5777",
    },
    matic: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic,
          },
          providerOrUrl: process.env.ALCHEMY_API_KEY,
          chainId: 80001,
        }),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      chainId: 80001,
    },
  },
  contracts_directory: "./contracts",
  compilers: {
    solc: {
      version: "0.8.11",
      optimizer: {
        enabled: true,
        runs: 200,
      },
    }
  },
  db: {
    enabled: false,
  },
};

// //truffle-config.js
// module.exports = {
//   networks: {
//     development: {
//       host: "localhost",
//       port: 7545,
//       network_id: "5777",
//     },
//   },
//   contracts_directory: "./contracts",

//   compilers: {
//     solc: {
//       version: "0.8.11",
//       optimizer: {
//         enabled: true,
//         runs: 200,
//       },
//     }
//   },
//   db: {
//     enabled: false,
//   },
// };