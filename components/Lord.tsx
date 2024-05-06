import {
  MediaRenderer,
  useAddress,
  useContract,
  useOwnedNFTs,
  useTokenBalance,
} from "@thirdweb-dev/react";
import React from "react";
import {
  LORD_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
} from "../constants/contracts";
import styles from "../styles/Home.module.css";
import LoadingAnimation from "./LoadingAnimator";

const Lord = () => {
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

  return (
    <div className={loadingLord ? styles.worker_loading_container : styles.third_with}>
      {!loadingLord ? (
        ownedLord &&
        ownedLord.length > 0 &&
        ownedLord.map((lord) => (
          <div key={lord.metadata.id} className={styles.workerContainer}>
            <div className="">
              <h3 className="">Kingdom Stats:</h3>
              <MediaRenderer
                src={lord.metadata.image}
                className={styles.card_images}
              />
            </div>
            <div className={styles.card_text_container}>
              <p className={styles.card_text}>{`${lord.metadata.name}`}</p>
              {tokenBalance && (
                <p className="">{`Balance: ${_displayBalance(
                  tokenBalance.displayValue as string
                )} ${tokenBalance.symbol}`}</p>
              )}
              <p className={styles.card_text}>{`Kingdom Towns: 1`}</p>
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
