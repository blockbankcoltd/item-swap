import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Accordion } from "react-bootstrap-accordion";
import Layout from "../../layout";
import { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import img1 from "../../assets/images/slider/slide_1.png";
import imgbg1 from "../../assets/images/slider/bg_slide_1.png";
import TodayPick from "../home/todayPick";
import Line_Background from "../../assets/images/item-background/Line_Background.png";
import Dot_right from "../../assets/images/item-background/Dot_Right.png";
import Dot_left from "../../assets/images/item-background/Dot_Left.png";

const Collection = () => {
  return (
    <Layout>
      <div className="tf-section tf-item-details"></div>
      <section className="tf-box-icon create style1 tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 d-flex align-items-center">
              <div className="sc-box-icon">
                <h3 className="heading">
                  Get all the amazing art of the world in itemswap
                </h3>
                {/* <p className="content">{props.item.description}</p> */}
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="sc-box-icon">
                <div className="image">
                  <div className={`icon-create`}>
                    <img
                      src={require("../../assets/images/icon/lock.png")}
                      alt=""
                    />
                  </div>
                </div>
                <h3 className="heading">
                  <Link to="/wallet-connect">Excrypted Security</Link>
                </h3>
                <p className="content">
                  We have well encypted and safe security system from the name
                  theft:
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="sc-box-icon">
                <div className="image">
                  <div className={`icon-create`}>
                    <img
                      src={require("../../assets/images/icon/timer.png")}
                      alt=""
                    />
                  </div>
                </div>
                <h3 className="heading">
                  <Link to="/wallet-connect">Rapid Trasactions</Link>
                </h3>
                <p className="content">
                  We have flow of purchase transaction that are no complicated,
                  It’s rapid
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TodayPick />

      <section className="tf-box-icon create1 style1 tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12">
              <div className="sc-box-icon sc-box-bg">
                <div className="image">
                  <div className={`icon-create sc-box-header-box`}>
                    <i className="fa fa-wallet"></i>
                  </div>
                </div>
                <h3 className="heading">
                  <Link to="/wallet-connect">SET-UP YOUR WALLET</Link>
                </h3>
                <p className="content">
                  Wallet that is functional for NFT purchasing. You may have a
                  Coinbase account at this point, but very few are actually set
                  up to buy an NFT.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="sc-box-icon sc-box-bg">
                <div className="image">
                  <div className={`icon-create sc-box-header-box`}>
                    <i className="fa fa-clipboard-list"></i>
                  </div>
                </div>
                <h3 className="heading">
                  <Link to="/wallet-connect">CREATE YOUR COLLECTION</Link>
                </h3>
                <p className="content">
                  Setting up your NFT collection and creating NFTs on NFTs is
                  easy! This guide explains how to set up your first collection
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="sc-box-icon sc-box-bg">
                <div className="image">
                  <div className={`icon-create sc-box-header-box`}>
                    <i className="fa fa-cart-plus"></i>
                  </div>
                </div>
                <h3 className="heading">
                  <Link to="/wallet-connect">ADD YOUR NFTs</Link>
                </h3>
                <p className="content">
                  Sed ut perspiciatis un de omnis iste natus error sit
                  voluptatem accusantium doloremque laudantium, totam rem.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="sc-box-icon sc-box-bg">
                <div className="image">
                  <div className={`icon-create sc-box-header-box`}>
                    <i className="fa fa-business-time"></i>
                  </div>
                </div>
                <h3 className="heading">
                  <Link to="/wallet-connect">LIST THEM FOR SALE</Link>
                </h3>
                <p className="content">
                  Choose between auctions, fixed-price listings, and
                  declining-price listings. You choose how you want to sell your
                  NFTs!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Collection;
