import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { FiGlobe, FiCodesandbox, FiInstagram } from "react-icons/fi";
import { FaFacebookF } from "react-icons/fa";
import { BsBookmarkDash } from "react-icons/bs";
import { FaEllipsisV } from "react-icons/fa";
import { BiGridAlt, BiGrid, BiSliderAlt } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

const Collection = () => {
  //ACTIVE TAB
  const [activeTab, setActiveTab] = useState(2);

  return (
    <Layout>
      <div className="tf-section tf-item-details">
        <div className="themesflat-container mt-5 pb-5">
          <div className="row">
            {/* <div className="col-xl-1 col-md-1"></div> */}
            <div className="col-lg-7 col-md-12 pe-md-5 mb-sm-4">
              <div className="content-left ml-5 d-flex flex-column justify-content-between h-100">
                {/* Author */}
                <div className="d-flex justify-content-start align-items-center">
                  <div>
                    <img src={author} />
                  </div>
                  <div>
                    <div className="d-flex align-items-center">
                      <h2 className="tf-title pad-l-15 mb-0 pb-1 gilroy-bold">
                        Samson Frost
                      </h2>
                      <BsPatchCheckFill
                        className="text-golden mg-l-8"
                        size={32}
                      />
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="content pad-l-15 mb-0 gilroy-normal">
                        Created by @team_frost
                      </p>
                      <BsPatchCheckFill
                        className="text-info mg-l-8"
                        size={18}
                      />
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className="sc-card-product-1">
                  <div className="d-flex">
                    <div className="flex-fill py-4 card-gredient-1 border-top-left-radius">
                      <div className="border-right">
                        <h3 className="cd-stats gilroy-bold mb-0 pb-0 line-height">
                          10.0k
                        </h3>
                        <p className="content text-center gilroy-semibold font-12 mb-0 pb-0">
                          ITEMS
                        </p>
                      </div>
                    </div>
                    <div className="flex-fill py-4 card-gredient-2">
                      <div className="border-right">
                        <h3 className="cd-stats gilroy-bold mb-0 pb-0 line-height">
                          5.5k
                        </h3>
                        <p className="content text-center gilroy-semibold font-12 mb-0 pb-0">
                          OWNER
                        </p>
                      </div>
                    </div>
                    <div className="flex-fill py-4 card-gredient-3">
                      <div className="border-right">
                        <h3 className="cd-stats gilroy-bold mb-0 pb-0 line-height">
                          27.68
                        </h3>
                        <p className="content text-center gilroy-semibold font-12 mb-0 pb-0">
                          FLOOR PRICE
                        </p>
                      </div>
                    </div>
                    <div className="flex-fill py-4 card-gredient-4 border-top-right-radius">
                      <div>
                        <h3 className="cd-stats gilroy-bold mb-0 pb-0 line-height">
                          267.8k
                        </h3>
                        <p className="content text-center gilroy-semibold font-12 mb-0 pb-0">
                          VOLUME TRADED
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="sc-card-product-2"
                    style={{ height: "3px" }}
                  ></div>
                  <div className="collection-desc gilroy-normal">
                    <p className=" font-15">
                      Samson starts with a collection of 10,000 avatars that
                      give you membership access to The Garden: a corner of the
                      internet where artists, builders, & web enthusiasts meet
                      to create a decentralize future. holders receive access to
                      exclusive drops, experiences, and more. Visit azuki.com
                      for more details.
                    </p>
                  </div>
                </div>
                {/* Links */}
                <div className="d-sm-flex justify-content-between align-items-center">
                  <div className="d-flex justify-content-center align-items-center">
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
                  </div>
                  <br />
                  <div className="d-flex justify-content-around align-items-center">
                    <div className="d-flex justify-content-center align-items-center watchlist-btn me-3 w-100">
                      <BsBookmarkDash
                        size={20}
                        className="watchlist-icon me-2"
                      />
                      <h4 className="mb-0">Watchlist</h4>
                    </div>
                    <div>
                      <FaEllipsisV size={20} className="menu-btn" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-12" style={{ zIndex: "999" }}>
              <div className="content-right">
                <div className="row">
                  <div className="col-6 px-3 ps-5">
                    <div className="media" style={{ position: "relative" }}>
                      <img
                        src={nft1}
                        className="border-radius-30"
                        alt="Axies"
                      />
                      <img className="dotted-pattern-bg-1" src={dotPattern} />
                      <div class="bottom-left-text-overlay gilroy-bold font-18 text-white">
                        #2436
                      </div>
                    </div>
                  </div>
                  <div className="col-6 px-3 mb-4 pe-5">
                    <div className="media" style={{ position: "relative" }}>
                      <img
                        src={nft2}
                        className="border-radius-30"
                        alt="Axies"
                      />
                      <div class="bottom-left-text-overlay gilroy-bold font-18 text-white">
                        #2436
                      </div>
                    </div>
                  </div>
                  <div className="col-6 px-3 ps-5">
                    <div className="media" style={{ position: "relative" }}>
                      <img
                        src={nft3}
                        className="border-radius-30"
                        alt="Axies"
                      />
                      <div class="bottom-left-text-overlay gilroy-bold font-18 text-white">
                        #2436
                      </div>
                    </div>
                  </div>
                  <div className="col-6 px-3 pe-5">
                    <div className="media" style={{ position: "relative" }}>
                      <img
                        src={nft4}
                        className="border-radius-30"
                        alt="Axies"
                      />
                      <div class="bottom-left-text-overlay gilroy-bold font-18 text-white">
                        #2436
                      </div>
                      <img className="dotted-pattern-bg-2" src={dotPattern} />
                    </div>
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

      <TodayPick />
      <PopularCollection data={popularCollectionData} />
    </Layout>
  );
};

export default Collection;
