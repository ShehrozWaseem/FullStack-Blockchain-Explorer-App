require('dotenv').config(); 

const RPC = process.env.RPC_URL
const web3 = require('web3')
const web3Instance  = new web3(RPC)

async function getAddress() {
  const addresses = await web3Instance.eth.getAccounts()
 return addresses
};

async function getBalance(address) {
  const balance = await web3Instance.eth.getBalance(address)
  const accountBalanceObj = {
    account: address,
    balance: balance
  }
  return accountBalanceObj
}   
	
module.exports = {
	getAddress,getBalance
}