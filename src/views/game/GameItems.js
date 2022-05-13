import React, { Fragment, useState } from "react";
import { getCollectionsByChain } from "../../helpers/collections";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import { Link, useHistory } from "react-router-dom";
import Game from "components/Game";

function GameItems(props) {
  const [visible, setVisible] = useState(4);
  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  let data = props.data;
  let navigate = useHistory();
  const { chainId, contractABI } = useMoralisDapp();
  const NFTCollections = getCollectionsByChain(chainId);
  return (
    <Fragment>
      <section className="tf-section today-pick">
        <div className="themesflat-container">
          <div className="row p-md-10">
            <div className="col-md-12">
              <div className="heading-live-auctions mg-bt-21">
                <h2 className="tf-title pad-l-7">{props.title}</h2>
                <div id="sort-by" class="dropdown">
                  <a className="btn-selector nolink">Sort by</a>
                  <ul>
                    <li onClick={() => props.setFilter("all")}>
                      <span>All</span>
                    </li>
                    <li onClick={() => props.setFilter("popular")}>
                      <span>Popular</span>
                    </li>
                    <li onClick={() => props.setFilter("hot")}>
                      <span>Hot</span>
                    </li>
                    <li onClick={() => props.setFilter("new")}>
                      <span>New Releases</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {data?.slice(0, visible).map((nft, index) => (
              <Game data={nft} key={index} />
            ))}
            {visible < data.length && (
              <div className="col-md-12 wrap-inner load-more text-center">
                <Link
                  to="#"
                  id="load-more"
                  className="sc-button loadmore fl-button pri-3"
                  onClick={showMoreItems}
                >
                  <span>Load More</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default GameItems;
