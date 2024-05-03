import { useUser } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { getUser } from "./api/auth/[...thirdweb]";

const RealmMarketplace = () => {
  const { isLoggedIn, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  return <div></div>;
};

export default RealmMarketplace;

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
