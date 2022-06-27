import React from "react";
import { Link } from "react-router-dom";
import Layout from "layout";
import { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import img1 from "../../assets/images/slider/slide_1.png";
import imgbg1 from "../../assets/images/slider/bg_slide_1.png";
import Line_Background from "../../assets/images/item-background/Line_Background.png";
import Dot_right from "../../assets/images/item-background/Dot_Right.png";
import Dot_left from "../../assets/images/item-background/Dot_Left.png";

const StaticPageContainer = () => {
  return (
    <Layout>
      <br />
      <br />
      <br />
      <br />
      <section>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-12 d-flex align-items-center">
              <div
                className=""
                style={{ background: "#F8F8FD", width: "100%" }}
              >
                <div className="row ms-3 mt-5">
                  <div className="col-12 ps-2 pt-2 pb-2">
                    <h5
                      className="ps-3 pt-4 pb-4"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(0, 163, 255, 0) 0%, #0243EA 300%)",
                        borderRight: "6px solid #00A3FF",
                      }}
                    >
                      About Us
                    </h5>
                  </div>
                  <div className="col-12 ps-2 pt-2 pb-2">
                    <h5 className="ps-3 pt-4 pb-4">Guides</h5>
                  </div>
                  <div className="col-12 ps-2 pt-2 pb-2">
                    <h5 className="ps-3 pt-4 pb-4">Contact Us</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StaticPageContainer;
