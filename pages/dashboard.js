import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import detectEthereumProvider from '@metamask/detect-provider';
import NFTCard from '../Components/NFTCard'
import { loadContract } from '../utils/loadContrat';

import { useWeb3 } from '../Hooks/useWeb3';


const createEthereumState = ({ ethereum, provider, contract, isLoading }) => {
  return {
    ethereum,
    provider,
    contract,
    isLoading,
  }
}
const NETWORKS = {
  80001: "Mumbai Test Network - 80001",
}


export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([])
  const [account, setAccount] = useState()
  const [chainId, setChainId] = useState()
  const [ethereumApi, setEthereumApi] = useState(createEthereumState({
    provider: null,
    ethereum: null,
    contract: null,
    isLoading: true
  }));

  useEffect(() => {
    loadProvider().catch(console.error)
  }, [account])

  const loadProvider = async () => {
    const provider = await detectEthereumProvider()

    if (provider) {
      const ethereum = new ethers.providers.Web3Provider(provider)
      const network = await ethereum.getNetwork();
      setChainId(network.chainId)
      ethereum.listAccounts().then(handleAccountsChanged)
      let contract = []

      if (account && NETWORKS[network.chainId]) {
        const signer = await ethereum.getSigner()
        contract = loadContract(signer, ethers)
        loadNFTs(contract)
      }

      setEthereumApi(createEthereumState({
        ethereum,
        provider,
        contract,
        isLoading: false
      }))

      setListeners(provider)
    } else {
      setEthereumApi((api) => ({ ...api, isLoading: false }))
      // if the provider is not detected, detectEthereumProvider resolves to null
      console.log('Please install MetaMask!');
    }

  }

  const setListeners = provider => {
    provider.on("chainChanged", _ => window.location.reload())
    provider.on('accountsChanged', handleAccountsChanged)

  }

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      setAccount()
    } else if (accounts[0] !== account) {
      setAccount(accounts[0])
    }
  }
  async function loadNFTs(contract) {
    const data = await contract.fetchItemsListed()
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
      }
      return item
    }))
    setNfts(items)
    setEthereumApi((api) => ({ ...api, isLoading: false }))
  }

  if (!ethereumApi.isLoading && !ethereumApi.ethereum) return (<h1 className="py-10 px-20 text-3xl">INSTALL METAMASK</h1>)
  if (!ethereumApi.isLoading && !account) return (
    <div className="flex justify-center">
      <h1 className="mt-4  px-20 text-3xl">You are not connected yet!</h1>
    </div>)
  if (!ethereumApi.isLoading && !NETWORKS[chainId]) return (
    <div className="flex justify-center">
      <h1 className="mt-4  px-20 text-3xl">You need to connect to {NETWORKS[80001]}</h1>
    </div>)
  else {
    return (
      <div>
        <div className="p-4">
          <h2 className="text-2xl py-2">Items Listed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {
              nfts.map((nft) => (
                <NFTCard nft={nft} />
              ))
            }
          </div>
        </div>
      </div>
    )
  }

}