import React, { useState, useEffect } from "react";
import styles from "../../css/Login.module.css";
import { Link } from "react-router-dom";
import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const Login: React.FC = (props: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clickGoogle = async () => {
    try {
      await auth.signInWithRedirect(provider);
      const result = auth.getRedirectResult();
      if ((await result).credential) {
        const credential: any = (await result).credential;
      }
      props.history.push("/");
    } catch (error) {
      const mess = error.code + error.email + error.message + error.credential;
      alert(mess);
    }
  };

  useEffect(() => {
    //auth.onAuthStateChanged:認証関係に何らかの変更があった場合呼び出される
    //認証が成功しているとuserに何かしら情報が入っている
    const unSub = auth.onAuthStateChanged((user) => {
      //userがfalseならばuserを返しTrueならprops.history.push("/")を返す、history.pushメソッドは指定したパスに遷移する
      user && props.history.push("/");
    });
    return () => unSub();
  }, [props.history]);

  return (
    <div className={styles.login__root}>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{ shrink: true }}
          name="email"
          label="E-mail"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{ shrink: true }}
          name="password"
          label="Password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <br />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={
          isLogin
            ? async () => {
                try {
                  await auth.signInWithEmailAndPassword(email, password);
                  props.history.push("/");
                } catch (error) {
                  alert(error.message);
                }
              }
            : async () => {
                try {
                  await auth.createUserWithEmailAndPassword(email, password);
                  props.history.push("/");
                } catch (error) {
                  alert(error.message);
                }
              }
        }
      >
        {isLogin ? <LockOpenIcon /> : <VpnKeyIcon />}
        {isLogin ? " Login" : " Register"}
      </Button>

      <br />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={clickGoogle}
      >
        Google
      </Button>
      <br />
      <Typography align="center">
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create new account ?" : "Back to login"}
        </span>
      </Typography>
    </div>
  );
};

export default Login;
