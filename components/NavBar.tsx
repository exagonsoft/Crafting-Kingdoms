import {
  ConnectWallet,
  useAddress,
  useContract,
  useTokenBalance,
} from "@thirdweb-dev/react";
import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  ACCOUNT_FACTORY_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
} from "../constants/contracts";

const NavBar = () => {
  const address = useAddress();
  const { contract: tokenContract } = useContract(TOKEN_CONTRACT_ADDRESS);
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  console.log(tokenBalance);
  

  const _displayBalance = (num: string) => {
    return num.slice(0, 6);
  };

  return (
    <div className={styles.full_with}>
      {address && (
        <div className={styles.navbarContainer}>
          <Link href="/">
            <div className={styles.headers}>
              <img src="/images/logo.png" alt="" />
              <div className={styles.logo}>
                <span>CRAFTING</span>
                <span>KINGDOMS</span>
              </div>
            </div>
          </Link>
          <div className={styles.navbarOptions}>
            <Link href="/realm_workshops">
              <h3>Realm WorkShops</h3>
            </Link>
            <Link href="/realm_marketplace">
              <h3>Marketplace</h3>
            </Link>
          </div>
          <div className={styles.navbarOptions}>
            {tokenBalance && (
              <p className="">
                {_displayBalance(tokenBalance.displayValue as string)}
                <div className="">
                  <img src="/images/coin.png" alt="" />
                  {tokenBalance.symbol}
                </div>
              </p>
            )}
            <ConnectWallet />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
