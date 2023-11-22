require('dotenv').config(); 

const mongoose = require('mongoose')
const db = process.env.MONGO_DB

const { transactionModel } = require('../db/model');

const RPC = process.env.RPC_URL
const web3 = require("web3");
let web3Instance = new web3(RPC);

// async function to fetch all history document
async function getTransactionHistory() {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    const history = await transactionModel.find({})
    return history
}

// srcPvtKey -> sender's private key
// recAddress -> recipient's public address
// amtWEI -> amt to be transfered in WEI
async function performTramsaction(srcPvtKey, recAddress, amtWEI) {    
    // sigingin transaction with senders pvt key
    // static gas fees
    const signedTransaction = await web3Instance.eth.accounts.signTransaction( {
        to: recAddress,
        value: amtWEI,
        gas: "180000"
        }, srcPvtKey)

    // send the signed transaction
    const transactionInfo = await web3Instance.eth.sendSignedTransaction(signedTransaction.rawTransaction)
    try{    
    // saving the transaction receipt to mongodb
        mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        // destructuring the transaction receipt returned from the web3.js send transaction function
        const {transactionHash,status,from,to,gasUsed} = transactionInfo
        const timeStamp = new Date()

        const transaction = new transactionModel({
            hash: transactionHash,
            performed: status,
            time: timeStamp.toLocaleString(),
            from: from,
            to: to,
            amount: amtWEI,
            gasFees: gasUsed
        })

        await transaction.save()

    }catch(error){
        console.log(`db error: ${error.message}`)
    }
    
    return transactionInfo
}

module.exports = {
    getTransactionHistory,
    performTramsaction
}