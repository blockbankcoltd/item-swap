import { Fragment, useCallback, useEffect } from "react"
import { SellRequest } from "@rarible/protocol-ethereum-sdk/build/order/sell"
import React, { useState, useMemo } from "react"
import Web3 from "web3"
import {
	isErc1155v1Collection,
	isErc1155v2Collection,
	isErc721v1Collection,
	isErc721v2Collection,
	isErc721v3Collection,
	RaribleSdk,
  createRaribleSdk
} from "@rarible/protocol-ethereum-sdk"
import { useMoralis } from "react-moralis";
import { Web3Ethereum } from "@rarible/web3-ethereum"
import { toAddress, toBigNumber } from "@rarible/types"
import { NftCollectionFeatures, NftItem } from "@rarible/ethereum-api-client"
import  {useParams} from 'react-router-dom'
import { debounce } from "../utils/debounce"
import { retry } from "../utils/retry"
import { NftCollectionType } from "@rarible/ethereum-api-client/build/models/NftCollection"
import axios from "axios"
import { BiFilter } from "react-icons/bi"
import { BsFillFileTextFill, BsPatchCheckFill } from "react-icons/bs"
import Layout from "layout"
import ItemThumbnail from "components/Loader/ItemThumbnail"
import { AiFillTag } from "react-icons/ai"
import CollectionThumbnail from "components/Loader/CollectionThumbnail"
import dotPattern from "../../assets/images/icon/dot-pattern.png";
import { ETHLogo } from "components/Chains/Logos"
import moment from "moment"

type CreateOrderFormState = {
	contract: string,
	tokenId: string,
	price: string,
	hash: string
}

type BuyOrderFormState = {
	hash: string,
	amount: string
}

type DashboardProps = {
	provider: any
	sdk: RaribleSdk
	accounts: string[]
}


type MintForm = { id: string, type: NftCollectionType, isLazySupported: boolean, isLazy: boolean, loading: boolean }

const mintFormInitial: MintForm = {
	id: "0x6ede7f3c26975aad32a475e1021d8f6f39c89d82", // default collection on "rinkeby" that supports lazy minting
	type: NftCollectionType.ERC721,
	isLazy: true,
	isLazySupported: true,
	loading: false,
}

