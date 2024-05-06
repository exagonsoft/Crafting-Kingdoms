import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import React from "react";
import { STAKING_CONTRACT_ADDRESS } from "../constants/contracts";
import styles from "../styles/Home.module.css";
import { BigNumber } from "ethers";
import WorkShopCard from "./WorkShopCard";
import LoadingAnimation from "./LoadingAnimator";

const WorkShops = () => {
  const address = useAddress();
  const { contract: stakingContract } = useContract(STAKING_CONTRACT_ADDRESS);
  const { data: stakedTokens, isLoading: loadingWorkShops } = useContractRead(
    stakingContract,
    "getStakeInfo",
    [address]
  );
  return (
    <div className={styles.businessContainer}>
      {!loadingWorkShops ? (
        <>
          <h3 className="">WorkShops</h3>
          <div className={styles.grid}>
            {stakedTokens && stakedTokens[0].length > 0 ? (
              stakedTokens[0].map((stakedToken: BigNumber) => (
                <WorkShopCard
                  key={stakedToken.toString()}
                  tokenId={stakedToken.toNumber()}
                />
              ))
            ) : (
              <p>No WorkShops Owned.</p>
            )}
          </div>
        </>
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
};

export default WorkShops;
