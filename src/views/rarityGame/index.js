import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useMoralisQuery, useMoralis, useChain } from "react-moralis";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import Line_Background from "../../assets/images/item-background/Line_Background.png";
import Dot_right from "../../assets/images/item-background/Dot_Right.png";
import Dot_left from "../../assets/images/item-background/Dot_Left.png";
import Loader from "views/home/Loader";
import Items from "./Items";
import openseaLogo from "../../assets/images/logo/opensea.png";
import raribleLogo from "../../assets/images/logo/rarible.png";

const RarityGame = () => {
  const [games, setGames] = useState(null);
  const [activeMarket, setActiveMarket] = useState(
    localStorage.getItem("activeMarket"),
  );

  const fetchGames = async () => {
    const RarityGames = Moralis.Object.extend("RarityGames");
    const query = new Moralis.Query(RarityGames);
    query.equalTo("status", "ACTIVE");
    query.equalTo("isActive", true);
    query.equalTo("chain", "0x1");
    query.descending("createdAt");

    const results = await query.find();
    if (results && results.length) {
      setGames(JSON.parse(JSON.stringify(results)));
      console.log(JSON.parse(JSON.stringify(results)));
    }
  };

  useEffect(async () => {
    await fetchGames();
  }, []);

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
                            <span className="tf-text s1">RARITY FINDER</span>
                          </h1>
                          {/* <h1 className="heading">MARKETPLACE</h1> */}
                          {/* <p className="sub-heading">
                            Marketplace for monster character cllections non
                            fungible token NFTs
                          </p> */}
                          {/* <div className="d-flex justyfy-content-between align-items-center order-1">
                            <div
                              className="d-flex justyfy-content-between align-items-center display-type-section"
                              style={{ margin: "auto" }}
                            >
                              <div
                                className={`display-type-btn-left d-flex align-items-center ${
                                  activeMarket === "opensea"
                                    ? "display-type-btn-active-opensea"
                                    : ""
                                }`}
                                onClick={() => {
                                  setActiveMarket("opensea");
                                  switchMarket("opensea");
                                  localStorage.setItem(
                                    "activeMarket",
                                    "opensea",
                                  );
                                }}
                              >
                                <img
                                  src={openseaLogo}
                                  style={{ width: "24px" }}
                                />
                                <p
                                  className={`m-0 ms-2 ${
                                    activeMarket === "opensea"
                                      ? "text-white"
                                      : ""
                                  }`}
                                >
                                  OpenSea
                                </p>
                              </div>
                              <div
                                className={`display-type-btn-right d-flex align-items-center ${
                                  activeMarket === "rarible"
                                    ? "display-type-btn-active-rarible"
                                    : ""
                                }`}
                                onClick={() => {
                                  setActiveMarket("rarible");
                                  switchMarket("rarible");
                                  localStorage.setItem(
                                    "activeMarket",
                                    "rarible",
                                  );
                                }}
                              >
                                <img
                                  src={raribleLogo}
                                  style={{ width: "24px" }}
                                />
                                <p
                                  className={`m-0 ms-2 ${
                                    activeMarket === "rarible"
                                      ? "text-white"
                                      : ""
                                  }`}
                                >
                                  Rarible
                                </p>
                              </div>
                            </div>
                          </div> */}
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
      {/* {games ? (
        games.length === 0 ? (
          <section className="tf-section today-pick">
            <p className="tf-title">No collection found on this network</p>
          </section>
        ) : ( */}
      <Items data={games} market={activeMarket} />
      {/* )
      ) : (
        <Loader />
      )} */}
    </Layout>
  );
};

export default RarityGame;
