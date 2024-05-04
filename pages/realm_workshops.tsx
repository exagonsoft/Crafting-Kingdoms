import { useContract, useNFTs, useUser } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getUser } from "./api/auth/[...thirdweb]";
import { BUILDINGS_CONTRACT_ADDRESS } from "../constants/contracts";
import styles from "../styles/Home.module.css";
import RealmWorkShopCard from "../components/RealmWorkShopCard";

const RealmWorkshops = () => {
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();
  const { contract: workShopContract } = useContract(
    BUILDINGS_CONTRACT_ADDRESS
  );
  const { data: workshops } = useNFTs(workShopContract);

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  return (
    <div className={styles.main}>
      <h2 className={styles.section_title} >Available Buildings</h2>
      <div className={!workshops || workshops.length < 0 ? styles.grid_loading_container : styles.grid_containers}>
        {workshops && workshops.length > 0 ? (
          workshops.map((workshop) => (
            <RealmWorkShopCard key={workshop.metadata.id} building={workshop} />
          ))
        ) : (
          <img src="/images/loading.gif" alt="" className={styles.loading_image} />
        )}
      </div>
    </div>
  );
};

export default RealmWorkshops;

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
