import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import React from "react";
import { STAKING_CONTRACT_ADDRESS } from "../constants/contracts";
import styles from "../styles/Home.module.css";
import { BigNumber } from "ethers";
import WorkShopCard from "./WorkShopCard";
import LoadingAnimation from "./LoadingAnimator";

const WorkShops = ({ onEarningsClaimed, setBusy }) => {
  const address = useAddress();
  const { contract: stakingContract } = useContract(STAKING_CONTRACT_ADDRESS);
  const { data: stakedTokens, isLoading: loadingWorkShops } = useContractRead(
    stakingContract,
    "getStakeInfo",
    [address]
  );
  return (
    <div className={styles.business_section}>
      <div className={styles.businessContainer}>
        {!loadingWorkShops ? (
          <>
            <h3
              className=""
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              WorkShops
            </h3>
            <div className={styles.grid}>
              {stakedTokens && stakedTokens[0].length > 0 ? (
                stakedTokens[0].map((stakedToken: BigNumber) => (
                  <WorkShopCard
                    key={stakedToken.toString()}
                    tokenId={stakedToken.toNumber()}
                    claimEarnings={onEarningsClaimed}
                    onBusy={setBusy}
                  />
                ))
              ) : (
                <p>No workshops owned...</p>
              )}
            </div>
          </>
        ) : (
          <LoadingAnimation />
        )}
      </div>
      <div className={styles.businessContainer}>
        {!loadingWorkShops ? (
          <>
            <h3
              className=""
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Military Outposts
            </h3>
            <div className={styles.grid}>
              {stakedTokens && stakedTokens[0].length > 0 ? (
                stakedTokens[0].map((stakedToken: BigNumber) => (
                  <WorkShopCard
                    key={stakedToken.toString()}
                    tokenId={stakedToken.toNumber()}
                    claimEarnings={onEarningsClaimed}
                    onBusy={setBusy}
                  />
                ))
              ) : (
                <p>No outposts owned...</p>
              )}
            </div>
          </>
        ) : (
          <LoadingAnimation />
        )}
      </div>
      <div className={styles.businessContainer}>
        {!loadingWorkShops ? (
          <>
            <h3
              className=""
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Heroes
            </h3>
            <div className={styles.grid}>
              {stakedTokens && stakedTokens[0].length > 0 ? (
                stakedTokens[0].map((stakedToken: BigNumber) => (
                  <WorkShopCard
                    key={stakedToken.toString()}
                    tokenId={stakedToken.toNumber()}
                    claimEarnings={onEarningsClaimed}
                    onBusy={setBusy}
                  />
                ))
              ) : (
                <p>No heroes owned...</p>
              )}
            </div>
          </>
        ) : (
          <LoadingAnimation />
        )}
      </div>
      <div className={styles.businessContainer}>
        {!loadingWorkShops ? (
          <>
            <h3
              className=""
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Items
            </h3>
            <div className={styles.grid}>
              {stakedTokens && stakedTokens[0].length > 0 ? (
                stakedTokens[0].map((stakedToken: BigNumber) => (
                  <WorkShopCard
                    key={stakedToken.toString()}
                    tokenId={stakedToken.toNumber()}
                    claimEarnings={onEarningsClaimed}
                    onBusy={setBusy}
                  />
                ))
              ) : (
                <p>No heroes owned...</p>
              )}
            </div>
          </>
        ) : (
          <LoadingAnimation />
        )}
      </div>
    </div>
  );
};

export default WorkShops;
