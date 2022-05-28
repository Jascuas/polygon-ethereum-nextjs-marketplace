import ActiveLink from '../activeLink'
import Button from '../button'

export default function NavBar() {
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
                    <Button size='md' variant='pink'>
                        Connect
                    </Button>
                </div>
            </div>

        </nav>
    )
}
