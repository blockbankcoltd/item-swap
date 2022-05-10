import React, {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useMemo,
} from "react";
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
import { BsFillFileTextFill } from "react-icons/bs";
import { AiFillTag } from "react-icons/ai";
import ItemThumbnail from "components/Loader/ItemThumbnail";

const Item = (props) => {
  //ACTIVE TAB
  const [activeTab, setActiveTab] = useState(1);
  const [gameData, setGameData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [itemMetadata, setItemMetadata] = useState([]);
  const [items, setItems] = useState(null);
  const [transfers, setTransfers] = useState([]);
  const [orders, setOrders] = useState([]);
  const { tokenAddress, tokenId } = useParams();
  console.log("tokenAddress", tokenAddress);
  const {
    Moralis,
    user,
    authenticate,
    isAuthenticated,
    account,
    chainId,
    logout,
  } = useMoralis();

  const web3Account = useMemo(
    () => isAuthenticated && user.get("accounts")[0],
    [user, isAuthenticated],
  );

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

    setTransfers(transfers.result);
    console.log("transfers", transfers);

    const trade = await Moralis.Plugins.opensea.getOrders({
      network: "testnet",
      tokenAddress: tokenAddress,
      tokenId: tokenId,
      //   orderSide: side,
      page: 1,
      // pagination shows 20 orders each page
    });
    setOrders(trade.orders);
    console.log("trade", trade);
  }, []);

  const handleBuy = async (price) => {
    console.log("Buy", price);
    if (!isAuthenticated) authenticate();
    const result = await Moralis.Plugins.opensea.createBuyOrder({
      network: "testnet",
      tokenAddress: tokenAddress,
      tokenId: tokenId,
      tokenType: itemData.contract_type,
      amount: parseFloat(price),
      userAddress: account,
      paymentTokenAddress: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    });
  };

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
              <div className="content-left ml-5 d-flex flex-column justify-content-between">
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
                            {gameData.collection.name &&
                              gameData.collection.name}
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
                        {itemMetadata.name ? itemMetadata.name : "#" + tokenId}
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
                    <div className="row d-md-block d-lg-none">
                      <div className="col-6 px-3 w-100">
                        <div className="media" style={{ position: "relative" }}>
                          <img
                            src={itemMetadata.image}
                            className="border-radius-30 w-100"
                            alt="Axies"
                          />
                          <img
                            className="dotted-pattern-bg-1"
                            src={dotPattern}
                          />
                          <img
                            className="dotted-pattern-bg-2"
                            src={dotPattern}
                          />
                          <div className="bottom-left-text-overlay gilroy-bold font-18 text-white">
                            #{tokenId}
                          </div>
                        </div>
                      </div>
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
                {orders.length > 0 ? (
                  <div className="d-sm-flex justify-content-between align-items-center">
                    <div className="">
                      <p className="text-16 mb-0">Current Price</p>
                      <h2 className="tf-title text-start mb-0 pb-1 gilroy-bold font-26">
                        {Moralis.Units.FromWei(orders[0].currentPrice)}
                        <span>
                          {gameData.collection &&
                            gameData.collection.paymentTokens[0].symbol}
                        </span>
                      </h2>
                    </div>
                    <br />

                    <div className="d-flex justify-content-around align-items-center">
                      {/* <div className="d-flex justify-content-center align-items-center item-btn me-3 mx-5">
                      <h4 className="mb-0 gilroy-bold">Buy for 8.50ETH</h4>
                    </div> */}
                      <button
                        class="primary-btn text-nowrap mx-2 w-100"
                        onClick={() =>
                          handleBuy(
                            Moralis.Units.FromWei(orders[0].currentPrice),
                          )
                        }
                      >
                        Buy for {Moralis.Units.FromWei(orders[0].currentPrice)}{" "}
                        {gameData.collection &&
                          gameData.collection.paymentTokens[0].symbol}
                      </button>
                      {/* Place a bid section */}
                      {/* <div className="d-flex justify-content-center align-items-center item-btn mx-2 px-5">
                      <h4 className="mb-0 gilroy-bold text-nowrap">
                        Place a bid
                      </h4>
                    </div> */}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <br />
                <br />
                <div className="row">
                  <div className="col-md-12 mb-5 px-5">
                    <div className="card-2">
                      <div className="card-2-header">
                        <BiFilter className="text-primary" size={30} />{" "}
                        Properties
                      </div>
                      <div className="card-2-body">
                        {itemMetadata.attributes ? (
                          itemMetadata.attributes.map((trait) => (
                            <ul className="card-2-ul d-flex justify-content-between align-items-center">
                              <li className="text-primary">
                                {trait.trait_type}
                              </li>
                              <li>{trait.value}</li>
                              {/* <li className="gilroy-normal">
                                  19% have this trait
                                </li> */}
                            </ul>
                          ))
                        ) : (
                          <p className="text-16 mb-0">No Data</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-5 px-5">
                    <div className="card-2">
                      <div className="card-2-header">
                        <BsFillFileTextFill
                          className="text-primary"
                          size={30}
                        />
                        Details
                      </div>
                      {itemData ? (
                        <div className="card-2-body">
                          <ul className="card-2-ul d-flex justify-content-between align-items-center">
                            <li className="text-primary">Contract Address</li>
                            <li>
                              {itemData.token_address &&
                                `${itemData.token_address
                                  .substring(2, 8)
                                  .toUpperCase()}...${itemData.token_address
                                  .substring(39, 42)
                                  .toUpperCase()}`}
                            </li>
                          </ul>
                          <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                            <li className="text-primary">Token ID</li>
                            <li>{itemData.token_id}</li>
                          </ul>
                          <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                            <li className="text-primary">Token Standard</li>
                            <li>{itemData.contract_type}</li>
                          </ul>
                          {/* <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                          <li className="text-primary">Metadata</li>
                          <li>ETH</li>
                        </ul>
                        <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                          <li className="text-primary">Creator Fees</li>
                          <li>Centralized</li>
                        </ul> */}
                        </div>
                      ) : (
                        <p className="text-16 mb-0">No Data</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12" style={{ zIndex: "999" }}>
              <div className="content-right">
                {itemMetadata ? (
                  <div className="row d-none d-lg-block">
                    <div className="col-6 px-3 ps-5 w-100">
                      <div className="media" style={{ position: "relative" }}>
                        {itemMetadata.image ? (
                          <img
                            src={itemMetadata.image}
                            className="border-radius-30 w-100"
                            alt="Axies"
                          />
                        ) : (
                          <ItemThumbnail />
                        )}
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
                <br />
                <br />
                <div className="row">
                  <div className="col-md-12 mb-5 px-5">
                    <div className="card-2">
                      <div className="card-2-header">
                        <AiFillTag className="text-primary" size={30} />{" "}
                        Listings
                      </div>
                      <div className="card-2-body">
                        <ul className="card-2-ul d-flex justify-content-between align-items-center">
                          <li className="gilroy-normal">Price</li>
                          <li className="gilroy-normal">USD Price</li>
                          <li className="gilroy-normal">Expiration</li>
                          <li className="gilroy-normal">From</li>
                        </ul>
                        <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                          <li></li>
                          <li>$30,955.25</li>
                          <li>About 2 hour</li>
                          <li className="text-primary">Samson Frost</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-5 px-5">
                    <div className="card-2">
                      <div className="card-2-header">
                        <BiFilter className="text-primary" size={30} /> Activity
                      </div>
                      <div className="card-2-body">
                        <ul className="card-2-ul d-flex align-items-center">
                          <li
                            className="gilroy-normal"
                            style={{ width: "15%" }}
                          >
                            Event
                          </li>
                          <li
                            className="gilroy-normal"
                            style={{ width: "15%" }}
                          >
                            Price
                          </li>
                          <li
                            className="gilroy-normal"
                            style={{ width: "25%" }}
                          >
                            From
                          </li>
                          <li
                            className="gilroy-normal"
                            style={{ width: "25%" }}
                          >
                            To
                          </li>
                          <li
                            className="gilroy-normal"
                            style={{ width: "20%" }}
                          >
                            Date
                          </li>
                        </ul>
                        {transfers.map((transfer) => (
                          <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                            <li style={{ width: "15%" }}>
                              {transfer.from_address ===
                              "0x0000000000000000000000000000000000000000"
                                ? "Minted"
                                : "Transfer"}
                            </li>
                            <li style={{ width: "15%" }}>{transfer.amount}</li>
                            <li
                              className="text-primary"
                              style={{ width: "25%" }}
                            >
                              {transfer.from_address ===
                              "0x0000000000000000000000000000000000000000"
                                ? "NullAddress"
                                : `${transfer.from_address
                                    .substring(2, 8)
                                    .toUpperCase()}...${transfer.from_address
                                    .substring(39, 42)
                                    .toUpperCase()}`}
                            </li>
                            <li
                              className="text-primary"
                              style={{ width: "25%" }}
                            >
                              {`${transfer.to_address
                                .substring(2, 8)
                                .toUpperCase()}...${transfer.to_address
                                .substring(39, 42)
                                .toUpperCase()}`}
                            </li>
                            <li style={{ width: "20%" }}>
                              {transfer.block_timestamp}
                            </li>
                          </ul>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-5 px-5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Fragment>
        <section className="tf-section today-pick pt-0">
          <div className="themesflat-container">
            <div className="row p-md-10">
              <div className="col-md-5 mb-5 px-3"></div>
              <div className="col-md-7 mb-5 px-3"></div>
            </div>
          </div>
        </section>
      </Fragment>
    </Layout>
  );
};

export default Item;
