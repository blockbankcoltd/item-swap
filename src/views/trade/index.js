import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import Layout from "../../layout";
import { Tabs } from "antd";
import { useMoralis } from "react-moralis";
import InchDex from "components/InchDex";

const Trade = ({ chain }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();
  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
  }, [isAuthenticated, isWeb3Enabled]);
  return (
    <React.Fragment>
      <Layout>
        <section className="bg-home jss1794" id="home">
          <div className="home-center">
            <div className="home-desc-center">
              <div className="jss1796"></div>
              <div
                className="container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                  <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="1">
                    <InchDex chain="bsc" />
                  </Tabs.TabPane>
                  <Tabs.TabPane tab={<span>Ethereum</span>} key="2">
                    <InchDex chain="eth" />
                  </Tabs.TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trade));
