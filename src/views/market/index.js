import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import { Container, Row, Col, Input } from "reactstrap";
import { bindActionCreators } from "redux";
import Layout from "../../layout";
import NFTTokenIds from "../../components/NFTTokenIds";
import { useMoralis } from "react-moralis";

const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();
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
              <div className="container">
                <Row className="">
                  <Col lg={6}>
                    <h1 style={{ color: '#0BBCD5', marginBottom: 0 }}>Item Market</h1>
                  </Col>
                  <Col lg={6}>
                    <Input type="text" placeholder="Search for game" className="searchInput" />
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <div class="bg-info align-items-center topHeader d-flex mt-3 px-3" role="alert">
                    <Col md={9} sm={9} xs={9} lg={9}><p className='m-0 text-medium font-weight-medium'>Newest Collections</p></Col>
                    <Col md={3} sm={3} xs={3} lg={3}>
                      <Input type="text" placeholder="Filter" className="searchInput mt-0" />
                    </Col>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <NFTTokenIds />
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
