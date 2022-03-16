import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Accordion } from 'react-bootstrap-accordion'
import Layout from '../../layout';
import { Navigation, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import img1 from '../../assets/images/slider/slide_1.png';
import imgbg1 from '../../assets/images/slider/bg_slide_1.png'
import shape1 from '../../assets/images/backgroup-secsion/bg-gradient1.png'
import shape2 from '../../assets/images/backgroup-secsion/bg-gradient2.png'
import shape3 from '../../assets/images/backgroup-secsion/bg-gradient3.png'
import imgbg from '../../assets/images/backgroup-secsion/img_bg_page_title.jpg'
import NFTTokenIds from "../../components/NFTTokenIds";
const FAQ = () => {
    const [data] = useState(
        [
            {
                key: "0",
                show: "show",
                title: 'What is an NFT?',
                text: 'NFTs or non-fungible tokens, are cryptographic assets on blockchain with unique identification codes and metadata that distinguish them from each other. NFTs are unique and not mutually interchangeable, which means no two NFTs are the same.'
            },
            {
                key: "1",
                title: 'Customer support is available ?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
            },
            {
                key: "2",
                title: 'How do I find my transaction hash?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
            },
            {
                key: "3",
                title: 'What are gas fees on Axies?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
            },
            {
                key: "4",
                title: 'What is the effective staking amount?',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.'
            },
        ]
    )
    return (
        <Layout>
            <Swiper
                modules={[Navigation, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                scrollbar={{ draggable: true }}
            >
                <SwiperSlide>
                    <div className="flat-title-page" style={{ backgroundImage: `url(${imgbg})` }}>
                        <img className="bgr-gradient gradient1" src={shape1} alt="Axies" />
                        <img className="bgr-gradient gradient2" src={shape2} alt="Axies" />
                        <img className="bgr-gradient gradient3" src={shape3} alt="Axies" />
                        <div className="shape item-w-16"></div>
                        <div className="shape item-w-22"></div>
                        <div className="shape item-w-32"></div>
                        <div className="shape item-w-48"></div>
                        <div className="shape style2 item-w-51"></div>
                        <div className="shape style2 item-w-51 position2"></div>
                        <div className="shape item-w-68"></div>
                        <div className="overlay"></div>
                        <div className="swiper-container mainslider home">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="slider-item">
                                        <div className="themesflat-container ">
                                            <div className="wrap-heading flat-slider flex">
                                                <div className="content">
                                                    <h2 className="heading">Discover, Find,</h2>
                                                    <h1 className="heading mb-style"><span className="tf-text s1">Sell extraordinary</span>
                                                    </h1>
                                                    <h1 className="heading">Game NFTs</h1>
                                                    <p className="sub-heading">Marketplace for monster character cllections non fungible token NFTs</p>
                                                    <div className="flat-bt-slider flex style2">
                                                        <Link to="/explore-01" className="sc-button header-slider style style-1 rocket fl-button pri-1"><span>Explore
                                                        </span></Link>
                                                    </div>
                                                </div>
                                                <div className="image">
                                                    <img className="img-bg" src={imgbg1} alt="axies" />
                                                    <img src={img1} alt="axies" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <NFTTokenIds />
            <section className="tf-section wrap-accordion">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="tf-title-heading ct style-2 fs-30 mg-bt-10">
                                Frequently Asked Questions
                            </h2>
                            <h5 className="sub-title help-center mg-bt-32 ">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.
                            </h5>
                        </div>
                        <div className="col-md-12">
                            <div className="flat-accordion2">
                                {
                                    data.map((item, index) => (
                                        <Accordion key={index} title={item.title} >
                                            <p>{item.text}</p>
                                        </Accordion>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default FAQ;
