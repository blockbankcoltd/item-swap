import React, { useState, useCallback, useEffect } from "react";
import { Link, useLocation, withRouter } from "react-router-dom";
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
import { connect, useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { searchGame } from "../../redux/actions";
import Game from "components/Game";

function Games(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const activeMarket = localStorage.getItem("activeMarket");

  console.log("location", props);
  let searchText = props.match.params.keyword;
  let callback = () => {
    console.log("searchKey", props);
    // props.history.push(`/explore-games`);
  };

  useEffect(() => {
    dispatch(searchGame({ searchText, callback }));
  }, []);

  const gameList = () => {
    const { searchedGame, loading } = props.gameUser;
    if (loading) {
      return <Loader />;
    } else if (searchedGame && searchedGame.length > 0) {
      console.log("searchedGame", searchedGame);
      return searchedGame.map((nft, index) => (
        <Game data={nft} market={activeMarket} key={index} />
      ));
    } else {
      return <p>No Game found</p>;
    }
  };
  return (
    <Layout>
      <section className="flat-title-page inner">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">GAME MARKETPLACE</h1>
              </div>
              <div className="flex" style={{ justifyContent: "center" }}>
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
      <section className="tf-section today-pick">
        <div className="themesflat-container">
          <div className="row p-md-10">
            {gameList()}
            {/* {data.map((data, index) => (
                            <div className="col-md-3 px-3 my-4">
                                <Link to={`/collection/${data.gameInfo.tokenAddress}`}>
                                    <div className="p-3 sc-card-product">
                                        <div className="d-flex justify-content-between mb-2 ms-3 mb-4">
                                            <div className="d-flex align-items-center">
                                                <img
                                                    className="sc-card-img"
                                                    src={data.gameInfo.owner.profile_img_url}
                                                />
                                                <div>
                                                    <p className="mb-0 gilroy-normal font-13 line-height creator">
                                                        Creator
                                                    </p>
                                                    <h5 className="gilroy-semibold font-15">
                                                        {data.gameInfo.assetContract.tokenSymbol}
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end align-items-center likes">
                                                <AiOutlineHeart className="font-14 icon me-1" />
                                                <p className="font-13 m-0">{data.likes ? data.likes : 0}</p>
                                            </div>
                                        </div>
                                        <div className="card img-div">
                                            <img
                                                style={{
                                                    borderRadius: "15px",
                                                    maxHeight: "300px",
                                                    minHeight: "300px",
                                                }}
                                                src={data.gameInfo.assetContract.imageUrl}
                                            />
                                            <div className="history-btn">
                                                <button className="my-btn">View</button>
                                            </div>
                                        </div>
                                        <br />
                                        <h5 className="gilroy-bold">{data.gameInfo.assetContract.name}</h5>
                                        <br />
                                    </div>
                                </Link>
                            </div>
                        ))} */}
          </div>
        </div>
      </section>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return { ...state };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Games));
