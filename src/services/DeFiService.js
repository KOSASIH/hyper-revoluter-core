import Web3 from 'web3';
import axios from 'axios';
import { DEFI_CONTRACT_ABI, DEFI_CONTRACT_ADDRESS } from './config'; // Import your contract ABI and address
import { getTokenPrice } from './priceOracle'; // Assume you have a price oracle utility

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545'); // Connect to Ethereum

class DeFiService {
    constructor() {
        this.contract = new web3.eth.Contract(DEFI_CONTRACT_ABI, DEFI_CONTRACT_ADDRESS);
    }

    // Fetch user balance of a specific token
    async getUser Balance(userAddress, tokenAddress) {
        try {
            const balance = await this.contract.methods.balanceOf(userAddress, tokenAddress).call();
            return web3.utils.fromWei(balance, 'ether'); // Convert from Wei to Ether
        } catch (error) {
            console.error('Error fetching user balance:', error);
            throw new Error('Failed to fetch user balance');
        }
    }

    // Lend tokens to the DeFi protocol
    async lendTokens(userAddress, tokenAddress, amount) {
        try {
            const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
            const transaction = await this.contract.methods.lend(tokenAddress, amountInWei).send({ from: userAddress });
            return transaction;
        } catch (error) {
            console.error('Error lending tokens:', error);
            throw new Error('Failed to lend tokens');
        }
    }

    // Borrow tokens from the DeFi protocol
    async borrowTokens(userAddress, tokenAddress, amount) {
        try {
            const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
            const transaction = await this.contract.methods.borrow(tokenAddress, amountInWei).send({ from: userAddress });
            return transaction;
        } catch (error) {
            console.error('Error borrowing tokens:', error);
            throw new Error('Failed to borrow tokens');
        }
    }

    // Stake tokens in the DeFi protocol
    async stakeTokens(userAddress, tokenAddress, amount) {
        try {
            const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
            const transaction = await this.contract.methods.stake(tokenAddress, amountInWei).send({ from: userAddress });
            return transaction;
        } catch (error) {
            console.error('Error staking tokens:', error);
            throw new Error('Failed to stake tokens');
        }
    }

    // Unstake tokens from the DeFi protocol
    async unstakeTokens(userAddress, tokenAddress, amount) {
        try {
            const amountInWei = web3.utils.toWei(amount.toString(), 'ether');
            const transaction = await this.contract.methods.unstake(tokenAddress, amountInWei).send({ from: userAddress });
            return transaction;
        } catch (error) {
            console.error('Error unstaking tokens:', error);
            throw new Error('Failed to unstake tokens');
        }
    }

    // Fetch current price of a token using an oracle
    async getCurrentPrice(tokenAddress) {
        try {
            const price = await getTokenPrice(tokenAddress); // Fetch price from an oracle
            return price;
        } catch (error) {
            console.error('Error fetching token price:', error);
            throw new Error('Failed to fetch token price');
        }
    }

    // Listen for deposit events
    listenForDepositEvents(callback) {
        this.contract.events.Deposit({
            filter: { user: this.contract.options.address }, // Filter for user deposits
            fromBlock: 'latest'
        })
        .on('data', (event) => {
            console.log('New Deposit Event:', event);
            callback(event);
        })
        .on('error', (error) => {
            console.error('Error listening for deposit events:', error);
        });
    }

    // Listen for withdrawal events
    listenForWithdrawalEvents(callback) {
        this.contract.events.Withdrawal({
            filter: { user: this.contract.options.address }, // Filter for user withdrawals
            fromBlock: 'latest'
        })
        .on('data', (event) => {
            console.log('New Withdrawal Event:', event);
            callback(event);
        })
        .on('error', (error) => {
            console.error('Error listening for withdrawal events:', error);
        });
    }

    // Fetch user portfolio details
    async getUser Portfolio(userAddress) {
        try {
            const balances = await this.contract.methods.getUser Balances(userAddress).call();
            const portfolio = {};

            for (const token of balances) {
                const tokenAddress = token.tokenAddress;
                const balance = await this.getUser Balance(userAddress, tokenAddress);
                const price = await this.getCurrentPrice(tokenAddress);
                portfolio[tokenAddress] = {
                    balance,
                    price,
                    value: balance * price // Calculate total value
                };
            }

            return portfolio;
        } catch (error) {
            console.error('Error fetching user portfolio:', error);
            throw new Error('Failed to fetch user portfolio');
        }
    }

    // Fetch total value locked (TVL) in the protocol
    async getTotalValueLocked() {
        try {
            const totalValue = await this.contract.methods.getTotalValueLocked().call();
            return web3.utils.fromWei(totalValue, 'ether'); // Convert from Wei to Ether
        } catch (error) {
            console.error('Error fetching total value locked:', error);
            throw new Error('Failed to fetch total value locked');
        }
    }

    // Fetch interest rates for lending/borrowing
    async getInterestRates() {
        try {
            const rates = await this.contract.methods.getInterestRates().call();
            return {
                lendingRate: web3.utils.fromWei(rates.lendingRate, 'ether'),
                borrowingRate: web3.utils.fromWei(rates.borrowingRate, 'ether')
            };
        } catch (error) {
            console.error('Error fetching interest rates:', error);
            throw new Error('Failed to fetch interest rates');
        }
    }
}

export default new DeFiService();
