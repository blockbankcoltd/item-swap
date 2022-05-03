import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import nft5 from "../../assets/images/nft/nft5.png";

const Game = ({ data }) => {
  console.log(data);
  return (
    <div className="col-md-3 px-3 my-4">
      <Link to={`/collection/${data.tokenAddress}`}>
        <div className="p-3 sc-card-product">
          <div className="d-flex justify-content-between mb-2 ms-3 mb-4">
            <div className="d-flex align-items-center">
              <img className="sc-card-img" src={data.owner.profile_img_url} />
              <div>
                <p className="mb-0 gilroy-normal font-13 line-height creator">
                  Creator
                </p>
                <h5 className="gilroy-semibold font-15">
                  {data.assetContract.tokenSymbol}
                </h5>
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center likes">
              <AiOutlineHeart className="font-14 icon me-1" />
              <p className="font-13 m-0">3.5k</p>
            </div>
          </div>
          <div className="card img-div">
            <img
              style={{ borderRadius: "15px" }}
              src={data.assetContract.imageUrl}
            />
            <div className="history-btn">
              <button className="my-btn">See History</button>
            </div>
          </div>
          <br />
          <h5 className="gilroy-bold">{data.assetContract.name}</h5>
          <br />
        </div>
      </Link>
    </div>
  );
};

export default Game;