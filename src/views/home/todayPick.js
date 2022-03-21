import React, { Fragment } from "react";
import { getCollectionsByChain } from "../../helpers/collections";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { Link, useHistory } from 'react-router-dom'

function NFTTokenIds(props) {
    let navigate = useHistory();
    const { chainId, contractABI } = useMoralisDapp();
    const NFTCollections = getCollectionsByChain(chainId);
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
                                    <div className={`sc-card-product`} onClick={() => {
                                        navigate.push(`items/${nft?.addrs}`);
                                    }}>
                                        <div className="card-media">
                                            <Link to="#"><img src={nft?.image || "error"} alt="axies" /></Link>
                                        </div>
                                        <div className="card-title mb-0">
                                            <h5 className="style2"><Link to="#">{nft.name}</Link></h5>
                                            <div className="tags1">Items - {nft?.item}</div>
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
