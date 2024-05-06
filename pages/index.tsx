import { useUser } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getUser } from "./api/auth/[...thirdweb]";
import Lord from "../components/Lord";
import WorkShops from "../components/WorkShops";
import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import MainWrapper from "../containers/MainWrapper";
import Dialog from "../components/Dialog";
import BusyPanel from "../components/BussyPanel";

const Home: NextPage = () => {
  const { isLoggedIn, isLoading } = useUser();
  const [showDialog, setShowDialog] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const router = useRouter();

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

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

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
      <Lord />
      <WorkShops onEarningsClaimed={onEarningsClaimed} setBusy={onBusy}/>
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
