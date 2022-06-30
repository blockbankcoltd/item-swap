import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMoralisQuery, useMoralis, useChain } from "react-moralis";
import Layout from "../../layout";
import { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { BiGridAlt, BiGrid, BiSliderAlt } from "react-icons/bi";
import GameItems from "./GameItems";
import Line_Background from "../../assets/images/item-background/Line_Background.png";
import Dot_right from "../../assets/images/item-background/Dot_Right.png";
import Dot_left from "../../assets/images/item-background/Dot_Left.png";
import Loader from "views/home/Loader";
import openseaLogo from "../../assets/images/logo/opensea.png";
import raribleLogo from "../../assets/images/logo/rarible.png";

const Games = () => {
  const { Moralis } = useMoralis();

  const { chainId, chain } = useChain();

  const [games, setGames] = useState(null);
  const [filter, setFilter] = useState("all");
  const [activeMarket, setActiveMarket] = useState(
    localStorage.getItem("activeMarket"),
  );

  const { fetch } = useMoralisQuery(
    "Games",
    (query) => {
      return query
        .equalTo("status", "ACTIVE")
        .equalTo("isActive", true)
        .equalTo("market", activeMarket)
        .equalTo("chainId", chainId || localStorage.getItem("chainId") || "0x1")
        .descending(filter === "popular" ? "likes" : "createdAt");
    },
    [activeMarket],
    { autoFetch: false },
  );

  const getCollectionData = useCallback(async () => {
    const collections = await fetch({
      onSuccess: (result) => console.log(result),
      onError: (error) => console.log("err1", error),
    });

    if (collections && collections.length > 0) {
      let newAry = JSON.parse(JSON.stringify(collections));
      setGames(newAry);
      console.log("newAry", newAry);
    } else {
      setGames([]);
    }
  }, []);

  useEffect(() => {
    setActiveMarket(localStorage.getItem("activeMarket"));
    getCollectionData().catch(console.error);
  }, [localStorage.getItem("chainId"), chainId]);

  useEffect(() => {
    // getCollectionData().catch(console.error);
  }, []);

  const switchMarket = async (market) => {
    setGames(null);
    const Games = Moralis.Object.extend("Games");
    const query = new Moralis.Query(Games);
    query.equalTo("status", "ACTIVE");
    query.equalTo("isActive", true);
    query.equalTo("market", market);
    query.equalTo(
      "chainId",
      chainId || localStorage.getItem("chainId") || "0x1",
    );
    query.descending("createdAt");

    const results = await query.find();

    let newAry = [];
    if (results && results.length) {
      newAry = JSON.parse(JSON.stringify(results));
      setGames(newAry);
    } else {
      setGames(newAry);
    }
  };

  const filterGames = async (val) => {
    setGames(null);

    const Games = Moralis.Object.extend("Games");
    const query = new Moralis.Query(Games);
    query.equalTo("status", "ACTIVE");
    query.equalTo("market", activeMarket);
    query.equalTo("chainId", chainId || localStorage.getItem("chainId"));
    query.equalTo("isActive", true);
    if (val == "hot") {
      query.equalTo("isHot", true);
      query.descending("createdAt");
    } else {
      query.descending(filter === "popular" ? "likes" : "createdAt");
    }
    const results = await query.find();

    let newAry = [];
    setFilter(val);
    if (results && results.length) {
      newAry = JSON.parse(JSON.stringify(results));
      setGames(newAry);
    } else {
      setGames(newAry);
    }
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
                            <span className="tf-text s1">GAME MARKETPLACE</span>
                          </h1>
                          {/* <h1 className="heading">MARKETPLACE</h1> */}
                          {/* <p className="sub-heading">
                            Marketplace for monster character cllections non
                            fungible token NFTs
                          </p> */}
                          <div className="d-flex justyfy-content-between align-items-center order-1">
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
                          </div>
                          {/* <div
                            className="flex"
                            style={{ justifyContent: "center" }}
                          >
                            <Link
                              to="/explore-games"
                              className="header-slider style style-1 fl-button pri-1"
                            >
                              <span>Powered by </span>
                              <img
                                src={
                                  "https://seeklogo.com/images/O/opensea-logo-7DE9D85D62-seeklogo.com.png"
                                }
                                width={20}
                              />
                              <span> OpenSea</span>
                            </Link>
                          </div> */}
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
      {games ? (
        games.length === 0 ? (
          <section className="tf-section today-pick">
            <p className="tf-title">No collection found on this network</p>
          </section>
        ) : (
          <GameItems
            setFilter={filterGames}
            market={activeMarket}
            title={
              filter !== "all"
                ? `Showing results for ${filter} games`
                : "Explore Games"
            }
            data={games}
          />
        )
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default Games;
