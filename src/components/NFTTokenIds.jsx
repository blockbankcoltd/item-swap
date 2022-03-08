import React from "react";
import { getCollectionsByChain } from "helpers/collections";
import { Row, Col } from "reactstrap";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { connect } from "react-redux";
import { withRouter} from "react-router-dom";
import { bindActionCreators } from "redux";

function NFTTokenIds(props) {
  const { chainId, contractABI } = useMoralisDapp();
  console.log('====================================');
  console.log(chainId);
  console.log('====================================');
  const contractABIJson = JSON.parse(contractABI);
  const NFTCollections = getCollectionsByChain(chainId);
  return (
    <div>
      {contractABIJson.noContractDeployed && (
        <div class="alert border border-info mt-3" role="alert">
          No Smart Contract Details Provided. Please deploy smart contract and provide address + ABI in the MoralisDappProvider.js file
        </div>
      )}

      <Row>
        {NFTCollections?.map((nft, index) => (
          <Col lg={4} key={index} className='mt-4'
            onClick={() => {
              props.history.push(`items/${nft?.addrs}`);
            }}
          >
            <div className='itemCard shadow-sm'>
              <img src={nft?.image || "error"} alt="image" className='w-100 itemCardImg' />
              <div className='itemCardImgWrapper'>
                <img src={nft?.image || "error"} alt="image" className='itemCardImg2' />
              </div>
              <p className='itemCardText1 mt-2'>{nft.name}</p>
              <div className='d-flex'>
                {/* <p className='itemCardText2'>{nft?.addrs}</p> */}
                {/* <p className='itemCardText3'>&#9733; 4.0</p> */}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NFTTokenIds)
);
