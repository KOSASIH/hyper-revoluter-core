// src/blockchain/migrations/2_deploy_contracts.js
const MyToken = artifacts.require("MyToken");

module.exports = function (deployer) {
    const initialSupply = web3.utils.toWei('1000', 'ether'); // 1000 tokens
    deployer.deploy(MyToken, initialSupply);
};
