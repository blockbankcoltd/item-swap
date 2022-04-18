import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import Countdown from "react-countdown";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import img1 from "../../assets/images/box-item/image-box-6.jpg";
import avt from "../../assets/images/avatar/avt-9.jpg";
import axios from "axios";
import {
  useMoralis,
  useMoralisFile,
  useNewMoralisObject,
  useWeb3Contract,
  useWeb3ExecuteFunction,
} from "react-moralis";

const BulkUpload = () => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemFile, setItemFile] = useState([]);
  const [metaDataUrl, setMetaDataUrl] = useState(null);

  const contractAddress = "0x7DaC127997a70455166702310560E089b650d1B2";
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();
  const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
  const { isSaving, error: objError, save } = useNewMoralisObject("Item");

  // const {
  //   data,
  //   error: ethContractError,
  //   runContractFunction,
  //   isFetching,
  //   isLoading,
  // } = useWeb3Contract();

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
    // console.log("e", e.target.files);
    let files = e.target.files;
    let ipfsArray = [];
    let promises = [];

    for (let i = 0; i < files.length; i++) {
      promises.push(
        new Promise((res, rej) => {
          getBase64(files[i])
            .then((result) => {
              //   setItemFile([
              //     ...itemFile,
              //     { path: `images/${files[i].name}`, content: result },
              //   ]);
              ipfsArray.push({
                path: `images/${e.target.files[i].name}`,
                content: result,
              });
              res();
            })
            .catch((err) => {
              console.log(err);
            });
        }),
      );
    }

    Promise.all(promises).then(() => {
      console.log(ipfsArray);
      setItemFile(ipfsArray);
    });
    console.log(ipfsArray.length);
    // let file = e.target.files[0];

    // getBase64(file)
    //   .then((result) => {
    //     setItemFile(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // this.setState({
    //   file: e.target.files[0],
    // });
  };

  // useEffect(() => {
  //   if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
  //   // console.log(itemName);
  //   // console.log(itemFile);
  // }, [isAuthenticated, isWeb3Enabled, itemName, itemFile]);

  const handleCreateItem = async () => {
    axios
      .post(
        "https://deep-index.moralis.io/api/v2/ipfs/uploadFolder",
        itemFile,
        {
          headers: {
            "X-API-KEY":
              "yGjmHX9i22HqswK6t4y97f2kv6moPannGeAvPuWel2pQmQKWma4DmjvGPMFTL15s",
            "Content-Type": "application/json",
            accept: "application/json",
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        let metadataArray = [];
        let promises = [];
        promises.push(
          new Promise((res, rej) => {
            response.data.forEach((element) => {
              let fileName = `metadata/${element.path.substring(
                element.path.lastIndexOf("/") + 1,
                element.path.length,
              )}`;
              let path = `${fileName.substr(
                0,
                fileName.lastIndexOf("."),
              )}.json`;
              console.log(path);
              metadataArray.push({
                path,
                content: {
                  image: element.path,
                  name: itemName,
                  description: itemDescription,
                },
              });
              res();
            });
          }),
        );
        Promise.all(promises).then(() => {
          axios
            .post(
              "https://deep-index.moralis.io/api/v2/ipfs/uploadFolder",
              metadataArray,
              {
                headers: {
                  "X-API-KEY":
                    "yGjmHX9i22HqswK6t4y97f2kv6moPannGeAvPuWel2pQmQKWma4DmjvGPMFTL15s",
                  "Content-Type": "application/json",
                  accept: "application/json",
                },
              },
            )
            .then(async (res) => {
              console.log("metadata", res);
              for (let i = 0; i < res.data.length; i++) {
                let itemData = {
                  game: "DemoGame",
                  name: itemName,
                  description: itemDescription,
                  metaDataFilePath: res.data[i].path,
                };
                await save(itemData);
                console.log(itemData);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // let itemFileJSON = { base64: itemFile };
    // const itemFileSave = await saveFile("batman.jpg", itemFileJSON, {
    //   saveIPFS: true,
    //   throwOnError: true,
    //   useMasterKey: true,
    // });

    // let itemFilePath = itemFileSave.ipfs();
    // let itemFileHash = itemFileSave.hash();

    // let itemMetaData = {
    //   name: itemName,
    //   description: itemDescription,
    //   nftFilePath: itemFilePath,
    //   nftFileHash: itemFileHash,
    // };
    // console.log(Buffer.from(JSON.stringify(itemMetaData)).toString("base64"));

    // const nftFileMetaDataFile = await saveFile(
    //   "metadata.json",
    //   {
    //     base64: Buffer.from(JSON.stringify(itemMetaData)).toString("base64"),
    //   },
    //   {
    //     saveIPFS: true,
    //     throwOnError: true,
    //     useMasterKey: true,
    //   },
    // );

    // let nftFileMetaDataFilePath = nftFileMetaDataFile.ipfs();
    // let nftFileMetaDataFileHash = nftFileMetaDataFile.hash();
    // setMetaDataUrl(nftFileMetaDataFilePath);

    // // Contract Prameters
    // const options = {
    //   abi: abi,
    //   contractAddress: contractAddress,
    //   functionName: "createItem",
    //   params: {
    //     uri: nftFileMetaDataFilePath,
    //   },
    // };

    // const nftId = await fetch({ params: options });
    // console.log(ethContractError);
    // console.log(options);
    // console.log(nftId);
    // console.log(data, isFetching, isLoading);
    // let itemData = {
    //   name: itemName,
    //   description: itemDescription,
    //   nftFilePath: itemFilePath,
    //   nftFileHash: itemFileHash,
    //   metaDataFilePath: nftFileMetaDataFilePath,
    //   metaDataFileHash: nftFileMetaDataFileHash,
    //   nftId: nftId,
    //   nftContractAddress: contractAddress,
    // };

    // await save(itemData);
    // console.log("Success", itemData);
  };

  return (
    <div className="create-item">
      <Header />
      <section className="flat-title-page inner">
        <div className="overlay"></div>
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">Create Bulk Item</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-12">
              <h4 className="title-create-item">Preview item</h4>
              <div className="sc-card-product">
                <div className="card-media">
                  <Link to="/item-details-01">
                    <img src={img1} alt="Axies" />
                  </Link>
                  <Link to="/login" className="wishlist-button heart">
                    <span className="number-like"> 100</span>
                  </Link>
                  <div className="featured-countdown">
                    <span className="slogan"></span>
                    <Countdown date={Date.now() + 500000000}>
                      <span>You are good to go!</span>
                    </Countdown>
                  </div>
                </div>
                <div className="card-title">
                  <h5>
                    <Link to="/item-details-01">"Cyber Doberman #766”</Link>
                  </h5>
                  <div className="tags">bsc</div>
                </div>
                <div className="meta-info">
                  <div className="author">
                    <div className="avatar">
                      <img src={avt} alt="Axies" />
                    </div>
                    <div className="info">
                      <span>Owned By</span>
                      <h6>
                        {" "}
                        <Link to="/author-02">Freddie Carpenter</Link>
                      </h6>
                    </div>
                  </div>
                  <div className="price">
                    <span>Current Bid</span>
                    <h5> 4.89 ETH</h5>
                  </div>
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
                      multiple
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
                            <div
                              className="sc-btn-top mg-r-12"
                              id="site-header"
                            >
                              <div
                                onClick={() => handleCreateItem()}
                                className="sc-button fl-button pri-3 float-right"
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
                            <h4 className="title-create-item">
                              Expiration date
                            </h4>
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
                            <h4 className="title-create-item">
                              Expiration date
                            </h4>
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
      <Footer />
    </div>
  );
};

export default BulkUpload;
