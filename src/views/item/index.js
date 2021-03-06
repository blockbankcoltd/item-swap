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
import moment from "moment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../../layout";
import { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { RaribleFunctions } from "./RaribleFunctions.tsx";
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
import { ETHLogo } from "components/Chains/Logos";
import { useIPFS } from "hooks/useIPFS";
import "react-toastify/dist/ReactToastify.css";

const Item = (props) => {
  //ACTIVE TAB
  const [activeTab, setActiveTab] = useState(1);
  const [gameData, setGameData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [sell, setSell] = useState(false);
  const [price, setPrice] = useState(null);
  const [sellButtonDisabled, SetSellButtonDisabled] = useState(null);
  const [buyButtonDisabled, SetBuyButtonDisabled] = useState(null);
  const [listings, setListings] = useState(null);
  const [offers, setOffers] = useState(null);
  const [itemMetadata, setItemMetadata] = useState([]);
  const [items, setItems] = useState(null);
  const [transfers, setTransfers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [rarityScore, setRarityScore] = useState(null);
  const { tokenAddress, tokenId } = useParams();
  const { resolveLink } = useIPFS();
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

  const notify = (msg) =>
    toast(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: "var(--primary-color)",
        color: "var(--primary-color2)",
      },
    });

  const CHAIN = process.env.REACT_APP_CHAIN;
  const NETWORK = process.env.REACT_APP_NETWORK;

  const web3Account = useMemo(
    () => isAuthenticated && user.get("accounts")[0],
    [user, isAuthenticated],
  );

  const getCollectionData = useCallback(async () => {
    await Moralis.initPlugins();

    axios
      .get(`https://api.opensea.io/api/v1/asset/${tokenAddress}/${tokenId}/`)
      .then((res) => {
        console.log("Resssss", res);
        setGameData(res.data);
        setItemData(res.data);
      })
      .catch((err) => console.log(err));

    const RarityGameItems = Moralis.Object.extend("RarityGameItems");
    const query = new Moralis.Query(RarityGameItems);
    query.equalTo("tokenAddress", tokenAddress);
    query.equalTo("tokenId", tokenId);
    query.descending("createdAt");

    const results = await query.find();
    if (results && results.length) {
      setRarityScore(JSON.parse(JSON.stringify(results[0])));
      console.log("Rarity", JSON.parse(JSON.stringify(results[0])));
    }

    const options = {
      address: tokenAddress,
      token_id: tokenId,
      chain: CHAIN,
    };
    const tokenIdOwners = await Moralis.Web3API.token.getTokenIdOwners(options);

    console.log("tokenIdOwners", tokenIdOwners);

    const options2 = {
      address: tokenAddress,
      token_id: tokenId,
      chain: CHAIN,
    };
    const transfers = await Moralis.Web3API.token.getWalletTokenIdTransfers(
      options2,
    );

    setTransfers(transfers.result);
    console.log("transfers", transfers);

    const trade = await Moralis.Plugins.opensea.getOrders({
      network: NETWORK,
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
    // console.log("Buy", price);
    SetBuyButtonDisabled(true);
    try {
      if (!isAuthenticated) await authenticate();
      // const result = await Moralis.Plugins.opensea.createBuyOrder({
      //   network: NETWORK,
      //   tokenAddress: tokenAddress,
      //   tokenId: tokenId,
      //   tokenType: itemData.contract_type,
      //   amount: parseFloat(price),
      //   userAddress: account,
      //   //   paymentTokenAddress: "0xc778417E063141139Fce010982780140Aa0cD5Ab", //mainnet
      //   paymentTokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", //mainnet
      // });

      let response = await Moralis.Plugins.opensea.fulfillOrder({
        network: NETWORK,
        userAddress: account,
        order: orders[orders.length - 1],
      });

      if (response?.data?.success) {
        notify("Item purchased successfully!");
      } else {
        notify("Something went wrong!");
      }
      window.location.reload(false);
    } catch (e) {
      notify("Insufficient funds for gas * price + value");
    }
    SetBuyButtonDisabled(false);
  };

  const handleSell = async () => {
    SetSellButtonDisabled(true);
    try {
      console.log("sellResult", itemData?.asset_contract?.schema_name);
      if (!isAuthenticated) await authenticate();
      const result = await Moralis.Plugins.opensea.createSellOrder({
        network: "testnet",
        tokenAddress: tokenAddress,
        tokenId: tokenId,
        tokenType:
          itemData?.contract_type || itemData?.asset_contract?.schema_name,
        userAddress: account?.toLowerCase(),
        startAmount: Moralis.Units.ETH(price),
        endAmount: Moralis.Units.ETH(price),

        // expirationTime: expirationTime, Only set if you startAmount > endAmount
      });
      console.log("sellResult", result);
    } catch (e) {
      notify("Something went wrong!!");
    }
    setSell(false);
    SetSellButtonDisabled(false);
  };

  const handleCancelSell = async () => {
    await Moralis.Plugins.opensea.cancelOrder({
      network: NETWORK,
      userAddress: account,
      order: orders[0],
    });
  };

  useEffect(() => {
    getCollectionData().catch(console.error);
  }, []);
  // return <></>;
  return (
    <Layout>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="tf-section tf-item-details">
        <div className="themesflat-container mt-5 pb-5">
          <div className="row">
            {/* <div className="col-xl-1 col-md-1"></div> */}
            <div className="col-lg-6 col-md-12 pe-md-5 mb-sm-4">
              <div className="content-left ml-5 d-flex flex-column justify-content-between">
                {/* Author */}
                {itemData ? (
                  <div>
                    {itemData &&
                    itemData?.collection?.primary_asset_contracts?.[0]?.name ? (
                      <div className="d-flex justify-content-start align-items-center mb-4">
                        <div>
                          {itemData?.collection?.primary_asset_contracts?.[0]
                            ?.image_url ? (
                            <img
                              style={{ width: "30px", borderRadius: "50%" }}
                              src={resolveLink(
                                itemData?.collection
                                  ?.primary_asset_contracts?.[0]?.image_url,
                              )}
                            />
                          ) : null}
                        </div>
                        <div>
                          <div className="d-flex align-items-center">
                            <p className="content pad-l-15 mb-0 gilroy-normal">
                              {
                                itemData?.collection
                                  ?.primary_asset_contracts?.[0]?.name
                              }
                            </p>
                            <BsPatchCheckFill
                              className="text-golden mg-l-8"
                              size={18}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <div className="d-flex align-items-center">
                      <h2 className="tf-title mb-0 pb-1 gilroy-bold">
                        {itemData.name
                          ? itemData?.name
                          : "#" + tokenId.length < 5
                          ? tokenId
                          : tokenId.substring(0, 3).toUpperCase() + "..."}
                      </h2>
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="content mb-0 gilroy-normal font-15">
                        Owned by{" "}
                        <span>
                          @
                          {itemData?.owner?.address
                            .substring(2, 8)
                            .toUpperCase()}
                        </span>
                      </p>
                    </div>
                    <div className="row d-md-block d-lg-none">
                      <div className="col-6 px-3 w-100">
                        <div className="media" style={{ position: "relative" }}>
                          {itemData && itemData?.image_url ? (
                            <img
                              src={resolveLink(itemData?.image_url)}
                              className="border-radius-30 w-100"
                              alt="Axies"
                            />
                          ) : (
                            <ItemThumbnail />
                          )}
                          <img
                            className="dotted-pattern-bg-1"
                            src={dotPattern}
                          />
                          <img
                            className="dotted-pattern-bg-2"
                            src={dotPattern}
                          />
                          <div className="bottom-left-text-overlay gilroy-bold font-18 text-white">
                            #
                            {tokenId.length < 5
                              ? tokenId
                              : tokenId.substring(0, 4).toUpperCase()}
                            ...
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
                      <p className=" font-15">{itemData?.description}</p>
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
                        {Moralis.Units.FromWei(
                          orders[orders.length - 1].currentPrice,
                        )}{" "}
                        <span>
                          {orders[0] &&
                            orders[orders.length - 1].paymentTokenContract
                              .symbol}
                        </span>
                      </h2>
                    </div>
                    <br />

                    <div className="d-flex justify-content-around align-items-center">
                      {/* <div className="d-flex justify-content-center align-items-center item-btn me-3 mx-5">
                      <h4 className="mb-0 gilroy-bold">Buy for 8.50ETH</h4>
                    </div> */}
                      <button
                        className="primary-btn text-nowrap mx-2 w-100"
                        disabled={buyButtonDisabled}
                        onClick={() =>
                          handleBuy(
                            Moralis.Units.FromWei(
                              orders[orders.length - 1].currentPrice,
                            ),
                          )
                        }
                      >
                        Buy for{" "}
                        {Moralis.Units.FromWei(
                          orders[orders.length - 1].currentPrice,
                        )}{" "}
                        {orders[0] && orders[0].paymentTokenContract.symbol}
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
                {account === itemData?.owner_of ||
                itemData?.top_ownerships?.find(
                  (e) =>
                    e.owner?.address?.toLowerCase() === account?.toLowerCase(),
                ) ? (
                  <div>
                    {!sell ? (
                      <button
                        className="primary-btn text-nowrap mx-2 w-100"
                        onClick={() => setSell(true)}
                        disabled={sellButtonDisabled}
                      >
                        Sell
                      </button>
                    ) : (
                      <></>
                    )}
                    {sell ? (
                      <div>
                        <div className="d-flex">
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control  number-input"
                              placeholder="Enter Amount"
                              aria-label="Enter Amount"
                              aria-describedby="basic-addon2"
                              onChange={(e) => setPrice(e.target.value)}
                            />
                            <span
                              className="input-group-text"
                              id="basic-addon2"
                            >
                              ETH
                            </span>
                          </div>
                        </div>
                        <br />
                        <div className="d-flex">
                          <div
                            className="d-flex justify-content-center align-items-center watchlist-btn me-3 w-100"
                            onClick={() => setSell(false)}
                          >
                            <h4 className="mb-0">Cancel</h4>
                          </div>
                          <button
                            className="primary-btn text-nowrap mx-2 w-100"
                            onClick={handleSell}
                            disabled={sellButtonDisabled}
                          >
                            Sell
                          </button>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {orders[0] ? (
                      <button
                        className="primary-btn text-nowrap mx-2 w-100"
                        onClick={() => handleCancelSell}
                        disabled={sellButtonDisabled}
                      >
                        Cancel Sell
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
                <br />
                <br />
                <div className="row">
                  {rarityScore ? (
                    <div className="col-md-12 mb-5 px-5">
                      <div className="card-2">
                        <div className="card-2-header d-flex justify-content-between align-items-center">
                          <div>
                            <BiFilter className="text-primary" size={30} />{" "}
                            Properties
                          </div>
                          <div>
                            Rarity score{" "}
                            <span className="text-primary">
                              {rarityScore?.rarity.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="card-2-body">
                          <ul className="card-2-ul d-flex justify-content-between align-items-center">
                            <li className="gilroy-normal">Type</li>
                            <li className="gilroy-normal">Value</li>
                            <li className="gilroy-normal">Rarity Score</li>
                          </ul>
                          {rarityScore?.attributes ? (
                            rarityScore?.attributes?.map((trait) => (
                              <ul className="card-2-ul d-flex justify-content-between align-items-center">
                                <li className="text-primary">
                                  {trait.trait_type}
                                </li>
                                <li>{trait.value}</li>
                                <li className="gilroy-normal">
                                  {trait.rarityScore.toFixed(2)}
                                </li>
                              </ul>
                            ))
                          ) : (
                            <p className="text-16 mb-0">No Data</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {!rarityScore ? (
                    <div className="col-md-12 mb-5 px-5">
                      <div className="card-2">
                        <div className="card-2-header">
                          <BiFilter className="text-primary" size={30} />{" "}
                          Properties
                        </div>
                        <div className="card-2-body">
                          {itemMetadata?.attributes ? (
                            itemMetadata?.attributes.map((trait) => (
                              <ul className="card-2-ul d-flex justify-content-between align-items-center">
                                <li className="text-primary">
                                  {trait.type || trait.trait_type}
                                </li>
                                <li>{trait.description || trait.value}</li>
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
                  ) : null}
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
                            <li>Contract Address</li>
                            <li className="text-primary">
                              {itemData.token_address &&
                                `${itemData.token_address
                                  .substring(2, 8)
                                  .toUpperCase()}...${itemData.token_address
                                  .substring(39, 42)
                                  .toUpperCase()}`}
                            </li>
                          </ul>
                          <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                            <li>Token ID</li>
                            <li>
                              {tokenId.length < 5
                                ? tokenId
                                : tokenId.substring(0, 4).toUpperCase()}
                              ...
                            </li>
                          </ul>
                          <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                            <li>Token Standard</li>
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
                {itemData ? (
                  <div className="row d-none d-lg-block">
                    <div className="col-6 px-3 ps-5 w-100">
                      <div className="media" style={{ position: "relative" }}>
                        {itemData && itemData.image_url ? (
                          <img
                            src={resolveLink(itemData.image_url)}
                            className="border-radius-30 w-100"
                            alt="Axies"
                          />
                        ) : (
                          <ItemThumbnail />
                        )}
                        <img className="dotted-pattern-bg-1" src={dotPattern} />
                        <img className="dotted-pattern-bg-2" src={dotPattern} />
                        <div className="bottom-left-text-overlay gilroy-bold font-18 text-white">
                          #
                          {tokenId.length < 5
                            ? tokenId
                            : tokenId.substring(0, 4).toUpperCase()}
                          ...
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
                        {orders ? (
                          orders.map((order) => (
                            <ul className="card-2-ul d-flex justify-content-between align-items-center">
                              <li className="gilroy-normal">
                                <ETHLogo />
                                &nbsp;
                                {Moralis.Units.FromWei(order.currentPrice)}
                              </li>
                              <li className="gilroy-normal">USD Price</li>
                              <li className="gilroy-normal">
                                {moment(order.expirationTime).format("llll")}
                              </li>
                              <li className="gilroy-normal text-primary">
                                {order.maker.substring(2, 8).toUpperCase()}
                                ...
                                {order.maker.substring(39, 42).toUpperCase()}
                              </li>
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
                        <AiFillTag className="text-primary" size={30} /> Offers
                      </div>
                      <div className="card-2-body">
                        {offers ? (
                          <ul className="card-2-ul d-flex justify-content-between align-items-center">
                            <li className="gilroy-normal">Price</li>
                            <li className="gilroy-normal">USD Price</li>
                            <li className="gilroy-normal">Expiration</li>
                            <li className="gilroy-normal">From</li>
                          </ul>
                        ) : (
                          <p className="text-16 mb-0">No Data</p>
                        )}
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
                            <li style={{ width: "15%" }}></li>
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
                              {moment(transfer.block_timestamp).fromNow()}
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
