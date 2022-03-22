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

const FAQ = () => {
    return (
        <Layout>
            <section className="flat-title-page inner" style={{ marginBottom: '200px' }}>
                <div className="overlay"></div>
                <div className="tab-authors">
                    <div className="author-profile flex">
                        <div className="feature-profile">
                            <img src={img1} alt="Axies" className="avatar" />
                        </div>
                        <div className="infor-profile">
                            <span>Author Profile</span>
                            <h2 className="title">Trista Francis</h2>
                            <p className="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</p>
                            <form>
                                <input type="text" className="inputcopy" defaultValue="DdzFFzCqrhshMSxABCdfrge" readOnly />
                                <button type="button" className="btn-copycode"><i className="icon-fl-file-1"></i></button>
                            </form>
                        </div>
                        <div className="widget-social style-3">
                            <ul>
                                <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                                <li className="style-2"><Link to="#"><i className="fab fa-telegram-plane"></i></Link></li>
                                <li><Link to="#"><i className="fab fa-youtube"></i></Link></li>
                                <li className="mgr-none"><Link to="#"><i className="icon-fl-tik-tok-2"></i></Link></li>
                            </ul>
                            <div className="btn-profile"><Link to="/login" className="sc-button style-1 follow">Follow</Link></div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default FAQ;
