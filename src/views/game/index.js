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
import TodayPick from "./todayPick";
import Line_Background from "../../assets/images/item-background/Line_Background.png";
import Dot_right from "../../assets/images/item-background/Dot_Right.png";
import Dot_left from "../../assets/images/item-background/Dot_Left.png";

const Games = () => {
  return (
    <Layout>
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true }}
      >
        <SwiperSlide className="center">
          <div
            className="flat-title-page"
            style={{ paddingBottom:"20px" }}
          // style={{ backgroundImage: `url(${imgbg})` }}
          >
            <img
              className="bgr-gradient gradient1"
              src={Dot_left}
              alt="Axies"
            />
            <img
              className="bgr-gradient gradient2"
              src={Dot_right}
              alt="Axies"
            />
            <img
              className="bgr-gradient gradient3"
              src={Line_Background}
              alt="Axies"
            />
            <div className="shape item-w-16"></div>
            <div className="shape item-w-22"></div>
            <div className="shape item-w-32"></div>
            <div className="shape item-w-48"></div>
            <div className="shape style2 item-w-51"></div>
            <div className="shape style2 item-w-51 position2"></div>
            <div className="shape item-w-68"></div>
            <div className="overlay1"></div>
            <div className="swiper-container mainslider home">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="slider-item">
                    <div className="themesflat-container ">
                      <div className="wrap-heading flat-slider flex">
                        <div className="content">
                          {/* <h2 className="heading">EXPLORE & STUNNING</h2> */}
                          <h1 className="heading mb-style">
                            <span className="tf-text s1">GAME MARKETPLACE</span>
                          </h1>
                          {/* <h1 className="heading">MARKETPLACE</h1> */}
                          {/* <p className="sub-heading">
                            Marketplace for monster character cllections non
                            fungible token NFTs
                          </p> */}
                          <div className="flex"
                            style={{ justifyContent: "center" }}
                          >
                            <Link
                              to="/explore-games"
                              className="header-slider style style-1 fl-button pri-1"
                            >
                              <span>Powered by </span>
                              <img
                                src={"https://seeklogo.com/images/O/opensea-logo-7DE9D85D62-seeklogo.com.png"}
                                width={20}
                              />
                              <span> OpenSea</span>
                            </Link>
                          </div>
                        </div>
                        {/* <div className="image">
                          <img className="img-bg" src={imgbg1} alt="axies" />
                          <img src={img1} alt="axies" />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <TodayPick />
    </Layout>
  );
};

export default Games;
