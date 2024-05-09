import {
  ConnectWallet,
  useAddress,
  useContract,
  useShowConnectEmbed,
  useTokenBalance,
  useUser,
} from "@thirdweb-dev/react";
import React, { useEffect } from "react";
import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import {
  TOKEN_CONTRACT_ADDRESS,
} from "../constants/contracts";
import { useRouter } from "next/router";
import { FaBuilding, FaCity, FaMap } from "react-icons/fa6";
import { MdHome, MdVilla } from "react-icons/md";
import { FaBalanceScale } from "react-icons/fa";

const NavBar = () => {
  const address = useAddress();
  const showConnectEmbed = useShowConnectEmbed();
  const { contract: tokenContract } = useContract(TOKEN_CONTRACT_ADDRESS);
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();

  const _displayBalance = (num: string) => {
    return num.slice(0, 4);
  };

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  useEffect(() => {
    if(isLoggedIn && showConnectEmbed){
      console.log({isLoggedIn, isLoading, showConnectEmbed});
      router.push("/login");
    }
  }, [showConnectEmbed, isLoggedIn]);

  return (
    <div className={styles.full_with}>
      {isLoggedIn && (
        <div className={styles.navbarContainer}>
          <Link href="/">
            <div className={styles.navbar_header}>
              <img src="/images/logo.png" alt="" />
              <div className={styles.logo}>
                <span>CRAFTING</span>
                <span>KINGDOMS</span>
              </div>
            </div>
          </Link>
          <div className={styles.navbarOptions}>
          <Link href="/world_map">
              <span className={styles.navbar_links}><FaMap/>World Map</span>
            </Link>
            <Link href="/realm_workshops">
              <span className={styles.navbar_links}><MdHome/> Buildings</span>
            </Link>
            <Link href="/realm_marketplace">
              <span className={styles.navbar_links}><FaBalanceScale/> Marketplace</span>
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
            <ConnectWallet className="web3_component"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
