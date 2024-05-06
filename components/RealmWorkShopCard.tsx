import {
  MediaRenderer,
  useAddress,
  useClaimConditions,
  useContract,
} from "@thirdweb-dev/react";
import { NFT, toEther } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import {
  BUILDINGS_CONTRACT_ADDRESS,
  STAKING_CONTRACT_ADDRESS,
} from "../constants/contracts";
import styles from "../styles/Home.module.css";

type Props = {
  building: NFT;
};

const RealmWorkShopCard = ({ building }: Props) => {
  const address = useAddress();
  const { contract: buildingContract } = useContract(
    BUILDINGS_CONTRACT_ADDRESS,
    "edition-drop"
  );
  const { data: claimConditions } = useClaimConditions(
    buildingContract,
    building?.metadata.id
  );
  const { contract: stakingContract } = useContract(STAKING_CONTRACT_ADDRESS);
  const [claimState, setClaimState] = useState<"init" | "nftClaim" | "staking">(
    "init"
  );

  const calculateBuildingEarnings = (cost: number) => {
    return cost * 0.1;
  };

  const handleClaim = async () => {
    if (!address) return;
    setClaimState("nftClaim");
    try {
      await buildingContract?.erc1155.claim(building?.metadata.id, 1);
      setClaimState("staking");

      const isApproved = await buildingContract?.isApproved(
        address,
        STAKING_CONTRACT_ADDRESS
      );

      if (!isApproved) {
        await buildingContract?.setApprovalForAll(
          STAKING_CONTRACT_ADDRESS,
          true
        );
      }

      await stakingContract?.call("stake", [building?.metadata.id, 1]);
    } catch (error) {
      console.log(error);
    } finally {
      setClaimState("init");
    }
  };

  return (
    <div className={styles.nftCard}>
      <div className={styles.nft_card_ui}></div>
      <MediaRenderer
        src={building.metadata.image}
        className={styles.nft_card_images}
      />
      <div className={styles.building_texts}>
        <h4>{building.metadata.name}</h4>
        {claimConditions &&
          claimConditions.length > 0 &&
          claimConditions.map((condition, index) => (
            <div key={index} className={styles.building_texts_info_wrapper}>
              <div className={styles.building_texts_info_container}>
                <div className="">
                  <span>Cost: </span>
                </div>
                <div className="">
                  <span>
                    {toEther(condition.price)}{" "}
                    <img src="/images/coin.png" alt="" className={styles.coin_image}/>
                    {condition.currencyMetadata.symbol}
                  </span>
                </div>
              </div>
              <div className={styles.building_texts_info_container}>
                <div className="">
                  <span>Earns /hour:</span>
                </div>
                <div className="">
                  <span>
                    {calculateBuildingEarnings(
                      parseInt(toEther(condition.price))
                    )}{" "}
                    <img src="/images/coin.png" alt="" className={styles.coin_image}/>
                    {condition.currencyMetadata.symbol}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <button
        className={styles.nftCardButton}
        onClick={handleClaim}
        disabled={claimState !== "init"}
      >
        {claimState === "nftClaim"
          ? "Building WorkShop..."
          : claimState === "staking"
          ? "Staking WorkShop..."
          : "Build Workshop"}
      </button>
    </div>
  );
};

export default RealmWorkShopCard;
