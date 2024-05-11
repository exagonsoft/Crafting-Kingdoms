import { useUser } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getUser } from "./api/auth/[...thirdweb]";
import MainWrapper from "../containers/MainWrapper";
import styles from "../styles/WorldMap.module.css";

const WorldMap = () => {
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  return (
    <MainWrapper>
      <div className={styles.page_container}>
        <h2 className={styles.section_title}>World Map</h2>
        <div className={styles.world_map}>
          <img src="/images/main_land.png" alt="Loading Map..." className="" />
        </div>
      </div>
    </MainWrapper>
  );
};

export default WorldMap;

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
