import Web3 from 'web3';
import axios from 'axios';
import NodeCache from 'node-cache'; // For caching
import { NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS } from './config'; // Import your contract ABI and address

const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545'); // Connect to Ethereum

class NFTService {
    constructor() {
        this.contract = new web3.eth.Contract(NFT_CONTRACT_ABI, NFT_CONTRACT_ADDRESS);
    }

    // Fetch NFT data by token ID
    async fetchNFTData(tokenId) {
        const cacheKey = `nft_${tokenId}`;
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            return cachedData; // Return cached data if available
        }

        try {
            const nftData = await this.contract.methods.getNFTData(tokenId).call();
            cache.set(cacheKey, nftData); // Cache the fetched data
            return nftData;
        } catch (error) {
            console.error('Error fetching NFT data:', error);
            throw new Error('Failed to fetch NFT data');
        }
    }

    // Fetch all NFTs owned by a user
    async fetchUser NFTs(userAddress) {
        try {
            const nftCount = await this.contract.methods.balanceOf(userAddress).call();
            const nfts = [];

            for (let i = 0; i < nftCount; i++) {
                const tokenId = await this.contract.methods.tokenOfOwnerByIndex(userAddress, i).call();
                const nftData = await this.fetchNFTData(tokenId);
                nfts.push(nftData);
            }

            return nfts;
        } catch (error) {
            console.error('Error fetching user NFTs:', error);
            throw new Error('Failed to fetch user NFTs');
        }
    }

    // Mint a new NFT
    async mintNFT(userAddress, metadata) {
        try {
            const transaction = await this.contract.methods.mint(userAddress, metadata).send({ from: userAddress });
            return transaction;
        } catch (error) {
            console.error('Error minting NFT:', error);
            throw new Error('Failed to mint NFT');
        }
    }

    // Listen for NFT minting events
    listenForMintEvents(callback) {
        this.contract.events.Transfer({
            filter: { to: this.contract.options.address }, // Filter for minting events
            fromBlock: 'latest'
        })
        .on('data', (event) => {
            console.log('New NFT Minted:', event);
            callback(event);
        })
        .on('error', (error) => {
            console.error('Error listening for mint events:', error);
        });
    }
}

export default new NFTService();
