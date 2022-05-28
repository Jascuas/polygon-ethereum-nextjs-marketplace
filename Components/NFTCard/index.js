

export default function NFTCard({nft}) {
    console.log(nft)
    return (
        <div key={nft.image} className="border shadow rounded-xl overflow-hidden">
            <img src={nft.image} className="rounded" />
            <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">Price - {nft.price} Matic</p>
            </div>
        </div>
    )
}



