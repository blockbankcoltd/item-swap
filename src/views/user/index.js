import React, { useState, useEffect, useCallback } from "react";
import { useMoralisQuery, useMoralis } from "react-moralis";
import { Link, useParams } from "react-router-dom";
import { Accordion } from "react-bootstrap-accordion";
import Layout from "../../layout";
import { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import TodayPick from "../home/todayPick";
import PopularCollection from "components/UI/PopularCollection";
import popularCollectionData from "assets/fake-data/data-popular-collection";
import avatar from "../../assets/images/avatar/avt-0.png";
import cover from "../../assets/images/nft/cover-1.png";
import dotPattern from "../../assets/images/icon/dot-pattern.png";
import { BsPatchCheckFill } from "react-icons/bs";
import { FiGlobe, FiCodesandbox, FiInstagram } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { BsBookmarkDash } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import { BiGridAlt, BiGrid, BiSliderAlt } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import Items from "./Items";
import GameDescription from "components/Loader/GameDescription";
import Title from "components/Loader/Title";
import ItemsLoader from "components/Loader/ItemsLoader";
import CollectionThumbnail from "components/Loader/CollectionThumbnail";

const User = (props) => {
  const { innerWidth } = window;
  console.log("innerWidth", innerWidth);

  //ACTIVE TAB
  const [activeTab, setActiveTab] = useState(1);
  const [gameData, setGameData] = useState([]);
  const [items, setItems] = useState(null);
  const { tokenAddress, tokenId } = useParams();
  console.log("tokenAddress", tokenAddress);
  const { Moralis, account } = useMoralis();

  const getCollectionData = useCallback(async () => {
    console.log("sd12", Moralis);

    await Moralis.initPlugins();

    const options5 = { chain: "eth", address: account };
    const myNfts = await Moralis.Web3API.account.getNFTs(options5);

    console.log("myNfts", myNfts);

    // const res = await Moralis.Plugins.opensea.getAsset({
    //   network: "testnet",
    //   tokenAddress: myNfts.result[0].token_address,
    //   tokenId: myNfts.result[0].token_id,
    // });

    // setGameData(res);
    // console.log("results", res);

    const options = {
      address: "0x27af21619746a2abb01d3056f971cde936145939",
      chain: "rinkeby",
    };
    const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);

    console.log("NFTs", NFTs);
    NFTs.result.length = 3;
    let arr = [];
    for (let nft of myNfts.result) {
      const options1 = {
        address: nft.token_address,
        token_id: nft.token_id,
        chain: "rinkeby",
      };
      const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(
        options1,
      );
      arr.push(tokenIdMetadata);
    }

    console.log("tokenIdMetadata", arr);
    setItems(arr);
  }, []);

  useEffect(() => {
    console.log("sd");
    getCollectionData().catch(console.error);
  }, []);
  // return <></>;
  return (
    <Layout>
      <div className="tf-section tf-item-details">
        <div className="themesflat-container mt-5 pb-5">
          <div className="row">
            {/* <div className="col-xl-1 col-md-1"></div> */}
            <div className="col-lg-12 col-md-12 pe-md-5 mb-sm-4">
              <div className="content-left ml-5 d-flex flex-column justify-content-between align-items-center h-100">
                {/* Author */}
                {/* {gameData.collection ? ( */}
                <div className="d-flex justify-content-center align-items-center">
                  <div>
                    <img src={cover} className="profile-cover" />
                  </div>
                </div>
                {/* ) : (
                  <Title />
                )} */}

                {/* Content */}
                <img src={avatar} className="profile-pic" />
                <br />
                <div className="d-flex align-items-center">
                  <h2 className="tf-title pad-l-15 mb-0 pb-1 gilroy-bold">
                    {account && account.substring(2, 8).toUpperCase()}
                  </h2>
                  <BsPatchCheckFill className="text-golden mg-l-8" size={32} />
                </div>
                {/* <div className="d-flex align-items-center">
                  <p className="content pad-l-15 mb-0 gilroy-normal">
                    Created by @abc
                  </p>
                  <BsPatchCheckFill className="text-info mg-l-8" size={18} />
                </div> */}
                {/* <div className="collection-desc gilroy-normal">
                  <p className=" font-15">Description</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOR DESKTOP ONLY */}
      <section className="tf-box-icon1 create style1 tf-section d-none d-md-block">
        <div className="themesflat-container d-flex justify-content-between align-items-center">
          <div className="d-flex justyfy-content-between align-items-center order-1">
            <div className="d-flex justyfy-content-between align-items-center display-type-section">
              <div className="display-type-btn-left display-type-btn-active">
                <BiGridAlt className="tile-icon active" size={24} />
              </div>
              <div className="display-type-btn-right">
                <BiGrid className="tile-icon" size={24} />
              </div>
            </div>
          </div>
          <div className="d-flex justyfy-content-between align-items-center order-3">
            <div>
              <FiSearch size={20} className="mx-2 menu-btn border-blue" />
            </div>
            <div>
              <BiSliderAlt size={20} className="mx-2 menu-btn border-blue" />
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center order-2">
            <div
              className={
                activeTab === 1
                  ? "d-flex justify-content-center align-items-center item-btn me-3 mx-5"
                  : ""
              }
              onClick={() => (activeTab !== 1 ? setActiveTab(1) : "")}
            >
              <h4
                className={
                  activeTab === 1
                    ? "mb-0 gilroy-bold"
                    : "mb-0 gilroy-bold muted cursor-pointer mx-5"
                }
              >
                Items
              </h4>
            </div>
            <div
              className={
                activeTab === 2
                  ? "d-flex justify-content-center align-items-center item-btn me-3 mx-5"
                  : ""
              }
              onClick={() => (activeTab !== 2 ? setActiveTab(2) : "")}
            >
              <h4
                className={
                  activeTab === 2
                    ? "mb-0 gilroy-bold"
                    : "mb-0 gilroy-bold muted cursor-pointer mx-5"
                }
              >
                Activity
              </h4>
            </div>
          </div>
        </div>
      </section>
      {/* FOR DESKTOP ONLY */}
      {/* FOR MOBILE ONLY */}
      <section className="tf-box-icon1 create style1 tf-section d-md-none">
        <div className="themesflat-container d-flex justify-content-between align-items-center">
          <div className="d-flex justyfy-content-between align-items-center order-1">
            <div className="d-flex justyfy-content-between align-items-center display-type-section">
              <div className="display-type-btn-left display-type-btn-active">
                <BiGridAlt className="tile-icon active" size={24} />
              </div>
              <div className="display-type-btn-right">
                <BiGrid className="tile-icon" size={24} />
              </div>
            </div>
          </div>
          <div className="d-flex justyfy-content-between align-items-center order-3">
            <div>
              <FiSearch size={20} className="mx-2 menu-btn border-blue" />
            </div>
            <div>
              <BiSliderAlt size={20} className="mx-2 menu-btn border-blue" />
            </div>
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-center align-items-center order-2">
          <div
            className={
              activeTab === 1
                ? "d-flex justify-content-center align-items-center item-btn me-3 mx-5"
                : ""
            }
            onClick={() => (activeTab !== 1 ? setActiveTab(1) : "")}
          >
            <h4
              className={
                activeTab === 1
                  ? "mb-0 gilroy-bold"
                  : "mb-0 gilroy-bold muted cursor-pointer mx-5"
              }
            >
              Items
            </h4>
          </div>
          <div
            className={
              activeTab === 2
                ? "d-flex justify-content-center align-items-center item-btn me-3 mx-5"
                : ""
            }
            onClick={() => (activeTab !== 2 ? setActiveTab(2) : "")}
          >
            <h4
              className={
                activeTab === 2
                  ? "mb-0 gilroy-bold"
                  : "mb-0 gilroy-bold muted cursor-pointer mx-5"
              }
            >
              Activity
            </h4>
          </div>
        </div>
      </section>
      {/* FOR MOBILE ONLY */}

      {items ? <Items data={items} /> : <ItemsLoader />}
      {/* <PopularCollection data={popularCollectionData} /> */}
    </Layout>
  );
};

export default User;
