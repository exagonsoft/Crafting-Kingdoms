import { useUser } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUser } from "./api/auth/[...thirdweb]";
import Lord from "../components/Lord";
import WorkShops from "../components/WorkShops";

const Home: NextPage = () => {
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  return (
    <div className={styles.layout_container}>
      <Lord />
      <WorkShops />
    </div>
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
