import axios from "axios";
import { NFT } from "../components/nft/NFTExploreCard";
import ABI from "./ABI.json";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../const";

export async function getMyNFTs() {
  //After adding your Hardhat network to your metamask, this code will get providers and signers
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  //Pull the deployed contract instance
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  //create an NFT Token
  const transaction = await contract.getMyNFTs();

  //Fetch all the details of every NFT from the contract and display
  const items = Promise.all<NFT>(
    transaction.map(async (i) => {
      const tokenURI = await contract.tokenURI(i.tokenId);
      let meta = await axios.get(tokenURI);
      meta = meta.data;

      const price = ethers.utils.formatUnits(i.price.toString(), "ether");
      const item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        metadata: meta,
      };

      return item;
    })
  );
  return items;
}
