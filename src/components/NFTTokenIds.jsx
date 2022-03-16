import React, { Fragment } from "react";
import { getCollectionsByChain } from "helpers/collections";
import { Row, Col } from "reactstrap";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { Link } from 'react-router-dom'

function NFTTokenIds(props) {
    const { chainId, contractABI } = useMoralisDapp();
    const contractABIJson = JSON.parse(contractABI);
    const NFTCollections = getCollectionsByChain(chainId);
    console.log('====================================');
    console.log(NFTCollections);
    console.log('====================================');
    return (
        <Fragment>

            <section className="tf-section today-pick">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="heading-live-auctions mg-bt-21">
                                <h2 className="tf-title pad-l-7">
                                    Today's Picks
                                </h2>
                                <Link to="/explore-03" className="exp style2">EXPLORE MORE</Link>
                            </div>
                        </div>
                        {
                            NFTCollections?.map((nft, index) => (
                                <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                    <div className={`sc-card-product`}>
                                        <div className="card-media">
                                            <Link to="/item-details-01"><img src={nft?.image || "error"} alt="axies" /></Link>
                                            {/* <Link to="/login" className="wishlist-button heart"><span className="number-like">{item.wishlist}</span></Link> */}
                                            {/* <div className="coming-soon">{item.feature}</div> */}
                                        </div>
                                        <div className="card-title">
                                            <h5 className="style2"><Link to="/item-details-01">"{nft.name}"</Link></h5>
                                            <div className="tags">{nft?.addrs}</div>
                                        </div>
                                        {/* <div className="meta-info">
                                            <div className="author">
                                                <div className="info">
                                                    <span>Owned By</span>
                                                    <h6> <Link to="/authors-02">{item.nameAuthor}</Link> </h6>
                                                </div>
                                            </div>
                                            <div className="price">
                                                <span>Current Bid</span>
                                                <h5> 123</h5>
                                            </div>
                                        </div>
                                        <div className="card-bottom">
                                            <button className="sc-button style bag fl-button pri-3 no-bg" ><span>Place Bid</span></button>
                                            <Link to="/activity-01" className="view-history reload">View History</Link>
                                        </div> */}
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
