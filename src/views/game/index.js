import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMoralisQuery, useMoralis } from "react-moralis";
import Layout from "../../layout";
import { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import img1 from "../../assets/images/slider/slide_1.png";
import imgbg1 from "../../assets/images/slider/bg_slide_1.png";
import GameItems from "./GameItems";
import Line_Background from "../../assets/images/item-background/Line_Background.png";
import Dot_right from "../../assets/images/item-background/Dot_Right.png";
import Dot_left from "../../assets/images/item-background/Dot_Left.png";
import Loader from "views/home/Loader";

const Games = () => {
  const {
    Moralis,
    user,
    logout,
    authenticate,
    enableWeb3,
    isInitialized,
    isAuthenticated,
    isWeb3Enabled,
  } = useMoralis();

  const [games, setGames] = useState(null);
  const [filter, setFilter] = useState("all");

  const { fetch } = useMoralisQuery(
    "Games",
    (query) => {
      console.log("c21als2k", filter)
      if (filter == "hot") {

        return query
          .equalTo("status", "ACTIVE")
          .equalTo("isHot", true)
          .equalTo("isActive", true)
          .descending("createdAt");
      } else {
        return query
          .equalTo("status", "ACTIVE")
          .equalTo("isActive", true)
          .descending(filter === "popular" ? "likes" : "createdAt");
      }
    },
    [],
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

    }
  }, []);

  useEffect(() => {
    getCollectionData().catch(console.error);
  }, []);

  const filterGames = async (val) => {

    setGames(null);

    const Games = Moralis.Object.extend("Games");
    const query = new Moralis.Query(Games);
    query.equalTo("status", "ACTIVE");
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

  }

  return (
    <Layout>
      <section className="flat-title-page inner">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">GAME MARKETPLACE</h1>
              </div>
              <div
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
              </div>
            </div>
          </div>
        </div>
      </section>
      {games ? <GameItems title="Explore Games" data={games} /> : <Loader />}
    </Layout>
  );
};

export default Games;
