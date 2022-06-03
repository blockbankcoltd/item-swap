import { useEffect } from "react"
import { SellRequest } from "@rarible/protocol-ethereum-sdk/build/order/sell"
import React, { useState } from "react"
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
import { Web3Ethereum } from "@rarible/web3-ethereum"
import { toAddress, toBigNumber } from "@rarible/types"
import { NftCollectionFeatures, NftItem } from "@rarible/ethereum-api-client"
import { debounce } from "./utils/debounce"
import { retry } from "./utils/retry"
import { NftCollectionType } from "@rarible/ethereum-api-client/build/models/NftCollection"

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

const Dashboard: React.FC<DashboardProps> = ({ provider, sdk, accounts }) => {

  console.log('sdk', provider);
	const [collection, setCollection] = useState<MintForm>(mintFormInitial)
	const [ownedItems, setOwnedItems] = useState<NftItem[]>()
	const [createOrderForm, setCreateOrderForm] = useState<CreateOrderFormState>({
		contract: '',
		tokenId: '',
		price: '10',
		hash: '',
	})
	const [purchaseOrderForm, setPurchaseOrderForm] = useState<BuyOrderFormState>({ hash: '', amount: '1' })
	/**
	 * Handle connect to wallet
	 */
	const connectWalletHandler = () => {
		provider.request({ method: 'eth_requestAccounts' })
	}

	/**
	 * Mint Nft
	 */

	/**
	 * Create sell order from minted nft
	 */
	const createSellOrder = async () => {
    // return;
		// console.log(collect ion.type, toAddress(createOrderForm.contract), toBigNumber(createOrderForm.tokenId), toAddress(accounts[0]), createOrderForm.price)
		// return;
		// if (createOrderForm.contract && createOrderForm.tokenId && createOrderForm.price) {
			const request: SellRequest = {
				makeAssetType: {
					assetClass: 'ERC721',
					contract: toAddress('0x6ede7f3c26975aad32a475e1021d8f6f39c89d82'),
					tokenId: toBigNumber('79235018021495379507874586420629006196866217315835948537302390155691893456897'),
				},
				amount: 1,
				maker: toAddress('0xaF2d6E51f39B9fF9862f5b991b2F1440513a26f9'),
				originFees: [],
				payouts: [],
				price: 20,
				takeAssetType: { assetClass: "ETH" },
			}
			// Create an order
			const resultOrder = await sdk.order.sell(request)
      console.log('resultOrder', resultOrder)
			if (resultOrder) {
				setPurchaseOrderForm({ ...purchaseOrderForm, hash: resultOrder.hash })
			}
		// }
	}

	/**
	 * Buy order
	 */
	const handlePurchaseOrder = async () => {
		const order = await sdk.apis.order.getOrderByHash({ hash: purchaseOrderForm.hash })
    console.log('Buy', order, parseInt(purchaseOrderForm.amount))
    // return
		switch (order.type) {
			case "RARIBLE_V1":
				await sdk.order.buy({ order, amount: parseInt(purchaseOrderForm.amount), originFee: 0 })
				break;
			case "RARIBLE_V2":
				await sdk.order.buy({ order, amount: parseInt(purchaseOrderForm.amount) })
				break;
			case "OPEN_SEA_V1":
				await sdk.order.buy({ order, amount: parseInt(purchaseOrderForm.amount) })
				break;
			default:
				throw new Error(`Unsupported order : ${JSON.stringify(order)}`)
		}
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
	
// useEffect(() => {
//   createSellOrder()
// }, [])



  return <div><button onClick={createSellOrder}>Sell</button><button onClick={handlePurchaseOrder}>Buy</button></div>
	return (
		<div className="App">
			<div>
				<button onClick={connectWalletHandler} disabled={!!provider?.selectedAddress}>
					{accounts.length ? 'Connected' : 'Connect wallet'}
				</button>
				{accounts.length && <span>Connected address: {accounts[0]}</span>}
				<hr/>
				<div style={{ padding: '4px' }}>
					<p>Mint item form</p>
					<input onChange={handleChangeCollection} value={collection.id}
								 placeholder="Collection (contract address)"/>
					<p>collection type: {collection.loading ? "..." : collection.type}</p>
					{collection.isLazySupported && <p>Lazy?&nbsp;
              <input type="checkbox" onChange={handleChangeLazy} checked={collection.isLazy}/>
              &nbsp;&nbsp;
          </p>}
					<button onClick={mint}>mint</button>
				</div>
				<hr/>
			</div>

			<div style={{ padding: '4px' }}>
				<p>Create sell order form</p>
				<input onChange={handleChangeOrderContract} value={createOrderForm?.contract}
							 placeholder={"Contract address"}/>
				<input onChange={handleChangeOrderTokenId} value={createOrderForm?.tokenId} placeholder={"Token Id"}/>
				<input onChange={handleChangeOrderPrice} value={createOrderForm?.price} placeholder={"Price"}/>
				<button onClick={createSellOrder}>
					Sell
				</button>
			</div>
			<hr/>
			<div style={{ padding: '4px' }}>
				<p>Purchase created order form</p>
				<input onChange={handleOrderHash} value={purchaseOrderForm.hash} placeholder={'Order hash'}/>
				<input onChange={handlePurchaseOrderAmount} value={purchaseOrderForm.amount} placeholder={'amount'}/>
				<button onClick={handlePurchaseOrder}>Purchase</button>
			</div>
			<hr/>
			<div>
				<p>NFT items owned by me: <button onClick={handleGetMyNfts}>Refresh</button></p>
				<ul>
					{ownedItems?.length && ownedItems.map(i => {
						return (
							<li key={i.id}>
								<p><strong>Item</strong> id: {i.id}</p>
								<p><strong>Lazy supply:</strong> {i.lazySupply}</p>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

const Test = () => {
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

	if (!provider?.isMetaMask) {
		return <strong>Please install metamask to use the app</strong>
	} else {
		if (sdk) {
			return <Dashboard provider={provider} sdk={sdk} accounts={accounts}/>
		} else {
			return <strong>Sdk not initialized</strong>
		}
	}
}

export default Test
