import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import { Container, Row, Col } from "reactstrap";
import { CaretLeftFilled, EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { getNativeByChain } from "../../helpers/networks";
import { getCollectionsByChain } from "../../helpers/collections";
import { useMoralis, useMoralisQuery, useWeb3ExecuteFunction
} from "react-moralis";
import { Modal, Badge, Alert, Spin } from "antd";
import { useNFTTokenIds } from "../../hooks/useNFTTokenIds";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { getExplorer } from "../../helpers/networks";

function NFTTokenIds(props) {
  console.log('props', props);
  const { nftAddress } = props.match.params
  const { NFTTokenIds, totalNFTs, fetchSuccess } = useNFTTokenIds(nftAddress);
  const [visible, setVisibility] = useState(false);
  const [nftToBuy, setNftToBuy] = useState(null);
  const [loading, setLoading] = useState(false);
  const contractProcessor = useWeb3ExecuteFunction();
  const { chainId, marketAddress, contractABI, walletAddress } =
    useMoralisDapp();
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
  const purchaseItemFunction = "createMarketSale";
  async function purchase() {
    setLoading(true);
    const tokenDetails = getMarketItem(nftToBuy);
    const itemID = tokenDetails.itemId;
    const tokenPrice = tokenDetails.price;
    const ops = {
      contractAddress: marketAddress,
      functionName: purchaseItemFunction,
      abi: contractABIJson,
      params: {
        nftContract: nftToBuy.token_address,
        itemId: itemID,
      },
      msgValue: tokenPrice,
    };

    await contractProcessor.fetch({
      params: ops,
      onSuccess: () => {
        console.log("success");
        setLoading(false);
        setVisibility(false);
        updateSoldMarketItem();
        succPurchase();
      },
      onError: (error) => {
        setLoading(false);
        failPurchase();
      },
    });
  }

  const handleBuyClick = (nft) => {
    setNftToBuy(nft);
    console.log(nft.image);
    setVisibility(true);
  };

  function succPurchase() {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: "Success!",
      content: `You have purchased this NFT`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  function failPurchase() {
    let secondsToGo = 5;
    const modal = Modal.error({
      title: "Error!",
      content: `There was a problem when purchasing this NFT`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  }

  async function updateSoldMarketItem() {
    const id = getMarketItem(nftToBuy).objectId;
    const marketList = Moralis.Object.extend("MarketItems");
    const query = new Moralis.Query(marketList);
    await query.get(id).then((obj) => {
      obj.set("sold", true);
      obj.set("owner", walletAddress);
      obj.save();
    });
  }

  const getMarketItem = (nft) => {
    console.log('nft', nft);
    const result = fetchMarketItems?.find(
      (e) =>
        e.nftContract === nft?.token_address &&
        e.tokenId === nft?.token_id &&
        e.sold === false &&
        e.confirmed === true
    );
    console.log('result', result);
    return result;
  };

  return (
    <React.Fragment>
      <Layout>
        <section className="bg-home jss1794" id="home">
          <div className="home-center">
            <div className="home-desc-center">
              <Container>
                <div
                  role="button"
                  className="mb-6 d-flex cursor-pointer align-items-center font-weight-semibold text-info text-medium"
                  onClick={() => {
                    props.history.push("/");
                  }}
                >
                  <CaretLeftFilled />
                  Back to market
                </div>

                {nftAddress !== "explore" && totalNFTs !== undefined && (
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
                )}

                <Row>
                  {nftAddress !== "explore" &&
                    NFTTokenIds.slice(0, 20).map((nft, index) => (
                      <Col lg={3} key={index} className='mt-4'>
                        <div className='itemCard1'>
                          <img src={nft?.image || "error"} alt="image" className='w-100 itemCardImg1' />
                          <div className="d-flex justify-content-between align-items-end">
                            <div>
                              <p className='text-small mt-2'>{nft?.name}</p>
                              {nft.metadata && nft.metadata.name ? (
                                <p className='text-medium mt-1 font-weight-bold text-info'>{nft?.metadata.name}</p>
                              ) : null}
                            </div>
                            <div>
                              <EyeOutlined
                                style={{ marginRight: '5px' }}
                                className="text-medium"
                                onClick={() =>
                                  window.open(
                                    `${getExplorer(chainId)}address/${nft.token_address}`,
                                    "_blank"
                                  )
                                }
                              />
                              <ShoppingCartOutlined
                                className="text-medium"
                                onClick={() => handleBuyClick(nft)}
                              />
                            </div>
                          </div>
                          <hr />
                          <div className='d-flex justify-content-between'>
                            <p>Amount</p>
                            <p>{nft?.amount}</p>
                            {getMarketItem(nft) && (
                              <p>Buy</p>
                            )}
                          </div>
                        </div>
                      </Col>
                    ))}
                </Row>
              </Container>
            </div>
          </div>
        </section>

        {getMarketItem(nftToBuy) ? (
          <Modal
            title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
            visible={visible}
            onCancel={() => setVisibility(false)}
            onOk={() => purchase()}
            okText="Buy"
          >
            <Spin spinning={loading}>
              <div
                style={{
                  width: "250px",
                  margin: "auto",
                }}
              >
                <Badge.Ribbon
                  color="green"
                  text={`${getMarketItem(nftToBuy).price / ("1e" + 18)
                    } ${nativeName}`}
                >
                  <img
                    src={nftToBuy?.image}
                    style={{
                      width: "250px",
                      borderRadius: "10px",
                      marginBottom: "15px",
                    }}
                  />
                </Badge.Ribbon>
              </div>
            </Spin>
          </Modal>
        ) : (
          <Modal
            title={`Buy ${nftToBuy?.name} #${nftToBuy?.token_id}`}
            visible={visible}
            onCancel={() => setVisibility(false)}
            onOk={() => setVisibility(false)}
          >
            <img
              src={nftToBuy?.image}
              style={{
                width: "250px",
                margin: "auto",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            />
            <Alert
              message="This NFT is currently not for sale"
              type="warning"
            />
          </Modal>
        )}
      </Layout>
    </React.Fragment>
  );
}

export default NFTTokenIds;
