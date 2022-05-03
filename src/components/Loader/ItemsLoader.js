import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import ItemLoader from "./ItemLoader";

import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

const ItemsLoader = (props) => {
  const data = props.data;
  const title = props.title;

  return (
    <Fragment>
      <section className="tf-section live-auctions">
        <div className="themesflat-container">
          <div className="row p-md-10">
            <div className="col-md-12">
              <div className="heading-live-auctions">
                <h2 className="tf-title pb-20">{title}</h2>
                <Link to="/games" className="exp style2">
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
                <SwiperSlide>
                  <div className="swiper-container show-shadow carousel auctions">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="slider-item">
                          <div className="p-3 sc-card-product">
                            <ItemLoader />
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
                            <ItemLoader />
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
                            <ItemLoader />
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
                            <ItemLoader />
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
    </Fragment>
  );
};

export default ItemsLoader;
