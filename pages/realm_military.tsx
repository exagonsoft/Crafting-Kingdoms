import { useContract, useNFTs, useUser } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getUser } from "./api/auth/[...thirdweb]";
import { MILITARY_BUILDINGS_CONTRACT_ADDRESS } from "../constants/contracts";
import styles from "../styles/Home.module.css";
import MainWrapper from "../containers/MainWrapper";
import LoadingAnimation from "../components/LoadingAnimator";
import Dialog from "../components/Dialog";
import BusyPanel from "../components/BussyPanel";
import RealmMilitaryBuildCard from "../components/RealmMilitaryBuildCard";

const MilitaryBuildingsPage = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const [dialogData, setDialogData] = useState({
      title: "",
      message: "",
    });
    const { isLoggedIn, isLoading } = useUser();
    const router = useRouter();
    const { contract: workShopContract } = useContract(
      MILITARY_BUILDINGS_CONTRACT_ADDRESS
    );
    const { data: workshops } = useNFTs(workShopContract);
  
    const onShowDialog = (title: string, message: string) => {
      setDialogData({ title, message });
      document.body.style.overflowY = "hidden";
      setShowDialog(true);
    };
  
    const onDialogClose = () => {
      setDialogData({ title: "", message: "" });
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
  
    useEffect(() => {
      if (!isLoggedIn && !isLoading) {
        router.push("/login");
      }
    }, [isLoggedIn, isLoading, router]);
  
    return (
      <MainWrapper>
        <div className={styles.workshops_layout_container}>
          {showDialog && (
            <Dialog
              title={dialogData.title}
              message={dialogData.message}
              onAccept={onDialogClose}
            />
          )}
          {isBusy && <BusyPanel />}
          <h2 className={styles.section_title}>Available Buildings</h2>
          <div
            className={
              !workshops || workshops.length < 0
                ? styles.grid_loading_container
                : styles.grid_containers
            }
          >
            {workshops && workshops.length > 0 ? (
              workshops.map((workshop) => (
                <RealmMilitaryBuildCard
                  key={workshop.metadata.id}
                  building={workshop}
                  showDialog={onShowDialog}
                  setIsBusy={onBusy}
                />
              ))
            ) : (
              <LoadingAnimation />
            )}
          </div>
        </div>
      </MainWrapper>
    );
};

export default MilitaryBuildingsPage;

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