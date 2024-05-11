import {
  MediaRenderer,
  useAddress,
  useContract,
  useOwnedNFTs,
  useTokenBalance,
} from "@thirdweb-dev/react";
import React, { useEffect } from "react";
import {
  LORD_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
} from "../constants/contracts";
import styles from "../styles/Home.module.css";
import LoadingAnimation from "./LoadingAnimator";
const OverallItem = ({ image, quantity, title }) => {
  return (
    <div className={styles.worker_item}>
      <MediaRenderer src={image} className={styles.card_images} />
      <div className={styles.worker_header_text}>
        <span className={styles.card_text}>{`${title}`}</span>
        <span className={styles.card_text}>{`Owned: ${quantity}`}</span>
      </div>
    </div>
  );
};



const Lord = ({ kingdomData }) => {
  const address = useAddress();
  
  const { contract: lordContract } = useContract(LORD_CONTRACT_ADDRESS);
  const { data: ownedLord, isLoading: loadingLord } = useOwnedNFTs(
    lordContract,
    address
  );
  const { contract: tokenContract } = useContract(TOKEN_CONTRACT_ADDRESS);
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  const _displayBalance = (num: string) => {
    return num.slice(0, 4);
  };

  useEffect(() => {
  }, [kingdomData]);

  return (
    <div
      className={
        loadingLord ? styles.worker_loading_container : styles.third_with
      }
    >
      {!loadingLord ? (
        ownedLord &&
        ownedLord.length > 0 &&
        ownedLord.map((lord) => (
          <div key={lord.metadata.id} className={styles.workerContainer}>
            <span className={styles.worker_container_title}>
              Kingdom Overall:
            </span>
            <div className={styles.worker_container_header}>
              <MediaRenderer
                src={lord.metadata.image}
                className={styles.card_images}
              />
              <div className={styles.worker_header_text}>
                <span
                  className={styles.card_text}
                >{`${lord.metadata.name}`}</span>
                {tokenBalance && (
                  <span className="">{`Balance: ${_displayBalance(
                    tokenBalance.displayValue as string
                  )} ${tokenBalance.symbol}`}</span>
                )}
                <span>{`${kingdomData.tavern ? "✅" : "⛔"} City Tavern`}</span> 
                <span>{`${kingdomData.magicTower ? "✅" : "⛔"} Magic Tower`}</span> 
                <span>{`${kingdomData.swordManTower ? "✅" : "⛔"} Swordman Barrack`}</span> 
                <span>{`${kingdomData.archersTower ? "✅" : "⛔"} Archers Trainer`}</span> 
              </div>
            </div>
            <div className={styles.worker_items_container}>
              <OverallItem
                image={"/images/city.png"}
                title={"Economy Buildings"}
                quantity={kingdomData.economyBuildings}
              />
              <OverallItem
                image={"/images/outpost.png"}
                title={"Military Buildings"}
                quantity={kingdomData.militaryBuildings}
              />
              <OverallItem
                image={"/images/hero.png"}
                title={"Heroes"}
                quantity={kingdomData.heroes}
              />
              <OverallItem
                image={"/images/generic_item.png"}
                title={"Items"}
                quantity={kingdomData.items}
              />
            </div>
          </div>
        ))
      ) : (
        <LoadingAnimation />
      )}
    </div>
  );
};

export default Lord;
