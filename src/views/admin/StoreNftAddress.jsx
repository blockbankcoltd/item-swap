import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import "react-tabs/style/react-tabs.css";
import img1 from "../../assets/images/box-item/image-box-6.jpg";
import avt from "../../assets/images/avatar/avt-9.jpg";
import {
  useMoralis,
  useMoralisFile,
  useNewMoralisObject,
  useWeb3Contract,
  useWeb3ExecuteFunction,
} from "react-moralis";

const StoreNftAddress = () => {
  const [nftAddress, setNftAddress] = useState("");
  const [nftAddressError, setNftAddressError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();
  const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
  const { isSaving, error: objError, save } = useNewMoralisObject("games");

  const {
    data,
    error: ethContractError,
    fetch,
    isFetching,
    isLoading,
  } = useWeb3ExecuteFunction();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // console.log(itemName);
    // console.log(itemFile);
  }, [isAuthenticated, isWeb3Enabled]);

  const handleAddressInput = (e) => {
    if (e.target.value) setNftAddressError("");
    setNftAddress(e.target.value);
  };

  const handleCreateItem = async () => {
    setSuccessMsg("");
    // console.log(itemFile);
    if (!nftAddress)
      return setNftAddressError("Collection address is required!");

    let collectionData = {
      collectionAddress: nftAddress,
      status: "",
      isActive: true,
    };
    await save(collectionData);
    setNftAddress("");
    setSuccessMsg("Collection added successfully.");
    console.log("Success", collectionData);
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
                <h1 className="heading text-center">Add New Collection</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-9 col-lg-6 col-md-12 col-12">
              <div className="form-create-item">
                <div className="flat-tabs tab-create-item">
                  <form action="#">
                    {/* <h4 className="title-create-item">Price</h4> */}

                    {/* <h4 className="title-create-item">Title</h4>
                    <input
                      type="text"
                      placeholder="Item Name"
                      onChange={(e) => setItemName(e.target.value)}
                    /> */}

                    <h4 className="title-create-item">Collection Address</h4>
                    <input
                      type="text"
                      placeholder="Collection Address"
                      required
                      onChange={(e) => handleAddressInput(e)}
                      className="mb-0"
                      value={nftAddress}
                    />
                    <small style={{ color: "red" }}>{nftAddressError}</small>
                    <small style={{ color: "green" }}>{successMsg}</small>
                    <div className="row-form style-12">
                      <div className="inner-row-form">
                        <div
                          className="sc-btn-top mg-r-12 mt-4"
                          id="site-header"
                        >
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
                  </form>
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

export default StoreNftAddress;
