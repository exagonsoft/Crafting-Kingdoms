import {
  MediaRenderer,
  SmartContract,
  Web3Button,
  toEther,
  useAddress,
  useContract,
  useContractRead,
  useNFT,
} from "@thirdweb-dev/react";
import React, { useEffect, useState } from "react";
import {
  BUILDINGS_CONTRACT_ADDRESS,
  STAKING_CONTRACT_ADDRESS,
} from "../constants/contracts";
import { BaseContract, BigNumber } from "ethers";
import styles from "../styles/Home.module.css";
import Dialog from "./Dialog";

type Props = {
  tokenId: number;
  claimEarnings;
  onBusy;
  onPropertyChange;
};

const WorkShopCard = ({
  tokenId,
  claimEarnings,
  onBusy,
  onPropertyChange,
}: Props) => {
  const address = useAddress();
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
  const [buildingNumbers, setBuildingNumbers] = useState(0);
  const { contract: workShopContract } = useContract(
    BUILDINGS_CONTRACT_ADDRESS
  );
  const { data: workShopNft } = useNFT(workShopContract, tokenId);
  const { contract: stakingContract } = useContract(STAKING_CONTRACT_ADDRESS);
  const { data: workShopRewards } = useContractRead(
    stakingContract,
    "getStakeInfoForToken",
    [tokenId, address]
  );

  const handleClaimRewards = async (contract: SmartContract<BaseContract>) => {
    onBusy(true);
    await contract.call("claimRewards", [tokenId]);
  };

  useEffect(() => {
    if (!stakingContract || !address) return;

    async function getClaimableRewards() {
      const stakeInfo = await stakingContract?.call("getStakeInfoForToken", [
        tokenId,
        address,
      ]);
      setClaimableRewards(stakeInfo[1]);
    }

    getClaimableRewards();
    const intervalId = setInterval(getClaimableRewards, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (workShopRewards && workShopRewards[1].gt(0)) {
      setBuildingNumbers(workShopRewards[0].toNumber());
    }
  }, [workShopRewards]);

  useEffect(() => {
    onPropertyChange(tokenId, buildingNumbers);
  }, [buildingNumbers]);

  const truncateRevenue = (revenue: BigNumber) => {
    const convertToEther = toEther(revenue);
    const truncateValue = convertToEther.toString().slice(0, 6);
    return truncateValue;
  };

  return (
    <div className={styles.nftHomeCard}>
      <div className={styles.nft_owned_card_ui}></div>
      <MediaRenderer
        src={workShopNft?.metadata.image}
        className={styles.owned_nft_card_image}
      />
      <div className={styles.building_texts}>
        <h4>{workShopNft?.metadata.name}</h4>
        <div className={styles.owned_buildings_text_info_container}>
          <span>
            Earnings:{" "}
            {claimableRewards
              ? truncateRevenue(claimableRewards as BigNumber)
              : ""}
          </span>
          <img src="/images/coin.png" alt="" className="" />
        </div>
      </div>
      <div className={styles.nftHomeCardButton_jewel}>
        <span>{buildingNumbers > 0 ? buildingNumbers : 0}</span>
      </div>
      <Web3Button
        contractAddress={STAKING_CONTRACT_ADDRESS}
        action={(contract) => handleClaimRewards(contract)}
        onSuccess={() => {
          onBusy(false);
          claimEarnings();
        }}
        className={styles.nftHomeCardButton}
      >
        Claim Earnings
      </Web3Button>
    </div>
  );
};

export default WorkShopCard;
