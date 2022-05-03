import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

const Item = ({ data }) => {
  console.log("data", data);
  let metadata = JSON.parse(data.metadata);
  return (
    <div className="col-md-3 px-3 my-4">
      <Link to={`/item/${data.token_address}/${data.token_id}`}>
        <div className="p-3 sc-card-product">
          <div className="d-flex justify-content-between mb-2 ms-3 mb-4">
            <div className="d-flex align-items-center">
              <img className="sc-card-img" src={metadata.image} />
              <div>
                <p className="mb-0 gilroy-normal font-13 line-height creator">
                  Creator
                </p>
                <h5 className="gilroy-semibold font-15">{metadata.name}</h5>
              </div>
            </div>
            <div className="d-flex justify-content-end align-items-center likes">
              <AiOutlineHeart className="font-14 icon me-1" />
              <p className="font-13 m-0">3.5k</p>
            </div>
          </div>
          <div className="card img-div">
            <img style={{ borderRadius: "15px" }} src={metadata.image} />
            <div className="history-btn">
              <button className="my-btn">See History</button>
            </div>
          </div>
          <br />
          <h5 className="gilroy-bold">{metadata.name}</h5>
          <br />
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div
                className="mb-0 font-13 gilroy-normal"
                style={{ color: "var(--primary-color2)" }}
              >
                Current Bid
              </div>
              <h4 className="gilroy-bold font-18">
                <span style={{ color: "var(--primary-color2)" }}>
                  {data.amount}
                </span>
                <span style={{ color: "var(--light-text)" }}> ETH</span>
              </h4>
            </div>
            <div>
              <button className="rounded-pill px-5 py-3 sc-card-btn text-white gilroy-bold text-16">
                Bid
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;
