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

  const { fetch } = useMoralisQuery(
    "Games",
    (query) =>
      query
        .descending("createdAt")
        .equalTo("status", "ACTIVE")
        .descending("createdAt"),
    [],
    { autoFetch: false },
  );

  const getCollectionData = useCallback(async () => {
    console.log("sd12");

    const collections = await fetch({
      onSuccess: (result) => console.log(result),
      onError: (error) => console.log("err1", error),
    });
    console.log("sd12 collectionss", collections);

    if (collections && collections.length > 0) {
      let newAry = [];
      for (let collection of collections) {
        let tokenAddress = collection.attributes.collectionAddress;
        console.log(tokenAddress, collection);
        const res = await Moralis.Plugins.opensea.getAsset({
          network: "testnet",
          tokenAddress: tokenAddress,
          tokenId: "",
        });
        newAry.push(res);
      }

      newAry.forEach((arr) => {
        collections.forEach((col) => {
          if (arr.tokenAddress === col.attributes.collectionAddress) {
            arr["isHot"] = col.attributes.isHot;
          }
        });
      });

      console.log(
        "results",
        newAry[0].tokenAddress,
        collections[0].attributes.collectionAddress,
        newAry,
      );
      setGames(newAry);
    }
  }, []);

  useEffect(() => {
    console.log("sd");
    getCollectionData().catch(console.error);
  }, []);

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
