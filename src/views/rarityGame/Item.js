import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import userIcon from "../../assets/images/avatar/userIcon.png";
import { useIPFS } from "hooks/useIPFS";

const Item = ({ data }) => {
  console.log("data", data?.imageUrl);
  const { resolveLink } = useIPFS();
  return (
    <div className="col-lg-3 col-md-6 px-3 my-4">
      <Link to={`/rarity-items/${data.tokenAddress}`}>
        <div className="p-3 sc-card-product">
          <div className="d-flex justify-content-between mb-2 ms-3 mb-4">
            <div className="d-flex align-items-center">
              <img className="sc-card-img" src={userIcon} />
              <div>
                <p className="mb-0 gilroy-normal font-13 line-height creator">
                  Symbol
                </p>
                <h5 className="gilroy-semibold font-15">
                  {data?.assetContract?.tokenSymbol}
                </h5>
              </div>
            </div>
            {/* <div className="d-flex justify-content-end align-items-center likes">
            <AiOutlineHeart className="font-14 icon me-1" />
            <p className="font-13 m-0">{data.likes ? data?.likes : 0}</p>
          </div> */}
          </div>
          <div className="card img-div">
            <img
              style={{
                borderRadius: "15px",
                maxHeight: "300px",
                minHeight: "300px",
              }}
              src={
                resolveLink(data?.imageUrl) ||
                resolveLink(data?.collection?.largeImageUrl)
              }
            />
            <div className="history-btn">
              <button className="my-btn">View</button>
            </div>
          </div>
          <br />
          <h5 className="gilroy-bold">{data?.collection?.name}</h5>
          <br />
        </div>
      </Link>
    </div>
  );
};

export default Item;
