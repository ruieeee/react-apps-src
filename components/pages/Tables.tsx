import React from "react";
import { Link } from "react-router-dom";
import styles from "../../css/all.module.css";
import { auth } from "../../firebase";
import Logout from "../modules/LogoutBotton";
import BasicTable from "../modules/basicTable";
import Table from "../modules/Table";
import Grid from "@material-ui/core/Grid";

const Tables: React.FC = (props: any) => {
  return (
    <div className={styles.all}>
      <Grid container justify="center">
        <h1>Table Page</h1>
        <Logout history={props.history} />
        <br />
      </Grid>
      <Grid container justify="center">
        <Link to="/">Home</Link>
      </Grid>

      <br />
      <br />
      <Grid container justify="center">
        <Table />
      </Grid>
    </div>
  );
};

export default Tables;
