import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
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
import Home from "./views/home";
import Game from "./views/game";
import Items from "./views/items";

import CreateItem from "views/admin/CreateItem";
import Lottery from "views/lottery";
import Test from "views/Test";
import BulkUpload from "views/admin/BulkUpload";
import StoreNftAddress from "views/admin/StoreNftAddress";

const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
  }, [isAuthenticated, isWeb3Enabled]);

  const loginUser = true;

  const AuthRoute = ({ authUser, component: Component, ...rest }) => {
    if (authUser) {
      console.log("asasa");
    }
    return (
      <Route
        {...rest}
        render={(props) =>
          authUser ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/lottery",
              }}
            />
          )
        }
      />
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <AuthRoute
          authUser={loginUser ? loginUser : null}
          path="/explore-game"
          component={() => <Game />}
        />
        <AuthRoute
          authUser={loginUser ? loginUser : null}
          path="/admin/createItem"
          component={() => <CreateItem />}
        />
        <AuthRoute
          authUser={loginUser ? loginUser : null}
          path="/admin/bulkUpload"
          component={() => <BulkUpload />}
        />
        <AuthRoute
          authUser={loginUser ? loginUser : null}
          path="/admin/addCollection"
          component={() => <StoreNftAddress />}
        />
        <Route path="/wallet">
          <Wallet />
        </Route>
        <Route path="/1inch">
          <Trade chain="eth" />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
        <Route exact path="/items/:nftAddress">
          <Items />
        </Route>
        <Route path="/wallet">
          <Wallet />
        </Route>
        <Route path="/lottery">
          <Lottery />
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
