import React, { useEffect, useState } from 'react'
import Layout from "../../layout";
import { Link } from "react-router-dom";
import {
    useMoralis,
    useMoralisFile,
    useNewMoralisObject,
    useWeb3Contract,
    useWeb3ExecuteFunction,
} from "react-moralis";

function Lottery() {
    const [web3, setWeb3] = useState()
    const [address, setAddress] = useState()
    const [lcContract, setLcContract] = useState()
    const [lotteryPot, setLotteryPot] = useState()
    const [lotteryPlayers, setPlayers] = useState([])
    const [lotteryHistory, setLotteryHistory] = useState([])
    const [lotteryId, setLotteryId] = useState()
    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const { Moralis } = useMoralis();

    const abi = [
        {
            "inputs": [],
            "name": "enter",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "pickWinner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getPlayers",
            "outputs": [
                {
                    "internalType": "address payable[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getRandomNumber",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "lottery",
                    "type": "uint256"
                }
            ],
            "name": "getWinnerByLottery",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "lotteryHistory",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "lotteryId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "players",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const contractAddress = "0x92De5C47AC550550E302C5Fbb62C71b6befA279e";
    const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
        useMoralis();
    // const { isSaving, error: objError, save } = useNewMoralisObject("Item");

    // const {
    //   data,
    //   error: ethContractError,
    //   runContractFunction,
    //   isFetching,
    //   isLoading,
    // } = useWeb3Contract();

    const {
        data,
        error: ethContractError,
        fetch,
        isFetching,
        isLoading,
    } = useWeb3ExecuteFunction();

    useEffect(() => {

        async function fetchMyAPI() {
            enableWeb3();
            if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
            console.log("isWeb3Enabled", isWeb3Enabled)
            updateState()

        }

        fetchMyAPI()

    }, [])

    const updateState = () => {
        getPot()
        getPlayers()
        getLotteryId()
    }

    const getPot = async () => {

        const options = {
            abi: abi,
            contractAddress: contractAddress,
            functionName: "getBalance",
            // params: {
            //     uri: nftFileMetaDataFilePath,
            // },
        };

        const pot = await fetch({
            params: options, onSuccess: (res1) => {
                console.log("res1", res1)

                alert("success")
            },
            onError: (err) => {
                console.log("Error", err)

                // alert("Error", err)

            }
        });
        console.log(pot);

        // setLotteryPot(web3.utils.fromWei(pot, 'ether'))
    }

    const getPlayers = async () => {

        const options = {
            abi: abi,
            contractAddress: contractAddress,
            functionName: "getPlayers",
            // params: {
            //     uri: nftFileMetaDataFilePath,
            // },
        };

        const players = await fetch({
            params: options, onSuccess: (res1) => {
                console.log("res1", res1)

                alert("success")
            },
            onError: (err) => {
                console.log("Error", err)

                // alert("Error", err)

            }
        });

        // setPlayers(players)
    }

    const getHistory = async (id) => {
        setLotteryHistory([])
        for (let i = parseInt(id); i > 0; i--) {
            // const winnerAddress = await lcContract.methods.lotteryHistory(i).call()

            const options = {
                abi: abi,
                contractAddress: contractAddress,
                functionName: "lotteryHistory",
                // params: {
                //     uri: nftFileMetaDataFilePath,
                // },
            };

            const winnerAddress = await fetch({ params: options });

            // const historyObj = {}
            // historyObj.id = i
            // historyObj.address = winnerAddress
            // setLotteryHistory(lotteryHistory => [...lotteryHistory, historyObj])
        }
    }

    const getLotteryId = async () => {
        // const lotteryId = await lcContract.methods.lotteryId().call()
        const options = {
            abi: abi,
            contractAddress: contractAddress,
            functionName: "lotteryId",
            // params: {
            //     uri: nftFileMetaDataFilePath,
            // },
        };

        const lotteryId = await fetch({
            params: options, onSuccess: (res1) => {
                console.log("lotId", res1)

                alert("success")
            },
            onError: (err) => {
                console.log("Error", err)

                // alert("Error", err)

            }
        });

        // setLotteryId(lotteryId)
        // await getHistory(lotteryId)
    }

    const enterLotteryHandler = async () => {
        setError('')
        setSuccessMsg('')
        try {
            // await lcContract.methods.enter().send({
            //     from: address,
            //     value: '15000000000000000',
            //     gas: 300000,
            //     gasPrice: null
            // })

            const options = {
                abi: abi,
                contractAddress: contractAddress,
                functionName: "enter",
                params: {
                    from: address,
                    value: '15000000000000000',
                    gas: 300000,
                    gasPrice: null
                }
            };

            await fetch({ params: options });
            updateState()
        } catch (err) {
            setError(err.message)
        }
    }

    const pickWinnerHandler = async () => {
        setError('')
        setSuccessMsg('')
        console.log(`address from pick winner :: ${address}`)
        try {
            // await lcContract.methods.pickWinner().send({
            //     from: address,
            //     gas: 300000,
            //     gasPrice: null
            // })
            const options = {
                abi: abi,
                contractAddress: contractAddress,
                functionName: "pickWinner",
                params: {
                    from: address,
                    gas: 300000,
                    gasPrice: null
                }
            };

            await fetch({ params: options });
        } catch (err) {
            setError(err.message)
        }
    }

    const payWinnerHandler = async () => {
        setError('')
        setSuccessMsg('')
        try {
            // await lcContract.methods.payWinner().send({
            //     from: address,
            //     gas: 300000,
            //     gasPrice: null
            // })
            const options = {
                abi: abi,
                contractAddress: contractAddress,
                functionName: "payWinner",
                params: {
                    from: address,
                    gas: 300000,
                    gasPrice: null
                }
            };

            await fetch({ params: options });

            console.log(`lottery id :: ${lotteryId}`)
            // const winnerAddress = await lcContract.methods.lotteryHistory(lotteryId).call()

            const options2 = {
                abi: abi,
                contractAddress: contractAddress,
                functionName: "lotteryHistory",
                params: {
                    lotteryId: lotteryId
                }
            };

            const winnerAddress = await fetch({ params: options2 });

            setSuccessMsg(`The winner is ${winnerAddress}`)
            updateState()
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <Layout>
            <section className="flat-title-page inner">
                <div className="overlay"></div>
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="page-title-heading mg-bt-12">
                                <h3 className="heading text-center">The ItemSwap Lottery</h3>
                                <h1 className="heading text-center">$500</h1>
                                <h3 className="heading text-center">in prizes!</h3>
                                <h1 className="heading text-center">
                                    <div onClick={enterLotteryHandler} className='sc-button header-slider style style-1 rocket fl-button pri-1'>Buy Ticket</div>
                                </h1>
                            </div>
                            <div className="page-title-heading mg-bt-12">
                                <h2 className="heading text-center">Get your tickets now!</h2>
                                <h3 className="heading text-center">3H until the draw</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="tf-section sc-explore-1">
                <div className="themesflat-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="wrap-box explore-1 flex mg-bt-40">
                                <div className="seclect-box style-1 text-center box-center">
                                    <Link to="#" className="btn-selector text-center item-center nolink">All History</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            ;
        </Layout>
    )
}

export default Lottery