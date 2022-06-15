import React, { useState, useEffect, useCallback } from "react";
import {
  useMoralisQuery,
  useMoralis,
  useNewMoralisObject,
} from "react-moralis";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import Layout from "../../layout";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import author from "../../assets/images/avatar/author.png";
import dotPattern from "../../assets/images/icon/dot-pattern.png";
import { BsPatchCheckFill } from "react-icons/bs";
import { HiShoppingCart } from "react-icons/hi";
import { BsBookmarkDash } from "react-icons/bs";
import { BiGridAlt, BiGrid, BiSliderAlt } from "react-icons/bi";
import { FiSearch, FiThumbsUp } from "react-icons/fi";
import Items from "components/Items";
import GameDescription from "components/Loader/GameDescription";
import Title from "components/Loader/Title";
import ItemsLoader from "components/Loader/ItemsLoader";
import CollectionThumbnail from "components/Loader/CollectionThumbnail";
import ItemThumbnail from "components/Loader/ItemThumbnail";
import { ETHLogo } from "components/Chains/Logos";
import GameItems from "views/game/GameItems";
import nft1 from "../../assets/images/nft/nft1.png";

const Collection = (props) => {
  const { innerWidth } = window;

  const {
    isSaving,
    error: objError,
    save: GameLikes,
  } = useNewMoralisObject("GameLikes");

  const CHAIN = process.env.REACT_APP_CHAIN;
  const NETWORK = process.env.REACT_APP_NETWORK;

  const { save: GameWatchlist } = useNewMoralisObject("GameWatchlist");

  //ACTIVE TAB
  const [activeTab, setActiveTab] = useState(1);
  const [gameData, setGameData] = useState([]);
  const [gameInfo, setGameInfo] = useState(null);
  const [items, setItems] = useState(null);
  const [nftTransfers, setNftTransfers] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [disableLike, setDisableLike] = useState(false);
  const [disableWatchlist, setDisableWatchlist] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [toggleSearchBox, setToggleSearchBox] = useState(false);
  const [offset, setOffset] = useState(0);
  const [gridSize, setGridSize] = useState(3);

  const { tokenAddress } = useParams();
  const { Moralis, account, authenticate, isAuthenticated } = useMoralis();

  const { fetch } = useMoralisQuery(
    "Games",
    (query) =>
      query
        .descending("createdAt")
        .equalTo("status", "ACTIVE")
        .equalTo("collectionAddress", tokenAddress)
        .descending("createdAt"),
    [],
    { autoFetch: false },
  );

  const getCollectionData = useCallback(async () => {
    const collections = await fetch({
      onSuccess: (result) => console.log(result),
      onError: (error) => console.log("err1", error),
    });
    console.log("sd12 collectionss", collections);

    setGameData(collections[0].attributes.gameInfo);
    setItems(JSON.parse(collections[0].attributes.gameItems));
    console.log("Itemssssss", JSON.parse(collections[0].attributes.gameItems));
    setGameInfo(collections[0]);

    // const { fetch: isGameWatchlisted } = useMoralisQuery(
    //   "GameWatchlist",
    //   (query) => {
    //     return query
    //       .equalTo("user", localStorage.getItem("account"))
    //       .equalTo("game", gameInfo.id)
    //       .equalTo("isActive", true);
    //   },
    //   [],
    // );

    const gamesObj = new Moralis.Object.extend("Games");
    const gamePointer = new gamesObj();
    gamePointer.id = collections[0].id;

    const GameWatchlist = Moralis.Object.extend("GameWatchlist");
    const gameWatchlistQuery = new Moralis.Query(GameWatchlist);
    gameWatchlistQuery.equalTo("user", localStorage.getItem("account"));
    gameWatchlistQuery.equalTo("game", gamePointer);
    gameWatchlistQuery.equalTo("isActive", true);

    const gameWatchlistResult = await gameWatchlistQuery.find();
    const gameWatchlistResultObj = JSON.parse(
      JSON.stringify(gameWatchlistResult),
    );
    setIsWatchlisted(gameWatchlistResultObj.length > 0 ? true : false);
    console.log("Result", JSON.parse(JSON.stringify(gameWatchlistResultObj)));

    // const isLiked = await isGameLiked({
    //   onSuccess: (result) => console.log(result),
    //   onError: (error) => console.log("err2", error),
    // });
    // setIsLiked(isLiked[0] ? true : false);

    // const isWatchlisted = await isGameWatchlisted({
    //   onSuccess: (result) => console.log(result),
    //   onError: (error) => console.log("err2", error),
    // });
    // setIsWatchlisted(isWatchlisted[0] ? true : false);
    // console.log("sd12 Like", isLiked);

    const options6 = {
      address: tokenAddress,
      chain: CHAIN,
      // offset: 0,
      limit: 5,
    };
    const nftTransferss = await Moralis.Web3API.token.getContractNFTTransfers(
      options6,
    );
    let activityData = [];
    for (let nftTransfer of nftTransferss.result) {
      const options7 = {
        address: tokenAddress,
        token_id: nftTransfer.token_id,
        chain: CHAIN,
      };
      const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(
        options7,
      );
      nftTransfer["metadata"] = tokenIdMetadata.metadata;
      activityData.push(nftTransfer);
      console.log("nftData", nftTransfer);
    }

    setNftTransfers(activityData);

    // console.log("nftTransfers", nftTransfers);
  }, []);

  const loadMore = async () => {
    setOffset(offset + 5);
    const options6 = {
      address: tokenAddress,
      chain: CHAIN,
      // offset,
      limit: 5,
    };
    const nftTransferss = await Moralis.Web3API.token.getContractNFTTransfers(
      options6,
    );
    let activityData = [];
    for (let nftTransfer of nftTransferss.result) {
      const options7 = {
        address: tokenAddress,
        token_id: nftTransfer.token_id,
        chain: CHAIN,
      };
      const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(
        options7,
      );
      nftTransfer["metadata"] = tokenIdMetadata.metadata;
      activityData.push(nftTransfer);
      console.log("nftData", nftTransfer);
    }

    setNftTransfers([...nftTransfers, ...activityData]);
    console.log("nftTransferssssssssssss", nftTransfers);
  };

  const handleLike = async () => {
    setDisableLike(true);
    if (isAuthenticated == false) await authenticate();
    if (!isLiked) {
      let options = {
        user: account || localStorage.getItem("account"),
        game: tokenAddress,
        isActive: true,
      };

      await GameLikes(options);

      const collection = await fetch({
        onSuccess: (result) => console.log(result),
        onError: (error) => console.log("err2", error),
      });
      console.log("collectionddddd", collection);
      collection[0].increment("likes", 1);
      await collection[0].save();
      setIsLiked(true);
    } else {
      // const likeData = await isGameLiked({
      //   onSuccess: (result) => console.log(result),
      //   onError: (error) => console.log("err2", error),
      // });

      // likeData[0].set("isActive", false);
      // await likeData[0].save();

      const collection = await fetch({
        onSuccess: (result) => console.log(result),
        onError: (error) => console.log("err2", error),
      });
      console.log("collectionddddd", collection);
      collection[0].increment("likes", -1);
      await collection[0].save();
      setIsLiked(false);
    }
    setDisableLike(false);
  };

  const handleWatchlisted = async () => {
    setDisableWatchlist(true);
    if (!isAuthenticated) await authenticate();
    const gameObjId = gameInfo.id;

    const gamesObj = new Moralis.Object.extend("Games");
    const gamePointer = new gamesObj();
    gamePointer.id = gameObjId;
    if (!isWatchlisted) {
      let options = {
        user: account || localStorage.getItem("account"),
        game: gamePointer,
        isActive: true,
      };

      await GameWatchlist(options);

      const collection = await fetch({
        onSuccess: (result) => console.log(result),
        onError: (error) => console.log("err2", error),
      });
      console.log("collectionddddd", collection);
      collection[0].increment("watchlist", 1);
      await collection[0].save();
      setIsWatchlisted(true);
    } else {
      const GameWatchlist = Moralis.Object.extend("GameWatchlist");
      const gameWatchlistQuery = new Moralis.Query(GameWatchlist);
      gameWatchlistQuery.equalTo("user", localStorage.getItem("account"));
      gameWatchlistQuery.equalTo("game", gamePointer);
      gameWatchlistQuery.equalTo("isActive", true);

      const gameWatchlistResult = await gameWatchlistQuery.find();
      gameWatchlistResult[0].set("isActive", false);
      await gameWatchlistResult[0].save();

      // const watchlistData = await isGameWatchlisted({
      //   onSuccess: (result) => console.log(result),
      //   onError: (error) => console.log("err2", error),
      // });

      // watchlistData[0].set("isActive", false);
      // await watchlistData[0].save();

      const collection = await fetch({
        onSuccess: (result) => console.log(result),
        onError: (error) => console.log("err2", error),
      });
      console.log("collectionddddd", collection);
      collection[0].increment("watchlist", -1);
      await collection[0].save();
      setIsWatchlisted(false);
    }
    setDisableWatchlist(false);
  };

  useEffect(() => {
    getCollectionData().catch(console.error);
  }, []);

  // return <></>;
  return (
    <Layout>
      <div className="tf-section tf-item-details">
        <div className="themesflat-container mt-5 pb-5">
          <div className="row">
            {/* <div className="col-xl-1 col-md-1"></div> */}
            <div
              className="col-lg-5 col-md-12 order-2"
              style={{ zIndex: "999" }}
            >
              <div className="content-right">
                {gameData.collection || gameData.meta ? (
                  <div className="row">
                    <div className="col-6 px-3 ps-5 w-100">
                      <div className="media" style={{ position: "relative" }}>
                        {gameData.imagePreviewUrl || gameData.meta ? (
                          <img
                            src={
                              gameData.imagePreviewUrl ||
                              gameData.meta?.content[0]?.url
                            }
                            className="border-radius-30 w-100"
                            alt="Axies"
                          />
                        ) : (
                          <ItemThumbnail />
                        )}
                        <img className="dotted-pattern-bg-1" src={dotPattern} />
                        <img className="dotted-pattern-bg-2" src={dotPattern} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <CollectionThumbnail />
                )}
              </div>
            </div>
            <div className="col-lg-7 col-md-12 pe-md-5 mb-sm-4 order-1">
              <div className="content-left ml-5 d-flex flex-column justify-content-between h-100">
                {/* Author */}
                {gameData.collection || gameData.meta ? (
                  <div className="d-flex justify-content-start align-items-center game-header">
                    <div>
                      <img className="game-image" src={author} />
                    </div>
                    <div>
                      <div className="d-flex align-items-center">
                        <h2 className="tf-title pad-l-15 mb-0 pb-1 gilroy-bold game-heading">
                          {console.log(gameData)}
                          {gameData.collection
                            ? gameData.collection.name
                            : gameData.meta.name}
                        </h2>
                        <BsPatchCheckFill
                          className="text-golden mg-l-8"
                          size={32}
                        />
                      </div>
                      {gameData.owner.user ? (
                        <div className="d-flex align-items-center">
                          <p className="content pad-l-15 mb-0 gilroy-normal">
                            Created by @{gameData.owner?.user?.username}
                          </p>
                          <BsPatchCheckFill
                            className="text-info mg-l-8"
                            size={18}
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                ) : (
                  <Title />
                )}

                {/* Content */}

                <div className="sc-card-product-1">
                  {localStorage.activeMarket === "opensea" ? (
                    <div className="d-flex">
                      <div className="flex-fill py-4 card-gredient-1 border-top-left-radius">
                        <div className="border-right">
                          <h3 className="game-text-des cd-stats gilroy-bold mb-0 pb-0 line-height">
                            {gameData && gameData.collection
                              ? gameData.collection.stats.total_supply
                              : ""}
                          </h3>
                          <p className="content text-center gilroy-semibold font-12 mb-0 pb-0">
                            ITEMS
                          </p>
                        </div>
                      </div>
                      <div className="flex-fill py-4 card-gredient-2">
                        <div className="border-right">
                          <h3 className="game-text-des cd-stats gilroy-bold mb-0 pb-0 line-height">
                            {gameData.collection?.stats.num_owners}
                          </h3>
                          <p className="content text-center gilroy-semibold font-12 mb-0 pb-0">
                            OWNER
                          </p>
                        </div>
                      </div>
                      <div className="flex-fill py-4 card-gredient-3">
                        <div className="border-right">
                          <div className="d-flex justify-content-center align-items-center">
                            <ETHLogo />
                            <h3 className="game-text-des cd-stats gilroy-bold mb-0 pb-0 line-height ms-2">
                              {gameData.collection?.stats.average_price.toFixed(
                                2,
                              )}
                            </h3>
                          </div>
                          <p className="content text-center gilroy-semibold font-12 mb-0 pb-0">
                            AVERAGE PRICE
                          </p>
                        </div>
                      </div>
                      <div className="flex-fill py-4 card-gredient-4 border-top-right-radius">
                        <div>
                          <h3 className="game-text-des cd-stats gilroy-bold mb-0 pb-0 line-height">
                            {gameData.collection
                              ? Math.round(
                                  gameData.collection.stats.total_volume * 10,
                                ) / 10
                              : ""}
                          </h3>
                          <p className="content text-center gilroy-semibold font-12 mb-0 pb-0">
                            VOLUME TRADED
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div
                    className="sc-card-product-2"
                    style={{ height: "3px" }}
                  ></div>
                  <div className="collection-desc gilroy-normal">
                    <p className=" font-15">
                      {gameData.collection || gameData.meta ? (
                        gameData?.collection?.description ||
                        gameData?.meta?.description
                      ) : (
                        <GameDescription />
                      )}
                    </p>
                  </div>
                </div>
                {/* Links */}
                <div className="d-sm-flex justify-content-between align-items-center">
                  {/* <div className="d-flex justify-content-center align-items-center">
                    <div className="social-btn me-3">
                      <FiGlobe className="icon" />
                    </div>
                    <div className="social-btn me-3">
                      <FiCodesandbox className="icon" />
                    </div>
                    <div className="social-btn me-3">
                      <FiInstagram className="icon" />
                    </div>
                    <div className="social-btn me-3">
                      <FaFacebookF className="icon" />
                    </div>
                  </div> */}
                  <br />
                  <div className="d-flex justify-content-around align-items-center">
                    <button
                      className={`d-flex justify-content-center align-items-center watchlist-btn me-3 w-100 ${
                        isWatchlisted ? "liked" : ""
                      }`}
                      disabled={disableWatchlist}
                      onClick={handleWatchlisted}
                    >
                      <BsBookmarkDash
                        size={20}
                        className={`watchlist-icon me-2 ${
                          isWatchlisted ? "liked-text" : ""
                        }`}
                      />
                      {/* <h4
                        className={`mb-0 ${isWatchlisted ? "liked-text" : ""}`}
                      > */}
                      {isWatchlisted ? "Watchlisted" : "Watchlist"}
                      {/* </h4> */}
                    </button>
                    <button
                      className={`d-flex justify-content-center align-items-center watchlist-btn me-3 w-100 ${
                        isLiked ? "liked" : ""
                      }`}
                      disabled={disableLike}
                      onClick={handleLike}
                    >
                      <FiThumbsUp
                        size={20}
                        className={`watchlist-icon me-2 ${
                          isLiked ? "liked-text" : ""
                        }`}
                      />
                      {/* <h4 className={`mb-0 ${isLiked ? "liked-text" : ""}`}> */}
                      {isLiked ? "Liked" : "Like"}
                      {/* </h4> */}
                    </button>
                    {/* <div>
                      <FaEllipsisV size={20} className="menu-btn" />
                    </div> */}
                  </div>
                </div>
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
              <div
                className={`display-type-btn-left ${
                  gridSize === 4 ? "display-type-btn-active" : ""
                }`}
              >
                <BiGridAlt
                  className={`tile-icon  ${gridSize === 4 ? "active" : ""}`}
                  size={24}
                  onClick={() => setGridSize(4)}
                />
              </div>
              <div
                className={`display-type-btn-right  ${
                  gridSize === 3 ? "display-type-btn-active" : ""
                }`}
              >
                <BiGrid
                  className={`tile-icon  ${gridSize === 3 ? "active" : ""}`}
                  size={24}
                  onClick={() => setGridSize(3)}
                />
              </div>
            </div>
          </div>
          <div className="d-flex justyfy-content-between align-items-center order-3">
            <div style={{ display: toggleSearchBox ? "block" : "none" }}>
              <input
                type="text"
                placeholder="Search Item..."
                onChange={(e) => setKeyword(e.target.value)}
                className="form-control rounded-pill border-blue"
              />
            </div>
            <div>
              <FiSearch
                size={20}
                className="mx-2 menu-btn border-blue"
                onClick={() => setToggleSearchBox(!toggleSearchBox)}
              />
            </div>
            {/* <div>
              <BiSliderAlt size={20} className="mx-2 menu-btn border-blue" />
            </div> */}
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
              <FiSearch
                size={20}
                className="mx-2 menu-btn border-blue"
                onClick={() => setToggleSearchBox(!toggleSearchBox)}
              />
            </div>
            <div>
              <BiSliderAlt size={20} className="mx-2 menu-btn border-blue" />
            </div>
          </div>
        </div>
        <br />
        <div style={{ display: toggleSearchBox ? "block" : "none" }}>
          <input
            type="text"
            placeholder="Search Item..."
            onChange={(e) => setKeyword(e.target.value)}
            className="form-control rounded-pill border-blue"
            style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
          />
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
      {activeTab === 1 ? (
        <div>
          {items ? (
            <Items data={items} searchKeyword={keyword} gridSize={gridSize} />
          ) : (
            <ItemsLoader />
          )}
        </div>
      ) : (
        <section className="tf-section today-pick pt-0">
          <div className="themesflat-container">
            <div className="row p-md-10">
              <div className="activity-container">
                <div>
                  <h3 className="tf-title text-start mb-0 mt-2">
                    Item Activity
                  </h3>
                </div>
                <div className="table-responsive">
                  <table
                    cellSpacing="0"
                    cellPadding="0"
                    className="table activity-table"
                  >
                    <thead>
                      <tr>
                        <th>
                          <p className="content font-12 mb-0 pb-0 font-14">
                            Event
                          </p>
                        </th>
                        <th>
                          <p className="content font-12 mb-0 pb-0 font-14">
                            Item
                          </p>
                        </th>
                        <th>
                          <p className="content font-12 mb-0 pb-0 font-14">
                            Quantity
                          </p>
                        </th>
                        <th>
                          <p className="content font-12 mb-0 pb-0 font-14">
                            Price
                          </p>
                        </th>
                        <th>
                          <p className="content font-12 mb-0 pb-0 font-14">
                            From
                          </p>
                        </th>
                        <th>
                          <p className="content font-12 mb-0 pb-0 font-14">
                            To
                          </p>
                        </th>
                        <th>
                          <p className="content font-12 mb-0 pb-0 font-14">
                            Date
                          </p>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {nftTransfers &&
                        nftTransfers.map((nftTransfer) =>
                          nftTransfer.metadata ? (
                            <tr>
                              <td>
                                <HiShoppingCart
                                  className="d-inline"
                                  size={18}
                                  style={{ color: "var(--primary-color2)" }}
                                />
                                &nbsp;
                                <p className="activity-content gilroy-semibold mb-2 pb-4 text-16 d-inline">
                                  Transfer
                                </p>
                              </td>
                              <td>
                                <img
                                  src={
                                    JSON.parse(
                                      nftTransfer.metadata,
                                    ).image.substring(0, 7) === "ipfs://"
                                      ? `https://ipfs.io/ipfs/${JSON.parse(
                                          nftTransfer.metadata,
                                        ).image.substring(
                                          7,
                                          JSON.parse(nftTransfer.metadata).image
                                            .length,
                                        )}`
                                      : JSON.parse(nftTransfer.metadata).image
                                  }
                                  // src={JSON.parse(nftTransfer.metadata).image}
                                  style={{
                                    width: "30px",
                                    borderRadius: "10px",
                                  }}
                                  className="d-inline"
                                />
                                &nbsp;
                                <p className="activity-content gilroy-semibold mb-2 pb-4 text-16 d-inline">
                                  {JSON.parse(nftTransfer.metadata).name}
                                </p>
                              </td>
                              <td>
                                <p className="activity-content gilroy-semibold mb-2 pb-4 text-16">
                                  1
                                </p>
                              </td>
                              <td>
                                <ETHLogo className="d-inline" />{" "}
                                <p className="activity-content gilroy-semibold mb-2 pb-4 text-16 d-inline">
                                  9.85
                                </p>
                              </td>
                              <td>
                                <p className="activity-content gilroy-semibold mb-2 pb-4 text-16">
                                  {`${nftTransfer.from_address
                                    .substring(2, 8)
                                    .toUpperCase()}...${nftTransfer.from_address
                                    .substring(39, 42)
                                    .toUpperCase()}`}
                                </p>
                              </td>
                              <td>
                                <p className="activity-content gilroy-semibold mb-2 pb-4 text-16">
                                  {`${nftTransfer.to_address
                                    .substring(2, 8)
                                    .toUpperCase()}...${nftTransfer.to_address
                                    .substring(39, 42)
                                    .toUpperCase()}`}
                                </p>
                              </td>
                              <td>
                                <p className="activity-content gilroy-semibold mb-2 pb-4 text-16 text-primary">
                                  {moment(
                                    nftTransfer.block_timestamp,
                                  ).fromNow()}
                                </p>
                              </td>
                            </tr>
                          ) : (
                            <></>
                          ),
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
              <br />
              <div className="col-md-12 wrap-inner load-more text-center">
                <Link
                  to="#"
                  id="load-more"
                  className="sc-button loadmore fl-button pri-3"
                  onClick={loadMore}
                >
                  <span>Load More</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* <PopularCollection data={popularCollectionData} /> */}
    </Layout>
  );
};

export default Collection;
