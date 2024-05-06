import { useUser } from "@thirdweb-dev/react";
import React from "react";
import styles from "../styles/Home.module.css";

const Footer = () => {
  const { isLoggedIn, isLoading } = useUser();
  return (
    <>
      {isLoggedIn && (
        <div className={styles.footer_container}>
          <span>FOOTER</span>
        </div>
      )}
    </>
  );
};

export default Footer;
