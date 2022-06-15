import React from "react";
import Layout from "../../layout";
import DEX from "components/DEX";
import TokenChart from "components/Chart";
import { Link } from "react-router-dom";
import { Tabs } from "antd";
import { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import Line_Background from "../../assets/images/item-background/Line_Background.png";
import Dot_right from "../../assets/images/item-background/Dot_Right.png";
import Dot_left from "../../assets/images/item-background/Dot_Left.png";

const Trade = ({ chain }) => {
  console.log("chain", chain);
  const options = {
    series: [
      {
        _type: "area",
        key: "uv",
        fill: "rgba(97, 125, 233, 0.6)",
        stroke: "#617DE9",
        label: true,
      },
    ],
  };
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
            style={{ paddingBottom: "20px" }}
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
                            <span className="tf-text s1">SWAP</span>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* <section></section> */}
      <section className="tf-section today-pick">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-8">
              <TokenChart />
            </div>
            <div className="col-md-4">
              <div className="sc-card-product">
                <div
                  className="themesflat-container"
                  style={{ paddingTop: "5rem" }}
                >
                  <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                    <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
                      <DEX chain={"eth"} />
                    </Tabs.TabPane>
                    <Tabs.TabPane
                      tab={<span>Binance Smart Chain</span>}
                      key="2"
                    >
                      <DEX chain="bsc" />
                    </Tabs.TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      ;
    </Layout>
  );
};

export default Trade;
