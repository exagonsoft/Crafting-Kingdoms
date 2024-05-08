import { useUser } from "@thirdweb-dev/react";
import React from "react";
import styles from "../styles/Home.module.css";

const Footer = () => {
  const { isLoggedIn, isLoading } = useUser();
  return (
    <>
      {isLoggedIn && (
        <div className={styles.footer_container}>
          <div className="">
            <span style={{fontSize:'1.2rem', fontWeight:'bold'}}>Powered By</span>
            <hr className="" style={{width:'80%', display:'flex', margin:'0 0 .3rem 0'}}/>
            <div className={styles.footer_powered_container}>
              <span className=""><img src="/images/exagon_soft_logo.png" alt="" className={styles.footer_powered_img} />EXAGON-SOFT</span>
              <span className=""><img src="/images/third_web_logo.png" alt="" className={styles.footer_powered_img} />THIRDWEB</span>
              <span className=""><img src="/images/poligon_logo.png" alt="" className={styles.footer_powered_img} />POLIGON</span>
            </div>
          </div>
          <div className=""></div>
          <div className=""></div>
        </div>
      )}
    </>
  );
};

export default Footer;
