import React, { Fragment } from "react";
import { getCollectionsByChain } from "../../helpers/collections";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import nft5 from "../../assets/images/nft/nft5.png";
import Item from "./Item";

function Items(props) {
  let keyword = props.searchKeyword;
  let data =
    keyword != ""
      ? props.data.filter((d) =>
          d.metadata
            ? JSON.parse(d.metadata)
                .name.toLowerCase()
                .includes(keyword.toLowerCase())
            : null,
        )
      : props.data;
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
            {data ? (
              data.map((nft, index) => (
                <Item data={nft} gridSize={props.gridSize} key={index} />
              ))
            ) : (
              <h1>No data found</h1>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Items;
