import type { AppProps } from "next/app";
import {
  embeddedWallet,
  smartWallet,
  ThirdwebProvider,
} from "@thirdweb-dev/react";
import Head from "next/head";
import "../styles/globals.css";
import { Sepolia } from "@thirdweb-dev/chains";
import { getEnvironment } from "../config/configs";
import styles from "../styles/Home.module.css";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={Sepolia}
      supportedWallets={[
        smartWallet(embeddedWallet(), {
          factoryAddress: getEnvironment().FACTORY_ADDRESS,
          gasless: true,
        }),
      ]}
      authConfig={{
        domain: getEnvironment().DOMAIN,
        authUrl: "/api/auth",
      }}
    >
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles.main_layout}>
        <Component {...pageProps} />
      </div>
    </ThirdwebProvider>
  );
}

export default MyApp;
