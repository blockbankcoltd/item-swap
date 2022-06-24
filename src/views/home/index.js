import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useMoralisQuery, useMoralis, useChain } from "react-moralis";
import { Accordion } from "react-bootstrap-accordion";
import Layout from "../../layout";
import { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import img1 from "../../assets/images/slider/slide_1.png";
import imgbg1 from "../../assets/images/slider/bg_slide_1.png";
import Line_Background from "../../assets/images/item-background/Line_Background.png";
import Dot_right from "../../assets/images/item-background/Dot_Right.png";
import Dot_left from "../../assets/images/item-background/Dot_Left.png";
import List from "./List";
import Loader from "./Loader";

const Home = () => {
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

  const { chainId, chain } = useChain();
  console.log("chainID", chainId);
  const [newList, setNewlist] = useState(null);
  const [popularList, setPopularlist] = useState(null);
  const [hotList, setHotlist] = useState(null);

  const { fetch } = useMoralisQuery(
    "Games",
    (query) =>
      query
        .descending("createdAt")
        .equalTo("status", "ACTIVE")
        .equalTo("isActive", true)
        .equalTo("chainId", "0x1")
        .equalTo(
          "market",
          localStorage.getItem("activeMarket")
            ? localStorage.getItem("activeMarket")
            : "opensea",
        )
        .descending("createdAt")
        .limit(20),
    [],
    { autoFetch: false },
  );

  const getCollectionData = useCallback(async () => {
    console.log("sd12", localStorage);

    const collections = await fetch({
      onSuccess: (result) => console.log(result),
      onError: (error) => console.log("err1", error),
    });

    console.log("sd12 nfts", collections);

    if (collections && collections.length > 0) {
      let newAry = JSON.parse(JSON.stringify(collections));
      console.log(
        "avavavsavavdasdasad",
        newAry.sort((a, b) => (a.likes > b.likes ? -1 : 1)),
      );
      setPopularlist(newAry.sort((a, b) => (a.likes > b.likes ? -1 : 1)));
      // setPopularlist(collections);
      setNewlist(newAry);
      setHotlist(newAry.filter((arr) => arr.isHot === true));
    } else {
      setPopularlist([]);
      setNewlist([]);
      setHotlist([]);
    }

    // if (collections && collections.length > 0) {
    //   let newAry = [];
    //   for (let collection of collections) {
    //     let tokenAddress = collection.attributes.collectionAddress;

    //     const options = {
    //       address: tokenAddress,
    //       chain: "rinkeby",
    //     };
    //     const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);

    //     console.log(tokenAddress, collection);
    //     const res = await Moralis.Plugins.opensea.getAsset({
    //       network: "testnet",
    //       tokenAddress: tokenAddress,
    //       tokenId: NFTs.result[NFTs.result.length - 1].token_id,
    //     });
    //     newAry.push(res);
    //   }

    //   newAry.forEach((arr) => {
    //     collections.forEach((col) => {
    //       if (arr.tokenAddress === col.attributes.collectionAddress) {
    //         arr["isHot"] = col.attributes.isHot;
    //         arr["likes"] = col.attributes.likes;
    //       }
    //     });
    //   });

    //   console.log(
    //     "results",
    //     newAry[0].tokenAddress,
    //     collections[0].attributes.collectionAddress,
    //     newAry,
    //   );
    //   setPopularlist(newAry);
    //   setNewlist(newAry);
    //   setHotlist(newAry.filter((arr) => arr.isHot === true));
    // }
  }, []);

  useEffect(() => {
    console.log("sd");
    getCollectionData().catch(console.error);
  }, []);

  // return <></>;
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
            <div className="overlay"></div>
            <div className="swiper-container mainslider home">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="slider-item">
                    <div className="themesflat-container ">
                      <div className="wrap-heading flat-slider flex">
                        <div className="content">
                          <h2 className="heading">EXPLORE, COLLECT & FLIP</h2>
                          <h1 className="heading mb-style">
                            <span className="tf-text s1">P2E GAME NFTs</span>
                          </h1>
                          {/* <h1 className="heading">MARKETPLACE</h1> */}
                          {/* <p className="sub-heading">
                            Marketplace for monster character cllections non
                            fungible token NFTs
                          </p> */}
                          <br />
                          <div className="flat-bt-slider flex style2">
                            <Link
                              to="/explore-games"
                              className="sc-button header-slider style style-1 rocket fl-button pri-1"
                            >
                              <span>Go to Market</span>
                            </Link>
                          </div>
                        </div>
                        <div className="image">
                          <img className="img-bg" src={imgbg1} alt="axies" />
                          <img src={img1} alt="axies" />
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

      <section className="tf-box-icon create style1 tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 d-flex align-items-center">
              <div className="sc-box-icon">
                <h3 className="heading">
                  Discover all the finest game NFT's on the blockchain
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
                  <Link to="/wallet-connect">Encrypted Security</Link>
                </h3>
                <p className="content">
                  We have well encrypted and safe security system
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
                  <Link to="/wallet-connect">Rapid Transactions</Link>
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
      <div>
        {console.log("popular List", popularList)}
        {popularList ? (
          <List
            title={"Popular NFTs"}
            market={localStorage.getItem("activeMarket")}
            data={popularList}
          />
        ) : (
          <Loader />
        )}
        {hotList ? (
          <List
            title={"Hot Collection"}
            market={localStorage.getItem("activeMarket")}
            data={hotList}
          />
        ) : (
          <Loader />
        )}
        {newList ? (
          <List
            title={"New Release"}
            market={localStorage.getItem("activeMarket")}
            data={newList}
          />
        ) : (
          <Loader />
        )}
      </div>
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
                  <Link to="/wallet-connect">CONNECT YOUR WALLET</Link>
                </h3>
                <p className="content">
                  Connect your DeFi wallet to gain genuine experience.
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
                  <Link to="/wallet-connect">Browse Game NFTs </Link>
                </h3>
                <p className="content">
                  Browse the collection. Decide on what you prefer. The NFTs can
                  also be liked and added to your watchlist.
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
                  <Link to="/wallet-connect">TRADE THE NFTs</Link>
                </h3>
                <p className="content">
                  NFTs may be purchased or sold as often as desired
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
                  <Link to="/wallet-connect">SWAP YOUR TOKENS INSTANTLY</Link>
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

export default Home;
