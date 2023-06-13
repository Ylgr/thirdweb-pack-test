import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "mumbai");

  const pack = await sdk.getContract(
    "0x0f1F528c33E3F40260ec044a3F31450E007e1104",
    'pack',
  );

  const packNfts = await pack.getAll();

  console.log(packNfts);
})();
