import React, { useState, useEffect, useCallback, Fragment } from "react";
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
import nft1 from "../../assets/images/nft/nft1.png";
import nft2 from "../../assets/images/nft/nft2.png";
import nft3 from "../../assets/images/nft/nft3.png";
import nft4 from "../../assets/images/nft/nft4.png";
import author from "../../assets/images/avatar/author.png";
import dotPattern from "../../assets/images/icon/dot-pattern.png";
import { BsPatchCheckFill } from "react-icons/bs";
import Title from "components/Loader/Title";
import ItemsLoader from "components/Loader/ItemsLoader";
import CollectionThumbnail from "components/Loader/CollectionThumbnail";
import { BiFilter } from "react-icons/bi";

const Item = (props) => {
  //ACTIVE TAB
  const [activeTab, setActiveTab] = useState(1);
  const [gameData, setGameData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [itemMetadata, setItemMetadata] = useState([]);
  const [items, setItems] = useState(null);
  const { tokenAddress, tokenId } = useParams();
  console.log("tokenAddress", tokenAddress);
  const { Moralis } = useMoralis();

  const getCollectionData = useCallback(async () => {
    console.log("sd12", Moralis);

    await Moralis.initPlugins();

    const res = await Moralis.Plugins.opensea.getAsset({
      network: "testnet",
      tokenAddress: tokenAddress,
      tokenId: tokenId,
    });

    setGameData(res);
    console.log("results", res);

    const options1 = {
      address: tokenAddress,
      token_id: tokenId,
      chain: "rinkeby",
    };
    const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(
      options1,
    );

    setItemData(tokenIdMetadata);
    setItemMetadata(JSON.parse(tokenIdMetadata.metadata));
    console.log("tokenIdMetadata", tokenIdMetadata);

    const options = {
      address: tokenAddress,
      token_id: tokenId,
      chain: "rinkeby",
    };
    const tokenIdOwners = await Moralis.Web3API.token.getTokenIdOwners(options);

    console.log("tokenIdOwners", tokenIdOwners);

    const options2 = {
      address: tokenAddress,
      token_id: tokenId,
      chain: "rinkeby",
    };
    const transfers = await Moralis.Web3API.token.getWalletTokenIdTransfers(
      options2,
    );

    console.log("transfers", transfers);
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
            <div className="col-lg-6 col-md-12 pe-md-5 mb-sm-4">
              <div className="content-left ml-5 d-flex flex-column justify-content-between h-100">
                {/* Author */}
                {itemData.metadata ? (
                  <div>
                    <div className="d-flex justify-content-start align-items-center mb-4">
                      <div>
                        <img
                          style={{ width: "30px", borderRadius: "50%" }}
                          src={gameData.collection.imageUrl}
                        />
                      </div>
                      <div>
                        <div className="d-flex align-items-center">
                          <p className="content pad-l-15 mb-0 gilroy-normal">
                            {gameData.collection.name}
                          </p>
                          <BsPatchCheckFill
                            className="text-golden mg-l-8"
                            size={18}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <h2 className="tf-title mb-0 pb-1 gilroy-bold">
                        {itemMetadata.name}
                      </h2>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="content mb-0 gilroy-normal font-15">
                        Owned by{" "}
                        <span>
                          @{itemData.owner_of.substring(2, 8).toUpperCase()}
                        </span>
                      </p>
                    </div>
                    {/* Highest Bid section */}
                    {/* <div className="d-flex justify-content-center mt-5 align-items-center">
                      <div className="d-flex justify-content-center align-items-center  item-btn me-3">
                        <h4 className="mb-0 text-nowrap">
                          Highest Bid - 12.25ETH
                        </h4>
                      </div>
                      <div
                        className="w-100"
                        style={{ borderBottom: "1px solid #999" }}
                      />
                    </div> */}
                    <div className="collection-desc gilroy-normal">
                      <p className=" font-15">{itemMetadata.description}</p>
                    </div>
                  </div>
                ) : (
                  <Title />
                )}

                {/* Links */}
                <div className="d-sm-flex justify-content-between align-items-center">
                  <div className="">
                    <p className="text-16 mb-0">Current Price</p>
                    <h2 className="tf-title text-start mb-0 pb-1 gilroy-bold font-26">
                      8.50<span>ETH</span>
                    </h2>
                  </div>
                  <br />
                  <div className="d-flex justify-content-around align-items-center">
                    {/* <div className="d-flex justify-content-center align-items-center item-btn me-3 mx-5">
                      <h4 className="mb-0 gilroy-bold">Buy for 8.50ETH</h4>
                    </div> */}
                    <button class="primary-btn text-nowrap mx-2 w-100">
                      Buy for 8.50ETH
                    </button>
                    {/* Place a bid section */}
                    {/* <div className="d-flex justify-content-center align-items-center item-btn mx-2 px-5">
                      <h4 className="mb-0 gilroy-bold text-nowrap">
                        Place a bid
                      </h4>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12" style={{ zIndex: "999" }}>
              <div className="content-right">
                {itemData.metadata ? (
                  <div className="row">
                    <div className="col-6 px-3 ps-5 w-100">
                      <div className="media" style={{ position: "relative" }}>
                        <img
                          src={itemMetadata.image}
                          className="border-radius-30 w-100"
                          alt="Axies"
                        />
                        <img className="dotted-pattern-bg-1" src={dotPattern} />
                        <img className="dotted-pattern-bg-2" src={dotPattern} />
                        <div className="bottom-left-text-overlay gilroy-bold font-18 text-white">
                          #{tokenId}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <CollectionThumbnail />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Fragment>
        <section className="tf-section today-pick pt-0">
          <div className="themesflat-container">
            <div className="row p-md-10">
              <div className="col-md-6 mb-5 px-5">
                <div className="card-2">
                  <div className="card-2-header">
                    <BiFilter className="text-primary" size={30} /> Properties
                  </div>
                  <div className="card-2-body">
                    <ul className="card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                    <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                    <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                    <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                    <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                    <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-5 px-5">
                <div className="card-2">
                  <div className="card-2-header">
                    <BiFilter className="text-primary" size={30} /> Properties
                  </div>
                  <div className="card-2-body">
                    <ul className="card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                    <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                    <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                    <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                    <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                    <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-5 px-5">
                <div className="card-2">
                  <div className="card-2-header">
                    <BiFilter className="text-primary" size={30} /> Properties
                  </div>
                  <div className="card-2-body">
                    <ul className="card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                    <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                    <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                    <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                    <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                    <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                      <li className="text-primary">Background</li>
                      <li>Pink</li>
                      <li className="gilroy-normal">19% have this trait</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    </Layout>
  );
};

export default Item;
