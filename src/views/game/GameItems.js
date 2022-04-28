import React, { Fragment } from "react";
import { getCollectionsByChain } from "../../helpers/collections";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { Link, useHistory } from "react-router-dom";
import Game from "components/Game";

function GameItems(props) {
  let data = props.data;
  console.log("data", props.data);
  let navigate = useHistory();
  const { chainId, contractABI } = useMoralisDapp();
  console.log("asxzxz", useMoralisDapp());
  const NFTCollections = getCollectionsByChain(chainId);
  return (
    <Fragment>
      <section className="tf-section today-pick">
        <div className="themesflat-container">
          <div className="row p-md-10">
            <div className="col-md-12">
              <div className="heading-live-auctions mg-bt-21">
                <h2 className="tf-title pad-l-7">{props.title}</h2>
                <Link to="/explore-game" className="exp style2">
                  EXPLORE MORE
                </Link>
              </div>
            </div>
            {data?.slice(0, 8).map((nft, index) => (
              <Game data={nft} key={index} />
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default GameItems;
