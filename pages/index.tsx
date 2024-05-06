import { useUser } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUser } from "./api/auth/[...thirdweb]";
import Lord from "../components/Lord";
import WorkShops from "../components/WorkShops";
import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import MainWrapper from "../containers/MainWrapper";

const Home: NextPage = () => {
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  return (
    <MainWrapper>
      <Lord />
      <WorkShops />
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
