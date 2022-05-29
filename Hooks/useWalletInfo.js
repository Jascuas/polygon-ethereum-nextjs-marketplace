import { useState, useEffect } from 'react'

export function useWalletInfo(web3, provider) {
    const [account, setAccount] = useState(null)
    // const [chainId, setChainId] = useState(null)
    if(!web3){
        return {account}
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
    // async () => {
    //     setChainId(await web3.getNetwork().chainId);
    // }
    web3.listAccounts().then(handleAccountsChanged)
    setListeners(provider)
    
    return {account}
}

