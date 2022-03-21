import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import Wallet from "components/Wallet";
import Home from "./views/home";
import Game from "./views/game";
import Items from "./views/items";

const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
  }, [isAuthenticated, isWeb3Enabled]);

  console.log('aa', useParams());
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/explore-game">
          <Game />
        </Route>
        <Route exact path="/items/:nftAddress">
          <Items />
        </Route>
        <Route path="/wallet">
          <Wallet />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
