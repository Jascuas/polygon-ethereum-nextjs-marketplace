import {
    marketplaceAddress
} from '../config'

import NFTMarketplace from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

export const loadContract = (signer, ethers) => {
    let contract = null
    try {
      contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    } catch {
        console.log("Contract cannot be loaded")
    }
    return contract
}