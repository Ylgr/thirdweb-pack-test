import type { AppProps } from "next/app";
import {ChainId, ConnectWallet, metamaskWallet, ThirdwebProvider} from "@thirdweb-dev/react";
import "../styles/globals.css";
import ThirdwebGuideFooter from "../components/ThirdwebGuideFooter";
import React from "react";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={activeChainId} supportedWallets={[metamaskWallet()]}>
        <ConnectWallet />
      <Component {...pageProps} />
      <ThirdwebGuideFooter />
    </ThirdwebProvider>
  );
}

export default MyApp;
