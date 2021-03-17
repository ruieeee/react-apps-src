import React, { useState, useEffect, ReactEventHandler } from "react";
import styles from "../../css/all.module.css";
import { Link } from "react-router-dom";
import { auth } from "../../firebase";
import Logout from "../modules/LogoutBotton";

const TopPage: React.FC = (props: any) => {
  const user = auth.currentUser?.displayName;
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && props.history.push("login");
    });
    return () => unSub();
  }, []);

  return (
    <div className={styles.all}>
      <h1>Top</h1>
      <Logout history={props.history} />
      <br />
      <Link to="/Login">Login</Link>
      <br />
      <Link to="/Tables">table</Link>
    </div>
  );
};

export default TopPage;
