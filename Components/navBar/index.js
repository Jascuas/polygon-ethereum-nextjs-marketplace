import ActiveLink from '../activeLink'
import Button from '../button'
import { useWeb3 } from '../../Hooks/useWeb3';
import { useWalletInfo } from '../../Hooks/useWalletInfo';

export default function NavBar() {
    const { connect, isLoading, requireInstall, web3, provider } = useWeb3();
    const {account} = useWalletInfo(web3, provider)
    console.log(account)
    return (
        <nav className="border-b p-6">

            <div className="flex mt-4 align-middle">
                <p className="text-2xl font-bold mr-10 leading-normal">Metaverse Marketplace</p>
                <div className='grow self-center'>
                    <ActiveLink href="/">
                        <a className="mr-4 text-pink-500 hover:text-pink-900">
                            Home
                        </a>
                    </ActiveLink >
                    <ActiveLink href="/create-nft">
                        <a className="mr-6 text-pink-500 hover:text-pink-900">
                            Sell NFT
                        </a>
                    </ActiveLink >
                    <ActiveLink href="/my-nfts">
                        <a className="mr-6 text-pink-500 hover:text-pink-900">
                            My NFTs
                        </a>
                    </ActiveLink >
                    <ActiveLink href="/dashboard">
                        <a className="mr-6 text-pink-500 hover:text-pink-900">
                            Dashboard
                        </a>
                    </ActiveLink >
                </div>
                <div className=" flex-none">
                    {isLoading ?
                        <Button
                            disabled={true}
                            onClick={connect}>
                            Loading...
                        </Button> : account ?
                            <Button className="pointer-events-none" >
                                Hello {account} 
                            </Button> : requireInstall ?
                                <Button
                                    onClick={() => window.open("https://metamask.io/", "_blank")}>
                                    Install Metamask
                                </Button> :
                                <Button
                                    onClick={connect}>
                                    Connect
                                </Button>
                    }
                </div>
            </div>

        </nav>
    )
}
