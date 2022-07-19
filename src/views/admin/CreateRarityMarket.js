import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import generateRarity from "components/CreateItem/rarityCalculator";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import "react-tabs/style/react-tabs.css";
import "../../customStyle.css";
import "react-toastify/dist/ReactToastify.css";

const CreateRarityMarket = () => {
  const [nftAddress, setNftAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [chainInput, setChainInput] = useState(null);
  const [nftAddressError, setNftAddressError] = useState("");
  const [tokenIdError, setTokenIdError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [collections, setCollections] = useState([]);
  const [fetchCollection, setFetchCollection] = useState(0);
  const [games, setGames] = useState([]);

  const { fetchGames, addRarityGame, deleteGame, toggleActive } =
    generateRarity(nftAddress);

  const handleSubmit = async () => {
    if (!nftAddress) return notify("Token address is required");
    if (!chainInput) return notify("Chain is required");
    let result = await addRarityGame(nftAddress, chainInput);
    notify(result.msg);
    const rarityGames = await fetchGames();
    if (rarityGames.status === true) setGames(rarityGames.data);
  };

  const handleAddressInput = (e) => {
    if (e.target.value) setNftAddressError("");
    setNftAddress(e.target.value);
  };

  const handleDelete = async (collection) => {
    let result = await deleteGame(collection);
    notify(result.msg);
    const rarityGames = await fetchGames();
    if (rarityGames.status === true) setGames(rarityGames.data);
  };

  const handleIsActive = async (collection) => {
    let result = await toggleActive(collection);
    notify(result.msg);
    const rarityGames = await fetchGames();
    if (rarityGames.status === true) setGames(rarityGames.data);
  };

  const notify = (msg) =>
    toast(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      style: {
        backgroundColor: "var(--primary-color)",
        color: "var(--primary-color2)",
      },
    });

  useEffect(async () => {
    const rarityGames = await fetchGames();
    if (rarityGames.status === true) setGames(rarityGames.data);
  }, []);

  return (
    <div className="create-item">
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <section className="flat-title-page inner">
        {/* <div className="overlay"></div> */}
        <div className="themesflat-container">
          <div className="row">
            <div className="col-md-12">
              <div className="page-title-heading mg-bt-12">
                <h1 className="heading text-center">OpenSea </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="tf-create-item tf-section p-0">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <div className="form-create-item">
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
                        <div className="col-xl-2 col-lg-3 col-md-12 col-12"></div>
                        <div className="col-xl-8 col-lg-6 col-md-12 col-12">
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
                                        onChange={(e) =>
                                          setChainInput(e.target.value)
                                        }
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
                                  <small style={{ color: "red" }}>
                                    {tokenIdError}
                                  </small>
                                  <small style={{ color: "red" }}>
                                    {nftAddressError}
                                  </small>
                                  <small style={{ color: "green" }}>
                                    {successMsg}
                                  </small>
                                  <div className="row-form style-12 mt-3">
                                    <div className="inner-row-form">
                                      <div
                                        onClick={() => handleSubmit()}
                                        style={{
                                          cursor: "pointer",
                                          border:
                                            "2px solid var(--primary-color3)",
                                        }}
                                        className="sc-button fl-button pri-3 float-right"
                                        // disabled={isFetching}
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
                                  <th
                                    className="tf-title"
                                    style={{ width: "50%" }}
                                  >
                                    Collection
                                  </th>
                                  <th className="tf-title">Status</th>
                                  <th className="tf-title">Is Hot</th>
                                  <th className="tf-title">Is Active</th>
                                  <th className="tf-title">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {games.map((result, key) => {
                                  return (
                                    <tr key={key}>
                                      <td className="tf-title text-left">
                                        {result.attributes.tokenAddress}
                                      </td>
                                      <td className="tf-title text-left">
                                        {result.attributes.status}
                                      </td>
                                      <td className="text-center">
                                        <label className="switch">
                                          <input
                                            type="checkbox"
                                            value={result.attributes.isHot}
                                            defaultChecked={
                                              result.attributes.isHot
                                            }
                                            onChange={() =>
                                              handleIsHot(
                                                result.attributes
                                                  .collectionAddress,
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
                                            defaultChecked={
                                              result.attributes.isActive
                                            }
                                            onChange={() =>
                                              handleIsActive(
                                                result.attributes.tokenAddress,
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
                                            border:
                                              "2px solid var(--primary-color3)",
                                          }}
                                          onClick={() =>
                                            handleDelete(
                                              result.attributes.tokenAddress,
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateRarityMarket;
