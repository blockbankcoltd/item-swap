import React, { Fragment } from "react";
import { getCollectionsByChain } from "../../helpers/collections";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { Link, useHistory } from 'react-router-dom'

function NFTTokenIds(props) {
    let navigate = useHistory();
    const { chainId, contractABI } = useMoralisDapp();
    console.log('asxzxz', useMoralisDapp());
    const NFTCollections = getCollectionsByChain(chainId);
    return (
        <Fragment>
            <section className="tf-section today-pick">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-live-auctions mg-bt-21">
                                <h2 className="tf-title pad-l-7">
                                    New Arrivals
                                </h2>
                                <Link to="/explore-game" className="exp style2">Sort By</Link>
                            </div>
                        </div>
                        {
                            NFTCollections?.slice(0, 8).map((nft, index) => (
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

                                <div className="col-md-3">
                                    <div className="p-3 sc-card-product">
                                        <div className="d-flex justify-content-between mb-2">
                                            <div className="d-flex">
                                                <img className="sc-card-img" src="https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg" />
                                                <div>
                                                    <p className="mb-0" style={{ color: '#999' }}>Creator</p>
                                                    <h5>Samson Frost</h5>
                                                </div>
                                            </div>
                                            <div>
                                                <i></i>
                                                <p>3.5k</p>
                                            </div>
                                        </div>
                                        <div>
                                            <img style={{ borderRadius: '15px' }} src="https://www.fivesquid.com/pics/t2/1643282053-191798-1-1.jpg" />
                                            <div>
                                                <button className="my-btn">See History</button>
                                            </div>
                                        </div>
                                        <br />
                                        <h5>Clone Micheno #2586</h5>
                                        <br />
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <p className="mb-0" style={{ color: '#999' }}>Current Bid</p>
                                                <h4><span className="text-white">0.80</span><span style={{ color: '#999' }}>ETH</span></h4>
                                            </div>
                                            <div>
                                                <button className="rounded-pill px-4 py-2 sc-card-btn">Bid</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default NFTTokenIds;
