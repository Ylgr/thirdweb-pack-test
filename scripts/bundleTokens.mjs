import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { ThirdwebStorage } from "@thirdweb-dev/storage";

(async () => {
  const packAddress = "0x0f1F528c33E3F40260ec044a3F31450E007e1104";
  const tokenAddress = "0x0fC04873a7B51FB4a16EE54Fb3447DbF3C944A3d";
  const editionAddress = "0xdF7A07e9dF1642af296f6B7507F1039A13C9016B";

  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "goerli");

  const pack = await sdk.getContract(packAddress, 'pack');

  // Set approval for the pack contract to act upon token and edition contracts
  const token = await sdk.getContract(tokenAddress, 'token');
  await token.setAllowance(packAddress, 100);
  // await token.call("increaseAllowance",[packAddress, 100]);

  console.log("Set approval for token");

  const edition = await sdk.getContract(editionAddress, 'edition');
  await edition.setApprovalForAll(packAddress, true);
  // await edition.call("setApprovalForAll", [packAddress, true]);

  console.log("Set Approval for edition");

  // Read in the chest.png as a File using fs
  const chestFile = fs.readFileSync("./scripts/chest.png");

  // Upload the Chest to IPFS
  const storage = new ThirdwebStorage();
  const uri = await storage.upload(chestFile);

  console.log("Uploaded chest asset to IPFS");

  console.log("Creating packs now...");

  const packNfts = await pack.create({
    packMetadata: {
      name: "Treasure Chest",
      description:
        "A chest containing tools and treasure to help you on your voyages.",
      image: uri,
    },

    // Gold coin ERC-20 Tokens
    erc20Rewards: [
      {
        contractAddress: tokenAddress,
        quantityPerReward: 5,
        quantity: 100,
        totalRewards: 20,
      },
    ],

    erc1155Rewards: [
      // Compass
      {
        contractAddress: editionAddress,
        tokenId: 0,
        quantityPerReward: 1,
        totalRewards: 100,
      },
      // Anchor
      {
        contractAddress: editionAddress,
        tokenId: 1,
        quantityPerReward: 1,
        totalRewards: 100,
      },
      // Sword
      {
        contractAddress: editionAddress,
        tokenId: 2,
        quantityPerReward: 1,
        totalRewards: 100,
      },
      // Captain's Hat
      {
        contractAddress: editionAddress,
        tokenId: 3,
        quantityPerReward: 1,
        totalRewards: 65,
      },
      // Cannon
      {
        contractAddress: editionAddress,
        tokenId: 4,
        quantityPerReward: 1,
        totalRewards: 50,
      },
      // Hook
      {
        contractAddress: editionAddress,
        tokenId: 5,
        quantityPerReward: 1,
        totalRewards: 50,
      },
      // Rum
      {
        contractAddress: editionAddress,
        tokenId: 6,
        quantityPerReward: 1,
        totalRewards: 10,
      },
      // Gold Key
      {
        contractAddress: editionAddress,
        tokenId: 7,
        quantityPerReward: 1,
        totalRewards: 5,
      },
    ],
    rewardsPerPack: 5,
  });

  console.log(`====== Success: Pack NFTs =====`);

  console.log(packNfts);
})();
