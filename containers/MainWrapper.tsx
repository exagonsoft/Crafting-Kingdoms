import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

const MainWrapper = ({ children }) => {
  return (
    <main className={styles.main_view_box}>
      <NavBar />
      <div className={styles.main_layout_container}>{children}</div>
      <Footer />
    </main>
  );
};

export default MainWrapper;
