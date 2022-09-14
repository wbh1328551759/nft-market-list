import React from 'react';
import {shortAddress} from '../utils/shortAddress'
import IconCopy from '../assets/copy.svg'
import {CopyToClipboard} from 'react-copy-to-clipboard';

interface Props {
  title: string
  nftImg: string
  tokenId: string
  contractAddress: string
  description: string
}

const NftCard: React.FC<Props> = ({ title, nftImg, tokenId, contractAddress, description }: Props) => {
  return (
    <div className="w-1/4 flex flex-col">
      <div className="rounded-md">
        <img className="object-cover h-128 w-full rounded-t-md" src={nftImg} alt=""/>
      </div>
      <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-md h-110">
        <div>
          <h2 className="text-xl text-gray-800">{title}</h2>
          <p className="text-gray-600">{tokenId}</p>
          <div className="flex items-center">
            <p className="text-gray-600 mr-2">{shortAddress(contractAddress)}</p>
            <CopyToClipboard text={contractAddress}>
              <img className="cursor-pointer" width={20} height={20} src={IconCopy.src} alt=""/>
            </CopyToClipboard>
            </div>
        </div>
        <div className="flex-grow mt-2">
          <p className="text-gray-600">{`${description?.slice(0, 150)}...` || ''}</p>
        </div>
        <div className="flex justify-center mb-1">
          <a className="py-2 px-4 bg-blue-500 w-1/2 text-center rounded-m text-white cursor-pointer" href={`https://etherscan.io/Token/${contractAddress}`} target="_blank">View on etherscan</a>
        </div>
      </div>
    </div>
  )
}

export default NftCard;