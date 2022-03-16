import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import { useIPFS } from "./useIPFS";

export const useNFTTokenIds = () => {
    const { toekn } = useMoralisWeb3Api();
    const { chainId } = useMoralisDapp();
    console.log('log', chainId);
    const { resolveLink } = useIPFS();
    const [NFTTokenIds, setNFTTokenIds] = useState([]);
    const {
        fetch: getNFTTokenIds,
        data,
        error,
        isLoading,
    } = useMoralisWeb3ApiCall(toekn.getAllTokenIds, { chain: chainId, address: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', limit: 20 });

    useEffect(() => {
        if (data?.result) {
            const NFTs = data.result;

            for (let NFT of NFTs) {
                if (NFT?.metadata) {
                    NFT.metadata = JSON.parse(NFT.metadata);
                    NFT.image = resolveLink(NFT.metadata?.image);
                }
            }
            setNFTTokenIds(NFTs);
        }
    }, [data]);

    return { getNFTTokenIds, NFTTokenIds, error, isLoading };
};
