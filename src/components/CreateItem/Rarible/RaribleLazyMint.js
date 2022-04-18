import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../../layout/header";
import Footer from "../../../layout/footer";
import Countdown from "react-countdown";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import img1 from "../../../assets/images/box-item/image-box-6.jpg";
import avt from "../../../assets/images/avatar/avt-9.jpg";
import {
  useMoralis,
  useMoralisFile,
  useNewMoralisObject,
  useWeb3Contract,
  useWeb3ExecuteFunction,
} from "react-moralis";

const RaribleLazyMint = () => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemFile, setItemFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [metaDataUrl, setMetaDataUrl] = useState(null);

  const {
    Moralis,
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
  } = useMoralis();
  const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
  const { isSaving, error: objError, save } = useNewMoralisObject("Item");

  const {
    data,
    error: ethContractError,
    fetch,
    isFetching,
    isLoading,
  } = useWeb3ExecuteFunction();

  // Convert File to Base64
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const handleFileInputChange = (e) => {
    let file = e.target.files[0];
    setSelectedImage(file);
    getBase64(file)
      .then((result) => {
        setItemFile(result);
      })
      .catch((err) => {
        console.log(err);
      });

    // this.setState({
    //   file: e.target.files[0],
    // });
  };

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // console.log(itemName);
    // console.log(itemFile);
  }, [isAuthenticated, isWeb3Enabled, itemName, itemFile]);

  const handleCreateItem = async () => {
    // console.log(itemFile);
    if (!itemFile) {
      alert("Please select a file!!");
      return;
    }
    // else if (!itemName) {
    //   alert("Please enter file name!!");
    //   return;
    // } else if (!itemPrice) {
    //   alert("Please enter item price!!");
    //   return;
    // }
    let itemFileJSON = { base64: itemFile };
    const itemFileSave = await saveFile("batman.jpg", itemFileJSON, {
      saveIPFS: true,
      throwOnError: true,
      useMasterKey: true,
    });

    let itemFilePath = itemFileSave.ipfs();
    let itemFileHash = itemFileSave.hash();

    let itemMetaData = {
      name: itemName,
      description: itemDescription,
      nftFilePath: itemFilePath,
      nftFileHash: itemFileHash,
    };
    console.log(Buffer.from(JSON.stringify(itemMetaData)).toString("base64"));

    const nftFileMetaDataFile = await saveFile(
      "metadata.json",
      {
        base64: Buffer.from(JSON.stringify(itemMetaData)).toString("base64"),
      },
      {
        saveIPFS: true,
        throwOnError: true,
        useMasterKey: true,
      },
    );

    let nftFileMetaDataFilePath = nftFileMetaDataFile.ipfs();
    let nftFileMetaDataFileHash = nftFileMetaDataFile.hash();
    setMetaDataUrl(nftFileMetaDataFilePath);

    let tokenData = await Moralis.Plugins.rarible.lazyMint({
      chain: "rinkeby",
      userAddress: localStorage.getItem("walletAddress"),
      tokenType: "ERC1155",
      tokenUri: nftFileMetaDataFilePath,
      supply: 100,
      royaltiesAmount: 5,
      // 0.05% royalty. Optional
    });

    console.log("Token Data", tokenData);

    let itemData = {
      name: itemName,
      description: itemDescription,
      nftFilePath: itemFilePath,
      nftFileHash: itemFileHash,
      metaDataFilePath: nftFileMetaDataFilePath,
      metaDataFileHash: nftFileMetaDataFileHash,
      market: "rarible",
      tokenId: tokenData.data.result.tokenId,
      tokenAddress: tokenData.data.result.tokenAddress,
    };

    await save(itemData);
    console.log("Success", itemData);
  };

  return (
    <div className="tf-create-item tf-section">
      <div className="themesflat-container">
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-6 col-12">
            <h4 className="title-create-item">Preview item</h4>
            <div className="sc-card-product">
              <div className="card-media">
                <Link to="/item-details-01">
                  <img
                    src={
                      selectedImage ? URL.createObjectURL(selectedImage) : img1
                    }
                    alt="Axies"
                  />
                </Link>
                {/* <Link to="/login" className="wishlist-button heart">
                    <span className="number-like"> 100</span>
                  </Link> */}
                {/* <div className="featured-countdown">
                    <span className="slogan"></span>
                    <Countdown date={Date.now() + 500000000}>
                      <span>You are good to go!</span>
                    </Countdown>
                  </div> */}
              </div>
              <div className="card-title">
                <h5>
                  <Link to="/item-details-01">{itemName}</Link>
                </h5>
                <div className="tags">bsc</div>
              </div>
              <div className="meta-info">
                <div className="author">
                  {/* <div className="avatar">
                      <img src={avt} alt="Axies" />
                    </div> */}
                  <div className="info">
                    <span>Description</span>
                    <h6>{itemDescription}</h6>
                  </div>
                </div>
                {/* <div className="price">
                    <span>Current Bid</span>
                    <h5> 4.89 ETH</h5>
                  </div> */}
              </div>
              <div className="card-bottom">
                <Link
                  to="/wallet-connect"
                  className="sc-button style bag fl-button pri-3"
                >
                  <span>Place Bid</span>
                </Link>
                <Link to="/activity-01" className="view-history reload">
                  View History
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-6 col-md-12 col-12">
            <div className="form-create-item">
              <form action="#">
                <h4 className="title-create-item">Upload file</h4>
                <label className="uploadFile">
                  <span className="filename">
                    PNG, JPG, GIF, WEBP or MP4. Max 200mb.
                  </span>
                  <input
                    type="file"
                    className="inputfile form-control"
                    name="file"
                    onChange={(e) => handleFileInputChange(e)}
                  />
                </label>
              </form>
              <div className="flat-tabs tab-create-item">
                {/* <h4 className="title-create-item">Select method</h4> */}
                <Tabs>
                  {/* <TabList>
                      <Tab>
                        <span className="icon-fl-tag"></span>Fixed Price
                      </Tab>
                      <Tab>
                        <span className="icon-fl-clock"></span>Time Auctions
                      </Tab>
                      <Tab>
                        <span className="icon-fl-icon-22"></span>Open For Bids
                      </Tab>
                    </TabList> */}

                  <TabPanel>
                    <form action="#">
                      <h4 className="title-create-item">Price</h4>
                      <input
                        type="text"
                        placeholder="Enter price for one item (ETH)"
                        onChange={(e) => setItemPrice(e.target.value)}
                      />

                      <h4 className="title-create-item">Title</h4>
                      <input
                        type="text"
                        placeholder="Item Name"
                        onChange={(e) => setItemName(e.target.value)}
                      />

                      <h4 className="title-create-item">Description</h4>
                      <textarea
                        placeholder="e.g. “This is very limited item”"
                        onChange={(e) => setItemDescription(e.target.value)}
                      ></textarea>
                      <div className="row-form style-12">
                        <div className="inner-row-form">
                          <div className="sc-btn-top mg-r-12" id="site-header">
                            <div
                              onClick={() => handleCreateItem()}
                              className="sc-button fl-button pri-3 float-right"
                              disabled={isFetching}
                            >
                              <span>Create</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="row-form style-3">
                          <div className="inner-row-form">
                            <h4 className="title-create-item">Royalties</h4>
                            <input type="text" placeholder="5%" />
                          </div>
                          <div className="inner-row-form">
                            <h4 className="title-create-item">Size</h4>
                            <input type="text" placeholder="e.g. “size”" />
                          </div>
                          <div className="inner-row-form style-2">
                            <div className="seclect-box">
                              <div id="item-create" className="dropdown">
                                <Link to="#" className="btn-selector nolink">
                                  Abstraction
                                </Link>
                                <ul>
                                  <li>
                                    <span>Art</span>
                                  </li>
                                  <li>
                                    <span>Music</span>
                                  </li>
                                  <li>
                                    <span>Domain Names</span>
                                  </li>
                                  <li>
                                    <span>Virtual World</span>
                                  </li>
                                  <li>
                                    <span>Trading Cards</span>
                                  </li>
                                  <li>
                                    <span>Sports</span>
                                  </li>
                                  <li>
                                    <span>Utility</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div> */}
                    </form>
                  </TabPanel>
                  <TabPanel>
                    <form action="#">
                      <h4 className="title-create-item">Minimum bid</h4>
                      <input type="text" placeholder="enter minimum bid" />
                      <div className="row">
                        <div className="col-md-6">
                          <h5 className="title-create-item">Starting date</h5>
                          <input
                            type="date"
                            name="bid_starting_date"
                            id="bid_starting_date"
                            className="form-control"
                            min="1997-01-01"
                          />
                        </div>
                        <div className="col-md-6">
                          <h4 className="title-create-item">Expiration date</h4>
                          <input
                            type="date"
                            name="bid_expiration_date"
                            id="bid_expiration_date"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <h4 className="title-create-item">Title</h4>
                      <input type="text" placeholder="Item Name" />

                      <h4 className="title-create-item">Description</h4>
                      <textarea placeholder="e.g. “This is very limited item”"></textarea>
                    </form>
                  </TabPanel>
                  <TabPanel>
                    <form action="#">
                      <h4 className="title-create-item">Price</h4>
                      <input
                        type="text"
                        placeholder="Enter price for one item (ETH)"
                      />

                      <h4 className="title-create-item">Minimum bid</h4>
                      <input type="text" placeholder="enter minimum bid" />

                      <div className="row">
                        <div className="col-md-6">
                          <h5 className="title-create-item">Starting date</h5>
                          <input
                            type="date"
                            name="bid_starting_date"
                            id="bid_starting_date2"
                            className="form-control"
                            min="1997-01-01"
                          />
                        </div>
                        <div className="col-md-6">
                          <h4 className="title-create-item">Expiration date</h4>
                          <input
                            type="date"
                            name="bid_expiration_date"
                            id="bid_expiration_date2"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <h4 className="title-create-item">Title</h4>
                      <input type="text" placeholder="Item Name" />

                      <h4 className="title-create-item">Description</h4>
                      <textarea placeholder="e.g. “This is very limited item”"></textarea>
                    </form>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaribleLazyMint;
