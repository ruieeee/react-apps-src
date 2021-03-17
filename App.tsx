import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopPage from "./components/pages/TopPage";
import Tables from "./components/pages/Tables";
import Login from "./components/pages/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TopPage}></Route>
        <Route exact path="/Tables" component={Tables}></Route>
        <Route exact path="/Login" component={Login}></Route>
      </Switch>
    </Router>
  );
}

export default App;
