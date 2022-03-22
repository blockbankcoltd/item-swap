import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import { getCollectionsByChain } from "../../helpers/collections";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { Link, useHistory } from 'react-router-dom'

const App = () => {
    let navigate = useHistory();
    const { chainId, contractABI } = useMoralisDapp();
    const NFTCollections = getCollectionsByChain(chainId);
    console.log('NFTCollections', NFTCollections);

    const [visible, setVisible] = useState(4);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 4);
    }
    return (
        <Layout>
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h1 className="heading text-center">Explore Games</h1>
                            </div>
                            <div className="breadcrumbs style2">
                                <ul>
                                    <li><Link to="/">Home</Link></li>
                                    <li>Explore Games</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="tf-section sc-explore-1">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="wrap-box explore-1 flex mg-bt-40">
                                <div className="seclect-box style-1">
                                    <div id="item_category" className="dropdown">
                                        <Link to="#" className="btn-selector nolink">All categories</Link>
                                        <ul >
                                            <li><span>Art</span></li>
                                            <li className="active"><span>Music</span></li>
                                            <li><span>Domain Names</span></li>
                                            <li><span>Virtual World</span></li>
                                            <li><span>Trading Cards</span></li>
                                            <li><span>Sports</span></li>
                                            <li><span>Utility</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="seclect-box style-2 box-right">
                                    <div id="sort-by" className="dropdown">
                                        <Link to="#" className="btn-selector nolink">Sort by</Link>
                                        <ul >
                                            <li><span>Top rate</span></li>
                                            <li><span>Mid rate</span></li>
                                            <li><span>Low rate</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            NFTCollections && NFTCollections.slice(0, visible).map((nft, index) => (
                                <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                                    <div className={`sc-card-product`} onClick={() => {
                                        navigate.push(`items/${nft?.addrs}`);
                                    }}>
                                        <div className="card-media">
                                            <Link><img src={nft?.image || "error"} alt="axies" /></Link>
                                        </div>
                                        <div className="card-title mb-0">
                                            <h5 className="style2"><Link>{nft.name}</Link></h5>
                                            <div className="tags1">Items - {nft?.item}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            NFTCollections && visible < NFTCollections.length &&
                            <div className="col-md-12 wrap-inner load-more text-center">
                                <Link to="#" id="load-more" className="sc-button loadmore fl-button pri-3" onClick={showMoreItems}><span>Load More</span></Link>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default App;