import React, { useEffect } from "react";

const Test = () => {
  useEffect(async () => {
    const options = {
      address: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
      days: "3",
    };
    const NFTLowestPrice = await Moralis.Web3API.token.getNFTLowestPrice(
      options,
    );
    console.log("NFTLowestPrice", NFTLowestPrice);
  });

  return <></>;
};

export default Test;
