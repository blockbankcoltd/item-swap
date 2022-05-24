import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import userIcon from "../../assets/images/avatar/userIcon.png";

const Game = ({ data, market }) => {
  console.log(data);
  let activeMarket = localStorage.getItem("activeMarket");
  return (
    <div className="col-md-3 px-3 my-4">
      <Link to={`/collection/${data.collectionAddress}`}>
        <div className="p-3 sc-card-product">
          <div className="d-flex justify-content-between mb-2 ms-3 mb-4">
            <div className="d-flex align-items-center">
              <img
                className="sc-card-img"
                src={
                  market === "opensea"
                    ? data.gameInfo.owner.profile_img_url
                    : userIcon
                }
              />
              <div>
                <p className="mb-0 gilroy-normal font-13 line-height creator">
                  Creator
                </p>
                <h5 className="gilroy-semibold font-15">
                  {market === "opensea"
                    ? data.gameInfo.assetContract.tokenSymbol
                    : "Uknown"}
                </h5>
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center likes">
              <AiOutlineHeart className="font-14 icon me-1" />
              <p className="font-13 m-0">{data.likes ? data.likes : 0}</p>
            </div>
          </div>
          <div className="card img-div">
            <img
              style={{
                borderRadius: "15px",
                maxHeight: "300px",
                minHeight: "300px",
              }}
              src={
                market === "opensea"
                  ? data.gameInfo.assetContract.imageUrl
                  : data.gameInfo.meta?.content[0].url
              }
            />
            <div className="history-btn">
              <button className="my-btn">View</button>
            </div>
          </div>
          <br />
          <h5 className="gilroy-bold">
            {market === "opensea"
              ? data.gameInfo.assetContract.name
              : data.gameInfo?.meta.name}
          </h5>
          <br />
        </div>
      </Link>
    </div>
  );
};

export default Game;
