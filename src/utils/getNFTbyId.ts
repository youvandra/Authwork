import axios from "axios";
import { NFT, NFTMetadata } from "../components/nft/NFTExploreCard";
import ABI from "./ABI.json";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../const";

export async function getNFTbyId(tokenId) {
  //After adding your Hardhat network to your metamask, this code will get providers and signers
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  //Pull the deployed contract instance
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  //create an NFT Token
  const listedToken = await contract.getListedTokenForId(tokenId);
  const tokenURI = await contract.tokenURI(tokenId);
  let meta = await axios.get(tokenURI);
  meta = meta.data;

  const item: NFT = {
    price: listedToken.price,
    tokenId: tokenId,
    seller: listedToken.seller,
    owner: listedToken.owner,
    // @ts-ignore
    metadata: meta,
  };
  return item;
}
