import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import Header from "../../../layout/header";
import Footer from "../../../layout/footer";
import SuccessModal from "components/SuccessModal";
import "react-tabs/style/react-tabs.css";
import "../../../customStyle.css";
import {
  useMoralis,
  useMoralisFile,
  useNewMoralisObject,
  useMoralisQuery,
  useWeb3ExecuteFunction,
} from "react-moralis";
import axios from "axios";

const CollectionAddress = () => {
  const network = process.env.network;
  const chain = process.env.chain;

  const [nftAddress, setNftAddress] = useState("");
  const [chainInput, setChainInput] = useState(null);
  const [nftAddressError, setNftAddressError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [collections, setCollections] = useState([]);
  const [fetchCollection, setFetchCollection] = useState(0);
  //   console.log(Moralis.Plugins);
  const {
    Moralis,
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
  } = useMoralis();
  const { error, isUploading, moralisFile, saveFile } = useMoralisFile();
  const { isSaving, error: objError, save } = useNewMoralisObject("Games");
  const {
    isSaving: gameItemsIsSaving,
    error: gameItemsError,
    save: gameItemsSave,
  } = useNewMoralisObject("GameItems");

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
      return query
        .descending("createdAt")
        .equalTo("status", "ACTIVE")
        .equalTo("market", "rarible");
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

    // await Moralis.Plugins.rarible.lazyMint({
    //   chain: "eth",
    //   userAddress: "0xaF2d6E51f39B9fF9862f5b991b2F1440513a26f9",
    //   tokenType: "ERC1155",
    //   tokenUri: "/ipfs/QmWLsBu6nS4ovaHbGAXprD1qEssJu4r5taQfB74sCG51tp",
    //   supply: 100,
    //   royaltiesAmount: 5,
    //   // 0.05% royalty. Optional
    // });
  };

  const handleIsHot = async (collection) => {
    let collectionObj = queryResult.filter(
      (result) => result.attributes.collectionAddress == collection,
    );
    let action = !collectionObj[0].attributes.isHot;
    collectionObj[0].set("isHot", action);
    let result = await collectionObj[0].save();
    console.log("result", result);
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

    const options = {
      address: nftAddress,
      chain: "eth",
    };
    const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);

    console.log("NFT ADDRESS", NFTs);

    // const res = await Moralis.Plugins.opensea.getAsset({
    //   network: "mainnet",
    //   tokenAddress: nftAddress,
    //   tokenId: NFTs.result[NFTs.result.length - 1].token_id,
    // });

    // console.log("result", res);

    axios
      .get(`https://api.rarible.org/v0.1/collections/ETHEREUM:${nftAddress}`)
      .then(async (res) => {
        let collectionData = {
          collectionAddress: nftAddress,
          market: "rarible",
          status: "ACTIVE",
          isActive: true,
          likes: 0,
          watchlist: 0,
          gameInfo: res.data,
          chainId: chainInput,
          gameItems: JSON.stringify(NFTs.result),
        };

        await save(collectionData);
        setNftAddress("");
        setSuccessMsg("Collection added successfully.");
        setTimeout(() => {
          setSuccessMsg("");
        }, 5000);
        setFetchCollection(fetchCollection + 1);
        console.log("Success", queryResult);
      });
  };

  return (
    <div>
      {successMsg && (
        <SuccessModal
          show={true}
          title="Collection added successfully"
          description="Opensea collection address added successfully"
        />
      )}
      <div className="tf-create-item tf-section">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-md-12 col-12"></div>
            <div className="col-xl-6 col-lg-6 col-md-12 col-12">
              <div className="sc-card-product p-5">
                <div className="form-create-item">
                  <div className="flat-tabs tab-create-item">
                    <form action="#">
                      <h4 className="title-create-item tf-title">
                        Add New Collection
                      </h4>
                      <div className="row">
                        <div className="col-md-6">
                          <select
                            className="form-control"
                            style={{ height: "44px" }}
                            onChange={(e) => setChainInput(e.target.value)}
                          >
                            <option>Select Chain</option>
                            <option value="0x1">ETH</option>
                            <option value="0x4">Rinkeby</option>
                          </select>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            placeholder="Collection Address"
                            required
                            onChange={(e) => handleAddressInput(e)}
                            className="mb-0"
                            value={nftAddress}
                          />
                        </div>
                      </div>
                      <small style={{ color: "red" }}>{nftAddressError}</small>
                      <small style={{ color: "green" }}>{successMsg}</small>
                      <div className="row-form style-12 mt-3">
                        <div className="inner-row-form">
                          <div
                            onClick={() => handleCreateItem()}
                            style={{
                              cursor: "pointer",
                              border: "2px solid var(--primary-color3)",
                            }}
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
                <Table borderless hover>
                  <thead>
                    <tr>
                      <th className="tf-title" style={{ width: "50%" }}>
                        Collection
                      </th>
                      <th className="tf-title">Status</th>
                      <th className="tf-title">Is Hot</th>
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
                                value={result.attributes.isHot}
                                defaultChecked={result.attributes.isHot}
                                onChange={() =>
                                  handleIsHot(
                                    result.attributes.collectionAddress,
                                  )
                                }
                              />
                              <span className="slider round"></span>
                            </label>
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
                              style={{
                                cursor: "pointer",
                                border: "2px solid var(--primary-color3)",
                              }}
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
    </div>
  );
};

export default CollectionAddress;
