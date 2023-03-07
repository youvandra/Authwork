import axios from "axios";
import { NFT } from "../components/nft/NFTExploreCard";
import ABI from "./ABI.json";
import { ethers } from "ethers";
import { getNFTbyId } from "./getNFTbyId";

export async function getAllNFTsById(ids: { id: number }[]) {
  //Fetch all the details of every NFT from the contract and display
  const items = Promise.all<NFT>(
    ids.map(async ({ id }) => {
      const item = await getNFTbyId(id);
      item.price = ethers.utils.formatUnits(item.price.toString(), "ether");
      return item;
    })
  );
  return items;
}
