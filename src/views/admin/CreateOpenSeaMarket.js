import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AddOpenSeaCollection from "components/CreateItem/OpenSea/Index";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import "react-tabs/style/react-tabs.css";
import "../../customStyle.css";
import {
  useMoralis,
  useMoralisFile,
  useNewMoralisObject,
  useMoralisQuery,
  useWeb3ExecuteFunction,
} from "react-moralis";

const CreateOpenSeaMarket = () => {
  return (
    <div className="create-item">
      <Header />
      <section className="flat-title-page inner">
        {/* <div className="overlay"></div> */}
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">OpenSea </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div className="form-create-item">
                <AddOpenSeaCollection />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateOpenSeaMarket;
