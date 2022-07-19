import { ETHLogo } from "components/Chains/Logos";
import React from "react";
import { GiRank3 } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useIPFS } from "hooks/useIPFS";

const Item = ({ data, gridSize }) => {
  const { resolveLink } = useIPFS();
  let currentUrl = "";
  let activeMarket = localStorage.getItem("activeMarket");
  //   if (data?.tokenAddress) {
  currentUrl = `/item/${data.tokenAddress}/${data.tokenId}`;
  //   } else {
  //     currentUrl = `/item/${data.asset_contract.address}/${data.token_id}`;
  //   }
  // return <></>;
  return (
    <div className={`col-md-${gridSize} px-3 my-4`}>
      <Link to={currentUrl}>
        <div className="p-3 sc-card-product">
          <div className="d-flex justify-content-between mb-2 ms-3 mb-4">
            <div className="d-flex align-items-center">
              {data?.RarityGameId?.metadata?.imageUrlThumbnail ? (
                <img
                  className="sc-card-img"
                  src={resolveLink(
                    data?.RarityGameId?.metadata?.imageUrlThumbnail,
                  )}
                />
              ) : (
                <></>
              )}
              <div>
                <p className="mb-0 gilroy-normal font-13 line-height creator">
                  Collection
                </p>
                <h5 className="gilroy-semibold font-15">
                  {data?.RarityGameId?.metadata?.collection?.name}
                </h5>
              </div>
            </div>
            {/* <div className="d-flex justify-content-end align-items-center likes">
              <GiRank3 className="font-14 icon me-1" />
              <p className="font-13 m-0">{data?.rank}</p>
            </div> */}
          </div>
          <div className="card img-div">
            {data && data?.image ? (
              <img
                style={{
                  borderRadius: "15px",
                  minHeight: "300px",
                  maxHeight: "300px",
                }}
                src={resolveLink(data?.image)}
              />
            ) : (
              <></>
            )}
            <div className="history-btn">
              <button className="my-btn">{`Rank #${data?.rank}`}</button>
            </div>
          </div>
          <br />
          <h5 className="gilroy-bold">#{data?.tokenId}</h5>
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
