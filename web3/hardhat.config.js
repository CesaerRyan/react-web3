/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.9',
    defaultNetwork:'goerli',
    networks:{
      harthat:{},
      gerili:{
        url:'https://rpc.ankr.com/eth_goerli',
        accounts:[`0x${process.env.PRIVTE_KEY}`]
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
