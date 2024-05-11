import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  useShowConnectEmbed,
  useTokenBalance,
  useUser,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import styles from "../styles/NavBar.module.css";
import Link from "next/link";
import { buildingsIds, STAKING_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS } from "../constants/contracts";
import { useRouter } from "next/router";
import { FaBuilding, FaCity, FaMap } from "react-icons/fa6";
import { MdHome, MdMoney, MdShield, MdVilla } from "react-icons/md";
import { FaBalanceScale } from "react-icons/fa";
import { BigNumber } from "ethers";

const NavBar = () => {
  const address = useAddress();
  const showConnectEmbed = useShowConnectEmbed();
  const { contract: tokenContract } = useContract(TOKEN_CONTRACT_ADDRESS);
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);
  const { contract: stakingContract } = useContract(STAKING_CONTRACT_ADDRESS);
  const { data: stakedTokens, isLoading: loadingWorkShops } = useContractRead(
    stakingContract,
    "getStakeInfo",
    [address]
  );
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();
  const [showBuildingsMenu, setShowBuildingsMenu] = useState(false);
  const [hasTavern, setHasTavern] = useState(false);

  const _displayBalance = (num: string) => {
    return num.slice(0, 4);
  };

  const checkOwnedTavern = () => {
      if(stakedTokens && stakedTokens[0].length > 0){
        let _hasTavern = false;
        stakedTokens[0].map((token: BigNumber) => {
          if(token.toNumber() === buildingsIds.Tavern){
            _hasTavern = true;
          }
        })
        setHasTavern(_hasTavern);
      }
  }

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  useEffect(() => {
    if (isLoggedIn && showConnectEmbed) {
      router.push("/login");
    }
  }, [showConnectEmbed, isLoggedIn]);

  useEffect(() => {checkOwnedTavern()}, [stakedTokens]);

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
              <span className={styles.navbar_links}>
                <FaMap />
                World Map
              </span>
            </Link>
            <div
              id={"buildingsLink"}
              tabIndex={2}
              onMouseOver={(e) => {
                setShowBuildingsMenu(true);
              }}
            >
              <span className={styles.navbar_links}>
                <MdHome /> Buildings
              </span>
              {showBuildingsMenu && (
                <div
                  tabIndex={3}
                  className=""
                  onMouseEnter={(e) => e.currentTarget.focus()}
                  onMouseLeave={() => setShowBuildingsMenu(false)}
                >
                  <Link
                    href="/realm_workshops"
                    onClick={() => setShowBuildingsMenu(false)}
                  >
                    <span className={styles.navbar_links}>
                      <MdMoney /> Economic Buildings
                    </span>
                  </Link>
                  <Link href="/realm_military">
                    <span className={styles.navbar_links}>
                      <MdShield /> Military Buildings
                    </span>
                  </Link>
                </div>
              )}
            </div>
            {hasTavern && (
              <Link href="/realm_marketplace">
                <span className={styles.navbar_links}>
                  <FaBalanceScale /> Tavern
                </span>
              </Link>
            )}
            <Link href="/realm_marketplace">
              <span className={styles.navbar_links}>
                <FaBalanceScale /> Marketplace
              </span>
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
            <ConnectWallet className="web3_component" />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
