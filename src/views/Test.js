import React, { useEffect } from "react";
import { useWeb3ExecuteFunction, useMoralis } from "react-moralis";

const Test = () => {
  const { data, error, fetch, isFetching, isLoading } =
    useWeb3ExecuteFunction();

  const {
    web3,
    enableWeb3,
    isWeb3Enabled,
    isWeb3EnableLoading,
    web3EnableError,
    authenticate,
    isAuthenticated,
    user,
  } = useMoralis();
  console.log(isWeb3Enabled);
  useEffect(() => {
    enableWeb3();
    authenticate();
  }, []);

  const options = {
    abi: [
      {
        inputs: [{ internalType: "string", name: "uri", type: "string" }],
        name: "createItem",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    contractAddress: "0x7DaC127997a70455166702310560E089b650d1B2",
    functionName: "createItem",
    params: {
      uri: "https://ipfs.moralis.io:2053/ipfs/QmTdCwshLYoGJwPZqWh5sEmnib3jvA3ATVhyu8LdcXJLuV",
    },
  };

  //   const options = {
  //     abi: usdcEthPoolAbi,
  //     contractAddress: usdcEthPoolAddress,
  //     functionName: "observe",
  //     params: {
  //       secondsAgos: [0, 10],
  //     },
  //   };
  console.log(error);
  return (
    <div>
      {/* {error && <div error={error} >} */}
      <button onClick={() => fetch({ params: options })} disabled={isFetching}>
        Fetch data
      </button>
      {data && <pre>{JSON.stringify(data)}</pre>}
    </div>
  );
};

export default Test;
