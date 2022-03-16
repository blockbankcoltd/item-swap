import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import TokenPrice from "components/TokenPrice";
import ERC20Balance from "components/ERC20Balance";
import ERC20Transfers from "components/ERC20Transfers";
import DEX from "components/DEX";
import NFTBalance from "components/NFTBalance";
import Wallet from "components/Wallet";
import { Tabs } from "antd";
import NativeBalance from "components/NativeBalance";
import Contract from "components/Contract/Contract";
import Ramper from "components/Ramper";
import Home from "./views/home";
import Game from "./views/game";
import CreateItem from "views/CreateItem";
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/explore-game">
          <Game />
        </Route>
        <Route path="/wallet">
          <Wallet />
        </Route>
        <Route path="/1inch">
          <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
            <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
              <DEX chain="eth" />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
              <DEX chain="bsc" />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<span>Polygon</span>} key="3">
              <DEX chain="polygon" />
            </Tabs.TabPane>
          </Tabs>
        </Route>
        <Route path="/erc20balance">
          <ERC20Balance />
        </Route>
        <Route path="/onramp">
          <Ramper />
        </Route>
        <Route path="/erc20transfers">
          <ERC20Transfers />
        </Route>
        <Route path="/nftBalance">
          <NFTBalance />
        </Route>
        <Route path="/contract">
          <Contract />
        </Route>
        <Route path="/createItem">
          <CreateItem />
        </Route>
        <Route path="/">
          <Redirect to="/quickstart" />
        </Route>
        <Route path="/ethereum-boilerplate">
          <Redirect to="/quickstart" />
        </Route>
        <Route path="/nonauthenticated">
          <>Please login using the "Authenticate" button</>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
