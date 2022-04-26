import React, { useEffect, useState, useMemo } from "react";
import { useMoralis } from "react-moralis";

const OpenSea = () => {
  const {
    Moralis,
    user,
    logout,
    authenticate,
    enableWeb3,
    isInitialized,
    isAuthenticated,
    isWeb3Enabled,
  } = useMoralis();

  const [values, setValues] = useState({
    tokenAddress: "0x27AF21619746A2AbB01d3056F971cDe936145939",
    tokenId: "",
  });
  const web3Account = useMemo(
    () => isAuthenticated && user.get("accounts")[0],
    [user, isAuthenticated],
  );

  const getAsset = async () => {
    const options = {
      address: "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
      chain: "eth",
    };
    const NFTs = await Moralis.Web3API.token.getAllTokenIds(options);
    // const res = await Moralis.Plugins.opensea.getAsset({
    //   network: "testnet",
    //   tokenAddress: values.tokenAddress,
    //   tokenId: values.tokenId,
    // });
    console.log(NFTs);
  };

  //   useEffect(() => {
  //     getCollection();
  //   }, [getCollection]);
  return (
    <div>
      <button onClick={getAsset}>Get Assets</button>
    </div>
  );
};

export default OpenSea;
