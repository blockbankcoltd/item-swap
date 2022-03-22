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
import Trade from "views/trade";
import NFTBalance from "components/NFTBalance";
import Wallet from "components/Wallet";
import { Tabs } from "antd";
import NativeBalance from "components/NativeBalance";
import QuickStart from "components/QuickStart";
import Contract from "components/Contract/Contract";
import Text from "antd/lib/typography/Text";
import Ramper from "components/Ramper";
import MenuItems from "./components/MenuItems";
import Home from "./views/home";
import CreateItem from "views/CreateItem";
import Lottery from "views/lottery";
import Test from "views/Test";
import BulkUpload from "views/BulkUpload";
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
        <Route path="/wallet">
          <Wallet />
        </Route>
        <Route path="/1inch">
          <Trade chain="eth" />
        </Route>
        <Route path="/erc20balance">
          <ERC20Balance />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/bulkUpload">
          <BulkUpload />
        </Route>
        <Route path="/nftBalance">
          <NFTBalance />
        </Route>
        <Route path="/contract">
          <Contract />
        </Route>
        <Route path="/lottery">
          <Lottery />
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
