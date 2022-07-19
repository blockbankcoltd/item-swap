import React, { useState, useEffect, useCallback } from "react";
import { useMoralis, useNewMoralisObject } from "react-moralis";
import { useParams, Link } from "react-router-dom";
import debounce from "lodash.debounce";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import Layout from "../../../layout";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import author from "../../../assets/images/avatar/author.png";
import dotPattern from "../../../assets/images/icon/dot-pattern.png";
import pageNotFound from "../../../assets/images/404.png";
import { BsPatchCheckFill } from "react-icons/bs";
import { BiGridAlt, BiGrid } from "react-icons/bi";
import { FiSearch, FiLink2 } from "react-icons/fi";
import Items from "./Items";
import GameDescription from "components/Loader/GameDescription";
import Title from "components/Loader/Title";
import ItemsLoader from "components/Loader/ItemsLoader";
import CollectionThumbnail from "components/Loader/CollectionThumbnail";
import ItemThumbnail from "components/Loader/ItemThumbnail";
import { ETHLogo } from "components/Chains/Logos";
import { useIPFS } from "hooks/useIPFS";
import "react-toastify/dist/ReactToastify.css";

const RarityGameItem = () => {
  const { innerWidth } = window;

  const { save: GameWatchlist } = useNewMoralisObject("GameWatchlist");

  //ACTIVE TAB
  const [activeTab, setActiveTab] = useState(1);
  const [gameData, setGameData] = useState([]);
  const [gameInfo, setGameInfo] = useState(null);
  const [items, setItems] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [toggleSearchBox, setToggleSearchBox] = useState(false);
  const [gridSize, setGridSize] = useState(3);
  const [isCollectionExistOnDb, setIsCollectionExistOnDb] = useState(true);
  const [page, setPage] = useState(2);
  const [pageSize, setPageSize] = useState(2);

  const { tokenAddress } = useParams();
  const { resolveLink } = useIPFS();
  const { Moralis } = useMoralis();

  const notify = () =>
    toast("Link copied!", {
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

  const fetchCollectionMetadata = async () => {
    const RarityGames = Moralis.Object.extend("RarityGames");
    const query = new Moralis.Query(RarityGames);
    query.equalTo("status", "ACTIVE");
    query.equalTo("isActive", true);
    query.equalTo("chain", "0x1");
    query.equalTo("tokenAddress", tokenAddress);

    const results = await query.find();
    return results;
  };

  const fetchCollectionItems = async () => {
    const results = await fetchCollectionMetadata();
    const rarityGameItemsPointerObj = new Moralis.Object.extend("RarityGames");
    const rarityGameItemsPointer = new rarityGameItemsPointerObj();
    rarityGameItemsPointer.id = JSON.parse(JSON.stringify(results[0])).objectId;

    const RarityGameItems = Moralis.Object.extend("RarityGameItems");
    const query1 = new Moralis.Query(RarityGameItems);
    query1.equalTo("RarityGameId", rarityGameItemsPointer);
    query1.limit(pageSize);
    query1.descending("createdAt");

    const results1 = await query1.find();
    return results1;
  };

  const getCollectionData = useCallback(async () => {
    const results = await fetchCollectionMetadata();
    if (results && results.length) {
      setIsCollectionExistOnDb(true);
      setGameData(JSON.parse(JSON.stringify(results[0])));
    } else {
      setIsCollectionExistOnDb(false);
    }

    let results1 = await fetchCollectionItems();
    console.log(results1);
    // results1 = await results1.next();
    if (results1 && results1.length) {
      setItems(JSON.parse(JSON.stringify(results1)));
      console.log(JSON.parse(JSON.stringify(results1)));
    } else {
    }
  }, []);

  const loadMoreItems = async () => {
    const results = await fetchCollectionMetadata();
    const rarityGameItemsPointerObj = new Moralis.Object.extend("RarityGames");
    const rarityGameItemsPointer = new rarityGameItemsPointerObj();
    rarityGameItemsPointer.id = JSON.parse(JSON.stringify(results[0])).objectId;

    const toSkip = (page - 1) * pageSize;
    const RarityGameItems = Moralis.Object.extend("RarityGameItems");
    const query1 = new Moralis.Query(RarityGameItems);
    query1.equalTo("RarityGameId", rarityGameItemsPointer);
    query1.skip(toSkip);
    query1.limit(pageSize);
    query1.descending("createdAt");

    const results1 = await query1.find();
    console.log(results1);
    if (results1 && results1.length) {
      setItems([...items, ...JSON.parse(JSON.stringify(results1))]);
      console.log(JSON.parse(JSON.stringify(results1)));
    } else {
    }
    setPage(page + 1);
  };

  const debouncedSave = useCallback(
    debounce(async (keyword) => {
      const results = await fetchCollectionMetadata();
      const rarityGameItemsPointerObj = new Moralis.Object.extend(
        "RarityGames",
      );
      const rarityGameItemsPointer = new rarityGameItemsPointerObj();
      rarityGameItemsPointer.id = JSON.parse(
        JSON.stringify(results[0]),
      ).objectId;
      const RarityGameItems = Moralis.Object.extend("RarityGameItems");
      const query1 = new Moralis.Query(RarityGameItems);
      query1.equalTo("RarityGameId", rarityGameItemsPointer);
      query1.startsWith("tokenId", keyword);
      query1.descending("createdAt");

      const results1 = await query1.find();
      console.log(results1);
      if (results1) {
        setItems(JSON.parse(JSON.stringify(results1)));
        console.log(JSON.parse(JSON.stringify(results1)));
      } else {
      }
    }, 1000),
    [], // will be created only once initially
  );

  const searchItems = async (e) => {
    const keyword = e.target.value;
    if (keyword) {
      debouncedSave(keyword);
    } else {
      const results1 = await fetchCollectionItems();
      console.log(results1);
      if (results1 && results1.length) {
        setItems(JSON.parse(JSON.stringify(results1)));
        console.log(JSON.parse(JSON.stringify(results1)));
      } else {
      }
    }
  };

  useEffect(() => {
    getCollectionData().catch(console.error);
  }, []);

  // return <></>;
  return (
    <Layout>
      {isCollectionExistOnDb ? (
        <div>
          <div className="tf-section tf-item-details">
            <div className="themesflat-container mt-5 pb-5">
              <div className="row">
                {/* <div className="col-xl-1 col-md-1"></div> */}
                <div
                  className="col-lg-5 col-md-12 order-2"
                  style={{ zIndex: "999" }}
                >
                  <div className="content-right d-none d-lg-block">
                    {gameData && gameData?.metadata ? (
                      <div className="row">
                        <div className="col-6 px-3 ps-5 w-100">
                          <div
                            className="media"
                            style={{ position: "relative" }}
                          >
                            {gameData?.metadata?.imageUrl ? (
                              <img
                                src={resolveLink(
                                  gameData?.metadata?.imageUrl ||
                                    gameData?.metadata?.collection
                                      ?.largeImageUrl,
                                )}
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
                    {gameData && gameData?.metadata ? (
                      <div className="d-flex justify-content-start align-items-center game-header">
                        <div>
                          <img className="game-image" src={author} />
                        </div>
                        <div>
                          <div className="d-flex align-items-center">
                            <h2 className="tf-title pad-l-15 mb-0 pb-1 gilroy-bold game-heading">
                              {gameData?.metadata?.collection?.name}
                            </h2>
                            <BsPatchCheckFill
                              className="text-golden mg-l-8"
                              size={32}
                            />
                          </div>
                          {gameData && gameData?.metadata ? (
                            <div className="d-flex align-items-center">
                              <p className="content pad-l-15 mb-0 gilroy-normal">
                                Symbol @
                                {gameData?.metadata?.assetContract?.tokenSymbol}
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

                    <div
                      className="media d-md-block d-lg-none"
                      style={{ position: "relative" }}
                    >
                      {gameData && gameData?.metadata ? (
                        <img
                          src={resolveLink(
                            gameData?.metadata?.imageUrl ||
                              gameData?.metadata?.collection?.largeImageUrl,
                          )}
                          className="border-radius-30 w-100"
                          alt="Axies"
                        />
                      ) : (
                        <ItemThumbnail />
                      )}
                      <img className="dotted-pattern-bg-1" src={dotPattern} />
                      <img className="dotted-pattern-bg-2" src={dotPattern} />
                      <br />
                      <br />
                    </div>
                    {/* Content */}

                    <div className="sc-card-product-1">
                      {console.log(gameData?.metadata)}
                      {gameData && gameData?.metadata?.collection?.stats ? (
                        <div className="d-flex">
                          <div className="flex-fill py-4 card-gredient-1 border-top-left-radius">
                            <div className="border-right">
                              <h3 className="game-text-des cd-stats gilroy-bold mb-0 pb-0 line-height">
                                {
                                  gameData?.metadata?.collection?.stats
                                    ?.total_supply
                                }
                              </h3>
                              <p className="content text-center gilroy-semibold font-12 mb-0 pb-0">
                                ITEMS
                              </p>
                            </div>
                          </div>
                          <div className="flex-fill py-4 card-gredient-2">
                            <div className="border-right">
                              <h3 className="game-text-des cd-stats gilroy-bold mb-0 pb-0 line-height">
                                {
                                  gameData?.metadata?.collection?.stats
                                    ?.num_owners
                                }
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
                                  {gameData?.metadata?.collection?.stats?.average_price?.toFixed(
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
                                {gameData
                                  ? Math?.round(
                                      gameData?.metadata?.collection?.stats
                                        ?.total_volume * 10,
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
                          {gameData || gameData.metadata ? (
                            gameData?.metadata?.collection?.description
                          ) : (
                            <GameDescription />
                          )}
                        </p>
                      </div>
                    </div>
                    {/* Links */}
                    <div className="d-sm-flex justify-content-between align-items-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <CopyToClipboard text={window.location.href}>
                          <div className="social-btn me-3" onClick={notify}>
                            <FiLink2 className="icon" />
                          </div>
                        </CopyToClipboard>
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
                    onChange={searchItems}
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
            </div>
          </section>
          {/* FOR DESKTOP ONLY */}
          {/* FOR MOBILE ONLY */}
          <section className="tf-box-icon1 create style1 tf-section d-md-none">
            <div className="themesflat-container d-flex justify-content-between align-items-center">
              <div className="d-flex justyfy-content-between align-items-center order-1">
                {/* <div className="d-flex justyfy-content-between align-items-center display-type-section">
              <div className="display-type-btn-left display-type-btn-active">
                <BiGridAlt className="tile-icon active" size={24} />
              </div>
              <div className="display-type-btn-right">
                <BiGrid className="tile-icon" size={24} />
              </div>
            </div> */}
              </div>
              <div className="d-flex justyfy-content-between align-items-center order-3">
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
            </div>
            <br />
            <div style={{ display: toggleSearchBox ? "block" : "none" }}>
              <input
                type="text"
                placeholder="Search Item..."
                onChange={(e) => setKeyword(e.target.value)}
                className="form-control rounded-pill border-blue"
                style={{
                  width: "80%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
            </div>
            <br />
          </section>
          {/* FOR MOBILE ONLY */}
          {
            activeTab === 1 ? (
              <div>
                {items ? (
                  <Items
                    data={items}
                    searchKeyword={keyword}
                    gridSize={gridSize}
                  />
                ) : (
                  <ItemsLoader />
                )}
                {/* {visible < data.length && ( */}
                <div className="col-md-12 wrap-inner load-more text-center">
                  <Link
                    to="#"
                    id="load-more"
                    className="sc-button loadmore fl-button pri-3"
                    onClick={loadMoreItems}
                  >
                    <span>Load More</span>
                  </Link>
                </div>
                {/* )} */}
                {/* {nextPageCursor ? (
                <div
                  className="col-md-12 wrap-inner load-more text-center"
                  style={{ background: "var(--today-pick)" }}
                >
                  <Link
                    to="#"
                    id="load-more"
                    className="sc-button loadmore fl-button pri-3"
                    onClick={loadMoreItems}
                  >
                    <span>Load More</span>
                  </Link>
                </div>
              ) : (
                <></>
              )} */}
              </div>
            ) : null
            // <section className="tf-section today-pick pt-0">
            //   <div className="pt-4 text-center">
            //     <h5
            //       className="gilroy-normal mb-0"
            //       style={{ color: "var(--primary-color2)" }}
            //     >
            //       Floor Price
            //     </h5>
            //     <div class="d-flex justify-content-center align-items-center">
            //       <FaEthereum size={48} color="#019BFE" />
            //       <h1 className="gilroy-bold mb-0" style={{ color: "#019BFE" }}>
            //         {collectionStats?.floor_price
            //           ? collectionStats?.floor_price
            //           : "---"}
            //       </h1>
            //     </div>
            //   </div>
            //   <div className="themesflat-container">
            //     <div className="row p-md-10 pt-0">
            //       <div className="activity-container">
            //         <div className="d-flex justify-content-between align-items-center">
            //           <h3 className="tf-title text-start mb-0 mt-2"></h3>
            //           {priceGraphData ? (
            //             <ButtonGroup
            //               style={styles.btnGroup}
            //               data-toggle="button"
            //             >
            //               <Button
            //                 onClick={() => {
            //                   setGraphDuration("week");
            //                   handleGraphDuration("week");
            //                 }}
            //                 value="WEEK"
            //                 style={
            //                   graphDuration === "week"
            //                     ? styles.activeButton
            //                     : null
            //                 }
            //               >
            //                 {"1W"}
            //               </Button>
            //               <Button
            //                 onClick={() => {
            //                   setGraphDuration("month");
            //                   handleGraphDuration("month");
            //                 }}
            //                 value="MONTH"
            //                 style={
            //                   graphDuration === "month"
            //                     ? styles.activeButton
            //                     : null
            //                 }
            //               >
            //                 {"1M"}
            //               </Button>
            //               <Button
            //                 onClick={() => {
            //                   setGraphDuration("year");
            //                   handleGraphDuration("year");
            //                 }}
            //                 value="YEAR"
            //                 style={
            //                   graphDuration === "year"
            //                     ? styles.activeButton
            //                     : null
            //                 }
            //               >
            //                 {"1Y"}
            //               </Button>
            //               <Button
            //                 onClick={() => {
            //                   setGraphDuration("all");
            //                   handleGraphDuration("all");
            //                 }}
            //                 value="ALL"
            //                 style={
            //                   graphDuration === "all"
            //                     ? styles.activeButton
            //                     : null
            //                 }
            //               >
            //                 {"All"}
            //               </Button>
            //             </ButtonGroup>
            //           ) : (
            //             <></>
            //           )}
            //         </div>
            //         {priceGraphData ? (
            //           <Fragment>
            //             <br />
            //             <br />
            //             <br />
            //             <div style={{ height: "300px", width: "100%" }}>
            //               <PriceGraph
            //                 data={priceGraphData}
            //                 duration={graphDuration}
            //               />
            //             </div>
            //           </Fragment>
            //         ) : (
            //           <div
            //             className="sc-card-product"
            //             style={{ overflow: "hidden" }}
            //           >
            //             <section
            //               className="tf-section today-pick"
            //               style={{ backgroundColor: "var(--primary-color11)" }}
            //             >
            //               <div className="themesflat-container">
            //                 <p style={{ textAlign: "center" }}>
            //                   Floor chart data not available
            //                 </p>
            //               </div>
            //             </section>
            //           </div>
            //         )}
            //         <h3 className="tf-title text-start mb-0 mt-2">
            //           Item Activity
            //         </h3>
            //         <div className="table-responsive">
            //           <table
            //             cellSpacing="0"
            //             cellPadding="0"
            //             className="table activity-table"
            //           >
            //             <thead>
            //               <tr>
            //                 <th>
            //                   <p className="content font-12 mb-0 pb-0 font-14">
            //                     Event
            //                   </p>
            //                 </th>
            //                 <th>
            //                   <p className="content font-12 mb-0 pb-0 font-14">
            //                     Item
            //                   </p>
            //                 </th>
            //                 <th>
            //                   <p className="content font-12 mb-0 pb-0 font-14">
            //                     Quantity
            //                   </p>
            //                 </th>
            //                 <th>
            //                   <p className="content font-12 mb-0 pb-0 font-14">
            //                     Price
            //                   </p>
            //                 </th>
            //                 <th>
            //                   <p className="content font-12 mb-0 pb-0 font-14">
            //                     From
            //                   </p>
            //                 </th>
            //                 <th>
            //                   <p className="content font-12 mb-0 pb-0 font-14">
            //                     To
            //                   </p>
            //                 </th>
            //                 <th>
            //                   <p className="content font-12 mb-0 pb-0 font-14">
            //                     Date
            //                   </p>
            //                 </th>
            //               </tr>
            //             </thead>
            //             <tbody>
            //               {nftTransfers &&
            //                 nftTransfers.map((nftTransfer, index) =>
            //                   nftTransfer ? (
            //                     <tr key={index}>
            //                       <td>
            //                         <HiShoppingCart
            //                           className="d-inline"
            //                           size={18}
            //                           style={{ color: "var(--primary-color2)" }}
            //                         />
            //                         &nbsp;
            //                         <p className="activity-content gilroy-semibold mb-2 pb-4 text-16 d-inline">
            //                           {nftTransfer?.event_type}
            //                         </p>
            //                       </td>
            //                       <td>
            //                         <img
            //                           src={resolveLink(
            //                             nftTransfer?.asset?.image_thumbnail_url,
            //                           )}
            //                           style={{
            //                             width: "30px",
            //                             borderRadius: "10px",
            //                           }}
            //                           className="d-inline"
            //                         />
            //                         &nbsp;
            //                         <p className="activity-content gilroy-semibold mb-2 pb-4 text-16 d-inline">
            //                           {nftTransfer?.asset?.name}
            //                         </p>
            //                       </td>
            //                       <td>
            //                         <p className="activity-content gilroy-semibold mb-2 pb-4 text-16">
            //                           {nftTransfer?.quantity}
            //                         </p>
            //                       </td>
            //                       <td>
            //                         <ETHLogo className="d-inline" />{" "}
            //                         <p className="activity-content gilroy-semibold mb-2 pb-4 text-16 d-inline">
            //                           {nftTransfer.event_type != "transfer" ||
            //                           nftTransfer.event_type != "cancelled"
            //                             ? Moralis.Units.FromWei(
            //                                 nftTransfer.bid_amount ||
            //                                   nftTransfer.starting_price ||
            //                                   nftTransfer.total_price ||
            //                                   0,
            //                               )
            //                             : ""}
            //                         </p>
            //                       </td>
            //                       <td>
            //                         <p className="activity-content gilroy-semibold mb-2 pb-4 text-16">
            //                           {nftTransfer?.from_account?.user?.username
            //                             ? `${nftTransfer?.from_account?.user?.username
            //                                 .substring(0, 6)
            //                                 .toUpperCase()}...`
            //                             : `${nftTransfer?.from_account?.address
            //                                 .substring(2, 8)
            //                                 .toUpperCase()}...${nftTransfer?.from_account?.address
            //                                 .substring(39, 42)
            //                                 .toUpperCase()}`}
            //                         </p>
            //                       </td>
            //                       <td>
            //                         <p className="activity-content gilroy-semibold mb-2 pb-4 text-16">
            //                           {nftTransfer?.to_account
            //                             ? nftTransfer?.to_account?.user
            //                                 ?.username
            //                               ? `${nftTransfer?.to_account?.user?.username
            //                                   .substring(0, 6)
            //                                   .toUpperCase()}...`
            //                               : `${nftTransfer?.to_account?.address
            //                                   .substring(2, 8)
            //                                   .toUpperCase()}...${nftTransfer?.to_account?.address
            //                                   .substring(39, 42)
            //                                   .toUpperCase()}`
            //                             : ""}
            //                         </p>
            //                       </td>
            //                       <td>
            //                         <p className="activity-content gilroy-semibold mb-2 pb-4 text-16 text-primary">
            //                           {moment(
            //                             nftTransfer.event_timestamp,
            //                           ).fromNow()}
            //                         </p>
            //                       </td>
            //                     </tr>
            //                   ) : (
            //                     <></>
            //                   ),
            //                 )}
            //             </tbody>
            //           </table>
            //         </div>
            //       </div>
            //       <br />
            //       <div className="col-md-12 wrap-inner load-more text-center">
            //         <Link
            //           to="#"
            //           id="load-more"
            //           className="sc-button loadmore fl-button pri-3"
            //           onClick={loadMoreActivity}
            //         >
            //           <span>Load More</span>
            //         </Link>
            //       </div>
            //     </div>
            //   </div>
            // </section>
          }
          {/* <PopularCollection data={popularCollectionData} /> */}
        </div>
      ) : (
        <div className="tf-section tf-item-details">
          <div className="mt-5 pt-5">
            <h1
              className="text-center tont-72 gilroy-bold"
              style={{ color: "var(--primary-color2)" }}
            >
              404
            </h1>
            <h5 className="text-center tont-72 gilroy-bold title-widget fw-bold">
              Page not found
            </h5>
            <img
              src={pageNotFound}
              className="d-block"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default RarityGameItem;
