import { ETHLogo } from "components/Chains/Logos";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useIPFS } from "hooks/useIPFS";

const Item = ({ data, gridSize }) => {
  const { resolveLink } = useIPFS();
  console.log("data", data.name);
  // let metadata = JSON.parse(data.metadata);
  // console.log("metadata", metadata);
  // if (!metadata) return <></>;
  let currentUrl = "";
  let activeMarket = localStorage.getItem("activeMarket");
  if (activeMarket === "rarible") {
    currentUrl = `/RaribleFunctions/${data.token_address}/${data.token_id}`;
  } else {
    currentUrl = `/item/${data.asset_contract.address}/${data.token_id}`;
  }
  // return <></>;
  return (
    <div className={`col-md-${gridSize} px-3 my-4`}>
      <Link to={currentUrl}>
        <div className="p-3 sc-card-product">
          <div className="d-flex justify-content-between mb-2 ms-3 mb-4">
            <div className="d-flex align-items-center">
              {(data && data?.collection?.image_url) ||
              JSON.parse(data?.metadata) ? (
                <img
                  className="sc-card-img"
                  src={
                    resolveLink(data?.collection?.image_url) ||
                    resolveLink(JSON.parse(data?.metadata)?.image)
                  }
                />
              ) : (
                <></>
              )}
              <div>
                <p className="mb-0 gilroy-normal font-13 line-height creator">
                  Collection
                </p>
                <h5 className="gilroy-semibold font-15">
                  {data?.collection?.name || data?.name}
                </h5>
              </div>
            </div>
            {/* <div className="d-flex justify-content-end align-items-center likes">
              <AiOutlineHeart className="font-14 icon me-1" />
              <p className="font-13 m-0">3.5k</p>
            </div> */}
          </div>
          <div className="card img-div">
            {(data && data?.image_preview_url) || JSON.parse(data?.metadata) ? (
              <img
                style={{
                  borderRadius: "15px",
                  minHeight: "300px",
                  maxHeight: "300px",
                }}
                src={
                  resolveLink(data?.image_preview_url) ||
                  resolveLink(JSON.parse(data?.metadata)?.image)
                }
              />
            ) : (
              <></>
            )}
            <div className="history-btn">
              <button className="my-btn">View</button>
            </div>
          </div>
          <br />
          <h5 className="gilroy-bold">{data && data?.name}</h5>
          <br />
          <div className="d-flex justify-content-between align-items-center">
            {/* <div>
              <div
                className="mb-0 font-13 gilroy-normal"
                style={{ color: "var(--primary-color2)" }}
              >
                Price
              </div>
              <h4 className="gilroy-bold font-18">
                <ETHLogo />
                <span
                  style={{ color: "var(--primary-color2)" }}
                  className="ms-2"
                >
                  {data.amount}
                </span>
                <span style={{ color: "var(--light-text)" }}> ETH</span>
              </h4>
            </div> */}
            {/* <div>
              <button className="rounded-pill px-5 py-3 sc-card-btn text-white gilroy-bold text-16">
                Bid
              </button>
            </div> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;
