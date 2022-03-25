import React, { Fragment } from "react";
import { Link, withRouter } from 'react-router-dom'
import Layout from '../../layout';
import imgbg1 from '../../assets/images/slider/bg_slide_1.png'
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { useNFTTokenIds } from "../../hooks/useNFTTokenIds";
import { useMoralis, useMoralisQuery, useWeb3ExecuteFunction } from "react-moralis";
import { getNativeByChain } from "../../helpers/networks";
function NFTTokenIds(props) {
  const { nftAddress } = props.match.params
  const { NFTTokenIds, totalNFTs, fetchSuccess } = useNFTTokenIds(nftAddress);
  const contractProcessor = useWeb3ExecuteFunction();
  const { chainId, marketAddress, contractABI, walletAddress } = useMoralisDapp();
  const nativeName = getNativeByChain(chainId);
  const contractABIJson = JSON.parse(contractABI);
  const { Moralis } = useMoralis();
  const queryMarketItems = useMoralisQuery("MarketItems");
  const fetchMarketItems = JSON.parse(
    JSON.stringify(queryMarketItems.data, [
      "objectId",
      "createdAt",
      "price",
      "nftContract",
      "itemId",
      "sold",
      "tokenId",
      "seller",
      "owner",
      "confirmed",
    ])
  );
  console.log('asxzxzassa', NFTTokenIds);
  return (
    <Layout>
      <section className="flat-title-page inner" >
        <div className="overlay"></div>
        <div className="tab-authors">
          <div className="author-profile flex">
            {nftAddress && totalNFTs !== undefined && (
              <>
                <div className="feature-profile">
                  <img src={NFTTokenIds[0]?.image || "error"} alt="Axies" className="avatar" />
                </div>
                <div className="infor-profile">
                  <h2 className="title">{NFTTokenIds[0]?.name}</h2>
                  {NFTTokenIds[0] && NFTTokenIds[0].metadata.description ? (<p className="content">{NFTTokenIds[0]?.metadata.description}</p>) : null}
                  <form>
                    <input type="text" className="inputcopy" defaultValue={`Total Items: ${totalNFTs}`} readOnly />
                  </form>
                </div>
                {/* <div className="widget-social style-3">
                  <ul>
                    <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                    <li className="style-2"><Link to="#"><i className="fab fa-telegram-plane"></i></Link></li>
                    <li><Link to="#"><i className="fab fa-youtube"></i></Link></li>
                    <li className="mgr-none"><Link to="#"><i className="icon-fl-tik-tok-2"></i></Link></li>
                  </ul>
                  <div className="btn-profile"><Link to="/login" className="sc-button style-1 follow">Follow</Link></div>
                </div> */}
              </>
            )}


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
            {nftAddress && NFTTokenIds.length && NFTTokenIds.map((nft, index) => (
              <div key={index} className="fl-item col-xl-3 col-lg-4 col-md-6 col-sm-6">
                <div className={`sc-card-product ${nft.name ? 'comingsoon' : ''} `}>
                  <div className="card-media">
                    <Link to="/item-details-01"><img src={nft?.image || "error"} alt="axies" /></Link>
                    <div className="coming-soon">{nft.name}</div>
                  </div>
                  <div className="card-title">
                    <div style={{ width: '100%' }}>
                      <h5 className="style2"><Link to="/item-details-01">{nft?.name}</Link></h5>
                      {nft.metadata && nft.metadata.name ? (
                        <h6 className="style2"><Link to="/item-details-01">{nft?.metadata.name}</Link></h6>
                      ) : null}
                    </div>
                    <div className="tags1">Price: {nft?.amount}</div>
                  </div>
                  <div className="meta-info">
                    <div className="author">
                      <div className="avatar">
                        <img src={nft?.image || "error"} alt="axies" />
                      </div>
                      <div className="info">
                        <span>Owned By</span>
                        <h6> <Link to="/authors-02">{nft.name}</Link> </h6>
                      </div>
                    </div>
                    <div className="price">
                      <span>Current Bid</span>
                      <h5> {nft.name}</h5>
                    </div>
                  </div>
                  <div className="card-bottom">
                    <button className="sc-button style bag fl-button pri-3 no-bg"><span>Place Bid</span></button>
                    <Link to="/activity-01" className="view-history reload">View History</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default withRouter(NFTTokenIds);
