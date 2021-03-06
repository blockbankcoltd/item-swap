import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import Countdown from "react-countdown";
import CardModal from "./CardModal";
import { AiOutlineHeart } from "react-icons/ai";
import CollectionLoader from "components/Loader/CollectionLoader";
import nft5 from "../../assets/images/nft/nft5.png";
import userIcon from "../../assets/images/avatar/userIcon.png";
import { useIPFS } from "hooks/useIPFS";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const List = (props) => {
  const { resolveLink } = useIPFS();
  console.log("props", props);
  const data = props.data;
  const title = props.title;
  const market = props.market;

  const [modalShow, setModalShow] = useState(false);
  // return <></>;
  return (
    <Fragment>
      <section className="tf-section live-auctions pt-2">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-live-auctions">
                <h2 className="tf-title pb-20">{title}</h2>
                <Link to="/explore-games" className="exp style2">
                  EXPLORE MORE
                </Link>
              </div>
            </div>
            <div className="col-md-12">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={30}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  767: {
                    slidesPerView: 2,
                  },
                  991: {
                    slidesPerView: 3,
                  },
                  1300: {
                    slidesPerView: 4,
                  },
                }}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
              >
                {data && data.length > 0 ? (
                  data.map((item, index) => {
                    console.log("uer", item, data.gameInfo);
                    return (
                      <SwiperSlide key={index}>
                        <div className="swiper-container show-shadow carousel auctions">
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <div className="slider-item">
                                <Link
                                  to={`/collection/${item.collectionAddress}`}
                                >
                                  <div className="p-3 sc-card-product">
                                    <div className="d-flex justify-content-between mb-2 ms-3 mb-4">
                                      <div className="d-flex align-items-center">
                                        <img
                                          className="sc-card-img"
                                          src={userIcon}
                                        />
                                        <div>
                                          <p className="mb-0 gilroy-normal font-13 line-height creator">
                                            Symbol
                                          </p>
                                          <h5 className="gilroy-semibold font-15">
                                            {market === "opensea"
                                              ? item?.gameInfo
                                                  ?.primary_asset_contracts?.[0]
                                                  ?.symbol
                                              : item?.gameInfo?.symbol}
                                          </h5>
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-end align-items-center likes">
                                        <AiOutlineHeart className="font-14 icon me-1" />
                                        <p className="font-13 m-0">
                                          {item.likes ? item.likes : 0}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="card img-div">
                                      <img
                                        style={{
                                          borderRadius: "15px",
                                          maxHeight: "300px",
                                          minHeight: "300px",
                                        }}
                                        src={
                                          market === "opensea"
                                            ? resolveLink(
                                                item?.gameInfo
                                                  ?.primary_asset_contracts?.[0]
                                                  ?.image_url,
                                              )
                                            : resolveLink(
                                                item?.gameInfo?.meta?.content[0]
                                                  ?.url,
                                              )
                                        }
                                      />
                                      <div className="history-btn">
                                        <a className="my-btn my-btn-clr">
                                          View details
                                        </a>
                                      </div>
                                    </div>
                                    <br />
                                    <h5 className="gilroy-bold">
                                      {market === "opensea"
                                        ? item?.gameInfo?.name
                                        : item?.gameInfo?.meta?.name}
                                    </h5>
                                    <br />
                                    {/* <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <div
                                    className="mb-0 font-13 gilroy-normal"
                                    style={{ color: "var(--primary-color2)" }}
                                  >
                                    Current Bid
                                  </div>
                                  <h4 className="gilroy-bold font-18">
                                    <span
                                      style={{ color: "var(--primary-color2)" }}
                                    >
                                      0.80
                                    </span>
                                    <span
                                      style={{ color: "var(--light-text)" }}
                                    >
                                      {" "}
                                      ETH
                                    </span>
                                  </h4>
                                </div>
                                <div>
                                  <button className="rounded-pill px-5 py-3 sc-card-btn text-white gilroy-bold text-16">
                                    Bid
                                  </button>
                                </div>
                              </div> */}
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })
                ) : (
                  <span style={{ color: "grey" }}>No Data</span>
                )}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

List.propTypes = {
  data: PropTypes.array.isRequired,
};

export default List;
