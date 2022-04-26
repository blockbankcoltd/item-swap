import React, { Fragment } from "react";
import { getCollectionsByChain } from "../../helpers/collections";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import nft5 from "../../assets/images/nft/nft5.png";

function NFTTokenIds(props) {
  let data = props.data;
  console.log("data", props.data);
  let navigate = useHistory();
  const { chainId, contractABI } = useMoralisDapp();
  console.log("asxzxz", useMoralisDapp());
  const NFTCollections = getCollectionsByChain(chainId);
  return (
    <Fragment>
      <section className="tf-section today-pick">
        <div className="themesflat-container">
          <div className="row p-md-10">
            <div className="col-md-12">
              <div className="heading-live-auctions mg-bt-21">
                <h2 className="tf-title pad-l-7">Populer NFTs</h2>
                <Link to="/explore-game" className="exp style2">
                  EXPLORE MORE
                </Link>
              </div>
            </div>
            {data?.slice(0, 8).map((nft, index) => (
              // <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
              //     <div className="sc-card-wrapper">
              //         <div className="card-top-gradient"></div>
              //         <div className={`sc-card-product`} onClick={() => {
              //             navigate.push(`items/${nft?.addrs}`);
              //         }}>
              //             <div className="card-media">
              //                 <Link to="#"><img src={nft?.image || "error"} alt="axies" /></Link>
              //             </div>
              //             <div className="card-title mb-0">
              //                 <h5 className="style2"><Link to="#">{nft.name}</Link></h5>
              //                 <div className="tags1">Items - {nft?.item}</div>
              //             </div>
              //         </div>
              //     </div>
              // </div>

              <div className="col-md-3 px-3 my-4">
                <div className="p-3 sc-card-product">
                  <div className="d-flex justify-content-between mb-2 ms-3 mb-4">
                    <div className="d-flex align-items-center">
                      <img
                        className="sc-card-img"
                        src={nft.owner.profileImage}
                      />
                      <div>
                        <p className="mb-0 gilroy-normal font-13 line-height creator">
                          Creator
                        </p>
                        <h5 className="gilroy-semibold font-15">
                          {nft.owner.username}
                        </h5>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end align-items-center likes">
                      <AiOutlineHeart className="font-14 icon me-1" />
                      <p className="font-13 m-0">3.5k</p>
                    </div>
                  </div>
                  <div className="card img-div">
                    <img style={{ borderRadius: "15px" }} src={nft5} />
                    <div className="history-btn">
                      <button className="my-btn">See History</button>
                    </div>
                  </div>
                  <br />
                  <h5 className="gilroy-bold">{nft.name}</h5>
                  <br />
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div
                        className="mb-0 font-13 gilroy-normal"
                        style={{ color: "var(--primary-color2)" }}
                      >
                        Current Bid
                      </div>
                      <h4 className="gilroy-bold font-18">
                        <span style={{ color: "var(--primary-color2)" }}>
                          0.80
                        </span>
                        <span style={{ color: "var(--light-text)" }}> ETH</span>
                      </h4>
                    </div>
                    <div>
                      <button className="rounded-pill px-5 py-3 sc-card-btn text-white gilroy-bold text-16">
                        Bid
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default NFTTokenIds;
