import React, { Component, Suspense, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "antd/dist/antd.css";
import "./assets/css/materialdesignicons.min.css";
import "./assets/scss/themes.scss";
import "./assets/css/style.css";
import "./assets/css/custom.scss";
const Market = React.lazy(() => import("./views/market"));
const Items = React.lazy(() => import("./views/items"));
const Trade = React.lazy(() => import("./views/trade"));

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Suspense fallback={<div className="loading" />}>
          <Router>
            <Switch>
              <Route path="/" exact render={(props) => <Market {...props} />} />
              <Route
                path="/items/:nftAddress"
                exact
                render={(props) => <Items {...props} />}
              />
              <Route
                path="/trade"
                exact
                render={(props) => <Trade chain="eth" />}
              />
              <Redirect to="/error" />
            </Switch>
          </Router>
        </Suspense>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { ...state };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(App);
