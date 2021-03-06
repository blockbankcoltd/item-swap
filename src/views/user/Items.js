import React, { Fragment } from "react";
import { getCollectionsByChain } from "../../helpers/collections";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import nft5 from "../../assets/images/nft/nft5.png";
import Item from "./Item";

function Items(props) {
  let data = props.data;
  let navigate = useHistory();
  const { chainId, contractABI } = useMoralisDapp();
  // console.log("asxzxz", useMoralisDapp());
  const NFTCollections = getCollectionsByChain(chainId);
  return (
    <Fragment>
      <section className="tf-section today-pick">
        <div className="themesflat-container">
          <div className="row p-md-10">
            {/* <div className="col-md-12">
              <div className="heading-live-auctions mg-bt-21">
                <h2 className="tf-title pad-l-7">Populer NFTs</h2>
                <Link to="/explore-game" className="exp style2">
                  EXPLORE MORE
                </Link>
              </div>
            </div> */}
            {data.length > 0 ? (
              data.map((nft, index) =>
                nft.metadata ? <Item data={nft} key={index} /> : <></>,
              )
            ) : (
              <p className="text-16 mb-0 text-center">
                You have not collected any asset.
              </p>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Items;
