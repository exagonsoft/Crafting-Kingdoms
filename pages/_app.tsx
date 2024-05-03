import type { AppProps } from "next/app";
import {
  embeddedWallet,
  smartWallet,
  ThirdwebProvider,
} from "@thirdweb-dev/react";
import "../styles/globals.css";
import { Sepolia } from "@thirdweb-dev/chains";
import { getEnvironment } from "../config/configs";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";

function MyApp({ Component, pageProps }: AppProps) {
  // const ethers = require("ethers");
  // console.log(ethers.Wallet.createRandom().privateKey);

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
      <div className={styles.main_layout}>
        <NavBar />
        <Component {...pageProps} />
      </div>
    </ThirdwebProvider>
  );
}

export default MyApp;
