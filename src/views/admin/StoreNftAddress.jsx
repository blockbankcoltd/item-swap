import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Table } from "react-bootstrap";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import "react-tabs/style/react-tabs.css";
import "../../customStyle.css";
import {
  useMoralis,
  useMoralisFile,
  useNewMoralisObject,
  useMoralisQuery,
  useWeb3ExecuteFunction,
} from "react-moralis";

const StoreNftAddress = () => {
  const [nftAddress, setNftAddress] = useState("");
  const [nftAddressError, setNftAddressError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [collections, setCollections] = useState([]);
  const [fetchCollection, setFetchCollection] = useState(0);

  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();
  const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
  const { isSaving, error: objError, save } = useNewMoralisObject("Games");

  const {
    data,
    error: ethContractError,
    fetch,
    isFetching,
    isLoading,
  } = useWeb3ExecuteFunction();

  const {
    data: queryResult,
    error: queryError,
    isLoading: queryIsLoading,
  } = useMoralisQuery(
    "Games",
    (query) => {
      return query.descending("createdAt").equalTo("status", "ACTIVE");
    },

    [fetchCollection],
  );
  //   console.log(queryResult, queryError, queryIsLoading);

  const handleIsActive = async (collection) => {
    let collectionObj = queryResult.filter(
      (result) => result.attributes.collectionAddress == collection,
    );
    let action = !collectionObj[0].attributes.isActive;
    collectionObj[0].set("isActive", action);
    await collectionObj[0].save();
  };

  const handleDelete = async (collection) => {
    let collectionObj = queryResult.filter(
      (result) => result.attributes.collectionAddress == collection,
    );
    collectionObj[0].set("status", "DELETED");
    await collectionObj[0].save();
    setFetchCollection(fetchCollection + 1);
  };

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // console.log(itemName);
    // console.log(itemFile);
    if (queryResult) setCollections(queryResult);
  }, [isAuthenticated, isWeb3Enabled, queryResult]);

  const handleAddressInput = (e) => {
    if (e.target.value) setNftAddressError("");
    setNftAddress(e.target.value);
  };

  const handleCreateItem = async () => {
    setSuccessMsg("");
    // console.log(itemFile);
    if (!nftAddress)
      return setNftAddressError("Collection address is required!");

    let isAlreadyExist = queryResult.filter(
      (result) => result.attributes.collectionAddress == nftAddress,
    );

    if (isAlreadyExist.length > 0) {
      setNftAddressError("Collection already exist");
      setTimeout(() => {
        return setNftAddressError("");
      }, 5000);
      return;
    }
    let collectionData = {
      collectionAddress: nftAddress,
      status: "ACTIVE",
      isActive: true,
    };
    await save(collectionData);
    setNftAddress("");
    setSuccessMsg("Collection added successfully.");
    setTimeout(() => {
      setSuccessMsg("");
    }, 5000);
    setFetchCollection(fetchCollection + 1);
    console.log("Success", queryResult);
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
                <h1 className="heading text-center">Collections</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-12"></div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-12">
              <div className="sc-card-product">
                <div className="form-create-item">
                  <div className="flat-tabs tab-create-item">
                    <form action="#">
                      <h4 className="title-create-item tf-title">
                        Add New Collection
                      </h4>
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
                      <div className="row-form style-12 mt-3">
                        <div className="inner-row-form">
                          <div
                            onClick={() => handleCreateItem()}
                            style={{ cursor: "pointer" }}
                            className="sc-button fl-button pri-3 float-right"
                            disabled={isFetching}
                          >
                            <span>Create</span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div className="sc-card-product">
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th className="tf-title" style={{ width: "50%" }}>
                        Collection
                      </th>
                      <th className="tf-title">Status</th>
                      <th className="tf-title">Is Active</th>
                      <th className="tf-title">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collections.map((result, key) => {
                      return (
                        <tr key={key}>
                          <td className="tf-title text-left">
                            {result.attributes.collectionAddress}
                          </td>
                          <td className="tf-title text-left">
                            {result.attributes.status}
                          </td>
                          <td className="text-center">
                            <label className="switch">
                              <input
                                type="checkbox"
                                value={result.attributes.isActive}
                                defaultChecked={result.attributes.isActive}
                                onChange={() =>
                                  handleIsActive(
                                    result.attributes.collectionAddress,
                                  )
                                }
                              />
                              <span className="slider round"></span>
                            </label>
                          </td>
                          <td className="text-center">
                            <div
                              className="sc-button fl-button pri-3"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                handleDelete(
                                  result.attributes.collectionAddress,
                                )
                              }
                            >
                              <span>Delete</span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
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
