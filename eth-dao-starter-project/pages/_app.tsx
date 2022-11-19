import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import HeadComponent from '../components/head';
import Head from "next/head";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <HeadComponent/>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;