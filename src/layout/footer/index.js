import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logodark from "../../assets/images/logo/source/logo-dark.svg";
import logofooter from "../../assets/images/logo/source/logo-light.svg";
const Footer = () => {
  const accountList = [
    {
      title: "Authors",
      link: "/authors-01",
    },
    {
      title: "Collection",
      link: "/wallet-connect",
    },
    {
      title: "Author Profile",
      link: "/edit-profile",
    },
    {
      title: "Create Item",
      link: "/create-item",
    },
  ];
  const resourcesList = [
    {
      title: "Help & Support",
      link: "/help-center",
    },
    // {
    //   title: "Live Auctions",
    //   link: "/live-auctions",
    // },
    // {
    //   title: "Item Details",
    //   link: "/item-details-01",
    // },
    // {
    //   title: "Activity",
    //   link: "/activity-01",
    // },
    {
      title: "FAQ",
      link: "/FAQ",
    },
  ];
  const companyList = [
    {
      title: "Explore",
      link: "/explore-01",
    },
    {
      title: "Contact Us",
      link: "/contact-01",
    },
    {
      title: "Our Blog",
      link: "/blog",
    },
    {
      title: "FAQ",
      link: "/faq",
    },
  ];
  const socialList = [
    {
      icon: "fab fa-twitter",
      link: "https://twitter.com/exnomy",
    },
    {
      icon: "fab fa-telegram-plane",
      link: "https://t.me/exnomy",
    },
    {
      icon: "fab fa-facebook",
      link: "#",
    },
    {
      icon: "fab fa-youtube",
      link: "#",
    },
    {
      icon: "fab fa-medium",
      link: "#",
    },
    {
      icon: "fab fa-instagram",
      link: "#",
    },
    // {
    //   icon: "icon-fl-tik-tok-2",
    //   link: "#",
    // },
    // {
    //   icon: "icon-fl-vt",
    //   link: "#",
    // },
  ];

  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      <footer id="footer" className="footer-light-style clearfix bg-style">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-12 mb-25">
              <div className="widget widget-logo">
                <div className="logo-footer" id="logo-footer">
                  <Link to="/">
                    <img
                      className="logo-dark"
                      id="logo_footer"
                      src={logofooter}
                      style={{ width: "250px" }}
                      alt="nft-gaming"
                    />
                    <img
                      className="logo-light"
                      id="logo_footer"
                      src={logodark}
                      style={{ width: "250px" }}
                      alt="nft-gaming"
                    />
                  </Link>
                </div>
              </div>
              <p className="h4" style={{ lineHeight: 2 }}>
                © Copyright {new Date().getFullYear()} <br />
                All rights reserved.
              </p>
            </div>
            <div className="col-lg-5 col-md-12 col-12">
              <p className="h4" style={{ lineHeight: 1.5 }}>
                The world's new and finest digital marketplace for game NFTs
              </p>

              <div className="row">
                {/* <div className="col-md-4 col-sm-12">
                  <div className="widget widget-menu style-1">
                    <h5 className="title-widget fw-bold">My Account</h5>
                    <ul>
                      {accountList.map((item, index) => (
                        <li key={index}>
                          <Link to={item.link}>{item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div> */}
                <div className="col-md-4 col-sm-12">
                  <div className="widget widget-menu style-2">
                    <h5 className="title-widget fw-bold">Resources</h5>
                    <ul>
                      {resourcesList.map((item, index) => (
                        <li key={index}>
                          <Link to={item.link}>{item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* <div className="col-md-4 col-sm-12">
                  <div className="widget widget-menu fl-st-3">
                    <h5 className="title-widget fw-bold">Company</h5>
                    <ul>
                      {companyList.map((item, index) => (
                        <li key={index}>
                          <Link to={item.link}>{item.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-lg-3 col-md-12 col-12">
              <div className="widget widget-subcribe">
                <h5 className="title-widget fw-bold">Follow us on</h5>
                {/* <p className="my-4">
                  Subscribe to receive fresh update, exclusive offers, latest
                  news, and Arts
                </p> */}
                {/* <div className="form-subcribe">
                  <form
                    id="subscribe-form"
                    action="#"
                    method="GET"
                    acceptCharset="utf-8"
                    className="form-submit"
                  >
                    <input
                      name="email"
                      className="email"
                      type="email"
                      placeholder="info@yourgmail.com"
                      required
                    />
                    <button id="submit" name="submit" type="submit">
                      <i className="icon-fl-send"></i>
                    </button>
                  </form>
                </div> */}
                <div className="widget-social style-1 mg-t32">
                  <ul>
                    {socialList.map((item, index) => (
                      <li key={index}>
                        <a target="_blank" href={item.link}>
                          <i className={item.icon}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {isVisible && <Link onClick={scrollToTop} to="#" id="scroll-top"></Link>}
    </div>
  );
};

export default Footer;
