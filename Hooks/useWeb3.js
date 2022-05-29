import { useEffect, useState, useMemo } from 'react'

import detectEthereumProvider from '@metamask/detect-provider';
import { loadContract } from '../utils/loadContrat';
import { ethers } from 'ethers'
import { useWalletInfo } from './useWalletInfo';

const createweb3State = ({ web3, provider, contract, isLoading }) => {
    return {
        web3,
        provider,
        contract,
        isLoading,
    }
}
const NETWORKS = {
    80001: "Mumbai Test Network - 80001",
}

export function useWeb3() {
    const [web3Api, setweb3Api] = useState(createweb3State({
        provider: null,
        web3: null,
        contract: null,
        isLoading: true
    }));

    useEffect(() => {
        const loadProvider = async () => {
            const provider = await detectEthereumProvider()
            if (provider) {
                const web3 = new ethers.providers.Web3Provider(provider)
                let contract = []
                let chainId = await web3.getNetwork().chainId

                if (web3.listAccounts() && NETWORKS[chainId]) {
                    const signer = await web3.getSigner()
                    contract = loadContract(signer, ethers)
                }

                setweb3Api(createweb3State({
                    web3,
                    provider,
                    contract,
                    isLoading: false
                }))

            } else {
                setweb3Api((api) => ({ ...api, isLoading: false }))
                // if the provider is not detected, detectweb3Provider resolves to null
                console.log('Please install MetaMask!');
            }
        }
        loadProvider().catch(console.error)
    }, [])

    const _web3Api = useMemo(() => {
        const { web3, provider, isLoading } = web3Api
        return {
            ...web3Api,
            requireInstall: !isLoading && !web3,
            connect: provider ?
                async () => {
                    try {
                        await provider.request({ method: "eth_requestAccounts" })
                    } catch {
                        //location.reload()
                        console.log("nope")

                    }
                } :
                () => console.error("Cannot connect to Metamask, try to reload your browser please.")
        }
    }, [web3Api])

    return _web3Api
}