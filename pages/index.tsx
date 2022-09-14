import type { NextPage } from 'next'
import React, {useState} from 'react'
import axios, {AxiosResponse} from 'axios'
import NftCard from '../components/NFTCard'

const apiKey = 'O_kE5j97DCUCE6bb8SwhYzNrdNteeOaW'
const baseUrl = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}`

const Home: NextPage = () => {
  const [walletAddress, setWalletAddress] = useState('')
  const [collectionAddress, setCollectionAddress] = useState('')
  const [NFTs, setNFTs] = useState<any[]>([])
  const [isFetchForCollection, setIsFetchForCollection] = useState(false)
  const [total, setTotal] = useState(0)

  const fetchNFTS = async () => {
    console.log('fetching nfts')
    let res: AxiosResponse
    try {
      if (collectionAddress) {
        res = await axios.get(`${baseUrl}/getNFTs?owner=${walletAddress}&contractAddresses%5B%5D=${collectionAddress}`)
      } else {
        res = await axios.get(`${baseUrl}/getNFTs?owner=${walletAddress}`)
      }
      const nfts = res.data
      console.log('nfts', nfts)
      setNFTs(nfts.ownedNfts)
      setTotal(nfts.totalCount)
    } catch (e) {
      console.log('error: ', e)
    }
  }

  const fetchNFTsForCollections = async () => {
    if (collectionAddress) {
      const { data } = await axios.get(`${baseUrl}/getNFTsForCollection?contractAddress=${collectionAddress}&withMetadata=${"true"}`)
      setNFTs(data.nfts)
      setTotal(data.nfts.length)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input
          disabled={isFetchForCollection}
          className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-500 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          value={walletAddress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWalletAddress(e.target.value)
          }
          type="text"
          placeholder={"Add your wallet address"}
        />
        <input
          className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-500 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
          value={collectionAddress}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCollectionAddress(e.target.value)
          }
          type="text"
          placeholder={"Add the collection address"}
        />
        <label className="text-gray-600">
          <input className="mr-2" onChange={e => setIsFetchForCollection(e.target.checked)} type="checkbox"/>Fetch for collection
        </label>
        <button
          className="disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"
          onClick={isFetchForCollection ? fetchNFTsForCollections: fetchNFTS}
        >
          Let's go
        </button>
      </div>
      <div>Total: {total}</div>
      <div className="flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center">
        {
          NFTs.map(nft => <NftCard
            key={nft.id.tokenId}
            title={nft.title}
            nftImg={nft.media[0].gateway}
            tokenId={nft.id.tokenId.slice(-4)}
            contractAddress={nft.contract.address}
            description={nft.description}
          />)
        }
      </div>
    </div>
  )
}

export default Home
