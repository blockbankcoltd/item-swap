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

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const Loader = (props) => {
  const data = props.data;
  const title = props.title;

  const [modalShow, setModalShow] = useState(false);

  return (
    <Fragment>
      <section className="tf-section live-auctions">
        <div className="themesflat-container">
          <div className="row">
            {/* <div className="col-md-12">
              <div className="heading-live-auctions">
                <h2 className="tf-title pb-20">{title}</h2>
                <Link to="/games" className="exp style2">
                  EXPLORE MORE
                </Link>
              </div>
            </div> */}
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
                <SwiperSlide>
                  <div className="swiper-container show-shadow carousel auctions">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="slider-item">
                          <div className="p-3 sc-card-product">
                            <CollectionLoader />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-container show-shadow carousel auctions">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="slider-item">
                          <div className="p-3 sc-card-product">
                            <CollectionLoader />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-container show-shadow carousel auctions">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="slider-item">
                          <div className="p-3 sc-card-product">
                            <CollectionLoader />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="swiper-container show-shadow carousel auctions">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="slider-item">
                          <div className="p-3 sc-card-product">
                            <CollectionLoader />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </Fragment>
  );
};

export default Loader;
