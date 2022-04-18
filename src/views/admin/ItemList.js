import React, { useState } from "react";
import { useMoralisCloudFunction } from "react-moralis";

const ItemList = () => {
  const { fetch, data, error, isLoading } = useMoralisCloudFunction(
    "getItems",
    { autoFetch: false },
  );

  const getItems = async () => {
    let result = await fetch();
    console.log(result);
  };

  useState(() => {
    getItems();
  }, [getItems]);

  return <div></div>;
};

export default ItemList;