function Dashboard({ provider, sdk, accounts }) {
// return 2;
    console.log('sdk', provider)
    const [collection, setCollection] = useState<MintForm>(mintFormInitial)
    const [ownedItems, setOwnedItems] = useState<NftItem[]>()
    const [createOrderForm, setCreateOrderForm] = useState<CreateOrderFormState>({
        contract: '',
        tokenId: '',
        price: '10',
        hash: ''
    })
    const [activeTab, setActiveTab] = useState<any>(1);
  const [gameData, setGameData] = useState<any>([]);
  const [itemData, setItemData] = useState<any>([]);
  const [sell, setSell] = useState<any>(false);
  const [price, setPrice] = useState<any>(null);
  const [priceValidationMsg, setPriceValidationMsg] = useState<any>('');
  const [buyMsg, setBuyMsg] = useState<any>("");
  const [sellMsg, setSellMsg] = useState<any>("");
  const [sellButtonDisabled, SetSellButtonDisabled] = useState<any>(null);
  const [listings, setListings] = useState<any>(null);
  const [offers, setOffers] = useState<any>(null);
  const [itemMetadata, setItemMetadata] = useState<any>([]);
  const [items, setItems] = useState<any>(null);
  const [transfers, setTransfers] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);
  const { tokenAddress } = useParams<{tokenAddress?: string}>();
  const { tokenId } = useParams<{tokenId?: string}>();
    const [purchaseOrderForm, setPurchaseOrderForm] = useState<BuyOrderFormState>({ hash: '', amount: '1' })
    /**
     * Handle connect to wallet
     */

    const {
    Moralis,
    user,
    authenticate,
    isAuthenticated,
    account,
    chainId,
    logout,
  } = useMoralis();
    const connectWalletHandler = () => {
        provider.request({ method: 'eth_requestAccounts' })
    }


    const web3Account = useMemo(
    () => isAuthenticated && user.get("accounts")[0],
    [user, isAuthenticated],
  );


  const getCollectionData = useCallback(async () => {
    await Moralis.initPlugins();

    const res = await Moralis.Plugins.opensea.getAsset({
      network: "mainnet",
      tokenAddress: tokenAddress,
      tokenId: tokenId,
    });

    setGameData(res);

    const options1 = {
      address: tokenAddress,
      token_id: tokenId,
      chain: "eth",
    };
    const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(
      options1,
    );

    setItemData(tokenIdMetadata);
    setItemMetadata(JSON.parse(tokenIdMetadata.metadata));
    console.log("tokenIdMetadata", JSON.parse(tokenIdMetadata.metadata));
    const options = {
      address: tokenAddress,
      token_id: tokenId,
      chain: "eth",
    };
    const tokenIdOwners = await Moralis.Web3API.token.getTokenIdOwners(options);

    console.log("tokenIdOwners", tokenIdOwners);

    const options2 = {
      address: tokenAddress,
      token_id: tokenId,
      chain: "eth",
    };
    const transfers = await Moralis.Web3API.token.getWalletTokenIdTransfers(
      options2,
    );

    setTransfers(transfers.result);
    console.log("transfers", transfers);

    let orderArray = [];
    axios
      .get(
        `https://api-staging.rarible.org/v0.1/orders/sell/byItem?itemId=ETHEREUM:${tokenAddress}:${tokenId}`,
      )
      .then(async (res) => {
        if (res.data.orders.length > 0) {
          let activeTrades = res.data.orders.filter(
            (item: { status: string }) => item.status === "ACTIVE",
          );
          if (activeTrades.length > 0) {
          let minimumAmount = Math.min(
            ...activeTrades.map((item: { makePrice: string }) => parseFloat(item.makePrice)),
          ).toFixed(20);
          let result = res.data.orders.find(
            (item: { makePrice: string }) => parseFloat(item.makePrice) === Number(minimumAmount),
          );
          orderArray.push(result)
          console.log(res);
          setOrders(orderArray);
          }
        }
      })
      .catch((e) => e);

    // const trade = await Moralis.Plugins.opensea.getOrders({
    //   network: "testnet",
    //   tokenAddress: tokenAddress,
    //   tokenId: tokenId,
    //   //   orderSide: side,
    //   page: 1,
    //   // pagination shows 20 orders each page
    // });
    // setOrders(trade.orders);
    // console.log("trade", trade);
  }, []);
    /**
     * Mint Nft
     */
    /**
     * Create sell order from minted nft
     */
    const createSellOrder = async (data: any) => {
        if(!price) {
            setPriceValidationMsg('Amount is required');
            return;
        } else {
                setPriceValidationMsg("")
        }
        const request: SellRequest = {
            makeAssetType: {
                assetClass: 'ERC721',
                contract: toAddress(tokenAddress),
                tokenId: toBigNumber(tokenId)
            },
            amount: 1,
            maker: toAddress(account),
            originFees: [],
            payouts: [],
            price: 20,
            takeAssetType: { assetClass: "ETH" }
        }
        // Create an order
        const resultOrder = await sdk.order.sell(request)
        console.log('resultOrder', resultOrder)
        if (resultOrder) {
            setPurchaseOrderForm({ ...purchaseOrderForm, hash: resultOrder.hash })
            return resultOrder
        }
        setSell(false);
        setSellMsg("Sale order placed.");
        setTimeout(() => {
      setSellMsg("");
    }, 3000);
        // }
    }

    /**
     * Buy order
     */
    const handlePurchaseOrder = async () => {
        const order = await sdk.apis.order.getSellOrdersByItem({ contract: tokenAddress, tokenId: tokenId })
        let currentOrder = order.orders.find((o: { makePrice: any }) => o.makePrice == orders[0].makePrice)
        // let currentOrder = order.orders[0]
        console.log('Buy', order, currentOrder.type)
        // return
        // debugger
        switch (currentOrder.type) {
            case "RARIBLE_V1":
                await sdk.order.buy({ order: currentOrder, amount: parseInt(currentOrder.makePrice), originFee: 0 })
                break
            case "RARIBLE_V2":
                await sdk.order.buy({ order: currentOrder, amount: parseInt(currentOrder.makePrice) })
                break
            case "OPEN_SEA_V1":
                await sdk.order.buy({ order: currentOrder, amount: parseInt(currentOrder.makePrice) })
                break
            default:
                throw new Error(`Unsupported order : ${JSON.stringify(currentOrder)}`)
        }

        setBuyMsg("You bought item successfully.");
        setTimeout(() => {
      setBuyMsg("");
    }, 3000);
    }

    /**
     * Handle get NFT's owned by connected wallet
     */
    const handleGetMyNfts = async () => {
        const items = await sdk.apis.nftItem.getNftItemsByOwner({ owner: accounts[0] })
        setOwnedItems(items?.items)
    }

    /**
     * debounce function for define collection type by collection id(contract address)
     */
    // const searchType = debounce(async (collectionAddress: string) => {
    // 	if (collectionAddress) {
    // 		setCollection(prevState => ({ ...prevState, loading: true }))
    // 		const collectionResponse = await sdk.apis.nftCollection.getNftCollectionById({ collection: collectionAddress })
    // 		setCollection(prevState => ({
    // 			...prevState,
    // 			type: collectionResponse.type,
    // 			isLazySupported: collectionResponse.features.includes(NftCollectionFeatures.MINT_AND_TRANSFER), // check if it supports lazy minting
    // 			loading: false,
    // 		}))
    // 	}
    // }, 500)
    /**
     * input handlers
     */
    useEffect(() => {
    //   createSellOrder()
    getCollectionData().catch(console.error);
    }, [])
    // createSellOrder(1)
    return (
        <Layout>
      <div className="tf-section tf-item-details">
        <div className="themesflat-container mt-5 pb-5">
          <div className="row">
            {/* <div className="col-xl-1 col-md-1"></div> */}
            <div className="col-lg-6 col-md-12 pe-md-5 mb-sm-4">
              <div className="content-left ml-5 d-flex flex-column justify-content-between">
                {/* Author */}
                {itemData.metadata ? (
                  <div>
                    <div className="d-flex justify-content-start align-items-center mb-4">
                      <div>
                        <img
                          style={{ width: "30px", borderRadius: "50%" }}
                          src={gameData.collection.imageUrl}
                        />
                      </div>
                      <div>
                        <div className="d-flex align-items-center">
                          <p className="content pad-l-15 mb-0 gilroy-normal">
                            {gameData.collection.name &&
                              gameData.collection.name}
                          </p>
                          <BsPatchCheckFill
                            className="text-golden mg-l-8"
                            size={18}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      {/* <h2 className="tf-title mb-0 pb-1 gilroy-bold">
                        {itemMetadata.name
                          ? itemMetadata.name
                          : "#" + tokenId.length < 5
                          ? tokenId
                          : tokenId.substring(0, 3).toUpperCase() + "..."}
                      </h2> */}
                    </div>
                    <div className="d-flex align-items-center">
                      <p className="content mb-0 gilroy-normal font-15">
                        Owned by{" "}
                        <span>
                          @{itemData.owner_of.substring(2, 8).toUpperCase()}
                        </span>
                      </p>
                    </div>
                    <div className="row d-md-block d-lg-none">
                      <div className="col-6 px-3 w-100">
                        <div className="media" style={{ position: "relative" }}>
                            {itemMetadata && itemMetadata.image &&
                          <img
                            src={itemMetadata.image.substring(0,7) === 'ipfs://' ? `https://ipfs.io/ipfs/${itemMetadata.image.substring(7,itemMetadata.image.length)}` : itemMetadata.image}
                            className="border-radius-30 w-100"
                            alt="Axies"
                          />
                            }
                          <img
                            className="dotted-pattern-bg-1"
                            src={dotPattern}
                          />
                          <img
                            className="dotted-pattern-bg-2"
                            src={dotPattern}
                          />
                          <div className="bottom-left-text-overlay gilroy-bold font-18 text-white">
                            #
                            {tokenId.length < 5
                              ? tokenId
                              : tokenId.substring(0, 4).toUpperCase()}
                            ...
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Highest Bid section */}
                    {/* <div className="d-flex justify-content-center mt-5 align-items-center">
                      <div className="d-flex justify-content-center align-items-center  item-btn me-3">
                        <h4 className="mb-0 text-nowrap">
                          Highest Bid - 12.25ETH
                        </h4>
                      </div>
                      <div
                        className="w-100"
                        style={{ borderBottom: "1px solid #999" }}
                      />
                    </div> */}
                    <div className="collection-desc gilroy-normal">
                      <p className=" font-15">{itemMetadata.description}</p>
                    </div>
                  </div>
                ) : (
                  <div />
                )}
                {/* Links */}
                {
                    console.log(orders.length)
                }
                {orders.length > 0 && account !== itemData.owner_of ? (
                  <div className="d-sm-flex justify-content-between align-items-center">
                    <div className="">
                      <p className="text-16 mb-0">Current Price</p>
                      <h2 className="tf-title text-start mb-0 pb-1 gilroy-bold font-26">
                        {/* {Moralis.Units.FromWei(parseFloat(orders[0].makePrice))}{" "} */}
                        {orders[0]?.makePrice}
                        <span>
                          {/* {orders[0] && orders[0].paymentTokenContract.symbol} */}
                          ETH
                        </span>
                      </h2>
                    </div>
                    <br />

                    <div className="d-flex justify-content-around align-items-center">
                      {/* <div className="d-flex justify-content-center align-items-center item-btn me-3 mx-5">
                      <h4 className="mb-0 gilroy-bold">Buy for 8.50ETH</h4>
                    </div> */}
                      <button
                        className="primary-btn text-nowrap mx-2 w-100"
                        onClick={() => handlePurchaseOrder()}
                      >
                        Buy
                      </button>
                      {/* Place a bid section */}
                      {/* <div className="d-flex justify-content-center align-items-center item-btn mx-2 px-5">
                      <h4 className="mb-0 gilroy-bold text-nowrap">
                      Place a bid
                      </h4>
                    </div> */}
                    </div>
                  </div>
                ) : (
                    ""
                    )}
                {account === itemData.owner_of ? (
                  <div>
                    {!sell ? (
                      <button
                        className="primary-btn text-nowrap mx-2 w-100"
                        onClick={() => setSell(true)}
                        disabled={sellButtonDisabled}
                      >
                        Sell
                      </button>
                    ) : (
                      <></>
                    )}
                    {sell ? (
                      <div>
                        <div className="d-flex">
                          <div className="input-group mb-3">
                            <input
                              type="number"
                              className="form-control  number-input"
                              placeholder="Enter Amount"
                              aria-label="Enter Amount"
                              aria-describedby="basic-addon2"
                              onChange={(e) => {setPrice(e.target.value); e.target.value ? setPriceValidationMsg('') : setPriceValidationMsg('Amount is required')}}
                            />
                            <span
                              className="input-group-text"
                              id="basic-addon2"
                            >
                              ETH
                            </span>
                          </div>
                        </div>
                        <small className="text-danger">{priceValidationMsg}</small>
                        <br />
                        <div className="d-flex">
                          <div
                            className="d-flex justify-content-center align-items-center watchlist-btn me-3 w-100"
                            onClick={() => setSell(false)}
                          >
                            <h4 className="mb-0">Cancel</h4>
                          </div>
                          <button
                            className="primary-btn text-nowrap mx-2 w-100"
                            onClick={() => createSellOrder(price)}
                            // disabled={sellButtonDisabled}
                          >
                            Sell
                          </button>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {/* {orders[0] ? (
                      <button
                        className="primary-btn text-nowrap mx-2 w-100"
                        onClick={() => handleCancelSell}
                        disabled={sellButtonDisabled}
                      >
                        Cancel Sell
                      </button>
                    ) : (
                      <></>
                    )} */}
                  </div>
                ) : (
                  <></>
                )}
                <p className="text-success">{buyMsg}{sellMsg}</p>
                <br />
                <br />
                <div className="row">
                  <div className="col-md-12 mb-5 px-5">
                    <div className="card-2">
                      <div className="card-2-header">
                        <BiFilter className="text-primary" size={30} />{" "}
                        Properties
                      </div>
                      <div className="card-2-body">
                        {itemMetadata.attributes ? (
                          itemMetadata.attributes.map((trait) => (
                            <ul className="card-2-ul d-flex justify-content-between align-items-center">
                              <li className="text-primary">
                                {trait.type || trait.trait_type}
                              </li>
                              <li>{trait.description || trait.value}</li>
                              {/* <li className="gilroy-normal">
                                  19% have this trait
                                </li> */}
                            </ul>
                          ))
                        ) : (
                          <p className="text-16 mb-0">No Data</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-5 px-5">
                    <div className="card-2">
                      <div className="card-2-header">
                        <BsFillFileTextFill
                          className="text-primary"
                          size={30}
                        />
                        Details
                      </div>
                      {itemData ? (
                        <div className="card-2-body">
                          <ul className="card-2-ul d-flex justify-content-between align-items-center">
                            <li>Contract Address</li>
                            <li className="text-primary">
                              {itemData.token_address &&
                                `${itemData.token_address
                                  .substring(2, 8)
                                  .toUpperCase()}...${itemData.token_address
                                  .substring(39, 42)
                                  .toUpperCase()}`}
                            </li>
                          </ul>
                          <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                            <li>Token ID</li>
                            <li>
                              {tokenId.length < 5
                                ? tokenId
                                : tokenId.substring(0, 4).toUpperCase()}
                              ...
                            </li>
                          </ul>
                          <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                            <li>Token Standard</li>
                            <li>{itemData.contract_type}</li>
                          </ul>
                          {/* <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                          <li className="text-primary">Metadata</li>
                          <li>ETH</li>
                        </ul>
                        <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                          <li className="text-primary">Creator Fees</li>
                          <li>Centralized</li>
                        </ul> */}
                        </div>
                      ) : (
                        <p className="text-16 mb-0">No Data</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12" style={{ zIndex: "999" }}>
              <div className="content-right">
                {itemMetadata ? (
                  <div className="row d-none d-lg-block">
                    <div className="col-6 px-3 ps-5 w-100">
                      <div className="media" style={{ position: "relative" }}>
                          {itemMetadata && itemMetadata.image ?
                          (
                          <img
                            src={itemMetadata.image.substring(0,7) === 'ipfs://' ? `https://ipfs.io/ipfs/${itemMetadata.image.substring(7,itemMetadata.image.length)}` : itemMetadata.image}
                            className="border-radius-30 w-100"
                            alt="Axies"
                          />
                        ) : (
                          <ItemThumbnail />
                        )}
                        <img className="dotted-pattern-bg-1" src={dotPattern} />
                        <img className="dotted-pattern-bg-2" src={dotPattern} />
                        <div className="bottom-left-text-overlay gilroy-bold font-18 text-white">
                          #
                          {tokenId.length < 5
                            ? tokenId
                            : tokenId.substring(0, 4).toUpperCase()}
                          ...
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <CollectionThumbnail />
                )}
                <br />
                <br />
                <div className="row">
                  <div className="col-md-12 mb-5 px-5">
                    <div className="card-2">
                      <div className="card-2-header">
                        <AiFillTag className="text-primary" size={30} />{" "}
                        Listings
                      </div>
                      <div className="card-2-body">
                        <ul className="card-2-ul d-flex justify-content-between align-items-center">
                          <li className="gilroy-normal">Price</li>
                          <li className="gilroy-normal">USD Price</li>
                          <li className="gilroy-normal">Expiration</li>
                          <li className="gilroy-normal">From</li>
                        </ul>
                        {orders ? (
                          orders.map((order) => (
                            <ul className="card-2-ul d-flex justify-content-between align-items-center">
                              <li className="gilroy-normal">
                                <ETHLogo />
                                &nbsp;
                                {parseFloat(orders[0]?.makePrice)}
                              </li>
                              <li className="gilroy-normal">USD Price</li>
                              <li className="gilroy-normal">
                                {moment(order?.expirationTime).format("llll")}
                              </li>
                              <li className="gilroy-normal text-primary">
                                {order?.maker.substring(2, 8).toUpperCase()}
                                ...
                                {order?.maker.substring(39, 42).toUpperCase()}
                              </li>
                            </ul>
                          ))
                        ) : (
                          <p className="text-16 mb-0">No Data</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-5 px-5">
                    <div className="card-2">
                      <div className="card-2-header">
                        <AiFillTag className="text-primary" size={30} /> Offers
                      </div>
                      <div className="card-2-body">
                        {offers ? (
                          <ul className="card-2-ul d-flex justify-content-between align-items-center">
                            <li className="gilroy-normal">Price</li>
                            <li className="gilroy-normal">USD Price</li>
                            <li className="gilroy-normal">Expiration</li>
                            <li className="gilroy-normal">From</li>
                          </ul>
                        ) : (
                          <p className="text-16 mb-0">No Data</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-5 px-5">
                    <div className="card-2">
                      <div className="card-2-header">
                        <BiFilter className="text-primary" size={30} /> Activity
                      </div>
                      <div className="card-2-body">
                        <ul className="card-2-ul d-flex align-items-center">
                          <li
                            className="gilroy-normal"
                            style={{ width: "15%" }}
                          >
                            Event
                          </li>
                          <li
                            className="gilroy-normal"
                            style={{ width: "15%" }}
                          >
                            Price
                          </li>
                          <li
                            className="gilroy-normal"
                            style={{ width: "25%" }}
                          >
                            From
                          </li>
                          <li
                            className="gilroy-normal"
                            style={{ width: "25%" }}
                          >
                            To
                          </li>
                          <li
                            className="gilroy-normal"
                            style={{ width: "20%" }}
                          >
                            Date
                          </li>
                        </ul>
                        {transfers.map((transfer) => (
                          <ul className="card-2-ul card-2-ul d-flex justify-content-between align-items-center">
                            <li style={{ width: "15%" }}>
                              {transfer.from_address ===
                              "0x0000000000000000000000000000000000000000"
                                ? "Minted"
                                : "Transfer"}
                            </li>
                            <li style={{ width: "15%" }}></li>
                            <li
                              className="text-primary"
                              style={{ width: "25%" }}
                            >
                              {transfer.from_address ===
                              "0x0000000000000000000000000000000000000000"
                                ? "NullAddress"
                                : `${transfer.from_address
                                    .substring(2, 8)
                                    .toUpperCase()}...${transfer.from_address
                                    .substring(39, 42)
                                    .toUpperCase()}`}
                            </li>
                            <li
                              className="text-primary"
                              style={{ width: "25%" }}
                            >
                              {`${transfer.to_address
                                .substring(2, 8)
                                .toUpperCase()}...${transfer.to_address
                                .substring(39, 42)
                                .toUpperCase()}`}
                            </li>
                            <li style={{ width: "20%" }}>
                              {moment(transfer.block_timestamp).fromNow()}
                            </li>
                          </ul>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mb-5 px-5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Fragment>
        <section className="tf-section today-pick pt-0">
          <div className="themesflat-container">
            <div className="row p-md-10">
              <div className="col-md-5 mb-5 px-3"></div>
              <div className="col-md-7 mb-5 px-3"></div>
            </div>
          </div>
        </section>
      </Fragment>
    </Layout>
    )

    // return <div><button onClick={createSellOrder}>Sell</button><button onClick={handlePurchaseOrder}>Buy</button></div>
    // return (
    //     <div className="App">
    //         <div>
    //             <button onClick={connectWalletHandler} disabled={!!provider?.selectedAddress}>
    //                 {accounts.length ? 'Connected' : 'Connect wallet'}
    //             </button>
    //             {accounts.length && <span>Connected address: {accounts[0]}</span>}
    //             <hr />
    //             <div style={{ padding: '4px' }}>
    //                 <p>Mint item form</p>
    //                 <input onChange={handleChangeCollection} value={collection.id}
    //                     placeholder="Collection (contract address)" />
    //                 <p>collection type: {collection.loading ? "..." : collection.type}</p>
    //                 {collection.isLazySupported && <p>Lazy?&nbsp;
    //                     <input type="checkbox" onChange={handleChangeLazy} checked={collection.isLazy} />
    //                     &nbsp;&nbsp;
    //                 </p>}
    //                 <button onClick={mint}>mint</button>
    //             </div>
    //             <hr />
    //         </div>

    //         <div style={{ padding: '4px' }}>
    //             <p>Create sell order form</p>
    //             <input onChange={handleChangeOrderContract} value={createOrderForm?.contract}
    //                 placeholder={"Contract address"} />
    //             <input onChange={handleChangeOrderTokenId} value={createOrderForm?.tokenId} placeholder={"Token Id"} />
    //             <input onChange={handleChangeOrderPrice} value={createOrderForm?.price} placeholder={"Price"} />
    //             <button onClick={createSellOrder}>
    //                 Sell
    //             </button>
    //         </div>
    //         <hr />
    //         <div style={{ padding: '4px' }}>
    //             <p>Purchase created order form</p>
    //             <input onChange={handleOrderHash} value={purchaseOrderForm.hash} placeholder={'Order hash'} />
    //             <input onChange={handlePurchaseOrderAmount} value={purchaseOrderForm.amount} placeholder={'amount'} />
    //             <button onClick={handlePurchaseOrder}>Purchase</button>
    //         </div>
    //         <hr />
    //         <div>
    //             <p>NFT items owned by me: <button onClick={handleGetMyNfts}>Refresh</button></p>
    //             <ul>
    //                 {ownedItems?.length && ownedItems.map(i => {
    //                     return (
    //                         <li key={i.id}>
    //                             <p><strong>Item</strong> id: {i.id}</p>
    //                             <p><strong>Lazy supply:</strong> {i.lazySupply}</p>
    //                         </li>
    //                     )
    //                 })}
    //             </ul>
    //         </div>
    //     </div>
    // )
}

export const RaribleFunctions = () => {
  const [provider, setProvider] = useState<any>()
	const [sdk, setSdk] = useState<RaribleSdk>()
	const [accounts, setAccounts] = useState<string[]>([])

	/**
	 * Initialize SDK
	 */
	useEffect(() => {
		if ((window as any).ethereum) {
			handleInit()
		} else {
			window.addEventListener('ethereum#initialized', handleInit, {
				once: true,
			})
			setTimeout(handleInit, 3000) // 3 seconds
		}

	}, [])

	// Handle provider and set it to web3
	function handleInit() {
		const { ethereum } = window as any
		if (ethereum && ethereum.isMetaMask) {
			console.log('Ethereum successfully detected!')
			setProvider(ethereum)

			// add listener on accountsChanged event to render actual address
			ethereum.on('accountsChanged', setAccounts)
			// configure web3
			const web3 = new Web3(ethereum)
			// configure raribleSdk
			const raribleSdk = createRaribleSdk(new Web3Ethereum({ web3 }), "rinkeby")
			setSdk(raribleSdk)
			// set current account if already connected
			web3.eth.getAccounts().then(e => {
				setAccounts(e)
			})
		} else {
			console.log('Please install MetaMask!')
		}
	}

	// if (!provider?.isMetaMask) {
	// 	return <strong>Please install metamask to use the app</strong>
	// } else {
	// 	if (sdk) {
	// 		return <Dashboard provider={provider} sdk={sdk} accounts={accounts}/>
	// 	} else {
	// 		return <strong>Sdk not initialized</strong>
	// 	}
	// }

    return <Dashboard provider={provider} sdk={sdk} accounts={accounts} />;
}

export default RaribleFunctions
