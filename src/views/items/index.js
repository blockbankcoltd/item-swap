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
    console.log('asxzxzassa', fetchMarketItems);
    return (
        <Layout>
            <section className="flat-title-page inner" style={{ marginBottom: '200px' }}>
                <div className="overlay"></div>
                <div className="tab-authors">
                    <div className="author-profile flex">
                        {nftAddress && totalNFTs !== undefined && (
                            <>
                                <div className="feature-profile">
                                    <img src={NFTTokenIds[0]?.image || "error"} alt="Axies" className="avatar" />
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
                            </>
                        )}

                        {/* {nftAddress !== "explore" && totalNFTs !== undefined && (
                  <>
                    {!fetchSuccess && (
                      <>
                        <Alert
                          message="Unable to fetch all NFT metadata... We are searching for a solution, please try again later!"
                          type="warning"
                        />
                        <div style={{ marginBottom: "10px" }}></div>
                      </>
                    )}
                    <Row className="d-flex bg-soft-info p-4 btn-rounded align-items-center">
                      <Col md="3" className="item-profile">
                        <img
                          src={NFTTokenIds[0]?.image || "error"}
                          className="btn-rounded"
                        />
                      </Col>
                      <Col md="9" className="info-profile">
                        <p className="text-xlarge font-weight-bold text-info">{`${NFTTokenIds[0]?.name}`}</p>
                        {NFTTokenIds[0] && NFTTokenIds[0].metadata.description ? (<p className="mt-2">{`${NFTTokenIds[0]?.metadata.description}`}</p>) : null}
                        <div style={{ background: '#fff', display: 'inline-block', border: '1px solid #1bbcd5' }} className="btn-rounded px-5 py-2 mt-2">

                          <p className="text-medium font-weight-semibold">Total Items: {`${totalNFTs}`}</p>
                        </div>
                      </Col>
                    </Row>
                  </>
                )} */}
                    </div>
                </div>
            </section>
        </Layout>
    );
}

export default withRouter(NFTTokenIds);
