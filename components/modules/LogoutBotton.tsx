import { auth } from "../../firebase";
import styles from "../../css/all.module.css";
import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

interface Props {
  history: any;
}

const Logout: React.FC<Props> = (props: any) => {
  const Logout = async () => {
    try {
      await auth.signOut();
      props.history.push("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button onClick={Logout} className={styles.app__logout}>
      <ExitToAppIcon />
    </button>
  );
};

export default Logout;
