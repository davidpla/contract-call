const { ethers } = require('ethers');
const BAYC_ABI = require('./bayc-abi.json');
const logger = require('../../utils/logger');

// Use this this NFT as an example: https://opensea.io/item/ethereum/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/6145
const ETH_BAYC_CONTRACT_ADDRESS = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
const NFT_6145 = 6145;

let provider = null;
let contract = null;

function initializeContractService(rpcUrl) {
    if (!rpcUrl) {
        throw new Error("Ethereum RPC URL is required to initialize contract service.");
    }
    provider = new ethers.JsonRpcProvider(rpcUrl,);
    contract = new ethers.Contract(ETH_BAYC_CONTRACT_ADDRESS, BAYC_ABI, provider);
    console.log("Contract Service Initialized with provider:", rpcUrl.slice(0, 25) + '...'); // do not expose API key
}

async function getBAYCContractData() {
    if (!contract) {
        throw new Error("Contract service not initialized. Call initializeContractService first.");
    }

    try {
        const [
            name,
            symbol,           
            maxApes,
            ownerOf6145
        ] = await Promise.all([
            contract.name(),
            contract.symbol(),
            contract.MAX_APES(),
            contract.ownerOf(NFT_6145)
        ]);

        return {
            contractName: name,
            contractSymbol: symbol,
            contractAddress: ETH_BAYC_CONTRACT_ADDRESS,
            MAX_APES: maxApes.toString(),
            ownerOf6145: ownerOf6145 ? ownerOf6145.toLowerCase() : null
        };
    } catch (error) {        
        logger.error('Error in getBAYCContractData:', error);
        throw new Error(`Failed to fetch BAYCApiTest contract data: ${error.message}`);
    }
}

module.exports = {
    initializeContractService,
    getBAYCContractData
};