require("dotenv").config()
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/NFTicket.sol/NFTicket.json")
const contractAddress = "0x359e4915D55489b860804BaAfDF64925DDE050ED"
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI){
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest")
    const block = await web3.eth.getBlock('latest')

    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': block.minimumGasPrice,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    }

    const signPromise = web3.eth.accounts.signTransaction(tx,PRIVATE_KEY)
    signPromise.then((signedTx) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, hash)=>{
            !err ? console.log("Hash: ", hash) : console.log("Error: ", err)
        })
    }).catch((err)=>{
        console.log("Failed Promise: ", err)
    })
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmVRaRzL5Mb7FmAgq9S1Kmb4j7x625KpoSfLVTMQV2CuwD")