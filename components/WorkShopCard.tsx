import {
  MediaRenderer,
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
import { BigNumber } from "ethers";
import styles from "../styles/Home.module.css";

type Props = {
  tokenId: number;
};

const WorkShopCard = ({ tokenId }: Props) => {
  const address = useAddress();
  const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
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

  const truncateRevenue = (revenue: BigNumber) => {
    const convertToEther = toEther(revenue);
    const truncateValue = convertToEther.toString().slice(0, 6);
    return truncateValue;
  };

  return (
    <div className={styles.nftCard}>
      <MediaRenderer src={workShopNft?.metadata.image} className={styles.nft_card_images}/>
      <div className="">
        <h4>{workShopNft?.metadata.name}</h4>
        {workShopRewards && workShopRewards[1].gt(0) && (
          <p>Qty: {workShopRewards[0].toNumber()}</p>
        )}
        {claimableRewards && (
          <p>Earnings: {truncateRevenue(claimableRewards as BigNumber)}</p>
        )}
      </div>
      <Web3Button
        contractAddress={STAKING_CONTRACT_ADDRESS}
        action={(contract) => contract.call("claimRewards", [tokenId])}
        onSuccess={() => alert("Earnings Claimed!!")}
        className={styles.nftCardButton}
      >
        Claim Earnings
      </Web3Button>
    </div>
  );
};

export default WorkShopCard;
