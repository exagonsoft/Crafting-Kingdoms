import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import { buildingsIds, STAKING_CONTRACT_ADDRESS } from "../constants/contracts";
import styles from "../styles/Home.module.css";
import { BigNumber } from "ethers";
import WorkShopCard from "./WorkShopCard";
import LoadingAnimation from "./LoadingAnimator";

const WorkShops = ({ onEarningsClaimed, setBusy, onPropertyChange }) => {
  const address = useAddress();
  const { contract: stakingContract } = useContract(STAKING_CONTRACT_ADDRESS);
  const [economyBuildings, setEconomyBuildings] = useState([
    {
      buildingID: Number(),
      quantity: Number(),
    },
  ]);
  const { data: stakedTokens, isLoading: loadingWorkShops } = useContractRead(
    stakingContract,
    "getStakeInfo",
    [address]
  );

  const updateBuildingsCount = (tokenId: number, quantity: number) => {
    let _economyBuildings = economyBuildings;
    _economyBuildings.map((building) => {
      if (building.buildingID === tokenId) {
        building.quantity = quantity;
      }
    });
    let _buildings = 0;
    let _hasTavern = false;
    _economyBuildings.map((building) => {
      _buildings += building.quantity;
      if(building.buildingID === buildingsIds.Tavern){
        _hasTavern = true;
      }
    });
    onPropertyChange("economyBuildings", _buildings);
  };

  useEffect(() => {
    if (stakedTokens && stakedTokens[0].length > 0) {
      let _economyBuildings = economyBuildings;
      stakedTokens[0].map((stakedToken: BigNumber) => {
        let _exist = _economyBuildings.filter((object) => object.buildingID === stakedToken.toNumber())
        if(_exist.length === 0){
          _economyBuildings.push({
            buildingID: stakedToken.toNumber(),
            quantity: 0,
          });
        }
      });
      setEconomyBuildings(_economyBuildings);
    }
  }, []);

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
                    onPropertyChange={updateBuildingsCount}
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
                stakedTokens[0].map((stakedToken: BigNumber) => <></>)
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
                stakedTokens[0].map((stakedToken: BigNumber) => <></>)
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
                stakedTokens[0].map((stakedToken: BigNumber) => <></>)
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
