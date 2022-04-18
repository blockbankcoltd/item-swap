var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "enemy royal side anchor sail swear valve column never credit else will";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "5777", // Match any network id
    },
    rinkeby: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/45e102508b3149f3866aa14f5939b0ab");
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
  }
  },
  compilers: {
    solc: {
      version: "^0.8.1",
    },
  },
};
