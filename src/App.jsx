import { useEffect, useState } from "react";
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
import CreateRaribleMarket from "views/admin/CreateRaribleMarket";

const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isAdminLoggedIn")),
  );
  // console.log(1, isAdminLoggedIn);

  useEffect(() => {
    setIsAdminLoggedIn(JSON.parse(localStorage.getItem("isAdminLoggedIn")));
    // console.log(2, isAdminLoggedIn);
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
  }, [isAuthenticated, isWeb3Enabled]);

  const loginUser = false;

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

  const AdminAuthRoute = ({ authUser, component: Component, ...rest }) => {
    if (authUser) {
      console.log("asasa", authUser);
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
                pathname: "/",
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
        <AdminAuthRoute
          authUser={isAdminLoggedIn ? isAdminLoggedIn : null}
          path="/explore-game"
          component={() => <Game />}
        />
        <AdminAuthRoute
          authUser={isAdminLoggedIn ? isAdminLoggedIn : null}
          path="/admin/createItem"
          component={() => <CreateItem />}
        />
        <AdminAuthRoute
          authUser={isAdminLoggedIn ? isAdminLoggedIn : null}
          path="/admin/bulkUpload"
          component={() => <BulkUpload />}
        />
        <AdminAuthRoute
          authUser={isAdminLoggedIn ? isAdminLoggedIn : null}
          path="/admin/addCollection"
          component={() => <StoreNftAddress />}
        />
        <AdminAuthRoute
          authUser={isAdminLoggedIn ? isAdminLoggedIn : null}
          path="/admin/createRaribleMarket"
          component={() => <CreateRaribleMarket />}
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
