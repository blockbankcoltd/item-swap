import React, { Fragment } from "react";
import { getCollectionsByChain } from "../../helpers/collections";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import nft5 from "../../assets/images/nft/nft5.png";
import Item from "./Item";

function Items(props) {
  console.log("propss", props.data[0].metadata);
  let data = props.data;
  let keyword = props.searchKeyword;
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
            {keyword != ""
              ? data
                  .filter((d) => d.metadata.name.includes(keyword))
                  .map((nft, index) => <Item data={nft} key={index} />)
              : data.map((nft, index) => <Item data={nft} key={index} />)}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Items;
