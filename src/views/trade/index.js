import React from "react";
import Layout from "../../layout";
import DEX from "components/DEX";
import { Link } from "react-router-dom";
import { Tabs } from "antd";

const Trade = ({ chain }) => {
  console.log("chain", chain);
  return (
    <Layout>
      <section className="flat-title-page inner">
        {/* <div className="overlay"></div> */}
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Swap</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
        <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
          <DEX chain={"eth"} />
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
          <DEX chain="bsc" />
        </Tabs.TabPane>
      </Tabs>
      ;
    </Layout>
  );
};

export default Trade;
