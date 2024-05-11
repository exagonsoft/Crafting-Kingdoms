import { useAddress, useContract, useContractRead, useUser } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUser } from "./api/auth/[...thirdweb]";
import Lord from "../components/Lord";
import WorkShops from "../components/WorkShops";
import React from "react";
import MainWrapper from "../containers/MainWrapper";
import Dialog from "../components/Dialog";
import BusyPanel from "../components/BussyPanel";
import { kingdomOverallInterface } from "../interfaces/kingdomInterface";
import { buildingsIds, militaryBuildingsIds, STACKING_MILITARY_CONTRACT_ADDRESS, STAKING_CONTRACT_ADDRESS } from "../constants/contracts";
import { BigNumber } from "ethers";

const Home: NextPage = () => {
  const { isLoggedIn, isLoading } = useUser();
  const [showDialog, setShowDialog] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const router = useRouter();
  const [kingdomData, setKingdomData] = useState<kingdomOverallInterface>({
    economyBuildings: 0,
    militaryBuildings: 0,
    heroes: 0,
    items: 0,
    tavern: false,
    magicTower: false,
    swordManTower: false,
    archersTower: false,
  });
  const address = useAddress();
  const { contract: stakingContract } = useContract(STAKING_CONTRACT_ADDRESS);
  const { data: stakedTokens, isLoading: loadingWorkShops } = useContractRead(
    stakingContract,
    "getStakeInfo",
    [address]
  );
  const { contract: stakingMilitaryContract } = useContract(STACKING_MILITARY_CONTRACT_ADDRESS);
  const { data: stakedMilitaryTokens} = useContractRead(
    stakingMilitaryContract,
    "getStakeInfo",
    [address]
  );

  const checkOwnedBuildings = () => {
    if(stakedTokens && stakedTokens[0].length > 0){
      let _hasTavern = false;
      stakedTokens[0].map((token: BigNumber) => {
        if(token.toNumber() === buildingsIds.Tavern){
          _hasTavern = true;
        }
      })
      setKingdomData((prevState) => ({...prevState, tavern: _hasTavern}))
    }
    if(stakedMilitaryTokens && stakedMilitaryTokens[0].length > 0){
      let _hasMagicTower = false;
      let _hasArchersTower = false;
      let _hasSwordManTower = false;
      stakedMilitaryTokens[0].map((token: BigNumber) => {
        if(token.toNumber() === militaryBuildingsIds.magicTower){
          _hasMagicTower = true;
        }
        if(token.toNumber() === militaryBuildingsIds.archersTower){
          _hasArchersTower = true;
        }
        if(token.toNumber() === militaryBuildingsIds.swordManTower){
          _hasSwordManTower = true;
        }
      })
      setKingdomData((prevState) => ({...prevState, magicTower: _hasMagicTower, swordManTower: _hasSwordManTower, archersTower: _hasArchersTower}))
    }
}

  const onEarningsClaimed = () => {
    document.body.style.overflowY = "hidden";
    setShowDialog(true);
  };

  const onDialogClose = () => {
    document.body.style.overflowY = "auto";
    setShowDialog(false);
  };

  const onBusy = (busy: boolean) => {
    if (busy) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
    setIsBusy(busy);
  };

  const updateKingdomData = (target: string, value: number | boolean) => {
    setKingdomData((prevState) => ({ ...prevState, [target!]: value! }));
  };

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  useEffect(() => {checkOwnedBuildings();}, [stakedTokens])

  useEffect(() => {}, [kingdomData])

  return (
    <MainWrapper>
      {showDialog && (
        <Dialog
          title={"Success"}
          message={"Earnings claimed successfully!!"}
          onAccept={onDialogClose}
        />
      )}
      {isBusy && <BusyPanel />}
      <Lord kingdomData={kingdomData} />
      <WorkShops onEarningsClaimed={onEarningsClaimed} setBusy={onBusy} onPropertyChange={updateKingdomData}/>
    </MainWrapper>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const user = await getUser(context.req);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
